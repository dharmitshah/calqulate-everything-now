import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { PercentageCalculator } from "@/components/calculators/PercentageCalculator";

const faqItems = [
  {
    question: "How do I calculate what percent one number is of another?",
    answer: "Divide the part by the whole and multiply by 100. For example, what percent is 25 of 200? (25 ÷ 200) × 100 = 12.5%. Our calculator does this instantly."
  },
  {
    question: "How do I calculate percentage increase or decrease?",
    answer: "Formula: ((New Value - Original Value) ÷ Original Value) × 100. For example, from $50 to $75 is a 50% increase. Our calculator handles this automatically."
  },
  {
    question: "How do I find X percent of a number?",
    answer: "Multiply the number by the percentage divided by 100. For example, 20% of 150 = 150 × (20/100) = 30. Just enter your values in our calculator."
  },
  {
    question: "What's the difference between percentage and percentage points?",
    answer: "If interest rates go from 5% to 7%, that's a 2 percentage point increase but a 40% percentage increase. Our calculator helps clarify both."
  },
  {
    question: "How do I calculate reverse percentages?",
    answer: "To find the original price after a discount: Final Price ÷ (1 - Discount%). For example, if something costs $80 after 20% off, original = $80 ÷ 0.8 = $100."
  },
  {
    question: "How do I calculate percentage difference between two numbers?",
    answer: "Use: |Value1 - Value2| ÷ ((Value1 + Value2) ÷ 2) × 100. This gives the difference as a percentage of the average. Great for comparing prices or statistics."
  }
];

const howToUse = [
  { step: 1, instruction: "Choose your calculation type (percent of number, percentage change, etc.)" },
  { step: 2, instruction: "Enter your values in the input fields" },
  { step: 3, instruction: "Get your result instantly" },
  { step: 4, instruction: "Copy or use the result for your calculations" }
];

const benefits = [
  "Calculate any percentage instantly - no formulas needed",
  "Find X% of any number",
  "Calculate percentage increase and decrease",
  "Find what percent one number is of another",
  "Calculate original price from discounted price",
  "Perfect for shopping, grades, finance, and statistics",
  "100% free - works on any device"
];

const relatedCalculators = [
  { 
    title: "Discount Calculator", 
    path: "/calculator/discount", 
    description: "Calculate sale prices and savings on discounts." 
  },
  { 
    title: "Tip Calculator", 
    path: "/calculator/tip", 
    description: "Calculate tips and split bills easily." 
  },
  { 
    title: "Compound Interest Calculator", 
    path: "/calculator/compound-interest", 
    description: "See how percentage returns compound over time." 
  },
  { 
    title: "GPA Calculator", 
    path: "/calculator/gpa", 
    description: "Calculate your grade point average." 
  }
];

const PercentageCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free Percentage Calculator - Calculate Percent, Increase, Decrease"
      description="Calculate percentages instantly! Find X% of a number, percentage increase/decrease, and percentage difference. Free percentage calculator for shopping, grades, finance - no signup."
      keywords="percentage calculator, calculate percentage, percent calculator, percentage increase calculator, percentage decrease calculator, percentage difference, find percentage of number, percentage change calculator, what percent is, percentage formula, how to calculate percentage"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center">
        <PercentageCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default PercentageCalculatorPage;
