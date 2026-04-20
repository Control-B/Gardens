import { Link } from "wouter";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-200 mt-auto">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6" data-testid="link-footer-logo">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white font-bold text-sm">
                <Leaf className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-white">Gardens</span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed pr-4">
              Your trusted home and garden resource. Free cost calculators, expert guides, and practical advice to help you plan smarter projects, save money, and avoid costly mistakes.
            </p>
            <a href="mailto:support@gardens.ai" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              support@gardens.ai
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Calculators</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/roof-cost-calculator" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Roof Cost Calculator</Link></li>
              <li><Link href="/paint-calculator" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Paint Calculator</Link></li>
              <li><Link href="/lawn-care-calculator" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Lawn Care Cost</Link></li>
              <li><Link href="/fence-cost-calculator" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Fence Cost Calculator</Link></li>
              <li><Link href="/garden-planting-calculator" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Garden Planting Layout</Link></li>
              <li><Link href="/home-renovation-calculator" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Home Renovation Budget</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Learn</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/guides" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">All Guides</Link></li>
              <li><Link href="/how-to-fix-a-leaking-faucet" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Fix a Leaking Faucet</Link></li>
              <li><Link href="/how-to-choose-roof-material" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Choose Roofing Material</Link></li>
              <li><Link href="/diy-fence-installation-guide" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">DIY Fence Installation</Link></li>
              <li><Link href="/how-to-create-a-raised-garden-bed" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Build a Raised Garden Bed</Link></li>
              <li><Link href="/how-to-winterize-your-home" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Winterize Your Home</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/privacy-policy" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Terms of Use</Link></li>
              <li><Link href="/disclaimer" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Disclaimer</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-slate-400 mb-4">
            © {new Date().getFullYear()} Gardens. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 max-w-4xl mx-auto leading-relaxed">
            Disclaimer: The calculators and information provided on Gardens are for educational and informational purposes only. Cost estimates are based on national averages and may not reflect current material prices or labor rates in your area. Always obtain multiple professional quotes before committing to any home improvement project. Gardens is not responsible for any decisions made based on these estimates.
          </p>
        </div>
      </div>
    </footer>
  );
}
