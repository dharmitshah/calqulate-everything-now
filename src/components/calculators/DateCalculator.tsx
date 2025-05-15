
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { differenceInDays, differenceInMonths, differenceInYears, format, add, isValid } from "date-fns";

export const DateCalculator = () => {
  // Date Difference Tab
  const [startDate, setStartDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState<string>(format(add(new Date(), { days: 7 }), "yyyy-MM-dd"));
  const [diffResult, setDiffResult] = useState<{ years: number; months: number; days: number } | null>(null);
  
  // Add/Subtract Time Tab
  const [baseDate, setBaseDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [timeValue, setTimeValue] = useState<string>("7");
  const [timeUnit, setTimeUnit] = useState<string>("days");
  const [operation, setOperation] = useState<string>("add");
  const [timeResult, setTimeResult] = useState<Date | null>(null);

  // Calculate the difference between two dates
  const calculateDateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isValid(start) && isValid(end)) {
      const years = differenceInYears(end, start);
      
      // Adjust start date by years to calculate remaining months
      const afterYears = add(start, { years });
      const months = differenceInMonths(end, afterYears);
      
      // Adjust again by months to calculate remaining days
      const afterMonths = add(afterYears, { months });
      const days = differenceInDays(end, afterMonths);
      
      setDiffResult({ years, months, days });
    } else {
      setDiffResult(null);
    }
  };
  
  // Add or subtract time from a date
  const calculateDateAddSubtract = () => {
    const base = new Date(baseDate);
    const value = parseInt(timeValue);
    
    if (isValid(base) && !isNaN(value)) {
      const timeValueObj: { [key: string]: number } = {};
      timeValueObj[timeUnit] = operation === "add" ? value : -value;
      
      const result = add(base, timeValueObj);
      setTimeResult(result);
    } else {
      setTimeResult(null);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10">
        <CardTitle className="text-xl">Date Calculator</CardTitle>
        <CardDescription>Calculate the difference between dates or add/subtract time</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="difference" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="difference">Date Difference</TabsTrigger>
            <TabsTrigger value="addSubtract">Add/Subtract Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="difference" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <Button className="w-full" onClick={calculateDateDifference}>
              Calculate Difference
            </Button>
            
            {diffResult && (
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-3">Time Between Dates</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                      <div className="text-2xl font-bold">{diffResult.years}</div>
                      <div className="text-xs text-muted-foreground">Years</div>
                    </div>
                    <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                      <div className="text-2xl font-bold">{diffResult.months}</div>
                      <div className="text-xs text-muted-foreground">Months</div>
                    </div>
                    <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                      <div className="text-2xl font-bold">{diffResult.days}</div>
                      <div className="text-xs text-muted-foreground">Days</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-3">
                    From {format(new Date(startDate), "MMM d, yyyy")} to {format(new Date(endDate), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="addSubtract" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseDate">Start Date</Label>
              <Input
                id="baseDate"
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="space-y-2 w-1/3">
                <Label htmlFor="operation">Operation</Label>
                <Select value={operation} onValueChange={setOperation}>
                  <SelectTrigger id="operation">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">Add</SelectItem>
                    <SelectItem value="subtract">Subtract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 w-1/3">
                <Label htmlFor="timeValue">Value</Label>
                <Input
                  id="timeValue"
                  type="number"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  min="0"
                />
              </div>
              
              <div className="space-y-2 w-1/3">
                <Label htmlFor="timeUnit">Unit</Label>
                <Select value={timeUnit} onValueChange={setTimeUnit}>
                  <SelectTrigger id="timeUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="w-full" onClick={calculateDateAddSubtract}>
              Calculate New Date
            </Button>
            
            {timeResult && (
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-3">Result</div>
                  <div className="text-2xl font-bold">
                    {format(timeResult, "MMM d, yyyy")}
                  </div>
                  <div className="text-sm text-muted-foreground mt-3">
                    {operation === "add" ? "Adding" : "Subtracting"} {timeValue} {timeUnit} to {format(new Date(baseDate), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
