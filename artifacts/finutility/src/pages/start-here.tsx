import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Calculator, ChevronRight, Home, Leaf, Sparkles, Sofa, Sun, Hammer } from "lucide-react";

const PATHS = [
  {
    title: "I'm a New Homeowner",
    emoji: "🏠",
    desc: "Start with the fundamentals — what to inspect, what to fix first, and how to build a maintenance routine.",
    color: "bg-emerald-50 border-emerald-200",
    accent: "text-emerald-700",
    links: [
      { label: "Annual Home Maintenance Checklist", href: "/how-to-winterize-your-home" },
      { label: "When to DIY vs. Hire a Contractor", href: "/when-to-diy-vs-hire-a-contractor" },
      { label: "Best Home Upgrades That Add Value", href: "/best-home-upgrades-that-add-value" },
      { label: "Home Renovation Budget Calculator", href: "/home-renovation-calculator" },
    ],
  },
  {
    title: "I Want to Start a Garden",
    emoji: "🌱",
    desc: "Whether it's a windowsill herb pot or a raised bed in the backyard — start here.",
    color: "bg-lime-50 border-lime-200",
    accent: "text-lime-700",
    links: [
      { label: "Beginner Garden Setup Guide", href: "/how-to-prepare-garden-for-spring" },
      { label: "How to Create a Raised Garden Bed", href: "/how-to-create-a-raised-garden-bed" },
      { label: "Best Low-Maintenance Plants", href: "/best-plants-for-low-maintenance-gardens" },
      { label: "Garden Planting Calculator", href: "/garden-planting-calculator" },
    ],
  },
  {
    title: "I Need to Clean & Organize",
    emoji: "✨",
    desc: "Build a cleaning system that actually works and tackle the clutter once and for all.",
    color: "bg-sky-50 border-sky-200",
    accent: "text-sky-700",
    links: [
      { label: "Build a Cleaning Schedule That Sticks", href: "/room-by-room-cleaning-schedule" },
      { label: "How to Declutter Your Home in a Weekend", href: "/declutter-your-home-guide" },
      { label: "Natural Cleaning Solutions (With Recipes)", href: "/natural-cleaning-solutions-guide" },
      { label: "Pantry Organization Guide", href: "/pantry-organization-guide" },
    ],
  },
  {
    title: "I Want to Refresh My Home's Look",
    emoji: "🛋️",
    desc: "Decor and style upgrades that make a big visual impact without big spending.",
    color: "bg-violet-50 border-violet-200",
    accent: "text-violet-700",
    links: [
      { label: "Budget Living Room Refresh Under $500", href: "/living-room-refresh-guide" },
      { label: "10 Smart Storage Solutions for Small Bedrooms", href: "/small-bedroom-storage-ideas" },
      { label: "Renter-Friendly Decor Upgrades", href: "/apartment-decor-upgrades" },
      { label: "Paint Calculator", href: "/paint-calculator" },
    ],
  },
  {
    title: "I Want a Better Outdoor Space",
    emoji: "☀️",
    desc: "Transform your patio, backyard, or balcony into a space you actually want to spend time in.",
    color: "bg-orange-50 border-orange-200",
    accent: "text-orange-700",
    links: [
      { label: "12 Patio Upgrades That Transform Your Space", href: "/patio-upgrade-ideas-budget" },
      { label: "Backyard Privacy Without a Full Fence", href: "/backyard-privacy-ideas" },
      { label: "How to Light Your Outdoor Space", href: "/outdoor-lighting-guide" },
      { label: "Family-Friendly Backyard Setup", href: "/family-friendly-backyard-setup" },
    ],
  },
  {
    title: "I Have a Specific Home Repair",
    emoji: "🔧",
    desc: "Fast, practical guides for the most common home repairs — no experience required.",
    color: "bg-amber-50 border-amber-200",
    accent: "text-amber-700",
    links: [
      { label: "Fix a Leaking Faucet Without a Plumber", href: "/how-to-fix-a-leaking-faucet" },
      { label: "How to Patch Drywall Holes", href: "/how-to-patch-drywall-holes" },
      { label: "How to Paint a Room Like a Pro", href: "/how-to-paint-a-room-like-a-pro" },
      { label: "Roof Cost Calculator", href: "/roof-cost-calculator" },
    ],
  },
];

