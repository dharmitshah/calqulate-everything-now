-- Add explicit restrictive policies for UPDATE and DELETE on all analytics tables
-- These tables are audit logs and should never be modified or deleted by regular users

-- api_usage: Block all UPDATE operations
CREATE POLICY "No updates allowed"
ON public.api_usage
FOR UPDATE
USING (false);

-- api_usage: Block all DELETE operations
CREATE POLICY "No deletes allowed"
ON public.api_usage
FOR DELETE
USING (false);

-- calculator_usage: Block all UPDATE operations
CREATE POLICY "No updates allowed"
ON public.calculator_usage
FOR UPDATE
USING (false);

-- calculator_usage: Block all DELETE operations
CREATE POLICY "No deletes allowed"
ON public.calculator_usage
FOR DELETE
USING (false);

-- page_views: Block all UPDATE operations
CREATE POLICY "No updates allowed"
ON public.page_views
FOR UPDATE
USING (false);

-- page_views: Block all DELETE operations
CREATE POLICY "No deletes allowed"
ON public.page_views
FOR DELETE
USING (false);

-- search_logs: Block all UPDATE operations
CREATE POLICY "No updates allowed"
ON public.search_logs
FOR UPDATE
USING (false);

-- search_logs: Block all DELETE operations
CREATE POLICY "No deletes allowed"
ON public.search_logs
FOR DELETE
USING (false);