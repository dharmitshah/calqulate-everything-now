import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { UnitConverter } from "@/components/calculators/UnitConverter";

const faqItems = [
  {
    question: "What units can I convert with this free unit converter?",
    answer: "Our unit converter supports all major measurement types: length (meters, feet, miles, km), weight (kg, lbs, ounces, grams, stones), volume (liters, gallons, cups), temperature (Celsius, Fahrenheit, Kelvin), area, speed, data storage, and more."
  },
  {
    question: "How do I convert kilograms to pounds?",
    answer: "Simply select 'Weight' as the category, enter your value in kilograms, and the converter will instantly show the equivalent in pounds. 1 kg = 2.205 lbs."
  },
  {
    question: "Can I convert metric to imperial units?",
    answer: "Yes! Our converter easily converts between metric (meters, kg, liters) and imperial (feet, lbs, gallons) units. Perfect for international recipes, travel, or science homework."
  },
  {
    question: "How do I convert Celsius to Fahrenheit?",
    answer: "Select temperature conversion, enter your Celsius value, and get instant Fahrenheit results. Formula: °F = (°C × 9/5) + 32. For example, 20°C = 68°F."
  },
  {
    question: "Is this unit converter accurate for science and engineering?",
    answer: "Yes, our converter uses precise conversion factors suitable for academic, scientific, and engineering applications. Results are calculated to multiple decimal places for accuracy."
  },
  {
    question: "Can I convert data storage units like GB to MB?",
    answer: "Absolutely! Convert between bytes, KB, MB, GB, TB and more. Perfect for understanding file sizes, storage capacity, and data transfer calculations."
  }
];

const howToUse = [
  { step: 1, instruction: "Select the measurement category (length, weight, volume, etc.)" },
  { step: 2, instruction: "Enter the value you want to convert" },
  { step: 3, instruction: "Choose the input unit (e.g., meters)" },
  { step: 4, instruction: "Choose the output unit (e.g., feet)" },
  { step: 5, instruction: "Get your instant conversion result" }
];

const benefits = [
  "Convert between metric and imperial units instantly",
  "Supports length, weight, volume, temperature, area, speed, and data storage",
  "Perfect for students, travelers, chefs, and professionals",
  "100% free - no signup or ads",
  "Mobile-friendly design works on any device",
  "Accurate conversions for science and engineering",
  "Convert kilograms to pounds, meters to feet, Celsius to Fahrenheit, and more"
];

const relatedCalculators = [
  { 
    title: "Weight Converter", 
    path: "/calculator/weight-converter", 
    description: "Dedicated kg to lbs, ounces to grams, and stone conversions." 
  },
  { 
    title: "Currency Converter", 
    path: "/calculator/currency", 
    description: "Convert between world currencies with live exchange rates." 
  },
  { 
    title: "Scientific Calculator", 
    path: "/calculator/scientific", 
    description: "Advanced calculator for trigonometry and logarithms." 
  },
  { 
    title: "Percentage Calculator", 
    path: "/calculator/percentage", 
    description: "Calculate percentages and percentage changes." 
  }
];

const UnitConverterPage = () => {
  return (
    <CalculatorLayout
      title="Free Unit Converter Online - Metric to Imperial, Length, Weight, Volume"
      description="Convert units instantly! Free unit converter for length, weight, volume, temperature. Convert kg to lbs, meters to feet, Celsius to Fahrenheit, liters to gallons. No signup required."
      keywords="unit converter online free, metric to imperial converter, weight converter online, length converter tool, temperature converter online, volume converter online, unit conversion calculator, free unit converter, convert kilograms to pounds, convert miles to kilometers, convert Celsius to Fahrenheit, convert liters to gallons, convert meters to feet, convert ounces to grams"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center">
        <UnitConverter />
      </div>
    </CalculatorLayout>
  );
};

export default UnitConverterPage;
