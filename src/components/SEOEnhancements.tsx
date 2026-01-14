import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Enhanced SEO component for better Core Web Vitals and search rankings
 * - Implements resource hints for faster navigation
 * - Adds enhanced structured data support
 * - Improves crawlability signals
 */

interface SEOEnhancementsProps {
  preloadLinks?: string[];
  prefetchLinks?: string[];
}

export const SEOEnhancements = ({ 
  preloadLinks = [], 
  prefetchLinks = [] 
}: SEOEnhancementsProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Add prefetch links for likely next navigations
    const addPrefetchLinks = () => {
      prefetchLinks.forEach(href => {
        const existingLink = document.querySelector(`link[href="${href}"][rel="prefetch"]`);
        if (!existingLink) {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = href;
          document.head.appendChild(link);
        }
      });
    };
    
    // Add preload links for critical resources
    const addPreloadLinks = () => {
      preloadLinks.forEach(href => {
        const existingLink = document.querySelector(`link[href="${href}"][rel="preload"]`);
        if (!existingLink) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = href;
          link.as = href.endsWith('.js') ? 'script' : href.endsWith('.css') ? 'style' : 'fetch';
          document.head.appendChild(link);
        }
      });
    };
    
    // Delayed to not block initial render
    const timeout = setTimeout(() => {
      addPrefetchLinks();
      addPreloadLinks();
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [preloadLinks, prefetchLinks]);
  
  useEffect(() => {
    // Add page-specific performance metrics to help with Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Mark navigation start for this route
      performance.mark(`route-${location.pathname}-start`);
      
      return () => {
        performance.mark(`route-${location.pathname}-end`);
        try {
          performance.measure(
            `route-${location.pathname}`,
            `route-${location.pathname}-start`,
            `route-${location.pathname}-end`
          );
        } catch (e) {
          // Ignore measurement errors
        }
      };
    }
  }, [location.pathname]);
  
  return null;
};

/**
 * Generate comprehensive WebPage structured data
 */
export const generateWebPageSchema = (
  title: string,
  description: string,
  url: string,
  dateModified: string = new Date().toISOString().split('T')[0]
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  "url": url,
  "name": title,
  "description": description,
  "dateModified": dateModified,
  "inLanguage": "en-US",
  "isPartOf": {
    "@id": "https://quickulus.com/#website"
  },
  "about": {
    "@id": "https://quickulus.com/#organization"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://quickulus.com/og-image.png"
  },
  "potentialAction": {
    "@type": "ReadAction",
    "target": url
  }
});

/**
 * Generate SoftwareApplication schema for calculator pages
 */
export const generateCalculatorSchema = (
  name: string,
  description: string,
  url: string,
  features: string[] = [],
  rating: { value: string; count: string } = { value: "4.8", count: "150" }
) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": name,
  "applicationCategory": "EducationalApplication",
  "applicationSubCategory": "Calculator",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires JavaScript",
  "url": url,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": rating.value,
    "reviewCount": rating.count,
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": description,
  "featureList": features,
  "author": {
    "@id": "https://quickulus.com/#organization"
  }
});

/**
 * Generate HowTo schema for calculator instructions
 */
export const generateHowToSchema = (
  name: string,
  description: string,
  steps: { name: string; text: string }[],
  estimatedTime: string = "PT2M"
) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": name,
  "description": description,
  "totalTime": estimatedTime,
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text
  }))
});

/**
 * Generate FAQ schema
 */
export const generateFAQSchema = (
  questions: { question: string; answer: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": questions.map(q => ({
    "@type": "Question",
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer
    }
  }))
});
