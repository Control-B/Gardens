import type { LucideIcon } from "lucide-react";
import { BookMarked, CircleAlert, Eye, FileCheck, Lock, ShieldCheck } from "lucide-react";

export interface TrustContentItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TrustContentEntry {
  eyebrow: string;
  heading: string;
  intro: string;
  items: TrustContentItem[];
  footnote?: string;
  surface?: "dark" | "light";
  accent?: "blue" | "emerald" | "fuchsia" | "indigo" | "amber";
}

export const homeTrustContent: TrustContentEntry = {
  eyebrow: "Trust and clarity",
  heading: "Gardens is built for homeowners who want real answers, not vague estimates",
  intro:
    "Gardens is designed to help you move from a home or garden question to a useful calculator and practical guide — without account walls, exaggerated claims, or confusing jargon.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Education before pressure",
      description: "Every calculator is paired with a plain-English guide explaining what the numbers mean and what to do with them.",
      icon: BookMarked,
    },
    {
      title: "Private by default",
      description: "All calculations happen in your browser. No account required, no data stored, no tracking of your project details.",
      icon: Lock,
    },
    {
      title: "Honest estimates",
      description: "Cost ranges are based on real market data. We flag where local costs vary significantly so you know when to get a local quote.",
      icon: ShieldCheck,
    },
  ],
};

export const homeImprovementTrustContent: TrustContentEntry = {
  eyebrow: "Trust and disclosure",
  heading: "Home improvement estimates are planning tools — not contractor quotes",
  intro:
    "Our calculators provide realistic cost benchmarks based on national averages and material costs. Your actual project cost depends on local labor rates, material availability, and specific site conditions.",
  surface: "dark",
  accent: "emerald",
  items: [
    {
      title: "Benchmark, not quote",
      description: "Estimates help you know if a contractor quote is reasonable — always get 3 quotes before committing to any major project.",
      icon: Eye,
    },
    {
      title: "Permit requirements vary",
      description: "Building codes and permit requirements differ by city and county. Always verify requirements with your local building department.",
      icon: CircleAlert,
    },
    {
      title: "Professional verification still matters",
      description: "Major structural, electrical, plumbing, and gas work should always be performed by licensed professionals.",
      icon: ShieldCheck,
    },
  ],
};

export const gardenTrustContent: TrustContentEntry = {
  eyebrow: "Trust and disclosure",
  heading: "Garden planning tools are a starting point — local conditions determine real results",
  intro:
    "Plant spacing, soil requirements, and planting times in our guides are based on general best practices. Your specific climate, soil type, and microclimate will affect actual results.",
  surface: "dark",
  accent: "emerald",
  items: [
    {
      title: "Climate zones vary",
      description: "USDA hardiness zones are a guide — local microclimates, last frost dates, and soil type all affect what grows well in your specific yard.",
      icon: Eye,
    },
    {
      title: "Soil testing before amending",
      description: "We recommend testing your soil pH and composition before purchasing amendments — guessing often leads to over- or under-treatment.",
      icon: CircleAlert,
    },
    {
      title: "Local nurseries know best",
      description: "A local independent nursery is the best resource for plant selection, timing, and soil advice specific to your area.",
      icon: BookMarked,
    },
  ],
};

export const exteriorTrustContent: TrustContentEntry = {
  eyebrow: "Trust and disclosure",
  heading: "Exterior project estimates depend heavily on local labor and material costs",
  intro:
    "Roofing, fencing, and exterior painting costs vary significantly by region. Our calculators provide national average baselines — compare against local quotes before finalizing any project budget.",
  surface: "dark",
  accent: "emerald",
  items: [
    {
      title: "Regional cost variation",
      description: "Labor costs in high-cost metro areas can be 40–70% higher than national averages shown in calculators.",
      icon: Eye,
    },
    {
      title: "HOA and permit requirements",
      description: "Exterior changes often require HOA approval and building permits. Verify requirements before purchasing materials.",
      icon: FileCheck,
    },
    {
      title: "Licensed contractors for major work",
      description: "Roofing, structural work, and major exterior renovations should be performed by licensed, insured contractors.",
      icon: ShieldCheck,
    },
  ],
};

