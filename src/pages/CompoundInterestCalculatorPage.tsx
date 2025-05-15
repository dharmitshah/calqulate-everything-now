
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { CompoundInterestCalculator } from "@/components/calculators/CompoundInterestCalculator";

const CompoundInterestCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate the future value of your investments with compound interest and regular contributions."
      keywords="compound interest, investment calculator, compound interest calculator, interest calculator, future value, investment growth"
      faqItems={[
        {
          question: "What is compound interest?",
          answer: "Compound interest is interest calculated on the initial principal and also on the accumulated interest over previous periods. It's often described as 'interest on interest' and is the reason why saving and investing over long periods can lead to exponential growth."
        },
        {
          question: "How does compound frequency affect my returns?",
          answer: "The more frequently interest compounds (e.g., daily vs. annually), the greater your returns will be. This is because interest is calculated and added to your principal more often, allowing you to earn interest on that new interest sooner."
        },
        {
          question: "Why do regular contributions make such a difference?",
          answer: "Regular contributions leverage the power of compound interest over time. Each new contribution begins earning compound interest immediately, and the earlier you add money, the more time it has to grow exponentially."
        },
        {
          question: "Is this calculator accounting for taxes and inflation?",
          answer: "No, this calculator shows the raw growth of your investment through compound interest. It doesn't account for taxes, inflation, or investment fees, which would reduce your effective returns."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <CompoundInterestCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculatorPage;
