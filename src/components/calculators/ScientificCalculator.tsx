
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Delete, RotateCcw, Plus, Minus, X, Divide, Equal, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

export const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isResult, setIsResult] = useState(false);
  const [memory, setMemory] = useState(0);
  const [showingDegrees, setShowingDegrees] = useState(true);
  
  // Convert degrees to radians for trigonometric functions
  const toRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };
  
  const appendValue = (value: string) => {
    if (isResult) {
      setDisplay(value);
      setEquation("");
      setIsResult(false);
      return;
    }
    
    if (display === "0" && value !== ".") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };
  
  const appendOperator = (operator: string) => {
    setIsResult(false);
    
    if (isResult) {
      setEquation(display + operator);
      setDisplay("0");
      return;
    }
    
    setEquation(equation + display + operator);
    setDisplay("0");
  };
  
  const calculateResult = () => {
    try {
      // Create the full equation string
      const fullEquation = equation + display;
      
      // Replace × with * and ÷ with /
      const sanitizedEquation = fullEquation
        .replace(/×/g, "*")
        .replace(/÷/g, "/");
      
      // Use Function constructor to safely evaluate the expression
      const result = new Function(`return ${sanitizedEquation}`)();
      
      // Format the result
      const formattedResult = Number.isInteger(result) 
        ? result.toString() 
        : parseFloat(result.toFixed(8)).toString();
      
      setDisplay(formattedResult);
      setEquation("");
      setIsResult(true);
    } catch (error) {
      setDisplay("Error");
      setEquation("");
      setIsResult(true);
    }
  };
  
  const clear = () => {
    setDisplay("0");
    setEquation("");
    setIsResult(false);
  };

  const backspace = () => {
    if (display.length === 1 || display === "Error" || isResult) {
      setDisplay("0");
      setIsResult(false);
    } else {
      setDisplay(display.slice(0, -1));
    }
  };
  
  const applyScientificOperation = (operation: string) => {
    try {
      const num = parseFloat(display);
      let result: number;
      
      switch (operation) {
        case "sqrt":
          if (num < 0) {
            throw new Error("Cannot take square root of negative number");
          }
          result = Math.sqrt(num);
          break;
        case "square":
          result = Math.pow(num, 2);
          break;
        case "sin":
          result = showingDegrees ? Math.sin(toRadians(num)) : Math.sin(num);
          break;
        case "cos":
          result = showingDegrees ? Math.cos(toRadians(num)) : Math.cos(num);
          break;
        case "tan":
          result = showingDegrees ? Math.tan(toRadians(num)) : Math.tan(num);
          break;
        case "log":
          if (num <= 0) {
            throw new Error("Cannot take log of non-positive number");
          }
          result = Math.log10(num);
          break;
        case "ln":
          if (num <= 0) {
            throw new Error("Cannot take ln of non-positive number");
          }
          result = Math.log(num);
          break;
        case "percent":
          result = num / 100;
          break;
        case "inverse":
          if (num === 0) {
            throw new Error("Cannot divide by zero");
          }
          result = 1 / num;
          break;
        case "factorial":
          if (num < 0 || !Number.isInteger(num)) {
            throw new Error("Factorial only defined for non-negative integers");
          }
          result = factorial(num);
          break;
        default:
          result = num;
      }
      
      // Format the result
      const formattedResult = Number.isInteger(result) 
        ? result.toString() 
        : parseFloat(result.toFixed(8)).toString();
      
      setDisplay(formattedResult);
      setIsResult(true);
    } catch (error) {
      setDisplay("Error");
      setIsResult(true);
    }
  };
  
  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };
  
  const toggleAngleUnit = () => {
    setShowingDegrees(!showingDegrees);
  };
  
  const memoryOperations = (operation: string) => {
    const num = parseFloat(display);
    
    switch (operation) {
      case "MC": // Memory Clear
        setMemory(0);
        break;
      case "MR": // Memory Recall
        setDisplay(memory.toString());
        setIsResult(true);
        break;
      case "M+": // Memory Add
        setMemory(memory + num);
        setIsResult(true);
        break;
      case "M-": // Memory Subtract
        setMemory(memory - num);
        setIsResult(true);
        break;
    }
  };

  // Define button groups for scientific calculator
  const memoryButtons = [
    { label: "MC", onClick: () => memoryOperations("MC"), className: "bg-violet-200 dark:bg-violet-900 hover:bg-violet-300 dark:hover:bg-violet-800" },
    { label: "MR", onClick: () => memoryOperations("MR"), className: "bg-violet-200 dark:bg-violet-900 hover:bg-violet-300 dark:hover:bg-violet-800" },
    { label: "M+", onClick: () => memoryOperations("M+"), className: "bg-violet-200 dark:bg-violet-900 hover:bg-violet-300 dark:hover:bg-violet-800" },
    { label: "M-", onClick: () => memoryOperations("M-"), className: "bg-violet-200 dark:bg-violet-900 hover:bg-violet-300 dark:hover:bg-violet-800" },
  ];

  const scientificButtons = [
    { label: "√", onClick: () => applyScientificOperation("sqrt"), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: "x²", onClick: () => applyScientificOperation("square"), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: "sin", onClick: () => applyScientificOperation("sin"), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: "cos", onClick: () => applyScientificOperation("cos"), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: "tan", onClick: () => applyScientificOperation("tan"), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: "log", onClick: () => applyScientificOperation("log"), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: "ln", onClick: () => applyScientificOperation("ln"), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: showingDegrees ? "DEG" : "RAD", onClick: toggleAngleUnit, className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: "1/x", onClick: () => applyScientificOperation("inverse"), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: "n!", onClick: () => applyScientificOperation("factorial"), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: "%", onClick: () => applyScientificOperation("percent"), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
    { label: "π", onClick: () => appendValue(Math.PI.toString()), className: "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800" },
  ];

  const numberButtons = [
    { label: "7", onClick: () => appendValue("7"), className: "bg-muted hover:bg-muted/80" },
    { label: "8", onClick: () => appendValue("8"), className: "bg-muted hover:bg-muted/80" },
    { label: "9", onClick: () => appendValue("9"), className: "bg-muted hover:bg-muted/80" },
    { label: "4", onClick: () => appendValue("4"), className: "bg-muted hover:bg-muted/80" },
    { label: "5", onClick: () => appendValue("5"), className: "bg-muted hover:bg-muted/80" },
    { label: "6", onClick: () => appendValue("6"), className: "bg-muted hover:bg-muted/80" },
    { label: "1", onClick: () => appendValue("1"), className: "bg-muted hover:bg-muted/80" },
    { label: "2", onClick: () => appendValue("2"), className: "bg-muted hover:bg-muted/80" },
    { label: "3", onClick: () => appendValue("3"), className: "bg-muted hover:bg-muted/80" },
    { label: "0", onClick: () => appendValue("0"), className: "bg-muted hover:bg-muted/80" },
    { label: ".", onClick: () => appendValue("."), className: "bg-muted hover:bg-muted/80" },
    { label: "±", onClick: () => setDisplay(parseFloat(display) * -1 + ""), className: "bg-muted hover:bg-muted/80" },
  ];

  const operatorButtons = [
    { label: <RotateCcw className="size-4" />, onClick: clear, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90" },
    { label: <Delete className="size-4" />, onClick: backspace, className: "bg-calculator-backspace text-primary-foreground hover:opacity-90" },
    { label: <Divide className="size-4" />, onClick: () => appendOperator("÷"), className: "bg-primary text-primary-foreground hover:bg-primary/90" },
    { label: <X className="size-4" />, onClick: () => appendOperator("×"), className: "bg-primary text-primary-foreground hover:bg-primary/90" },
    { label: <Minus className="size-4" />, onClick: () => appendOperator("-"), className: "bg-primary text-primary-foreground hover:bg-primary/90" },
    { label: <Plus className="size-4" />, onClick: () => appendOperator("+"), className: "bg-primary text-primary-foreground hover:bg-primary/90" },
    { label: <Equal className="size-4" />, onClick: calculateResult, className: "bg-primary text-primary-foreground hover:bg-primary/90" },
  ];

  return (
    <Card className="w-full max-w-2xl shadow-xl rounded-2xl overflow-hidden border-0 bg-card backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10 pb-2 flex flex-row items-center gap-2">
        <Calculator className="size-5 text-primary" />
        <CardTitle className="text-xl font-bold text-primary">Scientific Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="bg-muted rounded-xl p-5 mb-5 text-right shadow-inner">
          <div className="text-sm text-muted-foreground h-5 font-mono overflow-hidden">
            {equation}
          </div>
          <div className="text-3xl font-mono font-bold overflow-x-auto scrollbar-none text-foreground min-h-12 flex items-center justify-end">
            {display}
          </div>
          {memory !== 0 && (
            <div className="text-xs text-right text-primary mt-1">
              M: {memory}
            </div>
          )}
          <div className="text-xs text-right mt-1">
            Mode: {showingDegrees ? "DEG" : "RAD"}
          </div>
        </div>
        
        {/* Memory buttons */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          {memoryButtons.map((btn, index) => (
            <button
              key={`memory-${index}`}
              onClick={btn.onClick}
              className={cn(
                "h-10 rounded-md font-medium text-sm flex items-center justify-center active:scale-95 transition-all duration-150",
                btn.className
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
        
        {/* Scientific buttons */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          {scientificButtons.map((btn, index) => (
            <button
              key={`scientific-${index}`}
              onClick={btn.onClick}
              className={cn(
                "h-10 rounded-md font-medium text-sm flex items-center justify-center active:scale-95 transition-all duration-150",
                btn.className
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {/* Main calculator grid */}
          <div className="col-span-3 grid grid-cols-3 gap-2">
            {numberButtons.map((btn, index) => (
              <button
                key={`number-${index}`}
                onClick={btn.onClick}
                className={cn(
                  "h-14 rounded-md font-bold text-lg flex items-center justify-center active:scale-95 transition-all duration-150",
                  btn.className
                )}
              >
                {btn.label}
              </button>
            ))}
          </div>
          
          {/* Operators column */}
          <div className="col-span-1 grid grid-cols-1 gap-2">
            {operatorButtons.map((btn, index) => (
              <button
                key={`operator-${index}`}
                onClick={btn.onClick}
                className={cn(
                  "h-14 rounded-md font-bold text-lg flex items-center justify-center active:scale-95 transition-all duration-150",
                  btn.className,
                  // Make the equal button taller
                  index === operatorButtons.length - 1 && "h-[calc(14px*2+0.5rem)]"
                )}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
