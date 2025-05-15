
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(25000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [result, setResult] = useState<{
    futureValue: number;
    inflationAdjusted: number;
    monthlyIncome: number;
  }>({
    futureValue: 0,
    inflationAdjusted: 0,
    monthlyIncome: 0,
  });

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, inflationRate]);

  const calculateRetirement = () => {
    // Number of years until retirement
    const years = retirementAge - currentAge;
    
    if (years <= 0) {
      setResult({
        futureValue: currentSavings,
        inflationAdjusted: currentSavings,
        monthlyIncome: 0,
      });
      return;
    }

    // Monthly interest rate (annual rate / 12)
    const monthlyRate = expectedReturn / 100 / 12;
    
    // Future value formula: P(1+r)^n + PMT * (((1+r)^n - 1) / r)
    // Where P = principal, r = monthly interest rate, n = total months, PMT = monthly contribution
    const totalMonths = years * 12;
    const growthFactor = Math.pow(1 + monthlyRate, totalMonths);
    
    // Future value of current savings
    const futureValueSavings = currentSavings * growthFactor;
    
    // Future value of monthly contributions
    const futureValueContributions = monthlyContribution * ((growthFactor - 1) / monthlyRate);
    
    // Total future value
    const futureValue = futureValueSavings + futureValueContributions;
    
    // Adjust for inflation
    const inflationFactor = Math.pow(1 + inflationRate / 100, years);
    const inflationAdjusted = futureValue / inflationFactor;
    
    // Calculate monthly income (using 4% rule - a common retirement withdrawal rate)
    const annualIncome = inflationAdjusted * 0.04;
    const monthlyIncome = annualIncome / 12;
    
    setResult({
      futureValue: Math.round(futureValue),
      inflationAdjusted: Math.round(inflationAdjusted),
      monthlyIncome: Math.round(monthlyIncome),
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20">
        <CardTitle className="text-xl">Retirement Calculator</CardTitle>
        <CardDescription>Plan your retirement savings and estimate your future income</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="currentAge">Current Age</Label>
              <span className="text-sm font-medium">{currentAge} years</span>
            </div>
            <Slider
              id="currentAge"
              min={18}
              max={100}
              step={1}
              value={[currentAge]}
              onValueChange={(value) => setCurrentAge(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="retirementAge">Retirement Age</Label>
              <span className="text-sm font-medium">{retirementAge} years</span>
            </div>
            <Slider
              id="retirementAge"
              min={Math.max(currentAge + 1, 50)}
              max={100}
              step={1}
              value={[retirementAge]}
              onValueChange={(value) => setRetirementAge(value[0])}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentSavings">Current Savings</Label>
              <Input
                id="currentSavings"
                type="number"
                min="0"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
              <Input
                id="monthlyContribution"
                type="number"
                min="0"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="expectedReturn">Expected Annual Return</Label>
                <span className="text-sm font-medium">{expectedReturn}%</span>
              </div>
              <Slider
                id="expectedReturn"
                min={1}
                max={12}
                step={0.1}
                value={[expectedReturn]}
                onValueChange={(value) => setExpectedReturn(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="inflationRate">Inflation Rate</Label>
                <span className="text-sm font-medium">{inflationRate}%</span>
              </div>
              <Slider
                id="inflationRate"
                min={0}
                max={8}
                step={0.1}
                value={[inflationRate]}
                onValueChange={(value) => setInflationRate(value[0])}
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <h3 className="text-center font-medium mb-4">Retirement Projection</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Future Value:</span>
                <span className="font-semibold">{formatCurrency(result.futureValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Inflation Adjusted Value:</span>
                <span className="font-semibold">{formatCurrency(result.inflationAdjusted)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Monthly Income:</span>
                <span className="font-semibold">{formatCurrency(result.monthlyIncome)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
