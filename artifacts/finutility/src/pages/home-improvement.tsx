import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { TrustSection } from "@/components/TrustSection";
import { ToolCard } from "@/components/ToolCard";
import { Link } from "wouter";
import { homeImprovementTrustContent } from "@/lib/trustContent";
import { guideArticles } from "@/lib/guides";
import { getGuideMetadata } from "@/lib/contentHub";
import { Hammer, Paintbrush, Home, ChevronRight, Wrench, Clock, BookOpen, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

const CALCULATORS = [
  {
    title: "Roof Cost Calculator",
    desc: "Compare asphalt, metal, tile, and slate costs before calling a contractor.",
    href: "/roof-cost-calculator",
    icon: <Home className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Paint Calculator",
    desc: "Get the exact gallons you need for any room or exterior project.",
    href: "/paint-calculator",
    icon: <Paintbrush className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Home Renovation Budget",
    desc: "Plan realistic renovation costs by room type and scope.",
    href: "/home-renovation-calculator",
    icon: <Hammer className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80&auto=format&fit=crop",
  },
];

const DIY_TIPS = [
  { tip: "Always get 3 contractor quotes", detail: "The range between the lowest and highest quote is typically 30–60% for major projects." },
  { tip: "Permits protect your investment", detail: "Unpermitted work reduces resale value and can void insurance claims. Always verify permit requirements." },
  { tip: "Prep work determines paint quality", detail: "Professional painters spend 60% of their time prepping. Fill holes, clean walls, tape edges — then paint." },
  { tip: "Know when NOT to DIY", detail: "Electrical panels, gas lines, load-bearing walls, and main plumbing lines require licensed professionals." },
];

const MAINTENANCE_CALENDAR = [
  {
    month: "Spring",
    emoji: "🌸",
    tasks: [
      "Inspect roof shingles for winter damage",
      "Clean gutters and downspouts",
      "Test smoke & carbon monoxide detectors",
      "Service HVAC before cooling season",
      "Check caulking around windows & doors",
    ],
  },
  {
    month: "Summer",
    emoji: "☀️",
    tasks: [
      "Inspect deck or patio for rot or loose boards",
      "Trim trees & shrubs away from the house",
      "Clean dryer vent to prevent fire risk",
      "Check attic for proper ventilation",
      "Touch up exterior paint where needed",
    ],
  },
  {
    month: "Fall",
    emoji: "🍂",
    tasks: [
      "Drain and store garden hoses",
      "Service heating system before winter",
      "Seal gaps and cracks in foundation",
      "Clean chimney if you use a fireplace",
      "Insulate exposed pipes in unheated spaces",
    ],
  },
  {
    month: "Winter",
    emoji: "❄️",
    tasks: [
      "Keep cabinet doors open during hard freezes",
      "Check for ice dams on the roof",
      "Reverse ceiling fans to push warm air down",
      "Monitor basement for moisture or leaks",
      "Plan spring projects and get estimates now",
    ],
  },
];

const COST_SAVING_TIPS = [
  { icon: "💡", tip: "Buy materials yourself", detail: "Purchase tile, fixtures, and hardware directly — many contractors add 15–30% markup." },
  { icon: "📅", tip: "Schedule off-season", detail: "Book HVAC and roofing contractors in spring or fall for better pricing and faster availability." },
  { icon: "🔍", tip: "Pull the permit yourself", detail: "As a homeowner you can often pull your own permits, saving contractor overhead fees." },
  { icon: "🧹", tip: "Do the demo yourself", detail: "Demolition and cleanup are tasks most homeowners can do safely, cutting labor costs significantly." },
  { icon: "📝", tip: "Get everything in writing", detail: "A detailed written contract prevents scope creep — the #1 cause of home improvement budget overruns." },
  { icon: "🏦", tip: "Use a HELOC for big projects", detail: "Home equity lines of credit typically offer far lower interest rates than credit cards or personal loans." },
];

const GUIDE_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=80&auto=format&fit=crop",
];

