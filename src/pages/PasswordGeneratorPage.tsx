import React from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import PasswordGenerator from "@/components/calculators/PasswordGenerator";

const PasswordGeneratorPage = () => {
  const faqItems = [
    {
      question: "How secure are the generated passwords?",
      answer: "Our passwords are generated using the Web Crypto API's getRandomValues() function, which provides cryptographically secure random numbers. This is the same level of security used by professional password managers."
    },
    {
      question: "What does entropy mean in password strength?",
      answer: "Entropy measures the randomness of a password in bits. Higher entropy means more possible combinations. A password with 60 bits of entropy would take billions of years to crack with current technology."
    },
    {
      question: "What's the ideal password length?",
      answer: "For most accounts, 16 characters is recommended. For high-security accounts like banking or email, consider 20+ characters. The minimum should be 12 characters for any important account."
    },
    {
      question: "Should I use symbols in my password?",
      answer: "Yes, including symbols significantly increases password strength by expanding the character set. However, some websites restrict certain symbols, so you may need to adjust."
    },
    {
      question: "What are ambiguous characters?",
      answer: "Ambiguous characters are those that look similar and can be confused: lowercase L (l) and number 1, uppercase O and number 0, etc. Excluding them makes passwords easier to read and type manually."
    }
  ];

  return (
    <CalculatorLayout
      title="Password Generator"
      description="Generate strong, cryptographically secure passwords. Customize length and character types for maximum security."
      keywords="password generator, secure password, random password, strong password, password creator, crypto password"
      faqItems={faqItems}
    >
      <div className="flex justify-center">
        <PasswordGenerator />
      </div>
    </CalculatorLayout>
  );
};

export default PasswordGeneratorPage;
