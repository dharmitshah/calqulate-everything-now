
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BMICalculator } from "@/components/calculators/BMICalculator";
import { CalculatorCard } from "@/components/CalculatorCard";

const BMICalculatorPage = () => {
  const relatedCalculators = [
    {
      title: "Basic Calculator",
      description: "A simple calculator for basic arithmetic operations.",
      path: "/calculator/basic",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
        </svg>
      )
    },
    {
      title: "Age Calculator",
      description: "Find out your exact age in years, months, and days.",
      path: "/calculator/age",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>
      )
    },
    {
      title: "Loan Calculator",
      description: "Calculate monthly payments, total interest, and view amortization schedule.",
      path: "/calculator/loan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
            <p className="text-muted-foreground">
              Calculate your Body Mass Index (BMI) and understand what it means for your health.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <BMICalculator />
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <p className="mb-4">
                The Body Mass Index (BMI) is a measure of body fat based on height and weight. It is calculated using the following formula:
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg mb-4">
                <p className="font-mono">BMI = weight(kg) / [height(m)]²</p>
              </div>
              <p className="mb-4">
                For the imperial system, the formula is:
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg mb-4">
                <p className="font-mono">BMI = [weight(lbs) / height²(inches)] × 703</p>
              </div>
              <p>
                Once calculated, your BMI falls into one of the following categories:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><span className="font-medium text-blue-500">Underweight</span>: BMI less than 18.5</li>
                <li><span className="font-medium text-green-500">Normal weight</span>: BMI between 18.5 and 24.9</li>
                <li><span className="font-medium text-orange-500">Overweight</span>: BMI between 25 and 29.9</li>
                <li><span className="font-medium text-red-500">Obesity</span>: BMI 30 or greater</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Example Calculations</h2>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <p className="font-medium mb-2">Example 1:</p>
                  <p className="mb-2">A person weighing 70 kg with a height of 1.75 m</p>
                  <p className="mb-1">BMI = 70 / (1.75)² = 70 / 3.06 = 22.9</p>
                  <p className="text-green-500">Category: Normal weight</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <p className="font-medium mb-2">Example 2:</p>
                  <p className="mb-2">A person weighing 160 lbs with a height of 5'10" (70 inches)</p>
                  <p className="mb-1">BMI = (160 / 70²) × 703 = (160 / 4900) × 703 = 23.0</p>
                  <p className="text-green-500">Category: Normal weight</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">About BMI</h2>
              <p className="mb-4">
                While BMI is a useful screening tool, it's important to remember that it has limitations:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>It doesn't distinguish between fat and muscle</li>
                <li>It doesn't account for muscle mass variation among different individuals</li>
                <li>It doesn't consider age, sex, ethnicity, or body composition</li>
                <li>Athletes may have a high BMI due to increased muscle mass, not body fat</li>
              </ul>
              <p className="mt-4">
                Always consult with healthcare professionals for a comprehensive health assessment.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">FAQs</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Is BMI accurate for everyone?</h3>
                  <p className="text-muted-foreground">
                    BMI is a general indicator but may not be accurate for athletes, elderly people, or those with high muscle mass. It's best used as a screening tool rather than a diagnostic tool.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">How often should I check my BMI?</h3>
                  <p className="text-muted-foreground">
                    For most adults, checking BMI once a year during regular health check-ups is sufficient. More frequent monitoring might be recommended if you're working on weight management goals.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">What should I do if my BMI indicates I'm overweight or obese?</h3>
                  <p className="text-muted-foreground">
                    Consult with a healthcare provider who can provide personalized advice. They may recommend lifestyle changes including diet modifications and increased physical activity.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Related Calculators</h2>
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
