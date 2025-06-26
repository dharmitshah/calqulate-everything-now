
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StockMarketCalculator } from "@/components/calculators/StockMarketCalculator";

const StockMarketCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Stock Market Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate profit/loss for trades, position sizes, brokerage costs, portfolio metrics,
              and plan trades effectively with detailed analysis for both Indian and U.S. markets.
            </p>
          </div>
          
          <div className="flex justify-center">
            <StockMarketCalculator />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StockMarketCalculatorPage;
