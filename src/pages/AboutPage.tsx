
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorIcon, Users, Target, Shield } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Quickulus</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The universe of calculators designed to make complex calculations simple, 
              fast, and accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At Quickulus, we believe that everyone should have access to powerful, 
                accurate calculation tools without the complexity of traditional software. 
                Our mission is to provide a comprehensive suite of calculators that serve 
                professionals, students, and everyday users alike.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Why Choose Quickulus?</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fast, accurate calculations performed instantly in your browser</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>No installation required - works on any device with a web browser</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Privacy-focused design - your data stays on your device</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Responsive design that works seamlessly on mobile and desktop</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Our Calculator Suite</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                From basic arithmetic to complex financial modeling, our calculators cover 
                a wide range of needs. Whether you're calculating your mortgage payments, 
                determining your daily calorie needs, or converting units, we have the tools 
                you need.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Financial</h3>
                  <p className="text-sm text-muted-foreground">
                    Mortgage, loan, savings, and investment calculators
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Health</h3>
                  <p className="text-sm text-muted-foreground">
                    BMI, calorie, pregnancy, and fitness calculators
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Academic</h3>
                  <p className="text-sm text-muted-foreground">
                    GPA, scientific, and mathematical calculators
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Everyday</h3>
                  <p className="text-sm text-muted-foreground">
                    Unit conversion, tip, discount, and time calculators
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalculatorIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comprehensive Tools</h3>
              <p className="text-muted-foreground text-sm">
                Over 30 specialized calculators covering finance, health, academics, and daily life
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground text-sm">
                All calculations happen locally in your browser - we never store your personal data
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Accurate Results</h3>
              <p className="text-muted-foreground text-sm">
                Built with precision in mind, our calculators provide reliable results you can trust
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Get Started Today</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore our comprehensive collection of calculators and discover how Quickulus 
              can simplify your calculations. No registration required - just pick a calculator 
              and start computing!
            </p>
            <a 
              href="/calculators" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse All Calculators
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
