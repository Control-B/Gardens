import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { TrustSection } from "@/components/TrustSection";
import { ToolCard } from "@/components/ToolCard";
import { Link } from "wouter";
import { exteriorTrustContent } from "@/lib/trustContent";
import { guideArticles } from "@/lib/guides";
import { getGuideMetadata } from "@/lib/contentHub";
import { Home, Fence, Paintbrush, ChevronRight, Clock, BookOpen, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";

const CALCULATORS = [
  {
    title: "Roof Cost Calculator",
    desc: "Compare materials and get a benchmark before any contractor quote.",
    href: "/roof-cost-calculator",
    icon: <Home className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Fence Cost Calculator",
    desc: "Estimate fence materials and labor for 8 different fence types.",
    href: "/fence-cost-calculator",
    icon: <Fence className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1594064935734-30e55f835a93?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Paint Calculator",
    desc: "Calculate paint gallons needed for exterior or interior walls.",
    href: "/paint-calculator",
    icon: <Paintbrush className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80&auto=format&fit=crop",
  },
];

const ROI_DATA = [
  { project: "New Garage Door", roi: "93–102%", cost: "$3,800–$4,500", note: "Highest ROI exterior project", emoji: "🏆" },
  { project: "Entry Door (Steel)", roi: "88–100%", cost: "$2,000–$3,200", note: "Strong ROI, major curb appeal impact", emoji: "🚪" },
  { project: "Exterior Paint", roi: "51–200%", cost: "$1,500–$4,000", note: "Highest variance — depends on condition", emoji: "🎨" },
  { project: "New Siding (Fiber Cement)", roi: "68–86%", cost: "$15,000–$25,000", note: "Durable 30–50 year lifespan", emoji: "🏠" },
  { project: "Deck Addition (Wood)", roi: "65–75%", cost: "$14,000–$22,000", note: "Adds usable living space", emoji: "🌿" },
  { project: "Roof Replacement", roi: "60–68%", cost: "$10,000–$25,000", note: "Essential for home value and inspection", emoji: "☁️" },
];

const CURB_APPEAL_TIPS = [
  {
    category: "Under $500",
    color: "bg-green-50 border-green-100",
    badge: "bg-green-100 text-green-800",
    tips: [
      "Paint the front door a bold, contrasting color",
      "Replace house numbers with modern brushed metal ones",
      "Add window boxes with seasonal flowers",
      "Install solar path lights along the walkway",
      "Power-wash the driveway and front walkway",
    ],
  },
  {
    category: "$500–$2,000",
    color: "bg-blue-50 border-blue-100",
    badge: "bg-blue-100 text-blue-800",
    tips: [
      "Plant a defined foundation border with shrubs",
      "Install a new mailbox and post",
      "Add shutters to windows that lack them",
      "Replace old exterior light fixtures",
      "Add a flagstone or paver path to the front door",
    ],
  },
  {
    category: "$2,000–$10,000",
    color: "bg-amber-50 border-amber-100",
    badge: "bg-amber-100 text-amber-800",
    tips: [
      "Replace old, weathered exterior doors",
      "Install new garage door with insulation",
      "Paint the entire exterior of the house",
      "Add a covered front porch or entry portico",
      "Install new fencing along the front of the property",
    ],
  },
];

const CONTRACTOR_CHECKLIST = [
  "Verify license number with your state contractor board",
  "Confirm they carry general liability AND workers' comp insurance",
  "Get at least 3 written bids for any project over $1,000",
  "Ask for 3 local references — and actually call them",
  "Never pay more than 30% upfront before work begins",
  "Get all work details, timelines, and warranties in writing",
  "Confirm who pulls the permits (it should be the contractor)",
  "Make sure final payment is tied to your approval, not a date",
];

const GUIDE_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594064935734-30e55f835a93?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80&auto=format&fit=crop",
];

