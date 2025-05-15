
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Brain, Coffee, AlertTriangle } from "lucide-react";

export const MentalBurnoutCalculator = () => {
  const [hoursWorked, setHoursWorked] = useState<number>(8);
  const [breakMinutes, setBreakMinutes] = useState<number>(30);
  const [meetings, setMeetings] = useState<number>(2);
  const [screenTime, setScreenTime] = useState<number>(8);
  const [taskCount, setTaskCount] = useState<number>(5);
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [burnoutScore, setBurnoutScore] = useState<number>(0);
  const [burnoutRisk, setBurnoutRisk] = useState<string>("");
  const [recoveryDays, setRecoveryDays] = useState<number>(0);
  const [restActivities, setRestActivities] = useState<string[]>([]);
  const { toast } = useToast();

  const calculateBurnout = () => {
    // Base calculation
    let score = 0;
    
    // Hours worked factor (exponential increase after 8 hours)
    if (hoursWorked <= 8) {
      score += hoursWorked * 5;
    } else {
      score += 40 + Math.pow(hoursWorked - 8, 1.5) * 10;
    }
    
    // Break time factor (inverse - more breaks reduces burnout)
    score -= (breakMinutes / 60) * 15;
    
    // Meeting factor (meetings add mental load)
    score += meetings * 8;
    
    // Screen time factor
    score += screenTime * 5;
    
    // Task count factor
    score += taskCount * 4;
    
    // Direct stress level impact
    score += stressLevel * 10;
    
    // Sleep factor (inverse - less sleep increases burnout)
    if (sleepHours < 7) {
      score += (7 - sleepHours) * 20;
    } else {
      score -= (sleepHours - 7) * 5;
    }
    
    // Normalize score between 0-100
    let normalizedScore = Math.max(0, Math.min(100, score));
    
    // Set burnout risk category
    let risk = "";
    let recoveryNeeded = 0;
    let activities: string[] = [];
    
    if (normalizedScore < 30) {
      risk = "Low";
      recoveryNeeded = 0;
      activities = ["Regular breaks throughout your day", "Maintain your current balance"];
    } else if (normalizedScore < 60) {
      risk = "Moderate";
      recoveryNeeded = 1;
      activities = ["1-hour nature walk", "Digital detox evening", "Guided meditation (20 min)", "Creative hobby time"];
    } else if (normalizedScore < 80) {
      risk = "High";
      recoveryNeeded = 2;
      activities = ["Full day away from screens", "Outdoor physical activity", "Social connection with supportive people", "8+ hours of sleep"];
    } else {
      risk = "Critical";
      recoveryNeeded = 3;
      activities = ["Immediate 3-day break from work", "Professional support", "Nature immersion", "Physical exercise", "Restorative sleep"];
    }
    
    setBurnoutScore(Math.round(normalizedScore));
    setBurnoutRisk(risk);
    setRecoveryDays(recoveryNeeded);
    setRestActivities(activities);
    
    toast({
      title: `Burnout Risk: ${risk}`,
      description: `Your burnout score is ${Math.round(normalizedScore)}/100`,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 text-primary" size={24} />
          Mental Burnout Calculator
        </CardTitle>
        <CardDescription>Assess your burnout risk and get recovery recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="hoursWorked">Hours worked per day</Label>
          <Input
            id="hoursWorked"
            type="number"
            min="0"
            max="24"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="breakMinutes">Total break time (minutes)</Label>
          <Input
            id="breakMinutes"
            type="number"
            min="0"
            max="240"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="meetings">Number of meetings per day</Label>
          <Input
            id="meetings"
            type="number"
            min="0"
            max="20"
            value={meetings}
            onChange={(e) => setMeetings(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="screenTime">Screen time (hours)</Label>
          <Input
            id="screenTime"
            type="number"
            min="0"
            max="24"
            value={screenTime}
            onChange={(e) => setScreenTime(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taskCount">Number of tasks/projects juggling</Label>
          <Input
            id="taskCount"
            type="number"
            min="0"
            max="50"
            value={taskCount}
            onChange={(e) => setTaskCount(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sleepHours">Average sleep (hours)</Label>
          <Input
            id="sleepHours"
            type="number"
            min="0"
            max="12"
            value={sleepHours}
            onChange={(e) => setSleepHours(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Perceived stress level</Label>
            <span className="font-medium">{stressLevel}/10</span>
          </div>
          <Slider 
            defaultValue={[5]} 
            max={10} 
            step={1} 
            value={[stressLevel]}
            onValueChange={(values) => setStressLevel(values[0])}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
          </div>
        </div>
        
        <Button onClick={calculateBurnout} className="w-full">Calculate Burnout Risk</Button>
        
        {burnoutScore > 0 && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-secondary p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Burnout Score:</span>
                <div className="flex items-center">
                  <span className="text-lg font-bold mr-2">{burnoutScore}/100</span>
                  {burnoutRisk === "Critical" && <AlertTriangle className="text-red-500" />}
                </div>
              </div>
              
              <div className="w-full bg-background rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${
                    burnoutScore < 30 ? "bg-green-500" : 
                    burnoutScore < 60 ? "bg-yellow-500" : 
                    burnoutScore < 80 ? "bg-orange-500" : "bg-red-500"
                  }`} 
                  style={{ width: `${burnoutScore}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Risk Level:</span>
                <span className={`font-bold ${
                  burnoutRisk === "Low" ? "text-green-500" : 
                  burnoutRisk === "Moderate" ? "text-yellow-500" : 
                  burnoutRisk === "High" ? "text-orange-500" : "text-red-500"
                }`}>{burnoutRisk}</span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="font-medium mb-1">Recovery Recommendation:</div>
                {recoveryDays > 0 ? (
                  <div className="flex items-center">
                    <Coffee className="mr-2 text-primary" size={16} />
                    <span>{recoveryDays} {recoveryDays === 1 ? "day" : "days"} of mental rest suggested</span>
                  </div>
                ) : (
                  <div>No immediate rest days needed</div>
                )}
                
                <div className="mt-3">
                  <div className="font-medium mb-1">Suggested Activities:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {restActivities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
