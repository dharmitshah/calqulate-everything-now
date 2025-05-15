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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Cpu, DollarSign, GanttChart, Brain } from "lucide-react";

export const AICostEstimator = () => {
  const [aiModel, setAiModel] = useState<string>("gpt-4o");
  const [tokensPerDay, setTokensPerDay] = useState<number>(100000);
  const [promptTokens, setPromptTokens] = useState<number>(1000);
  const [completionTokens, setCompletionTokens] = useState<number>(500);
  const [apiCalls, setApiCalls] = useState<number>(100);
  const [fineTunes, setFineTunes] = useState<number>(0);
  const [customModel, setCustomModel] = useState({
    name: "Custom",
    inputCost: 0.01,
    outputCost: 0.03
  });
  
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  // Model pricing (per 1000 tokens, in USD)
  const modelPricing = {
    "gpt-4o": { inputCost: 0.005, outputCost: 0.015 },
    "gpt-4o-mini": { inputCost: 0.0015, outputCost: 0.0045 },
    "gpt-4.5-preview": { inputCost: 0.01, outputCost: 0.03 },
    "gpt-4-turbo": { inputCost: 0.01, outputCost: 0.03 },
    "claude-3-opus": { inputCost: 0.015, outputCost: 0.075 },
    "claude-3-sonnet": { inputCost: 0.003, outputCost: 0.015 },
    "claude-3-haiku": { inputCost: 0.00125, outputCost: 0.00625 },
    "custom": { inputCost: customModel.inputCost, outputCost: customModel.outputCost }
  };
  
  const calculateCosts = () => {
    // Get the selected model's pricing
    const pricing = aiModel === "custom" 
      ? customModel 
      : modelPricing[aiModel as keyof typeof modelPricing];
    
    // Calculate costs based on tokens
    const dailyInputCost = (promptTokens * apiCalls) / 1000 * pricing.inputCost;
    const dailyOutputCost = (completionTokens * apiCalls) / 1000 * pricing.outputCost;
    const dailyCost = dailyInputCost + dailyOutputCost;
    
    // Monthly estimation (30 days)
    const monthlyCost = dailyCost * 30;
    
    // Fine-tuning costs (approximation - using GPT-4 rates)
    // Note: Actual fine-tuning costs vary significantly by model
    const fineTuningCost = fineTunes * (tokensPerDay / 1000) * 0.03;
    
    // Annual estimation
    const annualCost = (monthlyCost * 12) + fineTuningCost;
    
    // Calculate token statistics
    const totalMonthlyTokens = (promptTokens + completionTokens) * apiCalls * 30;
    const tokensPerDollar = totalMonthlyTokens / monthlyCost;
    
    // Generate optimizations
    const costBreakdown = {
      inputCost: parseFloat(dailyInputCost.toFixed(2)),
      outputCost: parseFloat(dailyOutputCost.toFixed(2)),
      ratio: parseFloat((dailyInputCost / (dailyInputCost + dailyOutputCost) * 100).toFixed(1))
    };
    
    // Calculate alternative model costs for comparison
    const alternativeCosts = {
      cheaper: null as { model: string; savings: number } | null,
      expensive: null as { model: string; difference: number } | null
    };
    
    // Find cheaper alternative
    let minCost = monthlyCost;
    let cheaperModel = "";
    
    Object.entries(modelPricing).forEach(([model, pricing]) => {
      if (model !== aiModel && model !== "custom") {
        const altInputCost = (promptTokens * apiCalls * 30) / 1000 * pricing.inputCost;
        const altOutputCost = (completionTokens * apiCalls * 30) / 1000 * pricing.outputCost;
        const altMonthlyCost = altInputCost + altOutputCost;
        
        if (altMonthlyCost < minCost) {
          minCost = altMonthlyCost;
          cheaperModel = model;
        }
      }
    });
    
    if (cheaperModel) {
      alternativeCosts.cheaper = {
        model: cheaperModel,
        savings: parseFloat((monthlyCost - minCost).toFixed(2))
      };
    }
    
    // Generate optimization tips
    let optimizationTips = [];
    
    // Tip 1: If input costs are high
    if (costBreakdown.ratio > 60) {
      optimizationTips.push("Your input costs are high relative to output. Consider using a tighter prompt or truncating inputs.");
    }
    
    // Tip 2: Consider a cheaper model if the savings are significant
    if (alternativeCosts.cheaper && alternativeCosts.cheaper.savings > monthlyCost * 0.3) {
      optimizationTips.push(`Switching to ${alternativeCosts.cheaper.model} could save approximately $${alternativeCosts.cheaper.savings.toFixed(2)} per month.`);
    }
    
    // Tip 3: API call batching
    if (apiCalls > 50) {
      optimizationTips.push("Consider batching API calls to reduce the number of requests while processing the same amount of data.");
    }
    
    // Tip 4: Token efficiency
    if (totalMonthlyTokens > 5000000) {
      optimizationTips.push("For large token volumes, consider using token compression techniques or implementing a caching strategy.");
    }
    
    if (optimizationTips.length === 0) {
      optimizationTips.push("Your current setup appears cost-efficient based on the provided information.");
    }
    
    const results = {
      dailyCost: parseFloat(dailyCost.toFixed(2)),
      monthlyCost: parseFloat(monthlyCost.toFixed(2)),
      annualCost: parseFloat(annualCost.toFixed(2)),
      fineTuningCost: parseFloat(fineTuningCost.toFixed(2)),
      totalMonthlyTokens,
      tokensPerDollar: parseFloat(tokensPerDollar.toFixed(0)),
      costBreakdown,
      alternativeCosts,
      optimizationTips
    };
    
    setResults(results);
    
    toast({
      title: "AI Cost Estimation Complete",
      description: `Estimated monthly cost: $${results.monthlyCost}`,
    });
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 text-primary" size={24} />
          AI Cost Estimator
        </CardTitle>
        <CardDescription>Calculate and optimize your AI API expenses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aiModel">AI Model</Label>
                <Select
                  value={aiModel}
                  onValueChange={setAiModel}
                >
                  <SelectTrigger id="aiModel">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                    <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                    <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                    <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                    <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                    <SelectItem value="custom">Custom Pricing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {aiModel === "custom" && (
                <div className="space-y-3 p-3 border rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor="customModelName">Custom Model Name</Label>
                    <Input
                      id="customModelName"
                      value={customModel.name}
                      onChange={(e) => setCustomModel({...customModel, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inputCost">Input Cost (per 1K tokens)</Label>
                    <Input
                      id="inputCost"
                      type="number"
                      min="0.0001"
                      step="0.0001"
                      value={customModel.inputCost}
                      onChange={(e) => setCustomModel({...customModel, inputCost: Number(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="outputCost">Output Cost (per 1K tokens)</Label>
                    <Input
                      id="outputCost"
                      type="number"
                      min="0.0001"
                      step="0.0001"
                      value={customModel.outputCost}
                      onChange={(e) => setCustomModel({...customModel, outputCost: Number(e.target.value)})}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="apiCalls">API Calls Per Day</Label>
                <Input
                  id="apiCalls"
                  type="number"
                  min="1"
                  value={apiCalls}
                  onChange={(e) => setApiCalls(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="promptTokens">Average Prompt Tokens (per call)</Label>
                <Input
                  id="promptTokens"
                  type="number"
                  min="1"
                  value={promptTokens}
                  onChange={(e) => setPromptTokens(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="completionTokens">Average Completion Tokens (per call)</Label>
                <Input
                  id="completionTokens"
                  type="number"
                  min="1"
                  value={completionTokens}
                  onChange={(e) => setCompletionTokens(Number(e.target.value))}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tokensPerDay">Fine-tuning Training Data (tokens)</Label>
                <Input
                  id="tokensPerDay"
                  type="number"
                  min="0"
                  step="1000"
                  value={tokensPerDay}
                  onChange={(e) => setTokensPerDay(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Only relevant if you plan to fine-tune models</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fineTunes">Number of Fine-tuning Runs (per year)</Label>
                <Input
                  id="fineTunes"
                  type="number"
                  min="0"
                  value={fineTunes}
                  onChange={(e) => setFineTunes(Number(e.target.value))}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button onClick={calculateCosts} className="w-full">Calculate Costs</Button>
        
        {results && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-secondary p-4 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1 text-center p-2 bg-background rounded-md">
                  <span className="text-sm text-muted-foreground">Daily</span>
                  <div className="flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-primary mr-0.5" />
                    <span className="text-xl font-bold">{results.dailyCost}</span>
                  </div>
                </div>
                
                <div className="space-y-1 text-center p-2 bg-background rounded-md">
                  <span className="text-sm text-muted-foreground">Monthly</span>
                  <div className="flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-primary mr-0.5" />
                    <span className="text-xl font-bold">{results.monthlyCost}</span>
                  </div>
                </div>
                
                <div className="space-y-1 text-center p-2 bg-background rounded-md">
                  <span className="text-sm text-muted-foreground">Annual</span>
                  <div className="flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-primary mr-0.5" />
                    <span className="text-xl font-bold">{results.annualCost}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <span className="text-sm font-medium">Usage Statistics</span>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly tokens processed:</span>
                  <div className="flex items-center">
                    <GanttChart className="h-4 w-4 text-primary mr-1" />
                    <span>{(results.totalMonthlyTokens / 1000000).toFixed(2)}M</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tokens per dollar:</span>
                  <span>{results.tokensPerDollar.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Input/output cost ratio:</span>
                  <span>{results.costBreakdown.ratio}% / {(100 - results.costBreakdown.ratio).toFixed(1)}%</span>
                </div>
                
                {results.fineTuningCost > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Annual fine-tuning cost:</span>
                    <span>${results.fineTuningCost}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <span className="text-sm font-medium">Cost Optimization Tips</span>
                <ul className="space-y-2 mt-2">
                  {results.optimizationTips.map((tip: string, index: number) => (
                    <li key={index} className="text-sm flex">
                      <span className="text-primary mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {results.alternativeCosts.cheaper && (
                <div className="p-3 bg-primary/10 rounded-md">
                  <div className="flex items-center">
                    <Cpu className="h-4 w-4 text-primary mr-2" />
                    <span className="font-medium">Cost-saving alternative:</span>
                  </div>
                  <p className="text-sm mt-1">
                    Switch to {results.alternativeCosts.cheaper.model} to save approximately ${results.alternativeCosts.cheaper.savings} per month.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
