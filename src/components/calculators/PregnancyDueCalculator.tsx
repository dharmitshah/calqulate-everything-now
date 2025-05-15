
import { useState } from "react";
import { format, addDays, addWeeks, addMonths } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Baby, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  calculationMethod: z.enum(["lmp", "conception", "ultrasound"]),
  lmpDate: z.date().optional(),
  conceptionDate: z.date().optional(),
  ultrasoundDate: z.date().optional(),
  weeksAtUltrasound: z.number().min(6).max(24).optional(),
  daysAtUltrasound: z.number().min(0).max(6).optional(),
});

export const PregnancyDueCalculator = () => {
  const [results, setResults] = useState<{
    dueDate: Date | null;
    gestationalAge: { weeks: number; days: number } | null;
    conceptionDate: Date | null;
  }>({
    dueDate: null,
    gestationalAge: null,
    conceptionDate: null,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calculationMethod: "lmp",
      weeksAtUltrasound: 8,
      daysAtUltrasound: 0,
    },
  });

  const calculationMethod = form.watch("calculationMethod");

  const calculateDueDate = (data: z.infer<typeof formSchema>) => {
    let dueDate: Date | null = null;
    let gestationalAge: { weeks: number; days: number } | null = null;
    let conceptionDate: Date | null = null;

    const today = new Date();

    try {
      if (data.calculationMethod === "lmp" && data.lmpDate) {
        // LMP calculation - add 280 days (40 weeks)
        dueDate = addDays(data.lmpDate, 280);
        
        // Conception date is typically around 14 days after LMP
        conceptionDate = addDays(data.lmpDate, 14);
        
        // Calculate gestational age
        const diffTime = Math.abs(today.getTime() - data.lmpDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        gestationalAge = {
          weeks: Math.floor(diffDays / 7),
          days: diffDays % 7,
        };
      } 
      else if (data.calculationMethod === "conception" && data.conceptionDate) {
        // Conception calculation - add 266 days (38 weeks)
        dueDate = addDays(data.conceptionDate, 266);
        
        conceptionDate = data.conceptionDate;
        
        // LMP is typically 14 days before conception
        const estimatedLMP = addDays(data.conceptionDate, -14);
        
        // Calculate gestational age based on estimated LMP
        const diffTime = Math.abs(today.getTime() - estimatedLMP.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        gestationalAge = {
          weeks: Math.floor(diffDays / 7),
          days: diffDays % 7,
        };
      } 
      else if (data.calculationMethod === "ultrasound" && 
               data.ultrasoundDate && 
               data.weeksAtUltrasound !== undefined && 
               data.daysAtUltrasound !== undefined) {
        // Calculate based on ultrasound date and gestational age at that time
        const totalDaysAtUltrasound = (data.weeksAtUltrasound * 7) + (data.daysAtUltrasound || 0);
        const estimatedLMP = addDays(data.ultrasoundDate, -totalDaysAtUltrasound);
        
        // Due date is 280 days from estimated LMP
        dueDate = addDays(estimatedLMP, 280);
        
        // Conception is approximately 14 days after LMP
        conceptionDate = addDays(estimatedLMP, 14);
        
        // Calculate current gestational age from estimated LMP
        const diffTime = Math.abs(today.getTime() - estimatedLMP.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        gestationalAge = {
          weeks: Math.floor(diffDays / 7),
          days: diffDays % 7,
        };
      }

      setResults({
        dueDate,
        gestationalAge,
        conceptionDate,
      });
    } catch (error) {
      console.error("Error calculating due date:", error);
      setResults({
        dueDate: null,
        gestationalAge: null,
        conceptionDate: null,
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-xl rounded-2xl overflow-hidden border-0 bg-card">
      <CardHeader className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 pb-4 flex flex-row items-center gap-2">
        <Baby className="size-5 text-pink-500" />
        <CardTitle className="text-xl font-bold text-foreground">Pregnancy Due Date Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(calculateDueDate)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Calculation Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  <Button 
                    type="button"
                    variant={calculationMethod === "lmp" ? "default" : "outline"}
                    className={`w-full ${calculationMethod === "lmp" ? "bg-primary" : ""}`}
                    onClick={() => form.setValue("calculationMethod", "lmp")}
                  >
                    Last Period
                  </Button>
                  <Button 
                    type="button"
                    variant={calculationMethod === "conception" ? "default" : "outline"}
                    className={`w-full ${calculationMethod === "conception" ? "bg-primary" : ""}`}
                    onClick={() => form.setValue("calculationMethod", "conception")}
                  >
                    Conception
                  </Button>
                  <Button 
                    type="button"
                    variant={calculationMethod === "ultrasound" ? "default" : "outline"}
                    className={`w-full ${calculationMethod === "ultrasound" ? "bg-primary" : ""}`}
                    onClick={() => form.setValue("calculationMethod", "ultrasound")}
                  >
                    Ultrasound
                  </Button>
                </div>
              </div>

              {calculationMethod === "lmp" && (
                <FormField
                  control={form.control}
                  name="lmpDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>First day of last menstrual period</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {calculationMethod === "conception" && (
                <FormField
                  control={form.control}
                  name="conceptionDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of conception</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {calculationMethod === "ultrasound" && (
                <>
                  <FormField
                    control={form.control}
                    name="ultrasoundDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of ultrasound</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Select date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="weeksAtUltrasound"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weeks at ultrasound</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={6}
                              max={24}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="daysAtUltrasound"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Days at ultrasound</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              max={6}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Due Date
            </Button>
          </form>
        </Form>

        {results.dueDate && (
          <div className="mt-6 p-5 border rounded-xl bg-muted/50 space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-1">Results</h3>
              <div className="text-muted-foreground text-sm">Based on the information you provided</div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <div className="text-sm text-muted-foreground">Estimated Due Date</div>
                <div className="text-2xl font-bold text-primary">{format(results.dueDate, "MMMM d, yyyy")}</div>
                <div className="text-sm text-muted-foreground mt-1">40 weeks from LMP</div>
              </div>
              
              {results.gestationalAge && (
                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Current Gestational Age</div>
                  <div className="text-2xl font-bold">
                    {results.gestationalAge.weeks} weeks, {results.gestationalAge.days} days
                  </div>
                </div>
              )}
              
              {results.conceptionDate && (
                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Estimated Conception Date</div>
                  <div className="text-lg font-semibold">{format(results.conceptionDate, "MMMM d, yyyy")}</div>
                </div>
              )}
              
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <div className="text-sm text-muted-foreground">Trimester Information</div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                    <div className="text-xs text-muted-foreground">First</div>
                    <div className="font-semibold">Weeks 1-13</div>
                  </div>
                  <div className="text-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                    <div className="text-xs text-muted-foreground">Second</div>
                    <div className="font-semibold">Weeks 14-26</div>
                  </div>
                  <div className="text-center p-2 bg-pink-100 dark:bg-pink-900/30 rounded">
                    <div className="text-xs text-muted-foreground">Third</div>
                    <div className="font-semibold">Weeks 27-40</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground text-center mt-4">
              Note: This calculator provides estimates only. Please consult with your healthcare provider.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
