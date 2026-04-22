import { useState } from "react";
import { Link } from "wouter";
import { BookOpen, ChevronRight, Clock3, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { TrustSection } from "@/components/TrustSection";
import { Input } from "@/components/ui/input";
import { guideArticles } from "@/lib/guides";
import { guidesTrustContent } from "@/lib/trustContent";
import { getGuideMetadata, type GuideContentType, type GuidePillar } from "@/lib/contentHub";

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

const GUIDE_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594064935734-30e55f835a93?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80&auto=format&fit=crop",
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
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />

      <main className="flex-1">
        {/* ── Photo Hero ───────────────────────────────── */}
        <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=85&auto=format&fit=crop"
            alt="Reading and learning guides"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-green-200 text-sm font-medium mb-5">
              <BookOpen className="h-4 w-4" />
              Home & Garden Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Expert Guides for Homeowners & Gardeners</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              How-to guides, cost breakdowns, seasonal advice, and project planning — everything you need to make smarter home and garden decisions.
            </p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search guides by topic, e.g. raised garden bed, roof cost..."
                className="h-12 pl-12 text-base rounded-full bg-white/15 border-white/25 text-white placeholder:text-white/50 focus-visible:ring-white/30"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Filters ──────────────────────────────────── */}
          <section className="my-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 self-center mr-1">Category:</span>
              {PILLARS.map((pillar) => (
                <button
                  key={pillar}
                  onClick={() => setActivePillar(pillar)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activePillar === pillar
                      ? "bg-green-700 text-white shadow-sm"
                      : "bg-white text-stone-600 border border-stone-200 hover:border-green-300 hover:text-green-700"
                  }`}
                >
                  {pillar === "All" ? `All (${guideArticles.length})` : pillar}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 self-center mr-1">Type:</span>
              {CONTENT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activeType === type
                      ? "bg-stone-800 text-white shadow-sm"
                      : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>

          {/* ── Guide Cards with Images ───────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
            {filtered.map((guide, i) => {
              const meta = getGuideMetadata(guide);
              return (
                <Link key={guide.slug} href={`/${guide.slug}`}>
                  <div className="group h-full flex flex-col bg-white rounded-2xl border border-stone-100 hover:shadow-md transition-all cursor-pointer overflow-hidden">
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={GUIDE_IMAGE_POOL[i % GUIDE_IMAGE_POOL.length]}
                        alt={guide.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${pillClasses(meta.pillar)}`}>
                          {meta.pillar}
                        </span>
                      </div>
                      {guide.calculatorHref && (
                        <div className="absolute bottom-3 right-3">
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/90 text-green-700">
                            + Calculator
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                          {meta.contentType}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-stone-400">
                          <Clock3 className="h-3 w-3" />
                          {guide.readTime}
                        </div>
                      </div>
                      <h3 className="font-bold text-stone-900 mb-2 group-hover:text-green-700 transition-colors leading-snug flex-1">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-stone-500 mb-4 leading-relaxed">{guide.description}</p>
                      <div className="flex items-center gap-1 text-green-700 text-sm font-semibold mt-auto">
                        <BookOpen className="h-4 w-4" />
                        Read guide
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-stone-500 text-lg">No guides match that search. Try a different topic or clear the filter.</p>
            </div>
          )}

          <AdPlaceholder />
        </div>

        <TrustSection {...guidesTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
