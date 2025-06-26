
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockMarketCalculator } from "@/components/calculators/StockMarketCalculator";
import { BrokerageCalculator } from "@/components/calculators/BrokerageCalculator";

export const StockMarketCalculatorTabs = () => {
  return (
    <Tabs defaultValue="calculator" className="w-full max-w-5xl">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="calculator">Stock Market Calculator</TabsTrigger>
        <TabsTrigger value="brokerage">Brokerage & Transaction Costs</TabsTrigger>
      </TabsList>
      
      <TabsContent value="calculator">
        <StockMarketCalculator />
      </TabsContent>
      
      <TabsContent value="brokerage">
        <BrokerageCalculator />
      </TabsContent>
    </Tabs>
  );
};
