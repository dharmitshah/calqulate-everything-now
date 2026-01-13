import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/CalculatorCard";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
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

type CategoryKey = "finance" | "health" | "math" | "tech";

interface Calculator {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  popular?: boolean;
  category: CategoryKey;
}

const allCalculators: Calculator[] = [
  // Finance
  {
    title: "Loan Calculator",
    description: "Calculate loan payments and interest",
    icon: <CircleDollarSign />,
    path: "/calculator/loan",
    popular: true,
    category: "finance"
  },
  {
    title: "Mortgage Calculator",
    description: "Calculate mortgage payments",
    icon: <Home />,
    path: "/calculator/mortgage",
    popular: true,
    category: "finance"
  },
  {
    title: "Savings Calculator",
    description: "Calculate savings growth over time",
    icon: <PiggyBank />,
    path: "/calculator/savings",
    category: "finance"
  },
  {
    title: "Compound Interest",
    description: "Calculate investment growth with compound interest",
    icon: <ChartLine />,
    path: "/calculator/compound-interest",
    category: "finance"
  },
  {
    title: "Retirement Calculator",
    description: "Plan for retirement savings",
    icon: <HandCoins />,
    path: "/calculator/retirement",
    category: "finance"
  },
  {
    title: "Currency Converter",
    description: "Convert between different currencies",
    icon: <Euro />,
    path: "/calculator/currency",
    popular: true,
    category: "finance"
  },
  {
    title: "Tip Calculator",
    description: "Calculate tips and split bills",
    icon: <Coins />,
    path: "/calculator/tip",
    category: "finance"
  },
  {
    title: "Discount Calculator",
    description: "Calculate sale prices and savings",
    icon: <Tag />,
    path: "/calculator/discount",
    category: "finance"
  },
  {
    title: "Freelancer Pricing",
    description: "Analyze your freelance rates against market benchmarks",
    icon: <HandHelping />,
    path: "/calculator/freelancer-pricing",
    popular: true,
    category: "finance"
  },
  // Health
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    icon: <Scale />,
    path: "/calculator/bmi",
    popular: true,
    category: "health"
  },
  {
    title: "Calorie Calculator",
    description: "Calculate daily calorie needs",
    icon: <Salad />,
    path: "/calculator/calorie",
    popular: true,
    category: "health"
  },
  {
    title: "Pregnancy Due Date",
    description: "Calculate pregnancy due date",
    icon: <Baby />,
    path: "/calculator/pregnancy-due",
    category: "health"
  },
  {
    title: "Weight Converter",
    description: "Convert between weight units",
    icon: <Weight />,
    path: "/calculator/weight-converter",
    category: "health"
  },
  {
    title: "Age Calculator",
    description: "Calculate age between dates",
    icon: <Calendar />,
    path: "/calculator/age",
    category: "health"
  },
  {
    title: "Mental Burnout",
    description: "Assess your burnout risk and get recovery recommendations",
    icon: <Brain />,
    path: "/calculator/mental-burnout",
    popular: true,
    category: "health"
  },
  // Math
  {
    title: "Basic Calculator",
    description: "Simple arithmetic calculations",
    icon: <CalculatorIcon />,
    path: "/calculator/basic",
    category: "math"
  },
  {
    title: "Scientific Calculator",
    description: "Advanced mathematical calculations",
    icon: <FlaskConical />,
    path: "/calculator/scientific",
    category: "math"
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentages and differences",
    icon: <Percent />,
    path: "/calculator/percentage",
    category: "math"
  },
  {
    title: "Unit Converter",
    description: "Convert between different units",
    icon: <MoveHorizontal />,
    path: "/calculator/unit-converter",
    category: "math"
  },
  {
    title: "Date Calculator",
    description: "Calculate days between dates or add/subtract days",
    icon: <CalendarDays />,
    path: "/calculator/date",
    category: "math"
  },
  {
    title: "Time Calculator",
    description: "Add or subtract hours, minutes, and seconds",
    icon: <Timer />,
    path: "/calculator/time",
    category: "math"
  },
  {
    title: "Timezone Converter",
    description: "Convert times between different timezones",
    icon: <Clock />,
    path: "/calculator/timezone",
    category: "math"
  },
  {
    title: "Random Generator",
    description: "Generate random numbers and sequences",
    icon: <Dices />,
    path: "/calculator/random",
    category: "math"
  },
  {
    title: "GPA Calculator",
    description: "Calculate grade point average",
    icon: <PencilLine />,
    path: "/calculator/gpa",
    category: "math"
  },
  // Tech
  {
    title: "AI Cost Estimator",
    description: "Calculate and optimize your AI API expenses",
    icon: <Cpu />,
    path: "/calculator/ai-cost",
    popular: true,
    category: "tech"
  },
  {
    title: "EV Charging Cost",
    description: "Compare EV charging costs and time tradeoffs",
    icon: <BatteryCharging />,
    path: "/calculator/ev-charge",
    category: "tech"
  },
  {
    title: "Content Creator ROI",
    description: "Analyze the return on investment for your content creation",
    icon: <TrendingUp />,
    path: "/calculator/content-creator-roi",
    category: "tech"
  },
  {
    title: "Fuel Economy Calculator",
    description: "Calculate fuel consumption and costs",
    icon: <Car />,
    path: "/calculator/fuel-economy",
    category: "tech"
  },
  {
    title: "Sustainability",
    description: "Measure the carbon footprint of your daily habits",
    icon: <Earth />,
    path: "/calculator/sustainability",
    category: "tech"
  }
];

const categoryInfo: Record<CategoryKey, { title: string; description: string }> = {
  finance: {
    title: "Finance Calculators",
    description: "Calculate loans, mortgages, savings, investments, and more to manage your finances effectively."
  },
  health: {
    title: "Health Calculators",
    description: "Track your health metrics including BMI, calories, and wellness indicators."
  },
  math: {
    title: "Math Calculators",
    description: "Perform mathematical calculations, conversions, and solve complex equations."
  },
  tech: {
    title: "Tech Calculators",
    description: "Calculate technology-related metrics including AI costs, EV charging, and sustainability."
  }
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  const validCategories: CategoryKey[] = ["finance", "health", "math", "tech"];
  
  if (!category || !validCategories.includes(category as CategoryKey)) {
    return <Navigate to="/calculators" replace />;
  }
  
  const categoryKey = category as CategoryKey;
  const filteredCalculators = allCalculators.filter(calc => calc.category === categoryKey);
  const info = categoryInfo[categoryKey];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": info.title,
    "description": info.description,
    "url": `https://quickulus.com/category/${categoryKey}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filteredCalculators.map((calc, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": calc.title,
        "url": `https://quickulus.com${calc.path}`
      }))
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={info.title}
        description={info.description}
        keywords={`${categoryKey} calculators, free ${categoryKey} tools, online ${categoryKey} calculator`}
      />
      <StructuredData data={structuredData} />
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{info.title}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {info.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredCalculators.map((calc, index) => (
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

export default CategoryPage;
