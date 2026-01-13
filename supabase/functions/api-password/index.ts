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
      length = 16, 
      includeUppercase = true, 
      includeLowercase = true, 
      includeNumbers = true, 
      includeSymbols = true,
      excludeAmbiguous = false,
      count = 1
    } = await req.json();
    
    if (length < 4 || length > 128) {
      return new Response(
        JSON.stringify({ error: 'length must be between 4 and 128' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (count < 1 || count > 100) {
      return new Response(
        JSON.stringify({ error: 'count must be between 1 and 100' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let charset = '';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const ambiguous = 'il1Lo0O';

    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (excludeAmbiguous) {
      charset = charset.split('').filter(c => !ambiguous.includes(c)).join('');
    }

    if (charset.length === 0) {
      return new Response(
        JSON.stringify({ error: 'At least one character type must be included' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const passwords: string[] = [];
    for (let i = 0; i < count; i++) {
      let password = '';
      const array = new Uint32Array(length);
      crypto.getRandomValues(array);
      for (let j = 0; j < length; j++) {
        password += charset[array[j] % charset.length];
      }
      passwords.push(password);
    }

    // Calculate password strength
    const entropy = Math.log2(Math.pow(charset.length, length));
    let strength: string;
    if (entropy < 28) strength = 'Very Weak';
    else if (entropy < 36) strength = 'Weak';
    else if (entropy < 60) strength = 'Reasonable';
    else if (entropy < 128) strength = 'Strong';
    else strength = 'Very Strong';

    const result = {
      passwords: count === 1 ? passwords[0] : passwords,
      length,
      entropy: Math.round(entropy * 100) / 100,
      strength,
      characterSet: {
        uppercase: includeUppercase,
        lowercase: includeLowercase,
        numbers: includeNumbers,
        symbols: includeSymbols,
        excludeAmbiguous
      },
      charsetSize: charset.length
    };

    // Log API usage (don't log the actual passwords for security)
    await supabase.from('api_usage').insert({
      api_name: 'password',
      endpoint: '/api-password',
      request_data: { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeAmbiguous, count },
      response_data: { generated: count, strength, entropy: result.entropy },
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
