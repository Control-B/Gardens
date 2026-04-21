import { useState } from "react";
import { Link } from "wouter";
import { BookOpen, ChevronRight, Clock3, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { EducationalContentBlock } from "@/components/EducationalContentBlock";
import { TrustSection } from "@/components/TrustSection";
import { Input } from "@/components/ui/input";
import { guideArticles } from "@/lib/guides";
import { guidesEducationContent } from "@/lib/educationContent";
import { guidesTrustContent } from "@/lib/trustContent";
import { getGuideMetadata, topicClusters, type GuideContentType, type GuidePillar } from "@/lib/contentHub";

const PILLARS: (GuidePillar | "All")[] = [
  "All",
  "Home Improvement",
  "Garden & Outdoor",
  "Exterior & Curb Appeal",
];

const CONTENT_TYPES: (GuideContentType | "All")[] = [
  "All",
  "How-To",
  "Cost Guide",
  "Comparison",
  "Mistakes",
  "Value",
  "Seasonal",
];

function pillClasses(pillar: GuidePillar) {
  if (pillar === "Garden & Outdoor") return "bg-lime-100 text-lime-800";
  if (pillar === "Exterior & Curb Appeal") return "bg-amber-100 text-amber-800";
  return "bg-emerald-100 text-emerald-800";
}

export default function GuidesPage() {
  const [search, setSearch] = useState("");
  const [activePillar, setActivePillar] = useState<GuidePillar | "All">("All");
  const [activeType, setActiveType] = useState<GuideContentType | "All">("All");

  const filtered = guideArticles.filter((guide) => {
    const meta = getGuideMetadata(guide);
    const query = search.toLowerCase();
    const matchesSearch =
      query === "" ||
      guide.title.toLowerCase().includes(query) ||
      guide.description.toLowerCase().includes(query) ||
      guide.category.toLowerCase().includes(query) ||
      meta.cluster.toLowerCase().includes(query);
    const matchesPillar = activePillar === "All" || meta.pillar === activePillar;
    const matchesType = activeType === "All" || meta.contentType === activeType;
    return matchesSearch && matchesPillar && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-24 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-emerald-950 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Authority Content Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Guides Organized by Pillar, Cluster, and Intent</h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8">
              Browse the educational system behind the platform: how-to guides, cost pages,
              seasonal content, value articles, and comparisons designed to support each topic cluster.
            </p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                type="text"
                placeholder="Search guides by topic, cluster, or problem..."
                className="h-12 pl-12 text-base rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-emerald-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
          <AdPlaceholder />

          <section className="my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topicClusters.slice(0, 6).map((cluster) => (
                <div key={cluster.id} className="rounded-2xl border border-border bg-white p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pillClasses(cluster.pillar)}`}>
                      {cluster.pillar}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {cluster.priority}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-slate-900">{cluster.title}</h2>
                  <p className="text-sm text-slate-500 mt-2">{cluster.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-2 my-8">
            {PILLARS.map((pillar) => (
              <button
                key={pillar}
                onClick={() => setActivePillar(pillar)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activePillar === pillar ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {pillar === "All" ? `All Pillars (${guideArticles.length})` : pillar}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {CONTENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeType === type ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {filtered.map((guide) => {
              const meta = getGuideMetadata(guide);
              return (
                <Link key={guide.slug} href={`/${guide.slug}`}>
                  <div className="group h-full flex flex-col bg-white rounded-2xl border border-border hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pillClasses(meta.pillar)}`}>
                          {meta.pillar}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {meta.contentType}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock3 className="h-3 w-3" />
                          {guide.readTime}
                        </div>
                      </div>
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-2">{meta.cluster}</p>
                      <h3 className="font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug flex-1">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{guide.description}</p>
                      <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold mt-auto">
                        <BookOpen className="h-4 w-4" />
                        Read guide
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
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No guides match that filter set yet. Try a broader keyword or pillar.</p>
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
