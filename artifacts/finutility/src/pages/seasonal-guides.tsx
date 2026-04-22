import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Link } from "wouter";
import { guideArticles } from "@/lib/guides";
import { ChevronRight, Clock, BookOpen, Sun } from "lucide-react";

const SEASONS = [
  {
    name: "Spring",
    emoji: "🌸",
    color: "from-pink-800/75 to-rose-950/85",
    bg: "bg-rose-50",
    border: "border-rose-100",
    accent: "text-rose-700",
    badge: "bg-rose-100 text-rose-800",
    image: "https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=1200&q=85&auto=format&fit=crop",
    tagline: "Restart, refresh, and replant",
    focus: "Garden prep, spring cleaning, roof inspection after winter, lawn revival, and window washing.",
    checklist: [
      "Test your soil pH before planting anything",
      "Inspect the roof for winter damage — look for lifted or missing shingles",
      "Service your lawn mower and edge trimmer before first use",
      "Deep-clean the kitchen and bathrooms after winter months indoors",
      "Clear gutters of winter debris",
      "Start seeds indoors 6–8 weeks before last frost date",
      "Pressure wash the driveway, patio, and siding",
      "Inspect exterior caulking and weatherstripping around doors and windows",
    ],
    articles: ["how-to-prepare-garden-for-spring", "spring-garden-checklist", "room-by-room-cleaning-schedule", "deep-clean-bathroom-step-by-step"],
  },
  {
    name: "Summer",
    emoji: "☀️",
    color: "from-orange-700/75 to-amber-950/85",
    bg: "bg-amber-50",
    border: "border-amber-100",
    accent: "text-amber-700",
    badge: "bg-amber-100 text-amber-800",
    image: "https://images.unsplash.com/photo-1467685790346-20bfe73a81f0?w=1200&q=85&auto=format&fit=crop",
    tagline: "Grow, entertain, and maintain",
    focus: "Lawn care, irrigation, patio upgrades, outdoor painting, and garden harvesting.",
    checklist: [
      "Water deeply 2–3 times per week instead of shallow daily watering",
      "Mulch garden beds 2–3 inches to retain moisture and suppress weeds",
      "Set up the patio for summer entertaining (rug, lighting, shade)",
      "Check your HVAC filter — summer is peak AC season",
      "Paint exterior surfaces when temps are 50–90°F and humidity is low",
      "Harvest vegetables regularly to encourage continued production",
      "Inspect and repair fence posts before fall storms",
      "Apply lawn fertilizer after the hottest weeks",
    ],
    articles: ["summer-lawn-care-calendar", "how-to-save-on-lawn-care-costs", "patio-upgrade-ideas-budget", "outdoor-lighting-guide"],
  },
  {
    name: "Fall",
    emoji: "🍂",
    color: "from-amber-800/75 to-stone-950/85",
    bg: "bg-stone-50",
    border: "border-stone-200",
    accent: "text-stone-700",
    badge: "bg-stone-200 text-stone-800",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=85&auto=format&fit=crop",
    tagline: "Protect, declutter, and prepare",
    focus: "Winterization, garden cleanup, interior projects, decluttering, and heating prep.",
    checklist: [
      "Plant spring bulbs (tulips, daffodils, crocuses) before first frost",
      "Cut perennials back to 2–3 inches to protect crowns",
      "Drain and store garden hoses and outdoor irrigation",
      "Have the furnace serviced before you need it",
      "Declutter and donate before the holiday season",
      "Caulk and weatherstrip doors and windows for winter energy savings",
      "Clear leaves from gutters before winter rains",
      "Aerate and overseed the lawn for spring green-up",
    ],
    articles: ["declutter-your-home-guide", "how-to-winterize-your-home", "how-to-lower-your-electric-bill-at-home", "mulch-vs-gravel-for-landscaping"],
  },
  {
    name: "Winter",
    emoji: "❄️",
    color: "from-blue-800/75 to-slate-950/85",
    bg: "bg-sky-50",
    border: "border-sky-100",
    accent: "text-sky-700",
    badge: "bg-sky-100 text-sky-800",
    image: "https://images.unsplash.com/photo-1518945756765-f8641d60aa75?w=1200&q=85&auto=format&fit=crop",
    tagline: "Plan, repair, and stay cozy",
    focus: "Indoor repairs, energy savings, next-season planning, and organization.",
    checklist: [
      "Plan your spring garden while seed catalogs are available",
      "Research renovation projects for spring — get contractor quotes in winter for better pricing",
      "Lower the water heater temperature to 120°F to save energy",
      "Reverse ceiling fans to clockwise to push warm air down",
      "Patch any drywall cracks or paint touch-ups while you're indoors",
      "Organize closets and pantry before the new year",
      "Check smoke and CO2 detectors and replace batteries",
      "Insulate any exposed pipes in unheated spaces",
    ],
    articles: ["how-to-patch-drywall-holes", "pantry-organization-guide", "small-bedroom-storage-ideas", "natural-cleaning-solutions-guide"],
  },
];

