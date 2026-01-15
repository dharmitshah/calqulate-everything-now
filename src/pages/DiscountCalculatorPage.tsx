import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { DiscountCalculator } from "@/components/calculators/DiscountCalculator";

const faqItems = [
  {
    question: "How do I calculate the sale price after a discount?",
    answer: "Multiply the original price by (1 - discount percentage). For example, $100 with 25% off = $100 × 0.75 = $75. Our calculator does this instantly."
  },
  {
    question: "How do I calculate how much I save with a discount?",
    answer: "Multiply the original price by the discount percentage. For $100 at 30% off, savings = $100 × 0.30 = $30. Our calculator shows both final price and savings."
  },
  {
    question: "How do I calculate the discount percentage?",
    answer: "Formula: ((Original Price - Sale Price) ÷ Original Price) × 100. For example, if something goes from $80 to $60: (($80 - $60) ÷ $80) × 100 = 25% off."
  },
  {
    question: "How do I calculate double discounts (discount on discount)?",
    answer: "Apply discounts sequentially. For 20% off then 10% off on $100: First discount: $100 × 0.80 = $80. Second discount: $80 × 0.90 = $72. Total discount is 28%, not 30%."
  },
  {
    question: "How do I find the original price from a sale price?",
    answer: "Divide the sale price by (1 - discount percentage). If something is $60 after 25% off: $60 ÷ 0.75 = $80 original price."
  },
  {
    question: "Which is better: $20 off or 20% off?",
    answer: "It depends on the price! On a $50 item, $20 off (40%) is better. On a $200 item, 20% off ($40) is better. Use our calculator to compare deals."
  }
];

const howToUse = [
  { step: 1, instruction: "Enter the original price of the item" },
  { step: 2, instruction: "Enter the discount percentage (e.g., 25%)" },
  { step: 3, instruction: "View the final sale price and amount saved" },
  { step: 4, instruction: "Compare multiple deals to find the best bargain" }
];

const benefits = [
  "Calculate sale prices instantly",
  "See exact savings in dollars/currency",
  "Find discount percentage from original and sale price",
  "Calculate original price from sale price",
  "Compare different discount offers",
  "Perfect for shopping sales and deals",
  "100% free - works on mobile and desktop"
];

const relatedCalculators = [
  { 
    title: "Percentage Calculator", 
    path: "/calculator/percentage", 
    description: "Calculate any percentage or percentage change." 
  },
  { 
    title: "Tip Calculator", 
    path: "/calculator/tip", 
    description: "Calculate tips and split restaurant bills." 
  },
  { 
    title: "Compound Interest Calculator", 
    path: "/calculator/compound-interest", 
    description: "See how savings grow over time." 
  },
  { 
    title: "Currency Converter", 
    path: "/calculator/currency", 
    description: "Convert prices between currencies." 
  }
];

const DiscountCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free Discount Calculator - Calculate Sale Price & Savings"
      description="Calculate discounts instantly! Find sale prices, savings, and discount percentages. Free discount calculator for smart shopping - no signup required."
      keywords="discount calculator, sale price calculator, discount calculator online, percent off calculator, calculate discount, savings calculator, how to calculate discount, discount percentage calculator, sale calculator, price after discount"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center">
        <DiscountCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default DiscountCalculatorPage;
