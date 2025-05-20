
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Index from "./Index"; // Using the existing Index component
import { ProductHuntBadge } from "@/components/layout/ProductHuntBadge";

const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <div className="fixed bottom-4 right-4 z-50">
        <ProductHuntBadge />
      </div>
      <Index />
    </div>
  );
};

export default HomePage;
