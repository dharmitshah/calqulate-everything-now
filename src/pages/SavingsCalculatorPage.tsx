
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { SavingsCalculator } from "@/components/calculators/SavingsCalculator";

const SavingsCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Savings Calculator"
      description="Calculate how your savings will grow over time with the power of compound interest and regular contributions."
      keywords="savings calculator, compound interest calculator, investment calculator, interest calculator, future value, savings growth, money calculator"
      faqItems={[
        {
          question: "What is compound interest and why is it important?",
          answer: "Compound interest is when you earn interest not only on your initial investment but also on the interest that has accumulated over time. It's often called 'interest on interest' and can significantly increase your savings over long periods."
        },
        {
          question: "How often should I contribute to my savings?",
          answer: "Regular contributions, even small ones, can substantially increase your savings due to compound interest. Monthly contributions are common, but any consistent schedule works. This calculator can show you the impact of different contribution amounts."
        },
        {
          question: "What interest rate should I use for my calculations?",
          answer: "Interest rates vary widely depending on the type of account or investment. Savings accounts might offer 0.5-2%, CDs 1-4%, and investment portfolios 5-10% average annual returns (with higher risk). Use a rate that matches your savings vehicle."
        },
        {
          question: "How does the compounding frequency affect my savings?",
          answer: "More frequent compounding (daily vs. annually) results in slightly higher returns. However, the difference is minimal at lower interest rates. This calculator allows you to compare different compounding frequencies."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <SavingsCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default SavingsCalculatorPage;
