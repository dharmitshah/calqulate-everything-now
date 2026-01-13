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

    const { min = 1, max = 100, count = 1, type = 'integer' } = await req.json();
    
    if (min >= max) {
      return new Response(
        JSON.stringify({ error: 'min must be less than max' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (count < 1 || count > 1000) {
      return new Response(
        JSON.stringify({ error: 'count must be between 1 and 1000' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const numbers: number[] = [];
    for (let i = 0; i < count; i++) {
      if (type === 'float') {
        numbers.push(Math.random() * (max - min) + min);
      } else {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    }

    const result = {
      numbers,
      min,
      max,
      count,
      type,
      sum: numbers.reduce((a, b) => a + b, 0),
      average: numbers.reduce((a, b) => a + b, 0) / numbers.length
    };

    // Log API usage
    await supabase.from('api_usage').insert({
      api_name: 'random',
      endpoint: '/api-random',
      request_data: { min, max, count, type },
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
