
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calculator, TrendingUp, CircleDollarSign } from "lucide-react";

export const StockMarketCalculator = () => {
  const { toast } = useToast();
  const [calculatorType, setCalculatorType] = useState<string>("profit-loss");
  
  // Profit/Loss Calculator
  const [buyPrice, setBuyPrice] = useState<number>(100);
  const [sellPrice, setSellPrice] = useState<number>(110);
  const [quantity, setQuantity] = useState<number>(10);
  const [brokerage, setBrokerage] = useState<number>(0.1);
  
  // Position Size Calculator
  const [accountSize, setAccountSize] = useState<number>(10000);
  const [riskPercentage, setRiskPercentage] = useState<number>(2);
  const [entryPrice, setEntryPrice] = useState<number>(50);
  const [stopLossPrice, setStopLossPrice] = useState<number>(48);
  
  // Results
  const [results, setResults] = useState<any>(null);

  // Handle numeric input changes
  const handleNumericInputChange = (
    value: string, 
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    // Accept empty string (will convert to 0), numbers, and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setter(value === "" ? 0 : parseFloat(value));
    }
  };

  // Calculate profit/loss
  const calculateProfitLoss = () => {
    const totalBuyValue = buyPrice * quantity;
    const totalSellValue = sellPrice * quantity;
    const grossProfit = totalSellValue - totalBuyValue;
    
    // Calculate brokerage as a percentage
    const brokerageAmount = (brokerage / 100) * (totalBuyValue + totalSellValue);
    
    const netProfit = grossProfit - brokerageAmount;
    const roi = (netProfit / totalBuyValue) * 100;
    
    const calculatedResults = {
      type: "profit-loss",
      grossProfit: parseFloat(grossProfit.toFixed(2)),
      brokerageAmount: parseFloat(brokerageAmount.toFixed(2)),
      netProfit: parseFloat(netProfit.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      isProfit: netProfit > 0
    };
    
    setResults(calculatedResults);
    
    toast({
      title: netProfit > 0 ? "Profit Calculated" : "Loss Calculated",
      description: `Net ${netProfit > 0 ? "profit" : "loss"}: $${Math.abs(netProfit).toFixed(2)}`,
    });
  };

  // Calculate position size
  const calculatePositionSize = () => {
    const riskAmount = (accountSize * riskPercentage) / 100;
    const riskPerShare = Math.abs(entryPrice - stopLossPrice);
    
    // Avoid division by zero
    const positionSize = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0;
    const totalPosition = positionSize * entryPrice;
    const maxLoss = positionSize * Math.abs(entryPrice - stopLossPrice);
    
    const calculatedResults = {
      type: "position-size",
      positionSize,
      totalPosition: parseFloat(totalPosition.toFixed(2)),
      riskAmount: parseFloat(riskAmount.toFixed(2)),
      maxLoss: parseFloat(maxLoss.toFixed(2))
    };
    
    setResults(calculatedResults);
    
    toast({
      title: "Position Size Calculated",
      description: `You can buy/sell ${positionSize} shares based on your risk tolerance`,
    });
  };
  
  const handleCalculate = () => {
    switch (calculatorType) {
      case "profit-loss":
        calculateProfitLoss();
        break;
      case "position-size":
        calculatePositionSize();
        break;
      default:
        break;
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 text-primary" size={24} />
          Stock Market Calculator
        </CardTitle>
        <CardDescription>Calculate profit/loss and position sizing for stock trades</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="calculator-type">Calculator Type</Label>
          <Select 
            value={calculatorType} 
            onValueChange={setCalculatorType}
          >
            <SelectTrigger id="calculator-type">
              <SelectValue placeholder="Select calculator type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profit-loss">Profit/Loss Calculator</SelectItem>
              <SelectItem value="position-size">Position Size Calculator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {calculatorType === "profit-loss" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buy-price">Buy Price ($)</Label>
                <Input
                  id="buy-price"
                  numeric
                  value={buyPrice.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setBuyPrice)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sell-price">Sell Price ($)</Label>
                <Input
                  id="sell-price"
                  numeric
                  value={sellPrice.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setSellPrice)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  numeric
                  value={quantity.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setQuantity)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brokerage">Brokerage (%)</Label>
                <Input
                  id="brokerage"
                  numeric
                  value={brokerage.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setBrokerage)}
                />
              </div>
            </div>
          </div>
        )}
        
        {calculatorType === "position-size" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="account-size">Account Size ($)</Label>
                <Input
                  id="account-size"
                  numeric
                  value={accountSize.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setAccountSize)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="risk-percentage">Risk Percentage (%)</Label>
                <Input
                  id="risk-percentage"
                  numeric
                  value={riskPercentage.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setRiskPercentage)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entry-price">Entry Price ($)</Label>
                <Input
                  id="entry-price"
                  numeric
                  value={entryPrice.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setEntryPrice)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stop-loss">Stop Loss Price ($)</Label>
                <Input
                  id="stop-loss"
                  numeric
                  value={stopLossPrice.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setStopLossPrice)}
                />
              </div>
            </div>
          </div>
        )}
        
        <Button onClick={handleCalculate} className="w-full">
          Calculate
        </Button>
        
        {results && (
          <div className="mt-6 p-4 border rounded-md">
            {results.type === "profit-loss" && (
              <div className="space-y-3">
                <div className="text-xl font-bold flex items-center">
                  <CircleDollarSign className="mr-2" size={20} />
                  Result Summary
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Gross Profit/Loss:</span>
                    <span className={results.grossProfit >= 0 ? "text-green-600" : "text-red-600"}>
                      ${Math.abs(results.grossProfit).toFixed(2)} {results.grossProfit >= 0 ? "Profit" : "Loss"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brokerage:</span>
                    <span>${results.brokerageAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Net Profit/Loss:</span>
                    <span className={results.netProfit >= 0 ? "text-green-600" : "text-red-600"}>
                      ${Math.abs(results.netProfit).toFixed(2)} {results.netProfit >= 0 ? "Profit" : "Loss"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI:</span>
                    <span className={results.roi >= 0 ? "text-green-600" : "text-red-600"}>
                      {Math.abs(results.roi).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {results.type === "position-size" && (
              <div className="space-y-3">
                <div className="text-xl font-bold flex items-center">
                  <Calculator className="mr-2" size={20} />
                  Position Sizing Result
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Risk Amount:</span>
                    <span>${results.riskAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Position Size:</span>
                    <span>{results.positionSize} shares</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Position Value:</span>
                    <span>${results.totalPosition.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maximum Loss:</span>
                    <span className="text-red-600">${results.maxLoss.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
