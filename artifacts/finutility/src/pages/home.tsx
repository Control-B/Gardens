import { useState, type FormEvent } from "react";
import { useLocation, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { guideArticles } from "@/lib/guides";
import {
  getGuideMetadata,
  seasonalPlaybook,
} from "@/lib/contentHub";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock,
  Fence,
  Hammer,
  Home,
  Leaf,
  Paintbrush,
  Search,
  Sprout,
  Star,
  TreeDeciduous,
  Sofa,
  Sun,
  Sparkles,
} from "lucide-react";

const CALCULATORS = [
  {
    title: "Roof Cost Calculator",
    description: "Estimate roof replacement cost by material before you compare quotes.",
    href: "/roof-cost-calculator",
    icon: <Home className="h-5 w-5" />,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    hoverColor: "hover:bg-amber-50 hover:border-amber-300",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Paint Calculator",
    description: "Get the gallons, coats, and waste factor right before you buy paint.",
    href: "/paint-calculator",
    icon: <Paintbrush className="h-5 w-5" />,
    color: "bg-sky-50 text-sky-700 border-sky-200",
    hoverColor: "hover:bg-sky-50 hover:border-sky-300",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Lawn Care Calculator",
    description: "Compare pro vs. DIY lawn care and see where seasonal savings show up.",
    href: "/lawn-care-calculator",
    icon: <Leaf className="h-5 w-5" />,
    color: "bg-green-50 text-green-700 border-green-200",
    hoverColor: "hover:bg-green-50 hover:border-green-300",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Fence Cost Calculator",
    description: "Benchmark materials, labor, gates, and post counts before the fence quote.",
    href: "/fence-cost-calculator",
    icon: <Fence className="h-5 w-5" />,
    color: "bg-orange-50 text-orange-700 border-orange-200",
    hoverColor: "hover:bg-orange-50 hover:border-orange-300",
    image: "https://images.unsplash.com/photo-1594064935734-30e55f835a93?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Garden Planting Calculator",
    description: "Plan spacing, soil volume, and garden bed setup costs in one tool.",
    href: "/garden-planting-calculator",
    icon: <TreeDeciduous className="h-5 w-5" />,
    color: "bg-lime-50 text-lime-700 border-lime-200",
    hoverColor: "hover:bg-lime-50 hover:border-lime-300",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Home Renovation Budget",
    description: "Model realistic project budgets with scope, contingency, and room type.",
    href: "/home-renovation-calculator",
    icon: <Hammer className="h-5 w-5" />,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    hoverColor: "hover:bg-purple-50 hover:border-purple-300",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
  },
];

const HUBS = [
  {
    title: "Home Improvement",
    description: "Repairs, budgeting, renovation, and energy-saving decisions for the whole house.",
    href: "/home-improvement",
    tag: "Indoor Projects",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop",
    color: "from-emerald-900/70 to-emerald-950/80",
    icon: <Hammer className="h-6 w-6" />,
  },
  {
    title: "Garden & Outdoor",
    description: "Beginner gardening, seasonal planning, landscaping, and food-growing systems.",
    href: "/garden",
    tag: "Outdoor Living",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=900&q=85&auto=format&fit=crop",
    color: "from-green-900/70 to-green-950/80",
    icon: <Sprout className="h-6 w-6" />,
  },
  {
    title: "Exterior & Curb Appeal",
    description: "Roofing, fencing, ROI, and curb-appeal projects that influence resale value.",
    href: "/exterior",
    tag: "Curb Appeal",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=85&auto=format&fit=crop",
    color: "from-amber-900/70 to-amber-950/80",
    icon: <Home className="h-6 w-6" />,
  },
  {
    title: "Cleaning",
    description: "Room-by-room cleaning schedules, natural DIY cleaners, and deep-clean guides.",
    href: "/cleaning",
    tag: "Home Care",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=900&q=85&auto=format&fit=crop",
    color: "from-sky-900/70 to-sky-950/80",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "Decor & Organization",
    description: "Room refresh ideas, smart storage solutions, and renter-friendly styling.",
    href: "/decor",
    tag: "Style & Space",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85&auto=format&fit=crop",
    color: "from-violet-900/70 to-violet-950/80",
    icon: <Sofa className="h-6 w-6" />,
  },
  {
    title: "Outdoor Living",
    description: "Patio upgrades, privacy solutions, backyard lighting, and family-friendly design.",
    href: "/outdoor-living",
    tag: "Backyard & Patio",
    image: "https://images.unsplash.com/photo-1605276373954-0240a31ba65f?w=900&q=85&auto=format&fit=crop",
    color: "from-orange-900/70 to-orange-950/80",
    icon: <Sun className="h-6 w-6" />,
  },
];

