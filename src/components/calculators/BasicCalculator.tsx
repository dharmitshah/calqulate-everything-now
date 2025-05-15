
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  
  const handleButtonPress = (value: string) => {
    switch (value) {
      case "C":
        clear();
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
  
  const buttons = [
    "C", "÷", "×", "-",
    "7", "8", "9", "+",
    "4", "5", "6", "",
    "1", "2", "3", "=",
    "0", ".", ""
  ];

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20 pb-2">
        <CardTitle className="text-xl">Basic Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-calculator-display rounded-md p-4 mb-4 text-right">
          <div className="text-sm text-gray-500 h-5">
            {equation}
          </div>
          <div className="text-3xl font-mono font-semibold overflow-x-auto">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => btn && handleButtonPress(btn)}
              className={`
                h-14 rounded-md font-semibold text-lg flex items-center justify-center
                active:animate-button-press transition-colors
                ${!btn ? "invisible" : ""}
                ${btn === "=" ? "col-span-1 row-span-2 bg-calculator-equals text-white hover:bg-blue-600" : ""}
                ${["C"].includes(btn) ? "bg-red-200 hover:bg-red-300" : ""}
                ${["+", "-", "×", "÷"].includes(btn) ? "bg-calculator-operation hover:bg-blue-200" : ""}
                ${!["=", "C", "+", "-", "×", "÷"].includes(btn) && btn ? "bg-calculator-button hover:bg-slate-300" : ""}
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
