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
    const rateLimitKey = `compound-interest:${clientIP}`;
    
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

    const { 
      principal, 
      annualRate, 
      years, 
      compoundingFrequency = 12,
      monthlyContribution = 0 
    } = await req.json();
    
    if (!principal || !annualRate || !years) {
      return new Response(
        JSON.stringify({ error: 'principal, annualRate, and years are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const r = annualRate / 100;
    const n = compoundingFrequency;
    const t = years;

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const compoundedPrincipal = principal * Math.pow(1 + r/n, n*t);
    
    // Future value of series (monthly contributions)
    // FV = PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
    let futureValueContributions = 0;
    if (monthlyContribution > 0 && r > 0) {
      const periodicRate = r / n;
      const totalPeriods = n * t;
      futureValueContributions = monthlyContribution * 
        ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
    } else if (monthlyContribution > 0) {
      futureValueContributions = monthlyContribution * n * t;
    }

    const totalValue = compoundedPrincipal + futureValueContributions;
    const totalContributions = principal + (monthlyContribution * 12 * years);
    const totalInterest = totalValue - totalContributions;

    const result = {
      principal,
      annualRate,
      years,
      compoundingFrequency,
      monthlyContribution,
      finalAmount: Math.round(totalValue * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalInterestEarned: Math.round(totalInterest * 100) / 100,
      effectiveAnnualRate: Math.round((Math.pow(1 + r/n, n) - 1) * 10000) / 100
    };

    // Log API usage with truncated hashed API key for security
    const hashedKey = await hashApiKeyTruncated(req.headers.get('x-api-key'));
    await supabase.from('api_usage').insert({
      api_name: 'compound-interest',
      endpoint: '/api-compound-interest',
      request_data: { principal, annualRate, years, compoundingFrequency, monthlyContribution },
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
