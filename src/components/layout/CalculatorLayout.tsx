
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";

interface CalculatorLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string;
  faqItems?: Array<{ question: string; answer: string }>;
  howToUse?: Array<{ step: number; instruction: string }>;
  benefits?: string[];
  relatedCalculators?: Array<{ title: string; path: string; description: string }>;
}

export const CalculatorLayout = ({
  children,
  title,
  description,
  keywords = "",
  faqItems = [],
  howToUse = [],
  benefits = [],
  relatedCalculators = []
}: CalculatorLayoutProps) => {
  // Update document title for SEO
  React.useEffect(() => {
    document.title = `${title} | Quickulus`;
    
    // Update meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
    
    // Update meta keywords for SEO
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute("content", `calculator, ${keywords}, online calculator, Quickulus`);
    }
  }, [title, description, keywords]);

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
    "step": howToUse.map(step => ({
      "@type": "HowToStep",
      "position": step.step,
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
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": description
  };

  return (
    <>
      {/* Structured Data for SEO Rich Snippets */}
      <StructuredData data={appStructuredData} />
      {faqStructuredData && <StructuredData data={faqStructuredData} />}
      {howToStructuredData && <StructuredData data={howToStructuredData} />}
      
      <div className="flex flex-col min-h-screen">
        <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
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
