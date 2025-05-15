
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoanCalculator } from "@/components/calculators/LoanCalculator";
import { CalculatorCard } from "@/components/CalculatorCard";

const LoanCalculatorPage = () => {
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
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Loan Calculator</h1>
            <p className="text-muted-foreground">
              Calculate your monthly loan payments, total interest, and view the complete amortization schedule.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <LoanCalculator />
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <p className="mb-4">
                The Loan Calculator uses the standard amortization formula to calculate your monthly payments based on:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Loan amount (principal)</li>
                <li>Annual interest rate</li>
                <li>Loan term (in months)</li>
              </ul>
              <p className="mb-4">
                The formula used for calculating the monthly payment is:
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg mb-4">
                <p className="font-mono">
                  M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
                </p>
              </div>
              <p>Where:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>M = Monthly payment</li>
                <li>P = Principal (loan amount)</li>
                <li>r = Monthly interest rate (annual rate divided by 12 and converted to decimal)</li>
                <li>n = Total number of payments (loan term in months)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Types of Loans</h2>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-medium mb-1">Personal Loans</h3>
                  <p className="text-muted-foreground">
                    Typically used for personal expenses, debt consolidation, or small projects. Usually unsecured with terms of 2-7 years and higher interest rates compared to secured loans.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-medium mb-1">Car Loans</h3>
                  <p className="text-muted-foreground">
                    Specifically for purchasing vehicles. The car serves as collateral, resulting in lower interest rates. Typical terms range from 3-7 years.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-medium mb-1">Home Loans (Mortgages)</h3>
                  <p className="text-muted-foreground">
                    Used for purchasing homes or real estate. Secured by the property with long-term periods (typically 15-30 years) and lower interest rates.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-medium mb-1">Student Loans</h3>
                  <p className="text-muted-foreground">
                    Specifically for educational expenses. May offer deferred payments and special repayment plans. Terms typically range from 10-25 years.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Example Calculation</h2>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <p className="font-medium mb-2">Example:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Loan Amount: $20,000</li>
                  <li>Interest Rate: 5% per year</li>
                  <li>Loan Term: 60 months (5 years)</li>
                </ul>
                <p className="mb-2"><strong>Monthly Payment:</strong></p>
                <p className="mb-1">Monthly interest rate = 5% / 12 = 0.42%</p>
                <p className="mb-1">Number of payments = 60</p>
                <p className="mb-3">Using the formula: $20,000 * (0.0042 * (1.0042)^60) / ((1.0042)^60 - 1) = $377.42</p>
                <p><strong>Total Payment:</strong> $22,645.20</p>
                <p><strong>Total Interest:</strong> $2,645.20</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">FAQs</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">How can I lower my monthly payments?</h3>
                  <p className="text-muted-foreground">
                    You can lower monthly payments by extending your loan term, finding a lower interest rate, making a larger down payment, or refinancing an existing loan.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">What is an amortization schedule?</h3>
                  <p className="text-muted-foreground">
                    An amortization schedule is a table showing each payment throughout the life of the loan, broken down into principal and interest components. It demonstrates how the loan balance decreases over time.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Does this calculator account for additional fees or insurance?</h3>
                  <p className="text-muted-foreground">
                    This calculator focuses solely on the principal and interest components of loans. It doesn't include additional fees, insurance, taxes, or other costs that might be associated with certain loans.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">How accurate are these calculations?</h3>
                  <p className="text-muted-foreground">
                    These calculations use standard amortization formulas and provide accurate results based on the inputs. However, lenders might use slightly different calculation methods or compound interest differently.
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

export default LoanCalculatorPage;
