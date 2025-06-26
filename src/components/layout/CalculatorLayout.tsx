
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface CalculatorLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string;
  faqItems?: Array<{ question: string; answer: string }>;
}

export const CalculatorLayout = ({
  children,
  title,
  description,
  keywords = "",
  faqItems = []
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          <div className="mb-12">
            {children}
          </div>
          
          {faqItems.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="p-5 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
