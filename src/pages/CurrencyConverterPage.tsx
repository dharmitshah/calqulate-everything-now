import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { CurrencyConverter } from "@/components/calculators/CurrencyConverter";

const faqItems = [
  {
    question: "How do I convert currencies?",
    answer: "Enter the amount you want to convert, select your source currency (e.g., USD), and choose the target currency (e.g., EUR). The converter instantly shows the equivalent amount based on current exchange rates."
  },
  {
    question: "How often are exchange rates updated?",
    answer: "Exchange rates are updated regularly from reliable financial data sources. For the most critical transactions, we recommend verifying rates with your bank or financial institution."
  },
  {
    question: "Which currencies can I convert?",
    answer: "Our converter supports major world currencies including USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, and many more. Perfect for travel, international business, or personal finance."
  },
  {
    question: "Why do exchange rates change?",
    answer: "Exchange rates fluctuate based on economic factors like interest rates, inflation, trade balances, political stability, and market speculation. Rates can change throughout the day."
  },
  {
    question: "Are these rates the same as what my bank offers?",
    answer: "Banks and currency exchange services typically add a margin to the mid-market rate. Our converter shows indicative rates - actual rates from your bank may differ slightly."
  },
  {
    question: "Can I convert large amounts?",
    answer: "Yes, you can convert any amount. For very large transactions, contact your bank for preferred rates and consider timing your conversion when rates are favorable."
  }
];

const howToUse = [
  { step: 1, instruction: "Enter the amount you want to convert" },
  { step: 2, instruction: "Select the source currency (e.g., USD)" },
  { step: 3, instruction: "Select the target currency (e.g., EUR)" },
  { step: 4, instruction: "View the converted amount instantly" },
  { step: 5, instruction: "Swap currencies or try different amounts" }
];

const benefits = [
  "Convert between 150+ world currencies",
  "Updated exchange rates from reliable sources",
  "Instant conversion with no delays",
  "Swap currencies with one click",
  "Perfect for travel planning and budgeting",
  "Support for major and minor currencies",
  "100% free currency converter - no signup"
];

const relatedCalculators = [
  { 
    title: "Unit Converter", 
    path: "/calculator/unit-converter", 
    description: "Convert length, weight, volume, and more." 
  },
  { 
    title: "Tip Calculator", 
    path: "/calculator/tip", 
    description: "Calculate tips when traveling abroad." 
  },
  { 
    title: "Discount Calculator", 
    path: "/calculator/discount", 
    description: "Calculate savings on purchases." 
  },
  { 
    title: "Percentage Calculator", 
    path: "/calculator/percentage", 
    description: "Calculate percentages and changes." 
  }
];

const CurrencyConverterPage = () => {
  return (
    <CalculatorLayout
      title="Free Currency Converter - Exchange Rates, USD, EUR, GBP"
      description="Convert currencies instantly with live exchange rates. Free currency converter for USD, EUR, GBP, JPY, and 150+ currencies. Perfect for travel and international business."
      keywords="currency converter, currency conversion calculator, exchange rate calculator, USD to EUR, EUR to USD, currency calculator, money converter, forex calculator, currency exchange calculator, convert dollars to euros, international currency converter"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center">
        <CurrencyConverter />
      </div>
    </CalculatorLayout>
  );
};

export default CurrencyConverterPage;