export default function HomeImprovementCategory() {
  const homeGuides = guideArticles.filter((g) => getGuideMetadata(g).pillar === "Home Improvement");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />

      <main className="flex-1">
        {/* ── Photo Hero ───────────────────────────────── */}
        <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=85&auto=format&fit=crop"
            alt="Home improvement project"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Hammer className="h-4 w-4 text-emerald-300" />
                <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Home Improvement</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Plan Smarter. Spend Less.<br /><span className="text-emerald-300">Fix It Right.</span>
              </h1>
              <p className="text-lg text-white/80 mb-7 max-w-xl">
                Every home improvement project starts with a realistic cost estimate. Use our free calculators and expert guides to plan your project before calling a single contractor.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/roof-cost-calculator" className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors shadow">
                  Roof Cost Calculator
                </Link>
                <Link href="/home-renovation-calculator" className="px-6 py-3 rounded-full bg-white/15 border border-white/30 hover:bg-white/25 text-white text-sm font-bold transition-colors">
                  Renovation Budget
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Calculators ──────────────────────────────── */}
          <section className="my-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Plan Your Project</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Free Cost Calculators</h2>
            <p className="text-stone-500 mb-7">Get a realistic cost benchmark before you call a contractor.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CALCULATORS.map((c) => (
                <ToolCard key={c.href} title={c.title} description={c.desc} href={c.href} icon={c.icon} backgroundImage={c.image} />
              ))}
            </div>
          </section>

          {/* ── Seasonal Maintenance Calendar ────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Stay Ahead of Problems</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Annual Home Maintenance Calendar</h2>
            <p className="text-stone-500 mb-8">Preventive maintenance costs a fraction of emergency repairs. Here's what to do and when.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {MAINTENANCE_CALENDAR.map((season) => (
                <div key={season.month} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                  <div className="bg-green-700 text-white px-5 py-3 flex items-center gap-2">
                    <span className="text-xl">{season.emoji}</span>
                    <h3 className="font-bold text-base">{season.month}</h3>
                  </div>
                  <ul className="p-5 space-y-3">
                    {season.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Mistakes to Avoid ────────────────────────── */}
          <section className="my-14 bg-amber-50 rounded-3xl border border-amber-100 p-8 md:p-10">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h2 className="text-xl font-extrabold text-amber-900">4 Costly Mistakes Homeowners Make</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {DIY_TIPS.map((item) => (
                <div key={item.tip} className="flex gap-3 bg-white rounded-xl p-4 border border-amber-100">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-200 text-amber-800 text-xs font-bold flex-shrink-0 mt-0.5">!</div>
                  <div>
                    <p className="font-bold text-amber-900 text-sm">{item.tip}</p>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Cost-Saving Tips ─────────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Work Smarter</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">6 Ways to Save on Home Improvement</h2>
            <p className="text-stone-500 mb-8">Smart homeowners know these tricks before any project starts.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {COST_SAVING_TIPS.map((item) => (
                <div key={item.tip} className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-1">{item.tip}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── DIY vs Pro Banner ────────────────────────── */}
          <section className="my-14 relative rounded-3xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85&auto=format&fit=crop"
              alt="Home renovation tools"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/75 to-transparent" />
            <div className="relative z-10 p-10 md:p-14 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-3">Know Your Limits</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                When to DIY — and When to Call a Pro
              </h2>
              <p className="text-white/80 mb-7 leading-relaxed text-sm">
                DIY saves money on cosmetic work like painting, tiling, and landscaping. But for structural, electrical, or plumbing projects, a licensed contractor protects your safety and home value.
              </p>
              <Link href="/guides" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-green-800 font-bold hover:bg-green-50 transition-colors text-sm">
                Read our guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* ── Guides ───────────────────────────────────── */}
          {homeGuides.length > 0 && (
            <section className="my-14">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Step-by-Step</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">Home Improvement Guides</h2>
                </div>
                <Link href="/guides" className="hidden md:flex items-center gap-1 text-green-700 hover:text-green-800 font-semibold text-sm">
                  All guides <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {homeGuides.map((guide, i) => (
                  <Link key={guide.slug} href={`/${guide.slug}`}>
                    <div className="group bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col h-full">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={GUIDE_IMAGES[i % GUIDE_IMAGES.length]}
                          alt={guide.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                          <div className="flex items-center gap-1 text-xs text-stone-400">
                            <Clock className="h-3 w-3" />
                            {guide.readTime}
                          </div>
                        </div>
                        <h3 className="font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors flex-1">{guide.title}</h3>
                        <p className="text-sm text-stone-500 mb-4 leading-relaxed">{guide.description}</p>
                        <div className="flex items-center gap-1 text-green-700 text-sm font-semibold mt-auto">
                          <BookOpen className="h-4 w-4" />
                          Read Guide <ChevronRight className="h-4 w-4" />
                        </div>
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
