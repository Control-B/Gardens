export function generateCompoundInterestInsight(principal: number, finalValue: number, years: number): string {
  if (finalValue === 0) return "Enter your numbers to see how your money can grow over time through compound interest.";
  const multiplier = (finalValue / (principal || 1)).toFixed(1);
  if (Number(multiplier) > 2) {
    return `Over ${years} years, your investment has grown by a factor of ${multiplier}x. This demonstrates the powerful compounding effect where you earn interest on your previous interest. Keeping your money invested for longer periods significantly accelerates this growth curve.`;
  }
  return `By investing for ${years} years, your money is steadily growing. The longer you let it compound, the faster it will grow in the later years. Consider increasing your monthly contributions or extending the timeline to see a dramatic difference in the final amount.`;
}

export function generateMortgageInsight(principalAndInterest: number, totalPayment: number, totalInterest: number, loanAmount: number): string {
  if (totalPayment === 0) return "Enter your home details to see your estimated monthly payments and cost breakdown.";
  const nonPrincipalRatio = ((totalPayment - principalAndInterest) / totalPayment) * 100;
  let insight = `Your monthly payment includes principal and interest, plus taxes, insurance, and fees. `;
  if (nonPrincipalRatio > 30) {
    insight += `Note that over ${nonPrincipalRatio.toFixed(0)}% of your monthly payment goes toward taxes and insurance. `;
  }
  if (totalInterest > loanAmount) {
    insight += `Over the life of this loan, you will pay more in interest than the original borrowed amount. You might consider a shorter term or a larger down payment to reduce total interest costs.`;
  } else {
    insight += `Your interest costs are relatively contained. Making small extra payments toward your principal each month can help you pay off the loan even faster and save on total interest.`;
  }
  return insight;
}

export function generateLoanInsight(payment: number, interest: number, amount: number, months: number): string {
  if (payment === 0) return "Enter your loan details to view your payment schedule and interest costs.";
  const years = (months / 12).toFixed(1);
  return `You are scheduled to pay off this loan in ${years} years. You'll be paying a total of $${interest.toLocaleString(undefined, {maximumFractionDigits:0})} in interest on top of your original $${amount.toLocaleString()} borrowed. Consider paying a bit extra each month directly to the principal to shorten the term and reduce interest.`;
}

export function generateCurrencyInsight(from: string, to: string, amount: number, rate: number): string {
  if (amount === 0 || !rate) return "Select currencies to view the current exchange rate.";
  return `The current exchange rate means 1 ${from} is worth ${rate.toFixed(4)} ${to}. Currency rates fluctuate constantly based on global economic conditions, inflation, and central bank policies.`;
}

export function generateCryptoInsight(roi: number, netProfit: number, breakEven: number, buyPrice: number): string {
  if (buyPrice === 0) return "Enter your trade details to calculate your crypto profit and ROI.";
  if (netProfit > 0) {
    return `You have a positive ROI of ${roi.toFixed(2)}%. After accounting for fees, your net profit is $${netProfit.toLocaleString()}. Ensure you set aside a portion of these gains for potential capital gains taxes depending on your local jurisdiction.`;
  } else if (netProfit < 0) {
    return `You are currently at a loss with an ROI of ${roi.toFixed(2)}%. To break even (including fees), the asset needs to reach a price of $${breakEven.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})}. Consider your overall portfolio risk before making further moves.`;
  } else {
    return `You are currently breaking even. The price exactly covers your initial investment plus fees.`;
  }
}

export function generateSavingsInsight(target: number, current: number, monthly: number, timeMonths: number): string {
  if (target === 0) return "Define your savings goal to get a personalized timeline and strategy.";
  const years = (timeMonths / 12).toFixed(1);
  if (timeMonths > 120) {
    return `It will take approximately ${years} years to reach your goal of $${target.toLocaleString()}. To achieve this faster, consider increasing your monthly contributions or exploring investment options with a higher historical yield, though remember that higher returns come with higher risk.`;
  }
  return `You are on track to hit your goal in about ${years} years (${timeMonths} months). Consistency is key—setting up automated monthly transfers can help ensure you never miss a contribution and reach your target on time.`;
}
