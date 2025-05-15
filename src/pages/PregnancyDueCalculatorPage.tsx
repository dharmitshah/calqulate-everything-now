
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { PregnancyDueCalculator } from "@/components/calculators/PregnancyDueCalculator";

const PregnancyDueCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Pregnancy Due Date Calculator"
      description="Calculate your pregnancy due date based on last menstrual period, conception date, or ultrasound results."
      keywords="pregnancy calculator, due date, estimated delivery date, EDD, conception date, gestational age, pregnancy weeks"
      faqItems={[
        {
          question: "How accurate is the pregnancy due date calculation?",
          answer: "Due date calculations provide an estimate as only about 5% of babies are born on their exact due date. The due date is typically 40 weeks from the start of the last menstrual period, or 38 weeks from conception."
        },
        {
          question: "What is the most accurate method to calculate a due date?",
          answer: "Early ultrasound (before 20 weeks) tends to be the most accurate method for dating a pregnancy. Last menstrual period calculations can be less accurate if you have irregular cycles."
        },
        {
          question: "What is gestational age?",
          answer: "Gestational age is the common term used during pregnancy to describe how far along the pregnancy is. It is measured in weeks, from the first day of the last menstrual period to the current date."
        },
        {
          question: "When should I see a healthcare provider after learning I'm pregnant?",
          answer: "It's recommended to schedule an appointment with your healthcare provider as soon as you know you're pregnant. They can confirm the pregnancy and establish an accurate due date through examination and possibly ultrasound."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <PregnancyDueCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default PregnancyDueCalculatorPage;
