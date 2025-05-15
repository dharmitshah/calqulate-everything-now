
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const RandomNumberGenerator = () => {
  // Single number generation
  const [min, setMin] = useState<string>("1");
  const [max, setMax] = useState<string>("100");
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  
  // Multiple numbers generation
  const [multiMin, setMultiMin] = useState<string>("1");
  const [multiMax, setMultiMax] = useState<string>("100");
  const [count, setCount] = useState<string>("5");
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  
  // Password/Pin generation
  const [length, setLength] = useState<string>("8");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  
  // Generate a single random number
  const generateSingleNumber = () => {
    const minValue = parseInt(min);
    const maxValue = parseInt(max);
    
    if (!isNaN(minValue) && !isNaN(maxValue) && minValue <= maxValue) {
      const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      setRandomNumber(randomValue);
    }
  };
  
  // Generate multiple random numbers
  const generateMultipleNumbers = () => {
    const minValue = parseInt(multiMin);
    const maxValue = parseInt(multiMax);
    const countValue = parseInt(count);
    
    if (!isNaN(minValue) && !isNaN(maxValue) && !isNaN(countValue) && minValue <= maxValue && countValue > 0) {
      // If no duplicates and range is smaller than count, adjust count
      const range = maxValue - minValue + 1;
      const actualCount = !allowDuplicates ? Math.min(range, countValue) : countValue;
      
      if (!allowDuplicates && range < countValue) {
        setCount(range.toString());
      }
      
      const result: number[] = [];
      
      if (!allowDuplicates) {
        // Generate unique numbers (Fisher-Yates shuffle on a range)
        const pool = Array.from({ length: range }, (_, i) => i + minValue);
        
        // Shuffle and take the first 'actualCount' items
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        
        result.push(...pool.slice(0, actualCount));
      } else {
        // Generate with duplicates allowed
        for (let i = 0; i < actualCount; i++) {
          result.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
        }
      }
      
      setRandomNumbers(result);
    }
  };
  
  // Generate a random password or PIN
  const generatePassword = () => {
    const lengthValue = parseInt(length);
    
    if (isNaN(lengthValue) || lengthValue <= 0) {
      return;
    }
    
    const numberChars = "0123456789";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const symbolChars = "!@#$%^&*()_-+=<>?";
    
    let charSet = "";
    if (includeNumbers) charSet += numberChars;
    if (includeUpper) charSet += upperChars;
    if (includeLower) charSet += lowerChars;
    if (includeSymbols) charSet += symbolChars;
    
    if (charSet.length === 0) {
      charSet = numberChars; // Default to numbers if nothing selected
    }
    
    let result = "";
    const charSetLength = charSet.length;
    
    for (let i = 0; i < lengthValue; i++) {
      const randomIndex = Math.floor(Math.random() * charSetLength);
      result += charSet[randomIndex];
    }
    
    setPassword(result);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10">
        <CardTitle className="text-xl">Random Generator</CardTitle>
        <CardDescription>Generate random numbers, sequences, and passwords</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="single">Single Number</TabsTrigger>
            <TabsTrigger value="multiple">Multiple Numbers</TabsTrigger>
            <TabsTrigger value="password">Password/PIN</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min">Minimum</Label>
                <Input
                  id="min"
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max">Maximum</Label>
                <Input
                  id="max"
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
            </div>
            
            <Button className="w-full" onClick={generateSingleNumber}>
              Generate Random Number
            </Button>
            
            {randomNumber !== null && (
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Random Number</div>
                  <div className="text-4xl font-bold">{randomNumber}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Between {min} and {max}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="multiple" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="multiMin">Minimum</Label>
                <Input
                  id="multiMin"
                  type="number"
                  value={multiMin}
                  onChange={(e) => setMultiMin(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="multiMax">Maximum</Label>
                <Input
                  id="multiMax"
                  type="number"
                  value={multiMax}
                  onChange={(e) => setMultiMax(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="count">How many numbers?</Label>
              <Input
                id="count"
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                min="1"
                max={!allowDuplicates ? parseInt(multiMax) - parseInt(multiMin) + 1 : undefined}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="duplicates"
                checked={allowDuplicates}
                onCheckedChange={setAllowDuplicates}
              />
              <Label htmlFor="duplicates">Allow duplicates</Label>
            </div>
            
            <Button className="w-full" onClick={generateMultipleNumbers}>
              Generate Numbers
            </Button>
            
            {randomNumbers.length > 0 && (
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-3">Random Numbers</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {randomNumbers.map((num, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 rounded-md">{num}</span>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-3">
                    {randomNumbers.length} numbers between {multiMin} and {multiMax}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="password" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min="1"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="includeNumbers"
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                />
                <Label htmlFor="includeNumbers">Include numbers (0-9)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="includeUpper"
                  checked={includeUpper}
                  onCheckedChange={setIncludeUpper}
                />
                <Label htmlFor="includeUpper">Include uppercase (A-Z)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="includeLower"
                  checked={includeLower}
                  onCheckedChange={setIncludeLower}
                />
                <Label htmlFor="includeLower">Include lowercase (a-z)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="includeSymbols"
                  checked={includeSymbols}
                  onCheckedChange={setIncludeSymbols}
                />
                <Label htmlFor="includeSymbols">Include symbols (!@#$%^&*)</Label>
              </div>
            </div>
            
            <Button className="w-full" onClick={generatePassword}>
              Generate Password
            </Button>
            
            {password && (
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-3">Generated Password</div>
                  <div className="text-xl font-mono bg-primary/10 p-3 rounded-md overflow-auto">
                    {password}
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" onClick={() => {
                      navigator.clipboard.writeText(password);
                      // You can add a toast notification here
                    }}>
                      Copy to Clipboard
                    </Button>
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
