
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInYears, differenceInMonths, differenceInDays } from "date-fns";

export const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    
    if (isNaN(birthDateObj.getTime()) || birthDateObj > today) {
      return;
    }
    
    const years = differenceInYears(today, birthDateObj);
    const months = differenceInMonths(today, birthDateObj) % 12;
    
    // For days calculation, we need to adjust to get the correct remaining days
    const dateWithYearsMonthsSubtracted = new Date(birthDateObj);
    dateWithYearsMonthsSubtracted.setFullYear(birthDateObj.getFullYear() + years);
    dateWithYearsMonthsSubtracted.setMonth(birthDateObj.getMonth() + months);
    
    // Ensure we don't go past current month end
    if (dateWithYearsMonthsSubtracted > today) {
      dateWithYearsMonthsSubtracted.setMonth(dateWithYearsMonthsSubtracted.getMonth() - 1);
    }
    
    const days = differenceInDays(today, dateWithYearsMonthsSubtracted);
    
    setAge({ years, months, days });
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20">
        <CardTitle className="text-xl">Age Calculator</CardTitle>
        <CardDescription>Calculate your exact age in years, months, and days</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Date of Birth</Label>
            <Input
              id="birthdate"
              type="date"
              max={new Date().toISOString().split('T')[0]}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          
          <Button className="w-full" onClick={calculateAge}>
            Calculate Age
          </Button>
          
          {age && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 className="text-center text-sm font-medium text-muted-foreground mb-3">Your age is</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <div className="text-2xl font-bold">{age.years}</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <div className="text-2xl font-bold">{age.months}</div>
                  <div className="text-xs text-muted-foreground">Months</div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <div className="text-2xl font-bold">{age.days}</div>
                  <div className="text-xs text-muted-foreground">Days</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
