
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center space-x-2" aria-label="CalcVerse Home">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                CalcVerse
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              The universe of calculators.<br />
              Fast, accurate, beautiful.
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <a href="https://twitter.com/calcverse" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://github.com/calcverse" className="text-muted-foreground hover:text-primary" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Popular Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/calculator/basic" className="hover:underline hover:text-primary transition-colors">Basic Calculator</Link>
              </li>
              <li>
                <Link to="/calculator/bmi" className="hover:underline hover:text-primary transition-colors">BMI Calculator</Link>
              </li>
              <li>
                <Link to="/calculator/loan" className="hover:underline hover:text-primary transition-colors">Loan Calculator</Link>
              </li>
              <li>
                <Link to="/calculator/age" className="hover:underline hover:text-primary transition-colors">Age Calculator</Link>
              </li>
              <li>
                <Link to="/calculator/percentage" className="hover:underline hover:text-primary transition-colors">Percentage Calculator</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/category/finance" className="hover:underline hover:text-primary transition-colors">Finance</Link>
              </li>
              <li>
                <Link to="/category/health" className="hover:underline hover:text-primary transition-colors">Health</Link>
              </li>
              <li>
                <Link to="/category/math" className="hover:underline hover:text-primary transition-colors">Math</Link>
              </li>
              <li>
                <Link to="/category/date-time" className="hover:underline hover:text-primary transition-colors">Date & Time</Link>
              </li>
              <li>
                <Link to="/category/conversion" className="hover:underline hover:text-primary transition-colors">Conversion</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/info" className="hover:underline hover:text-primary transition-colors">About</Link>
              </li>
              <li>
                <Link to="/info#faq" className="hover:underline hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/info#privacy" className="hover:underline hover:text-primary transition-colors">Privacy</Link>
              </li>
              <li>
                <Link to="/info#contact" className="hover:underline hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:underline hover:text-primary transition-colors">Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} CalcVerse. All calculations are provided for information purposes only.</p>
          <p className="mt-2">This site uses SSL encryption to protect your data. <Link to="/info#privacy" className="text-primary hover:underline">Learn more</Link></p>
        </div>
      </div>
    </footer>
  );
};
