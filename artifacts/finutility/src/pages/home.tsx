import { useState, type FormEvent } from "react";
import { useLocation, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { EducationalContentBlock } from "@/components/EducationalContentBlock";
import { TrustSection } from "@/components/TrustSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { homeEducationContent } from "@/lib/educationContent";
import { homeTrustContent } from "@/lib/trustContent";
import { guideArticles } from "@/lib/guides";
import {
  authorityFramework,
  contentTypeBlueprint,
  getGuideMetadata,
  seasonalPlaybook,
  topicClusters,
  type GuidePillar,
} from "@/lib/contentHub";
import {
  BadgeDollarSign,
  BookOpen,
  CalendarRange,
  ChevronRight,
  Clock,
  Fence,
  Hammer,
  Home,
  Leaf,
  Paintbrush,
  Search,
  ShieldCheck,
  Sprout,
  Star,
  TreeDeciduous,
  Zap,
} from "lucide-react";

const CALCULATORS = [
  {
    title: "Roof Cost Calculator",
    description: "Estimate roof replacement cost by material before you compare quotes.",
    href: "/roof-cost-calculator",
    icon: <Home className="h-6 w-6" />,
    badge: "High CPC",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    title: "Paint Calculator",
    description: "Get the gallons, coats, and waste factor right before you buy paint.",
    href: "/paint-calculator",
    icon: <Paintbrush className="h-6 w-6" />,
    badge: "Quick Win",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    title: "Lawn Care Cost Calculator",
    description: "Compare pro vs. DIY lawn care and see where seasonal savings show up.",
    href: "/lawn-care-calculator",
    icon: <Leaf className="h-6 w-6" />,
    badge: "Seasonal",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Fence Cost Calculator",
    description: "Benchmark materials, labor, gates, and post counts before the fence quote.",
    href: "/fence-cost-calculator",
    icon: <Fence className="h-6 w-6" />,
    badge: "Lead Gen",
    badgeColor: "bg-orange-100 text-orange-800",
  },
  {
    title: "Garden Planting Calculator",
    description: "Plan spacing, soil volume, and garden bed setup costs in one tool.",
    href: "/garden-planting-calculator",
    icon: <TreeDeciduous className="h-6 w-6" />,
    badge: "Authority",
    badgeColor: "bg-lime-100 text-lime-800",
  },
  {
    title: "Home Renovation Budget",
    description: "Model realistic project budgets with scope, contingency, and room type.",
    href: "/home-renovation-calculator",
    icon: <Hammer className="h-6 w-6" />,
    badge: "High Intent",
    badgeColor: "bg-purple-100 text-purple-800",
  },
];

const HUBS = [
  {
    title: "Home Improvement",
    description: "Repairs, budgeting, renovation, and energy-saving decisions for the whole house.",
    href: "/home-improvement",
    color: "from-emerald-600 to-emerald-800",
    icon: <Hammer className="h-8 w-8" />,
  },
  {
    title: "Garden & Outdoor",
    description: "Beginner gardening, seasonal planning, landscaping, and food-growing systems.",
    href: "/garden",
    color: "from-lime-600 to-lime-800",
    icon: <Sprout className="h-8 w-8" />,
  },
  {
    title: "Exterior & Curb Appeal",
    description: "Roofing, fencing, ROI, and curb-appeal projects that influence resale value.",
    href: "/exterior",
    color: "from-amber-600 to-amber-800",
    icon: <Home className="h-8 w-8" />,
  },
];

function pillarPillars(pillar: GuidePillar) {
  if (pillar === "Garden & Outdoor") {
    return "bg-lime-100 text-lime-800";
  }
  if (pillar === "Exterior & Curb Appeal") {
    return "bg-amber-100 text-amber-800";
  }
  return "bg-emerald-100 text-emerald-800";
}

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

  const featuredGuides = guideArticles.filter((guide) => getGuideMetadata(guide).featured).slice(0, 6);
  const stats = [
    { stat: String(CALCULATORS.length), label: "live calculators", icon: <Zap className="h-5 w-5" /> },
    { stat: `${guideArticles.length}+`, label: "educational guides", icon: <BookOpen className="h-5 w-5" /> },
    { stat: `${topicClusters.length}`, label: "topic clusters", icon: <BadgeDollarSign className="h-5 w-5" /> },
    { stat: "4", label: "seasonal update cycles", icon: <CalendarRange className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-32 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
          <div className="absolute top-16 right-8 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl z-0" />
          <div className="absolute bottom-8 left-8 h-48 w-48 rounded-full bg-lime-500/10 blur-3xl z-0" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-8">
                <Leaf className="h-4 w-4" />
                Home & Garden Authority Platform
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
                The Wikipedia + Tools Hub
                <br />
                <span className="text-emerald-400">for Home & Garden Projects</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Browse topic clusters, run cost calculators, and learn with pages built around
                Problem → Solution → Benefit + STAR. This is structured to scale into a true
                category-dominating education system, not a random blog.
              </p>

              <form
                onSubmit={handleSearch}
                className="max-w-2xl mx-auto relative flex items-center bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20 mb-8"
              >
                <Search className="absolute left-6 h-5 w-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="e.g. kitchen remodel cost, fence 150 linear feet, spring garden checklist..."
                  className="h-14 pl-14 pr-40 text-base rounded-xl bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  className="absolute right-2 h-11 rounded-xl px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Explore
                </Button>
              </form>

              <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-400">
                <span>Try:</span>
                {[
                  "kitchen remodel cost",
                  "roof cost for 2000 sq ft",
                  "spring garden checklist",
                  "paint calculator 3 rooms",
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setQuery(example)}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-emerald-950 text-white border-b border-emerald-900/50">
          <div className="container mx-auto px-4 md:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="text-emerald-400">{item.icon}</div>
                  <div>
                    <div className="font-black text-lg text-white">{item.stat}</div>
                    <div className="text-xs text-emerald-300">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
          <AdPlaceholder />

          <section className="my-14">
            <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Start With the Main Hubs</h2>
                <p className="text-slate-500 mt-1">
                  Three parent silos organize the content architecture and make internal linking clearer.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HUBS.map((hub) => (
                <Link key={hub.href} href={hub.href}>
                  <div
                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${hub.color} text-white p-8 cursor-pointer hover:scale-[1.02] transition-transform h-full`}
                  >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="relative z-10">
                      <div className="mb-4 opacity-90">{hub.icon}</div>
                      <h3 className="text-xl font-black mb-3">{hub.title}</h3>
                      <p className="text-sm opacity-85 leading-relaxed mb-5">{hub.description}</p>
                      <div className="flex items-center gap-1 text-sm font-bold opacity-90 group-hover:opacity-100">
                        Explore hub <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="my-14">
            <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Topic Clusters Built to Scale</h2>
                <p className="text-slate-500 mt-1">
                  These silos turn the site into a structured authority platform for 100+ pages.
                </p>
              </div>
              <Link
                href="/guides"
                className="hidden md:flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
              >
                Browse all guides <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {topicClusters.map((cluster) => (
                <div key={cluster.id} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pillarPillars(cluster.pillar)}`}>
                      {cluster.pillar}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {cluster.priority}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{cluster.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{cluster.description}</p>
                  <p className="text-sm text-slate-700 mt-4 font-medium">{cluster.intent}</p>
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-1">Article ideas</p>
                      <p className="text-sm text-slate-700">{cluster.articleIdeas.join(" • ")}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-1">Tool ideas</p>
                      <p className="text-sm text-slate-700">{cluster.toolIdeas.join(" • ")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AdPlaceholder />

          <section className="my-14">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-slate-900">Educational System</h2>
              <p className="text-slate-500 mt-2">
                Every strong page should teach, prove, and convert. This framework makes the site more
                useful to readers and more coherent to search engines.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {authorityFramework.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-border bg-white p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-black mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-black text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="my-14">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Free Cost Calculators</h2>
                <p className="text-slate-500 mt-1">
                  Monetizable, high-intent tools that support the content clusters.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CALCULATORS.map((calc) => (
                <Link key={calc.href} href={calc.href}>
                  <div className="group p-6 bg-white rounded-2xl border border-border hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer h-full">
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-3 ${calc.badgeColor}`}>
                      {calc.badge}
                    </span>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                        {calc.icon}
                      </div>
                      <h3 className="font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {calc.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{calc.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                      Open calculator <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className="my-14">
            <EducationalContentBlock {...homeEducationContent} theme="emerald" />
          </div>

          <section className="my-14 bg-slate-950 rounded-3xl p-10 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-4">
                  <ShieldCheck className="h-4 w-4" />
                  Content Engine
                </div>
                <h2 className="text-3xl font-black mb-4">The platform wins by mixing tools, education, and recurring content.</h2>
                <p className="text-slate-300 leading-relaxed">
                  Instead of publishing disconnected articles, the site now centers on reusable content types
                  that can be expanded cluster by cluster with better internal linking and stronger keyword coverage.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contentTypeBlueprint.map((type) => (
                  <div key={type} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold text-white">{type}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="my-14">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Featured Guides</h2>
                <p className="text-slate-500 mt-1">
                  Practical pages selected across high-traffic, high-CPC, and seasonal clusters.
                </p>
              </div>
              <Link
                href="/guides"
                className="hidden md:flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
              >
                All guides <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGuides.map((guide) => {
                const meta = getGuideMetadata(guide);
                return (
                  <Link key={guide.slug} href={`/${guide.slug}`}>
                    <div className="group p-6 bg-white rounded-2xl border border-border hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pillarPillars(meta.pillar)}`}>
                          {meta.pillar}
                        </span>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                          {meta.contentType}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          {guide.readTime}
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors flex-1">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4">{guide.description}</p>
                      <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold mt-auto">
                        <BookOpen className="h-4 w-4" />
                        Read guide
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="my-14">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-slate-900">Seasonal SEO Playbook</h2>
              <p className="text-slate-500 mt-2">
                Seasonal pages keep the site relevant all year and create natural refresh cycles for search.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {seasonalPlaybook.map((season) => (
                <div key={season.season} className="rounded-2xl border border-border bg-white p-6">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                    <Star className="h-4 w-4" />
                    {season.season}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{season.focus}</p>
                  <ul className="mt-4 space-y-2">
                    {season.pages.map((page) => (
                      <li key={page} className="text-sm text-slate-800 flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        <span>{page}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="my-14">
            <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-2xl mx-auto">
              <FAQAccordion
                items={[
                  {
                    question: "Are these calculators and guides free to use?",
                    answer:
                      "Yes. The calculators and educational pages are free to access and do not require an account.",
                  },
                  {
                    question: "How is the site structured for SEO growth?",
                    answer:
                      "The site is organized around parent hubs, topic clusters, calculators, and supporting guides so related pages can strengthen each other instead of competing randomly.",
                  },
                  {
                    question: "Do the guides follow the same educational format?",
                    answer:
                      "That is the goal. The strongest pages use Problem → Solution → Benefit plus a STAR scenario so each article teaches clearly and proves the advice with a real example.",
                  },
                  {
                    question: "Can I use these estimates when talking to contractors?",
                    answer:
                      "Yes. The calculators are designed to help you benchmark quotes, ask better questions, and understand where material and labor costs are coming from.",
                  },
                  {
                    question: "Why include seasonal pages on a home and garden site?",
                    answer:
                      "Seasonal content captures recurring search demand and gives homeowners timely guidance when they are most likely to act.",
                  },
                ]}
              />
            </div>
          </section>

          <AdPlaceholder />
        </div>

        <TrustSection {...homeTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
