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

    // Log API usage
    await supabase.from('api_usage').insert({
      api_name: 'compound-interest',
      endpoint: '/api-compound-interest',
      request_data: { principal, annualRate, years, compoundingFrequency, monthlyContribution },
      response_data: result,
      status_code: 200,
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      api_key: req.headers.get('x-api-key') || null
    });

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
