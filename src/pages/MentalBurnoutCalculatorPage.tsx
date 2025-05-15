
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { MentalBurnoutCalculator } from "@/components/calculators/MentalBurnoutCalculator";

const MentalBurnoutCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Mental Burnout Calculator"
      description="Assess your risk of burnout based on your work habits, stress levels, and lifestyle factors."
      keywords="burnout calculator, mental health, work stress, burnout assessment, productivity, work-life balance, mental rest, stress levels"
      faqItems={[
        {
          question: "What is burnout and how does it affect productivity?",
          answer: "Burnout is a state of chronic stress that leads to physical and emotional exhaustion, cynicism, detachment, and feelings of ineffectiveness. It significantly reduces productivity, creativity, and job satisfaction while increasing the risk of health problems."
        },
        {
          question: "How accurate is this burnout assessment?",
          answer: "This calculator provides an estimation based on common burnout factors identified in research. While it's not a clinical diagnostic tool, it can help identify warning signs and suggest appropriate recovery strategies."
        },
        {
          question: "What's the difference between stress and burnout?",
          answer: "Stress typically involves too much pressure and overengagement, while burnout involves emptiness, disengagement, and lack of motivation. Stress creates urgency and hyperactivity, while burnout creates helplessness and hopelessness."
        },
        {
          question: "How often should I take breaks during work?",
          answer: "Research suggests taking short breaks (5-10 minutes) every hour and longer breaks (15-30 minutes) every 2-3 hours. The Pomodoro Technique recommends 5-minute breaks after 25 minutes of focused work, with longer breaks after completing four work sessions."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <MentalBurnoutCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default MentalBurnoutCalculatorPage;
