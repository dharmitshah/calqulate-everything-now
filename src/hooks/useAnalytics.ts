import { useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const hasTrackedPageView = useRef(false);

  // Track page view
  const trackPageView = useCallback(async (pagePath: string, pageTitle?: string) => {
    try {
      await supabase.from('page_views').insert({
        page_path: pagePath,
        page_title: pageTitle || document.title,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: getSessionId(),
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, []);

  // Track calculator usage
  const trackCalculatorUsage = useCallback(async (
    calculatorName: string,
    inputData: Record<string, unknown>,
    resultData?: Record<string, unknown>
  ) => {
    try {
      await supabase.from('calculator_usage').insert({
        calculator_name: calculatorName,
        input_data: inputData as Json,
        result_data: (resultData || null) as Json,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        session_id: getSessionId(),
      });
    } catch (error) {
      console.error('Failed to track calculator usage:', error);
    }
  }, []);

  // Track search query
  const trackSearch = useCallback(async (
    searchQuery: string,
    resultsCount: number,
    pagePath?: string
  ) => {
    try {
      await supabase.from('search_logs').insert({
        search_query: searchQuery,
        results_count: resultsCount,
        page_path: pagePath || window.location.pathname,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        session_id: getSessionId(),
      });
    } catch (error) {
      console.error('Failed to track search:', error);
    }
  }, []);

  // Auto track page view on mount
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      hasTrackedPageView.current = true;
      trackPageView(window.location.pathname);
    }
  }, [trackPageView]);

  return {
    trackPageView,
    trackCalculatorUsage,
    trackSearch,
  };
};
