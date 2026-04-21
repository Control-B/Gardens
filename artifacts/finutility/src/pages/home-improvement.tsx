import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { EducationalContentBlock } from "@/components/EducationalContentBlock";
import { TrustSection } from "@/components/TrustSection";
import { ToolCard } from "@/components/ToolCard";
import { Link } from "wouter";
import { homeImprovementEducationContent } from "@/lib/educationContent";
import { homeImprovementTrustContent } from "@/lib/trustContent";
import { guideArticles } from "@/lib/guides";
import { getGuideMetadata } from "@/lib/contentHub";
import { Hammer, Paintbrush, Home, ChevronRight, Wrench, Clock, BookOpen } from "lucide-react";

const CALCULATORS = [
  { title: "Roof Cost Calculator", desc: "Compare asphalt, metal, tile, and slate costs before calling a contractor.", href: "/roof-cost-calculator", icon: <Home className="h-6 w-6" /> },
  { title: "Paint Calculator", desc: "Get the exact gallons you need for any room or exterior project.", href: "/paint-calculator", icon: <Paintbrush className="h-6 w-6" /> },
  { title: "Home Renovation Budget", desc: "Plan realistic renovation costs by room type and scope.", href: "/home-renovation-calculator", icon: <Hammer className="h-6 w-6" /> },
];

const DIY_TIPS = [
  { tip: "Always get 3 contractor quotes", detail: "The range between the lowest and highest quote is typically 30–60% for major projects." },
  { tip: "Permits protect your investment", detail: "Unpermitted work reduces resale value and can void insurance claims. Always verify permit requirements." },
  { tip: "Prep work determines paint quality", detail: "Professional painters spend 60% of their time prepping. Fill holes, clean walls, tape edges — then paint." },
  { tip: "Know when NOT to DIY", detail: "Electrical panels, gas lines, load-bearing walls, and main plumbing lines require licensed professionals." },
];

export default function HomeImprovementCategory() {
  const homeGuides = guideArticles.filter((g) => getGuideMetadata(g).pillar === "Home Improvement");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-24 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Hammer className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Home Improvement</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Plan Smarter.<br />Spend Less.<br /><span className="text-emerald-400">Fix It Right.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Every home improvement project starts with a realistic cost estimate. Use our free calculators and practical guides to plan your project before calling a single contractor.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/roof-cost-calculator" className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors">
                  Roof Cost Calculator
                </Link>
                <Link href="/home-renovation-calculator" className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-semibold transition-colors">
                  Renovation Budget
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* Calculators */}
          <section className="my-12">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Home Improvement Calculators</h2>
            <p className="text-slate-500 mb-6">Get a realistic cost benchmark before you call a contractor.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CALCULATORS.map((c) => (
                <ToolCard key={c.href} title={c.title} description={c.desc} href={c.href} icon={c.icon} />
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="my-12 bg-amber-50 rounded-2xl border border-amber-100 p-8">
            <div className="flex items-center gap-2 mb-6">
              <Wrench className="h-5 w-5 text-amber-600" />
              <h2 className="text-xl font-black text-amber-900">Common Mistakes to Avoid</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIY_TIPS.map((item) => (
                <div key={item.tip} className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-200 text-amber-800 text-xs font-bold flex-shrink-0 mt-0.5">!</div>
                  <div>
                    <p className="font-semibold text-amber-900 text-sm">{item.tip}</p>
                    <p className="text-xs text-amber-700 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="my-12">
            <EducationalContentBlock {...homeImprovementEducationContent} theme="emerald" />
          </div>

          {/* Guides */}
          {homeGuides.length > 0 && (
            <section className="my-12">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Home Improvement Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {homeGuides.map((guide) => (
                  <Link key={guide.slug} href={`/${guide.slug}`}>
                    <div className="group p-6 bg-white rounded-2xl border border-border hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          {guide.readTime}
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{guide.title}</h3>
                      <p className="text-sm text-slate-500 mb-4">{guide.description}</p>
                      <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
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

        <TrustSection {...homeImprovementTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
