# FinUtility AI

## Overview

A full multi-page financial utility website with AI-powered natural language input, 6 working calculators, category pages, SEO content pages, and legal pages.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **Frontend**: React + Vite + TypeScript (artifacts/finutility)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Routing**: Wouter (client-side only, no backend)
- **API framework**: Express 5 (artifacts/api-server, not used by frontend)
- **Database**: PostgreSQL + Drizzle ORM (not used by frontend)

## Architecture

This is a **frontend-only** React app. All calculator logic runs entirely client-side in the browser. No API calls for calculations.

### Key Files
- `artifacts/finutility/src/lib/calculators.ts` — All math formulas (compound interest, mortgage, loan, crypto, savings, currency)
- `artifacts/finutility/src/lib/aiInsights.ts` — Context-aware AI explanation generator (deterministic, no API)
- `artifacts/finutility/src/lib/nlParser.ts` — Natural language parser for hero input
- `artifacts/finutility/src/components/` — Reusable components (Navbar, Footer, ChartModule, AdPlaceholder, AIInsightCard, etc.)
- `artifacts/finutility/src/pages/` — All 24+ page components

## Site Structure (24+ pages)

### Homepage
- `/` — Hero with NL search, calculator grid, category cards, FAQ, testimonials

### Calculators (6)
- `/compound-interest-calculator`
- `/mortgage-calculator`
- `/loan-payment-calculator`
- `/currency-converter`
- `/crypto-profit-calculator`
- `/savings-goal-calculator`

### Category Pages (3)
- `/finance`
- `/crypto`
- `/loans`

### SEO Content Pages (9)
- `/what-is-compound-interest`
- `/how-compound-interest-works`
- `/how-to-calculate-mortgage-payments`
- `/loan-interest-explained`
- `/how-to-save-money-faster`
- `/how-to-calculate-crypto-profit`
- `/crypto-profit-vs-loss-explained`
- `/how-currency-conversion-works`
- `/what-affects-exchange-rates`

### Legal Pages (5)
- `/privacy-policy`
- `/terms-of-use`
- `/disclaimer`
- `/about`
- `/contact`

## Design System
- Background: hsl(210 20% 98%)
- Primary: hsl(221 83% 53%) — blue-600
- Hero sections: Dark navy gradient (#0F172A → #1E3A8A)
- Cards: white, rounded-xl, shadow-sm
- Charts: blue (#2563EB) for principal, green (#16A34A) for interest/profit, red (#DC2626) for losses

## Key Commands
- `pnpm run typecheck` — full typecheck
- `pnpm run build` — build all packages
- Dev server: artifacts/finutility workflow (PORT env auto-assigned)
