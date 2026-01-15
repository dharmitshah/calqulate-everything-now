import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { RandomNumberGenerator } from "@/components/calculators/RandomNumberGenerator";

const faqItems = [
  {
    question: "How does the random number generator work?",
    answer: "Our generator uses the Web Crypto API's getRandomValues() function, which provides cryptographically secure random numbers. This is the same technology used for secure encryption and gambling software."
  },
  {
    question: "Can I generate random numbers within a specific range?",
    answer: "Yes! Enter your minimum and maximum values, and the generator will produce random numbers within that range. Great for dice rolls, lottery picks, or any custom range you need."
  },
  {
    question: "Is this random number generator truly random?",
    answer: "Our generator uses cryptographically secure pseudorandom number generation (CSPRNG), which is as close to true randomness as possible in software. It's suitable for games, simulations, and even security applications."
  },
  {
    question: "Can I generate multiple random numbers at once?",
    answer: "Yes! Specify how many random numbers you need, and the generator will create a list of unique or non-unique random numbers within your specified range."
  },
  {
    question: "Can I use this for lottery number picks?",
    answer: "Absolutely! Set your range (e.g., 1-69 for Powerball white balls) and generate the number of picks you need. Each number is randomly generated with no bias."
  },
  {
    question: "Is this generator fair for games and contests?",
    answer: "Yes, our cryptographically secure random generation ensures fair, unbiased results. It's suitable for games, raffles, giveaways, and random selection processes."
  }
];

const howToUse = [
  { step: 1, instruction: "Enter the minimum value for your range" },
  { step: 2, instruction: "Enter the maximum value for your range" },
  { step: 3, instruction: "Choose how many random numbers to generate" },
  { step: 4, instruction: "Click Generate to get your random numbers" },
  { step: 5, instruction: "Copy results or generate new numbers as needed" }
];

const benefits = [
  "Cryptographically secure random number generation",
  "Custom range - any minimum and maximum values",
  "Generate multiple random numbers at once",
  "Perfect for dice, lottery, games, and raffles",
  "Unique or allow duplicate options",
  "Copy results with one click",
  "100% free - no signup required",
  "Works offline in your browser"
];

const relatedCalculators = [
  { 
    title: "Password Generator", 
    path: "/calculator/password", 
    description: "Generate strong, secure random passwords." 
  },
  { 
    title: "Percentage Calculator", 
    path: "/calculator/percentage", 
    description: "Calculate percentages and probabilities." 
  },
  { 
    title: "Basic Calculator", 
    path: "/calculator/basic", 
    description: "Simple calculator for everyday math." 
  },
  { 
    title: "Scientific Calculator", 
    path: "/calculator/scientific", 
    description: "Advanced calculator with more functions." 
  }
];

const RandomGeneratorPage = () => {
  return (
    <CalculatorLayout
      title="Free Random Number Generator - Dice, Lottery, Custom Range"
      description="Generate random numbers instantly! Cryptographically secure random number generator for dice, lottery picks, raffles, and games. Custom ranges - no signup required."
      keywords="random number generator, random number generator tool, random number picker online, dice roller online, lottery number generator, random generator, random picker, random selector, random choice generator, coin flip generator, random integer generator"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center">
        <RandomNumberGenerator />
      </div>
    </CalculatorLayout>
  );
};

export default RandomGeneratorPage;
