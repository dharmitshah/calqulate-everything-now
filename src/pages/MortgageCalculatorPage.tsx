
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";

const MortgageCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your estimated monthly mortgage payments, total interest, and see the full amortization schedule for your home loan."
      keywords="mortgage calculator, home loan calculator, mortgage payment, house payment calculator, interest, principal, amortization schedule, down payment"
      faqItems={[
        {
          question: "How much house can I afford?",
          answer: "A common guideline is that your monthly mortgage payment should not exceed 28% of your gross monthly income, and your total debt payments should not exceed 36% of your income. This calculator helps you see what your payments would be for different home prices."
        },
        {
          question: "What is a good down payment amount?",
          answer: "Traditionally, a 20% down payment is recommended to avoid private mortgage insurance (PMI). However, many loans allow down payments as low as 3-5%. A larger down payment reduces your loan amount and monthly payments."
        },
        {
          question: "How does the loan term affect my mortgage?",
          answer: "A shorter loan term (like 15 years vs. 30 years) typically means higher monthly payments but significantly less interest paid over the life of the loan. This calculator allows you to compare different loan terms."
        },
        {
          question: "What's not included in these mortgage calculations?",
          answer: "These calculations show principal and interest only. Your actual monthly housing costs will also include property taxes, homeowners insurance, possibly PMI, and for some properties, homeowners association (HOA) fees."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <MortgageCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default MortgageCalculatorPage;
