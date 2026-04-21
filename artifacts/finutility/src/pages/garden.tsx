import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { EducationalContentBlock } from "@/components/EducationalContentBlock";
import { TrustSection } from "@/components/TrustSection";
import { ToolCard } from "@/components/ToolCard";
import { Link } from "wouter";
import { gardenEducationContent } from "@/lib/educationContent";
import { gardenTrustContent } from "@/lib/trustContent";
import { guideArticles } from "@/lib/guides";
import { getGuideMetadata } from "@/lib/contentHub";
import { TreeDeciduous, Leaf, Sprout, ChevronRight, Clock, BookOpen } from "lucide-react";

const CALCULATORS = [
  { title: "Garden Planting Calculator", desc: "Plan your garden bed layout, plant spacing, soil needs, and setup cost.", href: "/garden-planting-calculator", icon: <Sprout className="h-6 w-6" /> },
  { title: "Lawn Care Cost Calculator", desc: "Compare professional vs. DIY lawn care and find where you save most.", href: "/lawn-care-calculator", icon: <Leaf className="h-6 w-6" /> },
];

const SEASONAL_TIPS = [
  { season: "Spring", color: "bg-green-100 border-green-200 text-green-800", tips: ["Test soil pH and amend before planting", "Start cool-season crops: lettuce, peas, spinach", "Apply pre-emergent weed control to empty beds"] },
  { season: "Summer", color: "bg-yellow-100 border-yellow-200 text-yellow-800", tips: ["Water deeply but less frequently to encourage deep roots", "Harvest regularly to encourage continued production", "Watch for disease in humid conditions — improve airflow"] },
  { season: "Fall", color: "bg-amber-100 border-amber-200 text-amber-800", tips: ["Plant garlic and spring bulbs", "Add compost to beds after clearing spent plants", "Overseed lawn for cool-season grass repair"] },
  { season: "Winter", color: "bg-blue-100 border-blue-200 text-blue-800", tips: ["Plan next year's garden layout and seed orders", "Protect perennials with mulch after frost", "Clean and sharpen tools to prevent disease spread"] },
];

export default function GardenCategory() {
  const gardenGuides = guideArticles.filter((g) => getGuideMetadata(g).pillar === "Garden & Outdoor");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-24 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-lime-950 to-slate-900 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <TreeDeciduous className="h-5 w-5 text-lime-400" />
                <span className="text-lime-400 text-sm font-semibold uppercase tracking-wider">Gardening</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Grow More.<br />Waste Less.<br /><span className="text-lime-400">Know Before You Plant.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Successful gardens start with the right plan. Use our planting calculators and expert guides to get more from every square foot — whether you're growing food, flowers, or a beautiful lawn.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/garden-planting-calculator" className="px-5 py-2.5 rounded-full bg-lime-600 hover:bg-lime-700 text-white text-sm font-semibold transition-colors">
                  Plan Your Garden
                </Link>
                <Link href="/lawn-care-calculator" className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-semibold transition-colors">
                  Lawn Care Costs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
          <AdPlaceholder />

          <section className="my-12">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Garden Calculators</h2>
            <p className="text-slate-500 mb-6">Plan before you plant. Know costs before you buy.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CALCULATORS.map((c) => (
                <ToolCard key={c.href} title={c.title} description={c.desc} href={c.href} icon={c.icon} />
              ))}
            </div>
          </section>

          {/* Seasonal Advice */}
          <section className="my-12">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Seasonal Garden Advice</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SEASONAL_TIPS.map((season) => (
                <div key={season.season} className={`p-5 rounded-2xl border ${season.color}`}>
                  <h3 className="font-black text-lg mb-3">{season.season}</h3>
                  <ul className="space-y-2">
                    {season.tips.map((tip) => (
                      <li key={tip} className="text-sm flex gap-2">
                        <span className="mt-1 flex-shrink-0">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="my-12">
            <EducationalContentBlock {...gardenEducationContent} theme="emerald" />
          </div>

          {gardenGuides.length > 0 && (
            <section className="my-12">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Gardening Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gardenGuides.map((guide) => (
                  <Link key={guide.slug} href={`/${guide.slug}`}>
                    <div className="group p-6 bg-white rounded-2xl border border-border hover:border-lime-300 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-lime-600 bg-lime-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          {guide.readTime}
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-lime-700 transition-colors">{guide.title}</h3>
                      <p className="text-sm text-slate-500 mb-4">{guide.description}</p>
                      <div className="flex items-center gap-1 text-lime-600 text-sm font-semibold">
                        <BookOpen className="h-4 w-4" />
                        Read Guide
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <AdPlaceholder />
        </div>

        <TrustSection {...gardenTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
