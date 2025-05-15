
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { EVChargeCalculator } from "@/components/calculators/EVChargeCalculator";

const EVChargeCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="EV Charging Cost vs. Time Calculator"
      description="Compare the costs and time tradeoffs between different electric vehicle charging options."
      keywords="EV charging calculator, electric vehicle, charging costs, level 1 charging, level 2 charging, DC fast charging, cost per charge, charging time"
      faqItems={[
        {
          question: "What are the different EV charging levels?",
          answer: "Level 1 charging uses a standard 120V household outlet, providing about 3-5 miles of range per hour. Level 2 charging uses a 240V connection (like a dryer outlet) and provides 15-40 miles of range per hour. Level 3 (DC Fast Charging) can add 100-200+ miles in 30 minutes but costs more and isn't recommended for everyday use."
        },
        {
          question: "Is fast charging bad for my EV battery?",
          answer: "Occasional DC fast charging isn't harmful, but frequent use can accelerate battery degradation. Most manufacturers recommend using Level 2 charging for daily use and saving fast charging for road trips or emergencies. Modern EVs have built-in battery management systems to help mitigate these effects."
        },
        {
          question: "How much can I save charging at home vs. public chargers?",
          answer: "Home charging typically costs 50-75% less than public charging. At average residential electricity rates (around $0.15/kWh), charging a standard EV battery costs $8-12 at home. The same charge at a public Level 2 station might cost $15-25, and at a DC fast charger, $25-45."
        },
        {
          question: "What factors affect my EV charging costs?",
          answer: "The main factors are: 1) Electricity rates in your area, 2) Time-of-use pricing (if applicable), 3) Charging level and equipment, 4) Your vehicle's efficiency (miles/kWh), 5) Battery size, and 6) Whether you're using home or public charging. This calculator accounts for these variables to provide accurate cost comparisons."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <EVChargeCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default EVChargeCalculatorPage;
