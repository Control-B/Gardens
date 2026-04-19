/**
 * aiInsights.ts — Data-driven financial insights generated from calculator inputs.
 * All market context figures reflect typical conditions as of April 2026.
 */

export function generateCompoundInterestInsight(
  principal: number,
  finalValue: number,
  years: number
): string {
  if (finalValue === 0 || principal === 0)
    return "Enter your numbers to see how your money grows through compound interest — one of the most powerful forces in personal finance.";

  const multiplier = finalValue / principal;
  const gained = finalValue - principal;
  const hysaContext =
    "For comparison, a high-yield savings account currently pays around 4.5–5.1% APY, while the S&P 500 has historically averaged ~10% annually.";

  if (multiplier >= 5) {
    return `Impressive growth — your money multiplies by ${multiplier.toFixed(1)}x over ${years} years, turning $${principal.toLocaleString()} into $${finalValue.toLocaleString()} and adding $${gained.toLocaleString()} in compound returns. This is the Rule of 72 in action: at your rate, your money doubles every ${(72 / ((Math.log(multiplier) / years) * 100)).toFixed(1)} years. ${hysaContext}`;
  }
  if (multiplier >= 2) {
    return `Your money more than doubles over ${years} years — growing from $${principal.toLocaleString()} to $${finalValue.toLocaleString()}. That $${gained.toLocaleString()} in compound growth is entirely passive once invested. Increasing your monthly contributions or starting earlier would amplify this further. ${hysaContext}`;
  }
  return `Over ${years} years, your $${principal.toLocaleString()} grows to $${finalValue.toLocaleString()} — a gain of $${gained.toLocaleString()}. Compound interest accelerates in later years, so extending the timeline or increasing contributions has a disproportionate impact on the final result. ${hysaContext}`;
}

export function generateMortgageInsight(
  principalAndInterest: number,
  totalPayment: number,
  totalInterest: number,
  loanAmount: number
): string {
  if (totalPayment === 0)
    return "Enter your home details to see your estimated monthly payments and total cost breakdown based on current mortgage market conditions.";

  const interestRatio = ((totalInterest / loanAmount) * 100).toFixed(0);
  const rateContext =
    "Current 30-year fixed mortgage rates are running 6.5–7.0% and 15-year rates around 5.9–6.4% (April 2026).";

  let insight = `Your monthly principal & interest payment is $${principalAndInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}. `;

  if (totalInterest > loanAmount) {
    insight += `Over the life of this loan, you'll pay ${interestRatio}% of the borrowed amount in interest — more than the original loan itself. A 15-year term or an extra $100–$200/month toward principal would save tens of thousands. `;
  } else {
    insight += `Your total interest (${interestRatio}% of loan value) is relatively contained. Even small overpayments toward principal accelerate payoff and reduce total interest. `;
  }

  insight += rateContext;
  return insight;
}

export function generateLoanInsight(
  payment: number,
  interest: number,
  amount: number,
  months: number
): string {
  if (payment === 0)
    return "Enter your loan details to view your full payment schedule and total interest cost.";

  const years = (months / 12).toFixed(1);
  const interestPct = ((interest / amount) * 100).toFixed(0);
  const rateContext =
    "Current average personal loan rates are 11–12% APY; auto loans run 7–8% APY (April 2026).";

  return `You'll repay this loan in ${years} years, paying $${interest.toLocaleString(undefined, { maximumFractionDigits: 0 })} in interest on top of the $${amount.toLocaleString()} borrowed — that's ${interestPct}% of the principal in interest costs. Paying just $50–$100 extra per month directly to principal can cut months off the term and meaningfully reduce total interest. ${rateContext}`;
}

export function generateCurrencyInsight(
  from: string,
  to: string,
  amount: number,
  rate: number
): string {
  if (amount === 0 || !rate)
    return "Select currencies and an amount to view the mid-market exchange rate and real-cost comparison.";

  const bankRate = (rate * 0.97).toFixed(4);
  return `The mid-market rate is 1 ${from} = ${rate.toFixed(4)} ${to}. This is the true benchmark — banks and money changers typically offer 2–4% less (around ${bankRate} ${to} per ${from}), which on larger transfers adds up quickly. Specialist services like Wise or Revolut typically charge just 0.3–1% above mid-market, making them significantly cheaper for international transfers. Exchange rates can shift 5–10% in a single month during volatile periods driven by central bank decisions, inflation data, or geopolitical events.`;
}

export function generateCryptoInsight(
  roi: number,
  netProfit: number,
  breakEven: number,
  buyPrice: number
): string {
  if (buyPrice === 0)
    return "Enter your trade details to calculate your true net profit, ROI, and break-even price after all fees.";

  const taxContext =
    "Note: gains held under 1 year are taxed as ordinary income in the US; gains held over 1 year qualify for lower long-term capital gains rates (0%, 15%, or 20%).";

  if (netProfit > 0) {
    return `Your trade shows a ${roi.toFixed(2)}% ROI — a net profit of $${netProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })} after fees. ${taxContext} Bitcoin's historical volatility of ±40–80% per year means locking in profits and managing position size matters as much as the entry price.`;
  }
  if (netProfit < 0) {
    return `This trade is currently at a loss (${roi.toFixed(2)}% ROI). To break even including all fees, the asset needs to reach $${breakEven.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}. Realised losses can offset capital gains for tax purposes — consult a tax professional about tax-loss harvesting strategies.`;
  }
  return `You are exactly at break-even — the sell price precisely covers your buy cost plus all fees. Any move above $${breakEven.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} becomes profit.`;
}

export function generateSavingsInsight(
  target: number,
  current: number,
  monthly: number,
  timeMonths: number
): string {
  if (target === 0)
    return "Set a savings goal to get a data-driven timeline and strategy based on current savings rates.";

  const years = (timeMonths / 12).toFixed(1);
  const rateContext =
    "High-yield savings accounts currently pay 4.5–5.1% APY — far above the national average of ~0.46%. Moving to a HYSA is one of the simplest ways to accelerate progress toward any goal.";

  if (timeMonths > 120) {
    return `At your current monthly contribution, it will take approximately ${years} years to reach your $${target.toLocaleString()} goal. Increasing your monthly savings by just 10% would shave significant time off that timeline. ${rateContext}`;
  }
  if (timeMonths > 36) {
    return `You're on track to hit your $${target.toLocaleString()} goal in about ${years} years. Automating your monthly transfer on payday removes the temptation to spend it first and is the most reliable consistency strategy. ${rateContext}`;
  }
  return `Strong progress — you'll reach your $${target.toLocaleString()} goal in just ${timeMonths} months. With your timeline this short, keeping funds liquid in a high-yield account makes more sense than locking them in a CD. ${rateContext}`;
}
