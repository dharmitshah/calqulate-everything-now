
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
import { BatteryCharging, Leaf, Clock, DollarSign, Zap, ThermometerSun, Car } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    
    // Calculate charging times for each level with more precise rates
    // Adding battery charging curve factor - slower at high/low charge states
    const batteryEfficiencyFactor = 0.85; // Accounts for charging inefficiency
    const chargingTimes = {
      level1: (batterySize * 0.8) / (chargerTypes.level1.kw * batteryEfficiencyFactor),
      level2: (batterySize * 0.8) / (chargerTypes.level2.kw * batteryEfficiencyFactor),
      level3: (batterySize * 0.8) / (chargerTypes.level3.kw * 0.75) // DC fast charging has lower efficiency at high power
    };
    
    // Calculate cost per charge with tiered electricity rates
    // Many utilities charge more during peak hours
    const peakHoursFactor = chargerType === "level1" ? 1.0 : 1.15; // Level 2/3 more likely used during peak hours
    const costPerCharge = (batterySize * 0.8 / batteryEfficiencyFactor) * kwhRate * peakHoursFactor;
    
    // Calculate time saved relative to current choice
    const currentChargeTime = chargingTimes[chargerType];
    const timeSavedVsLevel1 = Math.max(0, chargingTimes.level1 - currentChargeTime);
    const timeSavedVsLevel2 = Math.max(0, chargingTimes.level2 - currentChargeTime);
    
    // Calculate additional cost for faster charging
    // Level 3 typically costs more per kWh
    const level3PremiumRate = kwhRate * 2.5; // Updated: commercial DC chargers charge more premium
    const level3ExtraCost = (batterySize * 0.8) * (level3PremiumRate - kwhRate);
    
    // Calculate cost per hour saved with better precision
    const costPerHourSavedToLevel3 = chargerType !== "level3" && (chargingTimes[chargerType] - chargingTimes.level3) > 0 
      ? level3ExtraCost / (chargingTimes[chargerType] - chargingTimes.level3)
      : 0;
      
    // NEW: Calculate lifetime battery impact
    // Fast charging can degrade battery faster
    const batteryDegradationPerFastCharge = 0.05; // percentage per charge
    const batteryCost = 150 * batterySize; // $150 per kWh for replacement
    const additionalBatteryCostPerYear = chargerType === "level3" ? 
      (batteryDegradationPerFastCharge/100 * 52 * batteryCost) : 0;
      
    // NEW: Calculate comprehensive charging data
    // Calculate charging frequency based on daily miles with more realistic cycles
    const batteryUsableCapacity = batterySize * 0.8;
    const rangeMiles = batteryUsableCapacity * efficiency;
    const daysPerCharge = dailyMiles > 0 ? rangeMiles / dailyMiles : Infinity;
    const chargesPerMonth = dailyMiles > 0 ? 30 / daysPerCharge : 0;
    
    // Calculate monthly costs with more factors
    const monthlyCost = costPerCharge * chargesPerMonth;
    const monthlyTimeCharging = currentChargeTime * chargesPerMonth;
    
    // NEW: Home vs Public charging comparison
    const publicLevel2Rate = kwhRate * 2;
    const publicLevel3Rate = kwhRate * 3.5;
    const homeChargeMonthly = costPerCharge * chargesPerMonth;
    const publicLevel2Monthly = (batterySize * 0.8 / batteryEfficiencyFactor) * publicLevel2Rate * chargesPerMonth;
    const publicLevel3Monthly = (batterySize * 0.8 / 0.75) * publicLevel3Rate * chargesPerMonth;
    
    // Calculate environmental impact with more detailed factors
    // Varying CO2 by energy source, time of day, etc.
    const regionalCarbonIntensity = 0.4; // kg CO2 per kWh - varies by region
    const solarChargingFactor = chargerType === "level1" ? 0.5 : 0.8; // Level 1 more likely during daylight
    const effectiveCarbonIntensity = regionalCarbonIntensity * solarChargingFactor;
    const monthlyCO2 = dailyEnergyNeeded * 30 * effectiveCarbonIntensity;
    
    // Calculate gasoline equivalent with updated values
    // Average gas car: 25 MPG, produces ~8.89 kg CO2 per gallon
    const gasEquivalent = (dailyMiles * 30) / 25;
    const gasCO2 = gasEquivalent * 8.89;
    const co2Savings = gasCO2 - monthlyCO2;
    const gasCostPerGallon = 3.5;
    const gasMonthly = gasEquivalent * gasCostPerGallon;
    const monthlySavings = gasMonthly - monthlyCost;
    
    // NEW: Calculate 5-year TCO (Total Cost of Ownership)
    const fiveYearElectricityCost = monthlyCost * 60;
    const fiveYearBatteryCost = additionalBatteryCostPerYear * 5;
    const fiveYearGasCost = gasMonthly * 60;
    const fiveYearEVTotalCost = fiveYearElectricityCost + fiveYearBatteryCost;
    const fiveYearSavings = fiveYearGasCost - fiveYearEVTotalCost;
    
    // NEW: Calculate amortized charging infrastructure cost
    const level1InfrastructureCost = 0; // standard outlet
    const level2InfrastructureCost = 1200; // home charger + installation
    const infrastructureCost = chargerType === "level1" ? level1InfrastructureCost : 
                               chargerType === "level2" ? level2InfrastructureCost : 0;
    const monthsToBreakEven = infrastructureCost > 0 ? infrastructureCost / monthlySavings : 0;
    
    const results = {
      chargingTimes,
      costPerCharge: parseFloat(costPerCharge.toFixed(2)),
      currentChargeTime: parseFloat(currentChargeTime.toFixed(2)),
      timeSavedVsLevel1: parseFloat(timeSavedVsLevel1.toFixed(2)),
      timeSavedVsLevel2: parseFloat(timeSavedVsLevel2.toFixed(2)),
      level3ExtraCost: parseFloat(level3ExtraCost.toFixed(2)),
      costPerHourSavedToLevel3: parseFloat(costPerHourSavedToLevel3.toFixed(2)),
      chargesPerMonth: parseFloat(chargesPerMonth.toFixed(1)),
      daysPerCharge: parseFloat(daysPerCharge.toFixed(1)),
      monthlyCost: parseFloat(monthlyCost.toFixed(2)),
      monthlyCO2: parseFloat(monthlyCO2.toFixed(2)),
      co2Savings: parseFloat(co2Savings.toFixed(2)),
      monthlyTimeCharging: parseFloat(monthlyTimeCharging.toFixed(1)),
      homeVsPublicComparison: {
        home: parseFloat(homeChargeMonthly.toFixed(2)),
        publicLevel2: parseFloat(publicLevel2Monthly.toFixed(2)),
        publicLevel3: parseFloat(publicLevel3Monthly.toFixed(2)),
      },
      savingsVsGas: {
        monthly: parseFloat(monthlySavings.toFixed(2)),
        fiveYear: parseFloat(fiveYearSavings.toFixed(2)),
      },
      batteryImpact: parseFloat(additionalBatteryCostPerYear.toFixed(2)),
      infrastructureBreakeven: parseFloat(monthsToBreakEven.toFixed(1)),
      recommendation: ""
    };
    
    // Generate more insightful recommendation using all factors
    if (dailyMiles < 15) {
      results.recommendation = "With your low daily mileage of only " + dailyMiles + " miles, Level 1 charging is perfectly sufficient and most cost-effective. You'll only need to charge once every " + results.daysPerCharge.toFixed(1) + " days.";
    } else if (dailyMiles < 40) {
      results.recommendation = "For your moderate daily usage of " + dailyMiles + " miles, Level 2 charging offers an optimal balance of convenience and cost. You'll save " + results.timeSavedVsLevel1.toFixed(1) + " hours per charge compared to Level 1.";
    } else {
      results.recommendation = "With your high daily mileage of " + dailyMiles + " miles, faster charging solutions are justified. Level 2 at home for overnight charging with occasional Level 3 for longer trips would be ideal.";
    }
    
    // Add cost-based recommendation
    if (results.costPerHourSavedToLevel3 > 20) {
      results.recommendation += " While Level 3 charging is faster, it's relatively expensive for your situation at $" + 
        results.costPerHourSavedToLevel3.toFixed(2) + " per hour saved, plus potential long-term battery degradation costs.";
    }
    
    // Add infrastructure advice
    if (chargerType === "level2" && monthsToBreakEven > 0) {
      results.recommendation += " Your Level 2 charger installation will pay for itself in " + monthsToBreakEven.toFixed(1) + " months through gas savings.";
    }
    
    setResults(results);
    
    toast({
      title: "EV Charging Analysis Complete",
      description: `Save $${results.savingsVsGas.monthly.toFixed(2)} monthly vs. gasoline!`,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BatteryCharging className="mr-2 text-primary" size={24} />
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
            <div className="rounded-lg bg-gradient-to-br from-secondary to-secondary/70 p-4 space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                  Charging Analysis
                </h3>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px] font-medium">Charger</TableHead>
                      <TableHead className="font-medium">Time</TableHead>
                      <TableHead className="text-right font-medium">Savings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className={chargerType === "level1" ? "bg-primary/10" : ""}>
                      <TableCell>Level 1</TableCell>
                      <TableCell>{results.chargingTimes.level1.toFixed(1)} hrs</TableCell>
                      <TableCell className="text-right">Baseline</TableCell>
                    </TableRow>
                    <TableRow className={chargerType === "level2" ? "bg-primary/10" : ""}>
                      <TableCell>Level 2</TableCell>
                      <TableCell>{results.chargingTimes.level2.toFixed(1)} hrs</TableCell>
                      <TableCell className="text-right">{(results.chargingTimes.level1 - results.chargingTimes.level2).toFixed(1)} hrs</TableCell>
                    </TableRow>
                    <TableRow className={chargerType === "level3" ? "bg-primary/10" : ""}>
                      <TableCell>Level 3</TableCell>
                      <TableCell>{results.chargingTimes.level3.toFixed(1)} hrs</TableCell>
                      <TableCell className="text-right">{(results.chargingTimes.level1 - results.chargingTimes.level3).toFixed(1)} hrs</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Days between charges</p>
                    <p className="text-xl font-bold">{results.daysPerCharge.toFixed(1)}</p>
                  </div>
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Charges per month</p>
                    <p className="text-xl font-bold">{results.chargesPerMonth.toFixed(1)}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                  Financial Impact
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Cost per charge</p>
                    <p className="text-xl font-bold">${results.costPerCharge.toFixed(2)}</p>
                  </div>
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Monthly cost</p>
                    <p className="text-xl font-bold">${results.monthlyCost.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-3 rounded-md">
                  <p className="text-sm font-medium mb-2">Monthly savings vs. gasoline</p>
                  <div className="flex items-center">
                    <div className="h-4 bg-green-500 rounded" style={{ width: `${Math.min(100, results.savingsVsGas.monthly * 2)}%` }}></div>
                    <span className="ml-2 font-bold">${results.savingsVsGas.monthly.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">5-year savings: ${results.savingsVsGas.fiveYear.toFixed(2)}</p>
                </div>
                
                <div className="space-y-2 mt-2">
                  <p className="text-sm font-medium">Home vs Public Charging Comparison</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-background/80 rounded text-center">
                      <p className="text-xs text-muted-foreground">Home</p>
                      <p className="font-medium">${results.homeVsPublicComparison.home}</p>
                    </div>
                    <div className="p-2 bg-background/80 rounded text-center">
                      <p className="text-xs text-muted-foreground">Public L2</p>
                      <p className="font-medium">${results.homeVsPublicComparison.publicLevel2}</p>
                    </div>
                    <div className="p-2 bg-background/80 rounded text-center">
                      <p className="text-xs text-muted-foreground">Public L3</p>
                      <p className="font-medium">${results.homeVsPublicComparison.publicLevel3}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <Leaf className="h-5 w-5 text-green-500 mr-2" />
                  Environmental Impact
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Monthly CO₂</p>
                    <p className="text-xl font-bold">{results.monthlyCO2.toFixed(0)} kg</p>
                  </div>
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm text-muted-foreground">CO₂ savings vs gas</p>
                    <p className="text-xl font-bold text-green-500">{results.co2Savings.toFixed(0)} kg</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-300 to-green-500 rounded-full" 
                      style={{ width: `${(results.co2Savings / (results.co2Savings + results.monthlyCO2)) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{((results.co2Savings / (results.co2Savings + results.monthlyCO2)) * 100).toFixed(0)}% reduction</span>
                </div>
                
                <div className="text-sm">
                  <p>Your EV usage saves the equivalent CO₂ of:</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <Car className="h-4 w-4" />
                    <span>{(results.co2Savings / 400).toFixed(1)} months of average car emissions</span>
                  </div>
                  <div className="flex items-center mt-1 space-x-2">
                    <ThermometerSun className="h-4 w-4" />
                    <span>{(results.co2Savings / 300).toFixed(1)} months of home heating</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-primary/10 p-4 rounded-md">
                <h3 className="font-medium mb-2">Expert Recommendation:</h3>
                <p className="text-sm">{results.recommendation}</p>
                
                {results.infrastructureBreakeven > 0 && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Infrastructure payoff:</span> Your Level 2 charger installation will pay for itself in {results.infrastructureBreakeven} months.
                  </div>
                )}
                
                {results.batteryImpact > 0 && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Battery health note:</span> Consistent fast charging may add ~${results.batteryImpact}/year in battery degradation costs.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
