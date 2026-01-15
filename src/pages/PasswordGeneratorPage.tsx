import React from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import PasswordGenerator from "@/components/calculators/PasswordGenerator";

const faqItems = [
  {
    question: "How secure are the generated passwords?",
    answer: "Our passwords are generated using the Web Crypto API's getRandomValues() function, which provides cryptographically secure random numbers. This is the same level of security used by professional password managers like 1Password and LastPass."
  },
  {
    question: "What is the best password length for security?",
    answer: "For most accounts, 16 characters is recommended. For high-security accounts like banking, email, or crypto wallets, use 20+ characters. The minimum should be 12 characters for any important account. Longer passwords are exponentially harder to crack."
  },
  {
    question: "Should I include symbols in my password?",
    answer: "Yes! Including symbols (@, #, $, %, etc.) significantly increases password strength by expanding the character set. However, some websites restrict certain symbols, so you may need to adjust. Our generator lets you customize which character types to include."
  },
  {
    question: "What does password entropy mean?",
    answer: "Entropy measures password randomness in bits. Higher entropy = more possible combinations. A 60-bit entropy password would take billions of years to crack with current technology. Our generator shows entropy so you can gauge password strength."
  },
  {
    question: "What are ambiguous characters and should I exclude them?",
    answer: "Ambiguous characters look similar and can be confused: lowercase L (l) and number 1, uppercase O and number 0, etc. Excluding them makes passwords easier to read and type manually without reducing security significantly."
  },
  {
    question: "How often should I change my passwords?",
    answer: "Modern security advice says: use unique, strong passwords for each account (our generator helps!), and only change them if there's a breach. Using a password manager to store unique generated passwords is safer than regularly changing weak passwords."
  }
];

const howToUse = [
  { step: 1, instruction: "Set your desired password length (16+ characters recommended)" },
  { step: 2, instruction: "Choose character types: uppercase, lowercase, numbers, symbols" },
  { step: 3, instruction: "Optionally exclude ambiguous characters for easier reading" },
  { step: 4, instruction: "Click 'Generate Password' for a cryptographically secure password" },
  { step: 5, instruction: "Copy to clipboard and store in a password manager" }
];

const benefits = [
  "Cryptographically secure random generation using Web Crypto API",
  "Customizable length from 8 to 128 characters",
  "Choose character types: uppercase, lowercase, numbers, symbols",
  "Option to exclude ambiguous characters (l, 1, O, 0)",
  "Shows password entropy for strength verification",
  "One-click copy to clipboard",
  "100% free - no signup, no data stored",
  "Works offline - passwords never leave your browser"
];

const relatedCalculators = [
  { 
    title: "Random Number Generator", 
    path: "/calculator/random", 
    description: "Generate random numbers, dice rolls, and lottery picks." 
  },
  { 
    title: "Scientific Calculator", 
    path: "/calculator/scientific", 
    description: "Advanced calculations for math and science." 
  },
  { 
    title: "AI Math Solver", 
    path: "/calculator/ai", 
    description: "Solve any math problem with AI step-by-step solutions." 
  }
];

const PasswordGeneratorPage = () => {
  return (
    <CalculatorLayout
      title="Free Password Generator Online - Strong Random Secure Passwords"
      description="Generate strong, cryptographically secure passwords instantly. Free random password generator with customizable length, symbols, and entropy display. No signup - passwords never stored."
      keywords="password generator online free, strong random password generator, password strength checker, secure password creator, random password generator tool, free password generator, password creator online, strong password maker, random string generator online, generate secure password"
      faqItems={faqItems}
      howToUse={howToUse}
      benefits={benefits}
      relatedCalculators={relatedCalculators}
    >
      <div className="flex justify-center">
        <PasswordGenerator />
      </div>
    </CalculatorLayout>
  );
};

export default PasswordGeneratorPage;
