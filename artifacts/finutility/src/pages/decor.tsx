import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Link } from "wouter";
import { guideArticles } from "@/lib/guides";
import { ChevronRight, Clock, BookOpen, Sofa, ArrowRight, Star } from "lucide-react";

const DECOR_SLUGS = [
  "small-bedroom-storage-ideas",
  "pantry-organization-guide",
  "living-room-refresh-guide",
  "apartment-decor-upgrades",
  "declutter-your-home-guide",
];

const GUIDE_IMAGES = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop",
];

const ROOM_REFRESH_IDEAS = [
  {
    room: "Living Room",
    emoji: "🛋️",
    budget: "Under $300",
    ideas: [
      "Add a large area rug to anchor the seating area",
      "Swap to warm LED bulbs (2700K) for instant coziness",
      "Add a throw blanket and 2–3 new accent pillows",
      "Create a gallery wall with framed prints",
      "Bring in one large statement plant",
    ],
  },
  {
    room: "Bedroom",
    emoji: "🛏️",
    budget: "Under $200",
    ideas: [
      "New bedding set with a duvet and matching shams",
      "Install floating shelves above the headboard",
      "Replace dated light fixture or add a lamp",
      "Add blackout curtains for better sleep",
      "Use under-bed storage bins with bed risers",
    ],
  },
  {
    room: "Kitchen",
    emoji: "🍳",
    budget: "Under $150",
    ideas: [
      "Add peel-and-stick backsplash behind the stove",
      "Replace cabinet hardware (handles and pulls)",
      "Add open shelving for cookbooks and plants",
      "Hang a pot rack to free up cabinet space",
      "Use a pretty dish rack or tray to organize the counter",
    ],
  },
  {
    room: "Bathroom",
    emoji: "🚿",
    budget: "Under $100",
    ideas: [
      "Replace the toilet seat and towel bars",
      "Add a bamboo bath mat and coordinating towels",
      "Swap the shower curtain for a clean white one",
      "Add a small plant (snake plant thrives in humidity)",
      "Organize the vanity with a pretty tray and dispensers",
    ],
  },
];

const STORAGE_HACKS = [
  { hack: "Vertical space is wasted in almost every room", tip: "Add shelves above doorways, behind doors, and above appliances — these areas add 30–50% more storage in most rooms." },
  { hack: "Drawer dividers double usable drawer capacity", tip: "Unorganized drawers hold half what a divided drawer holds. $10–$20 in bamboo dividers transforms kitchen, bathroom, and bedroom drawers." },
  { hack: "Decanting messy packaging saves space and stress", tip: "Flour, pasta, oats, and cereals in matching airtight containers fit 30% better in cabinets and pantries." },
  { hack: "Hooks are the most underused storage tool", tip: "Command hooks, pegboards, and rail systems turn blank walls into functional storage for everything from keys to kitchen tools." },
  { hack: "Multi-function furniture doubles value", tip: "Storage ottomans, beds with drawers, and benches with cubbies do the work of two pieces of furniture in the space of one." },
  { hack: "Clear containers = you use what you have", tip: "If you can't see it, you won't use it — and you'll buy duplicates. Clear bins and containers in pantries, fridges, and closets reduce waste and duplicate purchases." },
];

const RENTER_TIPS = [
  { tip: "Removable wallpaper", detail: "Peel-and-stick wallpaper creates an accent wall that removes cleanly. Brands like Tempaper and Spoonflower offer designer prints." },
  { tip: "Command strip hanging", detail: "Modern command strips hold up to 16 lbs — enough for gallery walls, mirrors, and lightweight shelves without a single nail hole." },
  { tip: "Tension rod curtains", detail: "Spring-loaded tension rods fit most windows without drilling. Hang real curtain panels for light control and a finished look." },
  { tip: "Plug-in pendant lights", detail: "Replace harsh overhead fixtures with plug-in pendants. They hang from the existing ceiling hook and plug into a wall outlet." },
  { tip: "Area rugs over carpet", detail: "Layer a patterned rug over neutral carpet to add color and define spaces. It photographs beautifully and lifts the whole room." },
];

