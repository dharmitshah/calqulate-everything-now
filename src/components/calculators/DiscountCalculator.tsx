
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PercentIcon, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [discountType, setDiscountType] = useState<"percentage" | "amount">("percentage");
  const [result, setResult] = useState({ discountAmount: 0, finalPrice: 0, savedPercentage: 0 });
  const { toast } = useToast();

  const handleOriginalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setOriginalPrice(isNaN(value) ? 0 : value);
  };

  const handleDiscountValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDiscountValue(isNaN(value) ? 0 : value);
  };

  useEffect(() => {
    calculateDiscount();
  }, [originalPrice, discountValue, discountType]);

  const calculateDiscount = () => {
    if (originalPrice <= 0) {
      setResult({ discountAmount: 0, finalPrice: 0, savedPercentage: 0 });
      return;
    }

    let discountAmount = 0;
    
    if (discountType === "percentage") {
      if (discountValue < 0 || discountValue > 100) {
        if (discountValue > 100) {
          toast({
            title: "Invalid Discount",
            description: "Percentage discount cannot exceed 100%.",
            variant: "destructive",
          });
        }
        discountAmount = Math.max(0, Math.min(discountValue, 100)) / 100 * originalPrice;
      } else {
        discountAmount = originalPrice * (discountValue / 100);
      }
    } else {
      if (discountValue < 0 || discountValue > originalPrice) {
        if (discountValue > originalPrice) {
          toast({
            title: "Invalid Discount",
            description: "Discount amount cannot exceed original price.",
            variant: "destructive",
          });
        }
        discountAmount = Math.max(0, Math.min(discountValue, originalPrice));
      } else {
        discountAmount = discountValue;
      }
    }
    
    const finalPrice = originalPrice - discountAmount;
    const savedPercentage = originalPrice > 0 ? (discountAmount / originalPrice) * 100 : 0;
    
    setResult({
      discountAmount,
      finalPrice,
      savedPercentage
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Discount Calculator</CardTitle>
        <CardDescription>Calculate discounted prices and savings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="originalPrice"
              type="number"
              min="0"
              step="0.01"
              value={originalPrice || ''}
              onChange={handleOriginalPriceChange}
              className="pl-7"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Discount Type</Label>
          <RadioGroup 
            value={discountType} 
            onValueChange={(value) => setDiscountType(value as "percentage" | "amount")}
            className="flex"
          >
            <div className="flex items-center space-x-2 mr-4">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage" className="flex items-center">
                <PercentIcon className="h-4 w-4 mr-1" /> Percentage
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="amount" id="amount" />
              <Label htmlFor="amount" className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" /> Amount
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountValue">
            {discountType === "percentage" ? "Discount Percentage" : "Discount Amount"}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">
              {discountType === "percentage" ? "%" : "$"}
            </span>
            <Input
              id="discountValue"
              type="number"
              min="0"
              step={discountType === "percentage" ? "1" : "0.01"}
              max={discountType === "percentage" ? "100" : undefined}
              value={discountValue || ''}
              onChange={handleDiscountValueChange}
              className="pl-7"
            />
          </div>
        </div>

        <Separator />

        <div className="rounded-lg bg-secondary p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Original Price:</span>
            <span className="font-semibold">${originalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount Amount:</span>
            <span className="font-semibold">${result.discountAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="text-muted-foreground">Final Price:</span>
            <span className="font-semibold text-lg">${result.finalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">You Save:</span>
            <span className="font-medium text-green-500">{result.savedPercentage.toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
