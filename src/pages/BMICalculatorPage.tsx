
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BMICalculator } from "@/components/calculators/BMICalculator";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { CalculatorCard } from "@/components/CalculatorCard";
import { Scale, Heart, Calculator } from "lucide-react";

const BMICalculatorPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BMI Calculator",
    "description": "Calculate your Body Mass Index (BMI) with our free, accurate BMI calculator. Supports both metric and imperial units.",
    "url": "https://quickulus.com/calculator/bmi",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Calculate BMI in metric and imperial units",
      "Instant BMI category classification",
      "Mobile-friendly interface",
      "No registration required"
    ]
  };

  const relatedCalculators = [
    {
      title: "Calorie Calculator",
      description: "Calculate your daily calorie needs based on activity level",
      path: "/calculator/calorie",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Age Calculator",
      description: "Calculate your exact age in years, months, and days",
      path: "/calculator/age",
      icon: <Calculator className="w-6 h-6" />
    },
    {
      title: "Basic Calculator",
      description: "Simple arithmetic calculations for everyday use",
      path: "/calculator/basic",
      icon: <Calculator className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="BMI Calculator - Body Mass Index Calculator" 
        description="Calculate your BMI (Body Mass Index) with our free, accurate calculator. Supports metric and imperial units. Get instant results and health category classification."
        keywords="BMI calculator, body mass index, weight calculator, health calculator, BMI chart, obesity calculator"
        canonicalUrl="https://quickulus.com/calculator/bmi"
      />
      <StructuredData data={structuredData} />
      
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">BMI Calculator - Body Mass Index</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Calculate your Body Mass Index (BMI) to understand if you're in a healthy weight range. 
              Our calculator supports both metric (kg/cm) and imperial (lbs/ft) units with instant results.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <BMICalculator />
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">What is BMI?</h2>
              <p className="mb-4">
                Body Mass Index (BMI) is a simple calculation using your height and weight to determine if you're in a healthy weight range. 
                While BMI doesn't directly measure body fat, it's a useful screening tool for weight categories that may lead to health problems.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-semibold mb-3">BMI Categories:</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Underweight:</span>
                      <span className="text-blue-600">Below 18.5</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Normal weight:</span>
                      <span className="text-green-600">18.5 - 24.9</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Overweight:</span>
                      <span className="text-orange-600">25.0 - 29.9</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Obesity:</span>
                      <span className="text-red-600">30.0 and above</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-semibold mb-3">How to Use:</h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Choose metric or imperial units</li>
                    <li>Enter your height and weight</li>
                    <li>Click "Calculate BMI"</li>
                    <li>View your BMI score and category</li>
                  </ol>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">BMI Formula</h2>
              <p className="mb-4">The BMI calculation formula varies depending on the units you use:</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-semibold mb-2">Metric Formula:</h3>
                  <p className="font-mono text-sm">BMI = weight (kg) / height (m)²</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Example: 70 kg ÷ (1.75 m)² = 22.9
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-semibold mb-2">Imperial Formula:</h3>
                  <p className="font-mono text-sm">BMI = (weight (lbs) / height (in)²) × 703</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Example: (154 lbs ÷ (69 in)²) × 703 = 22.8
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Important Notes</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="mb-2">
                  <strong>BMI limitations:</strong> BMI doesn't distinguish between muscle and fat mass, so it may not be accurate for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Athletes with high muscle mass</li>
                  <li>Elderly individuals with reduced muscle mass</li>
                  <li>Pregnant women</li>
                  <li>Children (different BMI charts apply)</li>
                </ul>
                <p className="mt-3 text-sm">
                  Always consult with a healthcare professional for personalized health advice.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Related Health Calculators</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedCalculators.map((calculator) => (
                  <CalculatorCard
                    key={calculator.title}
                    title={calculator.title}
                    description={calculator.description}
                    icon={calculator.icon}
                    path={calculator.path}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BMICalculatorPage;
