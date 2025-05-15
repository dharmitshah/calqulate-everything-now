
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeCalculator } from "@/components/calculators/AgeCalculator";
import { CalculatorCard } from "@/components/CalculatorCard";

const AgeCalculatorPage = () => {
  const relatedCalculators = [
    {
      title: "Basic Calculator",
      description: "A simple calculator for basic arithmetic operations.",
      path: "/calculator/basic",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
        </svg>
      )
    },
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and check your weight category.",
      path: "/calculator/bmi",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
        </svg>
      )
    },
    {
      title: "Loan Calculator",
      description: "Calculate monthly payments, total interest, and view amortization schedule.",
      path: "/calculator/loan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Age Calculator</h1>
            <p className="text-muted-foreground">
              Calculate your exact age in years, months, and days from your date of birth.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <AgeCalculator />
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <p className="mb-4">
                The Age Calculator determines your exact age by finding the difference between your date of birth and today's date. It considers:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>The number of complete years that have passed</li>
                <li>The number of remaining months</li>
                <li>The number of remaining days</li>
              </ul>
              <p>
                This provides a precise measurement of your age rather than just the calendar year difference.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Uses of Age Calculator</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Determining exact age for legal purposes</li>
                <li>Finding out your precise age for personal interest</li>
                <li>Planning age-related milestone celebrations</li>
                <li>Calculating age eligibility for various services, benefits, or programs</li>
                <li>Tracking development stages in children</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Example Calculations</h2>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <p className="font-medium mb-2">Example 1:</p>
                  <p className="mb-2">Date of Birth: January 15, 1990</p>
                  <p className="mb-2">Today's Date: May 15, 2025</p>
                  <p>Age: 35 years, 4 months, 0 days</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <p className="font-medium mb-2">Example 2:</p>
                  <p className="mb-2">Date of Birth: October 30, 2000</p>
                  <p className="mb-2">Today's Date: May 15, 2025</p>
                  <p>Age: 24 years, 6 months, 15 days</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">FAQs</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">How does the calculator handle leap years?</h3>
                  <p className="text-muted-foreground">
                    The calculator takes leap years into account to ensure accurate calculations of days between dates.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Can I calculate age between two custom dates?</h3>
                  <p className="text-muted-foreground">
                    Currently, the calculator finds age from birth date to today. A future version may support calculating time between any two dates.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Is my birth date information stored?</h3>
                  <p className="text-muted-foreground">
                    No, all calculations are performed directly in your browser. Your birth date is not stored or transmitted anywhere.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">How accurate is the age calculation?</h3>
                  <p className="text-muted-foreground">
                    The calculator provides exact calculations to the day, accounting for varying month lengths and leap years.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedCalculators.map((calculator) => (
                  <CalculatorCard
                    key={calculator.title}
                    title={calculator.title}
                    description={calculator.description}
                    icon={calculator.icon}
                    path={calculator.path}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AgeCalculatorPage;
