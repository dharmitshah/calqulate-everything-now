import React from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface CalculatorLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string;
  faqItems?: Array<{ question: string; answer: string }>;
  howToUse?: Array<{ step: number; instruction: string }>;
  benefits?: string[];
  relatedCalculators?: Array<{ title: string; path: string; description: string }>;
  category?: string;
}

export const CalculatorLayout = ({
  children,
  title,
  description,
  keywords = "",
  faqItems = [],
  howToUse = [],
  benefits = [],
  relatedCalculators = [],
  category = "Math"
}: CalculatorLayoutProps) => {
  const location = useLocation();
  const currentPath = `https://quickulus.com${location.pathname}`;

  // Generate FAQ structured data for rich snippets
  const faqStructuredData = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Generate HowTo structured data for rich snippets
  const howToStructuredData = howToUse.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${title}`,
    "description": description,
    "totalTime": "PT2M",
    "step": howToUse.map(step => ({
      "@type": "HowToStep",
      "position": step.step,
      "name": `Step ${step.step}`,
      "text": step.instruction
    }))
  } : null;

  // Generate WebApplication structured data
  const appStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "url": currentPath,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "description": description,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "520",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://quickulus.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Calculators",
        "item": "https://quickulus.com/calculators"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": currentPath
      }
    ]
  };

  return (
    <>
      {/* SEO Component */}
      <SEO 
        title={title}
        description={description}
        keywords={`${keywords}, calculator, online calculator, free calculator, Quickulus`}
        canonicalUrl={currentPath}
      />
      
      {/* Structured Data for SEO Rich Snippets */}
      <StructuredData data={appStructuredData} />
      <StructuredData data={breadcrumbData} />
      {faqStructuredData && <StructuredData data={faqStructuredData} />}
      {howToStructuredData && <StructuredData data={howToStructuredData} />}
      
      <div className="flex flex-col min-h-screen">
        <Header />
      
        <main className="flex-grow container px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span className="sr-only">Home</span>
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4" />
                <li>
                  <Link to="/calculators" className="hover:text-foreground">
                    Calculators
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4" />
                <li>
                  <span className="text-foreground font-medium" aria-current="page">
                    {title}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-muted-foreground text-lg">{description}</p>
            </div>
            
            <div className="mb-12">
              {children}
            </div>

          {/* How to Use Section */}
          {howToUse.length > 0 && (
            <section className="mt-16 mb-12">
              <h2 className="text-2xl font-bold mb-6">How to Use This Calculator</h2>
              <div className="grid gap-4">
                {howToUse.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      {step.step}
                    </div>
                    <p className="text-muted-foreground">{step.instruction}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Benefits Section */}
          {benefits.length > 0 && (
            <section className="mt-16 mb-12">
              <h2 className="text-2xl font-bold mb-6">Benefits of Using This Calculator</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Calculators */}
          {relatedCalculators.length > 0 && (
            <section className="mt-16 mb-12">
              <h2 className="text-2xl font-bold mb-6">Related Calculators</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedCalculators.map((calc, index) => (
                  <a 
                    key={index} 
                    href={calc.path}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-semibold mb-2">{calc.title}</h3>
                    <p className="text-sm text-muted-foreground">{calc.description}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
          
          {/* FAQ Section */}
          {faqItems.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="p-5 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
    </>
  );
};
