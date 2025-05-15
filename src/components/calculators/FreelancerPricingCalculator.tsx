
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
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { HandHelping, DollarSign, TrendingUp, TrendingDown, Fiverr, Upwork, HandCoins } from "lucide-react";

export const FreelancerPricingCalculator = () => {
  // Core pricing factors
  const [skillCategory, setSkillCategory] = useState<string>("web-development");
  const [yearsExperience, setYearsExperience] = useState<number>(2);
  const [marketPlace, setMarketPlace] = useState<string>("upwork");
  const [currentRate, setCurrentRate] = useState<number>(30);
  
  // Secondary factors
  const [portfolioQuality, setPortfolioQuality] = useState<number>(3);
  const [clientReviews, setClientReviews] = useState<number>(10);
  const [reviewScore, setReviewScore] = useState<number>(4.5);
  const [specialization, setSpecialization] = useState<boolean>(false);
  const [certifications, setCertifications] = useState<number>(1);
  
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  // Market rate data (average hourly rates by skill and experience)
  const marketRates = {
    "web-development": { base: 35, experienceMultiplier: 5 },
    "graphic-design": { base: 30, experienceMultiplier: 4 },
    "writing": { base: 25, experienceMultiplier: 3.5 },
    "marketing": { base: 40, experienceMultiplier: 6 },
    "video-editing": { base: 35, experienceMultiplier: 4.5 },
    "translation": { base: 25, experienceMultiplier: 3 },
    "data-analysis": { base: 40, experienceMultiplier: 6.5 },
    "virtual-assistant": { base: 20, experienceMultiplier: 2 },
    "software-development": { base: 45, experienceMultiplier: 7 },
    "finance": { base: 50, experienceMultiplier: 8 }
  };
  
  // Platform/marketplace data
  const platformData = {
    "upwork": { name: "Upwork", factor: 1.0, icon: Upwork },
    "fiverr": { name: "Fiverr", factor: 0.85, icon: Fiverr },
    "freelancer": { name: "Freelancer.com", factor: 0.9, icon: HandHelping },
    "direct": { name: "Direct Clients", factor: 1.2, icon: HandCoins }
  };

  const calculatePricing = () => {
    // Base market rate calculation based on skill and experience
    const skillData = marketRates[skillCategory as keyof typeof marketRates];
    const baseMarketRate = skillData.base + (yearsExperience * skillData.experienceMultiplier);
    
    // Adjust for platform
    const platformFactor = platformData[marketPlace as keyof typeof platformData].factor;
    let adjustedMarketRate = baseMarketRate * platformFactor;
    
    // Secondary factor adjustments
    // Portfolio quality (1-5 scale)
    const portfolioFactor = 0.9 + (portfolioQuality * 0.05);
    
    // Reviews impact
    let reviewsFactor = 1.0;
    if (clientReviews > 0) {
      // More reviews and higher scores increase rate potential
      const reviewQuantityImpact = Math.min(1.0, clientReviews / 20) * 0.1;
      const reviewQualityImpact = (reviewScore - 3) * 0.1;
      reviewsFactor = 1.0 + reviewQuantityImpact + reviewQualityImpact;
    }
    
    // Specialization premium
    const specializationFactor = specialization ? 1.15 : 1.0;
    
    // Certifications impact
    const certificationsFactor = 1.0 + (certifications * 0.03);
    
    // Calculate final recommended rate
    const recommendedRate = adjustedMarketRate * portfolioFactor * reviewsFactor * 
                          specializationFactor * certificationsFactor;
    
    // Calculate pricing confidence
    // Factors affecting confidence: years experience, reviews, portfolio quality
    const experienceConfidence = Math.min(100, yearsExperience * 10);
    const reviewsConfidence = Math.min(75, clientReviews * 5) + (Math.max(0, reviewScore - 3) * 25);
    const portfolioConfidence = portfolioQuality * 20;
    const avgConfidence = (experienceConfidence + reviewsConfidence + portfolioConfidence) / 3;
    
    // Determine pricing position
    const pricingDifference = ((recommendedRate - currentRate) / currentRate) * 100;
    let pricingPosition = "";
    let pricingSuggestion = "";
    
    if (pricingDifference <= -25) {
      pricingPosition = "Significantly Overpriced";
      pricingSuggestion = "Your rate is considerably higher than market average. Consider adjusting downward if you're struggling to find clients.";
    } else if (pricingDifference < -10) {
      pricingPosition = "Moderately Overpriced";
      pricingSuggestion = "You're charging a premium. Ensure your quality and delivery justifies this higher rate.";
    } else if (pricingDifference >= -10 && pricingDifference <= 10) {
      pricingPosition = "Market Rate";
      pricingSuggestion = "Your pricing is well-aligned with the market for your skills and experience.";
    } else if (pricingDifference <= 25) {
      pricingPosition = "Moderately Underpriced";
      pricingSuggestion = "You could potentially increase your rates by 10-15% without affecting client acquisition.";
    } else {
      pricingPosition = "Significantly Underpriced";
      pricingSuggestion = "You're leaving money on the table. Consider a phased rate increase for new clients.";
    }
    
    // Generate competitive strategy tips
    const strategies = [];
    
    if (portfolioQuality < 4) {
      strategies.push("Improve your portfolio with case studies demonstrating clear client outcomes");
    }
    
    if (yearsExperience < 3 && clientReviews < 15) {
      strategies.push("Focus on collecting more positive reviews, even if it means taking some strategic lower-paying projects");
    }
    
    if (!specialization) {
      strategies.push("Develop a specialization or niche to command higher rates (20-30% premium potential)");
    }
    
    if (marketPlace !== "direct" && avgConfidence > 60) {
      strategies.push("Begin transitioning to direct clients for better rates (potential 20%+ increase)");
    }
    
    if (certifications < 2 && (skillCategory === "software-development" || skillCategory === "data-analysis" || skillCategory === "finance")) {
      strategies.push("Obtain relevant industry certifications to boost credibility and earning potential");
    }
    
    // If they're already doing well
    if (strategies.length === 0) {
      strategies.push("Continue building your track record and transition to higher-value clients over time");
    }
    
    // Market benchmarks
    const marketBenchmarks = {
      beginner: Math.round(adjustedMarketRate * 0.7),
      average: Math.round(adjustedMarketRate),
      expert: Math.round(adjustedMarketRate * 1.4)
    };
    
    const results = {
      recommendedRate: Math.round(recommendedRate),
      currentRate,
      pricingDifference: pricingDifference.toFixed(1),
      pricingPosition,
      pricingSuggestion,
      confidence: Math.round(avgConfidence),
      strategies,
      marketBenchmarks
    };
    
    setResults(results);
    
    toast({
      title: "Pricing Analysis Complete",
      description: `Recommended rate: $${results.recommendedRate}/hr`,
    });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <HandHelping className="mr-2 text-primary" size={24} />
          Freelancer Pricing Confidence Calculator
        </CardTitle>
        <CardDescription>Analyze your rates against market benchmarks and get pricing guidance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="primary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="primary">Primary Factors</TabsTrigger>
            <TabsTrigger value="secondary">Secondary Factors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="primary" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skillCategory">Skill Category</Label>
                <Select
                  value={skillCategory}
                  onValueChange={setSkillCategory}
                >
                  <SelectTrigger id="skillCategory">
                    <SelectValue placeholder="Select your main skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="graphic-design">Graphic Design</SelectItem>
                    <SelectItem value="writing">Writing & Content Creation</SelectItem>
                    <SelectItem value="marketing">Digital Marketing</SelectItem>
                    <SelectItem value="video-editing">Video Editing</SelectItem>
                    <SelectItem value="translation">Translation</SelectItem>
                    <SelectItem value="data-analysis">Data Analysis</SelectItem>
                    <SelectItem value="virtual-assistant">Virtual Assistant</SelectItem>
                    <SelectItem value="software-development">Software Development</SelectItem>
                    <SelectItem value="finance">Finance & Accounting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearsExperience">Years of Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  min="0"
                  max="30"
                  step="0.5"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="marketPlace">Primary Marketplace</Label>
                <Select
                  value={marketPlace}
                  onValueChange={setMarketPlace}
                >
                  <SelectTrigger id="marketPlace">
                    <SelectValue placeholder="Select marketplace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upwork">Upwork</SelectItem>
                    <SelectItem value="fiverr">Fiverr</SelectItem>
                    <SelectItem value="freelancer">Freelancer.com</SelectItem>
                    <SelectItem value="direct">Direct Clients</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentRate">Your Current Hourly Rate ($)</Label>
                <Input
                  id="currentRate"
                  type="number"
                  min="5"
                  max="500"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(Number(e.target.value))}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="secondary" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Portfolio Quality</Label>
                  <span className="font-medium">{portfolioQuality}/5</span>
                </div>
                <Slider 
                  defaultValue={[3]} 
                  max={5} 
                  min={1}
                  step={1} 
                  value={[portfolioQuality]}
                  onValueChange={(values) => setPortfolioQuality(values[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Basic</span>
                  <span>Average</span>
                  <span>Premium</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientReviews">Number of Client Reviews</Label>
                <Input
                  id="clientReviews"
                  type="number"
                  min="0"
                  max="100"
                  value={clientReviews}
                  onChange={(e) => setClientReviews(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Average Review Score</Label>
                  <span className="font-medium">{reviewScore}/5</span>
                </div>
                <Slider 
                  defaultValue={[4.5]} 
                  max={5} 
                  min={1}
                  step={0.1} 
                  value={[reviewScore]}
                  onValueChange={(values) => setReviewScore(values[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="specialization"
                  checked={specialization}
                  onChange={(e) => setSpecialization(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-primary focus:ring-primary"
                />
                <Label htmlFor="specialization" className="cursor-pointer">
                  I have a specific niche or specialization
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="certifications">Relevant Certifications</Label>
                <Input
                  id="certifications"
                  type="number"
                  min="0"
                  max="10"
                  value={certifications}
                  onChange={(e) => setCertifications(Number(e.target.value))}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button onClick={calculatePricing} className="w-full">Analyze Pricing Confidence</Button>
        
        {results && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-secondary p-4 space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Your current rate</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-primary mr-0.5" />
                    <span className="text-xl font-semibold">${results.currentRate}/hr</span>
                  </div>
                </div>
                
                <div className="text-center px-2">
                  <span className="font-bold text-lg">vs.</span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Recommended rate</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-500 mr-0.5" />
                    <span className="text-xl font-bold">${results.recommendedRate}/hr</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-md flex items-center space-x-2"
                style={{
                  backgroundColor: 
                    results.pricingPosition === "Significantly Underpriced" ? "rgba(220, 38, 38, 0.1)" :
                    results.pricingPosition === "Moderately Underpriced" ? "rgba(245, 158, 11, 0.1)" :
                    results.pricingPosition === "Market Rate" ? "rgba(16, 185, 129, 0.1)" :
                    results.pricingPosition === "Moderately Overpriced" ? "rgba(59, 130, 246, 0.1)" :
                    "rgba(99, 102, 241, 0.1)"
                }}
              >
                {results.pricingDifference > 0 ? (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                ) : results.pricingDifference < 0 ? (
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                ) : (
                  <span className="h-5 w-5 flex items-center justify-center text-green-500">≈</span>
                )}
                
                <div>
                  <div className="font-medium">
                    {results.pricingPosition} 
                    {results.pricingDifference !== "0.0" && (
                      <span className="text-sm font-normal ml-1">
                        ({results.pricingDifference > 0 ? "+" : ""}{results.pricingDifference}%)
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{results.pricingSuggestion}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pricing Confidence</span>
                  <span className="font-medium">{results.confidence}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      results.confidence < 30 ? "bg-red-500" : 
                      results.confidence < 60 ? "bg-yellow-500" : 
                      results.confidence < 80 ? "bg-green-500" : "bg-green-600"
                    }`} 
                    style={{ width: `${results.confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on your experience, reviews, and portfolio quality
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <span className="text-sm font-medium">Market Benchmarks</span>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="p-2 bg-background rounded-md">
                    <div className="text-muted-foreground">Beginner</div>
                    <div className="font-medium">${results.marketBenchmarks.beginner}</div>
                  </div>
                  <div className="p-2 bg-background rounded-md">
                    <div className="text-muted-foreground">Average</div>
                    <div className="font-medium">${results.marketBenchmarks.average}</div>
                  </div>
                  <div className="p-2 bg-background rounded-md">
                    <div className="text-muted-foreground">Expert</div>
                    <div className="font-medium">${results.marketBenchmarks.expert}</div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <span className="text-sm font-medium">Competitive Strategies</span>
                <ul className="space-y-1">
                  {results.strategies.map((strategy: string, index: number) => (
                    <li key={index} className="text-sm flex">
                      <span className="text-primary mr-2">•</span>
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
