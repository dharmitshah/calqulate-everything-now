import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

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
    const rateLimitKey = `calorie:${clientIP}`;
    
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

    const { weight, height, age, gender, activityLevel = 'moderate', goal = 'maintain' } = await req.json();
    
    if (!weight || !height || !age || !gender) {
      return new Response(
        JSON.stringify({ error: 'weight, height, age, and gender are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender.toLowerCase() === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const multiplier = activityMultipliers[activityLevel] || 1.55;
    const tdee = bmr * multiplier;

    // Goal adjustments
    let targetCalories = tdee;
    let goalDescription = 'Maintain current weight';
    
    switch (goal) {
      case 'lose':
        targetCalories = tdee - 500;
        goalDescription = 'Lose ~0.5kg per week';
        break;
      case 'loseFast':
        targetCalories = tdee - 1000;
        goalDescription = 'Lose ~1kg per week';
        break;
      case 'gain':
        targetCalories = tdee + 500;
        goalDescription = 'Gain ~0.5kg per week';
        break;
      case 'gainFast':
        targetCalories = tdee + 1000;
        goalDescription = 'Gain ~1kg per week';
        break;
    }

    // Macro breakdown (balanced diet)
    const protein = Math.round((targetCalories * 0.3) / 4);
    const carbs = Math.round((targetCalories * 0.4) / 4);
    const fat = Math.round((targetCalories * 0.3) / 9);

    const result = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      goal: goalDescription,
      macros: {
        protein: { grams: protein, calories: protein * 4 },
        carbs: { grams: carbs, calories: carbs * 4 },
        fat: { grams: fat, calories: fat * 9 }
      },
      mealsBreakdown: {
        threeMeals: Math.round(targetCalories / 3),
        fourMeals: Math.round(targetCalories / 4),
        fiveMeals: Math.round(targetCalories / 5)
      }
    };

    // Log API usage
    await supabase.from('api_usage').insert({
      api_name: 'calorie',
      endpoint: '/api-calorie',
      request_data: { weight, height, age, gender, activityLevel, goal },
      response_data: result,
      status_code: 200,
      ip_address: clientIP,
      api_key: req.headers.get('x-api-key') || null
    });

    return new Response(
      JSON.stringify(result),
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
