import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home Improvement", href: "/home-improvement" },
    { label: "Garden", href: "/garden" },
    { label: "Exterior", href: "/exterior" },
    { label: "Guides", href: "/guides" },
    { label: "Calculators", href: "/roof-cost-calculator" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-stone-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" data-testid="link-home-logo">
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 shadow">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.5-8 5.5S11 1 3 1c0 0 2 2 3.5 4.5C8 8 9 11 9 11S11 7 17 8z" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-green-800 tracking-tight">Gardens</span>
            <span className="text-[10px] text-stone-400 font-medium tracking-widest uppercase">Home & Garden</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                location.startsWith(link.href)
                  ? "text-green-700 border-b-2 border-green-600 pb-0.5"
                  : "text-stone-600 hover:text-green-700"
              }`}
              data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/roof-cost-calculator"
            className="text-sm font-bold px-4 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-colors shadow-sm"
            data-testid="link-nav-cta"
          >
            Free Cost Estimate
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-md text-stone-600 hover:bg-stone-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="btn-mobile-menu"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-semibold py-2 transition-colors ${
                location.startsWith(link.href) ? "text-green-700" : "text-stone-600 hover:text-green-700"
              }`}
              data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/roof-cost-calculator"
            onClick={() => setIsOpen(false)}
            className="mt-2 text-center font-bold px-4 py-2.5 rounded-full bg-green-700 text-white hover:bg-green-800 transition-colors"
          >
            Free Cost Estimate
          </Link>
        </div>
      )}
    </nav>
  );
}
