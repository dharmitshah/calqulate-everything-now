-- Fix overly permissive SELECT policies on analytics tables
-- These tables should only be readable by service_role (for admin dashboard via backend)

-- Drop existing permissive SELECT policies
DROP POLICY IF EXISTS "Authenticated users can read" ON public.search_logs;
DROP POLICY IF EXISTS "Authenticated users can read" ON public.calculator_usage;
DROP POLICY IF EXISTS "Authenticated users can read" ON public.page_views;

-- Create restrictive SELECT policies - only service_role can read
CREATE POLICY "Only service role can read"
ON public.search_logs
FOR SELECT
USING (
  (SELECT current_setting('request.jwt.claims', true)::json->>'role') = 'service_role'
);

CREATE POLICY "Only service role can read"
ON public.calculator_usage
FOR SELECT
USING (
  (SELECT current_setting('request.jwt.claims', true)::json->>'role') = 'service_role'
);

CREATE POLICY "Only service role can read"
ON public.page_views
FOR SELECT
USING (
  (SELECT current_setting('request.jwt.claims', true)::json->>'role') = 'service_role'
);