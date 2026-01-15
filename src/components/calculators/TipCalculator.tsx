import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  DollarSign, 
  Users, 
  Info, 
  Sparkles, 
  Globe, 
  Calculator,
  TrendingUp,
  Percent,
  Banknote,
  Coffee,
  Car,
  Scissors,
  Hotel,
  UtensilsCrossed,
  Truck
} from "lucide-react";

// Country tipping data for SEO and functionality
const COUNTRY_TIPPING_DATA: Record<string, { 
  name: string; 
  defaultTip: number; 
  range: [number, number]; 
  notes: string;
  culture: string;
}> = {
  us: { 
    name: "United States", 
    defaultTip: 20, 
    range: [15, 25],
    notes: "Tipping is customary and expected for most services",
    culture: "Standard 15-20% for restaurants, 15-20% for taxis, $1-2 per drink at bars"
  },
  ca: { 
    name: "Canada", 
    defaultTip: 18, 
    range: [15, 20],
    notes: "Similar to US tipping culture",
    culture: "15-20% at restaurants, 10-15% for other services"
  },
  uk: { 
    name: "United Kingdom", 
    defaultTip: 12, 
    range: [10, 15],
    notes: "Service charge often included, check your bill",
    culture: "10-15% if no service charge, round up for taxis"
  },
  eu: { 
    name: "Europe (General)", 
    defaultTip: 10, 
    range: [5, 15],
    notes: "Tipping less common, service often included",
    culture: "Round up or leave 5-10% for exceptional service"
  },
  au: { 
    name: "Australia", 
    defaultTip: 10, 
    range: [0, 15],
    notes: "Not expected but appreciated for good service",
    culture: "Workers earn living wages; 10% for fine dining"
  },
  jp: { 
    name: "Japan", 
    defaultTip: 0, 
    range: [0, 0],
    notes: "Tipping is not customary and may be refused",
    culture: "Excellent service is standard; no tip needed"
  },
  cn: { 
    name: "China", 
    defaultTip: 0, 
    range: [0, 10],
    notes: "Not traditional but accepted in tourist areas",
    culture: "High-end hotels and tourist spots may expect 10%"
  },
  in: { 
    name: "India", 
    defaultTip: 10, 
    range: [5, 15],
    notes: "Appreciated in restaurants and for services",
    culture: "10% at restaurants, small amounts for other services"
  },
  mx: { 
    name: "Mexico", 
    defaultTip: 15, 
    range: [10, 20],
    notes: "Expected in tourist areas and restaurants",
    culture: "15-20% at restaurants, small amounts for services"
  },
  br: { 
    name: "Brazil", 
    defaultTip: 10, 
    range: [10, 15],
    notes: "10% service charge often included",
    culture: "Check if 'serviço' is included on bill"
  },
};

// Service quality presets
const SERVICE_QUALITY = {
  poor: { label: "Poor", tip: 10, emoji: "😕", description: "Service below expectations" },
  average: { label: "Average", tip: 15, emoji: "🙂", description: "Standard acceptable service" },
  good: { label: "Good", tip: 18, emoji: "😊", description: "Friendly and attentive service" },
  excellent: { label: "Excellent", tip: 20, emoji: "🤩", description: "Outstanding experience" },
  exceptional: { label: "Exceptional", tip: 25, emoji: "⭐", description: "Above and beyond" },
};

// Industry-specific tip suggestions
const INDUSTRY_PRESETS = {
  restaurant: { icon: UtensilsCrossed, label: "Restaurant", defaultTip: 20, range: [15, 25] },
  delivery: { icon: Truck, label: "Delivery", defaultTip: 18, range: [15, 20] },
  rideshare: { icon: Car, label: "Uber/Lyft", defaultTip: 15, range: [10, 20] },
  taxi: { icon: Car, label: "Taxi", defaultTip: 15, range: [15, 20] },
  coffee: { icon: Coffee, label: "Coffee Shop", defaultTip: 10, range: [0, 15] },
  salon: { icon: Scissors, label: "Hair/Salon", defaultTip: 20, range: [15, 25] },
  hotel: { icon: Hotel, label: "Hotel Staff", defaultTip: 15, range: [10, 20] },
};

// Rounding options
type RoundingOption = "none" | "up" | "nearest" | "down";

