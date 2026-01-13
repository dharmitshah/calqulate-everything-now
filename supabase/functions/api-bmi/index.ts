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

    const { weight, height, unit = 'metric' } = await req.json();
    
    if (!weight || !height) {
      return new Response(
        JSON.stringify({ error: 'Weight and height are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let bmi: number;
    let weightKg = weight;
    let heightM = height;

    if (unit === 'imperial') {
      weightKg = weight * 0.453592;
      heightM = height * 0.0254;
    } else {
      heightM = height / 100;
    }

    bmi = weightKg / (heightM * heightM);
    
    let category: string;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    const result = {
      bmi: Math.round(bmi * 10) / 10,
      category,
      healthyRange: { min: 18.5, max: 24.9 }
    };

    // Log API usage
    await supabase.from('api_usage').insert({
      api_name: 'bmi',
      endpoint: '/api-bmi',
      request_data: { weight, height, unit },
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
