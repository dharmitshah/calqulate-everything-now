
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TipCalculator } from "@/components/calculators/TipCalculator";

const TipCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Tip Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate tips and split bills with ease. Perfect for dining out with friends or family.
            </p>
          </div>
          
          <div className="flex justify-center">
            <TipCalculator />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TipCalculatorPage;
