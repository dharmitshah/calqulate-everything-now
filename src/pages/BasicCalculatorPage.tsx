
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BasicCalculator } from "@/components/calculators/BasicCalculator";
import { CalculatorCard } from "@/components/CalculatorCard";

const BasicCalculatorPage = () => {
  const relatedCalculators = [
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and check your weight category.",
      path: "/calculator/bmi",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
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
            <h1 className="text-3xl font-bold mb-2">Basic Calculator</h1>
            <p className="text-muted-foreground">
              A simple calculator for basic arithmetic operations like addition, subtraction, multiplication, and division.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <BasicCalculator />
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <p className="mb-4">
                This basic calculator performs simple arithmetic operations. It allows you to:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Add numbers using the + operator</li>
                <li>Subtract numbers using the - operator</li>
                <li>Multiply numbers using the × operator</li>
                <li>Divide numbers using the ÷ operator</li>
              </ul>
              <p>
                The calculator follows the standard order of operations, calculating from left to right.
                Press "=" to see the result, or "C" to clear the display and start over.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Example Calculations</h2>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <p className="font-medium mb-2">Addition Example:</p>
                  <p>25 + 15 = 40</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <p className="font-medium mb-2">Subtraction Example:</p>
                  <p>80 - 35 = 45</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <p className="font-medium mb-2">Multiplication Example:</p>
                  <p>12 × 6 = 72</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <p className="font-medium mb-2">Division Example:</p>
                  <p>144 ÷ 12 = 12</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">FAQs</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Can I perform multiple operations at once?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can chain multiple operations together. The calculator will perform them from left to right.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">What happens if I divide by zero?</h3>
                  <p className="text-muted-foreground">
                    Dividing by zero will show an "Error" message, as division by zero is mathematically undefined.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">How many decimal places does the calculator show?</h3>
                  <p className="text-muted-foreground">
                    The calculator will display up to 8 decimal places when necessary, and removes trailing zeros.
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

export default BasicCalculatorPage;
