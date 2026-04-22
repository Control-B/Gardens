import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { TrustSection } from "@/components/TrustSection";
import { ToolCard } from "@/components/ToolCard";
import { Link } from "wouter";
import { gardenTrustContent } from "@/lib/trustContent";
import { guideArticles } from "@/lib/guides";
import { getGuideMetadata } from "@/lib/contentHub";
import { TreeDeciduous, Leaf, Sprout, ChevronRight, Clock, BookOpen, Sun, Droplets, ArrowRight } from "lucide-react";

const CALCULATORS = [
  {
    title: "Garden Planting Calculator",
    desc: "Plan your garden bed layout, plant spacing, soil needs, and setup cost.",
    href: "/garden-planting-calculator",
    icon: <Sprout className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Lawn Care Cost Calculator",
    desc: "Compare professional vs. DIY lawn care and find where you save most.",
    href: "/lawn-care-calculator",
    icon: <Leaf className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=700&q=80&auto=format&fit=crop",
  },
];

const SEASONAL_TIPS = [
  {
    season: "Spring",
    emoji: "🌸",
    color: "bg-pink-50 border-pink-100",
    headerColor: "bg-pink-600",
    tips: [
      "Test soil pH and amend before planting",
      "Start cool-season crops: lettuce, peas, spinach",
      "Apply pre-emergent weed control to empty beds",
      "Divide and transplant perennials",
      "Prune dead growth from winter-dormant plants",
    ],
  },
  {
    season: "Summer",
    emoji: "☀️",
    color: "bg-yellow-50 border-yellow-100",
    headerColor: "bg-yellow-600",
    tips: [
      "Water deeply but less frequently to encourage deep roots",
      "Harvest regularly to encourage continued production",
      "Watch for disease in humid conditions — improve airflow",
      "Mulch beds to retain moisture and suppress weeds",
      "Deadhead flowers to extend blooming season",
    ],
  },
  {
    season: "Fall",
    emoji: "🍂",
    color: "bg-amber-50 border-amber-100",
    headerColor: "bg-amber-600",
    tips: [
      "Plant garlic and spring bulbs before frost",
      "Add compost to beds after clearing spent plants",
      "Overseed lawn for cool-season grass repair",
      "Cut perennials back after first hard frost",
      "Bring in tender bulbs like dahlias before freeze",
    ],
  },
  {
    season: "Winter",
    emoji: "❄️",
    color: "bg-blue-50 border-blue-100",
    headerColor: "bg-blue-600",
    tips: [
      "Plan next year's garden layout and seed orders",
      "Protect perennials with mulch after frost",
      "Clean and sharpen tools to prevent disease spread",
      "Start seeds indoors 6–8 weeks before last frost",
      "Order seed catalogs and plan crop rotation",
    ],
  },
];

const BEGINNER_TIPS = [
  {
    number: "01",
    title: "Start Small",
    desc: "A 4×8 ft raised bed is the perfect starter garden — manageable, productive, and easy to maintain. You can always expand later.",
  },
  {
    number: "02",
    title: "Know Your Soil",
    desc: "Healthy soil is 60% of gardening success. Test your pH (aim for 6.0–7.0 for most vegetables) and add compost generously.",
  },
  {
    number: "03",
    title: "Water at the Base",
    desc: "Water soil, not leaves. Drip irrigation or a soaker hose reduces disease risk and uses 50% less water than overhead watering.",
  },
  {
    number: "04",
    title: "Plant for Your Zone",
    desc: "USDA Hardiness Zones tell you when to plant and what survives your winters. Check your zone before buying any perennial.",
  },
  {
    number: "05",
    title: "Mulch Everything",
    desc: "2–3 inches of mulch suppresses weeds, retains moisture, and regulates soil temperature — it's the single best low-effort habit.",
  },
  {
    number: "06",
    title: "Keep a Garden Journal",
    desc: "Note what you planted, when you planted it, and how it performed. You'll make dramatically better decisions in year two.",
  },
];

const COMPANION_PLANTS = [
  { plant: "Tomatoes", companions: "Basil, Marigolds, Carrots", avoid: "Fennel, Brassicas" },
  { plant: "Peppers", companions: "Basil, Carrots, Spinach", avoid: "Fennel, Brassicas" },
  { plant: "Carrots", companions: "Tomatoes, Lettuce, Rosemary", avoid: "Dill, Parsnips" },
  { plant: "Cucumbers", companions: "Beans, Dill, Sunflowers", avoid: "Potatoes, Sage" },
  { plant: "Lettuce", companions: "Carrots, Radishes, Strawberries", avoid: "Celery" },
  { plant: "Zucchini", companions: "Beans, Nasturtiums, Corn", avoid: "Potatoes" },
];

const GUIDE_IMAGES = [
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80&auto=format&fit=crop",
];

