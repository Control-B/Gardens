import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { EducationalContentBlock } from "@/components/EducationalContentBlock";
import { TrustSection } from "@/components/TrustSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { homeEducationContent } from "@/lib/educationContent";
import { homeTrustContent } from "@/lib/trustContent";
import { guideArticles } from "@/lib/guides";
import {
  Search, Home, Paintbrush, TreeDeciduous, Fence, Hammer, Leaf,
  ChevronRight, Clock, BookOpen, Star, ShieldCheck, Zap
} from "lucide-react";

const CALCULATORS = [
  {
    title: "Roof Cost Calculator",
    description: "Estimate roof replacement cost by material — asphalt, metal, tile, or slate. Know if your quote is fair.",
    href: "/roof-cost-calculator",
    icon: <Home className="h-6 w-6" />,
    badge: "High Value",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    title: "Paint Calculator",
    description: "Get the exact gallons you need for any room. No guessing, no wasted trips, no mismatched batches.",
    href: "/paint-calculator",
    icon: <Paintbrush className="h-6 w-6" />,
    badge: "Quick Save",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    title: "Lawn Care Cost Calculator",
    description: "Compare professional vs. DIY lawn care costs and find where you can save $800+ per year.",
    href: "/lawn-care-calculator",
    icon: <Leaf className="h-6 w-6" />,
    badge: "Most Popular",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Fence Cost Calculator",
    description: "Compare wood, vinyl, chain link, and aluminum fence costs before talking to contractors.",
    href: "/fence-cost-calculator",
    icon: <Fence className="h-6 w-6" />,
    badge: null,
    badgeColor: "",
  },
  {
    title: "Garden Planting Calculator",
    description: "Plan your garden bed layout, calculate soil volume, and estimate total setup cost.",
    href: "/garden-planting-calculator",
    icon: <TreeDeciduous className="h-6 w-6" />,
    badge: null,
    badgeColor: "",
  },
  {
    title: "Home Renovation Budget",
    description: "Build a realistic renovation budget by room type with a proper contingency — before calling a contractor.",
    href: "/home-renovation-calculator",
    icon: <Hammer className="h-6 w-6" />,
    badge: "Essential",
    badgeColor: "bg-purple-100 text-purple-800",
  },
];

const CATEGORIES = [
  {
    title: "Home Improvement",
    description: "Roofing, painting, repairs, and renovation budgets. Know costs before committing.",
    href: "/home-improvement",
    color: "from-emerald-600 to-emerald-800",
    icon: <Hammer className="h-8 w-8" />,
    tools: ["Roof Cost Calculator", "Paint Calculator", "Renovation Budget"],
  },
  {
    title: "Gardening",
    description: "Planting layouts, lawn care costs, and seasonal guidance for every growing season.",
    href: "/garden",
    color: "from-lime-600 to-lime-800",
    icon: <TreeDeciduous className="h-8 w-8" />,
    tools: ["Planting Calculator", "Lawn Care Cost", "Seasonal Guides"],
  },
  {
    title: "Exterior & Curb Appeal",
    description: "Fencing, roofing, and exterior projects with the highest resale ROI.",
    href: "/exterior",
    color: "from-amber-600 to-amber-800",
    icon: <Home className="h-8 w-8" />,
    tools: ["Fence Calculator", "Roof Calculator", "ROI Analysis"],
  },
];

