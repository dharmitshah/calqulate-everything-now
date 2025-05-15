
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export const SEO = ({
  title,
  description,
  keywords,
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  canonicalUrl,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | CalcVerse`;
    
    // Find meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImg = document.querySelector('meta[property="og:image"]');
    const twitterImg = document.querySelector('meta[name="twitter:image"]');
    
    // Update meta tags if they exist
    if (metaDescription) metaDescription.setAttribute("content", description);
    if (metaKeywords && keywords) metaKeywords.setAttribute("content", keywords);
    if (ogTitle) ogTitle.setAttribute("content", `${title} | CalcVerse`);
    if (ogDesc) ogDesc.setAttribute("content", description);
    if (ogImg) ogImg.setAttribute("content", ogImage);
    if (twitterImg) twitterImg.setAttribute("content", ogImage);
    
    // Add or update canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag && canonicalUrl) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    if (canonicalTag && canonicalUrl) {
      canonicalTag.setAttribute('href', canonicalUrl);
    }
    
    return () => {
      // Clean up canonical tag if we created one
      if (canonicalTag && !document.querySelector('link[rel="canonical"]')) {
        document.head.removeChild(canonicalTag);
      }
    };
  }, [title, description, keywords, ogImage, canonicalUrl]);
  
  return null; // This component doesn't render anything
};
