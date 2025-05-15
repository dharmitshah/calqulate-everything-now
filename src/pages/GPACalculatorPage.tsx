
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { GPACalculator } from "@/components/calculators/GPACalculator";

const GPACalculatorPage = () => {
  return (
    <CalculatorLayout
      title="GPA Calculator"
      description="Calculate your Grade Point Average (GPA) based on your course grades and credit hours."
      keywords="GPA calculator, Grade Point Average, college GPA, academic calculator, semester GPA, cumulative GPA, student calculator"
      faqItems={[
        {
          question: "How is GPA calculated?",
          answer: "GPA is calculated by multiplying each course grade point value by the number of credit hours for that course, adding these values, and then dividing by the total number of credit hours. This calculator performs this calculation automatically."
        },
        {
          question: "What is considered a good GPA?",
          answer: "Most universities consider a GPA of 3.0 or higher as good. A GPA of 3.5 or higher is typically considered excellent. However, standards may vary between institutions and programs."
        },
        {
          question: "How can I improve my GPA?",
          answer: "To improve your GPA, focus on performing well in courses with higher credit hours, consider retaking courses with low grades (if your institution allows grade replacement), and seek academic help early if you're struggling with certain subjects."
        },
        {
          question: "Does this calculator work for weighted GPAs?",
          answer: "This calculator uses the standard 4.0 scale and does not account for weighted courses. If your institution uses weighted GPAs for honors or AP courses, you may need to adjust accordingly or check with your academic advisor."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <GPACalculator />
      </div>
    </CalculatorLayout>
  );
};

export default GPACalculatorPage;
