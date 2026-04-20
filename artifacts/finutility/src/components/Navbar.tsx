import { Link, useLocation } from "wouter";
import { Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navThemeByRoute = [
  {
    match: (pathname: string) => pathname.startsWith("/home-improvement"),
    navClassName: "border-emerald-900/60 bg-gradient-to-r from-slate-950/95 via-emerald-950/92 to-slate-900/95 supports-[backdrop-filter]:bg-emerald-950/60",
    linkClassName: "hover:text-emerald-200",
    activeClassName: "text-emerald-200",
    buttonClassName: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
  {
    match: (pathname: string) => pathname.startsWith("/garden"),
    navClassName: "border-lime-900/60 bg-gradient-to-r from-slate-950/95 via-lime-950/92 to-slate-900/95 supports-[backdrop-filter]:bg-lime-950/60",
    linkClassName: "hover:text-lime-200",
    activeClassName: "text-lime-200",
    buttonClassName: "bg-lime-700 text-white hover:bg-lime-800",
  },
  {
    match: (pathname: string) => pathname.startsWith("/exterior"),
    navClassName: "border-amber-900/60 bg-gradient-to-r from-slate-950/95 via-amber-950/92 to-slate-900/95 supports-[backdrop-filter]:bg-amber-950/60",
    linkClassName: "hover:text-amber-200",
    activeClassName: "text-amber-200",
    buttonClassName: "bg-amber-600 text-white hover:bg-amber-700",
  },
  {
    match: () => true,
    navClassName: "border-emerald-900/60 bg-gradient-to-r from-slate-950/95 via-emerald-950/92 to-slate-900/95 supports-[backdrop-filter]:bg-emerald-950/60",
    linkClassName: "hover:text-emerald-200",
    activeClassName: "text-emerald-200",
    buttonClassName: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const theme = navThemeByRoute.find(({ match }) => match(location)) ?? navThemeByRoute[navThemeByRoute.length - 1];

  const links = [
    { label: "Home", href: "/" },
    { label: "Home Improvement", href: "/home-improvement" },
    { label: "Garden", href: "/garden" },
    { label: "Exterior", href: "/exterior" },
    { label: "Guides", href: "/guides" },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full border-b backdrop-blur ${theme.navClassName}`}>
      <div className="container mx-auto px-4 md:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white font-bold text-sm">
            <Leaf className="h-4 w-4" />
          </div>
          <span className="text-xl font-bold text-white">Gardens</span>
        </Link>

        {/* Desktop Nav — centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${theme.linkClassName} ${
                location === link.href ? theme.activeClassName : "text-white/75"
              }`}
              data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA stays right-aligned */}
        <div className="hidden md:flex">
          <Button size="sm" className={theme.buttonClassName} asChild>
            <Link href="/roof-cost-calculator" data-testid="link-nav-cta">Get a Cost Estimate</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="btn-mobile-menu"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 px-4 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium py-2 transition-colors ${theme.linkClassName} ${
                location === link.href ? theme.activeClassName : "text-white/75"
              }`}
              data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
          <Button className={`mt-2 w-full ${theme.buttonClassName}`} asChild>
            <Link href="/roof-cost-calculator" onClick={() => setIsOpen(false)}>
              Get a Cost Estimate
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