export default function SeasonalGuidesPage() {
  const articlesBySlug = Object.fromEntries(guideArticles.map((g) => [g.slug, g]));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1467685790346-20bfe73a81f0?w=1600&q=85&auto=format&fit=crop"
            alt="Four seasons of home and garden"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="h-4 w-4 text-amber-300" />
                <span className="text-amber-300 text-xs font-bold uppercase tracking-widest">Year-Round Guidance</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Seasonal Home &<br /><span className="text-amber-300">Garden Guides</span>
              </h1>
              <p className="text-lg text-white/80 mb-6 max-w-xl">
                The right advice at the right time of year. Every season brings different priorities — follow these checklists to stay ahead.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Season Cards ──────────────────────────────── */}
          {SEASONS.map((season, si) => {
            const articles = season.articles.map((s) => articlesBySlug[s]).filter(Boolean);
            return (
              <section key={season.name} className="my-14">
                {/* Season header */}
                <div className="relative rounded-3xl overflow-hidden mb-8 h-56">
                  <img
                    src={season.image}
                    alt={season.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${season.color}`} />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{season.emoji}</span>
                      <span className="text-white/80 text-xs font-bold uppercase tracking-widest">{season.tagline}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-1">{season.name} Home & Garden</h2>
                    <p className="text-white/75 text-sm max-w-lg">{season.focus}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Checklist */}
                  <div className={`${season.bg} border ${season.border} rounded-2xl p-6`}>
                    <h3 className={`font-extrabold text-lg mb-5 ${season.accent}`}>{season.name} Priority Checklist</h3>
                    <ul className="space-y-3">
                      {season.checklist.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-stone-700">
                          <span className={`font-bold text-lg leading-none mt-0.5 ${season.accent}`}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related articles */}
                  <div className="space-y-4">
                    <h3 className={`font-extrabold text-lg mb-5 ${season.accent}`}>{season.name} Guides</h3>
                    {articles.length > 0 ? articles.map((article, ai) => (
                      <Link key={article.slug} href={`/${article.slug}`}>
                        <div className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-md transition-all flex gap-0 cursor-pointer">
                          <div className="w-28 h-24 shrink-0 overflow-hidden">
                            <img
                              src={[
                                "https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=300&q=80&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&q=80&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80&auto=format&fit=crop",
                              ][ai % 4]}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-4 flex flex-col justify-center flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${season.badge}`}>{season.name}</span>
                              <span className="flex items-center gap-1 text-xs text-stone-400">
                                <Clock className="h-3 w-3" />{article.readTime}
                              </span>
                            </div>
                            <h4 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-green-700 transition-colors">{article.title}</h4>
                          </div>
                        </div>
                      </Link>
                    )) : (
                      <div className="bg-white border border-stone-100 rounded-2xl p-6 text-center text-stone-400 text-sm">
                        More {season.name} guides coming soon.
                      </div>
                    )}
                    <Link href="/guides">
                      <div className={`${season.bg} border ${season.border} rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:shadow-sm transition-all`}>
                        <span className={`text-sm font-bold ${season.accent}`}>Browse all {season.name} guides</span>
                        <ChevronRight className={`h-4 w-4 ${season.accent}`} />
                      </div>
                    </Link>
                  </div>
                </div>

                {si < SEASONS.length - 1 && <div className="mt-14 border-b border-stone-100" />}
              </section>
            );
          })}

          <AdPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  );
}
