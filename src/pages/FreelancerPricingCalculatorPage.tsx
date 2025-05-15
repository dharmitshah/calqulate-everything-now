
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { FreelancerPricingCalculator } from "@/components/calculators/FreelancerPricingCalculator";

const FreelancerPricingCalculatorPage = () => {
  return (
    <CalculatorLayout
      title="Freelancer Pricing Confidence Calculator"
      description="Analyze your freelance rates against market benchmarks and get personalized pricing guidance based on your skills and experience."
      keywords="freelance rates, pricing calculator, freelancer hourly rate, Upwork rates, Fiverr pricing, freelance benchmarks, rate confidence, fair pricing"
      faqItems={[
        {
          question: "How do I know if I'm charging too little as a freelancer?",
          answer: "Signs you're undercharging include: consistently winning most proposals, clients never negotiating your rates, feeling burned out from too much work, comparing notes with peers and finding you charge significantly less, or calculating your effective hourly rate (including unpaid work) and finding it below market standards for your skill level."
        },
        {
          question: "What factors most influence freelance rates?",
          answer: "The most influential factors are specialization/niche expertise (30-50% premium), years of relevant experience (5-10% per year), portfolio quality demonstrating outcomes (not just pretty work), social proof through reviews and testimonials, and your target market segment (enterprise clients typically pay 2-5x more than small businesses)."
        },
        {
          question: "How should I increase my rates with existing clients?",
          answer: "For existing clients, the best approach is incremental increases of 10-15% with advance notice. Frame rate increases around increased value, expanded skills, or market adjustments rather than inflation or personal needs. For new clients, you can set higher rates immediately without the gradual approach needed for existing relationships."
        },
        {
          question: "What's the difference in rates between platforms like Upwork and direct clients?",
          answer: "Platform-based work typically pays 20-40% less than working with direct clients due to platform fees (10-20%), increased competition, and client expectations. As you gain experience, transitioning some clients off-platform or building direct client relationships can significantly increase your effective hourly rate while reducing fee overhead."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <FreelancerPricingCalculator />
      </div>
    </CalculatorLayout>
  );
};

export default FreelancerPricingCalculatorPage;
