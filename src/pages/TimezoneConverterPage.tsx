
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TimezoneConverter } from "@/components/calculators/TimezoneConverter";

const TimezoneConverterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Time Zone Converter</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Convert times between different time zones around the world.
            </p>
          </div>
          
          <div className="flex justify-center">
            <TimezoneConverter />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TimezoneConverterPage;
