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
import { Calculator, TrendingUp, CircleDollarSign, ChartLine, CircleCheck } from "lucide-react";
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
  
  // Portfolio Performance Metrics States
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(15000);
  const [investmentPeriodYears, setInvestmentPeriodYears] = useState<number>(3);
  const [benchmarkReturn, setBenchmarkReturn] = useState<number>(10);
  const [portfolioStdDev, setPortfolioStdDev] = useState<number>(15);
  const [riskFreeRate, setRiskFreeRate] = useState<number>(4);
  const [maxPortfolioValue, setMaxPortfolioValue] = useState<number>(16000);
  const [minPortfolioValue, setMinPortfolioValue] = useState<number>(9000);
  
  // Trade Planning Tools States
  const [winProbability, setWinProbability] = useState<number>(60);
  const [potentialProfit, setPotentialProfit] = useState<number>(1000);
  const [potentialLoss, setPotentialLoss] = useState<number>(500);
  const [totalTrades, setTotalTrades] = useState<number>(100);
  const [winningTrades, setWinningTrades] = useState<number>(60);
  const [averageWin, setAverageWin] = useState<number>(800);
  const [averageLoss, setAverageLoss] = useState<number>(400);
  const [riskAmount, setRiskAmount] = useState<number>(500);
  const [rewardAmount, setRewardAmount] = useState<number>(1500);
  
  // Sentiment & Psychology Tools States
  const [tradingHoursPerDay, setTradingHoursPerDay] = useState<number>(6);
  const [consecutiveLosses, setConsecutiveLosses] = useState<number>(3);
  const [revengeTrades, setRevengeTrades] = useState<number>(2);
  const [biggestLoss, setBiggestLoss] = useState<number>(2000);
  const [mentalRecoveryRate, setMentalRecoveryRate] = useState<number>(50);
  const [dailyTradeCount, setDailyTradeCount] = useState<number>(10);
  const [capitalDeployedPercent, setCapitalDeployedPercent] = useState<number>(70);
  
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
  
  // Calculate Portfolio Performance Metrics
  const calculatePortfolioMetrics = () => {
    // Calculate CAGR
    const cagr = ((Math.pow((finalValue / initialInvestment), 1 / investmentPeriodYears) - 1) * 100);
    
    // Sharpe Ratio = (Portfolio Return - Risk Free Rate) / Portfolio Standard Deviation
    const portfolioReturn = ((finalValue - initialInvestment) / initialInvestment) * 100;
    const sharpeRatio = (portfolioReturn - riskFreeRate) / portfolioStdDev;
    
    // Max Drawdown (percentage)
    const maxDrawdown = ((maxPortfolioValue - minPortfolioValue) / maxPortfolioValue) * 100;
    
    // Alpha (outperformance vs benchmark)
    const alpha = portfolioReturn - benchmarkReturn;
    
    // Beta (approximation - would need more data for accurate calculation)
    // Using a placeholder value between 0.8 and 1.2
    const beta = alpha > 0 ? 
      0.8 + (0.4 * (alpha / Math.max(10, alpha * 2))) : 
      1.2 - (0.4 * (Math.abs(alpha) / Math.max(10, Math.abs(alpha) * 2)));
    
    const calculatedResults = {
      type: "portfolio-metrics",
      cagr: parseFloat(cagr.toFixed(2)),
      sharpeRatio: parseFloat(sharpeRatio.toFixed(2)),
      maxDrawdown: parseFloat(maxDrawdown.toFixed(2)),
      alpha: parseFloat(alpha.toFixed(2)),
      beta: parseFloat(beta.toFixed(2)),
    };
    
    setResults(calculatedResults);
    
    toast({
      title: "Portfolio Metrics Calculated",
      description: `CAGR: ${cagr.toFixed(2)}%, Sharpe Ratio: ${sharpeRatio.toFixed(2)}`,
    });
  };
  
  // Calculate Trade Planning Metrics
  const calculateTradePlanning = () => {
    // Expected Value (EV) = (Win Probability × Potential Profit) - ((1 - Win Probability) × Potential Loss)
    const winProbabilityDecimal = winProbability / 100;
    const expectedValue = (winProbabilityDecimal * potentialProfit) - ((1 - winProbabilityDecimal) * potentialLoss);
    
    // Win Rate
    const winRate = (winningTrades / totalTrades) * 100;
    
    // Edge = ((Win Rate × Average Win) - ((100 - Win Rate) × Average Loss)) / 100
    const winRateDecimal = winRate / 100;
    const edge = (winRateDecimal * averageWin) - ((1 - winRateDecimal) * averageLoss);
    
    // R-Multiple (reward-to-risk ratio)
    const rMultiple = rewardAmount / riskAmount;
    
    // Simple Expiry Probability (uses win probability as proxy)
    const expiryProbability = winProbabilityDecimal * 100;
    
    const calculatedResults = {
      type: "trade-planning",
      expectedValue: parseFloat(expectedValue.toFixed(2)),
      winRate: parseFloat(winRate.toFixed(2)),
      edge: parseFloat(edge.toFixed(2)),
      rMultiple: parseFloat(rMultiple.toFixed(2)),
      expiryProbability: parseFloat(expiryProbability.toFixed(2)),
    };
    
    setResults(calculatedResults);
    
    toast({
      title: "Trade Planning Metrics Calculated",
      description: `Expected Value: $${expectedValue.toFixed(2)}, Edge: $${edge.toFixed(2)}`,
    });
  };
  
  // Calculate Sentiment & Psychology Metrics
  const calculateSentimentMetrics = () => {
    // Burnout Index (0-100)
    // Factors: Trading hours (>8 hours high risk), consecutive losses (>5 high risk), revenge trades (>0 high risk)
    const hoursFactor = Math.min(10, tradingHoursPerDay) / 10 * 33.33; // Max 33.33 points
    const lossesFactor = Math.min(10, consecutiveLosses) / 10 * 33.33; // Max 33.33 points
    const revengeFactor = Math.min(5, revengeTrades) / 5 * 33.33; // Max 33.33 points
    const burnoutIndex = hoursFactor + lossesFactor + revengeFactor;
    
    // Emotional Loss Recovery Time (in days)
    // Formula: (Biggest Loss / Mental Recovery Rate) * 7
    // The bigger the loss and lower the recovery rate, the longer it takes
    const recoveryDays = (biggestLoss / mentalRecoveryRate) * 7;
    
    // Overtrading Risk (0-100)
    // Factors: Daily trade count (>15 high risk), Capital deployed % (>80% high risk)
    const tradeCountFactor = Math.min(30, dailyTradeCount) / 30 * 50; // Max 50 points
    const capitalFactor = capitalDeployedPercent / 100 * 50; // Max 50 points
    const overtradingRisk = tradeCountFactor + capitalFactor;
    
    const calculatedResults = {
      type: "sentiment-psychology",
      burnoutIndex: parseFloat(burnoutIndex.toFixed(2)),
      recoveryDays: parseFloat(recoveryDays.toFixed(1)),
      overtradingRisk: parseFloat(overtradingRisk.toFixed(2)),
      burnoutLevel: burnoutIndex < 33 ? "Low" : burnoutIndex < 66 ? "Moderate" : "High",
      overtradingLevel: overtradingRisk < 33 ? "Low" : overtradingRisk < 66 ? "Moderate" : "High"
    };
    
    setResults(calculatedResults);
    
    toast({
      title: "Sentiment & Psychology Metrics Calculated",
      description: `Burnout Index: ${burnoutIndex.toFixed(2)}/100, Recovery: ${recoveryDays.toFixed(1)} days`,
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
      case "f-and-o":
        calculateFAndO();
        break;
      case "portfolio-metrics":
        calculatePortfolioMetrics();
        break;
      case "trade-planning":
        calculateTradePlanning();
        break;
      case "sentiment-psychology":
        calculateSentimentMetrics();
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
        <CardDescription>Calculate profit/loss, position sizing, and advanced metrics for stock trades</CardDescription>
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
              <SelectItem value="portfolio-metrics">Portfolio Performance Metrics</SelectItem>
              <SelectItem value="trade-planning">Trade Planning Tools</SelectItem>
              <SelectItem value="sentiment-psychology">Sentiment & Psychology Tools</SelectItem>
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
        
        {calculatorType === "portfolio-metrics" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initial-investment">Initial Investment ($)</Label>
                <Input
                  id="initial-investment"
                  numeric
                  value={initialInvestment.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setInitialInvestment)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="final-value">Current Portfolio Value ($)</Label>
                <Input
                  id="final-value"
                  numeric
                  value={finalValue.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setFinalValue)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investment-period">Investment Period (Years)</Label>
                <Input
                  id="investment-period"
                  numeric
                  value={investmentPeriodYears.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setInvestmentPeriodYears)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="benchmark-return">Benchmark Return (%)</Label>
                <Input
                  id="benchmark-return"
                  numeric
                  value={benchmarkReturn.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setBenchmarkReturn)}
                />
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="advanced-metrics">
                <AccordionTrigger>Advanced Metrics Settings</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="portfolio-stddev">Portfolio Std. Deviation (%)</Label>
                        <Input
                          id="portfolio-stddev"
                          numeric
                          value={portfolioStdDev.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setPortfolioStdDev)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="risk-free-rate">Risk-Free Rate (%)</Label>
                        <Input
                          id="risk-free-rate"
                          numeric
                          value={riskFreeRate.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setRiskFreeRate)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="max-portfolio-value">Max Portfolio Value ($)</Label>
                        <Input
                          id="max-portfolio-value"
                          numeric
                          value={maxPortfolioValue.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setMaxPortfolioValue)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="min-portfolio-value">Min Portfolio Value ($)</Label>
                        <Input
                          id="min-portfolio-value"
                          numeric
                          value={minPortfolioValue.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setMinPortfolioValue)}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
        
        {calculatorType === "trade-planning" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="win-probability">Win Probability (%)</Label>
                <Input
                  id="win-probability"
                  numeric
                  value={winProbability.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setWinProbability)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="potential-profit">Potential Profit ($)</Label>
                <Input
                  id="potential-profit"
                  numeric
                  value={potentialProfit.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setPotentialProfit)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="potential-loss">Potential Loss ($)</Label>
              <Input
                id="potential-loss"
                numeric
                value={potentialLoss.toString()}
                onChange={(e) => handleNumericInputChange(e.target.value, setPotentialLoss)}
              />
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="win-rate-edge">
                <AccordionTrigger>Win Rate & Edge Settings</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="total-trades">Total Trades</Label>
                        <Input
                          id="total-trades"
                          numeric
                          value={totalTrades.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setTotalTrades)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="winning-trades">Winning Trades</Label>
                        <Input
                          id="winning-trades"
                          numeric
                          value={winningTrades.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setWinningTrades)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="average-win">Average Win ($)</Label>
                        <Input
                          id="average-win"
                          numeric
                          value={averageWin.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setAverageWin)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="average-loss">Average Loss ($)</Label>
                        <Input
                          id="average-loss"
                          numeric
                          value={averageLoss.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setAverageLoss)}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="r-multiple">
                <AccordionTrigger>R-Multiple Settings</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="risk-amount">Risk Amount ($)</Label>
                        <Input
                          id="risk-amount"
                          numeric
                          value={riskAmount.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setRiskAmount)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reward-amount">Reward Amount ($)</Label>
                        <Input
                          id="reward-amount"
                          numeric
                          value={rewardAmount.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setRewardAmount)}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
        
        {calculatorType === "sentiment-psychology" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Burnout Index Factors</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trading-hours">Trading Hours per Day</Label>
                  <Input
                    id="trading-hours"
                    numeric
                    value={tradingHoursPerDay.toString()}
                    onChange={(e) => handleNumericInputChange(e.target.value, setTradingHoursPerDay)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consecutive-losses">Consecutive Losses</Label>
                  <Input
                    id="consecutive-losses"
                    numeric
                    value={consecutiveLosses.toString()}
                    onChange={(e) => handleNumericInputChange(e.target.value, setConsecutiveLosses)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenge-trades">Revenge Trades</Label>
                <Input
                  id="revenge-trades"
                  numeric
                  value={revengeTrades.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setRevengeTrades)}
                />
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="emotional-recovery">
                <AccordionTrigger>Emotional Recovery Calculator</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="biggest-loss">Biggest Loss ($)</Label>
                        <Input
                          id="biggest-loss"
                          numeric
                          value={biggestLoss.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setBiggestLoss)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mental-recovery-rate">Mental Recovery Rate ($/day)</Label>
                        <Input
                          id="mental-recovery-rate"
                          numeric
                          value={mentalRecoveryRate.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setMentalRecoveryRate)}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="overtrading-risk">
                <AccordionTrigger>Overtrading Risk Checker</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="daily-trade-count">Daily Trade Count</Label>
                        <Input
                          id="daily-trade-count"
                          numeric
                          value={dailyTradeCount.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setDailyTradeCount)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capital-deployed">Capital Deployed (%)</Label>
                        <Input
                          id="capital-deployed"
                          numeric
                          value={capitalDeployedPercent.toString()}
                          onChange={(e) => handleNumericInputChange(e.target.value, setCapitalDeployedPercent)}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
            
            {results.type === "portfolio-metrics" && (
              <div className="space-y-3">
                <div className="text-xl font-bold flex items-center">
                  <ChartLine className="mr-2" size={20} />
                  Portfolio Performance Metrics
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>CAGR (Compound Annual Growth Rate):</span>
                    <span className={results.cagr >= 0 ? "text-green-600" : "text-red-600"}>
                      {results.cagr.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sharpe Ratio:</span>
                    <span className={results.sharpeRatio >= 1 ? "text-green-600" : results.sharpeRatio >= 0 ? "text-amber-600" : "text-red-600"}>
                      {results.sharpeRatio.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maximum Drawdown:</span>
                    <span className="text-amber-600">
                      {results.maxDrawdown.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alpha (vs. Benchmark):</span>
                    <span className={results.alpha >= 0 ? "text-green-600" : "text-red-600"}>
                      {results.alpha >= 0 ? "+" : ""}{results.alpha.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Beta:</span>
                    <span className={results.beta < 1 ? "text-amber-600" : results.beta > 1.2 ? "text-red-600" : "text-green-600"}>
                      {results.beta.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {results.type === "trade-planning" && (
              <div className="space-y-3">
                <div className="text-xl font-bold flex items-center">
                  <Calculator className="mr-2" size={20} />
                  Trade Planning Analysis
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Expected Value (EV):</span>
                    <span className={results.expectedValue >= 0 ? "text-green-600" : "text-red-600"}>
                      ${Math.abs(results.expectedValue).toFixed(2)} {results.expectedValue >= 0 ? "Profit" : "Loss"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Win Rate:</span>
                    <span className={results.winRate > 50 ? "text-green-600" : "text-amber-600"}>
                      {results.winRate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statistical Edge:</span>
                    <span className={results.edge >= 0 ? "text-green-600" : "text-red-600"}>
                      ${Math.abs(results.edge).toFixed(2)} per trade {results.edge >= 0 ? "profit" : "loss"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>R-Multiple (Reward:Risk):</span>
                    <span className={results.rMultiple >= 2 ? "text-green-600" : results.rMultiple >= 1 ? "text-amber-600" : "text-red-600"}>
                      {results.rMultiple.toFixed(2)}:1
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Option Expiry Probability:</span>
                    <span>
                      {results.expiryProbability.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {results.type === "sentiment-psychology" && (
              <div className="space-y-3">
                <div className="text-xl font-bold flex items-center">
                  <CircleCheck className="mr-2" size={20} />
                  Trading Psychology Analysis
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Burnout Index:</span>
                    <span className={
                      results.burnoutIndex < 33 ? "text-green-600" : 
                      results.burnoutIndex < 66 ? "text-amber-600" : 
                      "text-red-600"
                    }>
                      {results.burnoutIndex.toFixed(2)}/100 ({results.burnoutLevel} Risk)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emotional Recovery Time:</span>
                    <span className={
                      results.recoveryDays < 7 ? "text-green-600" : 
                      results.recoveryDays < 21 ? "text-amber-600" : 
                      "text-red-600"
                    }>
                      {results.recoveryDays.toFixed(1)} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overtrading Risk:</span>
                    <span className={
                      results.overtradingRisk < 33 ? "text-green-600" : 
                      results.overtradingRisk < 66 ? "text-amber-600" : 
                      "text-red-600"
                    }>
                      {results.overtradingRisk.toFixed(2)}/100 ({results.overtradingLevel} Risk)
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-base font-semibold mb-2">Recommendations</div>
                    {results.burnoutIndex >= 66 && (
                      <div className="text-sm text-red-600 mb-1">
                        • Consider taking a trading break to prevent burnout
                      </div>
                    )}
                    {results.recoveryDays >= 21 && (
                      <div className="text-sm text-red-600 mb-1">
                        • Large loss detected - consider smaller position sizes
                      </div>
                    )}
                    {results.overtradingRisk >= 66 && (
                      <div className="text-sm text-red-600 mb-1">
                        • High overtrading risk - reduce trading frequency or size
                      </div>
                    )}
                    {(results.burnoutIndex < 66 && results.recoveryDays < 21 && results.overtradingRisk < 66) && (
                      <div className="text-sm text-green-600">
                        • Your current trading psychology metrics are healthy
                      </div>
                    )}
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
