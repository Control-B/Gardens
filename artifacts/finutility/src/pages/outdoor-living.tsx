import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Link } from "wouter";
import { guideArticles } from "@/lib/guides";
import { ChevronRight, Clock, BookOpen, Sun, ArrowRight, CheckCircle } from "lucide-react";

const OUTDOOR_SLUGS = [
  "patio-upgrade-ideas-budget",
  "backyard-privacy-ideas",
  "outdoor-lighting-guide",
  "family-friendly-backyard-setup",
];

const GUIDE_IMAGES = [
  "https://images.unsplash.com/photo-1605276373954-0240a31ba65f?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80&auto=format&fit=crop",
];

const PATIO_UPGRADES = [
  { budget: "Under $50", emoji: "💡", items: ["Power-wash the concrete", "Rearrange furniture into a conversation circle", "Add potted plants or hanging baskets", "Solar stake lights along the border"] },
  { budget: "Under $200", emoji: "🌟", items: ["Outdoor rug to anchor the seating area", "String lights strung between posts", "Weather-resistant throw pillows", "Shade sail for sun protection"] },
  { budget: "Under $500", emoji: "🏆", items: ["Pergola kit for structure and shade", "Privacy screen panels for seclusion", "Outdoor curtains between posts", "Concrete stain or paint for the floor"] },
];

const BACKYARD_ZONES = [
  { zone: "Dining & Entertaining", icon: "🍽️", desc: "Adjacent to the back door on a hard surface. Needs shade, weatherproof lighting, and sightlines to the play area. Minimum 10×12 feet for a 6-person table." },
  { zone: "Play Area", icon: "🛝", desc: "Clearly defined with soft ground cover (rubber mulch or wood chips) under equipment. Visible from the dining zone for safety supervision." },
  { zone: "Garden Zone", icon: "🌱", desc: "Even a single 4×8 raised bed in the sunniest spot adds food, seasonal interest, and teaching opportunities for children." },
  { zone: "Relaxation Corner", icon: "🪑", desc: "A hammock, bench, or reading chair in a shaded corner. This zone is skipped most but becomes the most used once it exists." },
];

const LIGHTING_TYPES = [
  { type: "String Lights", best: "Ambient mood over dining areas", cost: "$25–$60", tip: "Use warm white (2200K) for the coziest restaurant-patio feel." },
  { type: "Solar Path Lights", best: "Walkways and garden borders", cost: "$15–$40", tip: "Install in groups — single lights look random. Clusters look designed." },
  { type: "Uplights / Spotlights", best: "Accenting trees and architecture", cost: "$15–$40/each", tip: "Aim one spotlight up through a tree for instant luxury landscaping." },
  { type: "Post Lanterns", best: "Entry gates and patio corners", cost: "$30–$80/each", tip: "Solar versions require no wiring and provide all-night illumination." },
  { type: "Step Lights", best: "Deck steps and raised platforms", cost: "$10–$25/each", tip: "Built-in step lights prevent trips and create a polished, professional look." },
  { type: "Under-Rail LED Strip", best: "Deck and pergola skirting", cost: "$20–$60", tip: "Creates a floating, dramatic effect and lights the ground without glare." },
];

const PRIVACY_OPTIONS = [
  { method: "Arborvitae Trees", timeline: "2–3 seasons for full coverage", cost: "$40–$80/tree", notes: "Plant 5–6 feet apart. Grows 3–5 ft/year. Year-round privacy." },
  { method: "Privacy Screen Panels", timeline: "Immediate", cost: "$30–$80/panel", notes: "Freestanding or fence-mounted. Bamboo, wood slat, or metal options." },
  { method: "Clumping Bamboo", timeline: "1–2 seasons", cost: "$30–$60/plant", notes: "Use clumping variety only. Fast-growing, tropical look." },
  { method: "Climbing Vines on Trellis", timeline: "One growing season", cost: "$20–$50", notes: "Clematis, jasmine, or climbing roses on a simple trellis section." },
  { method: "Shade Sail", timeline: "Same day", cost: "$60–$150", notes: "Blocks elevated views from second-floor windows next door." },
];

