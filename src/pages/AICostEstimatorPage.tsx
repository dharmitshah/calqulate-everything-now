
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { AICostEstimator } from "@/components/calculators/AICostEstimator";

const AICostEstimatorPage = () => {
  return (
    <CalculatorLayout
      title="AI API Cost Estimator"
      description="Calculate and optimize your AI API expenses for different models and usage patterns."
      keywords="AI cost calculator, OpenAI pricing, GPT-4 cost estimator, Claude API cost, AI token pricing, LLM budget, AI development costs"
      faqItems={[
        {
          question: "How are AI API costs typically calculated?",
          answer: "AI API costs are primarily calculated based on the number of tokens processed. Tokens are pieces of text (roughly 4 characters in English), and pricing is separate for input tokens (your prompts) and output tokens (AI responses). Different models have different pricing tiers, with more capable models costing more per token."
        },
        {
          question: "What's the difference between input and output token costs?",
          answer: "Input tokens are what you send to the API (your prompts, context, and instructions), while output tokens are what the model generates in response. Output tokens typically cost 2-5 times more than input tokens. Optimizing prompts to be concise while maintaining clarity can significantly reduce costs."
        },
        {
          question: "How can I reduce my AI API costs?",
          answer: "To reduce costs: 1) Use the least powerful model that meets your needs, 2) Optimize prompts to be concise, 3) Implement caching for common queries, 4) Use techniques like prompt compression or truncation for long inputs, 5) Batch similar requests together, and 6) Consider fine-tuning for specific tasks to reduce input token requirements."
        },
        {
          question: "How much can fine-tuning save in the long run?",
          answer: "Fine-tuning can significantly reduce costs for specialized applications by allowing shorter prompts (reducing input tokens) and more focused responses (reducing output tokens). While fine-tuning itself has a cost, it can reduce operational costs by 30-70% for high-volume applications with consistent patterns. The break-even point typically occurs after processing several million tokens."
        }
      ]}
    >
      <div className="flex justify-center my-8">
        <AICostEstimator />
      </div>
    </CalculatorLayout>
  );
};

export default AICostEstimatorPage;
