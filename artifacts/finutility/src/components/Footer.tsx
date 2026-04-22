import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full bg-green-950 text-stone-300 mt-auto">
      <div className="container mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="col-span-1 md:col-span-1">
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
            <p className="text-sm text-stone-400 mb-6 leading-relaxed pr-4">
              Your trusted home and garden resource. Free cost calculators, expert guides, and practical advice to help you plan smarter projects.
            </p>
            <a href="mailto:support@gardens.ai" className="text-sm text-green-400 hover:text-green-300 transition-colors">
              support@gardens.ai
            </a>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">Calculators</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/roof-cost-calculator" className="hover:text-green-400 transition-colors">Roof Cost Calculator</Link></li>
              <li><Link href="/paint-calculator" className="hover:text-green-400 transition-colors">Paint Calculator</Link></li>
              <li><Link href="/lawn-care-calculator" className="hover:text-green-400 transition-colors">Lawn Care Cost</Link></li>
              <li><Link href="/fence-cost-calculator" className="hover:text-green-400 transition-colors">Fence Cost Calculator</Link></li>
              <li><Link href="/garden-planting-calculator" className="hover:text-green-400 transition-colors">Garden Planting Layout</Link></li>
              <li><Link href="/home-renovation-calculator" className="hover:text-green-400 transition-colors">Home Renovation Budget</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">Guides</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/guides" className="hover:text-green-400 transition-colors">All Guides</Link></li>
              <li><Link href="/how-to-fix-a-leaking-faucet" className="hover:text-green-400 transition-colors">Fix a Leaking Faucet</Link></li>
              <li><Link href="/how-to-choose-roof-material" className="hover:text-green-400 transition-colors">Choose Roofing Material</Link></li>
              <li><Link href="/diy-fence-installation-guide" className="hover:text-green-400 transition-colors">DIY Fence Installation</Link></li>
              <li><Link href="/how-to-create-a-raised-garden-bed" className="hover:text-green-400 transition-colors">Build a Raised Garden Bed</Link></li>
              <li><Link href="/how-to-winterize-your-home" className="hover:text-green-400 transition-colors">Winterize Your Home</Link></li>
            </ul>
          </div>

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

        <div className="mt-14 pt-8 border-t border-green-900 flex flex-col items-center justify-center text-center gap-3">
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
