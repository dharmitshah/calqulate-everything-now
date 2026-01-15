import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { CalorieCalculator } from "@/components/calculators/CalorieCalculator";

const faqItems = [
  {
    question: "How many calories should I eat per day?",
    answer: "Daily calorie needs depend on age, gender, height, weight, and activity level. Most adults need 1,600-3,000 calories. Our calculator uses the Mifflin-St Jeor equation to estimate your personal needs."
  },
  {
    question: "How do I calculate calories for weight loss?",
    answer: "For safe weight loss, reduce your maintenance calories by 500-750 per day, which creates a 1-1.5 lb/week loss. Our calculator shows maintenance, weight loss, and weight gain calorie targets."
  },
  {
    question: "What is BMR vs TDEE?",
    answer: "BMR (Basal Metabolic Rate) is calories burned at complete rest. TDEE (Total Daily Energy Expenditure) includes BMR plus activity calories. You need TDEE to plan your diet, not just BMR."
  },
  {
    question: "How accurate is this calorie calculator?",
    answer: "Our calculator uses the Mifflin-St Jeor formula, which is ~5-10% accurate for most people. Track your weight for 2-3 weeks and adjust if you're not seeing expected results."
  },
  {
    question: "How many calories to build muscle?",
    answer: "For muscle gain, eat 250-500 calories above maintenance (surplus) while strength training. Our calculator's 'Gain Weight' option provides appropriate targets."
  },
  {
    question: "Should I count macros or just calories?",
    answer: "Calories determine weight change; macros (protein, carbs, fat) affect body composition and energy. For best results, track both. Our calculator provides macro recommendations."
  }
];

const howToUse = [
  { step: 1, instruction: "Enter your age, gender, height, and weight" },
  { step: 2, instruction: "Select your activity level (sedentary to very active)" },
  { step: 3, instruction: "Choose your goal: maintain, lose, or gain weight" },
  { step: 4, instruction: "View your personalized daily calorie and macro targets" }
];

const benefits = [
  "Calculate daily calorie needs based on your stats",
  "Uses proven Mifflin-St Jeor formula",
  "Activity level adjustments for accuracy",
  "Targets for weight loss, maintenance, or gain",
  "Macro breakdown: protein, carbs, and fat",
  "BMR and TDEE calculations included",
  "100% free calorie calculator - no signup"
];

const relatedCalculators = [
  { 
    title: "BMI Calculator", 
    path: "/calculator/bmi", 
    description: "Calculate your Body Mass Index." 
  },
  { 
    title: "Age Calculator", 
    path: "/calculator/age", 
    description: "Calculate your exact age." 
  },
  { 
    title: "Unit Converter", 
    path: "/calculator/unit-converter", 
    description: "Convert weight and measurements." 
  },
  { 
    title: "Percentage Calculator", 
    path: "/calculator/percentage", 
    description: "Calculate percentage of daily values." 
  }
];

const CalorieCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free Calorie Calculator - Daily Calories, BMR, TDEE, Macros"
      description="Calculate your daily calorie needs instantly. Free calorie calculator shows BMR, TDEE, and macros for weight loss or muscle gain. Mifflin-St Jeor formula - no signup required."
      keywords="calorie calculator, daily calorie needs calculator, BMR calculator, TDEE calculator, calorie intake calculator, how many calories should I eat, weight loss calorie calculator, macro calculator, calorie counter, calorie deficit calculator"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center my-8">
        <CalorieCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default CalorieCalculatorPage;
