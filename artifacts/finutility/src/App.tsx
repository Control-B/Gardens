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
import CleaningPage from "@/pages/cleaning";
import DecorPage from "@/pages/decor";
import OutdoorLivingPage from "@/pages/outdoor-living";

import RoofCostCalculator from "@/pages/roof-cost";
import PaintCalculator from "@/pages/paint";
import LawnCareCalculator from "@/pages/lawn-care";
import FenceCostCalculator from "@/pages/fence-cost";
import GardenPlantingCalculator from "@/pages/garden-planting";
import HomeRenovationCalculator from "@/pages/home-renovation";
import CalculatorsPage from "@/pages/calculators";

import GuidesPage from "@/pages/guides";
import ArticlePage from "@/pages/article";
import LegalPage from "@/pages/legal";
import ContactPage from "@/pages/contact";
import SeasonalGuidesPage from "@/pages/seasonal-guides";
import StartHerePage from "@/pages/start-here";
import BudgetProjectsPage from "@/pages/budget-projects";
import SmallSpaceSolutionsPage from "@/pages/small-space-solutions";
import PlantCarePage from "@/pages/plant-care";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Main Pages */}
      <Route path="/" component={HomePage} />
      <Route path="/home-improvement" component={HomeImprovementCategory} />
      <Route path="/garden" component={GardenCategory} />
      <Route path="/exterior" component={ExteriorCategory} />
      <Route path="/cleaning" component={CleaningPage} />
      <Route path="/decor" component={DecorPage} />
      <Route path="/outdoor-living" component={OutdoorLivingPage} />

      {/* Calculators */}
      <Route path="/calculators" component={CalculatorsPage} />
      <Route path="/roof-cost-calculator" component={RoofCostCalculator} />
      <Route path="/paint-calculator" component={PaintCalculator} />
      <Route path="/lawn-care-calculator" component={LawnCareCalculator} />
      <Route path="/fence-cost-calculator" component={FenceCostCalculator} />
      <Route path="/garden-planting-calculator" component={GardenPlantingCalculator} />
      <Route path="/home-renovation-calculator" component={HomeRenovationCalculator} />

      {/* Guides & Articles */}
      <Route path="/guides" component={GuidesPage} />
      <Route path="/seasonal-guides" component={SeasonalGuidesPage} />
      <Route path="/start-here" component={StartHerePage} />
      <Route path="/budget-projects" component={BudgetProjectsPage} />
      <Route path="/small-space-solutions" component={SmallSpaceSolutionsPage} />
      <Route path="/plant-care" component={PlantCarePage} />

      {/* Legal & Info */}
      <Route path="/privacy-policy" component={LegalPage} />
      <Route path="/terms-of-use" component={LegalPage} />
      <Route path="/disclaimer" component={LegalPage} />
      <Route path="/about" component={LegalPage} />
      <Route path="/contact" component={ContactPage} />

      {/* Article wildcard — must be last before NotFound */}
      <Route path="/:slug" component={ArticlePage} />

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
