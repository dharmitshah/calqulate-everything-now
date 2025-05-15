
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RandomNumberGenerator } from "@/components/calculators/RandomNumberGenerator";

const RandomGeneratorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Random Generator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate random numbers, sequences, or secure passwords for various purposes.
            </p>
          </div>
          
          <div className="flex justify-center">
            <RandomNumberGenerator />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RandomGeneratorPage;
