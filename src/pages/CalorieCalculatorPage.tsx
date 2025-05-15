
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { CalorieCalculator } from "@/components/calculators/CalorieCalculator";

const CalorieCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Calorie Calculator"
      description="Calculate your daily calorie needs based on your age, gender, height, weight, activity level, and goals."
      keywords="calorie calculator, daily calorie needs, BMR, TDEE, macronutrients, protein, carbs, fat, diet calculator"
      faqItems={[
        {
          question: "How many calories should I eat to lose weight?",
          answer: "For weight loss, this calculator recommends a moderate calorie deficit of about 20% below your maintenance level. This approach promotes sustainable fat loss while preserving muscle mass."
        },
        {
          question: "What are macronutrients and why are they important?",
          answer: "Macronutrients (protein, carbohydrates, and fat) are the nutrients that provide calories and energy for your body. Each plays essential roles in body function, and the right balance can help you achieve your health and fitness goals."
        },
        {
          question: "How accurate is this calorie calculator?",
          answer: "This calculator uses established formulas to estimate your caloric needs, but individual metabolism can vary. Monitor your progress over 2-3 weeks and adjust your intake if necessary."
        },
        {
          question: "How much protein do I need?",
          answer: "Protein needs vary based on activity level and goals. Generally, 0.8-1g per pound of body weight is recommended for active individuals. This calculator provides recommendations based on your specific information."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <CalorieCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default CalorieCalculatorPage;
