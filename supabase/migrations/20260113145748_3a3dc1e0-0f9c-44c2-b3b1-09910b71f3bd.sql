-- Table to track calculator usage (what users enter)
CREATE TABLE public.calculator_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  calculator_name TEXT NOT NULL,
  input_data JSONB NOT NULL,
  result_data JSONB,
  user_agent TEXT,
  referrer TEXT,
  ip_hash TEXT, -- anonymized for privacy
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table to track search queries
CREATE TABLE public.search_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  search_query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  user_agent TEXT,
  referrer TEXT,
  page_path TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table to track page views
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for faster queries
CREATE INDEX idx_calculator_usage_name ON public.calculator_usage(calculator_name);
CREATE INDEX idx_calculator_usage_created ON public.calculator_usage(created_at);
CREATE INDEX idx_search_logs_query ON public.search_logs(search_query);
CREATE INDEX idx_search_logs_created ON public.search_logs(created_at);
CREATE INDEX idx_page_views_path ON public.page_views(page_path);
CREATE INDEX idx_page_views_created ON public.page_views(created_at);

-- RLS - Allow anonymous inserts (for tracking) but only authenticated reads (for admin)
ALTER TABLE public.calculator_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (for tracking)
CREATE POLICY "Allow anonymous inserts" ON public.calculator_usage FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts" ON public.search_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts" ON public.page_views FOR INSERT WITH CHECK (true);

-- Only authenticated users can read (for admin dashboard)
CREATE POLICY "Authenticated users can read" ON public.calculator_usage FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read" ON public.search_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read" ON public.page_views FOR SELECT TO authenticated USING (true);