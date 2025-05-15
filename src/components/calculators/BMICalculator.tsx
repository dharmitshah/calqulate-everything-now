
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const BMICalculator = () => {
  const [height, setHeight] = useState<{ cm: string; feet: string; inches: string }>({
    cm: "",
    feet: "",
    inches: ""
  });
  const [weight, setWeight] = useState<{ kg: string; lbs: string }>({
    kg: "",
    lbs: ""
  });
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("metric");
  
  const calculateBMI = () => {
    let heightInMeters: number;
    let weightInKg: number;
    
    if (activeTab === "metric") {
      heightInMeters = parseFloat(height.cm) / 100;
      weightInKg = parseFloat(weight.kg);
    } else {
      // Convert feet and inches to meters
      const heightInInches = (parseFloat(height.feet) * 12) + parseFloat(height.inches);
      heightInMeters = heightInInches * 0.0254;
      
      // Convert lbs to kg
      weightInKg = parseFloat(weight.lbs) * 0.453592;
    }
    
    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
      return;
    }
    
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBMI(calculatedBMI);
    
    // Determine BMI category
    if (calculatedBMI < 18.5) {
      setCategory("Underweight");
    } else if (calculatedBMI < 24.9) {
      setCategory("Normal weight");
    } else if (calculatedBMI < 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obesity");
    }
  };
  
  const getCategoryColor = () => {
    if (!category) return "";
    
    switch (category) {
      case "Underweight":
        return "text-blue-500";
      case "Normal weight":
        return "text-green-500";
      case "Overweight":
        return "text-orange-500";
      case "Obesity":
        return "text-red-500";
      default:
        return "";
    }
  };
  
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20">
        <CardTitle className="text-xl">BMI Calculator</CardTitle>
        <CardDescription>Calculate your Body Mass Index</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="metric" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="metric">Metric</TabsTrigger>
            <TabsTrigger value="imperial">Imperial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metric" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="height-cm">Height (cm)</Label>
              <Input
                id="height-cm"
                type="number"
                placeholder="e.g. 175"
                value={height.cm}
                onChange={(e) => setHeight({ ...height, cm: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight-kg">Weight (kg)</Label>
              <Input
                id="weight-kg"
                type="number"
                placeholder="e.g. 70"
                value={weight.kg}
                onChange={(e) => setWeight({ ...weight, kg: e.target.value })}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="imperial" className="space-y-4">
            <div className="space-y-2">
              <Label>Height</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Feet"
                    value={height.feet}
                    onChange={(e) => setHeight({ ...height, feet: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Inches"
                    value={height.inches}
                    onChange={(e) => setHeight({ ...height, inches: e.target.value })}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight-lbs">Weight (lbs)</Label>
              <Input
                id="weight-lbs"
                type="number"
                placeholder="e.g. 154"
                value={weight.lbs}
                onChange={(e) => setWeight({ ...weight, lbs: e.target.value })}
              />
            </div>
          </TabsContent>
          
          <Button className="w-full mt-6" onClick={calculateBMI}>
            Calculate BMI
          </Button>
        </Tabs>
        
        {bmi !== null && (
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Your BMI is</p>
              <p className="text-3xl font-bold">{bmi.toFixed(1)}</p>
              <p className={cn("font-medium mt-1", getCategoryColor())}>
                {category}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
