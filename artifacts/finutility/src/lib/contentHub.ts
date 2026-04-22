import type { GuideArticle } from "@/lib/guides";

export type GuidePillar =
  | "Home Improvement"
  | "Garden & Outdoor"
  | "Exterior & Curb Appeal"
  | "Cleaning & Home Care"
  | "Decor & Organization"
  | "Outdoor Living";

export type GuideContentType =
  | "How-To"
  | "Cost Guide"
  | "Comparison"
  | "Mistakes"
  | "Value"
  | "Seasonal";

export interface TopicCluster {
  id: string;
  pillar: GuidePillar;
  title: string;
  description: string;
  intent: string;
  priority: "Traffic" | "CPC" | "Authority" | "Seasonal";
  articleIdeas: string[];
  toolIdeas: string[];
}

export interface GuideMetadata {
  pillar: GuidePillar;
  cluster: string;
  contentType: GuideContentType;
  season?: "Spring" | "Summer" | "Fall" | "Winter";
  featured?: boolean;
}

export const topicClusters: TopicCluster[] = [
  {
    id: "repairs-fixes",
    pillar: "Home Improvement",
    title: "Repairs & Fixes",
    description: "High-frequency DIY and maintenance topics that capture daily search demand.",
    intent: "Solve urgent homeowner problems fast.",
    priority: "Traffic",
    articleIdeas: ["Fix leaking faucet", "Patch drywall holes", "Stop roof leak"],
    toolIdeas: ["Repair cost estimator", "DIY vs pro decision aid"],
  },
  {
    id: "cost-budgeting",
    pillar: "Home Improvement",
    title: "Cost & Budgeting",
    description: "Higher-CPC planning content around remodels, repairs, and contractor pricing.",
    intent: "Benchmark quotes before spending.",
    priority: "CPC",
    articleIdeas: ["Kitchen remodel cost", "Bathroom renovation cost", "Roof replacement cost"],
    toolIdeas: ["Budget planner", "Quote comparison worksheets"],
  },
  {
    id: "renovation-upgrades",
    pillar: "Home Improvement",
    title: "Renovation & Upgrades",
    description: "Project planning content for rooms, layouts, and upgrades with resale upside.",
    intent: "Prioritize upgrades with the best payoff.",
    priority: "Authority",
    articleIdeas: ["Best home upgrades that add value", "DIY vs contractor", "Basement finishing ideas"],
    toolIdeas: ["Renovation budget calculator", "ROI planner"],
  },
  {
    id: "energy-efficiency",
    pillar: "Home Improvement",
    title: "Energy & Efficiency",
    description: "Savings-focused content around insulation, winterization, and energy bills.",
    intent: "Reduce monthly utility costs.",
    priority: "Authority",
    articleIdeas: ["Lower your electric bill", "Winterize your home", "Insulation guide"],
    toolIdeas: ["Upgrade payback estimator", "Heating savings calculator"],
  },
  {
    id: "beginner-gardening",
    pillar: "Garden & Outdoor",
    title: "Beginner Gardening",
    description: "Foundational planting, soil, and setup guidance for new gardeners.",
    intent: "Make first-time gardeners successful.",
    priority: "Traffic",
    articleIdeas: ["Start a garden", "Best plants for beginners", "Soil types explained"],
    toolIdeas: ["Plant spacing planner", "Soil volume calculator"],
  },
  {
    id: "seasonal-garden",
    pillar: "Garden & Outdoor",
    title: "Seasonal Gardening",
    description: "Recurring search traffic built around spring, summer, fall, and winter tasks.",
    intent: "Capture year-round seasonal demand.",
    priority: "Seasonal",
    articleIdeas: ["Spring garden checklist", "Summer lawn care", "Fall cleanup"],
    toolIdeas: ["Seasonal calendar", "Planting timeline"],
  },
  {
    id: "landscaping-design",
    pillar: "Garden & Outdoor",
    title: "Landscaping & Design",
    description: "Visual outdoor projects, material comparisons, and curb-appeal planning.",
    intent: "Help homeowners build beautiful, low-regret outdoor spaces.",
    priority: "Authority",
    articleIdeas: ["Mulch vs gravel", "Backyard ideas", "Patio lighting layouts"],
    toolIdeas: ["Landscape budget planner", "Material comparison charts"],
  },
  {
    id: "food-sustainability",
    pillar: "Garden & Outdoor",
    title: "Food & Sustainability",
    description: "Productive garden systems for vegetables, composting, and water use.",
    intent: "Turn small spaces into useful growing systems.",
    priority: "Authority",
    articleIdeas: ["Raised beds", "Vegetable gardening", "Rainwater setup"],
    toolIdeas: ["Garden yield planner", "Compost volume helper"],
  },
  {
    id: "exterior-roi",
    pillar: "Exterior & Curb Appeal",
    title: "Exterior ROI",
    description: "Projects that improve curb appeal, inspections, and resale value.",
    intent: "Focus on upgrades that pay back.",
    priority: "CPC",
    articleIdeas: ["Roofing material choices", "Fence installation", "Upgrades that add value"],
    toolIdeas: ["Exterior ROI calculator", "Quote benchmark tools"],
  },
  {
    id: "mistakes-comparisons",
    pillar: "Exterior & Curb Appeal",
    title: "Mistakes & Comparisons",
    description: "CTR-focused comparison and mistake-based content for higher click-through rates.",
    intent: "Answer before-the-purchase questions clearly.",
    priority: "Traffic",
    articleIdeas: ["Why your plants keep dying", "Mulch vs gravel", "DIY mistakes to avoid"],
    toolIdeas: ["Decision checklists", "Starter kits"],
  },
];

