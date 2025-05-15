
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { ScientificCalculator } from "@/components/calculators/ScientificCalculator";

const ScientificCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Scientific Calculator"
      description="Advanced scientific calculator with trigonometric functions, logarithms, memory functions, and more."
      keywords="scientific calculator, trigonometry, logarithm, square root, exponents, sin, cos, tan, online calculator"
      faqItems={[
        {
          question: "What functions does this scientific calculator include?",
          answer: "This calculator includes trigonometric functions (sin, cos, tan), logarithms (log, ln), exponents, square roots, memory functions, and more."
        },
        {
          question: "Can I switch between degrees and radians?",
          answer: "Yes, you can toggle between degrees (DEG) and radians (RAD) modes using the dedicated button."
        },
        {
          question: "How do the memory functions work?",
          answer: "The memory functions allow you to store and recall values. Use M+ to add to memory, M- to subtract from memory, MR to recall the stored value, and MC to clear the memory."
        },
        {
          question: "Is this calculator accurate for engineering calculations?",
          answer: "This calculator provides precision suitable for most educational and professional purposes, but for critical engineering calculations, specialized software may be more appropriate."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <ScientificCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default ScientificCalculatorPage;
