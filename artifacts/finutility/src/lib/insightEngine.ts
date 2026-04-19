/**
 * insightEngine.ts
 *
 * Data-driven financial insight engine.
 * No AI, no API — insights are built from real financial principles,
 * historical data, and current market context updated manually.
 *
 * Last data review: April 2026
 */

export interface Insight {
  text: string;
  dataPoints: string[];
  calculatorHref?: string;
  calculatorLabel?: string;
}

/* ── Current financial context (update periodically) ────────────────────── */
const DATA = {
  fedRate: "4.25–4.50%",
  mortgage30yr: "6.5–7.0%",
  mortgage15yr: "5.9–6.4%",
  hysaRate: "4.5–5.1%",
  cdRate1yr: "4.8–5.2%",
  inflation: "~3.0%",
  sp500HistAvg: "~10% annually",
  sp500Real: "~7% after inflation",
  savingsNational: "~0.46%",
  personalLoanAvg: "~11–12%",
  autoLoanAvg: "~7–8%",
  studentLoanFederal: "5.5–8.05%",
  bitcoinVolatility: "±40–80% in any given year",
  cryptoLongTermGain: "held >1 year, taxed at capital gains rate (0%, 15%, or 20%)",
  cryptoShortTermGain: "held <1 year, taxed as ordinary income",
};

/* ── Insight library ─────────────────────────────────────────────────────── */

type Rule = {
  keywords: string[];
  insight: Insight;
};

