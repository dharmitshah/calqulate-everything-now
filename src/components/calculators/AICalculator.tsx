import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Loader2, Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AIResult {
  result: string;
  steps: string[];
  explanation: string;
}

const AICalculator = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<AIResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const exampleQueries = [
    "What is 15% of 250?",
    "Calculate compound interest on $1000 at 5% for 3 years",
    "If I drive 150 miles at 60 mph, how long will it take?",
    "Convert 72°F to Celsius",
    "What's the area of a circle with radius 5?",
    "Calculate the tip on $85 at 18%"
  ];

  const handleCalculate = async () => {
    if (!query.trim()) {
      toast.error("Please enter a calculation query");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('api-ai-calculator', {
        body: { query: query.trim() }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        if (data.error.includes("Rate limit") || data.error.includes("429")) {
          toast.error("Rate limit exceeded. Please try again in a moment.");
        } else if (data.error.includes("Payment") || data.error.includes("402")) {
          toast.error("Service temporarily unavailable. Please try again later.");
        } else {
          throw new Error(data.error);
        }
        return;
      }

      setResult(data);
      toast.success("Calculation complete!");
    } catch (error: any) {
      console.error("AI Calculator error:", error);
      toast.error(error.message || "Failed to process calculation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result.result);
      setCopied(true);
      toast.success("Result copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
            <Brain className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl">AI Calculator</CardTitle>
        <CardDescription>
          Ask any math question in plain English and get step-by-step solutions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Query Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Your Question</label>
          <Textarea
            placeholder="Type your math question here... e.g., 'What is 25% of 180?'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCalculate();
              }
            }}
          />
        </div>

        {/* Example Queries */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Try these examples:</label>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleExampleClick(example)}
                className="text-xs"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={handleCalculate}
          disabled={isLoading || !query.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Calculate with AI
            </>
          )}
        </Button>

        {/* Result Display */}
        {result && (
          <div className="space-y-4 pt-4 border-t">
            {/* Main Result */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Answer</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyResult}
                  className="h-8 px-2"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary">{result.result}</p>
            </div>

            {/* Steps */}
            {result.steps && result.steps.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <span className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">📝</span>
                  Step-by-Step Solution
                </h4>
                <ol className="space-y-2 pl-4">
                  {result.steps.map((step, index) => (
                    <li key={index} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Explanation */}
            {result.explanation && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <span className="p-1 bg-green-100 dark:bg-green-900/30 rounded">💡</span>
                  Explanation
                </h4>
                <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                  {result.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AICalculator;
