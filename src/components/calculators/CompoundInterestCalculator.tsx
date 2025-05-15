
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(1000);
  const [additionalContribution, setAdditionalContribution] = useState<number>(100);
  const [contributionFrequency, setContributionFrequency] = useState<string>("monthly");
  const [interestRate, setInterestRate] = useState<number>(5);
  const [compoundFrequency, setCompoundFrequency] = useState<string>("annually");
  const [timeYears, setTimeYears] = useState<number>(10);
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalDeposits, setTotalDeposits] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  const contributionFrequencies: Record<string, number> = {
    "monthly": 12,
    "quarterly": 4,
    "semi-annually": 2,
    "annually": 1
  };
  
  const compoundFrequencies: Record<string, number> = {
    "daily": 365,
    "monthly": 12,
    "quarterly": 4,
    "semi-annually": 2,
    "annually": 1
  };
  
  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, additionalContribution, contributionFrequency, interestRate, compoundFrequency, timeYears]);
  
  const calculateCompoundInterest = () => {
    const P = principal;
    const PMT = additionalContribution;
    const r = interestRate / 100;
    const t = timeYears;
    const n = compoundFrequencies[compoundFrequency];
    const PMTFreq = contributionFrequencies[contributionFrequency];
    
    // Calculate future value with compound interest
    let futureVal = P * Math.pow(1 + r / n, n * t);
    
    // Calculate future value with regular contributions
    if (PMT > 0) {
      // Calculate the future value of a series of contributions
      // For simplicity, we assume contributions are made at the same frequency as compounding
      // In reality, this could be more complex with different contribution and compounding frequencies
      const contribPerPeriod = PMT * (n / PMTFreq);
      const nPeriods = n * t;
      
      // Use the formula for future value of a series of regular payments
      const growthFactor = Math.pow(1 + r / n, nPeriods);
      const seriesValue = contribPerPeriod * ((growthFactor - 1) / (r / n));
      
      futureVal += seriesValue;
    }
    
    // Calculate total deposits
    const totalDepositsValue = P + (additionalContribution * PMTFreq * t);
    
    // Calculate total interest earned
    const interestEarned = futureVal - totalDepositsValue;
    
    setFutureValue(Math.round(futureVal));
    setTotalDeposits(Math.round(totalDepositsValue));
    setTotalInterest(Math.round(interestEarned));
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
        <CardTitle className="text-xl">Compound Interest Calculator</CardTitle>
        <CardDescription>See how your investments grow over time with the power of compound interest</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="inputs" className="space-y-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="inputs">Investment Details</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inputs" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Initial Investment</Label>
              <Input
                id="principal"
                type="number"
                min="0"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalContribution">Additional Contributions</Label>
              <Input
                id="additionalContribution"
                type="number"
                min="0"
                value={additionalContribution}
                onChange={(e) => setAdditionalContribution(Number(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contributionFrequency">Contribution Frequency</Label>
              <Select 
                value={contributionFrequency} 
                onValueChange={setContributionFrequency}
              >
                <SelectTrigger id="contributionFrequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="interestRate">Annual Interest Rate</Label>
                <span className="text-sm font-medium">{interestRate}%</span>
              </div>
              <Slider
                id="interestRate"
                min={0.1}
                max={15}
                step={0.1}
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
              />
            </div>
            
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
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="timeYears">Time Period (years)</Label>
                <span className="text-sm font-medium">{timeYears} years</span>
              </div>
              <Slider
                id="timeYears"
                min={1}
                max={50}
                step={1}
                value={[timeYears]}
                onValueChange={(value) => setTimeYears(value[0])}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <h3 className="text-center text-sm font-medium text-muted-foreground mb-4">Investment Summary</h3>
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
              
              <div className="text-center text-sm text-muted-foreground">
                <p>These calculations are estimates and do not account for taxes or inflation.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
