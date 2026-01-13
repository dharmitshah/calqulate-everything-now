import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import AICalculator from "@/components/calculators/AICalculator";

const faqItems = [
  {
    question: "What is the AI Math Solver?",
    answer: "The AI Math Solver is a powerful calculator that understands your math problems in plain English. Whether it's calculus, integration, differentiation, algebra, or homework problems, just type your question and get detailed step-by-step solutions instantly."
  },
  {
    question: "Can it solve calculus problems like integration and differentiation?",
    answer: "Yes! Our AI calculator excels at calculus. It can solve definite and indefinite integrals, compute derivatives (including partial and higher-order), evaluate limits, work with Taylor series, and solve differential equations with full step-by-step explanations."
  },
  {
    question: "Is this good for homework help?",
    answer: "Absolutely! Students use our AI math solver for homework help because it shows every step of the solution, helping you understand the process. It's like having a math tutor available 24/7 for free."
  },
  {
    question: "What types of math problems can it solve?",
    answer: "The AI calculator handles: Calculus (integration, differentiation, limits), Algebra (equations, factoring, polynomials), Linear Algebra (matrices, eigenvalues), Trigonometry, Statistics, Geometry, Financial math, Unit conversions, and word problems."
  },
  {
    question: "How accurate are the results?",
    answer: "Our AI uses advanced language models and mathematical reasoning to provide highly accurate solutions. For academic or professional use, we recommend verifying critical calculations, but accuracy is typically 99%+ for standard math problems."
  },
  {
    question: "Is it really free?",
    answer: "Yes, the AI Math Solver is completely free to use. No signup required, no hidden fees, no ads. Just type your problem and get your solution."
  },
  {
    question: "How is this different from other math solvers like Photomath or Mathway?",
    answer: "Unlike other apps that require photos or specific syntax, our AI Math Solver understands natural language. Just type 'integrate x squared' or 'find the derivative of sin(x)cos(x)' and get instant solutions. It's faster, more flexible, and completely free."
  },
  {
    question: "Can it help me prepare for exams like SAT, ACT, or AP Calculus?",
    answer: "Yes! Our AI solver is perfect for exam prep. It covers all topics on standardized tests including algebra, geometry, trigonometry, and calculus. The step-by-step explanations help you understand concepts, not just get answers."
  }
];

const howToUse = [
  { step: 1, instruction: "Type your math problem in plain English (e.g., 'Find the derivative of x³ + 2x² - 5x')" },
  { step: 2, instruction: "You can also ask calculus questions like 'Integrate sin(x)cos(x) dx'" },
  { step: 3, instruction: "Click 'Calculate with AI' or press Enter" },
  { step: 4, instruction: "View your answer with detailed step-by-step solution" },
  { step: 5, instruction: "Copy the result or explore the explanation to learn" }
];

const benefits = [
  "Solve integration, differentiation, and calculus problems instantly",
  "Step-by-step solutions perfect for homework and learning",
  "Natural language input - no complex syntax needed",
  "Handles algebra, matrices, differential equations, and more",
  "Free AI-powered math solver - no signup required",
  "Works on any device - desktop, tablet, or mobile",
  "Perfect for SAT, ACT, AP Calculus exam preparation",
  "24/7 access to AI math tutoring"
];

const relatedCalculators = [
  { 
    title: "Scientific Calculator", 
    path: "/calculator/scientific", 
    description: "Advanced calculator with trigonometric functions, logarithms, and scientific notation." 
  },
  { 
    title: "Percentage Calculator", 
    path: "/calculator/percentage", 
    description: "Calculate percentages, percentage change, and percentage of a number." 
  },
  { 
    title: "GPA Calculator", 
    path: "/calculator/gpa", 
    description: "Calculate your Grade Point Average for college and high school." 
  },
  { 
    title: "Unit Converter", 
    path: "/calculator/unit-converter", 
    description: "Convert between different units of measurement." 
  },
  { 
    title: "Basic Calculator", 
    path: "/calculator/basic", 
    description: "Simple calculator for basic arithmetic operations." 
  },
  { 
    title: "Compound Interest Calculator", 
    path: "/calculator/compound-interest", 
    description: "Calculate compound interest and investment growth." 
  }
];

const AICalculatorPage = () => {
  return (
    <CalculatorLayout
      title="AI Math Solver - Free Calculus, Integration & Homework Calculator"
      description="Free AI-powered math problem solver. Solve integration, differentiation, calculus, algebra, and homework problems instantly with step-by-step solutions. Best online math solver for students."
      keywords="AI math solver, AI calculator, math problem solver, calculus solver, integration calculator, differentiation calculator, homework math solver, algebra solver, step by step math solver, AI homework helper, free math solver, derivative calculator, integral calculator, calculus help, math homework help, online calculus solver, SAT math help, AP calculus solver"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center">
        <AICalculator />
      </div>
    </CalculatorLayout>
  );
};

export default AICalculatorPage;
