import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { TrustSection } from "@/components/TrustSection";
import { Link } from "wouter";
import { guideArticles } from "@/lib/guides";
import { ChevronRight, Clock, BookOpen, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const CLEANING_SLUGS = [
  "room-by-room-cleaning-schedule",
  "natural-cleaning-solutions-guide",
  "deep-clean-bathroom-step-by-step",
  "declutter-your-home-guide",
  "remove-odors-from-home",
];

const GUIDE_IMAGES = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
];

const QUICK_WINS = [
  { icon: "🫧", tip: "Make beds every morning", impact: "Starts the day with a sense of order and takes under 3 minutes." },
  { icon: "🧽", tip: "Wipe stove after every use", impact: "Prevents baked-on grease that takes 30 minutes to remove later." },
  { icon: "🪣", tip: "Keep one cleaner per room", impact: "Removes the friction that causes you to skip quick touch-ups." },
  { icon: "⏱️", tip: "Set a 10-minute tidy timer", impact: "Most rooms can be reset in 10 minutes. Use a timer to make it a game." },
  { icon: "🧺", tip: "Laundry on a fixed day", impact: "One laundry day per week eliminates the 'mountain' problem entirely." },
  { icon: "🪟", tip: "Wipe sinks after each use", impact: "Prevents soap scum and water spots from building up over time." },
];

const WEEKLY_SCHEDULE = [
  { day: "Monday", room: "Kitchen", tasks: ["Scrub sink", "Degrease stovetop", "Wipe appliance fronts", "Mop floor"] },
  { day: "Tuesday", room: "Bathrooms", tasks: ["Scrub toilets", "Clean mirrors", "Disinfect sink", "Scrub shower/tub"] },
  { day: "Wednesday", room: "Bedrooms", tasks: ["Change sheets", "Dust surfaces", "Vacuum floors", "Clean mirrors"] },
  { day: "Thursday", room: "Living Areas", tasks: ["Dust shelves", "Clean electronics", "Vacuum upholstery", "Wipe windows"] },
  { day: "Friday", room: "All Floors", tasks: ["Vacuum entire home", "Mop hard floors", "Check for missed areas"] },
];

const NATURAL_RECIPES = [
  { name: "All-Purpose Spray", ingredients: "1 cup water + 1 cup white vinegar + 10 drops tea tree oil", use: "Countertops, appliances, sinks" },
  { name: "Glass Cleaner", ingredients: "1 cup water + 1 cup rubbing alcohol + 1 tbsp white vinegar", use: "Mirrors, windows, glass surfaces" },
  { name: "Bathroom Scrub", ingredients: "½ cup baking soda + dish soap to form a paste", use: "Sinks, tubs, tile" },
  { name: "Grout Cleaner", ingredients: "Hydrogen peroxide applied directly, wait 10 min", use: "Grout lines, mold spots" },
  { name: "Oven Cleaner", ingredients: "Baking soda layer + spray with vinegar, let sit 2 hours", use: "Oven interior" },
];

const trustContent = {
  headline: "Real cleaning advice that fits real life.",
  stats: [
    { value: "40%", label: "Less time cleaning with a daily routine vs. reactive cleaning" },
    { value: "$400+", label: "Saved per year switching from commercial to natural cleaners" },
    { value: "2–3 hrs", label: "Average weekly cleaning time with a consistent schedule" },
  ],
};

