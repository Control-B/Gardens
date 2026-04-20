import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SeoManager } from "@/components/SeoManager";
import NotFound from "@/pages/not-found";

import HomePage from "@/pages/home";
import HomeImprovementCategory from "@/pages/home-improvement";
import GardenCategory from "@/pages/garden";
import ExteriorCategory from "@/pages/exterior";

import RoofCostCalculator from "@/pages/roof-cost";
import PaintCalculator from "@/pages/paint";
import LawnCareCalculator from "@/pages/lawn-care";
import FenceCostCalculator from "@/pages/fence-cost";
import GardenPlantingCalculator from "@/pages/garden-planting";
import HomeRenovationCalculator from "@/pages/home-renovation";

import GuidesPage from "@/pages/guides";
import ArticlePage from "@/pages/article";
import LegalPage from "@/pages/legal";
import ContactPage from "@/pages/contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Main Pages */}
      <Route path="/" component={HomePage} />
      <Route path="/home-improvement" component={HomeImprovementCategory} />
      <Route path="/garden" component={GardenCategory} />
      <Route path="/exterior" component={ExteriorCategory} />

      {/* Calculators */}
      <Route path="/roof-cost-calculator" component={RoofCostCalculator} />
      <Route path="/paint-calculator" component={PaintCalculator} />
      <Route path="/lawn-care-calculator" component={LawnCareCalculator} />
      <Route path="/fence-cost-calculator" component={FenceCostCalculator} />
      <Route path="/garden-planting-calculator" component={GardenPlantingCalculator} />
      <Route path="/home-renovation-calculator" component={HomeRenovationCalculator} />

      {/* Guides & Articles */}
      <Route path="/guides" component={GuidesPage} />
      <Route path="/how-to-fix-a-leaking-faucet" component={ArticlePage} />
      <Route path="/how-to-choose-roof-material" component={ArticlePage} />
      <Route path="/how-to-prepare-garden-for-spring" component={ArticlePage} />
      <Route path="/how-to-save-on-lawn-care-costs" component={ArticlePage} />
      <Route path="/diy-fence-installation-guide" component={ArticlePage} />
      <Route path="/when-to-diy-vs-hire-a-contractor" component={ArticlePage} />
      <Route path="/how-to-create-a-raised-garden-bed" component={ArticlePage} />
      <Route path="/best-plants-for-low-maintenance-gardens" component={ArticlePage} />
      <Route path="/how-to-winterize-your-home" component={ArticlePage} />
      <Route path="/how-to-paint-a-room-like-a-pro" component={ArticlePage} />

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
          <SeoManager />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
