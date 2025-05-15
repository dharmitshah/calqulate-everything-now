
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
import { Cpu, DollarSign, GanttChart, Brain, TrendingDown, BarChart, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AICostEstimator = () => {
  const [aiModel, setAiModel] = useState<string>("gpt-4o");
  const [tokensPerDay, setTokensPerDay] = useState<number>(100000);
  const [promptTokens, setPromptTokens] = useState<number>(1000);
  const [completionTokens, setCompletionTokens] = useState<number>(500);
  const [apiCalls, setApiCalls] = useState<number>(100);
  const [fineTunes, setFineTunes] = useState<number>(0);
  const [useCase, setUseCase] = useState<string>("chatbot");
  const [customModel, setCustomModel] = useState({
    name: "Custom",
    inputCost: 0.01,
    outputCost: 0.03
  });
  
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  // Model pricing (per 1000 tokens, in USD) - Updated with more accurate pricing
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
  
  // Common use cases performance characteristics
  const useCases = {
    "chatbot": { 
      promptRatio: 0.4,       // percentage of total tokens that are prompts
      compressionPotential: 0.3,  // potential reduction through compression
      cachingBenefit: 0.25,    // potential reduction through caching
      batchingBenefit: 0.1,    // potential reduction through batching
      description: "Interactive chatbots respond to varied user queries"
    },
    "content-generation": { 
      promptRatio: 0.2,
      compressionPotential: 0.15,
      cachingBenefit: 0.1,
      batchingBenefit: 0.3,
      description: "Creating marketing, blog posts, or creative content"
    },
    "data-analysis": { 
      promptRatio: 0.6,
      compressionPotential: 0.4,
      cachingBenefit: 0.5,
      batchingBenefit: 0.4,
      description: "Processing and analyzing structured or unstructured data"
    },
    "coding-assistant": { 
      promptRatio: 0.5,
      compressionPotential: 0.25,
      cachingBenefit: 0.3,
      batchingBenefit: 0.2,
      description: "Code generation, review, or debugging assistance"
    },
    "customer-support": { 
      promptRatio: 0.3,
      compressionPotential: 0.2,
      cachingBenefit: 0.6,
      batchingBenefit: 0.15,
      description: "Handling customer inquiries and support requests"
    },
    "custom": { 
      promptRatio: 0.5,
      compressionPotential: 0.25,
      cachingBenefit: 0.25,
      batchingBenefit: 0.25,
      description: "Custom use case with default parameters"
    }
  };
  
  const calculateCosts = () => {
    // Get the selected model's pricing
    const pricing = aiModel === "custom" 
      ? customModel 
      : modelPricing[aiModel as keyof typeof modelPricing];
    
    // Get use case characteristics
    const usePattern = useCases[useCase as keyof typeof useCases];
    
    // Calculate total tokens per API call with dynamic ratio based on use case
    const totalTokensPerCall = promptTokens + completionTokens;
    const calculatedPromptTokens = useCase !== "custom" ? 
      totalTokensPerCall * usePattern.promptRatio :
      promptTokens;
      
    const calculatedCompletionTokens = useCase !== "custom" ?
      totalTokensPerCall * (1 - usePattern.promptRatio) :
      completionTokens;
    
    // Calculate costs based on tokens
    const dailyInputCost = (calculatedPromptTokens * apiCalls) / 1000 * pricing.inputCost;
    const dailyOutputCost = (calculatedCompletionTokens * apiCalls) / 1000 * pricing.outputCost;
    const dailyCost = dailyInputCost + dailyOutputCost;
    
    // Monthly estimation (30 days)
    const monthlyCost = dailyCost * 30;
    
    // Yearly estimation (365 days)
    const yearlyCost = dailyCost * 365;
    
    // Optimized costs estimates
    const compressionSavings = monthlyCost * usePattern.compressionPotential;
    const cachingSavings = monthlyCost * usePattern.cachingBenefit;
    const batchingSavings = monthlyCost * usePattern.batchingBenefit;
    
    // Generate combined optimized approach with diminishing returns
    // (can't get 100% of each saving technique due to overlap)
    const combinedOptimizationFactor = 1 - (
      (1 - usePattern.compressionPotential * 0.9) * 
      (1 - usePattern.cachingBenefit * 0.7) * 
      (1 - usePattern.batchingBenefit * 0.8)
    );
    
    const optimizedMonthlyCost = monthlyCost * (1 - combinedOptimizationFactor);
    const monthlyOptimizationSavings = monthlyCost - optimizedMonthlyCost;
    
    // Fine-tuning costs (approximation - using more precise modeling)
    const fineTuningCost = fineTunes * (tokensPerDay / 1000) * 0.008; // Updated rate
    
    // Fine-tuning ROI calculation
    // A fine-tuned model can often reduce input token count significantly
    const fineTuningInputReduction = 0.7; // 70% reduction in input tokens
    const monthlyTokensBeforeFineTuning = (calculatedPromptTokens + calculatedCompletionTokens) * apiCalls * 30;
    const monthlyTokensAfterFineTuning = (calculatedPromptTokens * (1-fineTuningInputReduction) + calculatedCompletionTokens) * apiCalls * 30;
    const monthlySavingsFromFineTuning = (
      (monthlyTokensBeforeFineTuning - monthlyTokensAfterFineTuning) / 1000 * pricing.inputCost
    );
    const fineTuningROI = fineTuningCost > 0 ? 
      (monthlySavingsFromFineTuning * 12) / fineTuningCost : 0;
    const fineTuningBreakEvenMonths = monthlySavingsFromFineTuning > 0 ? 
      fineTuningCost / monthlySavingsFromFineTuning : 0;
    
    // Annual estimation with optimization and fine-tuning
    const annualCostWithOptimization = (optimizedMonthlyCost * 12) + fineTuningCost;
    const annualSavingsWithOptimization = yearlyCost - annualCostWithOptimization;
    
    // Calculate token statistics
    const totalMonthlyTokens = (calculatedPromptTokens + calculatedCompletionTokens) * apiCalls * 30;
    const tokensPerDollar = monthlyCost > 0 ? totalMonthlyTokens / monthlyCost : 0;
    
    // Generate optimizations
    const costBreakdown = {
      inputCost: parseFloat(dailyInputCost.toFixed(2)),
      outputCost: parseFloat(dailyOutputCost.toFixed(2)),
      ratio: parseFloat((dailyInputCost / (dailyInputCost + dailyOutputCost) * 100).toFixed(1))
    };
    
    // Calculate scaling costs for strategic planning
    // Exponential scaling curve - costs don't scale linearly as volume increases
    const scaleFactors = [1, 10, 100];
    const scalingCosts = scaleFactors.map(factor => {
      // Economy of scale discount factors
      const volumeDiscountFactor = factor === 1 ? 1 : factor === 10 ? 0.9 : 0.8;
      return {
        scale: `${factor}x`,
        apiCalls: apiCalls * factor,
        monthlyCost: (monthlyCost * factor * volumeDiscountFactor).toFixed(2),
        optimizedCost: (optimizedMonthlyCost * factor * volumeDiscountFactor).toFixed(2)
      };
    });
    
    // Calculate alternative model costs for comparison
    const modelComparisons = [];
    
    Object.entries(modelPricing).forEach(([model, pricing]) => {
      if (model !== aiModel && model !== "custom") {
        const altInputCost = (calculatedPromptTokens * apiCalls * 30) / 1000 * pricing.inputCost;
        const altOutputCost = (calculatedCompletionTokens * apiCalls * 30) / 1000 * pricing.outputCost;
        const altMonthlyCost = altInputCost + altOutputCost;
        
        modelComparisons.push({
          model: model,
          monthlyCost: parseFloat(altMonthlyCost.toFixed(2)),
          difference: parseFloat((monthlyCost - altMonthlyCost).toFixed(2)),
          percentDifference: parseFloat(((monthlyCost - altMonthlyCost) / monthlyCost * 100).toFixed(1))
        });
      }
    });
    
    // Sort by cost (ascending)
    modelComparisons.sort((a, b) => a.monthlyCost - b.monthlyCost);
    
    // Find cheaper alternative
    const cheaperAlternative = modelComparisons.find(model => model.difference > 0);
    
    // Generate optimization tips
    let optimizationTips = [];
    
    // Tip 1: Based on input/output ratio
    if (costBreakdown.ratio > 60) {
      optimizationTips.push({
        title: "Optimize Input Tokens",
        description: "Your input costs are high ("+costBreakdown.ratio+"% of total). Consider truncating, summarizing, or compressing your prompts.",
        impact: "High",
        savings: parseFloat((compressionSavings).toFixed(2))
      });
    } else if (costBreakdown.ratio < 30) {
      optimizationTips.push({
        title: "Limit Output Generation",
        description: "Your output costs dominate your expenses. Try specifying maximum token limits or requesting more concise responses.",
        impact: "High",
        savings: parseFloat((dailyOutputCost * 0.3 * 30).toFixed(2))
      });
    }
    
    // Tip 2: Based on use case
    if (usePattern.cachingBenefit > 0.4) {
      optimizationTips.push({
        title: "Implement Caching",
        description: "Your use case would benefit significantly from caching common queries and responses.",
        impact: "Medium",
        savings: parseFloat(cachingSavings.toFixed(2))
      });
    }
    
    if (usePattern.batchingBenefit > 0.3) {
      optimizationTips.push({
        title: "Batch Requests",
        description: "Process multiple inputs in a single API call to reduce overhead and improve throughput.",
        impact: "Medium",
        savings: parseFloat(batchingSavings.toFixed(2))
      });
    }
    
    // Tip 3: Consider cheaper model if the savings are significant
    if (cheaperAlternative && cheaperAlternative.percentDifference > 30) {
      optimizationTips.push({
        title: "Switch to " + cheaperAlternative.model,
        description: `Save ${cheaperAlternative.percentDifference}% by using ${cheaperAlternative.model} which may offer sufficient quality for your needs.`,
        impact: "High",
        savings: parseFloat(cheaperAlternative.difference.toFixed(2))
      });
    }
    
    // Tip 4: Fine-tuning ROI
    if (fineTuningROI > 2 && apiCalls > 50) {
      optimizationTips.push({
        title: "Fine-tune Model",
        description: `Fine-tuning could provide ${fineTuningROI.toFixed(1)}x ROI with break-even in ${fineTuningBreakEvenMonths.toFixed(1)} months.`,
        impact: "High",
        savings: parseFloat((monthlySavingsFromFineTuning).toFixed(2))
      });
    }
    
    // Sort tips by savings potential (descending)
    optimizationTips.sort((a, b) => b.savings - a.savings);
    
    // Calculate highest potential monthly savings
    const potentialMonthlySavings = monthlyOptimizationSavings + 
      (fineTuningBreakEvenMonths > 0 && fineTuningBreakEvenMonths <= 12 ? monthlySavingsFromFineTuning : 0);
    
    // Generate AI usage tier
    let costTier = "";
    if (monthlyCost < 50) costTier = "Minimal";
    else if (monthlyCost < 500) costTier = "Moderate";
    else if (monthlyCost < 5000) costTier = "Significant";
    else costTier = "Enterprise";
    
    const results = {
      dailyCost: parseFloat(dailyCost.toFixed(2)),
      monthlyCost: parseFloat(monthlyCost.toFixed(2)),
      yearlyCost: parseFloat(yearlyCost.toFixed(2)),
      optimizedMonthlyCost: parseFloat(optimizedMonthlyCost.toFixed(2)),
      potentialMonthlySavings: parseFloat(potentialMonthlySavings.toFixed(2)),
      annualSavingsWithOptimization: parseFloat(annualSavingsWithOptimization.toFixed(2)),
      fineTuningCost: parseFloat(fineTuningCost.toFixed(2)),
      fineTuningROI: parseFloat(fineTuningROI.toFixed(1)),
      fineTuningBreakEvenMonths: parseFloat(fineTuningBreakEvenMonths.toFixed(1)),
      totalMonthlyTokens,
      tokensPerDollar: parseFloat(tokensPerDollar.toFixed(0)),
      costBreakdown,
      scalingCosts,
      modelComparisons,
      optimizationTips,
      costTier
    };
    
    setResults(results);
    
    toast({
      title: "AI Cost Analysis Complete",
      description: `Potential savings: $${results.potentialMonthlySavings}/month with optimizations`,
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
              
              <div className="space-y-2">
                <Label htmlFor="useCase">Primary Use Case</Label>
                <Select
                  value={useCase}
                  onValueChange={setUseCase}
                >
                  <SelectTrigger id="useCase">
                    <SelectValue placeholder="Select use case" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chatbot">Chatbot / Assistant</SelectItem>
                    <SelectItem value="content-generation">Content Generation</SelectItem>
                    <SelectItem value="data-analysis">Data Analysis</SelectItem>
                    <SelectItem value="coding-assistant">Coding Assistant</SelectItem>
                    <SelectItem value="customer-support">Customer Support</SelectItem>
                    <SelectItem value="custom">Custom Use Case</SelectItem>
                  </SelectContent>
                </Select>
                {useCase !== "custom" && (
                  <p className="text-xs text-muted-foreground">{useCases[useCase as keyof typeof useCases]?.description}</p>
                )}
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
              
              {useCase === "custom" && (
                <>
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
                </>
              )}
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
              
              {useCase !== "custom" && (
                <div className="p-3 bg-muted/40 rounded-md space-y-3">
                  <h3 className="text-sm font-medium">Use Case Parameters</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Prompt/completion ratio:</span>
                      <span className="font-medium">{(useCases[useCase as keyof typeof useCases].promptRatio * 100).toFixed(0)}%/{((1-useCases[useCase as keyof typeof useCases].promptRatio) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Compression potential:</span>
                      <span className="font-medium">{(useCases[useCase as keyof typeof useCases].compressionPotential * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Caching benefit:</span>
                      <span className="font-medium">{(useCases[useCase as keyof typeof useCases].cachingBenefit * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Batching benefit:</span>
                      <span className="font-medium">{(useCases[useCase as keyof typeof useCases].batchingBenefit * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <Button onClick={calculateCosts} className="w-full">Calculate Costs</Button>
        
        {results && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-gradient-to-br from-secondary to-secondary/70 p-4 space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                  Cost Analysis ({results.costTier} Usage Tier)
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-background rounded-md p-3 text-center">
                    <p className="text-xs text-muted-foreground">Daily</p>
                    <p className="text-xl font-bold">${results.dailyCost}</p>
                  </div>
                  
                  <div className="bg-background rounded-md p-3 text-center">
                    <p className="text-xs text-muted-foreground">Monthly</p>
                    <p className="text-xl font-bold">${results.monthlyCost}</p>
                  </div>
                  
                  <div className="bg-background rounded-md p-3 text-center">
                    <p className="text-xs text-muted-foreground">Annual</p>
                    <p className="text-xl font-bold">${results.yearlyCost}</p>
                  </div>
                </div>
                
                <div className="p-3 bg-primary/10 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Potential Savings</span>
                    <div className="flex items-center space-x-1">
                      <TrendingDown className="h-4 w-4 text-green-500" />
                      <span className="font-bold">${results.potentialMonthlySavings}/month</span>
                    </div>
                  </div>
                  
                  <div className="h-2.5 bg-background rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-300 to-green-500"
                      style={{ width: `${Math.min(100, (results.potentialMonthlySavings/results.monthlyCost) * 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Current: ${results.monthlyCost}/mo</span>
                    <span>Optimized: ${results.optimizedMonthlyCost}/mo</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <GanttChart className="h-5 w-5 text-blue-500 mr-2" />
                  Usage Statistics
                </h3>
                
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Monthly Tokens</TableCell>
                      <TableCell className="text-right">{(results.totalMonthlyTokens / 1000000).toFixed(2)}M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tokens per $1</TableCell>
                      <TableCell className="text-right">{results.tokensPerDollar.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Input/Output Ratio</TableCell>
                      <TableCell className="text-right">{results.costBreakdown.ratio}% / {(100 - results.costBreakdown.ratio).toFixed(1)}%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="bg-background p-3 rounded-md">
                  <p className="text-sm font-medium mb-2">Cost Breakdown</p>
                  <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/70" style={{ width: `${results.costBreakdown.ratio}%` }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span>Input: ${results.costBreakdown.inputCost}/day</span>
                    <span>Output: ${results.costBreakdown.outputCost}/day</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <Cpu className="h-5 w-5 text-purple-500 mr-2" />
                  Model Comparisons
                </h3>
                
                <div className="max-h-40 overflow-y-auto pr-1">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead>Monthly Cost</TableHead>
                        <TableHead>Difference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.modelComparisons.map((comparison: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{comparison.model}</TableCell>
                          <TableCell>${comparison.monthlyCost}</TableCell>
                          <TableCell className={comparison.difference > 0 ? "text-green-500" : "text-red-500"}>
                            {comparison.difference > 0 ? "-" : "+"}${Math.abs(comparison.difference)}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({comparison.difference > 0 ? "-" : "+"}
                              {Math.abs(comparison.percentDifference)}%)
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
                  Scaling Projection
                </h3>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Scale</TableHead>
                      <TableHead>API Calls</TableHead>
                      <TableHead>Monthly Cost</TableHead>
                      <TableHead>With Optimization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.scalingCosts.map((scale: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{scale.scale}</TableCell>
                        <TableCell>{scale.apiCalls}/day</TableCell>
                        <TableCell>${scale.monthlyCost}</TableCell>
                        <TableCell className="text-green-500">${scale.optimizedCost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                  Optimization Opportunities
                </h3>
                
                <div className="space-y-3">
                  {results.optimizationTips.map((tip: any, index: number) => (
                    <div key={index} className="p-3 bg-background rounded-md">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          {tip.impact === "High" ? (
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          )}
                          <span className="font-medium">{tip.title}</span>
                        </div>
                        <div className="text-green-500 font-semibold">-${tip.savings}/mo</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                    </div>
                  ))}
                </div>
                
                {results.fineTuningCost > 0 && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md">
                    <div className="flex items-center mb-1">
                      <Brain className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium">Fine-tuning Analysis</span>
                    </div>
                    <p className="text-sm">
                      Cost: ${results.fineTuningCost}, ROI: {results.fineTuningROI}x,
                      Break-even: {results.fineTuningBreakEvenMonths} months
                    </p>
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
