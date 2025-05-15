
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
import { Fuel } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FuelEconomyResult {
  mpg: number;
  kml: number;
  l100km: number;
  tripCost: number | null;
}

export const FuelEconomyCalculator = () => {
  const [distance, setDistance] = useState<number>(0);
  const [fuel, setFuel] = useState<number>(0);
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [fuelPrice, setFuelPrice] = useState<number>(0);
  const [result, setResult] = useState<FuelEconomyResult>({
    mpg: 0,
    kml: 0,
    l100km: 0,
    tripCost: null
  });
  const { toast } = useToast();

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDistance(isNaN(value) ? 0 : value);
  };

  const handleFuelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFuel(isNaN(value) ? 0 : value);
  };

  const handleFuelPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFuelPrice(isNaN(value) ? 0 : value);
  };

  const handleCalculate = () => {
    if (distance <= 0 || fuel <= 0) {
      toast({
        title: "Invalid Input",
        description: "Both distance and fuel must be greater than zero.",
        variant: "destructive",
      });
      return;
    }

    let mpg = 0;
    let kml = 0;
    let l100km = 0;
    let tripCost = null;

    if (unit === "imperial") {
      // Miles per gallon
      mpg = distance / fuel;
      
      // Convert to metric
      kml = mpg * 0.425144;
      l100km = 235.215 / mpg;
    } else {
      // Kilometers per liter
      kml = distance / fuel;
      
      // Convert to imperial
      mpg = kml * 2.35215;
      l100km = 100 / kml;
    }

    // Calculate trip cost if fuel price is provided
    if (fuelPrice > 0) {
      tripCost = fuel * fuelPrice;
    }

    setResult({ mpg, kml, l100km, tripCost });

    toast({
      title: "Calculation Complete",
      description: `Your vehicle's fuel economy is ${mpg.toFixed(2)} MPG.`,
    });
  };

  const getDistanceUnit = () => unit === "imperial" ? "miles" : "kilometers";
  const getFuelUnit = () => unit === "imperial" ? "gallons" : "liters";
  const getFuelPriceUnit = () => unit === "imperial" ? "per gallon" : "per liter";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Fuel className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">Fuel Economy Calculator</CardTitle>
        </div>
        <CardDescription>Calculate your vehicle's fuel efficiency and costs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-end">
          <Tabs value={unit} onValueChange={(v) => setUnit(v as "imperial" | "metric")}>
            <TabsList>
              <TabsTrigger value="imperial">Imperial (MPG)</TabsTrigger>
              <TabsTrigger value="metric">Metric (L/100km)</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="distance">Distance ({getDistanceUnit()})</Label>
            <Input
              id="distance"
              type="number"
              min="0"
              step="0.1"
              value={distance || ''}
              onChange={handleDistanceChange}
              placeholder={`Enter distance in ${getDistanceUnit()}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuel">Fuel Used ({getFuelUnit()})</Label>
            <Input
              id="fuel"
              type="number"
              min="0"
              step="0.1"
              value={fuel || ''}
              onChange={handleFuelChange}
              placeholder={`Enter fuel in ${getFuelUnit()}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelPrice">Fuel Price ($ {getFuelPriceUnit()})</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                id="fuelPrice"
                type="number"
                min="0"
                step="0.01"
                value={fuelPrice || ''}
                onChange={handleFuelPriceChange}
                className="pl-7"
                placeholder="Optional"
              />
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/80"
            onClick={handleCalculate}
          >
            Calculate
          </Button>
        </div>

        <div className="rounded-lg bg-secondary p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">MPG:</span>
            <span className="font-semibold">{result.mpg.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">km/L:</span>
            <span className="font-semibold">{result.kml.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">L/100km:</span>
            <span className="font-semibold">{result.l100km.toFixed(2)}</span>
          </div>
          {result.tripCost !== null && (
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-muted-foreground">Trip Cost:</span>
              <span className="font-semibold">${result.tripCost.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="bg-muted p-3 rounded-md text-sm">
          <p><strong>Tip:</strong> Regular maintenance can improve your vehicle's fuel efficiency by up to 10%.</p>
        </div>
      </CardContent>
    </Card>
  );
};
