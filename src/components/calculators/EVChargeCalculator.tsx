
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { EvChargingIcon, Leaf, Clock, DollarSign } from "lucide-react";

// Define charger types and their charging rates
const chargerTypes = {
  level1: { name: "Level 1 (120V)", kw: 1.4, hours: 20 },
  level2: { name: "Level 2 (240V)", kw: 7.2, hours: 8 },
  level3: { name: "Level 3 (DC Fast Charging)", kw: 50, hours: 1 }
};

export const EVChargeCalculator = () => {
  const [batterySize, setBatterySize] = useState<number>(60);
  const [kwhRate, setKwhRate] = useState<number>(0.15);
  const [dailyMiles, setDailyMiles] = useState<number>(30);
  const [efficiency, setEfficiency] = useState<number>(4);
  const [chargerType, setChargerType] = useState<keyof typeof chargerTypes>("level2");
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const calculateTradeoffs = () => {
    // Calculate energy needed per day (kWh)
    const dailyEnergyNeeded = (dailyMiles / efficiency);
    
    // Calculate charging times for each level
    const chargingTimes = {
      level1: (batterySize * 0.8) / chargerTypes.level1.kw,
      level2: (batterySize * 0.8) / chargerTypes.level2.kw,
      level3: (batterySize * 0.8) / chargerTypes.level3.kw
    };
    
    // Calculate cost per charge
    const costPerCharge = (batterySize * 0.8) * kwhRate;
    
    // Calculate time saved relative to current choice
    const currentChargeTime = chargingTimes[chargerType];
    const timeSavedVsLevel1 = Math.max(0, chargingTimes.level1 - currentChargeTime);
    const timeSavedVsLevel2 = Math.max(0, chargingTimes.level2 - currentChargeTime);
    
    // Calculate additional cost for faster charging
    // Level 3 typically costs more per kWh
    const level3PremiumRate = kwhRate * 2; // Assuming fast charging costs twice as much
    const level3ExtraCost = (batterySize * 0.8) * (level3PremiumRate - kwhRate);
    
    // Calculate cost per hour saved
    const costPerHourSavedToLevel3 = chargerType !== "level3" 
      ? level3ExtraCost / (chargingTimes[chargerType] - chargingTimes.level3)
      : 0;
    
    // Calculate charging frequency based on daily miles
    const chargeCyclesPerMonth = dailyMiles > 0 
      ? (30 * dailyMiles) / (batterySize * 0.8 * efficiency)
      : 0;
    
    // Calculate monthly costs
    const monthlyCost = costPerCharge * chargeCyclesPerMonth;
    
    // Calculate environmental impact
    // Avg CO2 emissions from grid electricity: ~0.5 kg CO2 per kWh
    // Natural gas emits ~0.2 kg CO2 per kWh, coal ~0.9 kg CO2 per kWh
    const cleanEnergyFactor = 0.5; // Midpoint between clean and dirty grid
    const monthlyCO2 = dailyEnergyNeeded * 30 * cleanEnergyFactor;
    
    // Calculate gasoline equivalent savings
    // Average gas car: 25 MPG, produces ~8.89 kg CO2 per gallon
    const gasEquivalent = (dailyMiles * 30) / 25;
    const gasCO2 = gasEquivalent * 8.89;
    const co2Savings = gasCO2 - monthlyCO2;
    
    const results = {
      chargingTimes,
      costPerCharge: parseFloat(costPerCharge.toFixed(2)),
      currentChargeTime: parseFloat(currentChargeTime.toFixed(2)),
      timeSavedVsLevel1: parseFloat(timeSavedVsLevel1.toFixed(2)),
      timeSavedVsLevel2: parseFloat(timeSavedVsLevel2.toFixed(2)),
      level3ExtraCost: parseFloat(level3ExtraCost.toFixed(2)),
      costPerHourSavedToLevel3: parseFloat(costPerHourSavedToLevel3.toFixed(2)),
      chargeCyclesPerMonth: parseFloat(chargeCyclesPerMonth.toFixed(1)),
      monthlyCost: parseFloat(monthlyCost.toFixed(2)),
      monthlyCO2: parseFloat(monthlyCO2.toFixed(2)),
      co2Savings: parseFloat(co2Savings.toFixed(2)),
      recommendation: ""
    };
    
    // Generate recommendation
    if (dailyMiles < 15) {
      results.recommendation = "With your low daily mileage, Level 1 charging is sufficient and most cost-effective.";
    } else if (dailyMiles < 40) {
      results.recommendation = "Level 2 charging offers a good balance of convenience and cost for your typical usage.";
    } else {
      results.recommendation = "Your high daily mileage justifies faster charging. Level 2 at home with occasional Level 3 for long trips would be optimal.";
    }
    
    // Add cost-based recommendation
    if (results.costPerHourSavedToLevel3 > 20) {
      results.recommendation += " Level 3 charging is relatively expensive for your situation, at $" + 
        results.costPerHourSavedToLevel3.toFixed(2) + " per hour saved.";
    }
    
    setResults(results);
    
    toast({
      title: "EV Charging Analysis Complete",
      description: `Cost per full charge: $${results.costPerCharge}`,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <EvChargingIcon className="mr-2 text-primary" size={24} />
          EV Charging Cost vs. Time Calculator
        </CardTitle>
        <CardDescription>Compare charging costs, times, and environmental impact</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="batterySize">EV Battery Size (kWh)</Label>
            <Input
              id="batterySize"
              type="number"
              min="10"
              max="200"
              step="0.1"
              value={batterySize}
              onChange={(e) => setBatterySize(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Typically 40-100 kWh for most EVs</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="efficiency">Vehicle Efficiency (miles/kWh)</Label>
            <Input
              id="efficiency"
              type="number"
              min="2"
              max="7"
              step="0.1"
              value={efficiency}
              onChange={(e) => setEfficiency(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Typically 3-5 miles/kWh</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dailyMiles">Average Daily Miles Driven</Label>
            <Input
              id="dailyMiles"
              type="number"
              min="0"
              max="500"
              value={dailyMiles}
              onChange={(e) => setDailyMiles(Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="kwhRate">Electricity Cost ($/kWh)</Label>
            <Input
              id="kwhRate"
              type="number"
              min="0.01"
              max="0.50"
              step="0.01"
              value={kwhRate}
              onChange={(e) => setKwhRate(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">US average is around $0.15/kWh</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="chargerType">Primary Charger Type</Label>
            <Select
              value={chargerType}
              onValueChange={(value: keyof typeof chargerTypes) => setChargerType(value)}
            >
              <SelectTrigger id="chargerType">
                <SelectValue placeholder="Select charger type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="level1">{chargerTypes.level1.name}</SelectItem>
                <SelectItem value="level2">{chargerTypes.level2.name}</SelectItem>
                <SelectItem value="level3">{chargerTypes.level3.name}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={calculateTradeoffs} className="w-full">Calculate Tradeoffs</Button>
        
        {results && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-secondary p-4 space-y-4">
              <div className="space-y-1">
                <span className="text-sm font-medium">Charging Summary</span>
                
                <div className="grid grid-cols-3 gap-1 text-sm mt-2">
                  <div className="text-center p-2 bg-background rounded-md">
                    <div className="font-medium mb-1">Level 1</div>
                    <div>{results.chargingTimes.level1.toFixed(1)} hrs</div>
                  </div>
                  <div className="text-center p-2 bg-background rounded-md">
                    <div className="font-medium mb-1">Level 2</div>
                    <div>{results.chargingTimes.level2.toFixed(1)} hrs</div>
                  </div>
                  <div className="text-center p-2 bg-background rounded-md">
                    <div className="font-medium mb-1">Level 3</div>
                    <div>{results.chargingTimes.level3.toFixed(1)} hrs</div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-3 items-center">
                  <span className="text-muted-foreground">Cost per full charge:</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-primary mr-1" />
                    <span className="font-semibold">${results.costPerCharge}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly charging cost:</span>
                  <span className="font-semibold">${results.monthlyCost}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Charge cycles per month:</span>
                  <span className="font-semibold">{results.chargeCyclesPerMonth}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <span className="text-sm font-medium">Time vs. Money Tradeoff</span>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Time saved with Level 2 vs Level 1:</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{results.timeSavedVsLevel1.toFixed(1)} hrs</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Extra cost for Level 3 vs Level 2:</span>
                  <span>${results.level3ExtraCost.toFixed(2)}</span>
                </div>
                
                {results.costPerHourSavedToLevel3 > 0 && (
                  <div className="flex justify-between items-center font-medium">
                    <span>Cost per hour saved (Level 3):</span>
                    <span>${results.costPerHourSavedToLevel3.toFixed(2)}/hr</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <span className="text-sm font-medium">Environmental Impact</span>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-muted-foreground">Monthly CO₂ from charging:</span>
                  <span>{results.monthlyCO2} kg</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">CO₂ savings vs. gasoline:</span>
                  <div className="flex items-center">
                    <Leaf className="h-4 w-4 text-green-500 mr-1" />
                    <span className="font-medium">{results.co2Savings} kg</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-primary/10 rounded-md">
                <span className="font-medium">Recommendation:</span>
                <p className="text-sm mt-1">{results.recommendation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
