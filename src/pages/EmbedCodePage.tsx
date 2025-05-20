
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CheckIcon, CopyIcon } from "lucide-react";

type Calculator = {
  name: string;
  path: string;
  description: string;
};

const calculators: Calculator[] = [
  {
    name: "Stock Market Calculator",
    path: "/stock-market-calculator",
    description: "Calculate potential returns on stock market investments"
  },
  {
    name: "Mortgage Calculator",
    path: "/mortgage-calculator",
    description: "Calculate monthly mortgage payments"
  },
  {
    name: "Loan Calculator",
    path: "/loan-calculator",
    description: "Calculate loan repayments and interest"
  },
  {
    name: "Compound Interest Calculator",
    path: "/compound-interest-calculator",
    description: "Calculate compounding interest on investments"
  },
  {
    name: "Retirement Calculator",
    path: "/retirement-calculator",
    description: "Plan for retirement and calculate savings needed"
  }
];

const EmbedCodePage = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<string>("/stock-market-calculator");
  const [width, setWidth] = useState<string>("100%");
  const [height, setHeight] = useState<string>("600");
  const [copied, setCopied] = useState<boolean>(false);
  
  // Current site URL without trailing slash
  const siteUrl = window.location.origin;
  
  // Generate the embed code based on selected options
  const generateEmbedCode = () => {
    return `<iframe 
  src="${siteUrl}${selectedCalculator}?embed=true" 
  width="${width}" 
  height="${height}" 
  frameborder="0"
  title="Calculator by Stat1pet"
  style="border:none; max-width:100%;"
></iframe>`;
  };
  
  const handleCopyCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Embed code copied to clipboard!");
    
    // Reset copy button after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  const handleCalculatorChange = (value: string) => {
    setSelectedCalculator(value);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Embed Our Calculators</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Use our financial calculators on your website or blog to provide valuable tools to your readers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Embed Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Choose Calculator</label>
                    <Select value={selectedCalculator} onValueChange={handleCalculatorChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select calculator" />
                      </SelectTrigger>
                      <SelectContent>
                        {calculators.map((calc) => (
                          <SelectItem key={calc.path} value={calc.path}>
                            {calc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Width</label>
                    <Input 
                      value={width} 
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="100%"
                    />
                    <p className="text-xs text-gray-500">Use px or % (e.g. 500px or 100%)</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Height</label>
                    <Input 
                      value={height} 
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="600"
                    />
                    <p className="text-xs text-gray-500">Height in pixels (e.g. 600)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Embed Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                    <pre className="whitespace-pre-wrap break-all text-sm">
                      {generateEmbedCode()}
                    </pre>
                  </div>
                  
                  <Button 
                    onClick={handleCopyCode} 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckIcon size={18} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <CopyIcon size={18} />
                        Copy Code
                      </>
                    )}
                  </Button>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Preview</h3>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                      <iframe 
                        src={`${siteUrl}${selectedCalculator}?embed=true`}
                        width="100%" 
                        height="400" 
                        frameBorder="0"
                        title="Calculator Preview"
                      ></iframe>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 space-y-2">
                    <p>
                      <strong>Instructions:</strong> Copy the code above and paste it into your website or blog where you want the calculator to appear.
                    </p>
                    <p>
                      By embedding our calculators, you're providing valuable tools to your readers while also supporting our site. Thank you!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmbedCodePage;
