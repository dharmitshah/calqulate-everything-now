
import React, { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";

export const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [customTipAmount, setCustomTipAmount] = useState<number | null>(null);
  const [result, setResult] = useState({ tipAmount: 0, totalAmount: 0, perPerson: 0 });
  const { toast } = useToast();

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBillAmount(isNaN(value) ? 0 : value);
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNumberOfPeople(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleTipSliderChange = (value: number[]) => {
    setTipPercentage(value[0]);
    setCustomTipAmount(null);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCustomTipAmount(isNaN(value) ? null : value);
  };

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople, customTipAmount]);

  const calculateTip = () => {
    if (billAmount <= 0) {
      setResult({ tipAmount: 0, totalAmount: 0, perPerson: 0 });
      return;
    }
    
    const effectiveTipAmount = customTipAmount !== null ? customTipAmount : billAmount * (tipPercentage / 100);
    const total = billAmount + effectiveTipAmount;
    const perPerson = total / numberOfPeople;
    
    setResult({
      tipAmount: effectiveTipAmount,
      totalAmount: total,
      perPerson: perPerson
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Tip Calculator</CardTitle>
        <CardDescription>Calculate tips and split bills easily</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="billAmount">Bill Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="billAmount"
              type="number"
              min="0"
              step="0.01"
              value={billAmount || ''}
              onChange={handleBillAmountChange}
              className="pl-7"
            />
          </div>
        </div>

        <Tabs defaultValue="percentage" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="percentage">Percentage Tip</TabsTrigger>
            <TabsTrigger value="custom">Custom Tip</TabsTrigger>
          </TabsList>
          <TabsContent value="percentage" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Tip Percentage</Label>
                <span className="font-medium">{tipPercentage}%</span>
              </div>
              <Slider 
                defaultValue={[15]} 
                max={30} 
                step={1} 
                onValueChange={handleTipSliderChange}
                value={[tipPercentage]}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span>15%</span>
                <span>30%</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customTip">Custom Tip Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  id="customTip"
                  type="number"
                  min="0"
                  step="0.01"
                  value={customTipAmount ?? ''}
                  onChange={handleCustomTipChange}
                  className="pl-7"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <Label htmlFor="numberOfPeople">Number of People</Label>
          <Input
            id="numberOfPeople"
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={handleNumberOfPeopleChange}
          />
        </div>

        <div className="rounded-lg bg-secondary p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tip Amount:</span>
            <span className="font-semibold">${result.tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Bill:</span>
            <span className="font-semibold">${result.totalAmount.toFixed(2)}</span>
          </div>
          {numberOfPeople > 1 && (
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-muted-foreground">Amount Per Person:</span>
              <span className="font-semibold">${result.perPerson.toFixed(2)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
