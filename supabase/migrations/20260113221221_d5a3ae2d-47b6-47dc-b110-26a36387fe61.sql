-- Drop the existing permissive SELECT policy
DROP POLICY IF EXISTS "Allow authenticated users to read API usage" ON public.api_usage;

-- Create a new restrictive policy that only allows reading non-sensitive data
-- Users can only see their own API usage (if we had user_id), but since we don't,
-- we'll restrict to service role only for now
CREATE POLICY "Only service role can read API usage"
ON public.api_usage
FOR SELECT
USING (
  -- Only service role can read (auth.role() = 'service_role')
  -- This effectively blocks all client-side reads
  (SELECT current_setting('request.jwt.claims', true)::json->>'role') = 'service_role'
);