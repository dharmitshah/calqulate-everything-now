
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FuelEconomyCalculator } from "@/components/calculators/FuelEconomyCalculator";

const FuelEconomyCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
