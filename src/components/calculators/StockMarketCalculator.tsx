
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
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  // F&O Specific States
  const [optionType, setOptionType] = useState<string>("call");
  const [strikePrice, setStrikePrice] = useState<number>(100);
  const [spotPrice, setSpotPrice] = useState<number>(98);
  const [premium, setPremium] = useState<number>(2.5);
  const [lotSize, setLotSize] = useState<number>(100);
  const [contractType, setContractType] = useState<string>("options");
  const [expiryDays, setExpiryDays] = useState<number>(30);
  const [impliedVolatility, setImpliedVolatility] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(5);
  
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

  // Calculate F&O Results
  const calculateFAndO = () => {
    if (contractType === "options") {
      calculateOptionsResult();
    } else {
      calculateFuturesResult();
    }
  };

  // Calculate Options P&L
  const calculateOptionsResult = () => {
    let intrinsicValue = 0;
    let profitLoss = 0;
    let breakEvenPrice = 0;
    
    if (optionType === "call") {
      intrinsicValue = Math.max(0, spotPrice - strikePrice);
      breakEvenPrice = strikePrice + premium;
      profitLoss = (Math.max(0, spotPrice - strikePrice) - premium) * lotSize;
    } else { // put
      intrinsicValue = Math.max(0, strikePrice - spotPrice);
      breakEvenPrice = strikePrice - premium;
      profitLoss = (Math.max(0, strikePrice - spotPrice) - premium) * lotSize;
    }

    const extrinsicValue = premium - intrinsicValue;
    
    // Calculate simple Greeks (these are simplified approximations)
    let delta = calculateDelta(optionType, spotPrice, strikePrice, expiryDays, impliedVolatility, interestRate);
    let gamma = calculateGamma(spotPrice, strikePrice, expiryDays, impliedVolatility);
    let theta = calculateTheta(optionType, spotPrice, strikePrice, expiryDays, impliedVolatility, interestRate);
    let vega = calculateVega(spotPrice, strikePrice, expiryDays, impliedVolatility);
    let rho = calculateRho(optionType, spotPrice, strikePrice, expiryDays, impliedVolatility, interestRate);

    const calculatedResults = {
      type: "options",
      profitLoss: parseFloat(profitLoss.toFixed(2)),
      intrinsicValue: parseFloat(intrinsicValue.toFixed(2)),
      extrinsicValue: parseFloat(extrinsicValue.toFixed(2)),
      breakEvenPrice: parseFloat(breakEvenPrice.toFixed(2)),
      isProfit: profitLoss > 0,
      greeks: {
        delta: parseFloat(delta.toFixed(4)),
        gamma: parseFloat(gamma.toFixed(4)),
        theta: parseFloat(theta.toFixed(4)),
        vega: parseFloat(vega.toFixed(4)),
        rho: parseFloat(rho.toFixed(4)),
      }
    };

    setResults(calculatedResults);

    toast({
      title: profitLoss > 0 ? "Option Profit Calculated" : "Option Loss Calculated",
      description: `${optionType.toUpperCase()} option ${profitLoss > 0 ? "profit" : "loss"}: $${Math.abs(profitLoss).toFixed(2)}`,
    });
  };

  // Calculate Futures P&L
  const calculateFuturesResult = () => {
    const buyValue = entryPrice * lotSize;
    const currentValue = spotPrice * lotSize;
    const profitLoss = currentValue - buyValue;
    
    const marginRequired = buyValue * 0.1; // Simplified margin calculation (10%)
    const leverageRatio = buyValue / marginRequired;
    
    const calculatedResults = {
      type: "futures",
      profitLoss: parseFloat(profitLoss.toFixed(2)),
      marginRequired: parseFloat(marginRequired.toFixed(2)),
      leverageRatio: parseFloat(leverageRatio.toFixed(2)),
      isProfit: profitLoss > 0
    };
    
    setResults(calculatedResults);
    
    toast({
      title: profitLoss > 0 ? "Futures Profit Calculated" : "Futures Loss Calculated",
      description: `Futures ${profitLoss > 0 ? "profit" : "loss"}: $${Math.abs(profitLoss).toFixed(2)}`,
    });
  };
  
  // Greek calculation helper functions
  const calculateDelta = (optType: string, spot: number, strike: number, days: number, vol: number, rate: number) => {
    // Simple delta approximation
    const timeToExpiry = days / 365;
    const moneyness = (spot / strike) - 1;
    let delta = 0.5 + 0.5 * (moneyness / (vol * Math.sqrt(timeToExpiry)));
    
    // Bound between 0 and 1
    delta = Math.max(0, Math.min(1, delta));
    
    return optType === "put" ? -delta : delta;
  };
  
  const calculateGamma = (spot: number, strike: number, days: number, vol: number) => {
    // Simple gamma approximation
    const timeToExpiry = days / 365;
    return 0.4 * Math.exp(-Math.pow((spot - strike) / (vol * spot * Math.sqrt(timeToExpiry)), 2) / 2) / (spot * vol * Math.sqrt(timeToExpiry));
  };
  
  const calculateTheta = (optType: string, spot: number, strike: number, days: number, vol: number, rate: number) => {
    // Simple theta approximation (rough estimate)
    const timeToExpiry = days / 365;
    return -spot * vol * 0.4 * Math.exp(-Math.pow((spot - strike) / (vol * spot * Math.sqrt(timeToExpiry)), 2) / 2) / (2 * Math.sqrt(timeToExpiry)) / 365;
  };
  
  const calculateVega = (spot: number, strike: number, days: number, vol: number) => {
    // Simple vega approximation
    const timeToExpiry = days / 365;
    return 0.1 * spot * Math.sqrt(timeToExpiry) * 0.4 * Math.exp(-Math.pow((spot - strike) / (vol * spot * Math.sqrt(timeToExpiry)), 2) / 2) / 100;
  };
  
  const calculateRho = (optType: string, spot: number, strike: number, days: number, vol: number, rate: number) => {
    // Simple rho approximation
    const timeToExpiry = days / 365;
    const sign = optType === "call" ? 1 : -1;
    return sign * strike * timeToExpiry * 0.01;
  };
  
  const handleCalculate = () => {
    switch (calculatorType) {
      case "profit-loss":
        calculateProfitLoss();
        break;
      case "position-size":
        calculatePositionSize();
        break;
      case "f-and-o":
        calculateFAndO();
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
              <SelectItem value="f-and-o">Futures & Options Calculator</SelectItem>
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

        {calculatorType === "f-and-o" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contract-type">Contract Type</Label>
              <Select 
                value={contractType} 
                onValueChange={setContractType}
              >
                <SelectTrigger id="contract-type">
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="options">Options</SelectItem>
                  <SelectItem value="futures">Futures</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {contractType === "options" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="option-type">Option Type</Label>
                  <Select 
                    value={optionType} 
                    onValueChange={setOptionType}
                  >
                    <SelectTrigger id="option-type">
                      <SelectValue placeholder="Select option type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Call Option</SelectItem>
                      <SelectItem value="put">Put Option</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="strike-price">Strike Price ($)</Label>
                    <Input
                      id="strike-price"
                      numeric
                      value={strikePrice.toString()}
                      onChange={(e) => handleNumericInputChange(e.target.value, setStrikePrice)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spot-price">Current Spot Price ($)</Label>
                    <Input
                      id="spot-price"
                      numeric
                      value={spotPrice.toString()}
                      onChange={(e) => handleNumericInputChange(e.target.value, setSpotPrice)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="premium">Premium/Option Price ($)</Label>
                    <Input
                      id="premium"
                      numeric
                      value={premium.toString()}
                      onChange={(e) => handleNumericInputChange(e.target.value, setPremium)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lot-size">Lot Size</Label>
                    <Input
                      id="lot-size"
                      numeric
                      value={lotSize.toString()}
                      onChange={(e) => handleNumericInputChange(e.target.value, setLotSize)}
                    />
                  </div>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced-options">
                    <AccordionTrigger>Advanced Options (Greeks)</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry-days">Days to Expiry</Label>
                            <Input
                              id="expiry-days"
                              numeric
                              value={expiryDays.toString()}
                              onChange={(e) => handleNumericInputChange(e.target.value, setExpiryDays)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="implied-volatility">Implied Volatility (%)</Label>
                            <Input
                              id="implied-volatility"
                              numeric
                              value={impliedVolatility.toString()}
                              onChange={(e) => handleNumericInputChange(e.target.value, setImpliedVolatility)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interest-rate">Risk-Free Interest Rate (%)</Label>
                          <Input
                            id="interest-rate"
                            numeric
                            value={interestRate.toString()}
                            onChange={(e) => handleNumericInputChange(e.target.value, setInterestRate)}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            )}
            
            {contractType === "futures" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="entry-price-futures">Entry Price ($)</Label>
                    <Input
                      id="entry-price-futures"
                      numeric
                      value={entryPrice.toString()}
                      onChange={(e) => handleNumericInputChange(e.target.value, setEntryPrice)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spot-price-futures">Current Price ($)</Label>
                    <Input
                      id="spot-price-futures"
                      numeric
                      value={spotPrice.toString()}
                      onChange={(e) => handleNumericInputChange(e.target.value, setSpotPrice)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lot-size-futures">Lot/Contract Size</Label>
                  <Input
                    id="lot-size-futures"
                    numeric
                    value={lotSize.toString()}
                    onChange={(e) => handleNumericInputChange(e.target.value, setLotSize)}
                  />
                </div>
              </>
            )}
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
            
            {results.type === "options" && (
              <div className="space-y-3">
                <div className="text-xl font-bold flex items-center">
                  <CircleDollarSign className="mr-2" size={20} />
                  Options Result
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Profit/Loss:</span>
                    <span className={results.profitLoss >= 0 ? "text-green-600" : "text-red-600"}>
                      ${Math.abs(results.profitLoss).toFixed(2)} {results.profitLoss >= 0 ? "Profit" : "Loss"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intrinsic Value:</span>
                    <span>${results.intrinsicValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Extrinsic Value:</span>
                    <span>${results.extrinsicValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Break Even Price:</span>
                    <span>${results.breakEvenPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-base font-semibold mb-2">Greeks (Option Sensitivities)</div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      <div className="flex justify-between">
                        <span>Delta:</span>
                        <span>{results.greeks.delta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gamma:</span>
                        <span>{results.greeks.gamma}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Theta:</span>
                        <span>{results.greeks.theta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vega:</span>
                        <span>{results.greeks.vega}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rho:</span>
                        <span>{results.greeks.rho}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {results.type === "futures" && (
              <div className="space-y-3">
                <div className="text-xl font-bold flex items-center">
                  <CircleDollarSign className="mr-2" size={20} />
                  Futures Result
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Profit/Loss:</span>
                    <span className={results.profitLoss >= 0 ? "text-green-600" : "text-red-600"}>
                      ${Math.abs(results.profitLoss).toFixed(2)} {results.profitLoss >= 0 ? "Profit" : "Loss"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Margin Required:</span>
                    <span>${results.marginRequired.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Leverage Ratio:</span>
                    <span>{results.leverageRatio.toFixed(2)}x</span>
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
