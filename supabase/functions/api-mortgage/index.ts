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
    const rateLimitKey = `mortgage:${clientIP}`;
    
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

    const { homePrice, downPaymentPercent, loanTermYears, annualRate } = await req.json();
    
    if (!homePrice || !loanTermYears || !annualRate) {
      return new Response(
        JSON.stringify({ error: 'homePrice, loanTermYears, and annualRate are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const downPayment = homePrice * ((downPaymentPercent || 20) / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = annualRate / 100 / 12;
    const termMonths = loanTermYears * 12;
    
    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / termMonths;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                       (Math.pow(1 + monthlyRate, termMonths) - 1);
    }

    const totalPayment = monthlyPayment * termMonths;
    const totalInterest = totalPayment - loanAmount;

    const result = {
      homePrice,
      downPayment: Math.round(downPayment * 100) / 100,
      loanAmount: Math.round(loanAmount * 100) / 100,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      loanToValue: Math.round((loanAmount / homePrice) * 10000) / 100
    };

    // Log API usage with truncated hashed API key for security
    const hashedKey = await hashApiKeyTruncated(req.headers.get('x-api-key'));
    await supabase.from('api_usage').insert({
      api_name: 'mortgage',
      endpoint: '/api-mortgage',
      request_data: { homePrice, downPaymentPercent, loanTermYears, annualRate },
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
