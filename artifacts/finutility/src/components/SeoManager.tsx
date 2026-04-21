import { useEffect } from "react";
import { useLocation } from "wouter";
import { guidesBySlug } from "@/lib/guides";

interface MetaEntry {
  title: string;
  description: string;
  robots?: string;
}

const metaByPath: Record<string, MetaEntry> = {
  "/": {
    title: "Gardens — Home & Garden Authority Platform, Calculators & Guides",
    description: "Explore home improvement and garden topic clusters with free calculators, seasonal guides, cost pages, comparisons, and educational content built for smarter project decisions.",
  },
  "/home-improvement": {
    title: "Home Improvement Tools & Guides | Gardens",
    description: "Home improvement calculators and guides covering renovation costs, painting, faucet repair, winterization, and DIY vs. contractor decisions.",
  },
  "/garden": {
    title: "Gardening Tools & Guides | Gardens",
    description: "Garden planning calculators and expert guides for raised beds, planting layouts, spring prep, and choosing the right plants for your climate.",
  },
  "/exterior": {
    title: "Exterior & Curb Appeal Tools | Gardens",
    description: "Exterior cost calculators and guides for roofing, fencing, and landscaping projects. Compare materials, get cost benchmarks, and avoid common mistakes.",
  },
  "/guides": {
    title: "Home & Garden Guides by Topic Cluster | Gardens",
    description: "Browse home improvement, garden, and exterior guides organized by pillar, cluster, and content type, including how-to, cost, comparison, value, and seasonal pages.",
  },
  "/roof-cost-calculator": {
    title: "Roof Cost Calculator — Estimate Roof Replacement Cost | Gardens",
    description: "Free roof cost calculator. Compare asphalt, metal, tile, and slate roofing costs by sq ft before getting contractor quotes. Includes labor, materials, and removal.",
  },
  "/paint-calculator": {
    title: "Paint Calculator — How Much Paint Do I Need? | Gardens",
    description: "Calculate exactly how many gallons of paint you need for any room or exterior project. Accounts for wall area, coats, coverage rate, and waste factor.",
  },
  "/lawn-care-calculator": {
    title: "Lawn Care Cost Calculator | Gardens",
    description: "Estimate annual lawn care costs by lawn size and services. Compare DIY vs. professional lawn care and find where you can save the most.",
  },
  "/fence-cost-calculator": {
    title: "Fence Cost Calculator — Estimate Fence Installation Cost | Gardens",
    description: "Free fence cost calculator for wood, vinyl, chain link, and aluminum fencing. Includes materials, labor, gates, and posts.",
  },
  "/garden-planting-calculator": {
    title: "Garden Planting Calculator — Plants, Soil & Spacing | Gardens",
    description: "Plan your garden bed layout. Calculate how many plants fit your bed, how much soil you need, and the total setup cost.",
  },
  "/home-renovation-calculator": {
    title: "Home Renovation Cost Calculator | Gardens",
    description: "Estimate home renovation costs by room type and scope. Includes kitchen, bathroom, basement, deck, and whole-house renovation cost ranges with contingency.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Gardens",
    description: "How Gardens handles calculator data, analytics, and cookies.",
    robots: "noindex,follow",
  },
  "/terms-of-use": {
    title: "Terms of Use | Gardens",
    description: "Terms governing use of Gardens calculators, guides, and educational content.",
    robots: "noindex,follow",
  },
  "/disclaimer": {
    title: "Disclaimer | Gardens",
    description: "Educational-use and not-professional-advice disclaimer for Gardens calculators and content.",
    robots: "noindex,follow",
  },
  "/about": {
    title: "About Gardens",
    description: "Learn what Gardens is, who it's for, and why we focus on practical home and garden tools and guides.",
  },
  "/contact": {
    title: "Contact Gardens",
    description: "Get in touch with Gardens for support, feedback, or general questions.",
    robots: "noindex,follow",
  },
};

function setMeta(name: string, content: string) {
  let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function SeoManager() {
  const [pathname] = useLocation();

  useEffect(() => {
    const guideSlug = pathname.replace(/^\//, "");
    const guide = guidesBySlug[guideSlug];
    const entry = guide
      ? {
          title: `${guide.title} | Gardens`,
          description: guide.description,
        }
      : metaByPath[pathname] ?? {
          title: "Gardens — Home & Garden Tools and Guides",
          description: "Free home improvement and gardening calculators, cost guides, and expert advice.",
        };

    document.title = entry.title;
    setMeta("description", entry.description);
    setMeta("robots", entry.robots ?? "index,follow");
  }, [pathname]);

  return null;
}
