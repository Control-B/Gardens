import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Link } from "wouter";
import { ChevronRight, Droplets, Sun, Thermometer, ArrowRight, Leaf } from "lucide-react";

const PLANT_LIBRARY = [
  {
    name: "Pothos",
    latin: "Epipremnum aureum",
    type: "Tropical Vine",
    difficulty: "Beginner",
    emoji: "🌿",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80&auto=format&fit=crop",
    light: "Low to bright indirect",
    water: "Every 1–2 weeks (let soil dry)",
    humidity: "Any",
    temp: "60–80°F",
    bestFor: "Dark corners, shelves, trailing arrangements",
    tips: "One of the most forgiving houseplants — thrives on neglect. Yellowing leaves mean overwatering, not underwatering.",
    problems: "Root rot from overwatering is the only common killer. Always let the top 2 inches of soil dry out completely.",
  },
  {
    name: "Snake Plant",
    latin: "Sansevieria trifasciata",
    type: "Succulent",
    difficulty: "Beginner",
    emoji: "🌱",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=400&q=80&auto=format&fit=crop",
    light: "Low to bright indirect",
    water: "Every 2–6 weeks (drought tolerant)",
    humidity: "Any",
    temp: "60–80°F",
    bestFor: "Bedrooms, bathrooms, low-light spaces",
    tips: "Filters air and tolerates neglect better than any other common houseplant. Can go weeks without water.",
    problems: "Overwatering causes root rot. Water sparingly in winter — once a month is often sufficient.",
  },
  {
    name: "Monstera",
    latin: "Monstera deliciosa",
    type: "Tropical",
    difficulty: "Beginner–Intermediate",
    emoji: "🍃",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80&auto=format&fit=crop",
    light: "Bright indirect",
    water: "Every 1–2 weeks",
    humidity: "Moderate to high",
    temp: "65–85°F",
    bestFor: "Statement plant, bright living rooms",
    tips: "Wipe large leaves monthly with a damp cloth — dust blocks light. New leaves unfurl slowly; this is normal.",
    problems: "Yellowing with brown tips = inconsistent watering. Brown crispy tips = low humidity or drafts.",
  },
  {
    name: "Fiddle Leaf Fig",
    latin: "Ficus lyrata",
    type: "Tropical Tree",
    difficulty: "Intermediate",
    emoji: "🌳",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop",
    light: "Bright indirect (near south or east window)",
    water: "Every 7–10 days",
    humidity: "Moderate to high",
    temp: "65–85°F",
    bestFor: "Living rooms, high-ceiling spaces, architectural corners",
    tips: "Don't move it once it's happy — fiddle leafs drop leaves when stressed by relocation. Pick your spot and leave it.",
    problems: "Brown spots = overwatering (if mushy) or underwatering (if crispy). Drafts and cold air cause rapid leaf drop.",
  },
  {
    name: "ZZ Plant",
    latin: "Zamioculcas zamiifolia",
    type: "Tropical Rhizome",
    difficulty: "Beginner",
    emoji: "🪴",
    image: "https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=400&q=80&auto=format&fit=crop",
    light: "Low to moderate indirect",
    water: "Every 2–4 weeks",
    humidity: "Any",
    temp: "60–75°F",
    bestFor: "Offices, low-light rooms, beginners",
    tips: "Stores water in its rhizomes — can survive months of neglect. One of the best plants for forgetful owners.",
    problems: "Almost indestructible. Only common issue is overwatering; the rhizomes rot if kept consistently wet.",
  },
  {
    name: "Tomatoes",
    latin: "Solanum lycopersicum",
    type: "Vegetable",
    difficulty: "Beginner–Intermediate",
    emoji: "🍅",
    image: "https://images.unsplash.com/photo-1467685790346-20bfe73a81f0?w=400&q=80&auto=format&fit=crop",
    light: "Full sun (6–8 hours minimum)",
    water: "Daily or every other day",
    humidity: "Moderate",
    temp: "65–85°F (dies at frost)",
    bestFor: "Raised beds, large containers, sunny gardens",
    tips: "Stake or cage plants early — before they need support. Water deeply and consistently; irregular watering causes blossom end rot.",
    problems: "Blossom end rot = calcium deficiency, usually from inconsistent watering. Yellowing lower leaves = normal aging. Cracked fruit = irregular watering.",
  },
  {
    name: "Basil",
    latin: "Ocimum basilicum",
    type: "Herb",
    difficulty: "Beginner",
    emoji: "🌿",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80&auto=format&fit=crop",
    light: "Full sun (6+ hours) or bright window",
    water: "Every 1–2 days",
    humidity: "Moderate",
    temp: "70–90°F",
    bestFor: "Kitchen windowsill, herb gardens, containers",
    tips: "Pinch off flower buds as soon as they appear — this keeps the plant producing flavorful leaves for months longer.",
    problems: "Wilting despite moist soil = root rot from poor drainage. Yellowing leaves = overwatering or cold temps. Bolting too fast = insufficient light.",
  },
  {
    name: "Peace Lily",
    latin: "Spathiphyllum",
    type: "Tropical",
    difficulty: "Beginner",
    emoji: "🌸",
    image: "https://images.unsplash.com/photo-1518945756765-f8641d60aa75?w=400&q=80&auto=format&fit=crop",
    light: "Low to medium indirect",
    water: "Weekly (keep moist, not saturated)",
    humidity: "High",
    temp: "65–80°F",
    bestFor: "Bathrooms, shaded rooms, offices",
    tips: "One of the few flowering plants that thrives in low light. Will dramatically droop when thirsty — then recover quickly after watering.",
    problems: "Brown leaf tips = low humidity or fluoride in tap water (use filtered water). Yellow leaves = overwatering. No flowers = needs more light.",
  },
];

