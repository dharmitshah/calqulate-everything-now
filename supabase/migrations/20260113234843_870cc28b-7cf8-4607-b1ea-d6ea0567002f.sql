-- Drop the current permissive insert policy that allows public inserts
DROP POLICY IF EXISTS "Service role can insert with valid data" ON public.api_usage;

-- Create a strict policy that only allows service role to insert
CREATE POLICY "Only service role can insert"
ON public.api_usage
FOR INSERT
TO authenticated, anon
WITH CHECK (
  (SELECT current_setting('request.jwt.claims', true)::json->>'role') = 'service_role'
);

-- Also ensure the policy is restrictive (RESTRICTIVE not PERMISSIVE)
-- This means ALL conditions must pass, not just one