
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

interface Timezone {
  name: string;
  offset: number; // Offset in hours
  abbr: string; // Abbreviation
}

export const TimezoneConverter = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [fromTimezone, setFromTimezone] = useState("UTC+0");
  const [toTimezone, setToTimezone] = useState("UTC-5");
  const [convertedDateTime, setConvertedDateTime] = useState<Date | null>(null);
  
  const timezones: Timezone[] = [
    { name: "UTC (Coordinated Universal Time)", offset: 0, abbr: "UTC+0" },
    { name: "GMT (Greenwich Mean Time)", offset: 0, abbr: "GMT" },
    { name: "EST (Eastern Standard Time)", offset: -5, abbr: "UTC-5" },
    { name: "CST (Central Standard Time)", offset: -6, abbr: "UTC-6" },
    { name: "MST (Mountain Standard Time)", offset: -7, abbr: "UTC-7" },
    { name: "PST (Pacific Standard Time)", offset: -8, abbr: "UTC-8" },
    { name: "IST (Indian Standard Time)", offset: 5.5, abbr: "UTC+5:30" },
    { name: "JST (Japan Standard Time)", offset: 9, abbr: "UTC+9" },
    { name: "AEST (Australian Eastern Standard Time)", offset: 10, abbr: "UTC+10" },
    { name: "CET (Central European Time)", offset: 1, abbr: "UTC+1" },
    { name: "EET (Eastern European Time)", offset: 2, abbr: "UTC+2" },
    { name: "CST (China Standard Time)", offset: 8, abbr: "UTC+8" }
  ];
  
  const convertTime = () => {
    try {
      // Parse the input date and time
      const [hours, minutes] = time.split(":").map(Number);
      const inputDate = new Date(date);
      inputDate.setHours(hours, minutes);
      
      // Get the timezone offsets
      const fromOffset = timezones.find(tz => tz.abbr === fromTimezone)?.offset || 0;
      const toOffset = timezones.find(tz => tz.abbr === toTimezone)?.offset || 0;
      
      // Calculate the difference in hours
      const diffHours = toOffset - fromOffset;
      
      // Create a new date with the adjusted time
      const newDate = new Date(inputDate);
      newDate.setHours(newDate.getHours() + diffHours);
      
      setConvertedDateTime(newDate);
    } catch (error) {
      console.error("Error converting time:", error);
      setConvertedDateTime(null);
    }
  };
  
  // Update time when component mounts
  useEffect(() => {
    const now = new Date();
    setTime(format(now, "HH:mm"));
  }, []);

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10">
        <CardTitle className="text-xl">Time Zone Converter</CardTitle>
        <CardDescription>Convert times between different time zones</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={format(date, "yyyy-MM-dd")}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fromTimezone">From Time Zone</Label>
            <Select value={fromTimezone} onValueChange={setFromTimezone}>
              <SelectTrigger id="fromTimezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz.abbr} value={tz.abbr}>
                    {tz.name} ({tz.abbr})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="toTimezone">To Time Zone</Label>
            <Select value={toTimezone} onValueChange={setToTimezone}>
              <SelectTrigger id="toTimezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz.abbr} value={tz.abbr}>
                    {tz.name} ({tz.abbr})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button className="w-full" onClick={convertTime}>
            Convert
          </Button>
          
          {convertedDateTime && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Converted Time</div>
                <div className="text-2xl font-bold">
                  {format(convertedDateTime, "MMM d, yyyy")}
                </div>
                <div className="text-xl mt-1">
                  {format(convertedDateTime, "h:mm a")}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {time} {fromTimezone} = {format(convertedDateTime, "HH:mm")} {toTimezone}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
