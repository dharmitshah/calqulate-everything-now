
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoanCalculator } from "@/components/calculators/LoanCalculator";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { CalculatorCard } from "@/components/CalculatorCard";
import { Home, PiggyBank, Calculator } from "lucide-react";

const LoanCalculatorPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Loan Calculator",
    "description": "Calculate monthly loan payments, total interest, and amortization schedule for personal loans, auto loans, and more.",
    "url": "https://quickulus.com/calculator/loan",
    "applicationCategory": "FinanceApplication", 
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Calculate monthly payments",
      "View amortization schedule",
      "Compare different loan terms",
      "Works for all loan types"
    ]
  };

  const relatedCalculators = [
    {
      title: "Mortgage Calculator",
      description: "Calculate mortgage payments and see amortization schedule",
      path: "/calculator/mortgage",
      icon: <Home className="w-6 h-6" />
    },
    {
      title: "Savings Calculator", 
      description: "Calculate how your savings grow with compound interest",
      path: "/calculator/savings",
      icon: <PiggyBank className="w-6 h-6" />
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
        title="Loan Calculator - Monthly Payment & Interest Calculator"
        description="Calculate monthly loan payments, total interest, and amortization schedule. Works for personal loans, auto loans, student loans, and more. Free loan calculator."
        keywords="loan calculator, monthly payment calculator, interest calculator, amortization calculator, personal loan, auto loan calculator"
        canonicalUrl="https://quickulus.com/calculator/loan"
      />
      <StructuredData data={structuredData} />
      
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Loan Calculator - Monthly Payment Calculator</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Calculate your monthly loan payments, total interest, and view the complete amortization schedule. 
              Perfect for personal loans, auto loans, student loans, and any fixed-rate loan.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <LoanCalculator />
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">How the Loan Calculator Works</h2>
              <p className="mb-4">
                This loan payment calculator uses the standard amortization formula to determine your monthly payments based on:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Loan Amount:</strong> The principal amount you're borrowing</li>
                <li><strong>Interest Rate:</strong> Annual percentage rate (APR) for your loan</li>
                <li><strong>Loan Term:</strong> Length of the loan in months or years</li>
              </ul>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Loan Payment Formula:</h3>
                <p className="font-mono text-sm mb-2">
                  Monthly Payment = P × [r(1+r)ⁿ] / [(1+r)ⁿ-1]
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>Where: P = Principal, r = Monthly interest rate, n = Number of payments</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Types of Loans This Calculator Supports</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-medium mb-2">Personal Loans</h3>
                  <p className="text-sm text-muted-foreground">
                    Unsecured loans for debt consolidation, home improvements, or major purchases. 
                    Typically 2-7 years with fixed interest rates.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-medium mb-2">Auto Loans</h3>
                  <p className="text-sm text-muted-foreground">
                    Secured loans for vehicle purchases. The car serves as collateral, 
                    typically offering lower interest rates than personal loans.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-medium mb-2">Student Loans</h3>
                  <p className="text-sm text-muted-foreground">
                    Educational loans with various repayment options. Calculate standard 
                    10-year repayment or extended payment plans.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h3 className="font-medium mb-2">Home Equity Loans</h3>
                  <p className="text-sm text-muted-foreground">
                    Fixed-rate loans secured by your home equity. Typically used for 
                    major expenses like home renovations or debt consolidation.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Tips for Getting Better Loan Terms</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Improve Your Credit Score</h3>
                  <p className="text-sm text-muted-foreground">
                    A higher credit score can qualify you for lower interest rates, saving thousands over the loan term.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Shop Around</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare rates from multiple lenders including banks, credit unions, and online lenders.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Consider Shorter Terms</h3>
                  <p className="text-sm text-muted-foreground">
                    While monthly payments are higher, shorter loan terms mean less total interest paid.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">What's the difference between APR and interest rate?</h3>
                  <p className="text-sm text-muted-foreground">
                    Interest rate is the cost of borrowing, while APR includes the interest rate plus additional fees and costs, giving you the total annual cost of the loan.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Can I pay off my loan early?</h3>
                  <p className="text-sm text-muted-foreground">
                    Most loans allow early payoff, but some have prepayment penalties. Check your loan terms and calculate if early payment saves money after any fees.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">How accurate is this loan calculator?</h3>
                  <p className="text-sm text-muted-foreground">
                    This calculator provides accurate estimates based on the standard amortization formula. Actual payments may vary slightly based on how your lender calculates interest.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Related Financial Calculators</h2>
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
