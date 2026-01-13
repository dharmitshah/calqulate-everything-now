import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import AICalculator from "@/components/calculators/AICalculator";

const faqItems = [
  {
    question: "What is the AI Calculator?",
    answer: "The AI Calculator is a natural language math solver that understands your questions in plain English and provides step-by-step solutions. Just type your math problem as you would ask a human, and get detailed answers instantly."
  },
  {
    question: "What types of calculations can it handle?",
    answer: "The AI Calculator can handle percentages, compound interest, unit conversions, geometry, algebra, time/distance calculations, financial math, statistics, and much more. It understands context and can solve complex word problems."
  },
  {
    question: "How accurate are the results?",
    answer: "The AI Calculator uses advanced language models to interpret your questions and perform calculations. While highly accurate for standard math problems, we recommend verifying critical calculations for important decisions."
  },
  {
    question: "Is my data private?",
    answer: "Yes, your calculations are processed securely and we don't store your personal queries. The AI processes your question, returns the answer, and that's it."
  }
];

const howToUse = [
  { step: 1, instruction: "Type your math question in plain English (e.g., 'What is 15% of 250?')" },
  { step: 2, instruction: "Click 'Calculate with AI' or press Enter" },
  { step: 3, instruction: "View your answer with step-by-step solution" },
  { step: 4, instruction: "Copy the result or try another calculation" }
];

const benefits = [
  "Natural language input - no complex formulas needed",
  "Step-by-step solutions for learning",
  "Handles word problems and context",
  "Works with percentages, finance, geometry, and more",
  "Instant answers powered by AI"
];

const AICalculatorPage = () => {
  return (
    <CalculatorLayout
      title="AI Calculator - Natural Language Math Solver | Calqulate"
      description="Ask any math question in plain English and get step-by-step solutions. Our AI calculator understands context and solves percentages, finance, geometry, and more."
      keywords="AI calculator, natural language calculator, math solver, AI math, smart calculator, word problem solver, step by step calculator"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
    >
      <div className="flex justify-center">
        <AICalculator />
      </div>
    </CalculatorLayout>
  );
};

export default AICalculatorPage;
