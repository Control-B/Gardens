import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { EducationalContentBlock } from "@/components/EducationalContentBlock";
import { TrustSection } from "@/components/TrustSection";
import { Link } from "wouter";
import { BookOpen, Clock3, ChevronRight, Search } from "lucide-react";
import { guideArticles } from "@/lib/guides";
import { guidesEducationContent } from "@/lib/educationContent";
import { guidesTrustContent } from "@/lib/trustContent";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const CATEGORY_COLORS: Record<string, string> = {
  "Plumbing DIY": "bg-blue-100 text-blue-700",
  "Roofing": "bg-amber-100 text-amber-700",
  "Gardening": "bg-lime-100 text-lime-700",
  "Lawn Care": "bg-green-100 text-green-700",
  "Fencing": "bg-orange-100 text-orange-700",
  "Home Improvement": "bg-emerald-100 text-emerald-700",
};

export default function GuidesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(guideArticles.map((g) => g.category)));

  const filtered = guideArticles.filter((g) => {
    const matchesSearch = search === "" ||
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === null || g.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-24 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-emerald-950 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Home & Garden Expert Guides
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Problem → Solution → Benefit</h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Every guide solves a real problem, provides a practical solution, shows the benefit, and proves it with a real-world scenario. No fluff.
            </p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                type="text"
                placeholder="Search guides by topic..."
                className="h-12 pl-12 text-base rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-emerald-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 my-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === null ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
            >
              All Guides ({guideArticles.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === cat ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Guide Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {filtered.map((guide) => (
              <Link key={guide.slug} href={`/${guide.slug}`}>
                <div className="group h-full flex flex-col bg-white rounded-2xl border border-border hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[guide.category] ?? "bg-slate-100 text-slate-700"}`}>
                        {guide.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock3 className="h-3 w-3" />
                        {guide.readTime}
                      </div>
                    </div>
                    <h3 className="font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug flex-1">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">{guide.description}</p>
                    <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold mt-auto">
                      <BookOpen className="h-4 w-4" />
                      Read Guide
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                  {guide.calculatorHref && (
                    <div className="px-6 py-3 bg-emerald-50 border-t border-emerald-100 flex items-center gap-2">
                      <span className="text-xs text-emerald-700 font-medium">Related tool:</span>
                      <span className="text-xs font-bold text-emerald-800">{guide.calculatorLabel}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No guides match your search. Try a different keyword.</p>
            </div>
          )}

          <div className="my-12">
            <EducationalContentBlock {...guidesEducationContent} theme="emerald" />
          </div>

          <AdPlaceholder />
        </div>

        <TrustSection {...guidesTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
