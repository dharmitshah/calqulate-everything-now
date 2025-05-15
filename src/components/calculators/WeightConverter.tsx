
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const WeightConverter = () => {
  const [inputValue, setInputValue] = useState<string>("0");
  const [inputUnit, setInputUnit] = useState<string>("kg");
  const [outputUnit, setOutputUnit] = useState<string>("lb");
  const [result, setResult] = useState<string>("0");

  const conversionFactors = {
    kg: {
      kg: 1,
      lb: 2.20462,
      oz: 35.274,
      g: 1000,
      st: 0.157473,
    },
    lb: {
      kg: 0.453592,
      lb: 1,
      oz: 16,
      g: 453.592,
      st: 0.0714286,
    },
    oz: {
      kg: 0.0283495,
      lb: 0.0625,
      oz: 1,
      g: 28.3495,
      st: 0.00446429,
    },
    g: {
      kg: 0.001,
      lb: 0.00220462,
      oz: 0.035274,
      g: 1,
      st: 0.000157473,
    },
    st: {
      kg: 6.35029,
      lb: 14,
      oz: 224,
      g: 6350.29,
      st: 1,
    },
  };

  const unitLabels = {
    kg: "Kilograms (kg)",
    lb: "Pounds (lb)",
    oz: "Ounces (oz)",
    g: "Grams (g)",
    st: "Stone (st)",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(value);
    convert(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (value: string) => {
    setInputUnit(value);
    convert(inputValue, value, outputUnit);
  };

  const handleOutputUnitChange = (value: string) => {
    setOutputUnit(value);
    convert(inputValue, inputUnit, value);
  };

  const convert = (value: string, fromUnit: string, toUnit: string) => {
    if (value === "" || isNaN(Number(value))) {
      setResult("0");
      return;
    }

    const inputNumber = parseFloat(value);
    const factor = conversionFactors[fromUnit as keyof typeof conversionFactors][toUnit as keyof typeof conversionFactors[keyof typeof conversionFactors]];
    const calculatedResult = inputNumber * factor;
    
    // Format the result to 4 decimal places, remove trailing zeros
    const formattedResult = calculatedResult.toFixed(4).replace(/\.?0+$/, "") || "0";
    setResult(formattedResult);
  };

  const swapUnits = () => {
    setInputUnit(outputUnit);
    setOutputUnit(inputUnit);
    convert(inputValue, outputUnit, inputUnit);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20">
        <CardTitle className="text-xl">Weight Converter</CardTitle>
        <CardDescription>Convert between different weight units</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <Label htmlFor="inputValue">From</Label>
          <div className="flex space-x-2">
            <Input
              id="inputValue"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1"
            />
            <Select value={inputUnit} onValueChange={handleInputUnitChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-center my-2">
          <Button 
            variant="outline" 
            onClick={swapUnits}
            className="rounded-full h-10 w-10 p-0"
          >
            ⇅
          </Button>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="result">To</Label>
          <div className="flex space-x-2">
            <Input
              id="result"
              type="text"
              value={result}
              readOnly
              className="flex-1 bg-muted"
            />
            <Select value={outputUnit} onValueChange={handleOutputUnitChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
