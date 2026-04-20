import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { EducationalContentBlock } from "@/components/EducationalContentBlock";
import { TrustSection } from "@/components/TrustSection";
import { ToolCard } from "@/components/ToolCard";
import { Link } from "wouter";
import { exteriorEducationContent } from "@/lib/educationContent";
import { exteriorTrustContent } from "@/lib/trustContent";
import { guideArticles } from "@/lib/guides";
import { Home, Fence, Paintbrush, ChevronRight, Clock, BookOpen, TrendingUp } from "lucide-react";

const CALCULATORS = [
  { title: "Roof Cost Calculator", desc: "Compare materials and get a benchmark before any contractor quote.", href: "/roof-cost-calculator", icon: <Home className="h-6 w-6" /> },
  { title: "Fence Cost Calculator", desc: "Estimate fence materials and labor for 8 different fence types.", href: "/fence-cost-calculator", icon: <Fence className="h-6 w-6" /> },
  { title: "Paint Calculator", desc: "Calculate paint gallons needed for exterior or interior walls.", href: "/paint-calculator", icon: <Paintbrush className="h-6 w-6" /> },
];

const ROI_DATA = [
  { project: "New Garage Door", roi: "93–102%", cost: "$3,800–$4,500", note: "Highest ROI exterior project" },
  { project: "Entry Door (Steel)", roi: "88–100%", cost: "$2,000–$3,200", note: "Strong ROI, major curb appeal impact" },
  { project: "Exterior Paint", roi: "51–200%", cost: "$1,500–$4,000", note: "Highest variance — depends on condition" },
  { project: "New Siding (Fiber Cement)", roi: "68–86%", cost: "$15,000–$25,000", note: "Durable 30–50 year lifespan" },
  { project: "Deck Addition (Wood)", roi: "65–75%", cost: "$14,000–$22,000", note: "Adds usable living space" },
  { project: "Roof Replacement", roi: "60–68%", cost: "$10,000–$25,000", note: "Essential for home value and inspection" },
];

export default function ExteriorCategory() {
  const exteriorGuides = guideArticles.filter((g) =>
    ["Roofing", "Fencing"].includes(g.category)
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-24 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950 to-slate-900 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Exterior & Curb Appeal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                The Exterior Upgrades<br />That Actually<br /><span className="text-amber-400">Pay You Back.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Roofing, fencing, and exterior painting consistently deliver the highest ROI of any home improvement. Use our calculators to plan the project and protect your investment.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/roof-cost-calculator" className="px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors">
                  Roof Cost Calculator
                </Link>
                <Link href="/fence-cost-calculator" className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-semibold transition-colors">
                  Fence Cost Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
          <AdPlaceholder />

          <section className="my-12">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Exterior Cost Calculators</h2>
            <p className="text-slate-500 mb-6">Know the real cost before calling a contractor.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CALCULATORS.map((c) => (
                <ToolCard key={c.href} title={c.title} description={c.desc} href={c.href} icon={c.icon} />
              ))}
            </div>
          </section>

          {/* ROI Table */}
          <section className="my-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-black text-slate-900">Exterior Projects by ROI at Resale</h2>
            </div>
            <p className="text-slate-500 mb-6 text-sm">Source: Remodeling Magazine Cost vs. Value Report (2025 national averages)</p>
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left p-4 text-sm font-bold text-slate-700">Project</th>
                      <th className="text-right p-4 text-sm font-bold text-slate-700">Typical Cost</th>
                      <th className="text-right p-4 text-sm font-bold text-slate-700">ROI at Resale</th>
                      <th className="hidden md:table-cell p-4 text-sm font-medium text-slate-500">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROI_DATA.map((row, i) => (
                      <tr key={row.project} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="p-4 font-semibold text-slate-900 text-sm">{row.project}</td>
                        <td className="p-4 text-right text-slate-700 text-sm">{row.cost}</td>
                        <td className="p-4 text-right">
                          <span className="font-black text-emerald-700 text-sm">{row.roi}</span>
                        </td>
                        <td className="hidden md:table-cell p-4 text-xs text-slate-500">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <div className="my-12">
            <EducationalContentBlock {...exteriorEducationContent} theme="emerald" />
          </div>

          {exteriorGuides.length > 0 && (
            <section className="my-12">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Exterior Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exteriorGuides.map((guide) => (
                  <Link key={guide.slug} href={`/${guide.slug}`}>
                    <div className="group p-6 bg-white rounded-2xl border border-border hover:border-amber-300 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          {guide.readTime}
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">{guide.title}</h3>
                      <p className="text-sm text-slate-500 mb-4">{guide.description}</p>
                      <div className="flex items-center gap-1 text-amber-600 text-sm font-semibold">
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

        <TrustSection {...exteriorTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
