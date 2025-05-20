
import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { EmbedWrapper } from "./EmbedWrapper";
import { EmbedCodeButton } from "./EmbedCodeButton";
import { useSearchParams } from "react-router-dom";

interface CalculatorLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  title,
  description,
  children,
}) => {
  const [searchParams] = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";
  
  if (isEmbedded) {
    return (
      <EmbedWrapper>
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
        <div className="calculator-content">{children}</div>
      </EmbedWrapper>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              {description && <p className="text-gray-500">{description}</p>}
            </div>
            <EmbedCodeButton />
          </div>
          <div className="calculator-content">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
