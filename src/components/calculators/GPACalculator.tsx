
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

export const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Course 1", grade: "A", credits: 3 },
    { id: "2", name: "Course 2", grade: "B+", credits: 4 },
  ]);
  
  const [gpa, setGpa] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  
  const gradePoints: Record<string, number> = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "D-": 0.7,
    "F": 0.0,
  };
  
  const addCourse = () => {
    const newId = (courses.length + 1).toString();
    setCourses([
      ...courses,
      { id: newId, name: `Course ${newId}`, grade: "A", credits: 3 }
    ]);
  };
  
  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter(course => course.id !== id));
  };
  
  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };
  
  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let credits = 0;
    
    courses.forEach(course => {
      const points = gradePoints[course.grade];
      if (points !== undefined) {
        totalQualityPoints += points * course.credits;
        credits += course.credits;
      }
    });
    
    if (credits > 0) {
      const calculatedGPA = totalQualityPoints / credits;
      setGpa(parseFloat(calculatedGPA.toFixed(2)));
      setTotalCredits(credits);
    } else {
      setGpa(0);
      setTotalCredits(0);
    }
  };
  
  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20">
        <CardTitle className="text-xl">GPA Calculator</CardTitle>
        <CardDescription>Calculate your Grade Point Average</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4">
                <Input
                  placeholder="Course Name"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                />
              </div>
              
              <div className="col-span-3">
                <Select
                  value={course.grade}
                  onValueChange={(value) => updateCourse(course.id, "grade", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradePoints).map(grade => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-3">
                <Input
                  type="number"
                  min="0"
                  max="6"
                  placeholder="Credits"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, "credits", Number(e.target.value))}
                />
              </div>
              
              <div className="col-span-2 flex justify-end">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                >
                  ✕
                </Button>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between gap-4">
            <Button variant="outline" onClick={addCourse} className="w-full">
              Add Course
            </Button>
            <Button onClick={calculateGPA} className="w-full">
              Calculate GPA
            </Button>
          </div>
          
          {gpa !== null && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Credits</h3>
                  <div className="text-2xl font-bold">{totalCredits}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">GPA</h3>
                  <div className="text-2xl font-bold">{gpa}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
