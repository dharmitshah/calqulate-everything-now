
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PercentageCalculator = () => {
  const [percentValue, setPercentValue] = useState<string>("");
  const [baseValue, setBaseValue] = useState<string>("");
  const [percentOfValue, setPercentOfValue] = useState<string>("");
  const [percentageResult, setPercentageResult] = useState<number | null>(null);
  
  const [increaseValue, setIncreaseValue] = useState<string>("");
  const [increasePercent, setIncreasePercent] = useState<string>("");
  const [increaseResult, setIncreaseResult] = useState<number | null>(null);
  
  const [decreaseValue, setDecreaseValue] = useState<string>("");
  const [decreasePercent, setDecreasePercent] = useState<string>("");
  const [decreaseResult, setDecreaseResult] = useState<number | null>(null);
  
  const [diffOldValue, setDiffOldValue] = useState<string>("");
  const [diffNewValue, setDiffNewValue] = useState<string>("");
  const [diffResult, setDiffResult] = useState<number | null>(null);

  // Calculate X% of Y
  const calculatePercentOf = () => {
    const percent = parseFloat(percentValue);
    const base = parseFloat(baseValue);
    
    if (!isNaN(percent) && !isNaN(base)) {
      const result = (percent / 100) * base;
      setPercentageResult(result);
    } else {
      setPercentageResult(null);
    }
  };
  
  // Calculate X is what % of Y
  const calculatePercentIs = () => {
    const part = parseFloat(percentOfValue);
    const base = parseFloat(baseValue);
    
    if (!isNaN(part) && !isNaN(base) && base !== 0) {
      const result = (part / base) * 100;
      setPercentageResult(result);
    } else {
      setPercentageResult(null);
    }
  };
  
  // Calculate increase by percentage
  const calculateIncrease = () => {
    const value = parseFloat(increaseValue);
    const percent = parseFloat(increasePercent);
    
    if (!isNaN(value) && !isNaN(percent)) {
      const result = value * (1 + percent / 100);
      setIncreaseResult(result);
    } else {
      setIncreaseResult(null);
    }
  };
  
  // Calculate decrease by percentage
  const calculateDecrease = () => {
    const value = parseFloat(decreaseValue);
    const percent = parseFloat(decreasePercent);
    
    if (!isNaN(value) && !isNaN(percent)) {
      const result = value * (1 - percent / 100);
      setDecreaseResult(result);
    } else {
      setDecreaseResult(null);
    }
  };
  
  // Calculate percentage difference
  const calculateDifference = () => {
    const oldValue = parseFloat(diffOldValue);
    const newValue = parseFloat(diffNewValue);
    
    if (!isNaN(oldValue) && !isNaN(newValue) && oldValue !== 0) {
      const result = ((newValue - oldValue) / oldValue) * 100;
      setDiffResult(result);
    } else {
      setDiffResult(null);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10">
        <CardTitle className="text-xl">Percentage Calculator</CardTitle>
        <CardDescription>Calculate percentages, increases, decreases, and differences</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="percentOf" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="percentOf">% of Value</TabsTrigger>
            <TabsTrigger value="increase">Increase</TabsTrigger>
            <TabsTrigger value="decrease">Decrease</TabsTrigger>
            <TabsTrigger value="difference">% Change</TabsTrigger>
          </TabsList>
          
          <TabsContent value="percentOf" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="percentValue">Percentage (%)</Label>
              <Input
                id="percentValue"
                type="number"
                placeholder="e.g. 15"
                value={percentValue}
                onChange={(e) => setPercentValue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="baseValue">Value</Label>
              <Input
                id="baseValue"
                type="number"
                placeholder="e.g. 200"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
              />
            </div>
            
            <Button className="w-full" onClick={calculatePercentOf}>
              Calculate
            </Button>
            
            {percentageResult !== null && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Result</div>
                <div className="text-2xl font-bold">{percentageResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {percentValue}% of {baseValue} = {percentageResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="increase" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="increaseValue">Original Value</Label>
              <Input
                id="increaseValue"
                type="number"
                placeholder="e.g. 100"
                value={increaseValue}
                onChange={(e) => setIncreaseValue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="increasePercent">Increase Percentage (%)</Label>
              <Input
                id="increasePercent"
                type="number"
                placeholder="e.g. 25"
                value={increasePercent}
                onChange={(e) => setIncreasePercent(e.target.value)}
              />
            </div>
            
            <Button className="w-full" onClick={calculateIncrease}>
              Calculate
            </Button>
            
            {increaseResult !== null && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Result</div>
                <div className="text-2xl font-bold">{increaseResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {increaseValue} increased by {increasePercent}% = {increaseResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="decrease" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="decreaseValue">Original Value</Label>
              <Input
                id="decreaseValue"
                type="number"
                placeholder="e.g. 100"
                value={decreaseValue}
                onChange={(e) => setDecreaseValue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="decreasePercent">Decrease Percentage (%)</Label>
              <Input
                id="decreasePercent"
                type="number"
                placeholder="e.g. 25"
                value={decreasePercent}
                onChange={(e) => setDecreasePercent(e.target.value)}
              />
            </div>
            
            <Button className="w-full" onClick={calculateDecrease}>
              Calculate
            </Button>
            
            {decreaseResult !== null && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Result</div>
                <div className="text-2xl font-bold">{decreaseResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {decreaseValue} decreased by {decreasePercent}% = {decreaseResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="difference" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="diffOldValue">Original Value</Label>
              <Input
                id="diffOldValue"
                type="number"
                placeholder="e.g. 80"
                value={diffOldValue}
                onChange={(e) => setDiffOldValue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diffNewValue">New Value</Label>
              <Input
                id="diffNewValue"
                type="number"
                placeholder="e.g. 100"
                value={diffNewValue}
                onChange={(e) => setDiffNewValue(e.target.value)}
              />
            </div>
            
            <Button className="w-full" onClick={calculateDifference}>
              Calculate
            </Button>
            
            {diffResult !== null && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Result</div>
                <div className="text-2xl font-bold">{diffResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Change from {diffOldValue} to {diffNewValue} = {diffResult >= 0 ? "+" : ""}{diffResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
