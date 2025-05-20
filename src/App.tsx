
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Toaster } from "sonner";

// Lazy load components
const HomePage = lazy(() => import("@/pages/HomePage"));
const StockMarketCalculatorPage = lazy(() => import("@/pages/StockMarketCalculatorPage"));
const MortgageCalculatorPage = lazy(() => import("@/pages/MortgageCalculatorPage"));
const LoanCalculatorPage = lazy(() => import("@/pages/LoanCalculatorPage"));
const CompoundInterestCalculatorPage = lazy(() => import("@/pages/CompoundInterestCalculatorPage"));
const RetirementCalculatorPage = lazy(() => import("@/pages/RetirementCalculatorPage"));
const EmbedCodePage = lazy(() => import("@/pages/EmbedCodePage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) setTransitionStage("fadeOut");
  }, [location]);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
      </ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/stock-market-calculator" element={<StockMarketCalculatorPage />} />
              <Route path="/mortgage-calculator" element={<MortgageCalculatorPage />} />
              <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
              <Route path="/compound-interest-calculator" element={<CompoundInterestCalculatorPage />} />
              <Route path="/retirement-calculator" element={<RetirementCalculatorPage />} />
              
              {/* Add the embed code page route */}
              <Route path="/embed-code" element={<EmbedCodePage />} />
              
              {/* Admin route with protection */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<LoginPage />} />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
