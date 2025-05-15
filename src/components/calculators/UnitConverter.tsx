
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type Unit = {
  name: string;
  to: { [key: string]: number };
};

type UnitCategory = {
  name: string;
  units: { [key: string]: Unit };
};

export const UnitConverter = () => {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("cm");
  const [category, setCategory] = useState<string>("length");
  const [result, setResult] = useState<number>(100);

  const categories: { [key: string]: UnitCategory } = {
    length: {
      name: "Length",
      units: {
        km: { name: "Kilometers", to: { km: 1, m: 1000, cm: 100000, mm: 1000000, mi: 0.621371, ft: 3280.84, in: 39370.1 } },
        m: { name: "Meters", to: { km: 0.001, m: 1, cm: 100, mm: 1000, mi: 0.000621371, ft: 3.28084, in: 39.3701 } },
        cm: { name: "Centimeters", to: { km: 0.00001, m: 0.01, cm: 1, mm: 10, mi: 0.00000621371, ft: 0.0328084, in: 0.393701 } },
        mm: { name: "Millimeters", to: { km: 0.000001, m: 0.001, cm: 0.1, mm: 1, mi: 0.000000621371, ft: 0.00328084, in: 0.0393701 } },
        mi: { name: "Miles", to: { km: 1.60934, m: 1609.34, cm: 160934, mm: 1609340, mi: 1, ft: 5280, in: 63360 } },
        ft: { name: "Feet", to: { km: 0.0003048, m: 0.3048, cm: 30.48, mm: 304.8, mi: 0.000189394, ft: 1, in: 12 } },
        in: { name: "Inches", to: { km: 0.0000254, m: 0.0254, cm: 2.54, mm: 25.4, mi: 0.0000157828, ft: 0.0833333, in: 1 } }
      }
    },
    weight: {
      name: "Weight",
      units: {
        kg: { name: "Kilograms", to: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274 } },
        g: { name: "Grams", to: { kg: 0.001, g: 1, mg: 1000, lb: 0.00220462, oz: 0.035274 } },
        mg: { name: "Milligrams", to: { kg: 0.000001, g: 0.001, mg: 1, lb: 0.00000220462, oz: 0.000035274 } },
        lb: { name: "Pounds", to: { kg: 0.453592, g: 453.592, mg: 453592, lb: 1, oz: 16 } },
        oz: { name: "Ounces", to: { kg: 0.0283495, g: 28.3495, mg: 28349.5, lb: 0.0625, oz: 1 } }
      }
    },
    volume: {
      name: "Volume",
      units: {
        l: { name: "Liters", to: { l: 1, ml: 1000, gal: 0.264172, qt: 1.05669, pt: 2.11338, cup: 4.22675, oz: 33.814, tbsp: 67.628, tsp: 202.884 } },
        ml: { name: "Milliliters", to: { l: 0.001, ml: 1, gal: 0.000264172, qt: 0.00105669, pt: 0.00211338, cup: 0.00422675, oz: 0.033814, tbsp: 0.067628, tsp: 0.202884 } },
        gal: { name: "Gallons", to: { l: 3.78541, ml: 3785.41, gal: 1, qt: 4, pt: 8, cup: 16, oz: 128, tbsp: 256, tsp: 768 } },
        qt: { name: "Quarts", to: { l: 0.946353, ml: 946.353, gal: 0.25, qt: 1, pt: 2, cup: 4, oz: 32, tbsp: 64, tsp: 192 } },
        pt: { name: "Pints", to: { l: 0.473176, ml: 473.176, gal: 0.125, qt: 0.5, pt: 1, cup: 2, oz: 16, tbsp: 32, tsp: 96 } },
        cup: { name: "Cups", to: { l: 0.236588, ml: 236.588, gal: 0.0625, qt: 0.25, pt: 0.5, cup: 1, oz: 8, tbsp: 16, tsp: 48 } },
        oz: { name: "Fluid Ounces", to: { l: 0.0295735, ml: 29.5735, gal: 0.0078125, qt: 0.03125, pt: 0.0625, cup: 0.125, oz: 1, tbsp: 2, tsp: 6 } },
        tbsp: { name: "Tablespoons", to: { l: 0.0147868, ml: 14.7868, gal: 0.00390625, qt: 0.015625, pt: 0.03125, cup: 0.0625, oz: 0.5, tbsp: 1, tsp: 3 } },
        tsp: { name: "Teaspoons", to: { l: 0.00492892, ml: 4.92892, gal: 0.00130208, qt: 0.00520833, pt: 0.0104167, cup: 0.0208333, oz: 0.166667, tbsp: 0.333333, tsp: 1 } }
      }
    },
    temperature: {
      name: "Temperature",
      units: {
        c: { name: "Celsius", to: { c: 1, f: (c) => c * 9/5 + 32, k: (c) => c + 273.15 } },
        f: { name: "Fahrenheit", to: { c: (f) => (f - 32) * 5/9, f: 1, k: (f) => (f - 32) * 5/9 + 273.15 } },
        k: { name: "Kelvin", to: { c: (k) => k - 273.15, f: (k) => (k - 273.15) * 9/5 + 32, k: 1 } }
      }
    }
  };

  const handleChange = () => {
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) {
      return;
    }

    try {
      const selectedCategory = categories[category];
      const from = selectedCategory.units[fromUnit];
      const to = selectedCategory.units[toUnit];

      let converted: number;

      if (category === "temperature") {
        const converter = from.to[toUnit];
        if (typeof converter === "function") {
          converted = converter(floatValue);
        } else {
          converted = floatValue;
        }
      } else {
        const conversionFactor = from.to[toUnit];
        converted = floatValue * conversionFactor;
      }

      setResult(converted);
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Unable to convert between these units",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10">
        <CardTitle className="text-xl">Unit Converter</CardTitle>
        <CardDescription>Convert between different units of measurement</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(newValue) => {
              setCategory(newValue);
              // Reset units after changing category
              const firstUnit = Object.keys(categories[newValue].units)[0];
              const secondUnit = Object.keys(categories[newValue].units)[1];
              setFromUnit(firstUnit);
              setToUnit(secondUnit);
              handleChange();
            }}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(categories).map((cat) => (
                  <SelectItem key={cat} value={cat}>{categories[cat].name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select value={fromUnit} onValueChange={(newValue) => {
                setFromUnit(newValue);
                handleChange();
              }}>
                <SelectTrigger id="from">
                  <SelectValue placeholder="From" />
                </SelectTrigger>
                <SelectContent>
                  {category && Object.keys(categories[category].units).map((unit) => (
                    <SelectItem key={unit} value={unit}>{categories[category].units[unit].name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Select value={toUnit} onValueChange={(newValue) => {
                setToUnit(newValue);
                handleChange();
              }}>
                <SelectTrigger id="to">
                  <SelectValue placeholder="To" />
                </SelectTrigger>
                <SelectContent>
                  {category && Object.keys(categories[category].units).map((unit) => (
                    <SelectItem key={unit} value={unit}>{categories[category].units[unit].name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                handleChange();
              }}
            />
          </div>
          
          <Button className="w-full" onClick={handleChange}>
            Convert
          </Button>
          
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground mb-1">Result</div>
              <div className="text-2xl font-bold">{result.toLocaleString(undefined, { maximumFractionDigits: 6 })}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {value} {categories[category].units[fromUnit].name} = {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {categories[category].units[toUnit].name}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