const RULES: Rule[] = [
  // ── Compound Interest ──────────────────────────────────────────────────
  {
    keywords: ["compound interest", "compound", "apy", "compounding", "reinvest"],
    insight: {
      text: `Compound interest is the most powerful force in personal finance. Unlike simple interest (which only earns on principal), compound interest earns on both your principal AND previously accumulated interest — accelerating growth over time. The longer the time horizon, the more dramatic the effect.`,
      dataPoints: [
        "Rule of 72: divide 72 by your rate to find how many years to double your money",
        "At 7% annual return, $10,000 becomes $76,123 in 30 years",
        "At 10% annual return, the same $10,000 becomes $174,494",
        `High-yield savings accounts currently pay ${DATA.hysaRate}`,
        "Compounding frequency matters: daily > monthly > annually",
      ],
      calculatorHref: "/compound-interest-calculator",
      calculatorLabel: "Calculate compound growth",
    },
  },

  // ── Savings Goal ───────────────────────────────────────────────────────
  {
    keywords: ["savings goal", "save for", "how much to save", "saving monthly", "emergency fund", "how long to save"],
    insight: {
      text: `A realistic savings plan depends on your goal amount, timeline, and rate of return. The key lever most people underestimate is consistency — regular contributions outperform lump-sum timing in most scenarios. An emergency fund covering 3–6 months of expenses is the recommended first savings milestone before investing.`,
      dataPoints: [
        "Emergency fund target: 3–6 months of essential expenses",
        `National savings account average: ${DATA.savingsNational} APY`,
        `High-yield savings accounts: ${DATA.hysaRate} APY`,
        `1-year CDs currently offering ${DATA.cdRate1yr} APY`,
        "Saving $500/month at 5% for 10 years = $77,641",
        "Saving $500/month at 5% for 20 years = $205,516",
      ],
      calculatorHref: "/savings-goal-calculator",
      calculatorLabel: "Plan your savings goal",
    },
  },

  // ── Mortgage ───────────────────────────────────────────────────────────
  {
    keywords: ["mortgage", "home loan", "house payment", "buying a house", "down payment", "pmi", "property", "amortization", "refinance"],
    insight: {
      text: `Your mortgage rate and term have a bigger impact than most buyers realise. A 1% rate difference on a $400k loan changes your monthly payment by roughly $230 and your total interest paid by over $80,000. The standard advice is to keep your housing costs (PITI) below 28% of gross monthly income.`,
      dataPoints: [
        `Current 30-year fixed mortgage rate: ${DATA.mortgage30yr}`,
        `Current 15-year fixed mortgage rate: ${DATA.mortgage15yr}`,
        "28% rule: housing costs should be ≤28% of gross monthly income",
        "20% down payment avoids PMI (typically 0.5–1.5% of loan/year)",
        "On a $400k loan at 6.75%, monthly payment ≈ $2,594 (P&I only)",
        "Each extra $100/month on a $400k 30yr mortgage saves ~4 years",
      ],
      calculatorHref: "/mortgage-calculator",
      calculatorLabel: "Calculate your mortgage",
    },
  },

  // ── Loan / Personal Loan ───────────────────────────────────────────────
  {
    keywords: ["loan", "personal loan", "auto loan", "car loan", "debt", "borrow", "interest rate", "monthly payment", "pay off"],
    insight: {
      text: `Loan cost is determined by three factors: principal, interest rate, and term. Shortening the term dramatically reduces total interest paid, even though monthly payments increase. For debt payoff, the avalanche method (highest rate first) saves the most money; the snowball method (smallest balance first) provides faster psychological wins.`,
      dataPoints: [
        `Average personal loan rate: ${DATA.personalLoanAvg} APY`,
        `Average auto loan rate (new car): ${DATA.autoLoanAvg} APY`,
        `Federal student loan rate: ${DATA.studentLoanFederal}`,
        "Debt avalanche: pay highest-rate debt first → saves most money",
        "Debt snowball: pay smallest balance first → faster motivation",
        "A 5-yr loan at 10% costs roughly 2× the interest of a 3-yr loan",
      ],
      calculatorHref: "/loan-payment-calculator",
      calculatorLabel: "Calculate loan payments",
    },
  },

  // ── Inflation ─────────────────────────────────────────────────────────
  {
    keywords: ["inflation", "purchasing power", "cost of living", "cpi", "real return"],
    insight: {
      text: `Inflation silently erodes purchasing power over time. Cash sitting in a low-yield account loses real value every year. To maintain purchasing power, your money must earn a return above the inflation rate. This is why keeping excessive cash is considered a financial risk, not safety.`,
      dataPoints: [
        `Current US inflation (CPI): ${DATA.inflation}`,
        `National savings account average: ${DATA.savingsNational} → real return: negative`,
        `HYSA at ${DATA.hysaRate} → marginally positive real return`,
        "Rule of 72 for inflation: at 3%, prices double in ~24 years",
        "$100 in 2004 had the buying power of ~$167 in 2024",
        "S&P 500 historical real return (after inflation): " + DATA.sp500Real,
      ],
    },
  },

  // ── Currency / Exchange Rate ───────────────────────────────────────────
  {
    keywords: ["currency", "exchange rate", "convert", "forex", "usd", "eur", "gbp", "dollar", "pound", "euro", "foreign"],
    insight: {
      text: `Exchange rates fluctuate constantly based on interest rate differentials, trade balances, and market sentiment. The rate you see quoted is the mid-market (interbank) rate — banks and transfer services typically add a 1–4% margin on top. For large transfers, comparing services can save hundreds of dollars.`,
      dataPoints: [
        "Mid-market rate is the true exchange rate (no profit margin)",
        "Banks typically add 2–4% spread above mid-market rate",
        "Specialist transfer services (Wise, Revolut) typically charge 0.3–1%",
        "Exchange rates can move 5–10% in a single month during volatility",
        "Interest rate hikes tend to strengthen a currency",
        "Central bank decisions are the biggest short-term rate driver",
      ],
      calculatorHref: "/currency-converter",
      calculatorLabel: "Convert currencies",
    },
  },

  // ── Crypto profit / ROI ───────────────────────────────────────────────
  {
    keywords: ["crypto", "bitcoin", "ethereum", "btc", "eth", "altcoin", "token", "digital asset", "blockchain", "crypto profit", "roi", "trading"],
    insight: {
      text: `Crypto profit calculations must account for all costs: purchase fees, sell fees, and network (gas) fees on both sides of a trade. These can easily eliminate gains on smaller trades. Always calculate your true net profit, not just the price difference.`,
      dataPoints: [
        `Bitcoin historical volatility: ${DATA.bitcoinVolatility}`,
        "True profit = (sell price − buy price) × quantity − all fees",
        "Break-even price = buy price + (total fees ÷ quantity)",
        "Gas fees on Ethereum can range from $1 to $50+ depending on network load",
        `Short-term crypto gains (< 1 year): ${DATA.cryptoShortTermGain}`,
        `Long-term crypto gains (> 1 year): ${DATA.cryptoLongTermGain}`,
      ],
      calculatorHref: "/crypto-profit-calculator",
      calculatorLabel: "Calculate crypto profit",
    },
  },

  // ── Interest rates / Fed ───────────────────────────────────────────────
  {
    keywords: ["interest rate", "federal reserve", "fed rate", "base rate", "bank rate", "rate hike", "rate cut"],
    insight: {
      text: `Central bank interest rates set the floor for all other rates in the economy. When the Fed raises rates, borrowing becomes more expensive (mortgages, loans, credit cards) but savings accounts and CDs pay more. Rate decisions ripple through every financial product within weeks.`,
      dataPoints: [
        `Current Federal Funds Rate: ${DATA.fedRate}`,
        `30-year mortgage tracks Fed rate with a typical spread of 2–3%`,
        `HYSA rates closely follow Fed rate: currently ${DATA.hysaRate}`,
        "Credit card rates are now averaging ~21% APR nationally",
        "Rate cuts tend to push mortgage rates lower within 1–2 months",
        "Bond prices move inversely to interest rates",
      ],
    },
  },

  // ── Investing / Stock market ───────────────────────────────────────────
  {
    keywords: ["invest", "stock", "market", "s&p", "index fund", "etf", "portfolio", "returns", "dividend", "401k", "ira", "retirement"],
    insight: {
      text: `Long-term investing in broad market index funds has historically been one of the most reliable wealth-building strategies. Time in the market consistently outperforms timing the market. Tax-advantaged accounts (401k, IRA) amplify returns significantly by deferring or eliminating tax drag.`,
      dataPoints: [
        `S&P 500 historical average annual return: ${DATA.sp500HistAvg} (nominal)`,
        `After inflation, real return averages: ${DATA.sp500Real}`,
        "401k contribution limit (2025): $23,500 ($31,000 if 50+)",
        "Roth IRA contribution limit (2025): $7,000 ($8,000 if 50+)",
        "Expense ratios matter: 1% vs 0.03% costs $300k+ over 30 years on $100k",
        "Dollar-cost averaging reduces impact of market volatility",
      ],
    },
  },

  // ── Rule of 72 ────────────────────────────────────────────────────────
  {
    keywords: ["rule of 72", "double my money", "how long to double", "doubling time"],
    insight: {
      text: `The Rule of 72 is a quick mental calculation to estimate how long it takes to double your money. Simply divide 72 by the annual interest or return rate. It works for both growth (investments) and erosion (inflation, fees).`,
      dataPoints: [
        "Formula: Years to double = 72 ÷ annual rate",
        "At 4% (HYSA): doubles in ~18 years",
        "At 7% (stocks): doubles in ~10 years",
        "At 10% (aggressive growth): doubles in ~7.2 years",
        "At 3% (inflation): your money's purchasing power halves in 24 years",
        "At 21% (credit card debt): your debt doubles in ~3.4 years",
      ],
    },
  },

  // ── Tax ───────────────────────────────────────────────────────────────
  {
    keywords: ["tax", "capital gains", "income tax", "tax bracket", "deduction", "write off", "irs"],
    insight: {
      text: `Understanding how your income is taxed is essential for financial planning. The US uses a marginal (progressive) tax system — only income in each bracket is taxed at that rate, not your entire income. Capital gains from investments held over a year are taxed at lower rates than ordinary income.`,
      dataPoints: [
        "2025 federal brackets: 10%, 12%, 22%, 24%, 32%, 35%, 37%",
        "Long-term capital gains rates: 0%, 15%, or 20% (based on income)",
        "Standard deduction 2025: $15,000 (single), $30,000 (married filing jointly)",
        "Contributing to a 401k reduces your taxable income dollar-for-dollar",
        "Roth IRA contributions are post-tax but withdrawals are tax-free",
        "Crypto is taxed as property — every trade is a taxable event",
      ],
    },
  },

  // ── Debt-to-income ────────────────────────────────────────────────────
  {
    keywords: ["debt to income", "dti", "afford", "how much can i afford", "income ratio", "qualify for loan"],
    insight: {
      text: `Debt-to-income ratio (DTI) is the primary metric lenders use to assess borrowing capacity. It's calculated as total monthly debt payments divided by gross monthly income. Most lenders require a DTI below 43% for a mortgage, and prefer below 36%.`,
      dataPoints: [
        "DTI = total monthly debt payments ÷ gross monthly income × 100",
        "Front-end DTI (housing only) should be ≤28%",
        "Back-end DTI (all debt) should be ≤36–43%",
        "At $6,000/month gross income, max total debt payments ≈ $2,160",
        "Reducing a car payment by $200/month can unlock ~$30k more mortgage",
        "Student loans, car loans, minimum credit card payments all count",
      ],
    },
  },
];

