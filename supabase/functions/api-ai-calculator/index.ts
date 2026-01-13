import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

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

    const systemPrompt = `You are an intelligent calculator assistant. Your job is to:
1. Understand natural language math questions
2. Perform calculations accurately
3. Explain your work step by step
4. Handle unit conversions, percentages, financial calculations, and more

IMPORTANT RULES:
- Always show your calculation steps
- Format numbers with appropriate precision
- If a question is ambiguous, make reasonable assumptions and state them
- For complex problems, break them down into steps
- Return a JSON response with: answer (the final result), steps (array of calculation steps), and explanation (brief summary)

Examples:
- "What's 15% of 250?" → Calculate and explain
- "If I invest $1000 at 5% for 10 years, how much will I have?" → Compound interest
- "Convert 100 miles to kilometers" → Unit conversion
- "Split a $85 bill 4 ways with 18% tip" → Multi-step calculation`;

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
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      api_key: req.headers.get('x-api-key') || null
    });

    return new Response(
      JSON.stringify(finalResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('AI Calculator error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
