import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { AgeCalculator } from "@/components/calculators/AgeCalculator";

const faqItems = [
  {
    question: "How does the age calculator work?",
    answer: "Enter your birth date and the calculator instantly computes your exact age in years, months, and days. It accounts for leap years and varying month lengths for precise results."
  },
  {
    question: "How do I calculate my age in days?",
    answer: "Our calculator shows your age in total days as well as years, months, and days. Simply enter your birthdate and see the complete breakdown."
  },
  {
    question: "Does the calculator handle leap years correctly?",
    answer: "Yes! The calculator properly accounts for leap years (years divisible by 4, except century years not divisible by 400) to ensure accurate day counts."
  },
  {
    question: "Can I calculate age for a specific date in the past or future?",
    answer: "Currently, the calculator computes age from birth date to today. For date differences between any two dates, use our Date Calculator."
  },
  {
    question: "How accurate is the age calculation?",
    answer: "The calculator provides exact calculations to the day, accounting for varying month lengths (28-31 days) and leap years. Results are precise to the current day."
  },
  {
    question: "Is my birth date information private?",
    answer: "Yes, all calculations are performed locally in your browser. Your birth date is never stored, transmitted, or logged anywhere."
  }
];

const howToUse = [
  { step: 1, instruction: "Enter your date of birth (day, month, year)" },
  { step: 2, instruction: "Click 'Calculate Age'" },
  { step: 3, instruction: "View your exact age in years, months, and days" },
  { step: 4, instruction: "See additional info like total days lived and next birthday" }
];

const benefits = [
  "Calculate exact age in years, months, and days",
  "See total days, weeks, and months lived",
  "Accounts for leap years automatically",
  "Find days until your next birthday",
  "Perfect for legal documents, eligibility checks",
  "100% private - calculations done in your browser",
  "Free age calculator - no signup required"
];

const relatedCalculators = [
  { 
    title: "Date Calculator", 
    path: "/calculator/date", 
    description: "Calculate days between dates or add/subtract days." 
  },
  { 
    title: "BMI Calculator", 
    path: "/calculator/bmi", 
    description: "Calculate your Body Mass Index." 
  },
  { 
    title: "Pregnancy Due Date Calculator", 
    path: "/calculator/pregnancy-due", 
    description: "Calculate expected due date." 
  },
  { 
    title: "Calorie Calculator", 
    path: "/calculator/calorie", 
    description: "Calculate daily calorie needs." 
  }
];

const AgeCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free Age Calculator - Calculate Exact Age in Years, Months, Days"
      description="Calculate your exact age instantly! Free age calculator shows age in years, months, days, and total days lived. Accurate leap year handling - no signup required."
      keywords="age calculator, age calculator online, calculate my age, how old am I, birthday calculator free, date of birth calculator, age in days, exact age calculator, age calculator with months and days, chronological age calculator"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center">
        <AgeCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default AgeCalculatorPage;