const ABOUT_SITE = [
  { icon: "📚", title: "Expert Guides", desc: "Every article follows the Problem → Solution → Benefit structure. No filler, no vague advice." },
  { icon: "🔢", title: "Free Calculators", desc: "6 calculators that run in your browser with no sign-up. Know your numbers before any conversation." },
  { icon: "📅", title: "Seasonal Timing", desc: "We flag when to do things — spring prep, fall cleanup, summer projects — so you never miss the optimal window." },
  { icon: "💰", title: "Budget-First Thinking", desc: "Every guide includes cost ranges, DIY vs. pro comparisons, and where to save without sacrificing quality." },
];

export default function StartHerePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFAF6" }}>
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-green-900 text-white py-20 px-4">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1600&q=85&auto=format&fit=crop"
            alt="Home and garden"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 container mx-auto max-w-3xl text-center">
            <span className="text-green-300 text-xs font-bold uppercase tracking-widest mb-4 block">New Here?</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              Start Here — Find<br />What You Need
            </h1>
            <p className="text-lg text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
              Gardens is a practical home and garden resource. Tell us what you're working on and we'll point you directly to the best guides and tools.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/guides" className="px-6 py-3 rounded-full bg-white text-green-800 font-bold text-sm hover:bg-green-50 transition-colors">
                Browse All Guides
              </Link>
              <Link href="/calculators" className="px-6 py-3 rounded-full bg-white/15 border border-white/25 text-white font-bold text-sm hover:bg-white/25 transition-colors">
                Open a Calculator
              </Link>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-10 py-12 max-w-6xl">

          {/* ── What This Site Is ─────────────────────── */}
          <section className="my-12">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">What Gardens Does</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">Built for Real Homeowners</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {ABOUT_SITE.map((item) => (
                <div key={item.title} className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <AdPlaceholder />

          {/* ── Choose Your Path ──────────────────────── */}
          <section className="my-14">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">Find Your Path</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">What Are You Working On?</h2>
              <p className="text-stone-500 mt-2">Pick your situation and we'll take you straight to the right resources.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PATHS.map((path) => (
                <div key={path.title} className={`rounded-2xl border p-6 ${path.color}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{path.emoji}</span>
                    <h3 className={`font-bold text-lg ${path.accent}`}>{path.title}</h3>
                  </div>
                  <p className="text-sm text-stone-600 mb-5 leading-relaxed">{path.desc}</p>
                  <ul className="space-y-2">
                    {path.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={`flex items-center justify-between text-sm font-semibold ${path.accent} hover:underline group`}>
                          {link.label}
                          <ChevronRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Quick Links ───────────────────────────── */}
          <section className="my-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link href="/guides">
              <div className="group bg-stone-900 text-white rounded-2xl p-8 cursor-pointer hover:bg-stone-800 transition-colors h-full flex flex-col justify-between">
                <BookOpen className="h-8 w-8 text-green-400 mb-4" />
                <div>
                  <h3 className="text-xl font-extrabold mb-2">All Guides</h3>
                  <p className="text-white/60 text-sm mb-4">30+ educational articles covering every home and garden topic.</p>
                  <span className="flex items-center gap-1 text-green-400 font-bold text-sm">Browse all <ArrowRight className="h-4 w-4" /></span>
                </div>
              </div>
            </Link>
            <Link href="/calculators">
              <div className="group bg-green-700 text-white rounded-2xl p-8 cursor-pointer hover:bg-green-800 transition-colors h-full flex flex-col justify-between">
                <Calculator className="h-8 w-8 text-green-200 mb-4" />
                <div>
                  <h3 className="text-xl font-extrabold mb-2">Free Calculators</h3>
                  <p className="text-white/70 text-sm mb-4">6 tools to estimate project costs before you get any quotes.</p>
                  <span className="flex items-center gap-1 text-green-200 font-bold text-sm">Open tools <ArrowRight className="h-4 w-4" /></span>
                </div>
              </div>
            </Link>
            <Link href="/seasonal-guides">
              <div className="group bg-amber-700 text-white rounded-2xl p-8 cursor-pointer hover:bg-amber-800 transition-colors h-full flex flex-col justify-between">
                <Sun className="h-8 w-8 text-amber-200 mb-4" />
                <div>
                  <h3 className="text-xl font-extrabold mb-2">Seasonal Guides</h3>
                  <p className="text-white/70 text-sm mb-4">The right tasks for spring, summer, fall, and winter.</p>
                  <span className="flex items-center gap-1 text-amber-200 font-bold text-sm">See the calendar <ArrowRight className="h-4 w-4" /></span>
                </div>
              </div>
            </Link>
          </section>

          <AdPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  );
}
