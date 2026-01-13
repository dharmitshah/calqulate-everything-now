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

    // Log API usage
    await supabase.from('api_usage').insert({
      api_name: 'tip',
      endpoint: '/api-tip',
      request_data: { billAmount, tipPercent, splitCount },
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
