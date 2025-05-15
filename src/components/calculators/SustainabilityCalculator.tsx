
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Coffee, Earth, FastFashion, ChartPie } from "lucide-react";

export const SustainabilityCalculator = () => {
  // Streaming habits
  const [streamingHours, setStreamingHours] = useState<number>(2);
  const [streamingQuality, setStreamingQuality] = useState<number>(2); // 1-SD, 2-HD, 3-4K
  
  // Fashion consumption
  const [clothingItems, setClothingItems] = useState<number>(2);
  const [fastFashionPercent, setFastFashionPercent] = useState<number>(50);
  
  // Coffee consumption
  const [coffeeCups, setCoffeeCups] = useState<number>(1);
  const [disposableCups, setDisposableCups] = useState<number>(50);
  
  // Food consumption
  const [meatDays, setMeatDays] = useState<number>(4);
  const [foodWaste, setFoodWaste] = useState<number>(20);
  
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const calculateFootprint = () => {
    // Streaming carbon calculations
    // Based on research estimates: ~0.4-8 kg CO2e per hour depending on quality
    const streamingFactors = [0.4, 1.8, 3.2]; // kg CO2e per hour for SD, HD, 4K
    const streamingCarbonDaily = streamingHours * streamingFactors[streamingQuality - 1];
    const streamingCarbonYearly = streamingCarbonDaily * 365;
    
    // Fashion carbon calculations
    // Fast fashion: ~10kg CO2e per item, sustainable: ~5kg CO2e per item
    const fastFashionCarbon = (clothingItems * fastFashionPercent / 100) * 10;
    const sustainableFashionCarbon = (clothingItems * (100 - fastFashionPercent) / 100) * 5;
    const fashionCarbonMonthly = fastFashionCarbon + sustainableFashionCarbon;
    const fashionCarbonYearly = fashionCarbonMonthly * 12;
    
    // Coffee carbon calculations
    // Disposable cup: ~0.1 kg CO2e per cup, reusable reduces by ~90% after 30 uses
    const disposableCarbonDaily = (coffeeCups * disposableCups / 100) * 0.1;
    const reusableCarbonDaily = (coffeeCups * (100 - disposableCups) / 100) * 0.01;
    const coffeeCarbonDaily = disposableCarbonDaily + reusableCarbonDaily;
    const coffeeCarbonYearly = coffeeCarbonDaily * 365;
    
    // Food carbon calculations
    // Meat-heavy meal: ~5kg CO2e, plant-based: ~1kg CO2e
    const meatCarbonWeekly = meatDays * 5;
    const plantCarbonWeekly = (7 - meatDays) * 1;
    
    // Food waste factor
    const wasteFactor = 1 + (foodWaste / 100);
    const foodCarbonWeekly = (meatCarbonWeekly + plantCarbonWeekly) * wasteFactor;
    const foodCarbonYearly = foodCarbonWeekly * 52;
    
    // Total carbon footprint
    const totalCarbonYearly = streamingCarbonYearly + fashionCarbonYearly + coffeeCarbonYearly + foodCarbonYearly;
    
    // Calculate carbon breakdown percentages
    const streamingPercent = (streamingCarbonYearly / totalCarbonYearly) * 100;
    const fashionPercent = (fashionCarbonYearly / totalCarbonYearly) * 100;
    const coffeePercent = (coffeeCarbonYearly / totalCarbonYearly) * 100;
    const foodPercent = (foodCarbonYearly / totalCarbonYearly) * 100;
    
    // Carbon reference points for context
    const flightCarbon = 1000; // ~1000kg for round-trip medium haul flight
    const carYearlyCarbon = 2300; // ~2300kg for average car yearly
    
    // Generate recommendations based on the biggest impact areas
    const recommendations = [];
    if (streamingPercent > 20) {
      recommendations.push("Reduce 4K streaming - try HD or even SD for non-visual content like music or podcasts");
    }
    if (fashionPercent > 25) {
      recommendations.push("Invest in fewer, higher-quality clothing pieces and explore second-hand options");
    }
    if (disposableCups > 50) {
      recommendations.push("Switch to a reusable coffee cup - it pays for its carbon footprint in just 30 uses");
    }
    if (meatDays > 3) {
      recommendations.push("Try 'Meatless Mondays' or replace one meat meal per week with a plant-based alternative");
    }
    if (foodWaste > 15) {
      recommendations.push("Plan meals ahead and store food properly to reduce waste - aim to cut waste by half");
    }
    
    // If they're already quite sustainable, offer encouragement
    if (recommendations.length === 0) {
      recommendations.push("Your habits are already quite sustainable! Consider offsetting your remaining carbon footprint through certified programs");
    }
    
    const results = {
      streamingCarbonYearly: parseFloat(streamingCarbonYearly.toFixed(1)),
      fashionCarbonYearly: parseFloat(fashionCarbonYearly.toFixed(1)),
      coffeeCarbonYearly: parseFloat(coffeeCarbonYearly.toFixed(1)),
      foodCarbonYearly: parseFloat(foodCarbonYearly.toFixed(1)),
      totalCarbonYearly: parseFloat(totalCarbonYearly.toFixed(1)),
      
      streamingPercent: parseFloat(streamingPercent.toFixed(1)),
      fashionPercent: parseFloat(fashionPercent.toFixed(1)),
      coffeePercent: parseFloat(coffeePercent.toFixed(1)),
      foodPercent: parseFloat(foodPercent.toFixed(1)),
      
      flightEquivalent: parseFloat((totalCarbonYearly / flightCarbon).toFixed(1)),
      carEquivalent: parseFloat((totalCarbonYearly / carYearlyCarbon).toFixed(2)),
      
      recommendations
    };
    
    setResults(results);
    
    toast({
      title: "Sustainability Analysis Complete",
      description: `Your yearly carbon footprint: ${results.totalCarbonYearly} kg CO₂e`,
    });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Earth className="mr-2 text-primary" size={24} />
          Sustainability Calculator
        </CardTitle>
        <CardDescription>Measure the carbon footprint of your daily habits and find ways to reduce it</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="streaming" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="streaming">Streaming</TabsTrigger>
            <TabsTrigger value="fashion">Fashion</TabsTrigger>
            <TabsTrigger value="coffee">Coffee</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
          </TabsList>
          
          <TabsContent value="streaming" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="streamingHours">Daily Streaming Hours</Label>
                <Input
                  id="streamingHours"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={streamingHours}
                  onChange={(e) => setStreamingHours(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Typical Streaming Quality</Label>
                <div className="flex items-center justify-between">
                  <Label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      className="form-radio text-primary"
                      checked={streamingQuality === 1}
                      onChange={() => setStreamingQuality(1)}
                    />
                    SD
                  </Label>
                  <Label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      className="form-radio text-primary"
                      checked={streamingQuality === 2}
                      onChange={() => setStreamingQuality(2)}
                    />
                    HD
                  </Label>
                  <Label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      className="form-radio text-primary"
                      checked={streamingQuality === 3}
                      onChange={() => setStreamingQuality(3)}
                    />
                    4K
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fashion" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clothingItems">New Clothing Items Per Month</Label>
                <Input
                  id="clothingItems"
                  type="number"
                  min="0"
                  max="50"
                  value={clothingItems}
                  onChange={(e) => setClothingItems(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Fast Fashion Percentage</Label>
                  <span className="font-medium">{fastFashionPercent}%</span>
                </div>
                <Slider 
                  defaultValue={[50]} 
                  max={100} 
                  step={5} 
                  value={[fastFashionPercent]}
                  onValueChange={(values) => setFastFashionPercent(values[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Sustainable</span>
                  <span>Mix</span>
                  <span>Fast Fashion</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <FastFashion className="inline-block h-3 w-3 mr-1" />
                  Fast fashion brands: H&M, Zara, Shein, Forever 21, Primark, etc.
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="coffee" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coffeeCups">Coffee Cups Per Day</Label>
                <Input
                  id="coffeeCups"
                  type="number"
                  min="0"
                  max="10"
                  step="1"
                  value={coffeeCups}
                  onChange={(e) => setCoffeeCups(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Disposable Cup Usage</Label>
                  <span className="font-medium">{disposableCups}%</span>
                </div>
                <Slider 
                  defaultValue={[50]} 
                  max={100} 
                  step={10} 
                  value={[disposableCups]}
                  onValueChange={(values) => setDisposableCups(values[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Reusable</span>
                  <span>Mix</span>
                  <span>Disposable</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <Coffee className="inline-block h-3 w-3 mr-1" />
                  A reusable cup pays off its environmental cost after about 30 uses
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="food" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meatDays">Days With Meat Per Week</Label>
                <Input
                  id="meatDays"
                  type="number"
                  min="0"
                  max="7"
                  value={meatDays}
                  onChange={(e) => setMeatDays(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Food Waste Percentage</Label>
                  <span className="font-medium">{foodWaste}%</span>
                </div>
                <Slider 
                  defaultValue={[20]} 
                  max={50} 
                  step={5} 
                  value={[foodWaste]}
                  onValueChange={(values) => setFoodWaste(values[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Average (20%)</span>
                  <span>High</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  The average household wastes about 20% of the food they purchase
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button onClick={calculateFootprint} className="w-full">Calculate Carbon Footprint</Button>
        
        {results && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-secondary p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-semibold">Your Annual Carbon Footprint:</span>
                  </div>
                  <span className="text-xl font-bold">{results.totalCarbonYearly} kg CO₂e</span>
                </div>
                
                <div className="space-y-1 mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Streaming ({results.streamingPercent}%)</span>
                    <span>{results.streamingCarbonYearly} kg</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="h-2 rounded-full bg-purple-500" style={{ width: `${results.streamingPercent}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm mt-2 mb-1">
                    <span>Fashion ({results.fashionPercent}%)</span>
                    <span>{results.fashionCarbonYearly} kg</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: `${results.fashionPercent}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm mt-2 mb-1">
                    <span>Coffee Cups ({results.coffeePercent}%)</span>
                    <span>{results.coffeeCarbonYearly} kg</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="h-2 rounded-full bg-amber-500" style={{ width: `${results.coffeePercent}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm mt-2 mb-1">
                    <span>Food ({results.foodPercent}%)</span>
                    <span>{results.foodCarbonYearly} kg</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: `${results.foodPercent}%` }}></div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <span className="text-sm font-medium">For Context:</span>
                <div className="flex justify-between items-center mt-1 text-sm">
                  <span>Equivalent to:</span>
                  <span>{results.flightEquivalent} round-trip flights</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Or:</span>
                  <span>{results.carEquivalent * 100}% of average car emissions per year</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <span className="text-sm font-medium flex items-center">
                  <ChartPie className="h-4 w-4 text-primary mr-1" />
                  Recommendations To Reduce Your Impact:
                </span>
                <ul className="space-y-1 mt-1">
                  {results.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="text-sm flex">
                      <span className="text-green-500 mr-2">•</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-3 bg-primary/10 rounded-md mt-2 text-sm">
                <span className="font-medium">Did you know?</span>
                <p className="mt-1">
                  Small changes in daily habits can add up to significant carbon reductions over time. The most impactful consumer changes typically involve transportation, diet, and energy usage.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
