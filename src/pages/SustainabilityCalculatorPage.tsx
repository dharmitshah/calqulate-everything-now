
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { SustainabilityCalculator } from "@/components/calculators/SustainabilityCalculator";

const SustainabilityCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Sustainability Calculator"
      description="Measure the carbon footprint of your daily habits and find personalized ways to reduce your environmental impact."
      keywords="sustainability calculator, carbon footprint, eco-friendly habits, fast fashion impact, coffee cup waste, streaming carbon footprint, food waste calculator"
      faqItems={[
        {
          question: "How does streaming video impact my carbon footprint?",
          answer: "Streaming video uses significant server energy and bandwidth. HD streaming generates approximately 1.5-2 kg of CO2 per hour, while 4K streaming generates 3-4 kg. This is due to energy used in data centers, networks, and your devices. Reducing quality when visuals aren't essential (like music streaming) can significantly lower this impact."
        },
        {
          question: "Why is fast fashion so damaging to the environment?",
          answer: "Fast fashion has a heavy environmental toll because of its rapid production cycle, synthetic materials (often derived from petroleum), high water usage, chemical dyes, overseas shipping, and designed obsolescence that creates textile waste. A single fast fashion t-shirt can generate 6-8 kg of CO2, while quality garments designed to last produce less waste over time."
        },
        {
          question: "How accurate is this carbon footprint calculation?",
          answer: "This calculator provides an estimation based on average carbon intensity values from scientific research. Individual results may vary based on specific products, regional energy sources, and manufacturing processes. The calculation is designed to highlight relative impacts of different activities rather than providing exact measurements."
        },
        {
          question: "What has the biggest impact on my personal carbon footprint?",
          answer: "For most individuals, the largest contributors to personal carbon footprints are: 1) Transportation (especially air travel and car use), 2) Home energy consumption, 3) Diet (particularly red meat consumption), 4) Consumer purchases, and 5) Waste generation. This calculator focuses on daily consumer habits that are often overlooked but can be readily changed."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <SustainabilityCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default SustainabilityCalculatorPage;
