import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, Maximize2 } from "lucide-react";

const ROOM_SOLUTIONS = [
  {
    room: "Small Kitchen",
    emoji: "🍳",
    problem: "No counter space, crowded cabinets, no room to cook comfortably.",
    color: "bg-amber-50 border-amber-200",
    accent: "text-amber-700",
    solutions: [
      "Add a rolling kitchen island or butcher block cart — it wheels away when not needed",
      "Hang a pot rack from the ceiling or wall to free up 2–3 full cabinets",
      "Install a magnetic knife strip instead of a knife block (saves 6 inches of counter)",
      "Use the top of the fridge for rarely-used appliances or a wicker basket for onions/potatoes",
      "Mount a fold-down wall table for prep or a tiny dining surface when counter space is tight",
      "Add a tension rod under the sink to hang spray bottles — doubles under-sink storage",
      "Store pots nested with their lids stacked separately in a narrow lid rack",
    ],
    guides: ["/pantry-organization-guide", "/declutter-your-home-guide"],
    guideLabels: ["Pantry Organization Guide", "Declutter Your Home Guide"],
  },
  {
    room: "Small Bedroom",
    emoji: "🛏️",
    problem: "Feels cluttered, no storage, no place for anything.",
    color: "bg-violet-50 border-violet-200",
    accent: "text-violet-700",
    solutions: [
      "Bed risers add 4–6 inches of under-bed storage — enough for seasonal clothing and extra bedding",
      "Floating shelves above the headboard replace nightstands and add vertical storage",
      "Double hang rods in the closet double hanging capacity for shirts and folded pants",
      "Over-door organizers on every closet door hold shoes, accessories, and small items",
      "A storage ottoman at the foot of the bed replaces a bench and holds extra bedding",
      "Use vacuum storage bags for seasonal clothing — compress down to ¼ their original size",
      "Replace a large dresser with a PAX-style wardrobe tower for 3× the storage in the same footprint",
    ],
    guides: ["/small-bedroom-storage-ideas", "/declutter-your-home-guide"],
    guideLabels: ["Small Bedroom Storage Solutions", "Declutter Your Home in a Weekend"],
  },
  {
    room: "Small Bathroom",
    emoji: "🚿",
    problem: "Nowhere to put anything, always feels cramped.",
    color: "bg-sky-50 border-sky-200",
    accent: "text-sky-700",
    solutions: [
      "A ladder shelf beside the toilet adds 4 shelves of towel and product storage with no wall work",
      "Magnetic strips on the inside of cabinet doors hold bobby pins, tweezers, and small tools",
      "A shower caddy that hooks over the shower arm (no drilling) adds tiered product storage",
      "Use a corner shelf in the shower — tension rods in corners hold these with no drilling",
      "A small floating shelf above the toilet keeps toilet paper, candles, and plants off the floor",
      "Over-door hooks on the back of the bathroom door hold robes, towels, and hair tools",
      "Decant bulky product bottles into uniform pump dispensers — saves 40% of the counter space",
    ],
    guides: ["/deep-clean-bathroom-step-by-step", "/natural-cleaning-solutions-guide"],
    guideLabels: ["Bathroom Deep-Clean Checklist", "Natural Cleaning Solutions"],
  },
  {
    room: "Small Living Room",
    emoji: "🛋️",
    problem: "Feels busy, nowhere to put things, nothing flows properly.",
    color: "bg-emerald-50 border-emerald-200",
    accent: "text-emerald-700",
    solutions: [
      "Float the sofa 12–18 inches from the wall — counterintuitively, this makes the room feel larger",
      "A single large area rug defines the zone and makes the space feel intentional",
      "Use a storage coffee table or ottoman with lift-top storage instead of a solid wood table",
      "Mirrors on the wall opposite a window make a small room feel twice as wide",
      "Choose furniture with legs — sofas and chairs on legs let light pass beneath and open the visual field",
      "Tall bookshelves draw the eye upward and create storage without using floor space",
      "Limit the color palette to 3 — a busy room feels small partly because of visual noise",
    ],
    guides: ["/living-room-refresh-guide", "/apartment-decor-upgrades"],
    guideLabels: ["Budget Living Room Refresh", "Renter-Friendly Decor Upgrades"],
  },
  {
    room: "Small Outdoor Space",
    emoji: "🌿",
    problem: "A tiny balcony or patio that feels pointless to use.",
    color: "bg-lime-50 border-lime-200",
    accent: "text-lime-700",
    solutions: [
      "A bistro table and two chairs is all you need to create a functional outdoor dining spot",
      "Vertical wall planters or a tiered plant stand grow a full garden in 2 square feet",
      "Folding furniture that stores flat against the wall or inside creates space when not entertaining",
      "String lights overhead make a tiny balcony feel like a destination after dark",
      "A small outdoor rug defines the zone and anchors the furniture even on a tiny floor",
      "Privacy screens or tall plants on one or two sides create a sense of enclosure",
      "Wall-mounted drop-leaf tables fold down when not needed — perfect for tight balconies",
    ],
    guides: ["/patio-upgrade-ideas-budget", "/backyard-privacy-ideas"],
    guideLabels: ["Patio Upgrade Ideas", "Backyard Privacy Solutions"],
  },
  {
    room: "Small Home Office",
    emoji: "💻",
    problem: "Working in a closet or corner with no real space to focus.",
    color: "bg-stone-100 border-stone-200",
    accent: "text-stone-700",
    solutions: [
      "A wall-mounted fold-down desk folds completely flat when the workday ends — perfect for 'cloffices'",
      "Pegboards above the desk hold tools, cables, plants, and accessories without taking up surface space",
      "Cable management clips along the desk edge and wall eliminate the visual chaos of cords",
      "A monitor arm frees the entire area under your monitor for use — adds a full square foot of desk",
      "Floating shelves above the desk hold reference books, supplies, and plants without a bookcase",
      "A dedicated tray or box that closes at end of day visually 'turns off' the office in a shared room",
      "Task lighting on an arm keeps the light where you need it without a lamp taking up desk real estate",
    ],
    guides: ["/small-bedroom-storage-ideas", "/declutter-your-home-guide"],
    guideLabels: ["Storage Ideas That Scale", "Declutter Your Workspace"],
  },
];

