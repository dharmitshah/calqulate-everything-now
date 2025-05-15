
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CurrencyConverter } from "@/components/calculators/CurrencyConverter";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CurrencyConverterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Currency Converter</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              Convert between different currencies using the latest exchange rates.
            </p>
            <Button variant="outline" asChild className="inline-flex items-center">
              <a 
                href="https://www.xe.com/currencyconverter/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Visit XE.com for live rates <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="flex justify-center">
            <CurrencyConverter />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CurrencyConverterPage;
