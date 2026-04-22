import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Link } from "wouter";
import { ChevronRight, DollarSign, Clock, ArrowRight } from "lucide-react";

const TIERS = [
  {
    label: "Under $100",
    emoji: "💚",
    color: "bg-lime-50 border-lime-200",
    accent: "text-lime-700",
    badge: "bg-lime-100 text-lime-800",
    headerBg: "bg-lime-700",
    projects: [
      { name: "Repaint a Room Accent Wall", time: "Weekend", impact: "High visual impact, instantly transforms a space", href: "/how-to-paint-a-room-like-a-pro" },
      { name: "Patch Drywall Holes", time: "2–3 hours", impact: "Fixes eyesores and prevents moisture damage", href: "/how-to-patch-drywall-holes" },
      { name: "Fix a Leaking Faucet", time: "30 minutes", impact: "Saves $150+ in plumber fees and $20+/mo on water", href: "/how-to-fix-a-leaking-faucet" },
      { name: "Natural Cleaning Kit", time: "1 hour", impact: "Replace $600/yr in commercial cleaners with $40/yr of ingredients", href: "/natural-cleaning-solutions-guide" },
      { name: "Declutter One Room", time: "Half day", impact: "Reduces cleaning time by 40%, reduces stress", href: "/declutter-your-home-guide" },
      { name: "Patio Power Wash", time: "2–3 hours", impact: "Makes a patio look new without any products", href: "/patio-upgrade-ideas-budget" },
      { name: "Solar Path Lights", time: "30 minutes", impact: "Adds safety and evening ambiance with zero wiring", href: "/outdoor-lighting-guide" },
    ],
  },
  {
    label: "$100–$500",
    emoji: "💛",
    color: "bg-amber-50 border-amber-200",
    accent: "text-amber-700",
    badge: "bg-amber-100 text-amber-800",
    headerBg: "bg-amber-600",
    projects: [
      { name: "Living Room Refresh", time: "Weekend", impact: "New rug, lighting, and pillows transform the entire feel of the room", href: "/living-room-refresh-guide" },
      { name: "Outdoor Rug + String Lights", time: "2 hours", impact: "Turns an ignored patio into an outdoor room", href: "/patio-upgrade-ideas-budget" },
      { name: "Pantry Organization", time: "Half day", impact: "Saves $800+/yr in wasted food and duplicate purchases", href: "/pantry-organization-guide" },
      { name: "Raised Garden Bed Setup", time: "Weekend", impact: "Fresh vegetables all season from a 4×8 ft plot", href: "/how-to-create-a-raised-garden-bed" },
      { name: "Bedroom Storage Upgrade", time: "Weekend", impact: "Doubles storage without new furniture using under-bed and vertical space", href: "/small-bedroom-storage-ideas" },
      { name: "Backyard Privacy Screens", time: "Half day", impact: "Creates visual privacy without permits or permanent installation", href: "/backyard-privacy-ideas" },
      { name: "Spring Garden Prep", time: "Full day", impact: "Increases garden yield 25–40% and reduces replanting cost", href: "/how-to-prepare-garden-for-spring" },
    ],
  },
  {
    label: "$500–$2,000",
    emoji: "🧡",
    color: "bg-orange-50 border-orange-200",
    accent: "text-orange-700",
    badge: "bg-orange-100 text-orange-800",
    headerBg: "bg-orange-600",
    projects: [
      { name: "Patio Pergola Kit", time: "Weekend", impact: "Defines outdoor living space, provides shade and structure", href: "/patio-upgrade-ideas-budget" },
      { name: "Privacy Tree Row", time: "One day planting", impact: "Creates permanent natural privacy screen within 2–3 seasons", href: "/backyard-privacy-ideas" },
      { name: "Full Outdoor Lighting System", time: "Weekend", impact: "Low-voltage system transforms yard appearance and safety", href: "/outdoor-lighting-guide" },
      { name: "DIY Fence Section", time: "Weekend", impact: "Defines property, increases privacy and curb appeal", href: "/diy-fence-installation-guide" },
      { name: "Lawn Care Annual Plan", time: "Ongoing seasonal", impact: "Saves $300–$600/yr vs. professional service", href: "/how-to-save-on-lawn-care-costs" },
      { name: "Exterior Paint Touch-Up", time: "2–3 days", impact: "Protects siding and dramatically improves curb appeal", href: "/how-to-paint-a-room-like-a-pro" },
    ],
  },
  {
    label: "$2,000+",
    emoji: "💙",
    color: "bg-sky-50 border-sky-200",
    accent: "text-sky-700",
    badge: "bg-sky-100 text-sky-800",
    headerBg: "bg-sky-700",
    projects: [
      { name: "Kitchen Update (No Remodel)", time: "1–2 weeks", impact: "New hardware, paint, open shelving, and backsplash tile refreshes without major demo", href: "/kitchen-remodel-cost-guide" },
      { name: "Bathroom Renovation", time: "2–3 weeks", impact: "75–80% ROI at resale; most impactful single-room upgrade", href: "/bathroom-renovation-cost-guide" },
      { name: "Patio + Family Backyard", time: "2–4 weeks", impact: "Creates outdoor living space equivalent to 400+ sq ft of indoor space", href: "/family-friendly-backyard-setup" },
      { name: "Full Roof Replacement", time: "1–3 days", impact: "50+ year protection with metal; prevents $10k+ water damage risk", href: "/how-to-choose-roof-material" },
      { name: "Home Weatherization", time: "1–2 weeks", impact: "Reduces heating/cooling costs 15–25% annually", href: "/how-to-lower-your-electric-bill-at-home" },
      { name: "Landscaping Overhaul", time: "2–4 weeks", impact: "105% ROI according to remodeling industry data", href: "/mulch-vs-gravel-for-landscaping" },
    ],
  },
];

