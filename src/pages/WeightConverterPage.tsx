
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { WeightConverter } from "@/components/calculators/WeightConverter";

const WeightConverterPage = () => {
  return (
    <CalculatorLayout
      title="Weight Converter"
      description="Convert between different units of weight including kilograms, pounds, ounces, grams, and stones."
      keywords="weight converter, kg to lb, pounds to kg, weight units, stone to kg, ounces to grams, unit converter"
      faqItems={[
        {
          question: "How many pounds are in a kilogram?",
          answer: "There are approximately 2.20462 pounds in a kilogram. This converter uses precise conversion factors for accurate results."
        },
        {
          question: "What is a stone and how is it used?",
          answer: "A stone is a unit of weight commonly used in the UK and Ireland, equal to 14 pounds or approximately 6.35 kg. It's often used to express body weight."
        },
        {
          question: "Why do I get different results when converting between units?",
          answer: "Weight conversions are precise mathematical relationships. Small differences may appear due to rounding or the display precision of the calculator."
        },
        {
          question: "How accurate is this weight converter?",
          answer: "This converter uses standard conversion factors and provides results accurate to four decimal places, which is sufficient for most everyday and scientific purposes."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <WeightConverter />
      </div>
    </CalculatorLayout>
  );
};

export default WeightConverterPage;