const TRUST_STATS = [
  { stat: "6", label: "Free calculators", icon: <Zap className="h-5 w-5" /> },
  { stat: "10+", label: "Expert guides", icon: <BookOpen className="h-5 w-5" /> },
  { stat: "$0", label: "Cost to use — always", icon: <ShieldCheck className="h-5 w-5" /> },
  { stat: "No account", label: "required, ever", icon: <Star className="h-5 w-5" /> },
];

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const intent = parseNaturalLanguage(query);
    if (intent) {
      setLocation(`${intent.calculator}?${new URLSearchParams(intent.params).toString()}`);
    }
  };

  const featuredGuides = guideArticles.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-32 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />

          {/* Decorative circles */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl z-0" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-lime-500/10 rounded-full blur-3xl z-0" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-8">
                <Leaf className="h-4 w-4" />
                Free Home & Garden Tools — No Account Required
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
                Smart Home & Garden<br />
                <span className="text-emerald-400">Tools + Expert Guides</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Free cost calculators and practical guides for every home improvement and garden project. Know what things cost before you commit. Make better decisions. Save real money.
              </p>

              {/* NL Search */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20 mb-8">
                <Search className="absolute left-6 h-5 w-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="e.g. roof cost for 2000 sq ft, fence 150 linear feet, kitchen renovation..."
                  className="h-14 pl-14 pr-40 text-base rounded-xl bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" className="absolute right-2 h-11 rounded-xl px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                  Calculate
                </Button>
              </form>

              <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-400">
                <span>Try:</span>
                {[
                  "roof cost for 2000 sq ft",
                  "fence 150 linear feet wood",
                  "paint calculator 3 rooms",
                  "kitchen remodel cost",
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

        {/* Trust Stats Strip */}
        <section className="bg-emerald-950 text-white border-b border-emerald-900/50">
          <div className="container mx-auto px-4 md:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TRUST_STATS.map((item) => (
                <div key={item.stat} className="flex items-center gap-3">
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

          {/* Featured Calculators */}
          <section className="my-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Free Cost Calculators</h2>
                <p className="text-slate-500 mt-1">Know the real cost before calling a single contractor</p>
              </div>
              <Link href="/home-improvement" className="hidden md:flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                All tools <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CALCULATORS.map((calc) => (
                <Link key={calc.href} href={calc.href}>
                  <div className="group p-6 bg-white rounded-2xl border border-border hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer h-full">
                    {calc.badge && (
                      <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-3 ${calc.badgeColor}`}>
                        {calc.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                        {calc.icon}
                      </div>
                      <h3 className="font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{calc.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{calc.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                      Open Calculator <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="my-14">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Explore by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATEGORIES.map((cat) => (
                <Link key={cat.href} href={cat.href}>
                  <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.color} text-white p-8 cursor-pointer hover:scale-[1.02] transition-transform h-full`}>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="relative z-10">
                      <div className="mb-4 opacity-90">{cat.icon}</div>
                      <h3 className="text-xl font-black mb-2">{cat.title}</h3>
                      <p className="text-sm opacity-80 mb-4 leading-relaxed">{cat.description}</p>
                      <ul className="space-y-1 mb-6">
                        {cat.tools.map((tool) => (
                          <li key={tool} className="text-xs opacity-70 flex items-center gap-2">
                            <span className="w-1 h-1 bg-white rounded-full" />
                            {tool}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-1 text-sm font-bold opacity-90 group-hover:opacity-100">
                        Explore {cat.title} <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <AdPlaceholder />

          {/* Educational Block */}
          <div className="my-14">
            <EducationalContentBlock {...homeEducationContent} theme="emerald" />
          </div>

          {/* How It Works */}
          <section className="my-14">
            <h2 className="text-3xl font-black text-slate-900 text-center mb-12">How Gardens Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Search or Browse",
                  detail: "Type your project into the search bar or browse calculators and guides by category. Find the tool that matches your exact need.",
                  color: "bg-emerald-100 text-emerald-700",
                },
                {
                  step: "2",
                  title: "Get a Real Estimate",
                  detail: "Enter your dimensions and project details. Our calculators use real material and labor data to give you a benchmark you can actually use.",
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  step: "3",
                  title: "Make a Confident Decision",
                  detail: "Use the estimate to evaluate contractor quotes, plan your budget, or decide if DIY makes sense — with our guide explaining every step.",
                  color: "bg-amber-100 text-amber-700",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${item.color} text-3xl font-black mb-4`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Guides */}
          <section className="my-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Popular Guides</h2>
                <p className="text-slate-500 mt-1">Problem → Solution → Benefit with real-world STAR scenarios</p>
              </div>
              <Link href="/guides" className="hidden md:flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                All guides <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredGuides.map((guide) => (
                <Link key={guide.slug} href={`/${guide.slug}`}>
                  <div className="group p-6 bg-white rounded-2xl border border-border hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        {guide.readTime}
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors flex-1">{guide.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{guide.description}</p>
                    <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold mt-auto">
                      <BookOpen className="h-4 w-4" />
                      Read Guide
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Learn Before You Spend */}
          <section className="my-14 bg-emerald-950 rounded-3xl p-10 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-4">
                  <Leaf className="h-4 w-4" />
                  Learn Before You Spend
                </div>
                <h2 className="text-3xl font-black mb-4">The right estimate changes the conversation with every contractor.</h2>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Homeowners who enter contractor conversations with an accurate benchmark are far less likely to overpay, miss important details, or hire the wrong person for the job.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/guides" className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors">
                    Browse All Guides
                  </Link>
                  <Link href="/roof-cost-calculator" className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-bold transition-colors">
                    Start Calculating
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Common Mistakes", detail: "Avoid the errors that turn $500 jobs into $3,000 problems." },
                  { title: "Pro Recommendations", detail: "Tools, materials, and methods that professionals actually use." },
                  { title: "Real Cost Ranges", detail: "National averages with regional context so you know when a quote is off." },
                  { title: "STAR Scenarios", detail: "Real-world examples showing how homeowners saved thousands." },
                ].map((item) => (
                  <div key={item.title} className="p-4 bg-emerald-900/50 rounded-xl border border-emerald-700/30">
                    <p className="font-bold text-white text-sm mb-1">{item.title}</p>
                    <p className="text-emerald-300 text-xs">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="my-14">
            <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-2xl mx-auto">
              <FAQAccordion items={[
                { question: "Are these calculators free to use?", answer: "Yes, completely free, always. No account required. All calculations happen in your browser — we don't store your project data." },
                { question: "How accurate are the cost estimates?", answer: "Our estimates are based on national average material and labor costs. Regional variation can be significant — labor in major metro areas often runs 30–50% higher than the national average shown. Always get 3 local contractor quotes for projects over $2,000." },
                { question: "Can I use these estimates for contractor negotiations?", answer: "Absolutely — that's the primary purpose. Knowing the realistic cost range for a project lets you identify overpriced quotes and ask better questions about what's included." },
                { question: "Do I need professional help for major home projects?", answer: "Yes. For electrical, structural, gas, and permitted work, always use licensed professionals. Our guides clearly indicate which projects require professional involvement and which are safely DIY-able." },
                { question: "How do I estimate my roof area?", answer: "Measure your home's footprint (length × width). For a single-story home, that's your approximate roof area. Steeper roofs have more actual surface area — our calculator accounts for pitch with a multiplier." },
              ]} />
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
