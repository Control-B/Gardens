import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-white mt-16">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" data-testid="link-footer-logo">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                FU
              </div>
              <span className="text-xl font-bold text-foreground">FinUtility AI</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Your smart financial hub. We provide free, fast, and secure tools to help you calculate your future, manage debt, and analyze investments.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/compound-interest-calculator" className="hover:text-primary transition-colors">Compound Interest</Link></li>
              <li><Link href="/mortgage-calculator" className="hover:text-primary transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/loan-payment-calculator" className="hover:text-primary transition-colors">Loan Payment</Link></li>
              <li><Link href="/currency-converter" className="hover:text-primary transition-colors">Currency Converter</Link></li>
              <li><Link href="/crypto-profit-calculator" className="hover:text-primary transition-colors">Crypto Profit</Link></li>
              <li><Link href="/savings-goal-calculator" className="hover:text-primary transition-colors">Savings Goal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Learn</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/what-is-compound-interest" className="hover:text-primary transition-colors">What is Compound Interest?</Link></li>
              <li><Link href="/how-to-calculate-mortgage-payments" className="hover:text-primary transition-colors">Mortgage Guide</Link></li>
              <li><Link href="/crypto-profit-vs-loss-explained" className="hover:text-primary transition-colors">Crypto Profit vs Loss</Link></li>
              <li><Link href="/what-affects-exchange-rates" className="hover:text-primary transition-colors">Exchange Rates Explained</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-primary transition-colors">Terms of Use</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © {new Date().getFullYear()} FinUtility AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-3xl">
            Disclaimer: The calculators and information provided on FinUtility AI are for educational and informational purposes only. They do not constitute financial, legal, or tax advice. FinUtility AI is not responsible for any financial decisions made based on these calculations. Always consult with a qualified professional before making significant financial commitments.
          </p>
        </div>
      </div>
    </footer>
  );
}
