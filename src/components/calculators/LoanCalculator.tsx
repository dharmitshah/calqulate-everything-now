
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortization: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [loanType, setLoanType] = useState<string>("personal");
  const [result, setResult] = useState<LoanResult | null>(null);
  
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);
  
  const calculateLoan = () => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      return;
    }
    
    // Convert annual interest rate to monthly
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate monthly payment using amortization formula
    const monthlyPayment = 
      (loanAmount * monthlyRate) / 
      (1 - Math.pow(1 + monthlyRate, -loanTerm));
    
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    
    // Generate amortization schedule
    const amortization = [];
    let remainingBalance = loanAmount;
    
    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      amortization.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });
    }
    
    setResult({ 
      monthlyPayment, 
      totalPayment, 
      totalInterest,
      amortization 
    });
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const getLoanTypeDefaults = (type: string) => {
    switch (type) {
      case "car":
        setLoanAmount(25000);
        setInterestRate(4.5);
        setLoanTerm(60);
        break;
      case "home":
        setLoanAmount(300000);
        setInterestRate(3.5);
        setLoanTerm(360);
        break;
      case "student":
        setLoanAmount(30000);
        setInterestRate(4.0);
        setLoanTerm(120);
        break;
      default: // personal
        setLoanAmount(10000);
        setInterestRate(5.0);
        setLoanTerm(36);
        break;
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20">
        <CardTitle className="text-xl">Loan Calculator</CardTitle>
        <CardDescription>
          Calculate monthly payments, total interest, and amortization schedule
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs 
          defaultValue="personal" 
          value={loanType} 
          onValueChange={(value) => {
            setLoanType(value);
            getLoanTypeDefaults(value);
          }}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="car">Car</TabsTrigger>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
          </TabsList>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="loan-amount">Loan Amount</Label>
                <div className="text-sm font-medium">{formatCurrency(loanAmount)}</div>
              </div>
              <div className="flex gap-2">
                <Input
                  id="loan-amount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                  className="flex-1"
                />
                <Slider
                  value={[loanAmount]}
                  min={1000}
                  max={loanType === "home" ? 1000000 : 100000}
                  step={1000}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  className="flex-[2]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                <div className="text-sm font-medium">{interestRate}%</div>
              </div>
              <div className="flex gap-2">
                <Input
                  id="interest-rate"
                  type="number"
                  min={0.1}
                  max={30}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  className="flex-1"
                />
                <Slider
                  value={[interestRate]}
                  min={0.1}
                  max={30}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                  className="flex-[2]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="loan-term">Loan Term (months)</Label>
                <div className="text-sm font-medium">{loanTerm} months ({Math.floor(loanTerm/12)} years {loanTerm%12} months)</div>
              </div>
              <div className="flex gap-2">
                <Input
                  id="loan-term"
                  type="number"
                  min={1}
                  max={loanType === "home" ? 360 : 120}
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value) || 0)}
                  className="flex-1"
                />
                <Slider
                  value={[loanTerm]}
                  min={6}
                  max={loanType === "home" ? 360 : 120}
                  step={loanType === "home" ? 12 : 6}
                  onValueChange={(value) => setLoanTerm(value[0])}
                  className="flex-[2]"
                />
              </div>
            </div>
            
            <Button className="w-full" onClick={calculateLoan}>
              Calculate
            </Button>
          </div>
        </Tabs>
        
        {result && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Monthly Payment</div>
                <div className="text-xl font-bold mt-1">
                  {formatCurrency(result.monthlyPayment)}
                </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Total Payment</div>
                <div className="text-xl font-bold mt-1">
                  {formatCurrency(result.totalPayment)}
                </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Total Interest</div>
                <div className="text-xl font-bold mt-1">
                  {formatCurrency(result.totalInterest)}
                </div>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <h3 className="text-sm font-medium mb-4">Amortization Chart</h3>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={result.amortization.filter((_, i) => i % Math.ceil(loanTerm / 24) === 0)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    label={{ value: 'Month', position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]} 
                    labelFormatter={(label) => `Month ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#3b82f6" 
                    fill="#93c5fd" 
                    name="Remaining Balance"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
