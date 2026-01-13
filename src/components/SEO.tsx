
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const BASE_URL = "https://quickulus.com";

export const SEO = ({
  title,
  description,
  keywords,
  ogImage = "https://quickulus.com/og-image.png",
  canonicalUrl,
}: SEOProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Generate canonical URL from current path if not provided
    const fullCanonicalUrl = canonicalUrl || `${BASE_URL}${location.pathname === "/" ? "" : location.pathname}`;
    
    // Update document title
    document.title = `${title} | Quickulus`;
    
    // Find meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImg = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const twitterImg = document.querySelector('meta[name="twitter:image"]');
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    
    // Update meta tags if they exist
    if (metaDescription) metaDescription.setAttribute("content", description);
    if (metaKeywords && keywords) metaKeywords.setAttribute("content", keywords);
    if (ogTitle) ogTitle.setAttribute("content", `${title} | Quickulus`);
    if (ogDesc) ogDesc.setAttribute("content", description);
    if (ogImg) ogImg.setAttribute("content", ogImage);
    if (ogUrl) ogUrl.setAttribute("content", fullCanonicalUrl);
    if (twitterImg) twitterImg.setAttribute("content", ogImage);
    if (twitterUrl) twitterUrl.setAttribute("content", fullCanonicalUrl);
    
    // ALWAYS update canonical URL (required for Google)
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullCanonicalUrl);
    
  }, [title, description, keywords, ogImage, canonicalUrl, location.pathname]);
  
  return null;
};
