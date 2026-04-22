import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Link } from "wouter";
import { ArrowRight, Calculator, Fence, Hammer, Home, Leaf, Paintbrush, TreeDeciduous, CheckCircle } from "lucide-react";

const CALCULATORS = [
  {
    title: "Roof Cost Calculator",
    description: "Estimate roof replacement cost by size, material, and pitch before comparing contractor quotes. Covers asphalt, metal, tile, and slate.",
    href: "/roof-cost-calculator",
    icon: <Home className="h-6 w-6" />,
    color: "bg-amber-50 border-amber-200 text-amber-700",
    accent: "bg-amber-600",
    tag: "Exterior",
    saves: "Avoid overpaying by $2,000–$8,000",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Paint Calculator",
    description: "Calculate exactly how many gallons you need per room, including waste factor, number of coats, and trim coverage. Stop buying too much or too little.",
    href: "/paint-calculator",
    icon: <Paintbrush className="h-6 w-6" />,
    color: "bg-sky-50 border-sky-200 text-sky-700",
    accent: "bg-sky-600",
    tag: "Home Improvement",
    saves: "Save $40–$120 per room on paint waste",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Lawn Care Cost Calculator",
    description: "Compare DIY vs. professional lawn care across all four seasons. See where seasonal savings appear and where it makes sense to hire.",
    href: "/lawn-care-calculator",
    icon: <Leaf className="h-6 w-6" />,
    color: "bg-lime-50 border-lime-200 text-lime-700",
    accent: "bg-lime-600",
    tag: "Garden",
    saves: "Identify $300–$600/yr savings opportunities",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Fence Cost Calculator",
    description: "Estimate total fencing cost by material, linear footage, gates, and post count. Benchmark contractor quotes before you pick up the phone.",
    href: "/fence-cost-calculator",
    icon: <Fence className="h-6 w-6" />,
    color: "bg-orange-50 border-orange-200 text-orange-700",
    accent: "bg-orange-600",
    tag: "Exterior",
    saves: "Benchmark quotes within 10–15% accuracy",
    image: "https://images.unsplash.com/photo-1594064935734-30e55f835a93?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Garden Planting Calculator",
    description: "Plan garden bed spacing, soil volume requirements, and seed quantities. Get a planting grid for any bed size and crop combination.",
    href: "/garden-planting-calculator",
    icon: <TreeDeciduous className="h-6 w-6" />,
    color: "bg-green-50 border-green-200 text-green-700",
    accent: "bg-green-600",
    tag: "Garden",
    saves: "Reduce replanting waste by 30–40%",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Home Renovation Budget",
    description: "Model a realistic renovation budget with room type, scope, contingency percentage, and finishes tier. Know what your project should cost before you start.",
    href: "/home-renovation-calculator",
    icon: <Hammer className="h-6 w-6" />,
    color: "bg-violet-50 border-violet-200 text-violet-700",
    accent: "bg-violet-600",
    tag: "Home Improvement",
    saves: "Avoid scope creep and budget overruns",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
  },
];

const HOW_THEY_HELP = [
  { icon: "📊", title: "Benchmark contractor quotes", desc: "Know the fair price range before the first contractor walks through your door." },
  { icon: "🔍", title: "Find the scope that fits your budget", desc: "Adjust materials, size, and labor assumptions until the estimate fits what you can spend." },
  { icon: "🏠", title: "Plan before you commit", desc: "Model different scenarios — different materials, different rooms, different seasons — before spending anything." },
  { icon: "💬", title: "Ask better questions", desc: "Arrive at contractor meetings knowing what each line item should cost and where to push back." },
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=85&auto=format&fit=crop"
            alt="Home renovation planning"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="h-4 w-4 text-green-300" />
                <span className="text-green-300 text-xs font-bold uppercase tracking-widest">Free Tools</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Free Cost Calculators<br /><span className="text-green-300">for Every Home Project.</span>
              </h1>
              <p className="text-lg text-white/80 mb-6 max-w-xl">
                Know what your project should cost before you get the first contractor quote. All calculators run in your browser — no sign-up required.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── How They Help ──────────────────────────── */}
          <section className="my-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {HOW_THEY_HELP.map((item) => (
                <div key={item.title} className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Calculator Grid ────────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">All Tools</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-8">Choose Your Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CALCULATORS.map((calc) => (
                <Link key={calc.href} href={calc.href}>
                  <div className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={calc.image}
                        alt={calc.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-bold bg-white/90 text-stone-700 px-3 py-1 rounded-full">{calc.tag}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className={`inline-flex items-center gap-2 text-sm font-bold mb-3 ${calc.color.split(" ")[2]}`}>
                        {calc.icon}
                        <h3 className="font-bold text-stone-900 group-hover:text-green-700 transition-colors">{calc.title}</h3>
                      </div>
                      <p className="text-sm text-stone-500 leading-relaxed mb-4 flex-1">{calc.description}</p>
                      <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-xl p-3 mb-4">
                        <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-green-800 font-medium">{calc.saves}</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-700 text-sm font-bold">
                        Open Calculator <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Trust Callout ──────────────────────────── */}
          <section className="my-14 bg-stone-900 text-white rounded-3xl p-10 md:p-14">
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-3xl mb-4">🔒</div>
              <h2 className="text-2xl font-extrabold mb-3">Privacy-First Calculators</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Every calculation runs entirely in your browser. We don't collect, store, or transmit any numbers you enter. No sign-up required, no ads triggered by your input.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                {[
                  { v: "100%", l: "Browser-based" },
                  { v: "Free", l: "Always, no sign-up" },
                  { v: "6", l: "Calculators available" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-3xl font-black text-green-400 mb-1">{s.v}</div>
                    <p className="text-white/60 text-xs">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <AdPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  );
}
