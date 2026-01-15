import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { DateCalculator } from "@/components/calculators/DateCalculator";

const faqItems = [
  {
    question: "How do I calculate days between two dates?",
    answer: "Enter both dates in our calculator and instantly see the difference in years, months, weeks, and days. Perfect for calculating age, project timelines, or time until events."
  },
  {
    question: "Can I add or subtract days from a date?",
    answer: "Yes! Use our date add/subtract feature. Enter a starting date, then add or subtract any number of days, weeks, months, or years to find the resulting date."
  },
  {
    question: "How many days until a specific date?",
    answer: "Enter today's date as the start date and your target date as the end date. The calculator shows the exact number of days, weeks, and months remaining."
  },
  {
    question: "Does it account for leap years?",
    answer: "Yes, our date calculator correctly handles leap years (years divisible by 4, except century years not divisible by 400). February 29th is properly calculated."
  },
  {
    question: "Can I calculate business days only?",
    answer: "Our calculator shows total calendar days. For business days, you can estimate by multiplying calendar weeks by 5, or we may add this feature in the future."
  },
  {
    question: "How do I find what day of the week a date falls on?",
    answer: "Enter any date and the calculator will show the day of the week. Great for planning events or verifying historical dates."
  }
];

const howToUse = [
  { step: 1, instruction: "Choose your calculation type: date difference or add/subtract" },
  { step: 2, instruction: "Enter your start date" },
  { step: 3, instruction: "Enter end date or days/months/years to add" },
  { step: 4, instruction: "View the result in years, months, weeks, and days" }
];

const benefits = [
  "Calculate exact days between any two dates",
  "Add or subtract days, weeks, months, or years",
  "Handles leap years automatically",
  "Shows results in multiple formats (days, weeks, months, years)",
  "Calculate age, deadlines, project timelines",
  "Find what day of the week any date falls on",
  "Free date calculator - no signup required"
];

const relatedCalculators = [
  { 
    title: "Age Calculator", 
    path: "/calculator/age", 
    description: "Calculate your exact age in years, months, and days." 
  },
  { 
    title: "Timezone Converter", 
    path: "/calculator/timezone", 
    description: "Convert times between different timezones." 
  },
  { 
    title: "Time Calculator", 
    path: "/calculator/time", 
    description: "Add and subtract time durations." 
  },
  { 
    title: "Pregnancy Due Date Calculator", 
    path: "/calculator/pregnancy-due", 
    description: "Calculate your baby's expected due date." 
  }
];

const DateCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free Date Calculator - Days Between Dates, Add/Subtract Days"
      description="Calculate days between dates instantly. Add or subtract days, weeks, months from any date. Free date difference calculator with leap year support - no signup required."
      keywords="date calculator, days between dates, date difference calculator, add days to date, subtract days from date, how many days until, how many days between, date add subtract calculator, countdown calculator, weekday calculator online"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center">
        <DateCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default DateCalculatorPage;
