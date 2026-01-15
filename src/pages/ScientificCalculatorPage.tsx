import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { ScientificCalculator } from "@/components/calculators/ScientificCalculator";

const faqItems = [
  {
    question: "What functions does this scientific calculator include?",
    answer: "This calculator includes trigonometric functions (sin, cos, tan and their inverses), logarithms (log base 10, natural log ln), exponents (x², x³, xʸ), square roots, cube roots, factorial, constants (π, e), and memory functions (M+, M-, MR, MC)."
  },
  {
    question: "Can I switch between degrees and radians?",
    answer: "Yes! Toggle between degrees (DEG) and radians (RAD) modes using the dedicated button. Use degrees for most everyday calculations and radians for calculus and advanced mathematics."
  },
  {
    question: "How do I calculate sine, cosine, and tangent?",
    answer: "Enter your angle value, then press sin, cos, or tan. Make sure you've selected the correct angle mode (degrees or radians). For inverse functions (arcsin, arccos, arctan), use the 2nd/shift function."
  },
  {
    question: "How do the memory functions work?",
    answer: "M+ adds the current value to memory, M- subtracts from memory, MR recalls the stored value, and MC clears the memory. Great for multi-step calculations where you need to store intermediate results."
  },
  {
    question: "Can I use this for calculus and advanced math?",
    answer: "This scientific calculator handles trigonometry, logarithms, and exponents needed for calculus prep. For step-by-step calculus solutions (derivatives, integrals), try our AI Math Solver instead."
  },
  {
    question: "Is this calculator accurate for science and engineering homework?",
    answer: "Yes! Our calculator provides precision suitable for academic and professional purposes. It uses JavaScript's Math library with IEEE 754 double precision, giving accuracy to ~15 significant digits."
  }
];

const howToUse = [
  { step: 1, instruction: "Enter numbers using the keypad or keyboard" },
  { step: 2, instruction: "Select DEG or RAD mode for trigonometric calculations" },
  { step: 3, instruction: "Use function buttons (sin, cos, log, √) for scientific operations" },
  { step: 4, instruction: "Use memory buttons (M+, MR) to store and recall values" },
  { step: 5, instruction: "Press = to calculate your result" }
];

const benefits = [
  "Full trigonometric functions: sin, cos, tan and inverses",
  "Logarithms: log (base 10) and ln (natural log)",
  "Exponents: squares, cubes, and custom powers",
  "Square roots and nth roots",
  "Mathematical constants: π and e",
  "Memory functions for complex calculations",
  "Degrees and radians mode toggle",
  "100% free - no signup required",
  "Works on desktop, tablet, and mobile"
];

const relatedCalculators = [
  { 
    title: "AI Math Solver", 
    path: "/calculator/ai", 
    description: "Get step-by-step solutions for calculus, algebra, and any math problem." 
  },
  { 
    title: "Percentage Calculator", 
    path: "/calculator/percentage", 
    description: "Calculate percentages, percentage change, and ratios." 
  },
  { 
    title: "Basic Calculator", 
    path: "/calculator/basic", 
    description: "Simple calculator for everyday arithmetic." 
  },
  { 
    title: "Unit Converter", 
    path: "/calculator/unit-converter", 
    description: "Convert between metric and imperial units." 
  }
];

const ScientificCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free Scientific Calculator Online - Trigonometry, Logarithms, Exponents"
      description="Free online scientific calculator with sin, cos, tan, logarithms, exponents, and memory functions. Perfect for students - degrees/radians toggle, no signup required."
      keywords="scientific calculator online, trigonometry calculator, logarithm calculator online, online calculator for students, sin cos tan calculator, free scientific calculator, math calculator with exponents, scientific calculator with steps, best online calculator, log calculator, square root calculator, advanced math calculator"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center my-8">
        <ScientificCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default ScientificCalculatorPage;
