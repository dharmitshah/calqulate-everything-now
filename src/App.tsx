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
import UnitConverterPage from "./pages/UnitConverterPage";
import PercentageCalculatorPage from "./pages/PercentageCalculatorPage";
import TimezoneConverterPage from "./pages/TimezoneConverterPage";
import DateCalculatorPage from "./pages/DateCalculatorPage";
import RandomGeneratorPage from "./pages/RandomGeneratorPage";
import TipCalculatorPage from "./pages/TipCalculatorPage";
import DiscountCalculatorPage from "./pages/DiscountCalculatorPage";
import CurrencyConverterPage from "./pages/CurrencyConverterPage";
import FuelEconomyCalculatorPage from "./pages/FuelEconomyCalculatorPage";
import TimeCalculatorPage from "./pages/TimeCalculatorPage";
import ScientificCalculatorPage from "./pages/ScientificCalculatorPage";
import PregnancyDueCalculatorPage from "./pages/PregnancyDueCalculatorPage";
import CalorieCalculatorPage from "./pages/CalorieCalculatorPage";
import WeightConverterPage from "./pages/WeightConverterPage";
import RetirementCalculatorPage from "./pages/RetirementCalculatorPage";
import GPACalculatorPage from "./pages/GPACalculatorPage";
import MortgageCalculatorPage from "./pages/MortgageCalculatorPage";
import SavingsCalculatorPage from "./pages/SavingsCalculatorPage";
import CompoundInterestCalculatorPage from "./pages/CompoundInterestCalculatorPage";
import MentalBurnoutCalculatorPage from "./pages/MentalBurnoutCalculatorPage";
import ContentCreatorROICalculatorPage from "./pages/ContentCreatorROICalculatorPage";
import EVChargeCalculatorPage from "./pages/EVChargeCalculatorPage";
import AICostEstimatorPage from "./pages/AICostEstimatorPage";
import SustainabilityCalculatorPage from "./pages/SustainabilityCalculatorPage";
import FreelancerPricingCalculatorPage from "./pages/FreelancerPricingCalculatorPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/calculator/basic" element={<BasicCalculatorPage />} />
          <Route path="/calculator/bmi" element={<BMICalculatorPage />} />
          <Route path="/calculator/age" element={<AgeCalculatorPage />} />
          <Route path="/calculator/loan" element={<LoanCalculatorPage />} />
          <Route path="/calculator/unit-converter" element={<UnitConverterPage />} />
          <Route path="/calculator/percentage" element={<PercentageCalculatorPage />} />
          <Route path="/calculator/timezone" element={<TimezoneConverterPage />} />
          <Route path="/calculator/date" element={<DateCalculatorPage />} />
          <Route path="/calculator/random" element={<RandomGeneratorPage />} />
          <Route path="/calculator/tip" element={<TipCalculatorPage />} />
          <Route path="/calculator/discount" element={<DiscountCalculatorPage />} />
          <Route path="/calculator/currency" element={<CurrencyConverterPage />} />
          <Route path="/calculator/fuel-economy" element={<FuelEconomyCalculatorPage />} />
          <Route path="/calculator/time" element={<TimeCalculatorPage />} />
          <Route path="/calculator/scientific" element={<ScientificCalculatorPage />} />
          <Route path="/calculator/pregnancy-due" element={<PregnancyDueCalculatorPage />} />
          <Route path="/calculator/calorie" element={<CalorieCalculatorPage />} />
          <Route path="/calculator/weight-converter" element={<WeightConverterPage />} />
          <Route path="/calculator/retirement" element={<RetirementCalculatorPage />} />
          <Route path="/calculator/gpa" element={<GPACalculatorPage />} />
          <Route path="/calculator/mortgage" element={<MortgageCalculatorPage />} />
          <Route path="/calculator/savings" element={<SavingsCalculatorPage />} />
          <Route path="/calculator/compound-interest" element={<CompoundInterestCalculatorPage />} />
          <Route path="/calculator/mental-burnout" element={<MentalBurnoutCalculatorPage />} />
          <Route path="/calculator/content-creator-roi" element={<ContentCreatorROICalculatorPage />} />
          <Route path="/calculator/ev-charge" element={<EVChargeCalculatorPage />} />
          <Route path="/calculator/ai-cost" element={<AICostEstimatorPage />} />
          <Route path="/calculator/sustainability" element={<SustainabilityCalculatorPage />} />
          <Route path="/calculator/freelancer-pricing" element={<FreelancerPricingCalculatorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
