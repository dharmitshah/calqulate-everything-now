import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Toaster } from "sonner";

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
          <Routes>
            <Route path="/" element={<React.lazy(() => import("@/pages/HomePage")).default} />
            <Route path="/stock-market-calculator" element={<React.lazy(() => import("@/pages/StockMarketCalculatorPage")).default} />
            <Route path="/mortgage-calculator" element={<React.lazy(() => import("@/pages/MortgageCalculatorPage")).default} />
            <Route path="/loan-calculator" element={<React.lazy(() => import("@/pages/LoanCalculatorPage")).default} />
            <Route path="/compound-interest-calculator" element={<React.lazy(() => import("@/pages/CompoundInterestCalculatorPage")).default} />
            <Route path="/retirement-calculator" element={<React.lazy(() => import("@/pages/RetirementCalculatorPage")).default} />
            
            {/* Add the embed code page route */}
            <Route path="/embed-code" element={<React.lazy(() => import("@/pages/EmbedCodePage")).default} />
            
            {/* Admin route with protection */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <React.lazy(() => import("@/pages/AdminPage")).default />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<React.lazy(() => import("@/pages/LoginPage")).default} />
            
            <Route path="*" element={<React.lazy(() => import("@/pages/NotFoundPage")).default} />
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
