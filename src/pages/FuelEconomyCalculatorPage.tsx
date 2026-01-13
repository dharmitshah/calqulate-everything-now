import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FuelEconomyCalculator } from "@/components/calculators/FuelEconomyCalculator";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";

const FuelEconomyCalculatorPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Fuel Economy Calculator",
    "description": "Calculate your car's MPG and fuel costs instantly. Free fuel efficiency calculator.",
    "url": "https://quickulus.com/calculator/fuel-economy",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Free Fuel Economy Calculator - MPG & L/100km" 
        description="Calculate your car's fuel economy in MPG or L/100km. Find out your true fuel costs per mile & plan trip expenses. Instant results, no signup needed!"
        keywords="fuel economy calculator, fuel efficiency calculator, MPG calculator, gas mileage calculator, fuel cost calculator, L/100km calculator"
      />
      <StructuredData data={structuredData} />
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Fuel Economy Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate your vehicle's fuel efficiency in MPG or L/100km, and estimate fuel costs for trips.
            </p>
          </div>
          
          <div className="flex justify-center">
            <FuelEconomyCalculator />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FuelEconomyCalculatorPage;