const TIPS = [
  { tip: "Shop in fall and winter for spring materials", detail: "Lumber, pavers, and plants are often 20–40% cheaper in off-season months." },
  { tip: "Get three quotes for any project over $500", detail: "The spread between the highest and lowest quote averages 35–40%. Never accept the first quote." },
  { tip: "Buy materials directly, not through the contractor", detail: "Contractors mark up materials 20–50%. Buy at a home improvement store and provide them yourself for large material orders." },
  { tip: "Do your own demo work", detail: "Demolition labor is $40–$75/hr. If you do the teardown yourself on a bathroom or kitchen, you can save $400–$1,200." },
  { tip: "Stage projects across seasons for maximum savings", detail: "Exterior painting in fall, landscaping in spring, and indoor projects in winter each hit peak contractor availability and lower pricing." },
];

export default function BudgetProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=85&auto=format&fit=crop"
            alt="Budget home projects"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="h-4 w-4 text-green-300" />
                <span className="text-green-300 text-xs font-bold uppercase tracking-widest">Smart Spending</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Budget Projects<br /><span className="text-green-300">For Every Price Point</span>
              </h1>
              <p className="text-lg text-white/80 mb-6 max-w-xl">
                From free weekend fixes to significant renovations — the best home and garden projects organized by what you can spend right now.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Budget Tiers ──────────────────────────── */}
          {TIERS.map((tier, ti) => (
            <section key={tier.label} className="my-14">
              <div className={`${tier.headerBg} text-white rounded-2xl px-6 py-4 flex items-center justify-between mb-6`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tier.emoji}</span>
                  <h2 className="text-xl font-extrabold">{tier.label} Projects</h2>
                </div>
                <span className="text-white/70 text-sm">{tier.projects.length} ideas</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tier.projects.map((project) => (
                  <Link key={project.href} href={project.href}>
                    <div className={`group border rounded-2xl p-5 ${tier.color} hover:shadow-md transition-all cursor-pointer h-full flex flex-col`}>
                      <h3 className={`font-bold mb-2 group-hover:underline ${tier.accent}`}>{project.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-3.5 w-3.5 text-stone-400" />
                        <span className="text-xs text-stone-500">{project.time}</span>
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed flex-1">{project.impact}</p>
                      <div className={`flex items-center gap-1 text-xs font-bold mt-3 ${tier.accent}`}>
                        Read the guide <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <AdPlaceholder />

          {/* ── Money-Saving Tips ─────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Save More</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-8">5 Ways to Cut Project Costs Without Cutting Quality</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TIPS.map((item, i) => (
                <div key={item.tip} className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-black shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">{item.tip}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Calculator CTA ────────────────────────── */}
          <section className="my-14 bg-stone-900 text-white rounded-3xl p-10 md:p-14 text-center">
            <div className="text-3xl mb-4">🧮</div>
            <h2 className="text-2xl font-extrabold mb-3">Know the Real Cost Before You Start</h2>
            <p className="text-white/70 max-w-lg mx-auto text-sm leading-relaxed mb-8">
              Our free calculators give you an accurate cost range for roofing, painting, renovation, fencing, and garden projects before you talk to a single contractor.
            </p>
            <Link href="/calculators" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold transition-colors">
              Open Free Calculators <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <AdPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  );
}
