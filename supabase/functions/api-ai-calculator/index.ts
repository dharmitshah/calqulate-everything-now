import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Rate limit: 10 requests per minute for AI endpoint (more expensive)
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60000;

async function checkRateLimit(supabase: any, identifier: string): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = new Date(Date.now() - RATE_WINDOW_MS);
  
  // Get current count for this identifier in the current window
  const { data, error } = await supabase
    .from('rate_limits')
    .select('count')
    .eq('key', identifier)
    .gte('window_start', windowStart.toISOString())
    .order('window_start', { ascending: false })
    .limit(1)
    .maybeSingle();

  const currentCount = data?.count || 0;
  
  if (currentCount >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  // Upsert the rate limit record
  if (data) {
    await supabase
      .from('rate_limits')
      .update({ count: currentCount + 1 })
      .eq('key', identifier)
      .gte('window_start', windowStart.toISOString());
  } else {
    await supabase
      .from('rate_limits')
      .insert({ key: identifier, count: 1, window_start: new Date().toISOString() });
  }

  return { allowed: true, remaining: RATE_LIMIT - currentCount - 1 };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Rate limiting by IP
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rateLimitKey = `ai-calculator:${clientIP}`;
    
    const { allowed, remaining } = await checkRateLimit(supabase, rateLimitKey);
    
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': RATE_LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60'
          } 
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('AI service not configured');
    }

    const { query } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an advanced mathematics assistant capable of solving any mathematical problem. Your expertise includes:

CALCULUS:
- Derivatives (including partial, implicit, and higher-order)
- Integrals (definite, indefinite, improper, multiple integrals)
- Limits and continuity
- Taylor and Maclaurin series
- Differential equations (ODEs and PDEs)

LINEAR ALGEBRA:
- Matrix operations (determinants, inverses, eigenvalues, eigenvectors)
- Vector spaces and linear transformations
- Systems of linear equations

ADVANCED TOPICS:
- Complex analysis
- Fourier transforms
- Laplace transforms
- Probability and statistics
- Number theory

STANDARD CALCULATIONS:
- Arithmetic, percentages, ratios
- Financial calculations (compound interest, amortization)
- Unit conversions
- Geometry and trigonometry

IMPORTANT RULES:
- Always show detailed step-by-step solutions
- Use proper mathematical notation in explanations (e.g., ∫, ∂, Σ, √, π)
- For calculus problems, show the technique used (substitution, by parts, etc.)
- For integrals, always include the constant of integration (+C) for indefinite integrals
- Format final answers clearly with appropriate precision
- If a problem has multiple solution methods, use the most elegant one
- For differential equations, specify the general solution and explain any constants`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'calculate_result',
              description: 'Return the calculation result with steps',
              parameters: {
                type: 'object',
                properties: {
                  answer: { 
                    type: 'string', 
                    description: 'The final numerical answer or result' 
                  },
                  steps: { 
                    type: 'array', 
                    items: { type: 'string' },
                    description: 'Step-by-step calculation process' 
                  },
                  explanation: { 
                    type: 'string', 
                    description: 'Brief explanation of the calculation' 
                  },
                  formula: {
                    type: 'string',
                    description: 'The mathematical formula used (if applicable)'
                  }
                },
                required: ['answer', 'steps', 'explanation']
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'calculate_result' } }
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'AI service rate limited, please try again later' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires payment' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error('AI service error');
    }

    const aiResponse = await response.json();
    
    let result;
    const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      result = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback if tool calling doesn't work
      result = {
        answer: aiResponse.choices?.[0]?.message?.content || 'Unable to calculate',
        steps: [],
        explanation: 'Processed by AI'
      };
    }

    const finalResult = {
      query,
      ...result,
      poweredBy: 'AI'
    };

    // Log API usage
    await supabase.from('api_usage').insert({
      api_name: 'ai-calculator',
      endpoint: '/api-ai-calculator',
      request_data: { query },
      response_data: finalResult,
      status_code: 200,
      ip_address: clientIP,
      api_key: req.headers.get('x-api-key') || null
    });

    return new Response(
      JSON.stringify(finalResult),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': RATE_LIMIT.toString(),
          'X-RateLimit-Remaining': remaining.toString()
        } 
      }
    );
  } catch (error) {
    console.error('AI Calculator error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
