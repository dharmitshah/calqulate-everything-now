
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/CalculatorCard";
import { BasicCalculator } from "@/components/calculators/BasicCalculator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredCalculators = [
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and check your weight category.",
      path: "/calculator/bmi",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
        </svg>
      ),
      popular: true
    },
    {
      title: "Scientific Calculator",
      description: "Advanced calculator with trigonometric functions, logarithms, and more.",
      path: "/calculator/scientific",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
        </svg>
      ),
      popular: true
    },
    {
      title: "Mortgage Calculator",
      description: "Estimate your monthly mortgage payments and total costs.",
      path: "/calculator/mortgage",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      popular: true
    },
    {
      title: "Calorie Calculator",
      description: "Calculate daily calorie needs and macronutrients based on your goals.",
      path: "/calculator/calorie",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>
      ),
      popular: true
    }
  ];
  
  const popularCategories = [
    {
      name: "Finance",
      count: 12,
      path: "/category/finance",
    },
    {
      name: "Health",
      count: 8,
      path: "/category/health",
    },
    {
      name: "Math",
      count: 15,
      path: "/category/math",
    },
    {
      name: "Tech",
      count: 7,
      path: "/category/tech",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Quickulus
                  </span>
                  <br />
                  The Universe of Calculators
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Fast, accurate, and beautifully designed calculators for everything you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <Link to="/calculators">
                      Explore All Calculators
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-md lg:max-w-none flex justify-center">
                <BasicCalculator />
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
                  Featured Calculators
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Explore our most popular and useful calculators.
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
                <Link to="/calculators">View All Calculators</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900">
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
                  className="group relative overflow-hidden rounded-lg bg-white dark:bg-slate-800 p-6 shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{category.count} calculators</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* SEO-rich content section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Why Use Our Calculators?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong>Fast & Accurate</strong> - Get instant results with precision.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong>Modern Design</strong> - Clean, intuitive interface on any device.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong>Free to Use</strong> - All calculators are 100% free with no ads.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong>Privacy Focused</strong> - No data collection or tracking.</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Popular Calculations
                </h2>
                <p>
                  Our most frequently used calculators help with everyday tasks:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-6 w-6 mr-2 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 flex-shrink-0">1</span>
                    <span><strong>Financial Planning</strong> - Mortgage, retirement, and savings calculations for your future.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 mr-2 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 flex-shrink-0">2</span>
                    <span><strong>Health & Fitness</strong> - BMI, calorie needs, and pregnancy planning tools.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 mr-2 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 flex-shrink-0">3</span>
                    <span><strong>Everyday Math</strong> - Unit conversion, percentage calculations, and tip splitting.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 mr-2 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 flex-shrink-0">4</span>
                    <span><strong>Academic Tools</strong> - GPA calculator, scientific functions, and date calculations.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-12 md:py-16 bg-blue-50 dark:bg-slate-800/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Calculate?
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Explore our full range of calculators and tools.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link to="/calculators">
                    Get Started
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/info">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
