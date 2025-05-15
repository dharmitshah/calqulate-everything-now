
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
import { TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

export const ContentCreatorROICalculator = () => {
  const [platform, setPlatform] = useState<string>("youtube");
  const [contentHours, setContentHours] = useState<number>(5);
  const [editingHours, setEditingHours] = useState<number>(3);
  const [views, setViews] = useState<number>(1000);
  const [sponsorships, setSponsorships] = useState<number>(0);
  const [affiliateRevenue, setAffiliateRevenue] = useState<number>(0);
  const [experienceLevel, setExperienceLevel] = useState<string>("beginner");
  const [contentCategory, setContentCategory] = useState<string>("entertainment");
  
  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("input");
  const { toast } = useToast();

  // Handle numeric input changes with proper validation
  const handleNumericInputChange = (
    value: string, 
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    // Accept empty string (will convert to 0), numbers, and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setter(value === "" ? 0 : parseFloat(value));
    }
  };

  const platformRates = {
    youtube: 2.50,
    tiktok: 0.03,
    instagram: 0.01,
    custom: 1.00
  };

  const categoryMultipliers = {
    entertainment: 1.0,
    finance: 1.5,
    gaming: 1.2,
    tech: 1.4,
    beauty: 1.3,
    education: 1.1,
    health: 1.2
  };

  const experienceMultipliers = {
    beginner: 0.7,
    intermediate: 1.0,
    expert: 1.3
  };

  const calculateROI = () => {
    // Get rates based on selected options
    const platformRate = platformRates[platform as keyof typeof platformRates];
    const categoryMultiplier = categoryMultipliers[contentCategory as keyof typeof categoryMultipliers];
    const expMultiplier = experienceMultipliers[experienceLevel as keyof typeof experienceMultipliers];
    
    // Calculate total time investment
    const totalHours = contentHours + editingHours;
    
    // Calculate adjusted revenue from views
    const adRevenue = (views / 1000) * platformRate * categoryMultiplier * expMultiplier;
    
    // Calculate total revenue including sponsorships and affiliate
    const totalRevenue = adRevenue + sponsorships + affiliateRevenue;
    
    // Calculate hourly rate
    const hourlyRate = totalHours > 0 ? totalRevenue / totalHours : 0;
    
    // Simple ROI calculation (return/investment)
    const opportunityCost = 
      experienceLevel === "beginner" ? 15 : 
      experienceLevel === "intermediate" ? 25 : 40;
      
    const investment = totalHours * opportunityCost;
    const roi = investment > 0 ? ((totalRevenue - investment) / investment) * 100 : 0;
    
    // Format results
    const calculatedResults = {
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      hourlyRate: parseFloat(hourlyRate.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      breakdown: {
        adRevenue: parseFloat(adRevenue.toFixed(2)),
        sponsorships: parseFloat(sponsorships.toFixed(2)),
        affiliateRevenue: parseFloat(affiliateRevenue.toFixed(2))
      }
    };
    
    setResults(calculatedResults);
    // Switch to results tab automatically
    setActiveTab("results");
    
    toast({
      title: "ROI Analysis Complete",
      description: `Your content's hourly value: $${calculatedResults.hourlyRate}`,
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="input">Input Data</TabsTrigger>
            <TabsTrigger value="results" disabled={!results}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="contentCategory">Content Category</Label>
                  <Select
                    value={contentCategory}
                    onValueChange={setContentCategory}
                  >
                    <SelectTrigger id="contentCategory">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="beauty">Beauty & Fashion</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="health">Health & Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contentHours">Content Creation (hours)</Label>
                  <Input
                    id="contentHours"
                    type="text"
                    inputMode="decimal"
                    value={contentHours.toString()}
                    onChange={(e) => handleNumericInputChange(e.target.value, setContentHours)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editingHours">Editing Hours</Label>
                  <Input
                    id="editingHours"
                    type="text"
                    inputMode="decimal"
                    value={editingHours.toString()}
                    onChange={(e) => handleNumericInputChange(e.target.value, setEditingHours)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="views">Views</Label>
                  <Input
                    id="views"
                    type="text"
                    inputMode="decimal"
                    value={views.toString()}
                    onChange={(e) => handleNumericInputChange(e.target.value, setViews)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={experienceLevel}
                    onValueChange={setExperienceLevel}
                  >
                    <SelectTrigger id="experienceLevel">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sponsorships">Sponsorship Revenue ($)</Label>
                  <Input
                    id="sponsorships"
                    type="text"
                    inputMode="decimal"
                    value={sponsorships.toString()}
                    onChange={(e) => handleNumericInputChange(e.target.value, setSponsorships)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="affiliateRevenue">Affiliate Revenue ($)</Label>
                  <Input
                    id="affiliateRevenue"
                    type="text"
                    inputMode="decimal"
                    value={affiliateRevenue.toString()}
                    onChange={(e) => handleNumericInputChange(e.target.value, setAffiliateRevenue)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateROI} className="w-full">
                Calculate ROI
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="pt-4">
            {results && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-muted-foreground">Hourly Rate</div>
                    <div className="text-2xl font-bold">${results.hourlyRate}</div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-muted-foreground">Return on Investment</div>
                    <div className="text-2xl font-bold">
                      {results.roi >= 0 ? (
                        <span className="text-green-600">{results.roi}%</span>
                      ) : (
                        <span className="text-red-600">{results.roi}%</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground mb-2">Revenue Breakdown</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Ad Revenue:</span>
                      <span>${results.breakdown.adRevenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sponsorships:</span>
                      <span>${results.breakdown.sponsorships}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Affiliate Revenue:</span>
                      <span>${results.breakdown.affiliateRevenue}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Total Revenue:</span>
                      <span>${results.totalRevenue}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground mb-2">Analysis</div>
                  <div>
                    {results.roi >= 100 ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="mr-2" size={16} />
                        <span>Excellent ROI! Your content is highly profitable.</span>
                      </div>
                    ) : results.roi >= 0 ? (
                      <div className="flex items-center text-amber-600">
                        <CheckCircle className="mr-2" size={16} />
                        <span>Positive ROI. Your content is profitable but has room for improvement.</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <AlertCircle className="mr-2" size={16} />
                        <span>Negative ROI. Consider adjusting your content strategy.</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={() => setActiveTab("input")} 
                  variant="outline" 
                  className="w-full"
                >
                  Modify Inputs
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
