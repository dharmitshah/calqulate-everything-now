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

const conversions: Record<string, Record<string, number>> = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.001
  },
  temperature: {
    celsius: 1,
    fahrenheit: 1,
    kelvin: 1
  },
  volume: {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    cup: 4.22675,
    fluidOunce: 33.814
  },
  area: {
    squareMeter: 1,
    squareKilometer: 0.000001,
    squareFoot: 10.7639,
    squareYard: 1.19599,
    acre: 0.000247105,
    hectare: 0.0001
  },
  speed: {
    meterPerSecond: 1,
    kilometerPerHour: 3.6,
    milePerHour: 2.23694,
    knot: 1.94384
  },
  data: {
    byte: 1,
    kilobyte: 0.001,
    megabyte: 0.000001,
    gigabyte: 0.000000001,
    terabyte: 0.000000000001
  }
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

    // Rate limiting by IP
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rateLimitKey = `unit-convert:${clientIP}`;
    
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

    const { value, from, to, category } = await req.json();
    
    if (value === undefined || !from || !to || !category) {
      return new Response(
        JSON.stringify({ 
          error: 'value, from, to, and category are required',
          availableCategories: Object.keys(conversions)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const categoryConversions = conversions[category];
    if (!categoryConversions) {
      return new Response(
        JSON.stringify({ 
          error: `Invalid category. Available: ${Object.keys(conversions).join(', ')}` 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!categoryConversions[from] || !categoryConversions[to]) {
      return new Response(
        JSON.stringify({ 
          error: `Invalid unit. Available for ${category}: ${Object.keys(categoryConversions).join(', ')}` 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let result: number;
    
    // Special handling for temperature
    if (category === 'temperature') {
      result = convertTemperature(value, from, to);
    } else {
      // Convert to base unit first, then to target
      const inBase = value / categoryConversions[from];
      result = inBase * categoryConversions[to];
    }

    const response = {
      input: { value, unit: from },
      output: { value: Math.round(result * 1000000) / 1000000, unit: to },
      category,
      formula: category === 'temperature' 
        ? getTemperatureFormula(from, to)
        : `${value} ${from} × (${categoryConversions[to]} / ${categoryConversions[from]})`
    };

    // Log API usage with truncated hashed API key for security
    const hashedKey = await hashApiKeyTruncated(req.headers.get('x-api-key'));
    await supabase.from('api_usage').insert({
      api_name: 'unit-convert',
      endpoint: '/api-unit-convert',
      request_data: { value, from, to, category },
      response_data: response,
      status_code: 200,
      ip_address: clientIP,
      api_key_hash: hashedKey
    });

    return new Response(
      JSON.stringify(response),
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

function convertTemperature(value: number, from: string, to: string): number {
  // Convert to Celsius first
  let celsius: number;
  switch (from) {
    case 'fahrenheit':
      celsius = (value - 32) * 5/9;
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }

  // Convert from Celsius to target
  switch (to) {
    case 'fahrenheit':
      return celsius * 9/5 + 32;
    case 'kelvin':
      return celsius + 273.15;
    default:
      return celsius;
  }
}

function getTemperatureFormula(from: string, to: string): string {
  if (from === to) return 'No conversion needed';
  if (from === 'celsius' && to === 'fahrenheit') return '°F = °C × 9/5 + 32';
  if (from === 'fahrenheit' && to === 'celsius') return '°C = (°F - 32) × 5/9';
  if (from === 'celsius' && to === 'kelvin') return 'K = °C + 273.15';
  if (from === 'kelvin' && to === 'celsius') return '°C = K - 273.15';
  if (from === 'fahrenheit' && to === 'kelvin') return 'K = (°F - 32) × 5/9 + 273.15';
  if (from === 'kelvin' && to === 'fahrenheit') return '°F = (K - 273.15) × 9/5 + 32';
  return 'Standard conversion';
}