export const roofCostTrustContent: TrustContentEntry = {
  eyebrow: "Trust and disclosure",
  heading: "Roof cost estimates are benchmarks for evaluating contractor quotes",
  intro:
    "This calculator helps you understand the realistic cost range for a roof replacement before you call contractors. Actual quotes will vary based on your specific roof geometry, local labor rates, and material availability.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Estimate, not quote",
      description: "Use this result to identify whether contractor bids are in a reasonable range — not as the final project budget.",
      icon: FileCheck,
    },
    {
      title: "Site-specific factors matter",
      description: "Roof access difficulty, existing damage, ventilation issues, and local permit fees can all change the final cost.",
      icon: Eye,
    },
    {
      title: "Always verify with 3 contractors",
      description: "For a project this size, getting at least 3 licensed contractor quotes is essential. Verify insurance and check references.",
      icon: ShieldCheck,
    },
  ],
};

export const paintTrustContent: TrustContentEntry = {
  eyebrow: "Trust and disclosure",
  heading: "Paint quantity estimates depend on actual wall measurements and paint quality",
  intro:
    "This calculator gives you a starting point for how much paint to buy. Coverage rates vary by paint brand, quality, and surface condition. Always check the specific paint can label for its stated coverage rate.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Coverage rates vary by product",
      description: "Premium paints often cover 15–20% more area per gallon than budget options. Check the label before calculating.",
      icon: Eye,
    },
    {
      title: "Surface condition affects consumption",
      description: "Rough, porous, or previously unpainted surfaces absorb more paint. Add a second coat or primer for best results.",
      icon: CircleAlert,
    },
    {
      title: "Buy in the same dye lot",
      description: "If you need multiple gallons, have them mixed in the same batch to ensure consistent color throughout the project.",
      icon: ShieldCheck,
    },
  ],
};

export const lawnCareTrustContent: TrustContentEntry = {
  eyebrow: "Trust and disclosure",
  heading: "Lawn care cost estimates are regional averages — local prices vary",
  intro:
    "Lawn care service costs depend on your region, lawn condition, and service provider. The estimates here are based on national averages for a well-maintained lawn in a mid-cost region.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Regional price variation",
      description: "Lawn care costs in urban markets can be 30–50% higher than rural or suburban averages shown in the calculator.",
      icon: Eye,
    },
    {
      title: "Grass type matters",
      description: "Warm-season and cool-season grasses have different maintenance needs and cost profiles — especially for fertilizing and aeration timing.",
      icon: CircleAlert,
    },
    {
      title: "Always get local quotes",
      description: "Use these estimates to benchmark local quotes, but get at least 2–3 quotes from local services before deciding.",
      icon: ShieldCheck,
    },
  ],
};

export const fenceCostTrustContent: TrustContentEntry = {
  eyebrow: "Trust and disclosure",
  heading: "Fence cost estimates are material benchmarks — labor and local factors vary",
  intro:
    "This calculator provides realistic material cost estimates and national average labor costs. Your actual fence project cost depends on local labor rates, terrain, soil conditions, and material availability.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Material costs change seasonally",
      description: "Lumber prices in particular fluctuate significantly. Check current prices at your local lumber yard before finalizing the budget.",
      icon: Eye,
    },
    {
      title: "Underground utilities",
      description: "Always call 811 before digging post holes. Utility strikes are dangerous and can result in costly repairs and fines.",
      icon: CircleAlert,
    },
    {
      title: "Check property lines",
      description: "Install a fence only on your confirmed property. Survey errors have led to costly fence removal and neighbor disputes.",
      icon: ShieldCheck,
    },
  ],
};

export const gardenPlantingTrustContent: TrustContentEntry = {
  eyebrow: "Trust and disclosure",
  heading: "Planting estimates are based on standard spacing guidelines — adjust for your specific plants",
  intro:
    "Plant spacing recommendations vary by variety, climate, and growing method. Our calculator uses general guidelines — always verify spacing for the specific cultivar you are planting.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Variety-specific spacing matters",
      description: "Spacing requirements for determinate vs. indeterminate tomatoes, for example, differ by 50% or more. Check seed packets or plant tags.",
      icon: Eye,
    },
    {
      title: "Soil depth affects root growth",
      description: "Root vegetables need 12–18 inches of loose soil. Verify your raised bed depth before planning a root crop.",
      icon: FileCheck,
    },
    {
      title: "Yield estimates are approximate",
      description: "Harvest yields depend on weather, pest pressure, watering consistency, and growing season length — estimates are averages only.",
      icon: CircleAlert,
    },
  ],
};

