
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                CalcVerse
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              The universe of calculators.<br />
              Fast, accurate, beautiful.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Popular Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/calculator/basic" className="hover:underline">Basic Calculator</Link>
              </li>
              <li>
                <Link to="/calculator/bmi" className="hover:underline">BMI Calculator</Link>
              </li>
              <li>
                <Link to="/calculator/loan" className="hover:underline">Loan Calculator</Link>
              </li>
              <li>
                <Link to="/calculator/age" className="hover:underline">Age Calculator</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/category/finance" className="hover:underline">Finance</Link>
              </li>
              <li>
                <Link to="/category/health" className="hover:underline">Health</Link>
              </li>
              <li>
                <Link to="/category/math" className="hover:underline">Math</Link>
              </li>
              <li>
                <Link to="/category/tech" className="hover:underline">Tech</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/info" className="hover:underline">About</Link>
              </li>
              <li>
                <Link to="/info#faq" className="hover:underline">FAQ</Link>
              </li>
              <li>
                <Link to="/info#privacy" className="hover:underline">Privacy</Link>
              </li>
              <li>
                <Link to="/info#contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} CalcVerse. All calculations are provided for information purposes only.</p>
        </div>
      </div>
    </footer>
  );
};
