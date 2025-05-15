
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold gradient-heading">
              CalcVerse
            </span>
          </Link>
        </div>
        
        {!isMobile ? (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/calculators" className="transition-colors hover:text-primary">
              All Calculators
            </Link>
            <Link to="/info" className="transition-colors hover:text-primary">
              Info & FAQ
            </Link>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search calculators..."
                className="pl-8 h-9 md:w-[200px] lg:w-[250px] rounded-xl border bg-background/80 backdrop-blur-sm px-3"
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
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="container pb-4 md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-4 mt-2">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-lg hover:bg-accent/10 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/calculators" 
              className="px-3 py-2 rounded-lg hover:bg-accent/10 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Calculators
            </Link>
            <Link 
              to="/info" 
              className="px-3 py-2 rounded-lg hover:bg-accent/10 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Info & FAQ
            </Link>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search calculators..."
                className="pl-10 h-10 w-full rounded-xl border bg-background/80 backdrop-blur-sm px-3"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
