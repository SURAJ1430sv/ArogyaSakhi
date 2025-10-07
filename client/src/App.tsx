import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Education from "@/pages/education";
import PeriodTracker from "@/pages/period-tracker";
import HealthAssessment from "@/pages/health-assessment";
import Resources from "@/pages/resources";
import YearlyAnalysis from "@/pages/yearly-analysis";
import Auth from "@/pages/auth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import EmergencyButton from "@/components/common/emergency-button";

function Router() {
  const { isAuthenticated, user, login } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-indigo-900/20">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/auth">{() => <Auth onSuccess={login} />}</Route>
          <Route path="/education" component={Education} />
          <Route path="/period-tracker" component={PeriodTracker} />
          <Route path="/health-assessment" component={HealthAssessment} />
          <Route path="/resources" component={Resources} />
          <Route path="/yearly-analysis" component={YearlyAnalysis} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <EmergencyButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
