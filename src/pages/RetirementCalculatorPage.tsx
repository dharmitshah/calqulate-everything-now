
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator";

const RetirementCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Retirement Calculator"
      description="Plan your retirement savings and estimate your future retirement income based on your current savings, contributions, and investment returns."
      keywords="retirement calculator, retirement planning, 401k calculator, retirement savings, investment returns, compound interest, retirement age"
      faqItems={[
        {
          question: "How much should I save for retirement?",
          answer: "Financial experts typically recommend saving 10-15% of your annual income for retirement. The exact amount depends on your desired retirement lifestyle, current age, expected retirement age, and other factors."
        },
        {
          question: "What is a reasonable rate of return to expect on investments?",
          answer: "Historically, a diversified portfolio has returned around 6-7% annually over the long term. Conservative estimates might use 4-5%, while more aggressive estimates might use 8-10%, depending on your risk tolerance and investment mix."
        },
        {
          question: "How does inflation affect my retirement savings?",
          answer: "Inflation reduces the purchasing power of your money over time. This calculator accounts for inflation by providing both nominal and inflation-adjusted values, giving you a more realistic picture of your future savings' worth."
        },
        {
          question: "What is the 4% rule in retirement planning?",
          answer: "The 4% rule suggests that retirees can withdraw 4% of their retirement savings in the first year of retirement, then adjust that amount for inflation each year, with a high probability of not outliving their money over a 30-year retirement period."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <RetirementCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default RetirementCalculatorPage;
