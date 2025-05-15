
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/CalculatorCard";
import { 
  CalculatorIcon, 
  Scale, 
  Calendar, 
  CircleDollarSign, 
  MoveHorizontal, 
  Percent, 
  Clock, 
  CalendarDays, 
  Dices, 
  Coins, 
  Tag, 
  Euro, 
  Car, 
  Timer, 
  FlaskConical, 
  Baby, 
  Salad, 
  Weight, 
  HandCoins, 
  PencilLine, 
  Home, 
  PiggyBank,
  ChartLine,
  Brain,
  TrendingUp,
  BatteryCharging,
  Cpu,
  Earth,
  HandHelping
} from "lucide-react";

const AllCalculatorsPage = () => {
  const calculators = [
    {
      title: "Basic Calculator",
      description: "Simple arithmetic calculations",
      icon: <CalculatorIcon />,
      path: "/calculator/basic"
    },
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index",
      icon: <Scale />,
      path: "/calculator/bmi",
      popular: true
    },
    {
      title: "Age Calculator",
      description: "Calculate age between dates",
      icon: <Calendar />,
      path: "/calculator/age"
    },
    {
      title: "Loan Calculator",
      description: "Calculate loan payments and interest",
      icon: <CircleDollarSign />,
      path: "/calculator/loan",
      popular: true
    },
    {
      title: "Unit Converter",
      description: "Convert between different units",
      icon: <MoveHorizontal />,
      path: "/calculator/unit-converter"
    },
    {
      title: "Percentage Calculator",
      description: "Calculate percentages and differences",
      icon: <Percent />,
      path: "/calculator/percentage"
    },
    {
      title: "Timezone Converter",
      description: "Convert times between different timezones",
      icon: <Clock />,
      path: "/calculator/timezone"
    },
    {
      title: "Date Calculator",
      description: "Calculate days between dates or add/subtract days",
      icon: <CalendarDays />,
      path: "/calculator/date"
    },
    {
      title: "Random Generator",
      description: "Generate random numbers and sequences",
      icon: <Dices />,
      path: "/calculator/random"
    },
    {
      title: "Tip Calculator",
      description: "Calculate tips and split bills",
      icon: <Coins />,
      path: "/calculator/tip"
    },
    {
      title: "Discount Calculator",
      description: "Calculate sale prices and savings",
      icon: <Tag />,
      path: "/calculator/discount"
    },
    {
      title: "Currency Converter",
      description: "Convert between different currencies",
      icon: <Euro />,
      path: "/calculator/currency",
      popular: true
    },
    {
      title: "Fuel Economy Calculator",
      description: "Calculate fuel consumption and costs",
      icon: <Car />,
      path: "/calculator/fuel-economy"
    },
    {
      title: "Time Calculator",
      description: "Add or subtract hours, minutes, and seconds",
      icon: <Timer />,
      path: "/calculator/time"
    },
    {
      title: "Scientific Calculator",
      description: "Advanced mathematical calculations",
      icon: <FlaskConical />,
      path: "/calculator/scientific"
    },
    {
      title: "Pregnancy Due Date",
      description: "Calculate pregnancy due date",
      icon: <Baby />,
      path: "/calculator/pregnancy-due"
    },
    {
      title: "Calorie Calculator",
      description: "Calculate daily calorie needs",
      icon: <Salad />,
      path: "/calculator/calorie",
      popular: true
    },
    {
      title: "Weight Converter",
      description: "Convert between weight units",
      icon: <Weight />,
      path: "/calculator/weight-converter"
    },
    {
      title: "Retirement Calculator",
      description: "Plan for retirement savings",
      icon: <HandCoins />,
      path: "/calculator/retirement"
    },
    {
      title: "GPA Calculator",
      description: "Calculate grade point average",
      icon: <PencilLine />,
      path: "/calculator/gpa"
    },
    {
      title: "Mortgage Calculator",
      description: "Calculate mortgage payments",
      icon: <Home />,
      path: "/calculator/mortgage",
      popular: true
    },
    {
      title: "Savings Calculator",
      description: "Calculate savings growth over time",
      icon: <PiggyBank />,
      path: "/calculator/savings"
    },
    {
      title: "Compound Interest",
      description: "Calculate investment growth with compound interest",
      icon: <ChartLine />,
      path: "/calculator/compound-interest"
    },
    // New calculators
    {
      title: "Mental Burnout",
      description: "Assess your burnout risk and get recovery recommendations",
      icon: <Brain />,
      path: "/calculator/mental-burnout",
      popular: true
    },
    {
      title: "Content Creator ROI",
      description: "Analyze the return on investment for your content creation",
      icon: <TrendingUp />,
      path: "/calculator/content-creator-roi"
    },
    {
      title: "EV Charging Cost",
      description: "Compare EV charging costs and time tradeoffs",
      icon: <BatteryCharging />,
      path: "/calculator/ev-charge"
    },
    {
      title: "AI Cost Estimator",
      description: "Calculate and optimize your AI API expenses",
      icon: <Cpu />,
      path: "/calculator/ai-cost",
      popular: true
    },
    {
      title: "Sustainability",
      description: "Measure the carbon footprint of your daily habits",
      icon: <Earth />,
      path: "/calculator/sustainability"
    },
    {
      title: "Freelancer Pricing",
      description: "Analyze your freelance rates against market benchmarks",
      icon: <HandHelping />,
      path: "/calculator/freelancer-pricing",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">All Calculators</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive collection of calculators designed to help with various calculations and conversions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {calculators.map((calc, index) => (
              <CalculatorCard
                key={index}
                title={calc.title}
                description={calc.description}
                icon={calc.icon}
                path={calc.path}
                popular={calc.popular}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllCalculatorsPage;
