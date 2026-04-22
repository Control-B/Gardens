import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  { label: "Home Improvement", href: "/home-improvement", color: "text-emerald-700", bg: "bg-emerald-50", desc: "Repairs, remodels & energy savings" },
  { label: "Garden & Outdoor", href: "/garden", color: "text-lime-700", bg: "bg-lime-50", desc: "Planting, seasonal care & landscaping" },
  { label: "Exterior & Curb Appeal", href: "/exterior", color: "text-amber-700", bg: "bg-amber-50", desc: "Roofing, fencing & resale value" },
  { label: "Cleaning", href: "/cleaning", color: "text-sky-700", bg: "bg-sky-50", desc: "Routines, natural cleaners & deep-clean" },
  { label: "Decor & Organization", href: "/decor", color: "text-violet-700", bg: "bg-violet-50", desc: "Storage, room refresh & styling" },
  { label: "Outdoor Living", href: "/outdoor-living", color: "text-orange-700", bg: "bg-orange-50", desc: "Patios, privacy & backyard design" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => location.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-stone-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 flex h-16 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" data-testid="link-home-logo">
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">

          {/* Categories dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                dropdownOpen ? "text-green-700 bg-green-50" : "text-stone-600 hover:text-green-700 hover:bg-stone-50"
              }`}
            >
              Categories
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] bg-white rounded-2xl shadow-xl border border-stone-100 p-4 grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setDropdownOpen(false)}
                    className={`flex flex-col gap-0.5 p-3 rounded-xl transition-colors hover:${cat.bg} group`}
                  >
                    <span className={`text-sm font-bold ${isActive(cat.href) ? cat.color : "text-stone-800 group-hover:" + cat.color}`}>
                      {cat.label}
                    </span>
                    <span className="text-xs text-stone-400">{cat.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[
            { label: "Guides", href: "/guides" },
            { label: "Calculators", href: "/calculators" },
            { label: "Seasonal", href: "/seasonal-guides" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors ${
                isActive(link.href)
                  ? "text-green-700 bg-green-50"
                  : "text-stone-600 hover:text-green-700 hover:bg-stone-50"
              }`}
              data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/roof-cost-calculator"
            className="text-sm font-bold px-4 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-colors shadow-sm"
            data-testid="link-nav-cta"
          >
            Free Cost Estimate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-stone-600 hover:bg-stone-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="btn-mobile-menu"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-4 flex flex-col gap-1">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400 px-2 py-1.5 mt-1">Categories</p>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={() => setIsOpen(false)}
              className={`flex flex-col py-2.5 px-3 rounded-xl transition-colors ${
                isActive(cat.href) ? cat.bg : "hover:bg-stone-50"
              }`}
              data-testid={`link-mobile-nav-${cat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className={`text-sm font-semibold ${isActive(cat.href) ? cat.color : "text-stone-700"}`}>{cat.label}</span>
              <span className="text-xs text-stone-400">{cat.desc}</span>
            </Link>
          ))}
          <div className="border-t border-stone-100 mt-2 pt-3 flex flex-col gap-1">
            {[
              { label: "All Guides", href: "/guides" },
              { label: "Calculators", href: "/calculators" },
              { label: "Seasonal Guides", href: "/seasonal-guides" },
              { label: "Budget Projects", href: "/budget-projects" },
              { label: "Plant Care Library", href: "/plant-care" },
              { label: "Small Space Solutions", href: "/small-space-solutions" },
              { label: "Start Here", href: "/start-here" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-stone-600 hover:text-green-700 rounded-lg hover:bg-stone-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/calculators"
              onClick={() => setIsOpen(false)}
              className="mt-2 text-center font-bold px-4 py-2.5 rounded-full bg-green-700 text-white hover:bg-green-800 transition-colors"
            >
              Free Cost Estimate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
