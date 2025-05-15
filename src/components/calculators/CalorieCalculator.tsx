
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Utensils, Calculator } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  age: z.number().min(15).max(80),
  gender: z.enum(["male", "female"]),
  height: z.number().min(140).max(220),
  weight: z.number().min(40).max(200),
  activity: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
  goal: z.enum(["maintain", "lose", "gain"]),
  unit: z.enum(["metric", "imperial"])
});

type FormValues = z.infer<typeof formSchema>;

const activityLabels = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Lightly active (light exercise 1-3 days/week)",
  moderate: "Moderately active (moderate exercise 3-5 days/week)",
  active: "Active (hard exercise 6-7 days/week)",
  very_active: "Very active (hard exercise & physical job or 2x training)"
};

const goalLabels = {
  maintain: "Maintain weight",
  lose: "Lose weight",
  gain: "Gain weight"
};

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9
};

const goalMultipliers = {
  maintain: 1,
  lose: 0.8,
  gain: 1.15
};

export const CalorieCalculator = () => {
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    targetCalories: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      gender: "male",
      unit: "metric",
      height: 175,
      weight: 70,
      activity: "moderate",
      goal: "maintain"
    }
  });

  const unit = form.watch("unit");

  // Function to convert imperial to metric
  const convertToMetric = (values: FormValues) => {
    const { unit, height, weight, ...rest } = values;
    
    if (unit === "imperial") {
      // Convert height from inches to cm
      const heightInCm = height * 2.54;
      
      // Convert weight from pounds to kg
      const weightInKg = weight * 0.453592;
      
      return {
        ...rest,
        unit: "metric",
        height: heightInCm,
        weight: weightInKg
      };
    }
    
    return values;
  };

  const calculateCalories = (values: FormValues) => {
    // Convert to metric for calculations if needed
    const metricValues = convertToMetric(values);
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    
    if (metricValues.gender === "male") {
      bmr = 10 * metricValues.weight + 6.25 * metricValues.height - 5 * metricValues.age + 5;
    } else {
      bmr = 10 * metricValues.weight + 6.25 * metricValues.height - 5 * metricValues.age - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityMultiplier = activityMultipliers[metricValues.activity];
    const tdee = bmr * activityMultiplier;
    
    // Calculate target calories based on goal
    const goalMultiplier = goalMultipliers[metricValues.goal];
    const targetCalories = tdee * goalMultiplier;
    
    // Calculate macronutrient distribution - using common ratios
    let proteinPercentage, carbPercentage, fatPercentage;
    
    switch (metricValues.goal) {
      case "lose":
        // Higher protein, moderate fat, lower carbs for weight loss
        proteinPercentage = 0.35;
        fatPercentage = 0.30;
        carbPercentage = 0.35;
        break;
      case "gain":
        // Higher carbs, moderate protein, moderate fat for weight gain
        proteinPercentage = 0.25;
        fatPercentage = 0.25;
        carbPercentage = 0.50;
        break;
      case "maintain":
      default:
        // Balanced macros for maintenance
        proteinPercentage = 0.30;
        fatPercentage = 0.30;
        carbPercentage = 0.40;
    }
    
    // Calculate grams of each macronutrient
    // Protein & carbs = 4 calories per gram, fat = 9 calories per gram
    const proteinCals = targetCalories * proteinPercentage;
    const carbCals = targetCalories * carbPercentage;
    const fatCals = targetCalories * fatPercentage;
    
    const macros = {
      protein: Math.round(proteinCals / 4),
      carbs: Math.round(carbCals / 4),
      fat: Math.round(fatCals / 9)
    };
    
    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      macros
    });
  };

  return (
    <Card className="w-full max-w-2xl shadow-xl rounded-2xl overflow-hidden border-0 bg-card">
      <CardHeader className="bg-gradient-to-r from-green-500/20 to-blue-500/20 pb-4 flex flex-row items-center gap-2">
        <Utensils className="size-5 text-green-500" />
        <CardTitle className="text-xl font-bold text-foreground">Calorie Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="mt-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calculateCalories)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Unit System</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="metric" id="metric" />
                              <Label htmlFor="metric">Metric</Label>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <RadioGroupItem value="imperial" id="imperial" />
                              <Label htmlFor="imperial">Imperial</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="30"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height {unit === "metric" ? "(cm)" : "(inch)"}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={unit === "metric" ? "175" : "69"}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight {unit === "metric" ? "(kg)" : "(lbs)"}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={unit === "metric" ? "70" : "154"}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="activity"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Activity Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(activityLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Goal</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-2"
                        >
                          {Object.entries(goalLabels).map(([value, label]) => (
                            <div key={value} className="flex items-center">
                              <RadioGroupItem value={value} id={value} className="peer sr-only" />
                              <Label
                                htmlFor={value}
                                className="flex items-center justify-center rounded-md border-2 border-muted bg-popover px-3 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                {label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Calories
                </Button>
              </form>
            </Form>
            
            {result && (
              <div className="mt-6 p-5 border rounded-xl bg-muted/50 space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Your Results</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg shadow-sm text-center">
                    <div className="text-sm text-muted-foreground">BMR</div>
                    <div className="text-xl font-bold">{result.bmr} kcal</div>
                    <div className="text-xs text-muted-foreground mt-1">Basal Metabolic Rate</div>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg shadow-sm text-center">
                    <div className="text-sm text-muted-foreground">TDEE</div>
                    <div className="text-xl font-bold">{result.tdee} kcal</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Daily Energy Expenditure</div>
                  </div>
                  
                  <div className="bg-primary p-4 rounded-lg shadow-sm text-center">
                    <div className="text-sm text-primary-foreground/80">Daily Target</div>
                    <div className="text-2xl font-bold text-primary-foreground">{result.targetCalories} kcal</div>
                    <div className="text-xs text-primary-foreground/80 mt-1">To meet your goal</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">Recommended Macronutrients</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-md text-center">
                      <div className="text-xl font-bold">{result.macros.protein}g</div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                      <div className="text-xs mt-1">{result.macros.protein * 4} kcal</div>
                    </div>
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-md text-center">
                      <div className="text-xl font-bold">{result.macros.carbs}g</div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                      <div className="text-xs mt-1">{result.macros.carbs * 4} kcal</div>
                    </div>
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-md text-center">
                      <div className="text-xl font-bold">{result.macros.fat}g</div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                      <div className="text-xs mt-1">{result.macros.fat * 9} kcal</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="info" className="mt-0 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Understanding the Calculations</h3>
              <p className="text-muted-foreground">
                This calculator estimates your daily calorie needs based on your personal details and activity level.
              </p>
              
              <div className="mt-4 space-y-3">
                <div className="border-l-4 border-primary pl-3">
                  <h4 className="font-medium">BMR (Basal Metabolic Rate)</h4>
                  <p className="text-sm text-muted-foreground">The number of calories your body needs to maintain basic functions at rest.</p>
                </div>
                <div className="border-l-4 border-primary pl-3">
                  <h4 className="font-medium">TDEE (Total Daily Energy Expenditure)</h4>
                  <p className="text-sm text-muted-foreground">Your BMR plus additional calories burned through daily activities and exercise.</p>
                </div>
                <div className="border-l-4 border-primary pl-3">
                  <h4 className="font-medium">Daily Target Calories</h4>
                  <p className="text-sm text-muted-foreground">Your recommended daily calorie intake to achieve your specific goal.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">About Macronutrients</h3>
              <p className="text-muted-foreground mb-3">
                Macronutrients are the nutrients that provide calories and energy for your body:
              </p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-1 mr-2"></div>
                  <div>
                    <span className="font-medium">Protein (4 calories/g):</span> Essential for building and repairing tissues. Found in meat, fish, dairy, eggs, and plant sources like beans and tofu.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mt-1 mr-2"></div>
                  <div>
                    <span className="font-medium">Carbohydrates (4 calories/g):</span> Your body's primary energy source. Found in grains, fruits, vegetables, and sugars.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-pink-500 mt-1 mr-2"></div>
                  <div>
                    <span className="font-medium">Fat (9 calories/g):</span> Crucial for hormone production and nutrient absorption. Found in oils, butter, nuts, seeds, and fatty foods.
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-muted p-4 rounded-lg text-sm">
              <p><strong>Note:</strong> This calculator provides estimates only and should not replace professional medical or nutritional advice.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
