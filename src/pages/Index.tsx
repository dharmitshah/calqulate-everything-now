import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/CalculatorCard";
import AICalculator from "@/components/calculators/AICalculator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Brain, Sparkles, GraduationCap, Calculator, TrendingUp, Heart } from "lucide-react";

const Index = () => {
  // Structured data for homepage
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Quickulus - AI Math Solver",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "url": "https://quickulus.com",
    "description": "Free AI-powered math solver and calculator. Solve calculus, algebra, integration, differentiation, and homework problems instantly with step-by-step solutions.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2850",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "AI Math Solver",
      "Calculus Calculator",
      "Integration Calculator",
      "Differentiation Calculator",
      "Homework Math Solver",
      "Step-by-Step Solutions",
      "Algebra Solver",
      "Scientific Calculator"
    ]
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://quickulus.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Calculator",
        "item": "https://quickulus.com/calculator/ai"
      }
    ]
  };

  const featuredCalculators = [
    {
      title: "AI Math Solver",
      description: "Solve any math problem with AI - calculus, algebra, homework help with step-by-step solutions.",
      path: "/calculator/ai",
      icon: <Brain className="w-6 h-6" />,
      popular: true
    },
    {
      title: "Scientific Calculator",
      description: "Advanced calculator with trigonometric functions, logarithms, and more.",
      path: "/calculator/scientific",
      icon: <Calculator className="w-6 h-6" />,
      popular: true
    },
    {
      title: "GPA Calculator",
      description: "Calculate your Grade Point Average based on your course grades.",
      path: "/calculator/gpa",
      icon: <GraduationCap className="w-6 h-6" />,
      popular: true
    },
    {
      title: "Mortgage Calculator",
      description: "Estimate your monthly mortgage payments and total costs.",
      path: "/calculator/mortgage",
      icon: <TrendingUp className="w-6 h-6" />,
      popular: true
    }
  ];
  
  const popularCategories = [
    {
      name: "Math & AI",
      count: 15,
      path: "/category/math",
      description: "AI solver, calculus, algebra"
    },
    {
      name: "Finance",
      count: 12,
      path: "/category/finance",
      description: "Mortgage, loans, savings"
    },
    {
      name: "Health",
      count: 8,
      path: "/category/health",
      description: "BMI, calories, fitness"
    },
    {
      name: "Tech",
      count: 7,
      path: "/category/tech",
      description: "Converters, generators"
    }
  ];

  const aiCapabilities = [
    { icon: "∫", title: "Integration", desc: "Definite & indefinite integrals" },
    { icon: "d/dx", title: "Derivatives", desc: "Differentiation & calculus" },
    { icon: "Σ", title: "Series", desc: "Taylor, Maclaurin, sequences" },
    { icon: "λ", title: "Linear Algebra", desc: "Matrices, eigenvalues" },
    { icon: "lim", title: "Limits", desc: "Limits & continuity" },
    { icon: "📐", title: "Geometry", desc: "Areas, volumes, angles" },
  ];

  return (
    <>
      <SEO 
        title="AI Math Solver - Free Calculator for Calculus, Algebra & Homework Help"
        description="Free AI-powered math problem solver. Solve integration, differentiation, calculus, algebra, and homework problems instantly with step-by-step solutions. No signup required."
        keywords="AI math solver, AI calculator, math problem solver, calculus solver, integration calculator, differentiation calculator, homework math solver, algebra solver, step by step math solver, AI homework helper, free math solver, online math solver"
        canonicalUrl="https://quickulus.com/"
      />
      <StructuredData data={websiteStructuredData} />
      <StructuredData data={breadcrumbStructuredData} />
      
      <div className="min-h-screen flex flex-col">
        <Header />
      
      <main className="flex-grow">
        {/* Hero Section - AI Calculator Focus */}
        <section className="bg-gradient-to-b from-purple-50 via-white to-slate-50 dark:from-purple-950/20 dark:via-slate-900 dark:to-slate-800 py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Powered by Advanced AI
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                    AI Math Solver
                  </span>
                  <br />
                  <span className="text-foreground">
                    Solve Any Problem Instantly
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
                  The smartest math calculator online. Solve <strong>calculus</strong>, <strong>integration</strong>, <strong>differentiation</strong>, algebra, and homework problems with <strong>step-by-step solutions</strong>.
                </p>
                
                {/* AI Capabilities Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                  {aiCapabilities.map((cap) => (
                    <div key={cap.title} className="flex items-center gap-3 p-3 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/30">
                      <span className="text-xl font-bold text-purple-600 dark:text-purple-400 min-w-[2.5rem]">{cap.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{cap.title}</p>
                        <p className="text-xs text-muted-foreground">{cap.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600" asChild>
                    <Link to="/calculator/ai">
                      <Brain className="mr-2 h-5 w-5" />
                      Try AI Calculator Free
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/calculators">
                      View All Calculators
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-lg lg:max-w-none">
                <AICalculator />
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Use Cases */}
        <section className="py-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold">1M+</p>
                <p className="text-purple-100">Problems Solved</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">50K+</p>
                <p className="text-purple-100">Students Helped</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">99%</p>
                <p className="text-purple-100">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">Free</p>
                <p className="text-purple-100">Forever</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Calculators */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Popular Math & Calculator Tools
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  AI-powered solving, scientific calculations, and everyday math.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {featuredCalculators.map((calculator) => (
                <CalculatorCard
                  key={calculator.title}
                  title={calculator.title}
                  description={calculator.description}
                  icon={calculator.icon}
                  path={calculator.path}
                  popular={calculator.popular}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" asChild>
                <Link to="/calculators">View All 30+ Calculators</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* SEO Content - AI Math Solver Focus */}
        <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  The Best Free AI Math Problem Solver
                </h2>
                <p className="text-muted-foreground text-lg">
                  Whether you're a student needing homework help or a professional solving complex equations, our AI calculator handles it all.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    Perfect for Students
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✓ <strong>Homework math solver</strong> - Get step-by-step solutions</li>
                    <li>✓ <strong>Calculus help</strong> - Integration & differentiation made easy</li>
                    <li>✓ <strong>Algebra solver</strong> - Equations, inequalities, factoring</li>
                    <li>✓ <strong>Learn while solving</strong> - Understand each step</li>
                    <li>✓ <strong>Free for students</strong> - No signup or payment</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    Advanced AI Capabilities
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✓ <strong>Natural language input</strong> - Type problems in plain English</li>
                    <li>✓ <strong>Integration calculator</strong> - Definite & indefinite integrals</li>
                    <li>✓ <strong>Derivative calculator</strong> - All differentiation rules</li>
                    <li>✓ <strong>Differential equations</strong> - ODEs and PDEs</li>
                    <li>✓ <strong>Matrix operations</strong> - Eigenvalues, determinants</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Calculator Categories
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Find exactly what you need, organized by category.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {popularCategories.map((category) => (
                <Link 
                  key={category.name}
                  to={category.path}
                  className="group relative overflow-hidden rounded-lg bg-white dark:bg-slate-800 p-6 shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                    <p className="text-xs text-primary mt-2">{category.count} calculators</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-purple-600 to-pink-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Solve Any Math Problem?
                </h2>
                <p className="text-purple-100 md:text-xl">
                  Join thousands of students using our free AI math solver.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/calculator/ai">
                    <Brain className="mr-2 h-5 w-5" />
                    Start Solving Free
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                  <Link to="/info" aria-label="Learn more about Quickulus calculators and FAQ">
                    View FAQ & Help
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
    </>
  );
};

export default Index;