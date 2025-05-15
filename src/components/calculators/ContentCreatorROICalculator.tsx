
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, DollarSign, Clock, Briefcase } from "lucide-react";

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
  
  const [results, setResults] = useState<{
    totalRevenue: number;
    hourlyRate: number;
    efficiency: number;
    roi: number;
    recommendation: string;
  } | null>(null);
  
  const { toast } = useToast();

  const calculateROI = () => {
    // Calculate total hours spent
    const totalHours = contentHours + editingHours + researchHours + marketingHours;
    
    // Calculate platform-specific revenue
    let adRevenue = 0;
    let sponsorshipValue = 0;
    
    // Ad revenue calculations based on platform
    switch (platform) {
      case "youtube":
        // YouTube: ~$0.5-$6 per 1000 views (using cpm)
        adRevenue = (views / 1000) * cpm;
        sponsorshipValue = sponsorships * (subscribers > 10000 ? 500 : subscribers > 1000 ? 200 : 50);
        break;
      case "tiktok":
        // TikTok Creator Fund: ~$0.02-$0.04 per 1000 views
        adRevenue = (views / 1000) * 0.03;
        sponsorshipValue = sponsorships * (subscribers > 100000 ? 1000 : subscribers > 10000 ? 300 : 100);
        break;
      case "instagram":
        // Instagram: primarily sponsorship-based
        adRevenue = (views / 1000) * 0.01; // minimal from meta ads
        sponsorshipValue = sponsorships * (subscribers > 10000 ? 700 : subscribers > 1000 ? 250 : 100);
        break;
      default:
        adRevenue = (views / 1000) * cpm;
    }
    
    // Total revenue calculation
    const totalRevenue = adRevenue + sponsorshipValue + affiliateRevenue;
    
    // Calculate hourly rate
    const hourlyRate = totalHours > 0 ? totalRevenue / totalHours : 0;
    
    // Calculate efficiency score (0-100)
    // Based on revenue per view and time invested
    const viewEfficiency = views > 0 ? (totalRevenue / views) * 1000 : 0; // Revenue per 1000 views
    const timeEfficiency = totalHours > 0 ? totalRevenue / totalHours : 0; // Revenue per hour
    
    // Normalized efficiency (0-100)
    let normalizedEfficiency = Math.min(100, Math.max(0, 
      (viewEfficiency * 10) + (timeEfficiency * 5)
    ));
    
    // ROI calculation (return on investment - time is the investment)
    // Using a simplified ROI formula: (Gain - Cost) / Cost
    // Where Cost is the monetary value of time (using average hourly wage of $25)
    const timeInvestmentValue = totalHours * 25;
    const roi = timeInvestmentValue > 0 ? ((totalRevenue - timeInvestmentValue) / timeInvestmentValue) * 100 : 0;
    
    // Generate recommendation based on ROI and efficiency
    let recommendation = "";
    if (roi < 0) {
      recommendation = "Your content creation is currently operating at a loss compared to average hourly wages. Consider focusing on higher-paying sponsorships or reducing production time.";
    } else if (roi < 50) {
      recommendation = "Your ROI is positive but low. Try experimenting with content that requires less time investment or focus on scaling your audience to attract better sponsors.";
    } else if (roi < 200) {
      recommendation = "You have a good ROI. Consider investing more in the aspects that are generating the most revenue while cutting back on time-intensive tasks with low returns.";
    } else {
      recommendation = "Excellent ROI! Your content strategy is highly effective. Consider scaling up your operation or repurposing successful content across multiple platforms.";
    }
    
    const results = {
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      hourlyRate: parseFloat(hourlyRate.toFixed(2)),
      efficiency: parseFloat(normalizedEfficiency.toFixed(0)),
      roi: parseFloat(roi.toFixed(2)),
      recommendation
    };
    
    setResults(results);
    
    toast({
      title: "ROI Analysis Complete",
      description: `Your content creation hourly rate: $${results.hourlyRate}`,
    });
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="time">Time Investment</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Data</TabsTrigger>
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
                    <SelectItem value="other">Other</SelectItem>
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
                <p className="text-xs text-muted-foreground">Typically $1-$6 for YouTube, lower for other platforms</p>
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
        </Tabs>
        
        <Button onClick={calculateROI} className="w-full">Calculate ROI</Button>
        
        {results && (
          <div className="space-y-4 mt-6">
            <div className="rounded-lg bg-secondary p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Total Revenue</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-primary mr-1" />
                    <span className="text-xl font-bold">${results.totalRevenue}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Hourly Rate</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-1" />
                    <span className="text-xl font-bold">${results.hourlyRate}/hr</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Efficiency Score</span>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">{results.efficiency}/100</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
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
                
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">ROI</span>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-primary mr-1" />
                    <span className="text-xl font-bold">
                      {results.roi >= 0 ? "+" : ""}{results.roi}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-3 mt-1">
                <div className="font-medium text-sm mb-1">Recommendation:</div>
                <p className="text-sm">{results.recommendation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
