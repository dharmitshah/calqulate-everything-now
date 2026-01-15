import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { TipCalculator } from "@/components/calculators/TipCalculator";

const faqItems = [
  {
    question: "How much should I tip at a restaurant?",
    answer: "Standard tipping in the US is 15-20% for good service. For excellent service, tip 20-25%. For average service, 15% is acceptable. Our calculator makes it easy to figure out the exact amount."
  },
  {
    question: "How do I calculate tip on a bill?",
    answer: "Multiply the bill by the tip percentage divided by 100. For a $50 bill at 20%: $50 × 0.20 = $10 tip. Or use our calculator for instant results with bill splitting."
  },
  {
    question: "Should I tip before or after tax?",
    answer: "Traditionally, tipping is calculated on the pre-tax amount. However, many people tip on the total bill for simplicity. Our calculator lets you enter either amount."
  },
  {
    question: "How do I split a bill with tip between friends?",
    answer: "Enter your bill amount, tip percentage, and number of people. Our calculator shows the tip amount, total with tip, and each person's share - perfect for group dining."
  },
  {
    question: "What's a good tip for delivery or takeout?",
    answer: "For delivery, 15-20% is standard. For takeout, tipping is optional but 10-15% is appreciated. During bad weather or difficult deliveries, consider tipping more generously."
  },
  {
    question: "How do I round up to a nice total?",
    answer: "Calculate your tip normally, then adjust slightly to reach a round number. For example, on a $47.50 bill with 20% tip ($9.50), you might tip $10 for a clean $57.50 total."
  }
];

const howToUse = [
  { step: 1, instruction: "Enter your bill amount (before or after tax)" },
  { step: 2, instruction: "Select or enter your desired tip percentage (15%, 18%, 20%, custom)" },
  { step: 3, instruction: "Enter the number of people to split the bill (optional)" },
  { step: 4, instruction: "View tip amount, total bill, and per-person share" }
];

const benefits = [
  "Calculate tips instantly with any percentage",
  "Split bills evenly between any number of people",
  "Common tip percentages pre-set (15%, 18%, 20%, 25%)",
  "Custom tip percentage option",
  "Shows tip amount and total bill",
  "Per-person breakdown for group dining",
  "100% free - works on any device"
];

const relatedCalculators = [
  { 
    title: "Discount Calculator", 
    path: "/calculator/discount", 
    description: "Calculate sale prices and savings." 
  },
  { 
    title: "Percentage Calculator", 
    path: "/calculator/percentage", 
    description: "Calculate any percentage quickly." 
  },
  { 
    title: "Currency Converter", 
    path: "/calculator/currency", 
    description: "Convert between currencies for travel." 
  },
  { 
    title: "Basic Calculator", 
    path: "/calculator/basic", 
    description: "Simple calculator for quick math." 
  }
];

const TipCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free Tip Calculator - Calculate Tips & Split Bills Easily"
      description="Calculate tips instantly! Free tip calculator with bill splitting. Find 15%, 18%, 20% tips or custom amounts. Perfect for restaurants and group dining - no signup required."
      keywords="tip calculator, tip calculator with split, how much to tip, calculate tip, bill splitter, restaurant tip calculator, tip calculator app, gratuity calculator, 20 percent tip, tip percentage calculator, split bill calculator"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center">
        <TipCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default TipCalculatorPage;
