import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import HomePage from "@/pages/home";
import FinanceCategory from "@/pages/finance";
import CryptoCategory from "@/pages/crypto";
import LoansCategory from "@/pages/loans";

import CompoundInterestCalculator from "@/pages/compound-interest";
import MortgageCalculator from "@/pages/mortgage";
import LoanPaymentCalculator from "@/pages/loan-payment";
import CurrencyConverter from "@/pages/currency-converter";
import CryptoProfitCalculator from "@/pages/crypto-profit";
import SavingsGoalCalculator from "@/pages/savings-goal";

import NewsPage from "@/pages/news";
import ArticlePage from "@/pages/article";
import LegalPage from "@/pages/legal";
import ContactPage from "@/pages/contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Main Pages */}
      <Route path="/" component={HomePage} />
      <Route path="/finance" component={FinanceCategory} />
      <Route path="/crypto" component={CryptoCategory} />
      <Route path="/loans" component={LoansCategory} />
      
      {/* Calculators */}
      <Route path="/compound-interest-calculator" component={CompoundInterestCalculator} />
      <Route path="/mortgage-calculator" component={MortgageCalculator} />
      <Route path="/loan-payment-calculator" component={LoanPaymentCalculator} />
      <Route path="/currency-converter" component={CurrencyConverter} />
      <Route path="/crypto-profit-calculator" component={CryptoProfitCalculator} />
      <Route path="/savings-goal-calculator" component={SavingsGoalCalculator} />
      
      <Route path="/news" component={NewsPage} />

      {/* Educational Articles (reusing a generic article template for MVP) */}
      <Route path="/what-is-compound-interest" component={ArticlePage} />
      <Route path="/how-compound-interest-works" component={ArticlePage} />
      <Route path="/how-to-calculate-mortgage-payments" component={ArticlePage} />
      <Route path="/loan-interest-explained" component={ArticlePage} />
      <Route path="/how-to-save-money-faster" component={ArticlePage} />
      <Route path="/how-to-calculate-crypto-profit" component={ArticlePage} />
      <Route path="/crypto-profit-vs-loss-explained" component={ArticlePage} />
      <Route path="/how-currency-conversion-works" component={ArticlePage} />
      <Route path="/what-affects-exchange-rates" component={ArticlePage} />

      {/* Legal & Info */}
      <Route path="/privacy-policy" component={LegalPage} />
      <Route path="/terms-of-use" component={LegalPage} />
      <Route path="/disclaimer" component={LegalPage} />
      <Route path="/about" component={LegalPage} />
      <Route path="/contact" component={ContactPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
