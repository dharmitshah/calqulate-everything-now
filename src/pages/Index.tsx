import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/CalculatorCard";
import AICalculator from "@/components/calculators/AICalculator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { SEOEnhancements } from "@/components/SEOEnhancements";
import { Brain, Sparkles, GraduationCap, Calculator, TrendingUp, Heart, CheckCircle2, Zap, Star } from "lucide-react";

const Index = () => {
  // Enhanced structured data for homepage - targeting featured snippets
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Quickulus - AI Math Solver",
    "alternateName": ["AI Math Calculator", "Free Math Problem Solver", "Calculus Solver Online"],
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "url": "https://quickulus.com",
    "description": "Free AI-powered math solver with step-by-step solutions. Solve calculus, algebra, integration, differentiation, and homework problems instantly. Better than Photomath - no signup required.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "4850",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "AI Math Problem Solver",
      "Step-by-Step Solutions",
      "Calculus Calculator (Integration & Differentiation)",
      "Algebra Solver",
      "Homework Math Helper",
      "Scientific Calculator",
      "No Signup Required",
      "100% Free"
    ],
    "author": {
      "@type": "Organization",
      "name": "Quickulus"
    }
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Quickulus - AI Math Solver",
        "item": "https://quickulus.com"
      }
    ]
  };

  // Additional video structured data for potential video carousels
  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Solve Math Problems with AI",
    "description": "Learn how to use Quickulus AI Math Solver to get step-by-step solutions for any math problem",
    "totalTime": "PT1M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Enter Your Math Problem",
        "text": "Type your math problem in plain English or mathematical notation. Our AI understands calculus, algebra, and more."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Click Solve",
        "text": "Press the solve button to submit your problem to our AI math solver."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Get Step-by-Step Solution",
        "text": "Receive a detailed step-by-step solution explaining how to solve the problem."
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

  // Why Quickulus vs competitors (for SEO content)
  const whyQuickulus = [
    { title: "100% Free Forever", desc: "No premium paywall like Photomath Pro or Mathway Plus" },
    { title: "No Signup Required", desc: "Start solving immediately - no email, no account" },
    { title: "Step-by-Step Solutions", desc: "Learn the process, don't just get answers" },
    { title: "All Math Topics", desc: "From basic arithmetic to advanced calculus" },
  ];

  return (
    <>
      <SEO 
        title="AI Math Solver - Free Step-by-Step Calculator for Calculus & Homework"
        description="Solve any math problem instantly with Quickulus AI. Free step-by-step solutions for calculus, integration, differentiation, algebra & homework. Better than Photomath - no signup required."
        keywords="AI math solver, free AI calculator, math problem solver, calculus solver, integration calculator, differentiation calculator, homework math solver, algebra solver, step by step math solver, AI homework helper, free math solver, Photomath alternative, Mathway alternative, solve math problems, calculus help"
        canonicalUrl="https://quickulus.com/"
      />
      <StructuredData data={websiteStructuredData} />
      <StructuredData data={breadcrumbStructuredData} />
      <StructuredData data={howToStructuredData} />
      <SEOEnhancements 
        prefetchLinks={["/calculator/ai", "/calculators", "/calculator/scientific"]}
      />
      
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

        {/* SEO Content - AI Math Solver Focus - Enhanced for Rankings */}
        <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900" id="features">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              <header className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  The Best Free AI Math Problem Solver Online
                </h2>
                <p className="text-muted-foreground text-lg">
                  Quickulus is the <strong>free alternative to Photomath and Mathway</strong>. Get unlimited step-by-step solutions without premium subscriptions.
                </p>
              </header>
              
              {/* Why Choose Quickulus - Trust Signals */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                {whyQuickulus.map((item) => (
                  <div key={item.title} className="text-center p-4 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 mx-auto text-green-500 mb-2" />
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <article className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-600" aria-hidden="true" />
                    Perfect for Students & Homework Help
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Homework math solver</strong> - Get instant step-by-step solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Calculus help</strong> - Integration & differentiation explained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Algebra solver</strong> - Equations, inequalities, factoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong>SAT & ACT prep</strong> - Practice with real problem types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong>AP Calculus ready</strong> - AB & BC curriculum covered</span>
                    </li>
                  </ul>
                </article>
                
                <article className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" aria-hidden="true" />
                    Powerful AI Math Capabilities
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Natural language input</strong> - Type problems in plain English</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Integration calculator</strong> - Definite & indefinite integrals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Derivative calculator</strong> - Chain rule, product rule, more</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Differential equations</strong> - First & second order ODEs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span><strong>Linear algebra</strong> - Matrices, eigenvalues, determinants</span>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="py-12 md:py-16" aria-labelledby="categories-heading">
          <div className="container px-4 md:px-6">
            <header className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 id="categories-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Free Online Calculator Categories
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Find the perfect calculator for any task - all 100% free.
                </p>
              </div>
            </header>
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