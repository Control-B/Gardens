import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full bg-green-950 text-stone-300 mt-auto">
      <div className="container mx-auto px-4 md:px-10 py-16">

        {/* ── Top grid ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-6">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5" data-testid="link-footer-logo">
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-green-600 shadow">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.5-8 5.5S11 1 3 1c0 0 2 2 3.5 4.5C8 8 9 11 9 11S11 7 17 8z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-white">Gardens</span>
                <span className="text-[10px] text-green-400 font-medium tracking-widest uppercase">Home & Garden</span>
              </div>
            </Link>
            <p className="text-sm text-stone-400 mb-5 leading-relaxed pr-6">
              Free cost calculators, expert how-to guides, and seasonal advice — everything you need to plan smarter home and garden projects.
            </p>
            <a href="mailto:support@gardens.ai" className="text-sm text-green-400 hover:text-green-300 transition-colors">
              support@gardens.ai
            </a>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/start-here" className="text-xs font-bold px-3 py-1.5 rounded-full bg-green-800 text-green-200 hover:bg-green-700 transition-colors">
                New? Start Here →
              </Link>
              <Link href="/calculators" className="text-xs font-bold px-3 py-1.5 rounded-full bg-green-800 text-green-200 hover:bg-green-700 transition-colors">
                Free Calculators
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">Categories</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/home-improvement" className="hover:text-green-400 transition-colors">Home Improvement</Link></li>
              <li><Link href="/garden" className="hover:text-green-400 transition-colors">Garden & Outdoor</Link></li>
              <li><Link href="/exterior" className="hover:text-green-400 transition-colors">Exterior & Curb Appeal</Link></li>
              <li><Link href="/cleaning" className="hover:text-green-400 transition-colors">Cleaning & Home Care</Link></li>
              <li><Link href="/decor" className="hover:text-green-400 transition-colors">Decor & Organization</Link></li>
              <li><Link href="/outdoor-living" className="hover:text-green-400 transition-colors">Outdoor Living</Link></li>
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">Calculators</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/calculators" className="hover:text-green-400 transition-colors">All Calculators</Link></li>
              <li><Link href="/roof-cost-calculator" className="hover:text-green-400 transition-colors">Roof Cost</Link></li>
              <li><Link href="/paint-calculator" className="hover:text-green-400 transition-colors">Paint Calculator</Link></li>
              <li><Link href="/lawn-care-calculator" className="hover:text-green-400 transition-colors">Lawn Care Cost</Link></li>
              <li><Link href="/fence-cost-calculator" className="hover:text-green-400 transition-colors">Fence Cost</Link></li>
              <li><Link href="/garden-planting-calculator" className="hover:text-green-400 transition-colors">Garden Planting</Link></li>
              <li><Link href="/home-renovation-calculator" className="hover:text-green-400 transition-colors">Home Renovation</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">Resources</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/guides" className="hover:text-green-400 transition-colors">All Guides</Link></li>
              <li><Link href="/seasonal-guides" className="hover:text-green-400 transition-colors">Seasonal Guides</Link></li>
              <li><Link href="/budget-projects" className="hover:text-green-400 transition-colors">Budget Projects</Link></li>
              <li><Link href="/small-space-solutions" className="hover:text-green-400 transition-colors">Small Space Solutions</Link></li>
              <li><Link href="/plant-care" className="hover:text-green-400 transition-colors">Plant Care Library</Link></li>
              <li><Link href="/start-here" className="hover:text-green-400 transition-colors">Start Here</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">Company</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-green-400 transition-colors">Terms of Use</Link></li>
              <li><Link href="/disclaimer" className="hover:text-green-400 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* ── Divider ─────────────────────────────── */}
        <div className="mt-14 border-t border-green-900" />

        {/* ── Popular guides strip ─────────────────── */}
        <div className="py-8">
          <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-4">Popular Guides</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Fix a Leaking Faucet", href: "/how-to-fix-a-leaking-faucet" },
              { label: "Choose Roofing Material", href: "/how-to-choose-roof-material" },
              { label: "DIY Fence Installation", href: "/diy-fence-installation-guide" },
              { label: "Raise a Garden Bed", href: "/how-to-create-a-raised-garden-bed" },
              { label: "Winterize Your Home", href: "/how-to-winterize-your-home" },
              { label: "Room-by-Room Cleaning", href: "/room-by-room-cleaning-schedule" },
              { label: "Natural Cleaning Recipes", href: "/natural-cleaning-solutions-guide" },
              { label: "Declutter Your Home", href: "/declutter-your-home-guide" },
              { label: "Patio Upgrades", href: "/patio-upgrade-ideas-budget" },
              { label: "Outdoor Lighting", href: "/outdoor-lighting-guide" },
              { label: "Backyard Privacy", href: "/backyard-privacy-ideas" },
              { label: "Pantry Organization", href: "/pantry-organization-guide" },
            ].map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="text-xs text-stone-400 border border-green-900 rounded-full px-3 py-1 hover:text-green-300 hover:border-green-700 transition-colors"
              >
                {g.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────── */}
        <div className="pt-6 border-t border-green-900 flex flex-col items-center justify-center text-center gap-3">
          <p className="text-sm text-stone-400">
            © {new Date().getFullYear()} Gardens. All rights reserved.
          </p>
          <p className="text-xs text-stone-500 max-w-4xl leading-relaxed">
            Disclaimer: The calculators and information provided on Gardens are for educational and informational purposes only. Cost estimates are based on national averages and may not reflect current material prices or labor rates in your area. Always obtain multiple professional quotes before committing to any home improvement project. Gardens is not responsible for any decisions made based on these estimates.
          </p>
        </div>
      </div>
    </footer>
  );
}
