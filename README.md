# FinUtility — Financial Calculator Suite

A modern financial calculator web app with live RSS news, data-driven financial insights, and tools for compound interest, mortgages, loans, crypto profit, savings goals, and currency conversion.

---

## Quick Start

### Requirements
- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) — install with `npm install -g pnpm`

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/Control-B/Calculator.git
cd Calculator

# 2. Install dependencies
pnpm install

# 3. Start the dev server on localhost:3000
pnpm dev
```

Then open **http://localhost:3000** in your browser.

---

## Project Structure

```
Calculator/
├── artifacts/
│   └── finutility/          # Main frontend app (React + Vite + Tailwind)
│       ├── src/
│       │   ├── components/  # Shared UI components
│       │   ├── pages/       # Route pages (home, finance, crypto, loans, news, calculators)
│       │   └── lib/         # Utilities (calculators, insight engine, news service, NLP parser)
│       └── package.json
├── attached_assets/         # Image assets used throughout the site
├── package.json             # Root workspace (run scripts from here)
└── pnpm-workspace.yaml
```

---

## Available Scripts

From the **root directory**:

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server at `localhost:3000` |
| `pnpm build` | Type-check and build all packages |
| `pnpm start` | Serve the production build on `$PORT` via the Express server |
| `pnpm typecheck` | Run TypeScript checks across the workspace |

---

## DigitalOcean

The screenshot error from DigitalOcean usually means the app was configured as a **Static Site**, but the generated frontend assets were not being copied to a root-level directory like `dist/`.

### Option A — Static Site

Use this when you only need the frontend.

- **Recommended source directory**: `artifacts/finutility`
- **Build command**: `pnpm build:do:static`
- **Output directory**: `dist/public`
- **Run command**: none

`artifacts/finutility/package.json` is now self-contained for deployment: it no longer relies on pnpm `catalog:` aliases or `workspace:*` dependencies for the static-site build.

There is also a checked-in app spec at `.do/app.yaml` that targets `artifacts/finutility` directly.

Use the path exactly as `artifacts/finutility` in DigitalOcean — not `/artifacts/finutility`.

### Option B — Web Service

Use this when you want the Express server too.

- **Build command**: `pnpm build`
- **Run command**: `pnpm start`
- **HTTP port**: use the platform-provided `PORT` environment variable

In this mode:

1. `artifacts/finutility` builds the static frontend into `dist/public`
2. `artifacts/api-server` starts an Express server
3. Express serves `/api/*` routes and the frontend SPA from the same process

### Notes

- The Vite **large chunk size** message is a warning, not the deployment blocker shown in your screenshot.
- If you stay with a **Static Site** on DigitalOcean, prefer **Option A** above.

---

## Features

- **Calculators** — Compound Interest, Mortgage, Loan Payment, Savings Goal, Currency Converter, Crypto Profit
- **Financial Insight** — Data-driven insight engine based on real market conditions (no AI API required)
- **News** — Live RSS headlines from BBC Business, The Guardian, MarketWatch, CNBC, CoinDesk, CoinTelegraph, Decrypt, Investopedia — cached daily in localStorage
- **Ad Placeholders** — Pre-wired placement slots ready for Google AdSense integration

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** — build tool and dev server
- **Tailwind CSS 4** — styling
- **Framer Motion** — animations
- **Wouter** — client-side routing
- **Embla Carousel** — image carousels
- **pnpm workspaces** — monorepo management
