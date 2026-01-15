import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Hash API key for secure storage - only store truncated hash, never plaintext
async function hashApiKeyTruncated(apiKey: string | null): Promise<string | null> {
  if (!apiKey) return null;
  const encoder = new TextEncoder();
  const data = encoder.encode(apiKey);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const fullHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return fullHash.substring(0, 16);
}

// Rate limit: 60 requests per minute
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60000;

async function checkRateLimit(supabase: any, identifier: string): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = new Date(Date.now() - RATE_WINDOW_MS);
  
  const { data } = await supabase
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
    const rateLimitKey = `percentage:${clientIP}`;
    
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

    const { operation, value1, value2 } = await req.json();
    
    if (!operation || value1 === undefined || value2 === undefined) {
      return new Response(
        JSON.stringify({ error: 'operation, value1, and value2 are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let result: any = {};

    switch (operation) {
      case 'percentOf':
        // What is value1% of value2?
        result = {
          operation: 'percentOf',
          description: `${value1}% of ${value2}`,
          result: (value1 / 100) * value2
        };
        break;
      case 'whatPercent':
        // value1 is what percent of value2?
        result = {
          operation: 'whatPercent',
          description: `${value1} is what % of ${value2}`,
          result: (value1 / value2) * 100
        };
        break;
      case 'increase':
        // Increase value1 by value2%
        result = {
          operation: 'increase',
          description: `${value1} increased by ${value2}%`,
          result: value1 * (1 + value2 / 100)
        };
        break;
      case 'decrease':
        // Decrease value1 by value2%
        result = {
          operation: 'decrease',
          description: `${value1} decreased by ${value2}%`,
          result: value1 * (1 - value2 / 100)
        };
        break;
      case 'difference':
        // Percentage difference between value1 and value2
        const diff = ((value2 - value1) / value1) * 100;
        result = {
          operation: 'difference',
          description: `Percentage change from ${value1} to ${value2}`,
          result: diff,
          direction: diff >= 0 ? 'increase' : 'decrease'
        };
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid operation. Use: percentOf, whatPercent, increase, decrease, difference' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    result.result = Math.round(result.result * 10000) / 10000;

    // Log API usage with truncated hashed API key for security
    const hashedKey = await hashApiKeyTruncated(req.headers.get('x-api-key'));
    await supabase.from('api_usage').insert({
      api_name: 'percentage',
      endpoint: '/api-percentage',
      request_data: { operation, value1, value2 },
      response_data: result,
      status_code: 200,
      ip_address: clientIP,
      api_key_hash: hashedKey
    });

    return new Response(
      JSON.stringify(result),
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
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