export default function CleaningPage() {
  const cleaningGuides = guideArticles.filter((g) => CLEANING_SLUGS.includes(g.slug));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />

      <main className="flex-1">
        {/* ── Photo Hero ───────────────────────────────── */}
        <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1600&q=85&auto=format&fit=crop"
            alt="Clean, organized home"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-sky-300" />
                <span className="text-sky-300 text-xs font-bold uppercase tracking-widest">Cleaning & Home Care</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                A Clean Home.<br /><span className="text-sky-300">Without the Overwhelm.</span>
              </h1>
              <p className="text-lg text-white/80 mb-7 max-w-xl">
                Simple, realistic cleaning routines, natural DIY solutions, and room-by-room guides that keep your home consistently clean in 20 minutes a day.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/room-by-room-cleaning-schedule" className="px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold transition-colors shadow">
                  Get the Cleaning Schedule
                </Link>
                <Link href="/natural-cleaning-solutions-guide" className="px-6 py-3 rounded-full bg-white/15 border border-white/30 hover:bg-white/25 text-white text-sm font-bold transition-colors">
                  Natural Cleaning Recipes
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Quick Wins ───────────────────────────────── */}
          <section className="my-12">
            <p className="text-xs font-bold uppercase tracking-widest text-sky-700 mb-1">Start Here</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">6 Daily Habits That Keep Your Home Clean</h2>
            <p className="text-stone-500 mb-8">These micro-habits take under 5 minutes each but prevent hours of deep cleaning later.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {QUICK_WINS.map((item) => (
                <div key={item.tip} className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-1">{item.tip}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.impact}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Weekly Schedule Table ────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-sky-700 mb-1">Your Weekly Plan</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">The Room-by-Room Weekly Cleaning Schedule</h2>
            <p className="text-stone-500 mb-8">Assign one room per day and no single session ever feels overwhelming.</p>
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sky-50 border-b border-sky-100">
                    <tr>
                      <th className="text-left p-4 text-sm font-bold text-sky-900">Day</th>
                      <th className="text-left p-4 text-sm font-bold text-sky-900">Focus Room</th>
                      <th className="text-left p-4 text-sm font-bold text-sky-900">Key Tasks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WEEKLY_SCHEDULE.map((row, i) => (
                      <tr key={row.day} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                        <td className="p-4 font-bold text-stone-900 text-sm">{row.day}</td>
                        <td className="p-4 text-sm">
                          <span className="font-semibold text-sky-700">{row.room}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1.5">
                            {row.tasks.map((task) => (
                              <span key={task} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">{task}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Natural Cleaners ─────────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-sky-700 mb-1">Save Money, Go Natural</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">5 Natural Cleaning Recipes That Replace 20 Products</h2>
            <p className="text-stone-500 mb-8">Make every cleaner you need from white vinegar, baking soda, dish soap, rubbing alcohol, and hydrogen peroxide.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {NATURAL_RECIPES.map((recipe) => (
                <div key={recipe.name} className="bg-sky-50 border border-sky-100 rounded-2xl p-6">
                  <h3 className="font-bold text-sky-900 text-base mb-2">{recipe.name}</h3>
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">Ingredients</p>
                    <p className="text-sm text-stone-700">{recipe.ingredients}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">Best For</p>
                    <p className="text-sm text-stone-600">{recipe.use}</p>
                  </div>
                </div>
              ))}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col justify-center">
                <div className="text-2xl mb-2">⚠️</div>
                <h3 className="font-bold text-amber-900 mb-2">Never Mix These</h3>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Bleach + Vinegar = toxic chlorine gas</li>
                  <li>• Bleach + Ammonia = dangerous gas</li>
                  <li>• H₂O₂ + Vinegar = peracetic acid</li>
                </ul>
              </div>
            </div>
          </section>

          <AdPlaceholder />

          {/* ── Guides ───────────────────────────────────── */}
          {cleaningGuides.length > 0 && (
            <section className="my-14">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-700 mb-1">Deep Dives</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">Cleaning Guides</h2>
                </div>
                <Link href="/guides" className="hidden md:flex items-center gap-1 text-sky-700 hover:text-sky-800 font-semibold text-sm">
                  All guides <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cleaningGuides.map((guide, i) => (
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
                          <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                          <div className="flex items-center gap-1 text-xs text-stone-400">
                            <Clock className="h-3 w-3" />
                            {guide.readTime}
                          </div>
                        </div>
                        <h3 className="font-bold text-stone-900 mb-2 group-hover:text-sky-700 transition-colors flex-1">{guide.title}</h3>
                        <p className="text-sm text-stone-500 mb-4 leading-relaxed">{guide.description}</p>
                        <div className="flex items-center gap-1 text-sky-700 text-sm font-semibold mt-auto">
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

          {/* ── Deep Clean Banner ────────────────────────── */}
          <section className="my-14 relative rounded-3xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85&auto=format&fit=crop"
              alt="Clean bathroom"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-950/90 via-sky-900/75 to-transparent" />
            <div className="relative z-10 p-10 md:p-14 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-300 mb-3">Go Deeper</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                The Complete Bathroom Deep-Clean Checklist
              </h2>
              <p className="text-white/80 mb-7 leading-relaxed text-sm">
                Most bathroom cleaning misses the places that matter most — exhaust fan, grout, caulk, and showerhead. This guide covers every surface, top to bottom.
              </p>
              <Link href="/deep-clean-bathroom-step-by-step" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-sky-800 font-bold hover:bg-sky-50 transition-colors text-sm">
                Read the Full Guide <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* ── Trust Stats ──────────────────────────────── */}
          <section className="my-14 bg-sky-900 text-white rounded-3xl p-8 md:p-12">
            <p className="text-sky-300 text-xs font-bold uppercase tracking-widest mb-3 text-center">By the Numbers</p>
            <h2 className="text-2xl font-extrabold mb-10 text-center">{trustContent.headline}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trustContent.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-black text-sky-300 mb-2">{stat.value}</div>
                  <p className="text-white/80 text-sm leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <AdPlaceholder />
        </div>
      </main>

      <Footer />
    </div>
  );
}
