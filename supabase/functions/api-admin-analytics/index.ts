import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authorization header exists
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - No valid token provided' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    // Create client to verify user session
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify the token and get claims
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getUser(token);

    if (claimsError || !claimsData?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const user = claimsData.user;

    // Check if user is admin (by email - you can also use roles table)
    // IMPORTANT: In production, use a proper roles system
    const adminEmail = 'admin@quickulus.com';
    if (user.email !== adminEmail) {
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role client to fetch analytics (bypasses RLS)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch all analytics data in parallel
    const [calcResult, searchResult, viewsResult, apiResult] = await Promise.all([
      supabaseAdmin
        .from('calculator_usage')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
      supabaseAdmin
        .from('search_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
      supabaseAdmin
        .from('page_views')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
      supabaseAdmin
        .from('api_usage')
        .select('id, api_name, endpoint, status_code, created_at, ip_address')
        .order('created_at', { ascending: false })
        .limit(100)
    ]);

    // Check for errors
    if (calcResult.error || searchResult.error || viewsResult.error || apiResult.error) {
      console.error('Database errors:', { 
        calc: calcResult.error, 
        search: searchResult.error, 
        views: viewsResult.error,
        api: apiResult.error 
      });
      return new Response(
        JSON.stringify({ error: 'Failed to fetch analytics data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        calculator_usage: calcResult.data || [],
        search_logs: searchResult.data || [],
        page_views: viewsResult.data || [],
        api_usage: apiResult.data || []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Admin analytics error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});