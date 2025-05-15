
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(60000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  // Update downPaymentAmount when homePrice or downPaymentPercent changes
  useEffect(() => {
    const newDownPaymentAmount = Math.round(homePrice * (downPaymentPercent / 100));
    setDownPaymentAmount(newDownPaymentAmount);
  }, [homePrice, downPaymentPercent]);
  
  // Update downPaymentPercent when homePrice or downPaymentAmount changes
  useEffect(() => {
    if (homePrice > 0) {
      const newDownPaymentPercent = (downPaymentAmount / homePrice) * 100;
      setDownPaymentPercent(parseFloat(newDownPaymentPercent.toFixed(1)));
    }
  }, [homePrice, downPaymentAmount]);
  
  // Calculate mortgage payments
  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPaymentAmount, loanTerm, interestRate]);
  
  const calculateMortgage = () => {
    const loanAmount = homePrice - downPaymentAmount;
    
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }
    
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Total number of payments
    const totalPayments = loanTerm * 12;
    
    // Monthly payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    // where P = principal, r = monthly rate, n = total payments
    const monthlyPaymentValue = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalPaymentValue = monthlyPaymentValue * totalPayments;
    const totalInterestValue = totalPaymentValue - loanAmount;
    
    setMonthlyPayment(Math.round(monthlyPaymentValue));
    setTotalPayment(Math.round(totalPaymentValue));
    setTotalInterest(Math.round(totalInterestValue));
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
        <CardTitle className="text-xl">Mortgage Calculator</CardTitle>
        <CardDescription>Estimate your monthly mortgage payments</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="amount" className="space-y-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="amount">Loan Details</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="amount" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="homePrice">Home Price</Label>
              <Input
                id="homePrice"
                type="number"
                min="0"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="downPaymentPercent">Down Payment</Label>
                <span className="text-sm font-medium">{downPaymentPercent}%</span>
              </div>
              <Slider
                id="downPaymentPercent"
                min={0}
                max={50}
                step={0.5}
                value={[downPaymentPercent]}
                onValueChange={(value) => setDownPaymentPercent(value[0])}
              />
              <Input
                type="number"
                min="0"
                max={homePrice}
                value={downPaymentAmount}
                onChange={(e) => setDownPaymentAmount(Number(e.target.value) || 0)}
                className="mt-2"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Select value={loanTerm} onValueChange={(value) => setLoanTerm(Number(value))}>
                  <SelectTrigger id="loanTerm">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="interestRate">Interest Rate</Label>
                  <span className="text-sm font-medium">{interestRate}%</span>
                </div>
                <Slider
                  id="interestRate"
                  min={0.5}
                  max={10}
                  step={0.1}
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <h3 className="text-center text-sm font-medium text-muted-foreground mb-4">Payment Summary</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Loan Amount:</span>
                    <span className="font-medium">{formatCurrency(homePrice - downPaymentAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Monthly Payment:</span>
                    <span className="font-bold text-xl text-primary">{formatCurrency(monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Payment:</span>
                    <span className="font-medium">{formatCurrency(totalPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Interest:</span>
                    <span className="font-medium">{formatCurrency(totalInterest)}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>These calculations are estimates and do not include property taxes, insurance, or other costs.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// I realized we need to import Select and its related components, so let's add them
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
