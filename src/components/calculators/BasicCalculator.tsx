
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Delete, RotateCcw, Plus, Minus, X, Divide, Equal } from "lucide-react";

export const BasicCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isResult, setIsResult] = useState(false);
  
  const appendValue = (value: string) => {
    if (isResult) {
      setDisplay(value);
      setEquation("");
      setIsResult(false);
      return;
    }
    
    if (display === "0") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };
  
  const appendOperator = (operator: string) => {
    setIsResult(false);
    
    if (isResult) {
      setEquation(display + operator);
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
        : result.toFixed(8).replace(/\.?0+$/, "");
      
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
  
  const handleButtonPress = (value: string) => {
    switch (value) {
      case "C":
        clear();
        break;
      case "⌫":
        backspace();
        break;
      case "=":
        calculateResult();
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        appendOperator(value);
        break;
      default:
        appendValue(value);
        break;
    }
  };

  // Define button types with custom styles using consistent color scheme
  const getButtonClass = (btn: string) => {
    if (btn === "=") {
      return "col-span-1 row-span-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all";
    }
    if (btn === "C") {
      return "bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all";
    }
    if (btn === "⌫") {
      return "bg-calculator-backspace text-primary-foreground hover:opacity-90 transition-all";
    }
    if (["+", "-", "×", "÷"].includes(btn)) {
      return "bg-primary text-primary-foreground hover:bg-primary/90 transition-all";
    }
    return "bg-muted hover:bg-muted/80 transition-all text-foreground";
  };

  const buttons = [
    "C", "⌫", "÷", "×", 
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", "=",
    "0", ".", ""
  ];

  const renderButtonIcon = (btn: string) => {
    switch (btn) {
      case "+": return <Plus className="size-4" />;
      case "-": return <Minus className="size-4" />;
      case "×": return <X className="size-4" />;
      case "÷": return <Divide className="size-4" />;
      case "=": return <Equal className="size-4" />;
      case "C": return <RotateCcw className="size-4" />;
      case "⌫": return <Delete className="size-4" />;
      default: return btn;
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl overflow-hidden border-0 bg-card backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10 pb-2 flex flex-row items-center gap-2">
        <Calculator className="size-5 text-primary" />
        <CardTitle className="text-xl font-bold text-primary">Basic Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="bg-muted rounded-xl p-5 mb-5 text-right shadow-inner">
          <div className="text-sm text-muted-foreground h-5 font-mono overflow-hidden">
            {equation}
          </div>
          <div className="text-3xl font-mono font-bold overflow-x-auto scrollbar-none text-foreground min-h-12 flex items-center justify-end">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => btn && handleButtonPress(btn)}
              className={`
                h-16 rounded-xl font-bold text-lg flex items-center justify-center
                active:scale-95 transition-all duration-150 animate-button-press
                ${!btn ? "invisible" : ""}
                ${getButtonClass(btn)}
              `}
              aria-label={btn || "empty"}
            >
              {renderButtonIcon(btn)}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
