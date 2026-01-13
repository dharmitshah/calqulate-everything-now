-- The current INSERT policies use WITH CHECK (true) which is flagged as overly permissive
-- For analytics tables, we need to allow inserts from anonymous users but can add basic validation
-- to ensure data integrity

-- Drop existing permissive INSERT policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.calculator_usage;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.page_views;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.search_logs;
DROP POLICY IF EXISTS "Allow service role to insert API usage" ON public.api_usage;

-- Create more restrictive INSERT policies with basic validation

-- For calculator_usage: Validate that required fields are provided
CREATE POLICY "Allow inserts with valid data"
ON public.calculator_usage
FOR INSERT
WITH CHECK (
  calculator_name IS NOT NULL 
  AND calculator_name <> ''
  AND input_data IS NOT NULL
);

-- For page_views: Validate that page_path is provided
CREATE POLICY "Allow inserts with valid data"
ON public.page_views
FOR INSERT
WITH CHECK (
  page_path IS NOT NULL 
  AND page_path <> ''
);

-- For search_logs: Validate that search_query is provided
CREATE POLICY "Allow inserts with valid data"
ON public.search_logs
FOR INSERT
WITH CHECK (
  search_query IS NOT NULL 
  AND search_query <> ''
);

-- For api_usage: Only service role can insert (already restrictive, but add validation)
CREATE POLICY "Service role can insert with valid data"
ON public.api_usage
FOR INSERT
WITH CHECK (
  (SELECT current_setting('request.jwt.claims', true)::json->>'role') = 'service_role'
  AND api_name IS NOT NULL 
  AND api_name <> ''
  AND endpoint IS NOT NULL 
  AND endpoint <> ''
);