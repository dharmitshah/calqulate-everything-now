
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2" aria-label="Quickulus Home">
            {/* Inline SVG logo for performance - no external image load */}
            <svg 
              className="w-8 h-8 rounded-lg" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="32" height="32" rx="8" fill="url(#logoGradient)" />
              <text x="8" y="23" fontSize="18" fontWeight="bold" fill="white" fontFamily="system-ui">Q</text>
              <defs>
                <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#9333ea" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-2xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Quickulus
            </span>
          </Link>
        </div>
        
        {!isMobile ? (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className={`transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary font-medium' : ''}`}>
              Home
            </Link>
            <Link 
              to="/calculator/ai" 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all ${location.pathname === '/calculator/ai' ? 'ring-2 ring-purple-300' : ''}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Math Solver
            </Link>
            <Link to="/calculators" className={`transition-colors hover:text-primary ${location.pathname === '/calculators' ? 'text-primary font-medium' : ''}`}>
              All Calculators
            </Link>
            <Link to="/info" className={`transition-colors hover:text-primary ${location.pathname === '/info' ? 'text-primary font-medium' : ''}`}>
              FAQ
            </Link>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search..."
                className="pl-8 h-9 md:w-[150px] lg:w-[200px] rounded-xl border bg-background/80 backdrop-blur-sm px-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search calculators"
              />
            </div>
            <ThemeToggle />
          </nav>
        ) : (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        )}
      </div>
      
      {/* Mobile menu with improved animations and accessibility */}
      {isMobile && mobileMenuOpen && (
        <div className="container pb-4 md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-4 mt-2">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg hover:bg-accent/10 text-lg ${location.pathname === '/' ? 'bg-accent/10 text-primary' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/calculator/ai" 
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sparkles className="w-4 h-4" />
              AI Math Solver
            </Link>
            <Link 
              to="/calculators" 
              className={`px-3 py-2 rounded-lg hover:bg-accent/10 text-lg ${location.pathname === '/calculators' ? 'bg-accent/10 text-primary' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              All Calculators
            </Link>
            <Link 
              to="/info" 
              className={`px-3 py-2 rounded-lg hover:bg-accent/10 text-lg ${location.pathname === '/info' ? 'bg-accent/10 text-primary' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search calculators..."
                className="pl-10 h-10 w-full rounded-xl border bg-background/80 backdrop-blur-sm px-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search calculators"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
