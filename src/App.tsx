
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BasicCalculatorPage from "./pages/BasicCalculatorPage";
import BMICalculatorPage from "./pages/BMICalculatorPage";
import AgeCalculatorPage from "./pages/AgeCalculatorPage";
import LoanCalculatorPage from "./pages/LoanCalculatorPage";
import AllCalculatorsPage from "./pages/AllCalculatorsPage";
import InfoFaqPage from "./pages/InfoFaqPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculators" element={<AllCalculatorsPage />} />
          <Route path="/info" element={<InfoFaqPage />} />
          <Route path="/calculator/basic" element={<BasicCalculatorPage />} />
          <Route path="/calculator/bmi" element={<BMICalculatorPage />} />
          <Route path="/calculator/age" element={<AgeCalculatorPage />} />
          <Route path="/calculator/loan" element={<LoanCalculatorPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