export default function ExteriorCategory() {
  const exteriorGuides = guideArticles.filter((g) => getGuideMetadata(g).pillar === "Exterior & Curb Appeal");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />

      <main className="flex-1">
        {/* ── Photo Hero ───────────────────────────────── */}
        <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=85&auto=format&fit=crop"
            alt="Beautiful home exterior"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Home className="h-4 w-4 text-amber-300" />
                <span className="text-amber-300 text-xs font-bold uppercase tracking-widest">Exterior & Curb Appeal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                The Upgrades That<br /><span className="text-amber-300">Actually Pay You Back.</span>
              </h1>
              <p className="text-lg text-white/80 mb-7 max-w-xl">
                Roofing, fencing, and exterior painting consistently deliver the highest ROI of any home improvement. Use our calculators to plan the project and protect your investment.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/roof-cost-calculator" className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold transition-colors shadow">
                  Roof Cost Calculator
                </Link>
                <Link href="/fence-cost-calculator" className="px-6 py-3 rounded-full bg-white/15 border border-white/30 hover:bg-white/25 text-white text-sm font-bold transition-colors">
                  Fence Cost Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Calculators ──────────────────────────────── */}
          <section className="my-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Get the Numbers Right</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Exterior Cost Calculators</h2>
            <p className="text-stone-500 mb-7">Know the real cost before calling a contractor.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CALCULATORS.map((c) => (
                <ToolCard key={c.href} title={c.title} description={c.desc} href={c.href} icon={c.icon} backgroundImage={c.image} />
              ))}
            </div>
          </section>

          {/* ── ROI Table ────────────────────────────────── */}
          <section className="my-14">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <p className="text-xs font-bold uppercase tracking-widest text-green-700">Maximize Resale Value</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Exterior Projects by ROI at Resale</h2>
            <p className="text-stone-400 mb-7 text-sm">Source: Remodeling Magazine Cost vs. Value Report (2025 national averages)</p>
            <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-amber-50 border-b border-amber-100">
                    <tr>
                      <th className="text-left p-4 text-sm font-bold text-amber-900"></th>
                      <th className="text-left p-4 text-sm font-bold text-amber-900">Project</th>
                      <th className="text-right p-4 text-sm font-bold text-amber-900">Typical Cost</th>
                      <th className="text-right p-4 text-sm font-bold text-amber-900">ROI at Resale</th>
                      <th className="hidden md:table-cell p-4 text-sm font-medium text-amber-700 text-left">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROI_DATA.map((row, i) => (
                      <tr key={row.project} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                        <td className="p-4 text-xl">{row.emoji}</td>
                        <td className="p-4 font-semibold text-stone-900 text-sm">{row.project}</td>
                        <td className="p-4 text-right text-stone-600 text-sm">{row.cost}</td>
                        <td className="p-4 text-right">
                          <span className="font-black text-emerald-700 text-sm">{row.roi}</span>
                        </td>
                        <td className="hidden md:table-cell p-4 text-xs text-stone-400">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Curb Appeal by Budget ────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Every Budget Welcome</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Curb Appeal Projects by Budget</h2>
            <p className="text-stone-500 mb-8">You don't need a huge budget to dramatically improve your home's first impression.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CURB_APPEAL_TIPS.map((tier) => (
                <div key={tier.category} className={`rounded-2xl border p-6 ${tier.color}`}>
                  <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${tier.badge}`}>
                    {tier.category}
                  </div>
                  <ul className="space-y-3">
                    {tier.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Contractor Checklist ─────────────────────── */}
          <section className="my-14 bg-stone-900 text-white rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-3">Before You Sign Anything</p>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                  The Homeowner's Contractor Checklist
                </h2>
                <p className="text-white/70 leading-relaxed text-sm">
                  Most homeowners only learn these lessons the hard way. Run through this list before hiring any contractor for any exterior project.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {CONTRACTOR_CHECKLIST.map((item, i) => (
                  <div key={item} className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-white/85 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Guides ───────────────────────────────────── */}
          {exteriorGuides.length > 0 && (
            <section className="my-14">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Go Deeper</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">Exterior Project Guides</h2>
                </div>
                <Link href="/guides" className="hidden md:flex items-center gap-1 text-green-700 hover:text-green-800 font-semibold text-sm">
                  All guides <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exteriorGuides.map((guide, i) => (
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
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                          <div className="flex items-center gap-1 text-xs text-stone-400">
                            <Clock className="h-3 w-3" />
                            {guide.readTime}
                          </div>
                        </div>
                        <h3 className="font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors flex-1">{guide.title}</h3>
                        <p className="text-sm text-stone-500 mb-4 leading-relaxed">{guide.description}</p>
                        <div className="flex items-center gap-1 text-amber-700 text-sm font-semibold mt-auto">
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

          {/* ── Banner ───────────────────────────────────── */}
          <section className="my-14 relative rounded-3xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1605276373954-0240a31ba65f?w=1400&q=85&auto=format&fit=crop"
              alt="Beautiful home with curb appeal"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-950/90 via-amber-900/75 to-transparent" />
            <div className="relative z-10 p-10 md:p-14 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-3">Know Your Numbers</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                What Does a New Roof Actually Cost?
              </h2>
              <p className="text-white/80 mb-7 leading-relaxed text-sm">
                Roofing costs vary wildly by material, slope, and region. Our calculator gives you a real benchmark so you know if a quote is fair.
              </p>
              <Link href="/roof-cost-calculator" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-amber-800 font-bold hover:bg-amber-50 transition-colors text-sm">
                Try the Roof Calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <AdPlaceholder />
        </div>

        <TrustSection {...exteriorTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
