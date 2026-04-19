import { Link, useLocation } from "wouter";
import { Menu, X, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Solutions", href: "/" },
    { label: "Finance", href: "/finance" },
    { label: "Crypto", href: "/crypto" },
    { label: "Loans", href: "/loans" },
    { label: "News", href: "/news" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
            <TrendingUp className="h-4 w-4" />
          </div>
          <span className="text-xl font-bold text-foreground">FinUtility <span className="text-primary text-sm font-semibold">AI</span></span>
        </Link>

        {/* Desktop Nav — centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA stays right-aligned */}
        <div className="hidden md:flex">
          <Button size="sm" asChild>
            <Link href="/compound-interest-calculator" data-testid="link-nav-cta">Start Calculating</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="btn-mobile-menu"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium py-2 transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}
            >
              {link.label}
            </Link>
          ))}
          <Button className="mt-2 w-full" asChild>
            <Link href="/compound-interest-calculator" onClick={() => setIsOpen(false)}>
              Start Calculating
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
