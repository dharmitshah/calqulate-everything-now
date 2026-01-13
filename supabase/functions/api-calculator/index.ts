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

    const { expression } = await req.json();
    
    if (!expression) {
      return new Response(
        JSON.stringify({ error: 'expression is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Safe evaluation - only allow numbers and basic operators
    const sanitized = expression.replace(/[^0-9+\-*/().%^sqrt\s]/gi, '');
    
    // Replace common math functions
    let evalExpression = sanitized
      .replace(/sqrt\(([^)]+)\)/gi, 'Math.sqrt($1)')
      .replace(/\^/g, '**')
      .replace(/(\d+)%/g, '($1/100)');

    let result: number;
    try {
      // Use Function constructor for safer eval
      result = new Function(`return ${evalExpression}`)();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid mathematical expression' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isFinite(result)) {
      return new Response(
        JSON.stringify({ error: 'Result is not a finite number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = {
      expression,
      result: Math.round(result * 1000000) / 1000000
    };

    // Log API usage
    await supabase.from('api_usage').insert({
      api_name: 'calculator',
      endpoint: '/api-calculator',
      request_data: { expression },
      response_data: response,
      status_code: 200,
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      api_key: req.headers.get('x-api-key') || null
    });

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
