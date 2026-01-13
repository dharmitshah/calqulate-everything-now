import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
}

const BASE_URL = "https://quickulus.com";

export const SEO = ({
  title,
  description,
  keywords,
  ogImage = "https://quickulus.com/og-image.png",
  canonicalUrl,
  noIndex = false,
  article,
}: SEOProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Generate canonical URL from current path if not provided
    const fullCanonicalUrl = canonicalUrl || `${BASE_URL}${location.pathname === "/" ? "" : location.pathname}`;
    
    // Full title with brand
    const fullTitle = title.includes("Quickulus") ? title : `${title} | Quickulus`;
    
    // Update document title
    document.title = fullTitle;
    
    // Helper to update or create meta tag
    const updateMetaTag = (selector: string, content: string, attr: string = "content") => {
      let tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute(attr, content);
      }
    };

    // Helper to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!tag) {
        tag = document.createElement('link');
        tag.rel = rel;
        document.head.appendChild(tag);
      }
      tag.href = href;
    };
    
    // Update meta tags
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="title"]', fullTitle);
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', keywords);
    }
    
    // Robots meta
    if (noIndex) {
      updateMetaTag('meta[name="robots"]', 'noindex, nofollow');
    } else {
      updateMetaTag('meta[name="robots"]', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }
    
    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', fullTitle);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:image"]', ogImage);
    updateMetaTag('meta[property="og:image:secure_url"]', ogImage);
    updateMetaTag('meta[property="og:url"]', fullCanonicalUrl);
    
    // Twitter tags
    updateMetaTag('meta[name="twitter:title"]', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', description);
    updateMetaTag('meta[name="twitter:image"]', ogImage);
    updateMetaTag('meta[name="twitter:url"]', fullCanonicalUrl);
    
    // Article meta (if provided)
    if (article) {
      if (article.publishedTime) {
        let publishedTag = document.querySelector('meta[property="article:published_time"]');
        if (!publishedTag) {
          publishedTag = document.createElement('meta');
          publishedTag.setAttribute('property', 'article:published_time');
          document.head.appendChild(publishedTag);
        }
        publishedTag.setAttribute('content', article.publishedTime);
      }
      if (article.modifiedTime) {
        let modifiedTag = document.querySelector('meta[property="article:modified_time"]');
        if (!modifiedTag) {
          modifiedTag = document.createElement('meta');
          modifiedTag.setAttribute('property', 'article:modified_time');
          document.head.appendChild(modifiedTag);
        }
        modifiedTag.setAttribute('content', article.modifiedTime);
      }
    }
    
    // Canonical URL
    updateLinkTag('canonical', fullCanonicalUrl);
    
  }, [title, description, keywords, ogImage, canonicalUrl, noIndex, article, location.pathname]);
  
  return null;
};