const PRINCIPLES = [
  { principle: "Vertical space is free real estate", detail: "Most rooms only use the bottom 5 feet. Every foot above that is unused storage capacity." },
  { principle: "Multi-function over single-purpose", detail: "A storage ottoman does what a coffee table and a chest do. Choose furniture that works twice as hard." },
  { principle: "Visual clarity makes spaces feel bigger", detail: "A decluttered, well-organized room feels larger than a cluttered room with the same square footage." },
  { principle: "Mirrors and light are free square footage", detail: "A large mirror doubles perceived space. Warm lighting makes rooms feel expansive." },
  { principle: "Furniture with legs opens the floor", detail: "Furniture on visible legs allows light to pass underneath, making the floor plane feel continuous and larger." },
];

export default function SmallSpaceSolutionsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1600&q=85&auto=format&fit=crop"
            alt="Small space solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Maximize2 className="h-4 w-4 text-violet-300" />
                <span className="text-violet-300 text-xs font-bold uppercase tracking-widest">Every Inch Counts</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Small Space Solutions<br /><span className="text-violet-300">That Actually Work</span>
              </h1>
              <p className="text-lg text-white/80 mb-6 max-w-xl">
                Room-by-room strategies to maximize storage, improve flow, and make small spaces feel larger — without renovation.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Core Principles ───────────────────────── */}
          <section className="my-12">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-1">Think Differently</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-8">5 Principles of Small Space Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRINCIPLES.map((item, i) => (
                <div key={item.principle} className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-black mb-3">{i + 1}</div>
                  <h3 className="font-bold text-stone-900 mb-2">{item.principle}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Room Solutions ────────────────────────── */}
          {ROOM_SOLUTIONS.map((room) => (
            <section key={room.room} className="my-14">
              <div className={`rounded-2xl border ${room.color} p-6 md:p-8`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{room.emoji}</span>
                  <div>
                    <h2 className={`text-xl font-extrabold ${room.accent}`}>{room.room}</h2>
                    <p className="text-sm text-stone-500">{room.problem}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                  <ul className="space-y-3">
                    {room.solutions.slice(0, Math.ceil(room.solutions.length / 2)).map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <span className={`font-bold text-base leading-none mt-0.5 ${room.accent}`}>→</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <ul className="space-y-3 mb-6">
                      {room.solutions.slice(Math.ceil(room.solutions.length / 2)).map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-sm text-stone-700">
                          <span className={`font-bold text-base leading-none mt-0.5 ${room.accent}`}>→</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2 border-t border-stone-200 pt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Related Guides</p>
                      {room.guides.map((href, i) => (
                        <Link key={href} href={href}>
                          <div className={`flex items-center justify-between p-3 rounded-xl bg-white border border-stone-100 hover:shadow-sm transition-all group cursor-pointer`}>
                            <span className={`text-sm font-semibold ${room.accent}`}>{room.guideLabels[i]}</span>
                            <ChevronRight className={`h-4 w-4 ${room.accent}`} />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          <AdPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  );
}