export default function DecorPage() {
  const decorGuides = guideArticles.filter((g) => DECOR_SLUGS.includes(g.slug));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />

      <main className="flex-1">
        {/* ── Photo Hero ───────────────────────────────── */}
        <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85&auto=format&fit=crop"
            alt="Beautiful living room decor"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sofa className="h-4 w-4 text-violet-300" />
                <span className="text-violet-300 text-xs font-bold uppercase tracking-widest">Decor & Organization</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                A Home That Feels<br /><span className="text-violet-300">Organized and Beautiful.</span>
              </h1>
              <p className="text-lg text-white/80 mb-7 max-w-xl">
                Room refresh ideas, smart storage solutions, and organization systems that work for real life — whether you own or rent.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/living-room-refresh-guide" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition-colors shadow">
                  Living Room Refresh
                </Link>
                <Link href="/declutter-your-home-guide" className="px-6 py-3 rounded-full bg-white/15 border border-white/30 hover:bg-white/25 text-white text-sm font-bold transition-colors">
                  Declutter Your Home
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Room Refresh by Budget ───────────────────── */}
          <section className="my-12">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-1">Every Budget Welcome</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Room-by-Room Refresh Ideas</h2>
            <p className="text-stone-500 mb-8">The highest-impact changes in each room — organized by budget.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ROOM_REFRESH_IDEAS.map((room) => (
                <div key={room.room} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                  <div className="bg-violet-700 text-white px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{room.emoji}</span>
                      <h3 className="font-bold text-base">{room.room}</h3>
                    </div>
                    <span className="text-xs font-bold bg-white/15 px-3 py-1 rounded-full">{room.budget}</span>
                  </div>
                  <ul className="p-5 space-y-3">
                    {room.ideas.map((idea) => (
                      <li key={idea} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <Star className="h-3.5 w-3.5 text-violet-400 mt-0.5 shrink-0" />
                        {idea}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Storage Hacks ────────────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-1">Think Smarter</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">6 Storage Principles That Change Everything</h2>
            <p className="text-stone-500 mb-8">Most homes don't have a storage problem — they have a storage strategy problem.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {STORAGE_HACKS.map((item) => (
                <div key={item.hack} className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                  <h3 className="font-bold text-stone-900 mb-2 text-sm">{item.hack}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.tip}</p>
                </div>
              ))}
            </div>
          </section>

          <AdPlaceholder />

          {/* ── Renter Tips ──────────────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-1">No Drilling Required</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">Renter-Friendly Upgrades That Protect Your Deposit</h2>
            <p className="text-stone-500 mb-8">Fully reversible improvements that transform a rental without leaving a mark.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {RENTER_TIPS.map((item) => (
                <div key={item.tip} className="bg-violet-50 border border-violet-100 rounded-2xl p-6">
                  <h3 className="font-bold text-violet-900 mb-2">{item.tip}</h3>
                  <p className="text-sm text-violet-800/80 leading-relaxed">{item.detail}</p>
                </div>
              ))}
              <Link href="/apartment-decor-upgrades">
                <div className="bg-stone-900 text-white rounded-2xl p-6 flex flex-col justify-between h-full cursor-pointer hover:bg-stone-800 transition-colors">
                  <p className="text-sm text-white/70 leading-relaxed">Get the complete guide to decorating your rental beautifully without risking your security deposit.</p>
                  <div className="flex items-center gap-2 text-violet-300 font-bold text-sm mt-4">
                    Read the full guide <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* ── Guides ───────────────────────────────────── */}
          {decorGuides.length > 0 && (
            <section className="my-14">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-1">Go Deeper</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">Decor & Organization Guides</h2>
                </div>
                <Link href="/guides" className="hidden md:flex items-center gap-1 text-violet-700 hover:text-violet-800 font-semibold text-sm">
                  All guides <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {decorGuides.map((guide, i) => (
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
                          <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full">{guide.category}</span>
                          <div className="flex items-center gap-1 text-xs text-stone-400">
                            <Clock className="h-3 w-3" />
                            {guide.readTime}
                          </div>
                        </div>
                        <h3 className="font-bold text-stone-900 mb-2 group-hover:text-violet-700 transition-colors flex-1">{guide.title}</h3>
                        <p className="text-sm text-stone-500 mb-4 leading-relaxed">{guide.description}</p>
                        <div className="flex items-center gap-1 text-violet-700 text-sm font-semibold mt-auto">
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
      </main>

      <Footer />
    </div>
  );
}
