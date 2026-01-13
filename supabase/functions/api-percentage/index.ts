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

    // Log API usage
    await supabase.from('api_usage').insert({
      api_name: 'percentage',
      endpoint: '/api-percentage',
      request_data: { operation, value1, value2 },
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
