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

    // Log API usage
    await supabase.from('api_usage').insert({
      api_name: 'mortgage',
      endpoint: '/api-mortgage',
      request_data: { homePrice, downPaymentPercent, loanTermYears, annualRate },
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
