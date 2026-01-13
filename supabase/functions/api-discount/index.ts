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

    const { originalPrice, discountPercent, taxPercent = 0 } = await req.json();
    
    if (!originalPrice || originalPrice <= 0) {
      return new Response(
        JSON.stringify({ error: 'originalPrice must be a positive number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!discountPercent || discountPercent < 0 || discountPercent > 100) {
      return new Response(
        JSON.stringify({ error: 'discountPercent must be between 0 and 100' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const discountAmount = originalPrice * (discountPercent / 100);
    const discountedPrice = originalPrice - discountAmount;
    const taxAmount = discountedPrice * (taxPercent / 100);
    const finalPrice = discountedPrice + taxAmount;

    const result = {
      originalPrice: Math.round(originalPrice * 100) / 100,
      discountPercent,
      discountAmount: Math.round(discountAmount * 100) / 100,
      discountedPrice: Math.round(discountedPrice * 100) / 100,
      taxPercent,
      taxAmount: Math.round(taxAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      totalSavings: Math.round(discountAmount * 100) / 100
    };

    // Log API usage
    await supabase.from('api_usage').insert({
      api_name: 'discount',
      endpoint: '/api-discount',
      request_data: { originalPrice, discountPercent, taxPercent },
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
