import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";

const faqItems = [
  {
    question: "How much house can I afford?",
    answer: "A common guideline is that your monthly mortgage payment should not exceed 28% of your gross monthly income, and your total debt payments should not exceed 36% of your income. This calculator helps you see what your payments would be for different home prices."
  },
  {
    question: "What is a good down payment amount?",
    answer: "Traditionally, a 20% down payment is recommended to avoid private mortgage insurance (PMI). However, many loans allow down payments as low as 3-5%. A larger down payment reduces your loan amount and monthly payments."
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer: "A 15-year mortgage has higher monthly payments but saves significantly on total interest (often $100K+). A 30-year mortgage has lower monthly payments, giving you more financial flexibility. Use our calculator to compare both options."
  },
  {
    question: "What's included in my monthly mortgage payment?",
    answer: "Your monthly payment typically includes principal, interest, property taxes, and homeowners insurance (PITI). You may also pay private mortgage insurance (PMI) if your down payment is less than 20%, plus HOA fees if applicable."
  },
  {
    question: "How do I calculate my monthly mortgage payment?",
    answer: "Enter your home price, down payment, interest rate, and loan term in our calculator. The formula uses amortization to determine fixed monthly payments that pay off both principal and interest over the loan term."
  },
  {
    question: "What's the current average mortgage interest rate?",
    answer: "Mortgage rates fluctuate based on market conditions, credit score, and loan type. Our calculator lets you input any rate to see how it affects your payments. Check current rates with multiple lenders for the best deal."
  }
];

const howToUse = [
  { step: 1, instruction: "Enter the home purchase price" },
  { step: 2, instruction: "Input your down payment amount or percentage" },
  { step: 3, instruction: "Enter the annual interest rate (e.g., 6.5%)" },
  { step: 4, instruction: "Select your loan term (15 or 30 years)" },
  { step: 5, instruction: "View your monthly payment, total interest, and amortization schedule" }
];

const benefits = [
  "Calculate exact monthly mortgage payments instantly",
  "See total interest paid over the life of the loan",
  "Compare 15-year vs 30-year mortgage options",
  "View complete amortization schedule",
  "Factor in down payment and interest rate",
  "Free mortgage calculator - no signup required",
  "Perfect for home buyers and refinancing decisions"
];

const relatedCalculators = [
  { 
    title: "Loan Calculator", 
    path: "/calculator/loan", 
    description: "Calculate payments for personal loans, auto loans, and more." 
  },
  { 
    title: "Compound Interest Calculator", 
    path: "/calculator/compound-interest", 
    description: "See how your investments grow with compound interest." 
  },
  { 
    title: "Savings Calculator", 
    path: "/calculator/savings", 
    description: "Plan your savings goals with monthly contributions." 
  },
  { 
    title: "Retirement Calculator", 
    path: "/calculator/retirement", 
    description: "Plan for retirement with our savings projections." 
  }
];

const MortgageCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free Mortgage Calculator - Monthly Payment & Amortization Schedule"
      description="Calculate your monthly mortgage payment instantly. Free mortgage calculator with amortization schedule, total interest, and loan comparison. Perfect for home buyers - no signup required."
      keywords="mortgage calculator free, mortgage payment calculator, home loan calculator, mortgage calculator with taxes, house payment calculator, amortization calculator, mortgage interest calculator, down payment calculator, monthly mortgage payment, mortgage amortization calculator, how much house can I afford"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center my-8">
        <MortgageCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default MortgageCalculatorPage;
