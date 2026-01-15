import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { CompoundInterestCalculator } from "@/components/calculators/CompoundInterestCalculator";

const faqItems = [
  {
    question: "What is compound interest and how does it work?",
    answer: "Compound interest is 'interest on interest' - you earn interest not only on your initial investment but also on previously accumulated interest. This creates exponential growth over time, which is why Einstein allegedly called it the 'eighth wonder of the world.'"
  },
  {
    question: "How does compound frequency affect my investment returns?",
    answer: "The more frequently interest compounds (daily > monthly > annually), the faster your money grows. Daily compounding earns slightly more than monthly, which earns more than yearly. Our calculator lets you compare all options."
  },
  {
    question: "What's the compound interest formula?",
    answer: "The formula is A = P(1 + r/n)^(nt), where A = final amount, P = principal, r = annual interest rate, n = compounding frequency per year, and t = time in years. Our calculator does this math instantly."
  },
  {
    question: "How much will $10,000 grow in 10 years at 7% interest?",
    answer: "With annual compounding: $19,672. With monthly compounding: $20,097. With daily compounding: $20,138. Use our calculator to see exact results for any amount, rate, and time period."
  },
  {
    question: "Why do regular monthly contributions make such a big difference?",
    answer: "Regular contributions leverage compound interest continuously. Each new deposit immediately starts earning compound interest. A $500/month contribution over 30 years at 7% can grow to over $600,000!"
  },
  {
    question: "Does this calculator account for taxes and inflation?",
    answer: "This calculator shows raw growth through compound interest. Real returns depend on account type (401k, Roth IRA, taxable) and inflation. For after-tax planning, consult a financial advisor."
  }
];

const howToUse = [
  { step: 1, instruction: "Enter your initial investment (principal amount)" },
  { step: 2, instruction: "Set the annual interest rate (e.g., 7% for stock market average)" },
  { step: 3, instruction: "Choose the compounding frequency (daily, monthly, annually)" },
  { step: 4, instruction: "Enter the time period in years" },
  { step: 5, instruction: "Add optional regular contributions to see accelerated growth" }
];

const benefits = [
  "Calculate future value of any investment instantly",
  "Compare daily, monthly, quarterly, and annual compounding",
  "Add regular monthly contributions to projections",
  "See total interest earned separately from principal",
  "Visualize exponential growth over time",
  "Perfect for retirement and savings planning",
  "100% free - no signup required"
];

const relatedCalculators = [
  { 
    title: "Savings Calculator", 
    path: "/calculator/savings", 
    description: "Plan your savings goals with regular deposits." 
  },
  { 
    title: "Retirement Calculator", 
    path: "/calculator/retirement", 
    description: "Project your retirement savings and income needs." 
  },
  { 
    title: "Loan Calculator", 
    path: "/calculator/loan", 
    description: "Calculate loan payments and total interest costs." 
  },
  { 
    title: "Mortgage Calculator", 
    path: "/calculator/mortgage", 
    description: "Estimate monthly mortgage payments and amortization." 
  }
];

const CompoundInterestCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free Compound Interest Calculator - Investment Growth & Savings"
      description="Calculate compound interest on investments and savings. See how your money grows with daily, monthly, or annual compounding. Free investment calculator with contributions - no signup required."
      keywords="compound interest calculator, investment calculator, compound interest formula, interest calculator online, future value calculator, investment growth calculator, savings growth calculator, compound interest calculator with monthly contributions, how to calculate compound interest, free compound interest calculator"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center my-8">
        <CompoundInterestCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculatorPage;
