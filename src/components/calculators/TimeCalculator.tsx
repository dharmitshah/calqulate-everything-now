
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TimeCalculator = () => {
  const [hours1, setHours1] = useState<number>(0);
  const [minutes1, setMinutes1] = useState<number>(0);
  const [seconds1, setSeconds1] = useState<number>(0);
  
  const [hours2, setHours2] = useState<number>(0);
  const [minutes2, setMinutes2] = useState<number>(0);
  const [seconds2, setSeconds2] = useState<number>(0);
  
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [conversionFrom, setConversionFrom] = useState<string>("seconds");
  const [conversionTo, setConversionTo] = useState<string>("minutes");
  const [conversionValue, setConversionValue] = useState<number>(0);
  const [conversionResult, setConversionResult] = useState<number>(0);
  
  const [calculationMode, setCalculationMode] = useState<"calculator" | "converter">("calculator");
  const { toast } = useToast();

  const handleHoursChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (index === 1) {
      setHours1(isNaN(value) ? 0 : value);
    } else {
      setHours2(isNaN(value) ? 0 : value);
    }
  };

  const handleMinutesChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const sanitizedValue = isNaN(value) ? 0 : Math.min(Math.max(value, 0), 59);
    if (index === 1) {
      setMinutes1(sanitizedValue);
    } else {
      setMinutes2(sanitizedValue);
    }
  };

  const handleSecondsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const sanitizedValue = isNaN(value) ? 0 : Math.min(Math.max(value, 0), 59);
    if (index === 1) {
      setSeconds1(sanitizedValue);
    } else {
      setSeconds2(sanitizedValue);
    }
  };

  const handleConversionValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setConversionValue(isNaN(value) ? 0 : value);
  };

  const calculateTime = () => {
    // Convert both times to seconds
    const time1InSeconds = hours1 * 3600 + minutes1 * 60 + seconds1;
    const time2InSeconds = hours2 * 3600 + minutes2 * 60 + seconds2;
    
    let resultInSeconds: number;
    
    if (operation === "add") {
      resultInSeconds = time1InSeconds + time2InSeconds;
    } else {
      resultInSeconds = time1InSeconds - time2InSeconds;
      if (resultInSeconds < 0) {
        toast({
          title: "Negative Result",
          description: "The result is negative. Showing absolute value.",
          variant: "default",  // Changed from "warning" to "default"
        });
        resultInSeconds = Math.abs(resultInSeconds);
      }
    }
    
    // Convert back to hours, minutes, seconds
    const resultHours = Math.floor(resultInSeconds / 3600);
    const remainingSeconds = resultInSeconds % 3600;
    const resultMinutes = Math.floor(remainingSeconds / 60);
    const resultSeconds = remainingSeconds % 60;
    
    return { 
      hours: resultHours, 
      minutes: resultMinutes, 
      seconds: resultSeconds,
      totalSeconds: resultInSeconds
    };
  };

  const convertTime = () => {
    const conversionFactors: Record<string, Record<string, number>> = {
      seconds: {
        minutes: 1/60,
        hours: 1/3600,
        days: 1/86400,
        weeks: 1/604800,
        seconds: 1
      },
      minutes: {
        seconds: 60,
        hours: 1/60,
        days: 1/1440,
        weeks: 1/10080,
        minutes: 1
      },
      hours: {
        seconds: 3600,
        minutes: 60,
        days: 1/24,
        weeks: 1/168,
        hours: 1
      },
      days: {
        seconds: 86400,
        minutes: 1440,
        hours: 24,
        weeks: 1/7,
        days: 1
      },
      weeks: {
        seconds: 604800,
        minutes: 10080,
        hours: 168,
        days: 7,
        weeks: 1
      }
    };

    if (conversionFactors[conversionFrom] && conversionFactors[conversionFrom][conversionTo]) {
      const factor = conversionFactors[conversionFrom][conversionTo];
      setConversionResult(conversionValue * factor);
    } else {
      toast({
        title: "Conversion Error",
        description: "Invalid conversion units selected.",
        variant: "destructive",
      });
      setConversionResult(0);
    }
  };

  const result = calculateTime();

  const formatTimeDisplay = (hours: number, minutes: number, seconds: number): string => {
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Time Calculator</CardTitle>
        <CardDescription>Add, subtract, and convert time units</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={calculationMode} onValueChange={(v) => setCalculationMode(v as "calculator" | "converter")}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="calculator">Time Calculator</TabsTrigger>
            <TabsTrigger value="converter">Time Converter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-6 pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="time1">Time 1</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div className="space-y-1">
                    <Label htmlFor="hours1" className="text-xs">Hours</Label>
                    <Input
                      id="hours1"
                      type="number"
                      min="0"
                      value={hours1}
                      onChange={(e) => handleHoursChange(1, e)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="minutes1" className="text-xs">Minutes</Label>
                    <Input
                      id="minutes1"
                      type="number"
                      min="0"
                      max="59"
                      value={minutes1}
                      onChange={(e) => handleMinutesChange(1, e)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="seconds1" className="text-xs">Seconds</Label>
                    <Input
                      id="seconds1"
                      type="number"
                      min="0"
                      max="59"
                      value={seconds1}
                      onChange={(e) => handleSecondsChange(1, e)}
                    />
                  </div>
                </div>
              </div>
              
              <Select
                value={operation}
                onValueChange={(v) => setOperation(v as "add" | "subtract")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">+ Add</SelectItem>
                  <SelectItem value="subtract">- Subtract</SelectItem>
                </SelectContent>
              </Select>
              
              <div>
                <Label htmlFor="time2">Time 2</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div className="space-y-1">
                    <Label htmlFor="hours2" className="text-xs">Hours</Label>
                    <Input
                      id="hours2"
                      type="number"
                      min="0"
                      value={hours2}
                      onChange={(e) => handleHoursChange(2, e)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="minutes2" className="text-xs">Minutes</Label>
                    <Input
                      id="minutes2"
                      type="number"
                      min="0"
                      max="59"
                      value={minutes2}
                      onChange={(e) => handleMinutesChange(2, e)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="seconds2" className="text-xs">Seconds</Label>
                    <Input
                      id="seconds2"
                      type="number"
                      min="0"
                      max="59"
                      value={seconds2}
                      onChange={(e) => handleSecondsChange(2, e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-secondary p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Result:</span>
                <span className="font-semibold">{formatTimeDisplay(result.hours, result.minutes, result.seconds)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Seconds:</span>
                <span className="font-medium">{result.totalSeconds.toLocaleString()}</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="converter" className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="conversionValue">Value</Label>
                <Input
                  id="conversionValue"
                  type="number"
                  min="0"
                  step="0.01"
                  value={conversionValue || ''}
                  onChange={handleConversionValueChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="conversionFrom">From</Label>
                  <Select
                    value={conversionFrom}
                    onValueChange={setConversionFrom}
                  >
                    <SelectTrigger id="conversionFrom">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seconds">Seconds</SelectItem>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="conversionTo">To</Label>
                  <Select
                    value={conversionTo}
                    onValueChange={setConversionTo}
                  >
                    <SelectTrigger id="conversionTo">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seconds">Seconds</SelectItem>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={convertTime} 
                className="w-full"
              >
                Convert
              </Button>
            </div>
            
            <div className="rounded-lg bg-secondary p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Result:</span>
                <span className="font-semibold text-lg">
                  {conversionResult.toLocaleString(undefined, { 
                    maximumFractionDigits: 6,
                    minimumFractionDigits: 0 
                  })} {conversionTo}
                </span>
              </div>
            </div>
            
            <div className="bg-muted p-3 rounded-md text-sm">
              <p><strong>Common conversions:</strong> 1 hour = 60 minutes = 3,600 seconds</p>
              <p>1 day = 24 hours = 1,440 minutes = 86,400 seconds</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
