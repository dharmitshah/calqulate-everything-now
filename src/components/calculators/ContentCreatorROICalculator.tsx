import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, DollarSign, Clock, Briefcase, BarChart, Users, Medal, AlertCircle, CheckCircle } from "lucide-react";

export const ContentCreatorROICalculator = () => {
  const [platform, setPlatform] = useState<string>("youtube");
  const [contentHours, setContentHours] = useState<number>(5);
  const [editingHours, setEditingHours] = useState<number>(3);
  const [researchHours, setResearchHours] = useState<number>(2);
  const [marketingHours, setMarketingHours] = useState<number>(1);
  
  const [views, setViews] = useState<number>(1000);
  const [subscribers, setSubscribers] = useState<number>(100);
  const [cpm, setCpm] = useState<number>(2);
  const [sponsorships, setSponsorships] = useState<number>(0);
  const [affiliateRevenue, setAffiliateRevenue] = useState<number>(0);
  const [experienceLevel, setExperienceLevel] = useState<string>("beginner");
  const [contentCategory, setContentCategory] = useState<string>("entertainment");
  
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const platformData = {
    youtube: {
      name: "YouTube",
      avgCpm: 2.5,
      sponsorRates: {
        micro: 200, // <1K
        small: 500, // 1-10K
        medium: 2000, // 10-100K
        large: 10000 // >100K
      },
      growth: {
        slow: 1.01,    // 1% monthly
        average: 1.03, // 3% monthly
        fast: 1.05     // 5% monthly
      },
      timeToRevenue: 3 // months to reach monetization threshold
    },
    tiktok: {
      name: "TikTok",
      avgCpm: 0.03,
      sponsorRates: {
        micro: 100,
        small: 300,
        medium: 1000,
        large: 5000
      },
      growth: {
        slow: 1.03,
        average: 1.05,
        fast: 1.1
      },
      timeToRevenue: 1
    },
    instagram: {
      name: "Instagram",
      avgCpm: 0.01,
      sponsorRates: {
        micro: 150,
        small: 400,
        medium: 1500,
        large: 8000
      },
      growth: {
        slow: 1.02,
        average: 1.04,
        fast: 1.07
      },
      timeToRevenue: 2
    }
  };
  
  const categoryData = {
    entertainment: {
      name: "Entertainment",
      cpmMultiplier: 1.0,
      sponsorPotential: 1.0,
      affiliatePotential: 0.8,
      timeMultiplier: 1.0
    },
    finance: {
      name: "Finance",
      cpmMultiplier: 1.5,
      sponsorPotential: 1.4,
      affiliatePotential: 1.3,
      timeMultiplier: 1.2
    },
    gaming: {
      name: "Gaming",
      cpmMultiplier: 1.2,
      sponsorPotential: 1.3,
      affiliatePotential: 1.0,
      timeMultiplier: 0.9
    },
    tech: {
      name: "Technology",
      cpmMultiplier: 1.4,
      sponsorPotential: 1.3,
      affiliatePotential: 1.4,
      timeMultiplier: 1.1
    },
    beauty: {
      name: "Beauty & Fashion",
      cpmMultiplier: 1.3,
      sponsorPotential: 1.5,
      affiliatePotential: 1.5,
      timeMultiplier: 1.0
    },
    education: {
      name: "Education",
      cpmMultiplier: 1.1,
      sponsorPotential: 0.9,
      affiliatePotential: 0.8,
      timeMultiplier: 1.3
    },
    health: {
      name: "Health & Fitness",
      cpmMultiplier: 1.2,
      sponsorPotential: 1.2,
      affiliatePotential: 1.3,
      timeMultiplier: 1.0
    }
  };

  const calculateROI = () => {
    // Get platform-specific data
    const platformInfo = platformData[platform as keyof typeof platformData];
    const category = categoryData[contentCategory as keyof typeof categoryData];
    
    // Calculate total hours spent
    const totalHours = contentHours + editingHours + researchHours + marketingHours;
    
    // Determine subscriber tier for sponsorship rates
    let tier = "micro";
    if (subscribers >= 100000) tier = "large";
    else if (subscribers >= 10000) tier = "medium";
    else if (subscribers >= 1000) tier = "small";
    
    // Experience level multiplier for effectiveness
    const experienceMultiplier = 
      experienceLevel === "beginner" ? 0.7 : 
      experienceLevel === "intermediate" ? 1.0 : 1.3;
    
    // Calculate adjusted CPM based on platform, category, and experience
    const adjustedCPM = 
      (platform === "custom" ? cpm : platformInfo.avgCpm) * 
      category.cpmMultiplier * 
      experienceMultiplier;
    
    // Ad revenue calculations with more realistic engagement factors
    // Considering view to subscriber ratio, watch time, etc.
    const watchTimeMultiplier = 0.7 + (experienceMultiplier * 0.3); // Higher for experienced creators
    const adRevenue = (views / 1000) * adjustedCPM * watchTimeMultiplier;
    
    // Calculate sponsor value with category and experience adjustments
    const sponsorValue = sponsorships * 
      (platform === "custom" ? (subscribers > 10000 ? 1000 : subscribers > 1000 ? 300 : 100) : 
      platformInfo.sponsorRates[tier as keyof typeof platformInfo.sponsorRates]) * 
      category.sponsorPotential * 
      experienceMultiplier;
    
    // Adjust affiliate revenue based on category and experience
    const adjustedAffiliateRevenue = 
      affiliateRevenue * 
      category.affiliatePotential * 
      experienceMultiplier;
    
    // Total revenue calculation
    const totalRevenue = adRevenue + sponsorValue + adjustedAffiliateRevenue;
    
    // Calculate hourly rate
    const hourlyRate = totalHours > 0 ? totalRevenue / totalHours : 0;
    
    // Calculate adjusted hourly rate considering opportunity costs
    // Based on category and experience (some content requires more specialized knowledge)
    const opportunityCost = 
      experienceLevel === "beginner" ? 15 : 
      experienceLevel === "intermediate" ? 25 : 40;
    
    const adjustedHourlyRate = totalHours > 0 ? 
      (totalRevenue - (totalHours * opportunityCost)) / totalHours : 0;
    
    // Calculate efficiency score (0-100) with more factors
    // Based on revenue per view, time invested, and subscriber growth potential
    const viewEfficiency = views > 0 ? (totalRevenue / views) * 1000 : 0; // Revenue per 1000 views
    const timeEfficiency = totalHours > 0 ? totalRevenue / totalHours : 0; // Revenue per hour
    const subscriberEfficiency = subscribers > 0 ? views / subscribers : 0; // Views per subscriber (engagement)
    
    // Normalized efficiency (0-100)
    let normalizedEfficiency = Math.min(100, Math.max(0, 
      (viewEfficiency * 5) + 
      (timeEfficiency * 3) + 
      (subscriberEfficiency * 2)
    ));
    
    // Calculate content value density (revenue per minute of content)
    const contentMinutes = contentHours * 60;
    const contentValueDensity = contentMinutes > 0 ? totalRevenue / contentMinutes : 0;
    
    // ROI calculation with more comprehensive factors
    const timeInvestmentValue = totalHours * opportunityCost;
    const equipmentCostPerVideo = 
      experienceLevel === "beginner" ? 10 : 
      experienceLevel === "intermediate" ? 25 : 50;
    
    const totalInvestment = timeInvestmentValue + equipmentCostPerVideo;
    
    const roi = totalInvestment > 0 ? 
      ((totalRevenue - totalInvestment) / totalInvestment) * 100 : 0;
    
    // Calculate growth projections
    const growthRate = 
      experienceLevel === "beginner" ? platformInfo.growth.slow : 
      experienceLevel === "intermediate" ? platformInfo.growth.average : 
      platformInfo.growth.fast;
    
    const projections = [];
    let projectedRevenue = totalRevenue;
    let projectedSubscribers = subscribers;
    let projectedViews = views;
    
    for (let i = 1; i <= 12; i++) {
      projectedSubscribers = Math.round(projectedSubscribers * growthRate);
      projectedViews = Math.round(projectedViews * growthRate);
      
      // Recalculate with growing audience
      const projectedTier = 
        projectedSubscribers >= 100000 ? "large" :
        projectedSubscribers >= 10000 ? "medium" :
        projectedSubscribers >= 1000 ? "small" : "micro";
      
      const projectedAdRevenue = (projectedViews / 1000) * adjustedCPM * watchTimeMultiplier;
      
      const projectedSponsorValue = sponsorships * 
        (platform === "custom" ? (projectedSubscribers > 10000 ? 1000 : projectedSubscribers > 1000 ? 300 : 100) : 
        platformInfo.sponsorRates[projectedTier as keyof typeof platformInfo.sponsorRates]) * 
        category.sponsorPotential * 
        experienceMultiplier;
      
      // Affiliate growth is typically slower than direct audience growth
      const affiliateGrowthRate = 1 + ((growthRate - 1) * 0.7);
      const projectedAffiliateRevenue = adjustedAffiliateRevenue * Math.pow(affiliateGrowthRate, i);
      
      projectedRevenue = projectedAdRevenue + projectedSponsorValue + projectedAffiliateRevenue;
      
      projections.push({
        month: i,
        subscribers: projectedSubscribers,
        views: projectedViews,
        revenue: projectedRevenue
      });
    }
    
    // Calculate breakeven point (months)
    const monthlyContent = 4; // Assume weekly content
    const monthlyInvestment = (totalHours * opportunityCost * monthlyContent) + (equipmentCostPerVideo * monthlyContent);
    const breakevenMonths = monthlyInvestment > 0 ? 
      timeInvestmentValue / (projections[0].revenue * monthlyContent) : 0;
    
    // Revenue breakdown
    const revenueBreakdown = {
      adRevenue: parseFloat(adRevenue.toFixed(2)),
      sponsorRevenue: parseFloat(sponsorValue.toFixed(2)),
      affiliateRevenue: parseFloat(adjustedAffiliateRevenue.toFixed(2))
    };
    
    // Time breakdown - where time is most effectively spent
    const timeEffectivenessRatios = {
      content: contentHours > 0 ? totalRevenue / contentHours : 0,
      editing: editingHours > 0 ? totalRevenue / editingHours : 0,
      research: researchHours > 0 ? totalRevenue / researchHours : 0,
      marketing: marketingHours > 0 ? totalRevenue / marketingHours : 0
    };
    
    // Find most and least effective time investments
    const timeRatios = Object.entries(timeEffectivenessRatios);
    timeRatios.sort((a, b) => b[1] - a[1]);
    const mostEffectiveTime = timeRatios[0];
    const leastEffectiveTime = timeRatios[timeRatios.length - 1];
    
    // Compare to industry benchmarks
    const industryBenchmarks = {
      hourlyRate: {
        beginner: 10,
        intermediate: 30,
        expert: 75
      },
      roi: {
        beginner: -20,
        intermediate: 30,
        expert: 100
      }
    };
    
    const benchmarkHourlyRate = industryBenchmarks.hourlyRate[experienceLevel as keyof typeof industryBenchmarks.hourlyRate];
    const benchmarkROI = industryBenchmarks.roi[experienceLevel as keyof typeof industryBenchmarks.roi];
    
    const hourlyRateComparison = hourlyRate - benchmarkHourlyRate;
    const roiComparison = roi - benchmarkROI;
    
    // Generate personalized recommendation
    let recommendation = "";
    let performanceInsights = [];
    
    // ROI-based recommendation
    if (roi < 0) {
      recommendation = `Your content creation is currently operating at a loss with an ROI of ${roi.toFixed(1)}%.`;
      if (mostEffectiveTime[1] > 0) {
        recommendation += ` Focus more on ${mostEffectiveTime[0]} which generates $${mostEffectiveTime[1].toFixed(2)} per hour.`;
      }
      performanceInsights.push({
        title: "Reduce Production Time",
        description: `Your ${leastEffectiveTime[0]} time is least effective. Consider outsourcing or streamlining.`,
        impact: "High"
      });
    } else if (roi < 50) {
      recommendation = `Your ROI is positive at ${roi.toFixed(1)}%, but below the ${experienceLevel} creator average of ${benchmarkROI}%.`;
      performanceInsights.push({
        title: "Optimize Revenue Streams",
        description: `Your top revenue source (${
          Object.entries(revenueBreakdown).sort((a, b) => b[1] - a[1])[0][0] === "adRevenue" ? "ad revenue" :
          Object.entries(revenueBreakdown).sort((a, b) => b[1] - a[1])[0][0] === "sponsorRevenue" ? "sponsorships" : 
          "affiliate marketing"
        }) could be scaled further.`,
        impact: "Medium"
      });
    } else if (roi < 200) {
      recommendation = `You have a good ROI of ${roi.toFixed(1)}%, above the ${experienceLevel} average of ${benchmarkROI}%.`;
      performanceInsights.push({
        title: "Scale Your Success",
        description: "Your current approach is working well. Consider increasing content frequency.",
        impact: "Medium"
      });
    } else {
      recommendation = `Excellent ROI of ${roi.toFixed(1)}%! Your content strategy is highly effective.`;
      performanceInsights.push({
        title: "Expand Your Platform",
        description: "With your high ROI, consider repurposing content across multiple platforms.",
        impact: "High"
      });
    }
    
    // Content category insights
    if (category.cpmMultiplier > 1.2) {
      performanceInsights.push({
        title: "High-Value Niche",
        description: `Your ${categoryData[contentCategory as keyof typeof categoryData].name} content has above-average monetization potential.`,
        impact: "High"
      });
    }
    
    // Efficiency insights
    if (normalizedEfficiency < 40) {
      performanceInsights.push({
        title: "Improve Content Efficiency",
        description: "Your views-to-effort ratio is low. Focus on creating content with higher engagement potential.",
        impact: "High"
      });
    }
    
    // Time allocation insight
    if (timeEffectivenessRatios.marketing > timeEffectivenessRatios.content) {
      performanceInsights.push({
        title: "Focus on Marketing",
        description: "Your marketing efforts are paying off more than content creation. Consider reallocating time.",
        impact: "Medium"
      });
    }
    
    // Platform-specific recommendation
    recommendation += ` On ${platformInfo.name}, it typically takes ${platformInfo.timeToRevenue} months to reach monetization thresholds.`;
    
    // Format the results
    const results = {
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      hourlyRate: parseFloat(hourlyRate.toFixed(2)),
      adjustedHourlyRate: parseFloat(adjustedHourlyRate.toFixed(2)),
      revenueBreakdown,
      efficiency: parseFloat(normalizedEfficiency.toFixed(0)),
      roi: parseFloat(roi.toFixed(2)),
      contentValueDensity: parseFloat((contentValueDensity * 60).toFixed(2)), // per hour
      breakevenMonths: parseFloat(breakevenMonths.toFixed(1)),
      timeEffectiveness: {
        mostEffective: {
          activity: mostEffectiveTime[0].toString(),
          valuePerHour: parseFloat(mostEffectiveTime[1].toFixed(2))
        },
        leastEffective: {
          activity: leastEffectiveTime[0].toString(),
          valuePerHour: parseFloat(leastEffectiveTime[1].toFixed(2))
        }
      },
      benchmarkComparison: {
        hourlyRate: {
          benchmark: benchmarkHourlyRate,
          difference: parseFloat(hourlyRateComparison.toFixed(2)),
          percentDifference: parseFloat(((hourlyRateComparison / benchmarkHourlyRate) * 100).toFixed(1))
        },
        roi: {
          benchmark: benchmarkROI,
          difference: parseFloat(roiComparison.toFixed(2))
        }
      },
      projections,
      recommendation,
      performanceInsights
    };
    
    setResults(results);
    
    toast({
      title: "Creator ROI Analysis Complete",
      description: `Your content's hourly value: $${results.hourlyRate} (${results.benchmarkComparison.hourlyRate.difference >= 0 ? "+" : ""}${results.benchmarkComparison.hourlyRate.percentDifference}% vs benchmark)`
    });
  };

  const getTopRevenueSource = (revenueBreakdown: any) => {
    const sorted = Object.entries(revenueBreakdown).sort((a: any, b: any) => b[1] - a[1]);
    if (sorted[0][0] === "adRevenue") return "ad revenue";
    if (sorted[0][0] === "sponsorRevenue") return "sponsorships";
    return "affiliate marketing";
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 text-primary" size={24} />
          Content Creator ROI Calculator
        </CardTitle>
        <CardDescription>Analyze the return on investment for your content creation efforts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="time" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="time">Time Investment</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Data</TabsTrigger>
            <TabsTrigger value="context">Context</TabsTrigger>
          </TabsList>
          
          <TabsContent value="time" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={platform}
                  onValueChange={setPlatform}
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="custom">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentHours">Content Creation Hours (per piece)</Label>
                <Input
                  id="contentHours"
                  type="number"
                  min="0"
                  step="0.5"
                  value={contentHours}
                  onChange={(e) => setContentHours(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="editingHours">Editing Hours</Label>
                <Input
                  id="editingHours"
                  type="number"
                  min="0"
                  step="0.5"
                  value={editingHours}
                  onChange={(e) => setEditingHours(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="researchHours">Research & Planning Hours</Label>
                <Input
                  id="researchHours"
                  type="number"
                  min="0"
                  step="0.5"
                  value={researchHours}
                  onChange={(e) => setResearchHours(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="marketingHours">Marketing & Promotion Hours</Label>
                <Input
                  id="marketingHours"
                  type="number"
                  min="0"
                  step="0.5"
                  value={marketingHours}
                  onChange={(e) => setMarketingHours(Number(e.target.value))}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="views">Average Views (per content piece)</Label>
                <Input
                  id="views"
                  type="number"
                  min="0"
                  value={views}
                  onChange={(e) => setViews(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subscribers">Followers/Subscribers</Label>
                <Input
                  id="subscribers"
                  type="number"
                  min="0"
                  value={subscribers}
                  onChange={(e) => setSubscribers(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cpm">CPM Rate ($ per 1000 views)</Label>
                <Input
                  id="cpm"
                  type="number"
                  min="0"
                  step="0.1"
                  value={cpm}
                  onChange={(e) => setCpm(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  {platform === "youtube" ? "Typically $1-$6 for YouTube" : 
                   platform === "tiktok" ? "Typically $0.02-$0.04 for TikTok" :
                   platform === "instagram" ? "Instagram primarily relies on sponsorships" :
                   "Varies widely by platform"}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sponsorships">Number of Sponsorships (monthly)</Label>
                <Input
                  id="sponsorships"
                  type="number"
                  min="0"
                  value={sponsorships}
                  onChange={(e) => setSponsorships(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="affiliateRevenue">Affiliate Revenue ($ monthly)</Label>
                <Input
                  id="affiliateRevenue"
                  type="number"
                  min="0"
                  value={affiliateRevenue}
                  onChange={(e) => setAffiliateRevenue(Number(e.target.value))}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="context" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select
                  value={experienceLevel}
                  onValueChange={setExperienceLevel}
                >
                  <SelectTrigger id="experienceLevel">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (< 1 year)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="expert">Expert (3+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentCategory">Content Category</Label>
                <Select
                  value={contentCategory}
                  onValueChange={setContentCategory}
                >
                  <SelectTrigger id="contentCategory">
                    <SelectValue placeholder="Select content category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="beauty">Beauty & Fashion</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="health">Health & Fitness</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Different niches have different monetization potential</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button onClick={calculateROI} className="w-full">Calculate ROI</Button>
        
        {results && (
          <div className="space-y-4 mt-6">
            <div className="rounded-lg bg-gradient-to-br from-secondary to-secondary/70 p-4 space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                  Financial Analysis
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-xl font-bold">${results.totalRevenue}</p>
                    <div className="flex flex-wrap mt-2 space-y-1">
                      <div className="text-xs w-full flex justify-between">
                        <span>Ads:</span>
                        <span>${results.revenueBreakdown.adRevenue}</span>
                      </div>
                      <div className="text-xs w-full flex justify-between">
                        <span>Sponsors:</span>
                        <span>${results.revenueBreakdown.sponsorRevenue}</span>
                      </div>
                      <div className="text-xs w-full flex justify-between">
                        <span>Affiliate:</span>
                        <span>${results.revenueBreakdown.affiliateRevenue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-1" />
                      <p className="text-xl font-bold">${results.hourlyRate}</p>
                    </div>
                    
                    <div className={`mt-1 px-2 py-0.5 text-xs rounded inline-flex items-center
                      ${results.benchmarkComparison.hourlyRate.difference >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {results.benchmarkComparison.hourlyRate.difference >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                      )}
                      <span>
                        {results.benchmarkComparison.hourlyRate.difference >= 0 ? "+" : ""}
                        {results.benchmarkComparison.hourlyRate.percentDifference}% vs benchmark
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background rounded-md p-3">
                  <p className="text-sm text-muted-foreground mb-1">Revenue breakdown</p>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden flex">
                    {results.revenueBreakdown.adRevenue > 0 && (
                      <div 
                        className="h-full bg-blue-400"
                        style={{ 
                          width: `${(results.revenueBreakdown.adRevenue / results.totalRevenue) * 100}%`
                        }}
                      ></div>
                    )}
                    {results.revenueBreakdown.sponsorRevenue > 0 && (
                      <div 
                        className="h-full bg-purple-400"
                        style={{ 
                          width: `${(results.revenueBreakdown.sponsorRevenue / results.totalRevenue) * 100}%`
                        }}
                      ></div>
                    )}
                    {results.revenueBreakdown.affiliateRevenue > 0 && (
                      <div 
                        className="h-full bg-green-400"
                        style={{ 
                          width: `${(results.revenueBreakdown.affiliateRevenue / results.totalRevenue) * 100}%`
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="flex text-xs mt-1 space-x-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                      <span>Ads</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-1"></div>
                      <span>Sponsors</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                      <span>Affiliate</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-muted pt-3 space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                  Performance Metrics
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-background p-3">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Efficiency Score</p>
                      <p className="font-medium">{results.efficiency}/100</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${
                          results.efficiency < 30 ? "bg-red-500" : 
                          results.efficiency < 60 ? "bg-orange-500" : 
                          results.efficiency < 80 ? "bg-yellow-500" : "bg-green-500"
                        }`} 
                        style={{ width: `${results.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="rounded-md bg-background p-3">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-primary mr-1" />
                        <p className="font-medium">
                          {results.roi >= 0 ? "+" : ""}{results.roi}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className={`text-xs px-1.5 py-0.5 rounded ${
                        results.benchmarkComparison.roi.difference >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {results.benchmarkComparison.roi.difference >= 0 ? "Above" : "Below"} benchmark
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Time Effectiveness</p>
                  
                  <div className="bg-background p-3 rounded-md">
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Most valuable time:</span>
                        <span className="font-medium ml-1">{results.timeEffectiveness.mostEffective.activity}</span>
                      </div>
                      <span className="text-green-600">${results.timeEffectiveness.mostEffective.valuePerHour}/hr</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <div>
                        <span className="text-muted-foreground">Least valuable time:</span>
                        <span className="font-medium ml-1">{results.timeEffectiveness.leastEffective.activity}</span>
                      </div>
                      <span className="text-red-500">${results.timeEffectiveness.leastEffective.valuePerHour}/hr</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-muted pt-3 space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <Users className="h-5 w-5 text-indigo-500 mr-2" />
                  Growth Projection
                </h3>
                
                <div className="bg-background p-3 rounded-md">
                  <p className="text-sm mb-2">12-Month Revenue Projection</p>
                  <div className="relative h-24">
                    <div className="absolute top-0 left-0 w-full h-full flex items-end">
                      {results.projections.map((month, index) => (
                        <div 
                          key={index}
                          className="bg-primary/70 h-0 w-full transition-all duration-500 ease-out mx-0.5 rounded-t"
                          style={{ 
                            height: `${(month.revenue / results.projections[results.projections.length-1].revenue) * 100}%`,
                            animationDelay: `${index * 0.05}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Now: ${results.totalRevenue}</span>
                    <span>Month 12: ${results.projections[results.projections.length-1].revenue.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="bg-background p-3 rounded-md">
                  <p className="text-sm">Break-even point</p>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${Math.min(100, (results.breakevenMonths / 12) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 font-medium">
                      {results.breakevenMonths < 1 ? 'Already profitable' : 
                       results.breakevenMonths > 12 ? '12+ months' :
                       `${results.breakevenMonths} months`}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-muted pt-3 space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <Medal className="h-5 w-5 text-amber-500 mr-2" />
                  Expert Insights
                </h3>
                
                <div className="bg-primary/10 p-3 rounded-md">
                  <div className="font-medium mb-1">Strategic Recommendation:</div>
                  <p className="text-sm">{results.recommendation}</p>
                </div>
                
                {results.performanceInsights.map((insight, i) => (
                  <div key={i} className="bg-background p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {insight.impact === "High" ? (
                          <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        <span className="font-medium">{insight.title}</span>
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        insight.impact === "High" ? "bg-amber-100 text-amber-800" : 
                        insight.impact === "Medium" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
