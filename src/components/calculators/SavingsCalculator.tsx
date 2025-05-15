
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(5);
  const [compoundFrequency, setCompoundFrequency] = useState<string>("monthly");
  const [timeYears, setTimeYears] = useState<number>(10);
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalDeposits, setTotalDeposits] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  const compoundFrequencies: Record<string, number> = {
    annually: 1,
    semiannually: 2,
    quarterly: 4,
    monthly: 12,
    daily: 365
  };
  
  useEffect(() => {
    calculateSavings();
  }, [initialDeposit, monthlyContribution, annualInterestRate, compoundFrequency, timeYears]);
  
  const calculateSavings = () => {
    const periodsPerYear = compoundFrequencies[compoundFrequency];
    const totalCompoundPeriods = timeYears * periodsPerYear;
    const periodicRate = annualInterestRate / 100 / periodsPerYear;
    const contributionsPerPeriod = monthlyContribution * (12 / periodsPerYear);
    
    // Calculate future value of initial deposit: P * (1 + r)^(n*t)
    const initialDepositValue = initialDeposit * Math.pow(1 + periodicRate, totalCompoundPeriods);
    
    // Calculate future value of periodic contributions: PMT * (((1 + r)^(n*t) - 1) / r)
    let contributionsValue = 0;
    if (periodicRate > 0) {
      contributionsValue = contributionsPerPeriod * 
        ((Math.pow(1 + periodicRate, totalCompoundPeriods) - 1) / periodicRate);
    } else {
      contributionsValue = contributionsPerPeriod * totalCompoundPeriods;
    }
    
    const finalValue = initialDepositValue + contributionsValue;
    const totalDepositsValue = initialDeposit + (monthlyContribution * 12 * timeYears);
    const interestValue = finalValue - totalDepositsValue;
    
    setFutureValue(Math.round(finalValue));
    setTotalDeposits(Math.round(totalDepositsValue));
    setTotalInterest(Math.round(interestValue));
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
        <CardTitle className="text-xl">Savings Calculator</CardTitle>
        <CardDescription>Estimate your future savings with compound interest</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="inputs" className="space-y-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="inputs">Savings Details</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inputs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initialDeposit">Initial Deposit</Label>
                <Input
                  id="initialDeposit"
                  type="number"
                  min="0"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Number(e.target.value) || 0)}
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
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="annualInterestRate">Annual Interest Rate</Label>
                <span className="text-sm font-medium">{annualInterestRate}%</span>
              </div>
              <Slider
                id="annualInterestRate"
                min={0}
                max={15}
                step={0.1}
                value={[annualInterestRate]}
                onValueChange={(value) => setAnnualInterestRate(value[0])}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="compoundFrequency">Compound Frequency</Label>
                <Select 
                  value={compoundFrequency} 
                  onValueChange={setCompoundFrequency}
                >
                  <SelectTrigger id="compoundFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annually">Annually</SelectItem>
                    <SelectItem value="semiannually">Semi-annually</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeYears">Time Period (years)</Label>
                <Input
                  id="timeYears"
                  type="number"
                  min="1"
                  max="50"
                  value={timeYears}
                  onChange={(e) => setTimeYears(Number(e.target.value) || 1)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <h3 className="text-center text-sm font-medium text-muted-foreground mb-4">Savings Summary</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Future Value:</span>
                    <span className="font-bold text-xl text-primary">{formatCurrency(futureValue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Deposits:</span>
                    <span className="font-medium">{formatCurrency(totalDeposits)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Interest Earned:</span>
                    <span className="font-medium">{formatCurrency(totalInterest)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>These calculations are estimates and do not account for taxes, fees, or inflation.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
