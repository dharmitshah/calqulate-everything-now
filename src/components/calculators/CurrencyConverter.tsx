
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Fixed exchange rates for demonstration
const exchangeRates: Record<string, Record<string, number>> = {
  USD: {
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.89,
    CNY: 7.24,
    INR: 83.10,
    BRL: 5.06,
    ZAR: 18.12,
  },
  EUR: {
    USD: 1.09,
    GBP: 0.86,
    JPY: 162.50,
    CAD: 1.48,
    AUD: 1.65,
    CHF: 0.97,
    CNY: 7.86,
    INR: 90.38,
    BRL: 5.50,
    ZAR: 19.70,
  },
  GBP: {
    USD: 1.27,
    EUR: 1.16,
    JPY: 188.73,
    CAD: 1.72,
    AUD: 1.92,
    CHF: 1.12,
    CNY: 9.14,
    INR: 105.03,
    BRL: 6.39,
    ZAR: 22.91,
  }
};

// Generate all exchange rates
Object.keys(exchangeRates).forEach(baseCurrency => {
  Object.entries(exchangeRates[baseCurrency]).forEach(([targetCurrency, rate]) => {
    if (!exchangeRates[targetCurrency]) {
      exchangeRates[targetCurrency] = {};
    }
    
    // Skip if already defined
    if (exchangeRates[targetCurrency][baseCurrency] === undefined) {
      exchangeRates[targetCurrency][baseCurrency] = 1 / rate;
    }
    
    // Add self-to-self conversion
    if (!exchangeRates[baseCurrency][baseCurrency]) {
      exchangeRates[baseCurrency][baseCurrency] = 1;
    }
    if (!exchangeRates[targetCurrency][targetCurrency]) {
      exchangeRates[targetCurrency][targetCurrency] = 1;
    }
  });
});

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "ZAR", name: "South African Rand" },
];

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    convertCurrency();
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertCurrency = () => {
    if (amount <= 0) {
      setConvertedAmount(0);
      setExchangeRate(exchangeRates[fromCurrency]?.[toCurrency] || null);
      return;
    }

    try {
      if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
        const rate = exchangeRates[fromCurrency][toCurrency];
        setExchangeRate(rate);
        setConvertedAmount(amount * rate);
      } else {
        toast({
          title: "Conversion Error",
          description: `Exchange rate from ${fromCurrency} to ${toCurrency} not available.`,
          variant: "destructive",
        });
        setConvertedAmount(null);
        setExchangeRate(null);
      }
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Failed to convert currency. Please try again.",
        variant: "destructive",
      });
      setConvertedAmount(null);
      setExchangeRate(null);
    }
  };

  const getCurrencySymbol = (currencyCode: string): string => {
    switch (currencyCode) {
      case "USD": return "$";
      case "EUR": return "€";
      case "GBP": return "£";
      case "JPY": return "¥";
      case "CAD": return "CA$";
      case "AUD": return "A$";
      case "CHF": return "CHF";
      case "CNY": return "¥";
      case "INR": return "₹";
      case "BRL": return "R$";
      case "ZAR": return "R";
      default: return currencyCode;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Currency Converter</CardTitle>
        <CardDescription>Convert between different currencies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">
              {getCurrencySymbol(fromCurrency)}
            </span>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount || ''}
              onChange={handleAmountChange}
              className="pl-7"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
          <div>
            <Label htmlFor="fromCurrency" className="mb-2 block">From</Label>
            <Select
              value={fromCurrency}
              onValueChange={setFromCurrency}
            >
              <SelectTrigger id="fromCurrency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={switchCurrencies}
            className="mt-6"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
          
          <div>
            <Label htmlFor="toCurrency" className="mb-2 block">To</Label>
            <Select
              value={toCurrency}
              onValueChange={setToCurrency}
            >
              <SelectTrigger id="toCurrency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg bg-secondary p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Converted Amount:</span>
            <span className="font-semibold">
              {convertedAmount !== null 
                ? `${getCurrencySymbol(toCurrency)} ${convertedAmount.toFixed(2)}`
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Exchange Rate:</span>
            <span className="font-medium">
              {exchangeRate !== null 
                ? `1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`
                : "N/A"}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
            <p>Note: Exchange rates are for demonstration purposes only.</p>
            <p>Last updated: May 15, 2025</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