const CARE_CALENDAR = [
  { month: "Jan–Feb", task: "Reduce watering for most houseplants — shorter days = slower growth", icon: "❄️" },
  { month: "March", task: "Resume regular watering as light increases. Start seeds indoors for spring garden.", icon: "🌱" },
  { month: "April–May", task: "Fertilize actively growing houseplants. Plant after last frost date in garden.", icon: "🌸" },
  { month: "June–Aug", task: "Water more frequently in heat. Harvest vegetables regularly. Prune herbs to prevent bolting.", icon: "☀️" },
  { month: "September", task: "Bring tender plants indoors before first frost. Plant fall bulbs and cool-season vegetables.", icon: "🍂" },
  { month: "Oct–Nov", task: "Reduce fertilizing as growth slows. Begin mulching garden beds for winter protection.", icon: "🍁" },
  { month: "December", task: "Water houseplants sparingly. Plan next year's garden. Order seed catalogs.", icon: "🌙" },
];

const COMMON_MISTAKES = [
  { mistake: "Overwatering is the #1 killer of houseplants", fix: "The rule: most plants die from too much water, not too little. Always check the soil before watering — stick a finger 2 inches deep." },
  { mistake: "Wrong light placement", fix: "Most houseplants need bright indirect light, not direct sun. 'Near a window' means within 3 feet of a window — not across the room." },
  { mistake: "Ignoring drainage", fix: "Every pot needs drainage holes. Plants sitting in standing water develop root rot within 1–2 weeks." },
  { mistake: "Using cold water", fix: "Use room temperature water. Cold water shocks tropical plants and can cause leaf spots on some species." },
  { mistake: "Forgetting about dust", fix: "Dusty leaves block light. Wipe large-leaf plants monthly with a damp cloth to maintain their ability to photosynthesize." },
];

export default function PlantCarePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=85&auto=format&fit=crop"
            alt="Plant care library"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="relative z-10 container mx-auto px-4 md:px-10 pb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="h-4 w-4 text-lime-300" />
                <span className="text-lime-300 text-xs font-bold uppercase tracking-widest">Plant Care Library</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Keep Every Plant<br /><span className="text-lime-300">Alive and Thriving.</span>
              </h1>
              <p className="text-lg text-white/80 mb-6 max-w-xl">
                Care guides for popular houseplants, herbs, and vegetables — with light, water, and troubleshooting info for each.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">
          <AdPlaceholder />

          {/* ── Plant Library ─────────────────────────── */}
          <section className="my-12">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-700 mb-1">Care Library</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-8">Plant-by-Plant Care Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PLANT_LIBRARY.map((plant) => (
                <div key={plant.name} className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="flex gap-0">
                    <div className="w-32 h-40 shrink-0 overflow-hidden">
                      <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-extrabold text-stone-900 text-base">{plant.emoji} {plant.name}</h3>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          plant.difficulty === "Beginner" ? "bg-lime-100 text-lime-800" :
                          plant.difficulty === "Intermediate" ? "bg-amber-100 text-amber-800" :
                          "bg-sky-100 text-sky-800"
                        }`}>{plant.difficulty}</span>
                      </div>
                      <p className="text-xs text-stone-400 italic mb-3">{plant.latin} — {plant.type}</p>
                      <div className="grid grid-cols-2 gap-1.5 mb-3">
                        <div className="flex items-center gap-1.5 text-xs text-stone-600">
                          <Sun className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          {plant.light}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-600">
                          <Droplets className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                          {plant.water}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-600">
                          <Thermometer className="h-3.5 w-3.5 text-red-400 shrink-0" />
                          {plant.temp}
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        <strong className="text-lime-700">Best for:</strong> {plant.bestFor}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-0 border-t border-stone-50 mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <div className="bg-lime-50 rounded-xl p-3">
                        <p className="text-xs font-bold text-lime-700 mb-1">Pro Tip</p>
                        <p className="text-xs text-stone-600 leading-relaxed">{plant.tips}</p>
                      </div>
                      <div className="bg-amber-50 rounded-xl p-3">
                        <p className="text-xs font-bold text-amber-700 mb-1">Common Problems</p>
                        <p className="text-xs text-stone-600 leading-relaxed">{plant.problems}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AdPlaceholder />

          {/* ── Plant Care Calendar ───────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-700 mb-1">Timing Is Everything</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-8">Year-Round Plant Care Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CARE_CALENDAR.map((item) => (
                <div key={item.month} className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-stone-900 text-sm mb-1">{item.month}</p>
                    <p className="text-sm text-stone-500 leading-relaxed">{item.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Common Mistakes ───────────────────────── */}
          <section className="my-14">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-700 mb-1">Avoid These</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 mb-8">5 Most Common Plant Care Mistakes</h2>
            <div className="space-y-4">
              {COMMON_MISTAKES.map((item, i) => (
                <div key={item.mistake} className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-black shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1.5">{item.mistake}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed"><strong className="text-lime-700">Fix: </strong>{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Garden Guide CTA ──────────────────────── */}
          <section className="my-14 relative rounded-3xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=1400&q=85&auto=format&fit=crop"
              alt="Beautiful garden"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/75 to-transparent" />
            <div className="relative z-10 p-10 md:p-14 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-lime-300 mb-3">Go Further</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Ready to Start an Outdoor Garden?</h2>
              <p className="text-white/80 mb-7 leading-relaxed text-sm">
                Guides for raised bed setup, spring prep, companion planting, and seasonal vegetable growing.
              </p>
              <Link href="/garden" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-green-800 font-bold hover:bg-green-50 transition-colors text-sm">
                Explore the Garden Hub <ArrowRight className="h-4 w-4" />
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