export default function GardenCategory() {
  const gardenGuides = guideArticles.filter((g) => getGuideMetadata(g).pillar === "Garden & Outdoor");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />

      <main className="flex-1">
        {/* ── Photo Hero ───────────────────────────────── */}
        <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=1600&q=85&auto=format&fit=crop"
            alt="Beautiful garden beds"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <TreeDeciduous className="h-4 w-4 text-lime-300" />
                <span className="text-lime-300 text-xs font-bold uppercase tracking-widest">Garden & Outdoor</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Grow More. Waste Less.<br /><span className="text-lime-300">Know Before You Plant.</span>
              </h1>
              <p className="text-lg text-white/80 mb-7 max-w-xl">
                Successful gardens start with the right plan. Use our planting calculators and expert guides to get more from every square foot — whether you're growing food, flowers, or a beautiful lawn.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/garden-planting-calculator" className="px-6 py-3 rounded-full bg-lime-600 hover:bg-lime-700 text-white text-sm font-bold transition-colors shadow">
                  Plan Your Garden
                </Link>
                <Link href="/lawn-care-calculator" className="px-6 py-3 rounded-full bg-white/15 border border-white/30 hover:bg-white/25 text-white text-sm font-bold transition-colors">
                  Lawn Care Costs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Calculators ──────────────────────────────── */}
          <section className="my-12">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Plan Before You Plant</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Garden Calculators</h2>
            <p className="text-stone-500 mb-7">Know costs and spacing before you buy anything.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CALCULATORS.map((c) => (
                <ToolCard key={c.href} title={c.title} description={c.desc} href={c.href} icon={c.icon} backgroundImage={c.image} />
              ))}
            </div>
          </section>

          {/* ── Beginner Tips ────────────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Just Getting Started?</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">6 Essential Tips for New Gardeners</h2>
            <p className="text-stone-500 mb-8">These principles will save you time, money, and frustration in your first season.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {BEGINNER_TIPS.map((tip) => (
                <div key={tip.number} className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm flex gap-4">
                  <div className="text-3xl font-black text-lime-200 leading-none shrink-0">{tip.number}</div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1.5">{tip.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Seasonal Tips ────────────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Year-Round Calendar</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Seasonal Garden Advice</h2>
            <p className="text-stone-500 mb-8">The right task at the right time makes all the difference.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {SEASONAL_TIPS.map((season) => (
                <div key={season.season} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                  <div className={`${season.headerColor} text-white px-5 py-3 flex items-center gap-2`}>
                    <span className="text-xl">{season.emoji}</span>
                    <h3 className="font-bold">{season.season}</h3>
                  </div>
                  <ul className="p-5 space-y-3">
                    {season.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <Leaf className="h-3.5 w-3.5 text-lime-600 mt-0.5 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <AdPlaceholder />

          {/* ── Companion Planting ───────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Grow More Together</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Companion Planting Quick Reference</h2>
            <p className="text-stone-500 mb-8">Certain plants help each other grow — others compete or inhibit. Plan your beds with these combinations in mind.</p>
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-lime-50 border-b border-lime-100">
                    <tr>
                      <th className="text-left p-4 text-sm font-bold text-lime-900">Plant</th>
                      <th className="text-left p-4 text-sm font-bold text-lime-900">
                        <span className="flex items-center gap-1"><Sun className="h-4 w-4 text-green-600" /> Good Companions</span>
                      </th>
                      <th className="text-left p-4 text-sm font-bold text-lime-900">
                        <span className="flex items-center gap-1"><Droplets className="h-4 w-4 text-red-500" /> Avoid Planting Near</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPANION_PLANTS.map((row, i) => (
                      <tr key={row.plant} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                        <td className="p-4 font-bold text-stone-900 text-sm">{row.plant}</td>
                        <td className="p-4 text-sm text-green-700">{row.companions}</td>
                        <td className="p-4 text-sm text-red-600">{row.avoid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Inspiration Banner ───────────────────────── */}
          <section className="my-14 relative rounded-3xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1400&q=85&auto=format&fit=crop"
              alt="Beautiful vegetable garden"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-lime-950/85 via-lime-900/70 to-transparent" />
            <div className="relative z-10 p-10 md:p-14 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-lime-300 mb-3">Ready to Start?</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Build a Raised Garden Bed This Weekend
              </h2>
              <p className="text-white/80 mb-7 leading-relaxed text-sm">
                A raised bed is the fastest path to a productive garden. Better drainage, warmer soil, fewer weeds, and no tilling — it's the beginner's best friend.
              </p>
              <Link href="/how-to-create-a-raised-garden-bed" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-green-800 font-bold hover:bg-green-50 transition-colors text-sm">
                Read the Guide <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* ── Guides ───────────────────────────────────── */}
          {gardenGuides.length > 0 && (
            <section className="my-14">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Learn & Grow</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">Gardening Guides</h2>
                </div>
                <Link href="/guides" className="hidden md:flex items-center gap-1 text-green-700 hover:text-green-800 font-semibold text-sm">
                  All guides <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gardenGuides.map((guide, i) => (
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
                          <span className="text-xs font-semibold text-lime-700 bg-lime-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                          <div className="flex items-center gap-1 text-xs text-stone-400">
                            <Clock className="h-3 w-3" />
                            {guide.readTime}
                          </div>
                        </div>
                        <h3 className="font-bold text-stone-900 mb-2 group-hover:text-lime-700 transition-colors flex-1">{guide.title}</h3>
                        <p className="text-sm text-stone-500 mb-4 leading-relaxed">{guide.description}</p>
                        <div className="flex items-center gap-1 text-lime-700 text-sm font-semibold mt-auto">
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

        <TrustSection {...gardenTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