export const renovationTrustContent: TrustContentEntry = {
  eyebrow: "Trust and disclosure",
  heading: "Renovation estimates are planning benchmarks — actual costs require contractor quotes",
  intro:
    "Home renovation budgets depend on your home's age, current condition, material selections, and local labor costs. This calculator provides a realistic starting range — always verify with professional estimates before committing funds.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Hidden conditions are common",
      description: "Older homes frequently reveal plumbing, electrical, or structural issues once walls are opened. Always hold a contingency budget.",
      icon: CircleAlert,
    },
    {
      title: "Permits affect scope and timeline",
      description: "Permitted work requires inspection and may affect timeline. Budget for permit fees in your total project cost.",
      icon: FileCheck,
    },
    {
      title: "Get professional design input",
      description: "For full room renovations, a design consultation ($100–$500) often prevents expensive material or layout mistakes.",
      icon: ShieldCheck,
    },
  ],
};

export const guidesTrustContent: TrustContentEntry = {
  eyebrow: "Trust and clarity",
  heading: "Our guides are educational — they explain concepts, not provide professional advice",
  intro:
    "Gardens guides help you understand home and garden topics clearly. They are not a substitute for licensed contractor assessments, building inspections, or professional design services.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Educational by design",
      description: "Guides are written to explain concepts and real-world cost ranges — not to replace professional assessment of your specific situation.",
      icon: BookMarked,
    },
    {
      title: "Transparent context",
      description: "Articles are paired with calculators and legal pages so readers can test assumptions and understand our site's purpose.",
      icon: Eye,
    },
    {
      title: "Privacy-first tools",
      description: "All calculators work in your browser without storing your project details or requiring an account.",
      icon: ShieldCheck,
    },
  ],
};

export const contactTrustContent: TrustContentEntry = {
  eyebrow: "Trust and support",
  heading: "We welcome questions, corrections, and feedback",
  intro:
    "When something is unclear, incorrect, or missing from our tools and guides, hearing from you directly is the fastest way to improve the platform for everyone.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Questions are welcome",
      description: "If a calculator result seems off or a guide doesn't address your situation, reach out and we'll help clarify.",
      icon: BookMarked,
    },
    {
      title: "Support is not professional advice",
      description: "We can explain our tools and content, but cannot provide project-specific professional recommendations.",
      icon: CircleAlert,
    },
    {
      title: "Feedback improves the platform",
      description: "Corrections, missing content suggestions, and usability feedback all help make Gardens more useful and accurate.",
      icon: ShieldCheck,
    },
  ],
};

export const legalTrustContent: TrustContentEntry = {
  eyebrow: "Policy clarity",
  heading: "These policy pages exist to be clear about what Gardens is and is not",
  intro:
    "Legal and policy pages clarify how the site works, what users can expect, and where the limits of our responsibility begin.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Clear boundaries",
      description: "Gardens is an educational platform. It does not provide professional contractor, legal, or engineering advice.",
      icon: FileCheck,
    },
    {
      title: "Privacy and data handling",
      description: "All calculations are performed in your browser. We explain exactly how analytics and cookies work in our Privacy Policy.",
      icon: Lock,
    },
    {
      title: "Questions are welcome",
      description: "Contact us with any policy clarification, privacy concern, or general trust question.",
      icon: ShieldCheck,
    },
  ],
};

export const articleTrustContent: TrustContentEntry = {
  eyebrow: "Trust and context",
  heading: "How to use a home and garden guide responsibly",
  intro:
    "Guide pages are written to explain concepts and provide realistic cost ranges, but they are not a substitute for on-site professional assessment of your specific home and project.",
  surface: "light",
  accent: "emerald",
  items: [
    {
      title: "Framework, not final answer",
      description: "The guide gives structure and context, but your specific conditions — home age, local codes, climate — require verification.",
      icon: BookMarked,
    },
    {
      title: "Examples are illustrative",
      description: "STAR scenarios show realistic outcomes but may not reflect current material prices or labor costs in your specific market.",
      icon: FileCheck,
    },
    {
      title: "Pair reading with calculators",
      description: "The strongest use of these guides is learning the concept, then using the relevant calculator to model your own project.",
      icon: ShieldCheck,
    },
  ],
};
