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
    const rateLimitKey = `tip:${clientIP}`;
    
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

    const { billAmount, tipPercent = 15, splitCount = 1 } = await req.json();
    
    if (!billAmount || billAmount <= 0) {
      return new Response(
        JSON.stringify({ error: 'billAmount must be a positive number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tipAmount = billAmount * (tipPercent / 100);
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / splitCount;
    const tipPerPerson = tipAmount / splitCount;

    const result = {
      billAmount: Math.round(billAmount * 100) / 100,
      tipPercent,
      tipAmount: Math.round(tipAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      splitCount,
      perPerson: Math.round(perPerson * 100) / 100,
      tipPerPerson: Math.round(tipPerPerson * 100) / 100,
      suggestions: {
        low: { percent: 10, tip: Math.round(billAmount * 0.1 * 100) / 100, total: Math.round(billAmount * 1.1 * 100) / 100 },
        standard: { percent: 15, tip: Math.round(billAmount * 0.15 * 100) / 100, total: Math.round(billAmount * 1.15 * 100) / 100 },
        good: { percent: 20, tip: Math.round(billAmount * 0.2 * 100) / 100, total: Math.round(billAmount * 1.2 * 100) / 100 },
        excellent: { percent: 25, tip: Math.round(billAmount * 0.25 * 100) / 100, total: Math.round(billAmount * 1.25 * 100) / 100 }
      }
    };

    // Log API usage with truncated hashed API key for security
    const hashedKey = await hashApiKeyTruncated(req.headers.get('x-api-key'));
    await supabase.from('api_usage').insert({
      api_name: 'tip',
      endpoint: '/api-tip',
      request_data: { billAmount, tipPercent, splitCount },
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