export const seasonalPlaybook = [
  {
    season: "Spring",
    focus: "Garden prep, planting, and roof repair after winter weather.",
    pages: ["Spring garden checklist", "Raised bed setup", "Roof leak triage"],
  },
  {
    season: "Summer",
    focus: "Lawn health, irrigation, painting, and exterior upgrades.",
    pages: ["Summer lawn calendar", "Exterior paint planning", "Fence installs"],
  },
  {
    season: "Fall",
    focus: "Cleanup, winter prep, insulation, and budget planning for indoor projects.",
    pages: ["Fall garden cleanup", "Winterization guide", "Bathroom renovation planning"],
  },
  {
    season: "Winter",
    focus: "Energy savings, indoor repairs, and next-season garden planning.",
    pages: ["Lower electric bill", "Patch drywall holes", "Garden planning for spring"],
  },
];

export const authorityFramework = [
  {
    title: "Problem",
    detail: "Start with the real pain: too expensive, too risky, too confusing, or too time-consuming.",
  },
  {
    title: "Solution",
    detail: "Show the exact method, materials, tools, and decision path that solves it.",
  },
  {
    title: "Benefit",
    detail: "Make the outcome concrete: money saved, time reduced, value added, or mistakes avoided.",
  },
  {
    title: "STAR",
    detail: "Use Situation, Task, Action, Result to prove the advice works in real homeowner scenarios.",
  },
];

export const contentTypeBlueprint = [
  "How-to guides",
  "Cost calculators",
  "Comparison articles",
  "Mistake-based explainers",
  "Home value / ROI pages",
  "Seasonal checklists",
];

export const guideMetadataBySlug: Record<string, GuideMetadata> = {
  "how-to-fix-a-leaking-faucet": {
    pillar: "Home Improvement",
    cluster: "Repairs & Fixes",
    contentType: "How-To",
    featured: true,
  },
  "how-to-choose-roof-material": {
    pillar: "Exterior & Curb Appeal",
    cluster: "Exterior ROI",
    contentType: "Comparison",
    featured: true,
  },
  "how-to-prepare-garden-for-spring": {
    pillar: "Garden & Outdoor",
    cluster: "Seasonal Gardening",
    contentType: "Seasonal",
    season: "Spring",
    featured: true,
  },
  "how-to-save-on-lawn-care-costs": {
    pillar: "Garden & Outdoor",
    cluster: "Seasonal Gardening",
    contentType: "Value",
    featured: true,
  },
  "diy-fence-installation-guide": {
    pillar: "Exterior & Curb Appeal",
    cluster: "Exterior ROI",
    contentType: "How-To",
    featured: true,
  },
  "when-to-diy-vs-hire-a-contractor": {
    pillar: "Home Improvement",
    cluster: "Renovation & Upgrades",
    contentType: "Value",
    featured: true,
  },
  "how-to-create-a-raised-garden-bed": {
    pillar: "Garden & Outdoor",
    cluster: "Food & Sustainability",
    contentType: "How-To",
    featured: true,
  },
  "best-plants-for-low-maintenance-gardens": {
    pillar: "Garden & Outdoor",
    cluster: "Beginner Gardening",
    contentType: "Value",
    featured: true,
  },
  "how-to-winterize-your-home": {
    pillar: "Home Improvement",
    cluster: "Energy & Efficiency",
    contentType: "Seasonal",
    season: "Winter",
    featured: true,
  },
  "how-to-paint-a-room-like-a-pro": {
    pillar: "Home Improvement",
    cluster: "Repairs & Fixes",
    contentType: "How-To",
  },
  "how-to-patch-drywall-holes": {
    pillar: "Home Improvement",
    cluster: "Repairs & Fixes",
    contentType: "How-To",
  },
  "kitchen-remodel-cost-guide": {
    pillar: "Home Improvement",
    cluster: "Cost & Budgeting",
    contentType: "Cost Guide",
    featured: true,
  },
  "bathroom-renovation-cost-guide": {
    pillar: "Home Improvement",
    cluster: "Cost & Budgeting",
    contentType: "Cost Guide",
  },
  "how-to-lower-your-electric-bill-at-home": {
    pillar: "Home Improvement",
    cluster: "Energy & Efficiency",
    contentType: "Value",
  },
  "spring-garden-checklist": {
    pillar: "Garden & Outdoor",
    cluster: "Seasonal Gardening",
    contentType: "Seasonal",
    season: "Spring",
  },
  "summer-lawn-care-calendar": {
    pillar: "Garden & Outdoor",
    cluster: "Seasonal Gardening",
    contentType: "Seasonal",
    season: "Summer",
  },
  "mulch-vs-gravel-for-landscaping": {
    pillar: "Garden & Outdoor",
    cluster: "Landscaping & Design",
    contentType: "Comparison",
  },
  "best-home-upgrades-that-add-value": {
    pillar: "Exterior & Curb Appeal",
    cluster: "Exterior ROI",
    contentType: "Value",
  },
};

export function getGuideMetadata(guide: GuideArticle): GuideMetadata {
  return (
    guideMetadataBySlug[guide.slug] ?? {
      pillar: "Home Improvement",
      cluster: guide.category,
      contentType: "How-To",
    }
  );
}
