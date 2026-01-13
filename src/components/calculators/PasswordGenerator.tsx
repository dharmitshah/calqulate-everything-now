import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, Shield, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { toast } from "sonner";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [entropy, setEntropy] = useState(0);

  const generatePassword = () => {
    let charset = "";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const ambiguous = "il1Lo0O";

    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (excludeAmbiguous) {
      charset = charset.split("").filter(c => !ambiguous.includes(c)).join("");
    }

    if (charset.length === 0) {
      toast.error("Please select at least one character type");
      return;
    }

    let newPassword = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }

    // Calculate entropy
    const calculatedEntropy = Math.log2(Math.pow(charset.length, length));
    setEntropy(Math.round(calculatedEntropy * 100) / 100);

    // Determine strength
    let strengthLabel: string;
    if (calculatedEntropy < 28) strengthLabel = "Very Weak";
    else if (calculatedEntropy < 36) strengthLabel = "Weak";
    else if (calculatedEntropy < 60) strengthLabel = "Reasonable";
    else if (calculatedEntropy < 128) strengthLabel = "Strong";
    else strengthLabel = "Very Strong";

    setStrength(strengthLabel);
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard!");
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case "Very Weak": return "text-red-500";
      case "Weak": return "text-orange-500";
      case "Reasonable": return "text-yellow-500";
      case "Strong": return "text-green-500";
      case "Very Strong": return "text-emerald-500";
      default: return "text-muted-foreground";
    }
  };

  const getStrengthIcon = () => {
    switch (strength) {
      case "Very Weak": return <ShieldX className="h-5 w-5 text-red-500" />;
      case "Weak": return <ShieldAlert className="h-5 w-5 text-orange-500" />;
      case "Reasonable": return <Shield className="h-5 w-5 text-yellow-500" />;
      case "Strong": return <ShieldCheck className="h-5 w-5 text-green-500" />;
      case "Very Strong": return <ShieldCheck className="h-5 w-5 text-emerald-500" />;
      default: return <Shield className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStrengthProgress = () => {
    switch (strength) {
      case "Very Weak": return 20;
      case "Weak": return 40;
      case "Reasonable": return 60;
      case "Strong": return 80;
      case "Very Strong": return 100;
      default: return 0;
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Password Generator
        </CardTitle>
        <CardDescription>
          Generate cryptographically secure passwords
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Generated Password Display */}
        <div className="space-y-2">
          <Label>Generated Password</Label>
          <div className="flex gap-2">
            <Input
              value={password}
              readOnly
              placeholder="Click Generate to create a password"
              className="font-mono text-sm"
            />
            <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!password}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Strength Indicator */}
        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStrengthIcon()}
                <span className={`font-medium ${getStrengthColor()}`}>{strength}</span>
              </div>
              <span className="text-sm text-muted-foreground">{entropy} bits entropy</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  strength === "Very Weak" ? "bg-red-500" :
                  strength === "Weak" ? "bg-orange-500" :
                  strength === "Reasonable" ? "bg-yellow-500" :
                  strength === "Strong" ? "bg-green-500" :
                  "bg-emerald-500"
                }`}
                style={{ width: `${getStrengthProgress()}%` }}
              />
            </div>
          </div>
        )}

        {/* Length Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Password Length</Label>
            <span className="text-sm font-medium">{length} characters</span>
          </div>
          <Slider
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            min={4}
            max={64}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Character Types</Label>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="cursor-pointer">Uppercase (A-Z)</Label>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase" className="cursor-pointer">Lowercase (a-z)</Label>
              <Switch
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="numbers" className="cursor-pointer">Numbers (0-9)</Label>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="symbols" className="cursor-pointer">Symbols (!@#$%...)</Label>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>

            <div className="flex items-center justify-between border-t pt-3">
              <Label htmlFor="ambiguous" className="cursor-pointer text-muted-foreground">
                Exclude ambiguous (i, l, 1, L, o, 0, O)
              </Label>
              <Switch
                id="ambiguous"
                checked={excludeAmbiguous}
                onCheckedChange={setExcludeAmbiguous}
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <Button onClick={generatePassword} className="w-full" size="lg">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Password
        </Button>

        {/* Tips */}
        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-medium mb-2">Security Tips:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use at least 16 characters for important accounts</li>
            <li>Include all character types for maximum strength</li>
            <li>Never reuse passwords across different sites</li>
            <li>Consider using a password manager</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;
