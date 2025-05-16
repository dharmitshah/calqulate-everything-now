
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
import { 
  Calculator, 
  TrendingUp, 
  CircleDollarSign, 
  ChartLine, 
  CircleCheck, 
  Coins,
  BadgeDollarSign,
  BadgeIndianRupee,
  BadgeEuro,
  BadgePoundSterling,
  Currency,
  FileText
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const StockMarketCalculator = () => {
  const { toast } = useToast();
  const [calculatorTab, setCalculatorTab] = useState<string>("profit-loss");
  
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
  
  // Brokerage & Transaction Cost Calculator States
  const [country, setCountry] = useState<string>("india");
  const [brokerType, setBrokerType] = useState<string>("discount");
  const [tradeValue, setTradeValue] = useState<number>(100000);
  const [tradeType, setTradeType] = useState<string>("equity");
  const [transactionType, setTransactionType] = useState<string>("buy");
  const [deliveryType, setDeliveryType] = useState<string>("intraday");
  const [brokerName, setBrokerName] = useState<string>("zerodha");
  const [turnoverValue, setTurnoverValue] = useState<number>(1000000);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  
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
  
  // Calculate Brokerage & Transaction Costs
  const calculateBrokerageCosts = () => {
    let brokerageFee = 0;
    let stt = 0;
    let exchangeFee = 0;
    let gst = 0;
    let sebi = 0;
    let stampDuty = 0;
    let secFee = 0;
    let tafFee = 0;
    let finraFee = 0;
    let totalCharges = 0;
    let netAmount = tradeValue;
    
    if (country === "india") {
      // India calculations
      if (brokerType === "discount") {
        if (brokerName === "zerodha") {
          // Zerodha charges
          brokerageFee = deliveryType === "intraday" ? Math.min(0.03 * tradeValue / 100, 20) : 0;
          stt = tradeType === "equity" ? 
            (transactionType === "buy" ? 0 : (deliveryType === "intraday" ? 0.025 : 0.1) * tradeValue / 100) : 
            (transactionType === "buy" ? 0 : 0.017 * tradeValue / 100);
          exchangeFee = 0.00325 * tradeValue / 100;
          gst = 18 * (brokerageFee + exchangeFee) / 100;
          sebi = 0.0001 * tradeValue / 100;
          stampDuty = transactionType === "buy" ? 0.015 * tradeValue / 100 : 0;
        } else if (brokerName === "upstox") {
          // Upstox charges
          brokerageFee = deliveryType === "intraday" ? Math.min(0.05 * tradeValue / 100, 20) : 0;
          stt = tradeType === "equity" ? 
            (transactionType === "buy" ? 0 : (deliveryType === "intraday" ? 0.025 : 0.1) * tradeValue / 100) :
            (transactionType === "buy" ? 0 : 0.017 * tradeValue / 100);
          exchangeFee = 0.00325 * tradeValue / 100;
          gst = 18 * (brokerageFee + exchangeFee) / 100;
          sebi = 0.0001 * tradeValue / 100;
          stampDuty = transactionType === "buy" ? 0.015 * tradeValue / 100 : 0;
        }
      } else {
        // Full-service broker charges (higher)
        brokerageFee = 0.5 * tradeValue / 100;
        stt = tradeType === "equity" ? 
          (transactionType === "buy" ? 0 : (deliveryType === "intraday" ? 0.025 : 0.1) * tradeValue / 100) :
          (transactionType === "buy" ? 0 : 0.017 * tradeValue / 100);
        exchangeFee = 0.00325 * tradeValue / 100;
        gst = 18 * (brokerageFee + exchangeFee) / 100;
        sebi = 0.0001 * tradeValue / 100;
        stampDuty = transactionType === "buy" ? 0.015 * tradeValue / 100 : 0;
      }
      
      totalCharges = brokerageFee + stt + exchangeFee + gst + sebi + stampDuty;
    } else {
      // US calculations
      if (brokerName === "robinhood") {
        // Robinhood - commission-free
        brokerageFee = 0;
      } else if (brokerName === "schwab") {
        // Charles Schwab - commission-free for stock trades
        brokerageFee = 0;
      } else if (brokerName === "etrade") {
        // E*TRADE charges
        brokerageFee = 0; // Now commission-free for stock trades
      } else if (brokerName === "td") {
        // TD Ameritrade charges
        brokerageFee = 0; // Now commission-free for stock trades
      } else {
        // Generic broker fees
        brokerageFee = 4.95; // Flat fee
      }
      
      // Regulatory fees (apply to all US brokers)
      secFee = transactionType === "sell" ? (0.0000229 * tradeValue) : 0;
      tafFee = 0.000119 * tradeValue;
      finraFee = transactionType === "sell" ? 0.000119 * tradeValue : 0;
      
      totalCharges = brokerageFee + secFee + tafFee + finraFee;
    }
    
    // Calculate net amount
    if (transactionType === "buy") {
      netAmount = tradeValue + totalCharges;
    } else {
      netAmount = tradeValue - totalCharges;
    }
    
    const calculatedResults = {
      type: "brokerage-costs",
      country: country,
      brokerName: brokerName,
      brokerageFee: parseFloat(brokerageFee.toFixed(2)),
      totalCharges: parseFloat(totalCharges.toFixed(2)),
      netAmount: parseFloat(netAmount.toFixed(2)),
      chargePercentage: parseFloat((totalCharges / tradeValue * 100).toFixed(3)),
      breakdown: country === "india" ? {
        stt: parseFloat(stt.toFixed(2)),
        exchangeFee: parseFloat(exchangeFee.toFixed(2)),
        gst: parseFloat(gst.toFixed(2)),
        sebi: parseFloat(sebi.toFixed(2)),
        stampDuty: parseFloat(stampDuty.toFixed(2))
      } : {
        secFee: parseFloat(secFee.toFixed(2)),
        tafFee: parseFloat(tafFee.toFixed(2)),
        finraFee: parseFloat(finraFee.toFixed(2))
      }
    };
    
    setResults(calculatedResults);
    
    toast({
      title: "Brokerage Costs Calculated",
      description: `Total charges: ${country === "india" ? "₹" : "$"}${totalCharges.toFixed(2)} (${(totalCharges / tradeValue * 100).toFixed(3)}%)`,
    });
  };
  
  // Calculate Turnover for Audit
  const calculateTurnover = () => {
    // In India, trading turnover above ₹10 crore requires tax audit
    const auditThreshold = 100000000; // ₹10 crore in rupees
    const requiresAudit = turnoverValue >= auditThreshold;
    
    // Calculate estimated filing charges
    const estimatedFilingCharges = requiresAudit ? 10000 : 2500; // ₹10,000 for audit, ₹2,500 for simple filing
    
    const calculatedResults = {
      type: "turnover",
      turnoverValue: parseFloat(turnoverValue.toFixed(2)),
      requiresAudit: requiresAudit,
      auditThreshold: auditThreshold,
      estimatedFilingCharges: estimatedFilingCharges,
      filingType: requiresAudit ? "ITR-3 with audit" : "ITR-2 without audit"
    };
    
    setResults(calculatedResults);
    
    toast({
      title: "Turnover Analysis Completed",
      description: `${requiresAudit ? "Audit required" : "No audit required"} for turnover of ₹${(turnoverValue / 10000000).toFixed(2)} crore`,
    });
  };
  
  // Compare brokers
  const compareBrokers = () => {
    const brokers = [
      { 
        name: "Zerodha", 
        country: "India",
        equityDelivery: "0% (max ₹20 per order)",
        equityIntraday: "0.03% or ₹20 per order (whichever is lower)",
        fAndO: "0.03% or ₹20 per order (whichever is lower)",
        accountMaintenance: "₹300 per year",
        marginFunding: "0.05% per day (18.25% per annum)"
      },
      { 
        name: "ICICI Direct", 
        country: "India",
        equityDelivery: "0.55% for delivery trades",
        equityIntraday: "0.275% for intraday trades",
        fAndO: "0.05% for F&O trades",
        accountMaintenance: "₹975 per year",
        marginFunding: "0.055% per day (20.1% per annum)"
      },
      { 
        name: "Robinhood", 
        country: "U.S.",
        equityDelivery: "0% commission",
        equityIntraday: "0% commission",
        fAndO: "$0 per contract",
        accountMaintenance: "$0",
        marginFunding: "5.75% for margin above $1,000"
      },
      { 
        name: "Charles Schwab", 
        country: "U.S.",
        equityDelivery: "0% commission",
        equityIntraday: "0% commission",
        fAndO: "$0.65 per contract",
        accountMaintenance: "$0",
        marginFunding: "9.075% for margin below $25,000"
      },
      { 
        name: "TD Ameritrade", 
        country: "U.S.",
        equityDelivery: "0% commission",
        equityIntraday: "0% commission",
        fAndO: "$0.65 per contract",
        accountMaintenance: "$0",
        marginFunding: "9.5% for margin below $25,000"
      }
    ];
    
    // Filter brokers by country if needed
    const filteredBrokers = country !== "both" ? 
      brokers.filter((broker) => broker.country.toLowerCase() === country) : 
      brokers;
    
    const calculatedResults = {
      type: "broker-comparison",
      brokers: filteredBrokers,
      recommendedFor: {
        beginners: "Robinhood (U.S.) / Zerodha (India)",
        highVolume: "Zerodha (India) / Charles Schwab (U.S.)",
        delivery: "Zerodha (India) / Robinhood (U.S.)",
        options: "Robinhood (U.S.) / Zerodha (India)"
      }
    };
    
    setResults(calculatedResults);
    
    toast({
      title: "Broker Comparison Completed",
      description: `Compared ${filteredBrokers.length} brokers in ${country === "both" ? "India and U.S." : country === "india" ? "India" : "U.S."}`,
    });
  };
  
  const handleCalculate = () => {
    switch (calculatorTab) {
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
      case "brokerage-costs":
        calculateBrokerageCosts();
        break;
      case "turnover":
        calculateTurnover();
        break;
      case "broker-comparison":
        compareBrokers();
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
        <Tabs value={calculatorTab} onValueChange={setCalculatorTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9">
            <TabsTrigger value="profit-loss" className="text-xs md:text-sm">
              <span className="hidden md:inline">Profit/Loss</span>
              <span className="inline md:hidden">P/L</span>
            </TabsTrigger>
            <TabsTrigger value="position-size" className="text-xs md:text-sm">
              <span className="hidden md:inline">Position Size</span>
              <span className="inline md:hidden">Size</span>
            </TabsTrigger>
            <TabsTrigger value="f-and-o" className="text-xs md:text-sm">
              <span className="hidden md:inline">F&O</span>
              <span className="inline md:hidden">F&O</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio-metrics" className="text-xs md:text-sm">
              <span className="hidden md:inline">Portfolio</span>
              <span className="inline md:hidden">Port</span>
            </TabsTrigger>
            <TabsTrigger value="trade-planning" className="text-xs md:text-sm">
              <span className="hidden md:inline">Planning</span>
              <span className="inline md:hidden">Plan</span>
            </TabsTrigger>
            <TabsTrigger value="sentiment-psychology" className="text-xs md:text-sm">
              <span className="hidden md:inline">Psychology</span>
              <span className="inline md:hidden">Psych</span>
            </TabsTrigger>
            <TabsTrigger value="brokerage-costs" className="text-xs md:text-sm">
              <span className="hidden md:inline">Brokerage</span>
              <span className="inline md:hidden">Brkg</span>
            </TabsTrigger>
            <TabsTrigger value="turnover" className="text-xs md:text-sm">
              <span className="hidden md:inline">Turnover</span>
              <span className="inline md:hidden">Turn</span>
            </TabsTrigger>
            <TabsTrigger value="broker-comparison" className="text-xs md:text-sm">
              <span className="hidden md:inline">Compare</span>
              <span className="inline md:hidden">Comp</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profit-loss" className="mt-4">
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
          </TabsContent>
          
          <TabsContent value="position-size" className="mt-4">
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
          </TabsContent>

          <TabsContent value="f-and-o" className="mt-4">
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
          </TabsContent>
          
          <TabsContent value="portfolio-metrics" className="mt-4">
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
          </TabsContent>
          
          <TabsContent value="trade-planning" className="mt-4">
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
          </TabsContent>
          
          <TabsContent value="sentiment-psychology" className="mt-4">
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
          </TabsContent>
          
          <TabsContent value="brokerage-costs" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select 
                  value={country} 
                  onValueChange={setCountry}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {country === "india" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="broker-type">Broker Type</Label>
                    <Select 
                      value={brokerType} 
                      onValueChange={setBrokerType}
                    >
                      <SelectTrigger id="broker-type">
                        <SelectValue placeholder="Select broker type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discount">Discount Broker</SelectItem>
                        <SelectItem value="full">Full Service Broker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {brokerType === "discount" && (
                    <div className="space-y-2">
                      <Label htmlFor="broker-name">Broker Name</Label>
                      <Select 
                        value={brokerName} 
                        onValueChange={setBrokerName}
                      >
                        <SelectTrigger id="broker-name">
                          <SelectValue placeholder="Select broker" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zerodha">Zerodha</SelectItem>
                          <SelectItem value="upstox">Upstox</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}
              
              {country === "us" && (
                <div className="space-y-2">
                  <Label htmlFor="broker-name-us">Broker Name</Label>
                  <Select 
                    value={brokerName} 
                    onValueChange={setBrokerName}
                  >
                    <SelectTrigger id="broker-name-us">
                      <SelectValue placeholder="Select broker" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="robinhood">Robinhood</SelectItem>
                      <SelectItem value="schwab">Charles Schwab</SelectItem>
                      <SelectItem value="etrade">E*TRADE</SelectItem>
                      <SelectItem value="td">TD Ameritrade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trade-value">Trade Value ({country === "india" ? "₹" : "$"})</Label>
                  <Input
                    id="trade-value"
                    numeric
                    value={tradeValue.toString()}
                    onChange={(e) => handleNumericInputChange(e.target.value, setTradeValue)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trade-type">Trade Type</Label>
                  <Select 
                    value={tradeType} 
                    onValueChange={setTradeType}
                  >
                    <SelectTrigger id="trade-type">
                      <SelectValue placeholder="Select trade type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equity">Equity</SelectItem>
                      <SelectItem value="futures">Futures</SelectItem>
                      <SelectItem value="options">Options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transaction-type">Transaction Type</Label>
                  <Select 
                    value={transactionType} 
                    onValueChange={setTransactionType}
                  >
                    <SelectTrigger id="transaction-type">
                      <SelectValue placeholder="Select transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {tradeType === "equity" && (
                  <div className="space-y-2">
                    <Label htmlFor="delivery-type">Delivery Type</Label>
                    <Select 
                      value={deliveryType} 
                      onValueChange={setDeliveryType}
                    >
                      <SelectTrigger id="delivery-type">
                        <SelectValue placeholder="Select delivery type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="intraday">Intraday</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="turnover" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="turnover-value">Annual Trading Turnover (₹)</Label>
                <Input
                  id="turnover-value"
                  numeric
                  value={turnoverValue.toString()}
                  onChange={(e) => handleNumericInputChange(e.target.value, setTurnoverValue)}
                />
                <p className="text-xs text-muted-foreground mt-1">For Indian tax audit requirement calculation</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="broker-comparison" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="compare-country">Countries to Compare</Label>
                <Select 
                  value={country} 
                  onValueChange={setCountry}
                >
                  <SelectTrigger id="compare-country">
                    <SelectValue placeholder="Select countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India Only</SelectItem>
                    <SelectItem value="us">U.S. Only</SelectItem>
                    <SelectItem value="both">Both India & U.S.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
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
            
            {results.type === "brokerage-costs" && (
              <div className="space-y-3">
                <div className="text-xl font-bold flex items-center">
                  <Coins className="mr-2" size={20} />
                  Brokerage & Fees {results.country === "india" ? "(India)" : "(U.S.)"}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Total Charges:</span>
                    <span className="text-amber-600">
                      {results.country === "india" ? "₹" : "$"}{results.totalCharges.toFixed(2)} ({results.chargePercentage}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brokerage Fee:</span>
                    <span>{results.country === "india" ? "₹" : "$"}{results.brokerageFee.toFixed(2)}</span>
                  </div>
                  
                  {results.country === "india" && (
                    <>
                      <div className="flex justify-between">
                        <span>Securities Transaction Tax (STT):</span>
                        <span>₹{results.breakdown.stt.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Exchange Transaction Charges:</span>
                        <span>₹{results.breakdown.exchangeFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%):</span>
                        <span>₹{results.breakdown.gst.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SEBI Charges:</span>
                        <span>₹{results.breakdown.sebi.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stamp Duty:</span>
                        <span>₹{results.breakdown.stampDuty.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  
                  {results.country === "us" && (
                    <>
                      <div className="flex justify-between">
                        <span>SEC Fee:</span>
                        <span>${results.breakdown.secFee.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TAF Fee:</span>
                        <span>${results.breakdown.tafFee.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FINRA Trading Activity Fee:</span>
                        <span>${results.breakdown.finraFee.toFixed(4)}</span>
                      </div>
                    </>
                  )}
                  
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between font-bold">
                      <span>Net {results.transactionType === "buy" ? "Payment" : "Proceeds"}:</span>
                      <span className={results.transactionType === "buy" ? "text-red-600" : "text-green-600"}>
                        {results.country === "india" ? "₹" : "$"}{results.netAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {results.type === "turnover" && (
              <div className="space-y-3">
                <div className="text-xl font-bold flex items-center">
                  <FileText className="mr-2" size={20} />
                  Trading Turnover Analysis
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Annual Trading Turnover:</span>
                    <span>₹{results.turnoverValue.toFixed(2)} ({(results.turnoverValue / 10000000).toFixed(2)} crore)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit Threshold:</span>
                    <span>₹{results.auditThreshold} (10 crore)</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Tax Audit Requirement:</span>
                    <span className={results.requiresAudit ? "text-red-600" : "text-green-600"}>
                      {results.requiresAudit ? "Required" : "Not Required"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Filing Type:</span>
                    <span>{results.filingType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Filing Charges:</span>
                    <span>₹{results.estimatedFilingCharges}</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                    <p>Note: In India, if your total turnover from intraday trading exceeds ₹10 crore in a financial year, you're required to get your accounts audited.</p>
                  </div>
                </div>
              </div>
            )}
            
            {results.type === "broker-comparison" && (
              <div className="space-y-3">
                <div className="text-xl font-bold flex items-center">
                  <BadgeDollarSign className="mr-2" size={20} />
                  Broker Comparison
                </div>
                <div className="space-y-4">
                  {results.brokers.map((broker: any, index: number) => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="font-semibold text-lg mb-1 flex items-center">
                        {broker.country === "India" ? (
                          <BadgeIndianRupee className="mr-2" size={16} />
                        ) : (
                          <BadgeDollarSign className="mr-2" size={16} />
                        )}
                        {broker.name} ({broker.country})
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Equity Delivery:</span>
                          <span>{broker.equityDelivery}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Equity Intraday:</span>
                          <span>{broker.equityIntraday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">F&O Trading:</span>
                          <span>{broker.fAndO}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Account Maintenance:</span>
                          <span>{broker.accountMaintenance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Margin Funding Rate:</span>
                          <span>{broker.marginFunding}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-base font-semibold mb-2">Recommendations</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Best for Beginners:</span>
                        <span>{results.recommendedFor.beginners}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Best for High-Volume Traders:</span>
                        <span>{results.recommendedFor.highVolume}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Best for Delivery Trading:</span>
                        <span>{results.recommendedFor.delivery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Best for Options Trading:</span>
                        <span>{results.recommendedFor.options}</span>
                      </div>
                    </div>
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