/* ── Engine ──────────────────────────────────────────────────────────────── */

export function getInsight(query: string): Insight | null {
  if (!query.trim()) return null;
  const q = query.toLowerCase();

  // Score each rule by number of keyword matches
  let best: { rule: Rule; score: number } | null = null;
  for (const rule of RULES) {
    const score = rule.keywords.filter((kw) => q.includes(kw)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { rule, score };
    }
  }

  return best?.rule.insight ?? null;
}

/* ── Rotating card content (6 pools × 4 questions) ─────────────────────── */
export const CARD_POOLS: string[][] = [
  [
    "How does compound interest work?",
    "What's the Rule of 72?",
    "How does APY differ from APR?",
    "How often should interest compound?",
  ],
  [
    "What mortgage can I afford on my salary?",
    "How do mortgage rates affect my payment?",
    "What is PMI and how do I avoid it?",
    "15-year vs 30-year mortgage — which is better?",
  ],
  [
    "How do I calculate crypto profit after fees?",
    "What is a break-even price on a trade?",
    "How is crypto taxed?",
    "What is dollar-cost averaging in crypto?",
  ],
  [
    "How much should I save monthly for retirement?",
    "What is a high-yield savings account?",
    "How do I build a 6-month emergency fund?",
    "How long to save $100k at $500/month?",
  ],
  [
    "How does inflation affect my savings?",
    "What is the Federal Reserve rate right now?",
    "Why do interest rates affect house prices?",
    "How do I protect savings during inflation?",
  ],
  [
    "How does currency exchange really work?",
    "What affects exchange rates day to day?",
    "Why do banks charge more than the mid-market rate?",
    "Best way to send money internationally?",
  ],
];
