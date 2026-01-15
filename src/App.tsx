import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Eagerly load critical pages for best LCP
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load all other pages for better FID
const BasicCalculatorPage = lazy(() => import("./pages/BasicCalculatorPage"));
const BMICalculatorPage = lazy(() => import("./pages/BMICalculatorPage"));
const AgeCalculatorPage = lazy(() => import("./pages/AgeCalculatorPage"));
const LoanCalculatorPage = lazy(() => import("./pages/LoanCalculatorPage"));
const AllCalculatorsPage = lazy(() => import("./pages/AllCalculatorsPage"));
const InfoFaqPage = lazy(() => import("./pages/InfoFaqPage"));
const UnitConverterPage = lazy(() => import("./pages/UnitConverterPage"));
const PercentageCalculatorPage = lazy(() => import("./pages/PercentageCalculatorPage"));
const TimezoneConverterPage = lazy(() => import("./pages/TimezoneConverterPage"));
const DateCalculatorPage = lazy(() => import("./pages/DateCalculatorPage"));
const RandomGeneratorPage = lazy(() => import("./pages/RandomGeneratorPage"));
const TipCalculatorPage = lazy(() => import("./pages/TipCalculatorPage"));
const DiscountCalculatorPage = lazy(() => import("./pages/DiscountCalculatorPage"));
const CurrencyConverterPage = lazy(() => import("./pages/CurrencyConverterPage"));
const FuelEconomyCalculatorPage = lazy(() => import("./pages/FuelEconomyCalculatorPage"));
const TimeCalculatorPage = lazy(() => import("./pages/TimeCalculatorPage"));
const ScientificCalculatorPage = lazy(() => import("./pages/ScientificCalculatorPage"));
const PregnancyDueCalculatorPage = lazy(() => import("./pages/PregnancyDueCalculatorPage"));
const CalorieCalculatorPage = lazy(() => import("./pages/CalorieCalculatorPage"));
const WeightConverterPage = lazy(() => import("./pages/WeightConverterPage"));
const RetirementCalculatorPage = lazy(() => import("./pages/RetirementCalculatorPage"));
const GPACalculatorPage = lazy(() => import("./pages/GPACalculatorPage"));
const MortgageCalculatorPage = lazy(() => import("./pages/MortgageCalculatorPage"));
const SavingsCalculatorPage = lazy(() => import("./pages/SavingsCalculatorPage"));
const CompoundInterestCalculatorPage = lazy(() => import("./pages/CompoundInterestCalculatorPage"));
const MentalBurnoutCalculatorPage = lazy(() => import("./pages/MentalBurnoutCalculatorPage"));
const ContentCreatorROICalculatorPage = lazy(() => import("./pages/ContentCreatorROICalculatorPage"));
const EVChargeCalculatorPage = lazy(() => import("./pages/EVChargeCalculatorPage"));
const AICostEstimatorPage = lazy(() => import("./pages/AICostEstimatorPage"));
const SustainabilityCalculatorPage = lazy(() => import("./pages/SustainabilityCalculatorPage"));
const FreelancerPricingCalculatorPage = lazy(() => import("./pages/FreelancerPricingCalculatorPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const AdminAnalyticsPage = lazy(() => import("./pages/AdminAnalyticsPage"));
const DeveloperDocsPage = lazy(() => import("./pages/DeveloperDocsPage"));
const PasswordGeneratorPage = lazy(() => import("./pages/PasswordGeneratorPage"));
const AICalculatorPage = lazy(() => import("./pages/AICalculatorPage"));

const queryClient = new QueryClient();

// Minimal loading fallback to prevent layout shift
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/calculator/password" element={<PasswordGeneratorPage />} />
            <Route path="/calculator/ai" element={<AICalculatorPage />} />
            
            {/* Category routes */}
            <Route path="/category/:category" element={<CategoryPage />} />
            
            {/* Admin route - hidden from public */}
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            
            {/* Developer docs - support both paths */}
            <Route path="/developers" element={<DeveloperDocsPage />} />
            <Route path="/developer" element={<DeveloperDocsPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