const SEASONAL_IMAGES: Record<string, string> = {
  Spring: "https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=600&q=80&auto=format&fit=crop",
  Summer: "https://images.unsplash.com/photo-1467685790346-20bfe73a81f0?w=600&q=80&auto=format&fit=crop",
  Fall: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80&auto=format&fit=crop",
  Winter: "https://images.unsplash.com/photo-1518945756765-f8641d60aa75?w=600&q=80&auto=format&fit=crop",
};

const SEASONAL_COLORS: Record<string, string> = {
  Spring: "from-pink-700/75 to-rose-900/80",
  Summer: "from-green-700/75 to-green-900/80",
  Fall: "from-orange-700/75 to-amber-900/80",
  Winter: "from-blue-700/75 to-slate-900/80",
};

const GUIDE_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80&auto=format&fit=crop",
];

const START_WITH_PROBLEM = [
  { problem: "My kitchen has no storage space", href: "/small-bedroom-storage-ideas", emoji: "🍳", tag: "Organization" },
  { problem: "I need a low-cost garden this year", href: "/how-to-create-a-raised-garden-bed", emoji: "🌱", tag: "Garden" },
  { problem: "My bathroom feels dark and dated", href: "/bathroom-renovation-cost-guide", emoji: "🚿", tag: "Home Improvement" },
  { problem: "I want a patio I actually want to use", href: "/patio-upgrade-ideas-budget", emoji: "☀️", tag: "Outdoor Living" },
  { problem: "My home smells no matter what I do", href: "/remove-odors-from-home", emoji: "🪟", tag: "Cleaning" },
  { problem: "My living room looks bland and cluttered", href: "/living-room-refresh-guide", emoji: "🛋️", tag: "Decor" },
  { problem: "I need a weekend DIY project under $200", href: "/how-to-paint-a-room-like-a-pro", emoji: "🔨", tag: "DIY" },
  { problem: "I want backyard privacy without a full fence", href: "/backyard-privacy-ideas", emoji: "🌳", tag: "Outdoor Living" },
];

const PILLAR_COLORS: Record<string, string> = {
  "Garden & Outdoor": "bg-lime-100 text-lime-800",
  "Exterior & Curb Appeal": "bg-amber-100 text-amber-800",
  "Home Improvement": "bg-emerald-100 text-emerald-800",
  "Cleaning & Home Care": "bg-sky-100 text-sky-800",
  "Decor & Organization": "bg-violet-100 text-violet-800",
  "Outdoor Living": "bg-orange-100 text-orange-800",
};

function pillarPill(pillar: string) {
  return PILLAR_COLORS[pillar] ?? "bg-emerald-100 text-emerald-800";
}