export default function OutdoorLivingPage() {
  const outdoorGuides = guideArticles.filter((g) => OUTDOOR_SLUGS.includes(g.slug));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />

      <main className="flex-1">
        {/* ── Photo Hero ───────────────────────────────── */}
        <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1605276373954-0240a31ba65f?w=1600&q=85&auto=format&fit=crop"
            alt="Beautiful outdoor living space"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="h-4 w-4 text-orange-300" />
                <span className="text-orange-300 text-xs font-bold uppercase tracking-widest">Outdoor Living</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Make Your Backyard<br /><span className="text-orange-300">Your Favorite Room.</span>
              </h1>
              <p className="text-lg text-white/80 mb-7 max-w-xl">
                Patio upgrades, privacy solutions, lighting guides, and backyard design ideas that transform outdoor spaces into places you actually want to be.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/patio-upgrade-ideas-budget" className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-colors shadow">
                  Patio Upgrade Ideas
                </Link>
                <Link href="/backyard-privacy-ideas" className="px-6 py-3 rounded-full bg-white/15 border border-white/30 hover:bg-white/25 text-white text-sm font-bold transition-colors">
                  Privacy Solutions
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Patio Upgrades by Budget ─────────────────── */}
          <section className="my-12">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-1">Every Budget Welcome</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Patio Upgrades That Deliver Maximum Impact</h2>
            <p className="text-stone-500 mb-8">A tired patio can become your favorite outdoor room with the right changes at any budget level.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PATIO_UPGRADES.map((tier) => (
                <div key={tier.budget} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                  <div className="bg-orange-600 text-white px-5 py-4 flex items-center justify-between">
                    <span className="font-bold text-base">{tier.budget}</span>
                    <span className="text-xl">{tier.emoji}</span>
                  </div>
                  <ul className="p-5 space-y-3">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Backyard Zones ───────────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-1">Plan Your Space</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">The 4 Zones Every Great Backyard Needs</h2>
            <p className="text-stone-500 mb-8">Without defined zones, backyards become catch-all spaces where nothing works well. Zone planning transforms how you use the space.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {BACKYARD_ZONES.map((zone) => (
                <div key={zone.zone} className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm flex gap-4">
                  <div className="text-3xl shrink-0">{zone.icon}</div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-2">{zone.zone}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{zone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AdPlaceholder />

          {/* ── Privacy Options Table ────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-1">Create Your Retreat</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Backyard Privacy Options Compared</h2>
            <p className="text-stone-500 mb-8">A full privacy fence costs $3,000–$12,000. These alternatives cost a fraction of that — and many look better.</p>
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-orange-50 border-b border-orange-100">
                    <tr>
                      <th className="text-left p-4 text-sm font-bold text-orange-900">Method</th>
                      <th className="text-left p-4 text-sm font-bold text-orange-900">Timeline</th>
                      <th className="text-left p-4 text-sm font-bold text-orange-900">Cost</th>
                      <th className="hidden md:table-cell text-left p-4 text-sm font-bold text-orange-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRIVACY_OPTIONS.map((row, i) => (
                      <tr key={row.method} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                        <td className="p-4 font-semibold text-stone-900 text-sm">{row.method}</td>
                        <td className="p-4 text-sm text-stone-600">{row.timeline}</td>
                        <td className="p-4 text-sm font-bold text-orange-700">{row.cost}</td>
                        <td className="hidden md:table-cell p-4 text-xs text-stone-400">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Lighting Guide ───────────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-1">After Dark Matters</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Outdoor Lighting Types — What to Use Where</h2>
            <p className="text-stone-500 mb-8">Great outdoor spaces are usable after sunset. Layer these three types of lighting for maximum effect and atmosphere.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {LIGHTING_TYPES.map((item) => (
                <div key={item.type} className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                  <h3 className="font-bold text-stone-900 mb-1">{item.type}</h3>
                  <p className="text-xs font-semibold text-orange-700 mb-2">{item.cost}</p>
                  <p className="text-sm text-stone-500 mb-3"><strong className="text-stone-700">Best for:</strong> {item.best}</p>
                  <p className="text-xs text-stone-400 leading-relaxed border-t border-stone-100 pt-3">{item.tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Guides ───────────────────────────────────── */}
          {outdoorGuides.length > 0 && (
            <section className="my-14">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-1">Go Deeper</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">Outdoor Living Guides</h2>
                </div>
                <Link href="/guides" className="hidden md:flex items-center gap-1 text-orange-700 hover:text-orange-800 font-semibold text-sm">
                  All guides <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {outdoorGuides.map((guide, i) => (
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
                          <span className="text-xs font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                          <div className="flex items-center gap-1 text-xs text-stone-400">
                            <Clock className="h-3 w-3" />
                            {guide.readTime}
                          </div>
                        </div>
                        <h3 className="font-bold text-stone-900 mb-2 group-hover:text-orange-700 transition-colors flex-1">{guide.title}</h3>
                        <p className="text-sm text-stone-500 mb-4 leading-relaxed">{guide.description}</p>
                        <div className="flex items-center gap-1 text-orange-700 text-sm font-semibold mt-auto">
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

          {/* ── Inspiration Banner ───────────────────────── */}
          <section className="my-14 relative rounded-3xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1400&q=85&auto=format&fit=crop"
              alt="Beautiful backyard with patio"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/70 to-transparent" />
            <div className="relative z-10 p-10 md:p-14 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-300 mb-3">Your Best Summer</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Build a Family-Friendly Backyard From Scratch
              </h2>
              <p className="text-white/80 mb-7 leading-relaxed text-sm">
                A practical blueprint for designing a backyard with zones for play, dining, gardening, and relaxation — on almost any budget.
              </p>
              <Link href="/family-friendly-backyard-setup" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-orange-800 font-bold hover:bg-orange-50 transition-colors text-sm">
                Read the Guide <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <AdPlaceholder />
        </div>
      </main>

      <Footer />
    </div>
  );
}