export const TipCalculator = () => {
  // Core state
  const [billAmount, setBillAmount] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [customTipAmount, setCustomTipAmount] = useState<number | null>(null);
  
  // Enhanced options
  const [country, setCountry] = useState<string>("us");
  const [serviceQuality, setServiceQuality] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [tipOnPreTax, setTipOnPreTax] = useState<boolean>(true);
  const [roundingOption, setRoundingOption] = useState<RoundingOption>("none");
  const [activeTab, setActiveTab] = useState<string>("percentage");
  
  // Results
  const [result, setResult] = useState({ 
    tipAmount: 0, 
    totalAmount: 0, 
    perPerson: 0,
    tipPerPerson: 0 
  });

  // Get country data
  const countryData = useMemo(() => COUNTRY_TIPPING_DATA[country], [country]);

  // Apply rounding based on option
  const applyRounding = (amount: number): number => {
    switch (roundingOption) {
      case "up":
        return Math.ceil(amount);
      case "nearest":
        return Math.round(amount);
      case "down":
        return Math.floor(amount);
      default:
        return amount;
    }
  };

  // Handle service quality selection
  const handleServiceQualityChange = (quality: string) => {
    setServiceQuality(quality);
    setTipPercentage(SERVICE_QUALITY[quality as keyof typeof SERVICE_QUALITY].tip);
    setCustomTipAmount(null);
    setIndustry(null);
  };

  // Handle industry selection
  const handleIndustryChange = (ind: string) => {
    setIndustry(ind);
    setTipPercentage(INDUSTRY_PRESETS[ind as keyof typeof INDUSTRY_PRESETS].defaultTip);
    setCustomTipAmount(null);
    setServiceQuality(null);
  };

  // Handle country change
  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    const data = COUNTRY_TIPPING_DATA[newCountry];
    if (data) {
      setTipPercentage(data.defaultTip);
      setCustomTipAmount(null);
      setServiceQuality(null);
      setIndustry(null);
    }
  };

  // Quick tip buttons
  const quickTipPercentages = [10, 15, 18, 20, 25];

  // Calculate tip whenever inputs change
  useEffect(() => {
    calculateTip();
  }, [billAmount, taxAmount, tipPercentage, numberOfPeople, customTipAmount, tipOnPreTax, roundingOption]);

  const calculateTip = () => {
    if (billAmount <= 0) {
      setResult({ tipAmount: 0, totalAmount: 0, perPerson: 0, tipPerPerson: 0 });
      return;
    }
    
    // Determine the base amount for tip calculation
    const baseForTip = tipOnPreTax ? billAmount : billAmount + taxAmount;
    
    // Calculate tip amount
    let tipAmount = customTipAmount !== null 
      ? customTipAmount 
      : baseForTip * (tipPercentage / 100);
    
    // Apply rounding to tip
    tipAmount = applyRounding(tipAmount);
    
    // Calculate totals
    const total = billAmount + taxAmount + tipAmount;
    const perPerson = total / numberOfPeople;
    const tipPerPerson = tipAmount / numberOfPeople;
    
    setResult({
      tipAmount,
      totalAmount: total,
      perPerson,
      tipPerPerson
    });
  };

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBillAmount(isNaN(value) ? 0 : value);
  };

  const handleTaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTaxAmount(isNaN(value) ? 0 : value);
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNumberOfPeople(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleTipSliderChange = (value: number[]) => {
    setTipPercentage(value[0]);
    setCustomTipAmount(null);
    setServiceQuality(null);
    setIndustry(null);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCustomTipAmount(isNaN(value) ? null : value);
  };

  const handleQuickTip = (percent: number) => {
    setTipPercentage(percent);
    setCustomTipAmount(null);
    setServiceQuality(null);
    setIndustry(null);
    setActiveTab("percentage");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Tip Calculator
        </CardTitle>
        <CardDescription>Calculate tips, split bills, and get location-based suggestions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Country Selector */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="country">Tipping Region</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="font-medium">{countryData.name}</p>
                  <p className="text-sm">{countryData.notes}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={country} onValueChange={handleCountryChange}>
            <SelectTrigger id="country">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(COUNTRY_TIPPING_DATA).map(([code, data]) => (
                <SelectItem key={code} value={code}>
                  {data.name} ({data.range[0]}-{data.range[1]}%)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">{countryData.culture}</p>
        </div>

        {/* Bill Amount Inputs */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="billAmount">Bill Amount (Pre-Tax)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="billAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={billAmount || ''}
                onChange={handleBillAmountChange}
                className="pl-9"
                aria-label="Enter bill amount before tax"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="taxAmount">Tax Amount (Optional)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter tax to calculate tip on pre or post-tax amount</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="taxAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={taxAmount || ''}
                onChange={handleTaxAmountChange}
                className="pl-9"
                aria-label="Enter tax amount"
              />
            </div>
          </div>
        </div>

        {/* Tax Toggle - only show if tax is entered */}
        {taxAmount > 0 && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2">
              <Label htmlFor="tipOnPreTax" className="text-sm cursor-pointer">
                Tip on pre-tax amount
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Traditional etiquette suggests tipping on the pre-tax amount, but many tip on the total for convenience.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="tipOnPreTax"
              checked={tipOnPreTax}
              onCheckedChange={setTipOnPreTax}
            />
          </div>
        )}

        {/* Quick Service Quality Selector */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            Rate Service Quality
          </Label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SERVICE_QUALITY).map(([key, value]) => (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={serviceQuality === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleServiceQualityChange(key)}
                      className="flex items-center gap-1"
                    >
                      <span>{value.emoji}</span>
                      <span className="hidden sm:inline">{value.label}</span>
                      <span className="text-xs opacity-75">({value.tip}%)</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{value.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Industry Presets */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Service Type
          </Label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(INDUSTRY_PRESETS).map(([key, value]) => {
              const Icon = value.icon;
              return (
                <Button
                  key={key}
                  variant={industry === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleIndustryChange(key)}
                  className="flex items-center gap-1"
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{value.label}</span>
                  <span className="text-xs opacity-75">({value.defaultTip}%)</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Tip Calculation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="percentage" className="flex items-center gap-1">
              <Percent className="h-3 w-3" />
              Percentage Tip
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-1">
              <Banknote className="h-3 w-3" />
              Custom Amount
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="percentage" className="space-y-4">
            {/* Quick tip buttons */}
            <div className="flex flex-wrap gap-2">
              {quickTipPercentages.map((percent) => (
                <Button
                  key={percent}
                  variant={tipPercentage === percent && customTipAmount === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickTip(percent)}
                >
                  {percent}%
                </Button>
              ))}
            </div>
            
            {/* Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Tip Percentage</Label>
                <Badge variant="secondary" className="text-lg px-3">
                  {tipPercentage}%
                </Badge>
              </div>
              <Slider 
                value={[tipPercentage]}
                min={0}
                max={35} 
                step={1} 
                onValueChange={handleTipSliderChange}
                className="py-2"
                aria-label="Adjust tip percentage"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>No tip</span>
                <span>15%</span>
                <span>Standard</span>
                <span>25%</span>
                <span>Generous</span>
                <span>35%</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customTip">Enter Custom Tip Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="customTip"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={customTipAmount ?? ''}
                  onChange={handleCustomTipChange}
                  className="pl-9"
                  aria-label="Enter custom tip amount in dollars"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Rounding Options */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Banknote className="h-4 w-4 text-muted-foreground" />
            Rounding (for cash payments)
          </Label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={roundingOption === "none" ? "default" : "outline"}
              size="sm"
              onClick={() => setRoundingOption("none")}
            >
              No Rounding
            </Button>
            <Button
              variant={roundingOption === "up" ? "default" : "outline"}
              size="sm"
              onClick={() => setRoundingOption("up")}
            >
              Round Up
            </Button>
            <Button
              variant={roundingOption === "nearest" ? "default" : "outline"}
              size="sm"
              onClick={() => setRoundingOption("nearest")}
            >
              Nearest Dollar
            </Button>
            <Button
              variant={roundingOption === "down" ? "default" : "outline"}
              size="sm"
              onClick={() => setRoundingOption("down")}
            >
              Round Down
            </Button>
          </div>
        </div>

        {/* Number of People */}
        <div className="space-y-2">
          <Label htmlFor="numberOfPeople" className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Split Between
          </Label>
          <Input
            id="numberOfPeople"
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={handleNumberOfPeopleChange}
            aria-label="Number of people to split the bill"
          />
        </div>

        {/* Results */}
        <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-4 space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Your Tip Breakdown
          </h3>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-background/50 rounded-lg p-3">
              <span className="text-sm text-muted-foreground block">Tip Amount</span>
              <span className="text-2xl font-bold text-primary">${result.tipAmount.toFixed(2)}</span>
              {billAmount > 0 && (
                <span className="text-xs text-muted-foreground block">
                  ({((result.tipAmount / billAmount) * 100).toFixed(1)}% of bill)
                </span>
              )}
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <span className="text-sm text-muted-foreground block">Total Bill</span>
              <span className="text-2xl font-bold">${result.totalAmount.toFixed(2)}</span>
              {taxAmount > 0 && (
                <span className="text-xs text-muted-foreground block">
                  (includes ${taxAmount.toFixed(2)} tax)
                </span>
              )}
            </div>
          </div>
          
          {numberOfPeople > 1 && (
            <div className="border-t border-primary/20 pt-3 mt-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-background/50 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground block">Per Person Total</span>
                  <span className="text-xl font-bold text-primary">${result.perPerson.toFixed(2)}</span>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground block">Tip Per Person</span>
                  <span className="text-xl font-bold">${result.tipPerPerson.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Split evenly between {numberOfPeople} people
              </p>
            </div>
          )}
        </div>

        {/* Contextual Tips */}
        <div className="text-xs text-muted-foreground space-y-1 p-3 bg-secondary/30 rounded-lg">
          <p className="font-medium flex items-center gap-1">
            <Info className="h-3 w-3" />
            Quick Tip Guide for {countryData.name}:
          </p>
          <ul className="list-disc list-inside space-y-0.5 ml-4">
            <li>Restaurants: {countryData.range[0]}-{countryData.range[1]}% is standard</li>
            <li>Bars: $1-2 per drink or 15-20% of tab</li>
            <li>Delivery: 15-20% or at least $3-5</li>
            <li>Hair/Salon: 15-25% of service cost</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
