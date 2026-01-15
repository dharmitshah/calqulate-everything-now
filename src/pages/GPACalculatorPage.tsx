import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { GPACalculator } from "@/components/calculators/GPACalculator";

const faqItems = [
  {
    question: "How is GPA calculated?",
    answer: "GPA is calculated by: (1) Converting letter grades to points (A=4.0, B=3.0, etc.), (2) Multiplying each grade by credit hours, (3) Adding all grade points, (4) Dividing by total credit hours. Our calculator does this automatically."
  },
  {
    question: "What is a good GPA for college?",
    answer: "A 3.0 GPA (B average) is considered good. A 3.5+ is excellent and competitive for grad school, scholarships, and honors programs. A 3.7+ is outstanding. However, requirements vary by program."
  },
  {
    question: "What's the difference between semester and cumulative GPA?",
    answer: "Semester GPA covers only courses from one term. Cumulative GPA includes all courses from your entire academic career. Our calculator can compute both."
  },
  {
    question: "How can I raise my GPA?",
    answer: "Focus on high-credit courses, retake low-grade classes (if allowed), use tutoring and study groups, take classes that match your strengths, and start strong each semester."
  },
  {
    question: "Does this work for high school and college GPA?",
    answer: "Yes! Our calculator uses the standard 4.0 scale used by most US high schools and colleges. For weighted GPAs (honors/AP), check if your school uses a 5.0 scale."
  },
  {
    question: "What GPA do I need for grad school?",
    answer: "Most grad programs require 3.0+. Competitive programs (top MBA, law, med school) often expect 3.5+. Some programs weight your major GPA more heavily than overall GPA."
  }
];

const howToUse = [
  { step: 1, instruction: "Enter your course name (optional)" },
  { step: 2, instruction: "Select your letter grade (A, B+, B, etc.)" },
  { step: 3, instruction: "Enter the credit hours for each course" },
  { step: 4, instruction: "Add more courses as needed" },
  { step: 5, instruction: "View your calculated GPA instantly" }
];

const benefits = [
  "Calculate semester or cumulative GPA",
  "Supports standard 4.0 grading scale",
  "Add unlimited courses",
  "Includes plus/minus grades (A+, A-, B+, etc.)",
  "Perfect for high school and college students",
  "Plan what grades you need to reach your goal GPA",
  "100% free - no signup required"
];

const relatedCalculators = [
  { 
    title: "Percentage Calculator", 
    path: "/calculator/percentage", 
    description: "Convert grades to percentages and vice versa." 
  },
  { 
    title: "AI Math Solver", 
    path: "/calculator/ai", 
    description: "Get help with homework and math problems." 
  },
  { 
    title: "Scientific Calculator", 
    path: "/calculator/scientific", 
    description: "Advanced calculator for science and math." 
  },
  { 
    title: "Age Calculator", 
    path: "/calculator/age", 
    description: "Calculate your exact age." 
  }
];

const GPACalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Free GPA Calculator - College & High School Grade Point Average"
      description="Calculate your GPA instantly! Free GPA calculator for college and high school. Enter grades and credits to find semester or cumulative GPA. 4.0 scale - no signup required."
      keywords="GPA calculator, college GPA calculator, high school GPA calculator, Grade Point Average calculator, cumulative GPA calculator, semester GPA, calculate GPA, GPA calculator with credits, what is my GPA, 4.0 GPA scale calculator"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center my-8">
        <GPACalculator />
      </div>
    </CalculatorLayout>
  );
};

export default GPACalculatorPage;
