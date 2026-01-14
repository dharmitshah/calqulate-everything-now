import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background" itemScope itemType="https://schema.org/WPFooter">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div itemScope itemType="https://schema.org/Organization">
            <Link to="/" className="flex items-center space-x-2" aria-label="Quickulus Home - AI Math Solver">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent" itemProp="name">
                Quickulus
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground" itemProp="description">
              Free AI Math Solver & Calculator.<br />
              Solve calculus, algebra, and homework problems with step-by-step solutions.
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <a 
                href="https://twitter.com/quickulus" 
                className="text-muted-foreground hover:text-primary transition-colors" 
                aria-label="Follow Quickulus on Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter" aria-hidden="true">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a 
                href="https://github.com/quickulus" 
                className="text-muted-foreground hover:text-primary transition-colors" 
                aria-label="View Quickulus on GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github" aria-hidden="true">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Popular Calculators - Enhanced Internal Linking */}
          <nav aria-label="Popular calculators">
            <h3 className="text-sm font-medium mb-3">Popular Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/calculator/ai" className="hover:underline hover:text-primary transition-colors font-medium">
                  AI Math Solver - Free Homework Help
                </Link>
              </li>
              <li>
                <Link to="/calculator/scientific" className="hover:underline hover:text-primary transition-colors">
                  Scientific Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculator/mortgage" className="hover:underline hover:text-primary transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculator/bmi" className="hover:underline hover:text-primary transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculator/compound-interest" className="hover:underline hover:text-primary transition-colors">
                  Compound Interest Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculator/percentage" className="hover:underline hover:text-primary transition-colors">
                  Percentage Calculator
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Categories - Better Anchor Text */}
          <nav aria-label="Calculator categories">
            <h3 className="text-sm font-medium mb-3">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/calculators" className="hover:underline hover:text-primary transition-colors">
                  All Free Online Calculators
                </Link>
              </li>
              <li>
                <Link to="/category/finance" className="hover:underline hover:text-primary transition-colors">
                  Finance & Investment Calculators
                </Link>
              </li>
              <li>
                <Link to="/category/health" className="hover:underline hover:text-primary transition-colors">
                  Health & Fitness Calculators
                </Link>
              </li>
              <li>
                <Link to="/category/math" className="hover:underline hover:text-primary transition-colors">
                  Math & Scientific Calculators
                </Link>
              </li>
              <li>
                <Link to="/category/tech" className="hover:underline hover:text-primary transition-colors">
                  Tech & AI Calculators
                </Link>
              </li>
              <li>
                <Link to="/category/lifestyle" className="hover:underline hover:text-primary transition-colors">
                  Lifestyle & Daily Calculators
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Company Links */}
          <nav aria-label="Company information">
            <h3 className="text-sm font-medium mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:underline hover:text-primary transition-colors">
                  About Quickulus
                </Link>
              </li>
              <li>
                <Link to="/info" className="hover:underline hover:text-primary transition-colors">
                  FAQ & Help Center
                </Link>
              </li>
              <li>
                <Link to="/developers" className="hover:underline hover:text-primary transition-colors">
                  Calculator API for Developers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:support@quickulus.com" 
                  className="hover:underline hover:text-primary transition-colors"
                  aria-label="Email Quickulus support"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Bottom Section with Trust Signals */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Quickulus. Free AI-powered calculators for students worldwide.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                SSL Secured
              </span>
              <span>•</span>
              <span>No signup required</span>
              <span>•</span>
              <span>100% Free</span>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground/70">
            Quickulus provides free online calculators for educational purposes. Results are estimates only. 
            <Link to="/info" className="text-primary hover:underline ml-1">
              Need help? Visit our FAQ
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