const TRENDING = [
  {
    category: "Garden",
    title: "How to Create a Raised Garden Bed from Scratch",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=700&q=80&auto=format&fit=crop",
    href: "/how-to-create-a-raised-garden-bed",
  },
  {
    category: "Home Improvement",
    title: "How to Fix a Leaking Faucet Without Calling a Plumber",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=700&q=80&auto=format&fit=crop",
    href: "/how-to-fix-a-leaking-faucet",
  },
  {
    category: "Exterior",
    title: "Best Roofing Materials: Cost vs. Lifespan Compared",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop",
    href: "/how-to-choose-roof-material",
  },
];

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const intent = parseNaturalLanguage(query);
    if (intent) {
      setLocation(`${intent.calculator}?${new URLSearchParams(intent.params).toString()}`);
    }
  };

  const featuredGuides = guideArticles.filter((g) => getGuideMetadata(g).featured).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative h-[88vh] min-h-[560px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1800&q=90&auto=format&fit=crop"
            alt="Beautiful garden in bloom"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-16 md:pb-20">
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-300 mb-4">
                Home & Garden Guide
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5 drop-shadow-lg">
                Make Your Best Home,<br />
                <span className="text-green-300">Starting Today.</span>
              </h1>
              <p className="text-lg text-white/85 mb-8 leading-relaxed max-w-xl">
                Free cost calculators, expert how-to guides, and seasonal advice — everything you need to plan smarter home and garden projects.
              </p>

              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white/95 backdrop-blur rounded-full shadow-xl overflow-hidden max-w-xl"
              >
                <Search className="ml-5 h-5 w-5 text-stone-400 shrink-0" />
                <Input
                  type="text"
                  placeholder="e.g. kitchen remodel cost, spring garden checklist..."
                  className="flex-1 h-14 px-4 text-base bg-transparent border-0 text-stone-800 placeholder:text-stone-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  className="m-1.5 h-11 px-7 rounded-full bg-green-700 hover:bg-green-800 text-white font-bold text-sm"
                >
                  Search
                </Button>
              </form>

              <div className="flex flex-wrap gap-2 mt-4">
                {["kitchen remodel cost", "roof cost for 2000 sq ft", "spring garden checklist", "paint 3 rooms"].map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setQuery(ex)}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/15 border border-white/25 text-white hover:bg-white/25 transition-colors cursor-pointer"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Trending strip ────────────────────────────── */}
        <section className="bg-green-800 text-white">
          <div className="container mx-auto px-4 md:px-10 py-3 flex items-center gap-4 overflow-x-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-green-300 whitespace-nowrap shrink-0">Trending Now</span>
            <div className="w-px h-4 bg-green-600 shrink-0" />
            {[
              "How to Start a Vegetable Garden",
              "Best Paint Colors for 2025",
              "Roof Replacement Cost Guide",
              "DIY Raised Garden Bed",
              "Spring Lawn Care Checklist",
            ].map((item, i) => (
              <span key={item} className="flex items-center gap-3 whitespace-nowrap">
                {i > 0 && <span className="text-green-600">•</span>}
                <button className="text-sm hover:text-green-200 transition-colors">{item}</button>
              </span>
            ))}
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-14 max-w-6xl">
          <AdPlaceholder />

          {/* ── Main Hubs – photo cards ───────────────────── */}
          <section className="my-14">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Explore by Category</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">Start With What You Love</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {HUBS.map((hub) => (
                <Link key={hub.href} href={hub.href}>
                  <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-64 md:h-72 shadow-md hover:shadow-xl transition-shadow">
                    <img
                      src={hub.image}
                      alt={hub.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${hub.color}`} />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-2 text-white/75 text-xs font-semibold uppercase tracking-widest">
                        {hub.icon}
                        {hub.tag}
                      </div>
                      <h3 className="text-2xl font-extrabold text-white mb-2">{hub.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed mb-4">{hub.description}</p>
                      <div className="flex items-center gap-1 text-green-300 text-sm font-bold group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Trending Articles ─────────────────────────── */}
          <section className="my-14">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Editor's Picks</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">Trending This Season</h2>
              </div>
              <Link href="/guides" className="hidden md:flex items-center gap-1 text-green-700 hover:text-green-800 font-semibold text-sm">
                All articles <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TRENDING.map((article, i) => (
                <Link key={article.href} href={article.href}>
                  <div className="group cursor-pointer h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-2xl mb-4 shadow-sm">
                      <img
                        src={article.image}
                        alt={article.title}
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? "h-64" : "h-48"}`}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-green-800">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                    <h3 className="font-bold text-stone-900 text-lg leading-snug group-hover:text-green-700 transition-colors">
                      {article.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-1 text-green-700 text-sm font-semibold">
                      Read more <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Start With the Problem ───────────────────── */}
          <section className="my-14">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">Practical Problem-Solving</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-2">Start With Your Problem</h2>
              <p className="text-stone-500 max-w-xl mx-auto">Tell us what's frustrating you. We'll point you to the guide that solves it.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {START_WITH_PROBLEM.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="group bg-white border border-stone-100 rounded-2xl p-5 hover:shadow-md hover:border-green-200 transition-all cursor-pointer h-full flex flex-col gap-3">
                    <div className="text-2xl">{item.emoji}</div>
                    <p className="font-semibold text-stone-800 text-sm leading-snug group-hover:text-green-700 transition-colors flex-1">
                      "{item.problem}"
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">{item.tag}</span>
                      <ChevronRight className="h-4 w-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <AdPlaceholder />

          {/* ── Free Calculators ─────────────────────────── */}
          <section className="my-14">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Plan Smarter</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">Free Cost Calculators</h2>
                <p className="text-stone-500 mt-1">Know what your project should cost before you get the first quote.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CALCULATORS.map((calc) => (
                <Link key={calc.href} href={calc.href}>
                  <div className={`group relative overflow-hidden rounded-2xl border bg-white hover:shadow-lg transition-all cursor-pointer h-full`}>
                    <div className="h-40 overflow-hidden">
                      <img
                        src={calc.image}
                        alt={calc.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full mb-3 border ${calc.color}`}>
                        {calc.icon}
                        {calc.title.split(" ")[0]}
                      </div>
                      <h3 className="font-bold text-stone-900 mb-1.5 group-hover:text-green-700 transition-colors">
                        {calc.title}
                      </h3>
                      <p className="text-sm text-stone-500 leading-relaxed">{calc.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-green-700 text-sm font-semibold">
                        Open calculator <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Seasonal Playbook ─────────────────────────── */}
          <section className="my-14">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Year-Round Guidance</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">Seasonal Home & Garden Guide</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {seasonalPlaybook.map((season) => (
                <div key={season.season} className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer h-80">
                  <img
                    src={SEASONAL_IMAGES[season.season] ?? "https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=600&q=80&auto=format&fit=crop"}
                    alt={season.season}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${SEASONAL_COLORS[season.season] ?? "from-green-900/80 to-transparent"}`} />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
                      <Star className="h-3.5 w-3.5" />
                      {season.season}
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed mb-3">{season.focus}</p>
                    <ul className="space-y-1.5">
                      {season.pages.slice(0, 3).map((page) => (
                        <li key={page} className="text-xs text-white/75 flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-white/60 shrink-0" />
                          {page}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AdPlaceholder />

          {/* ── Featured Guides ───────────────────────────── */}
          <section className="my-14">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Learn & Do</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">Featured Guides</h2>
              </div>
              <Link href="/guides" className="hidden md:flex items-center gap-1 text-green-700 hover:text-green-800 font-semibold text-sm">
                All guides <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGuides.map((guide, i) => {
                const meta = getGuideMetadata(guide);
                return (
                  <Link key={guide.slug} href={`/${guide.slug}`}>
                    <div className="group cursor-pointer bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
                      <div className="h-44 overflow-hidden">
                        <img
                          src={GUIDE_IMAGES[i % GUIDE_IMAGES.length]}
                          alt={guide.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pillarPill(meta.pillar)}`}>
                            {meta.pillar}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-stone-400">
                            <Clock className="h-3 w-3" />
                            {guide.readTime}
                          </div>
                        </div>
                        <h3 className="font-bold text-stone-900 mb-2 group-hover:text-green-700 transition-colors flex-1 leading-snug">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-stone-500 mb-4 leading-relaxed">{guide.description}</p>
                        <div className="flex items-center gap-1 text-green-700 text-sm font-semibold mt-auto">
                          <BookOpen className="h-4 w-4" />
                          Read guide <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── Inspiration Banner ─────────────────────────── */}
          <section className="my-14 relative rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=1400&q=85&auto=format&fit=crop"
              alt="Beautiful home garden inspiration"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-950/85 via-green-900/70 to-transparent" />
            <div className="relative z-10 p-12 md:p-16 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-3">Make Your Best Home</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Your Dream Garden Starts With the Right Plan
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Use our free planning tools and step-by-step guides to design outdoor spaces you'll love all year long.
              </p>
              <Link
                href="/garden"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-green-800 font-bold hover:bg-green-50 transition-colors shadow"
              >
                Explore the Garden Hub <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────── */}
          <section className="my-14">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">Got Questions?</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <FAQAccordion
                items={[
                  {
                    question: "Are these calculators and guides free to use?",
                    answer: "Yes. All calculators and educational pages are completely free to access and require no account or sign-up.",
                  },
                  {
                    question: "How accurate are the cost estimates?",
                    answer: "Estimates are based on national averages and are designed to help you benchmark quotes and ask better questions. Always get multiple professional quotes for your specific location.",
                  },
                  {
                    question: "Can I use these estimates when talking to contractors?",
                    answer: "Absolutely. The calculators are designed to help you benchmark quotes, understand where costs come from, and negotiate more confidently.",
                  },
                  {
                    question: "Why include seasonal guides on a home and garden site?",
                    answer: "Seasonal content helps homeowners act at the right time of year, capturing timely opportunities to save money and get the best results from their projects.",
                  },
                  {
                    question: "Do the guides cover beginner topics?",
                    answer: "Yes! Many guides are written specifically for first-time homeowners and beginner gardeners, walking you through projects step by step.",
                  },
                ]}
              />
            </div>
          </section>

          {/* ── Newsletter ────────────────────────────────── */}
          <section className="my-14 bg-green-900 text-white rounded-3xl px-8 md:px-14 py-12 text-center">
            <div className="text-3xl mb-3">📬</div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-300 mb-3">Stay In the Know</p>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Seasonal Guides, Free — Every Month</h2>
            <p className="text-white/70 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Get our best practical home and garden guides delivered monthly. No spam, no fluff — just the advice you actually need right now.
            </p>
            <div className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 h-12 px-5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-green-400"
              />
              <button className="h-12 px-7 rounded-full bg-green-500 hover:bg-green-400 font-bold text-sm transition-colors shrink-0">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-white/40 mt-4">Free. Unsubscribe anytime.</p>
          </section>

          <AdPlaceholder />
        </div>

        {/* ── Trust Footer Banner ───────────────────────── */}
        <section className="bg-green-50 border-t border-green-100 py-14">
          <div className="container mx-auto px-4 md:px-10 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: "🌿",
                  title: "Practical Advice",
                  desc: "Every guide is written to help you actually do the project — not just read about it.",
                },
                {
                  icon: "💰",
                  title: "Know Before You Spend",
                  desc: "Our free calculators give you real cost ranges so you're never surprised by a contractor's quote.",
                },
                {
                  icon: "📅",
                  title: "Seasonal & Up-to-Date",
                  desc: "Guides are refreshed seasonally so the advice you get matches what's happening in your yard right now.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
