import { Link } from "wouter";
import { TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-200 mt-auto">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6" data-testid="link-footer-logo">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-white">freetawn.com</span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed pr-4">
              Your smart financial hub. We provide free, fast, and secure tools to help you calculate your future, manage debt, and analyze investments with data-driven financial insights.
            </p>
            <a href="mailto:support@omniweb.ai" className="text-sm text-primary hover:text-primary/80 transition-colors">
              support@omniweb.ai
            </a>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Calculators</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/compound-interest-calculator" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Compound Interest</Link></li>
              <li><Link href="/mortgage-calculator" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Mortgage Calculator</Link></li>
              <li><Link href="/loan-payment-calculator" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Loan Payment</Link></li>
              <li><Link href="/currency-converter" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Currency Converter</Link></li>
              <li><Link href="/crypto-profit-calculator" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Crypto Profit</Link></li>
              <li><Link href="/savings-goal-calculator" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Savings Goal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Learn</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/what-is-compound-interest" className="hover:text-primary hover:translate-x-1 inline-block transition-all">What is Compound Interest?</Link></li>
              <li><Link href="/how-to-calculate-mortgage-payments" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Mortgage Guide</Link></li>
              <li><Link href="/crypto-profit-vs-loss-explained" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Crypto Profit vs Loss</Link></li>
              <li><Link href="/what-affects-exchange-rates" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Exchange Rates Explained</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/privacy-policy" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Terms of Use</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Disclaimer</Link></li>
              <li><Link href="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-slate-400 mb-4">
            © {new Date().getFullYear()} freetawn.com. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 max-w-4xl mx-auto leading-relaxed">
            Disclaimer: The calculators and information provided on freetawn.com are for educational and informational purposes only. They do not constitute financial, legal, or tax advice. freetawn.com is not responsible for any financial decisions made based on these calculations. Always consult with a qualified professional before making significant financial commitments.
          </p>
        </div>
      </div>
    </footer>
  );
}
