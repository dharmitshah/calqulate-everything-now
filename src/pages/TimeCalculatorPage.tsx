
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TimeCalculator } from "@/components/calculators/TimeCalculator";

const TimeCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Time Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Add or subtract hours, minutes, and seconds, or convert between different time units.
            </p>
          </div>
          
          <div className="flex justify-center">
            <TimeCalculator />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TimeCalculatorPage;
