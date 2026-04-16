// Compound interest: A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
export function calcCompoundInterest(principal: number, rate: number, years: number, frequency: string, monthlyContribution: number) {
  const r = rate / 100;
  const n = frequency === "Annually" ? 1 : frequency === "Monthly" ? 12 : 365;
  const t = years;
  const pmt = monthlyContribution;

  const principalGrowth = principal * Math.pow(1 + r / n, n * t);
  const contributionGrowth = pmt > 0 ? pmt * ((Math.pow(1 + r / n, n * t) - 1) / (r / n)) * (frequency === "Monthly" ? 1 : (frequency === "Annually" ? 12 : 12/365)) : 0; // rough approx for non-monthly pmt, let's keep it simple for the PMT formula

  let realPmtContribution = 0;
  if(pmt > 0) {
      if(frequency === "Monthly") {
         realPmtContribution = pmt * ((Math.pow(1 + r/n, n*t) - 1) / (r/n));
      } else if(frequency === "Annually") {
         const r_annual = r;
         realPmtContribution = (pmt * 12) * ((Math.pow(1 + r_annual, t) - 1) / (r_annual));
      } else {
          // daily
          const r_daily = r/365;
          realPmtContribution = (pmt * 12 / 365) * ((Math.pow(1 + r_daily, 365*t) - 1) / (r_daily));
      }
  }

  const futureValue = principalGrowth + realPmtContribution;
  const totalContributions = principal + (pmt * 12 * years);
  const totalInterestEarned = futureValue - totalContributions;

  const yearlyData = [];
  let currentPrincipal = principal;
  for (let year = 1; year <= years; year++) {
      let pGrowth = principal * Math.pow(1 + r / n, n * year);
      let cGrowth = 0;
      if(pmt > 0) {
          if(frequency === "Monthly") {
             cGrowth = pmt * ((Math.pow(1 + r/n, n*year) - 1) / (r/n));
          } else if(frequency === "Annually") {
             const r_annual = r;
             cGrowth = (pmt * 12) * ((Math.pow(1 + r_annual, year) - 1) / (r_annual));
          } else {
              const r_daily = r/365;
              cGrowth = (pmt * 12 / 365) * ((Math.pow(1 + r_daily, 365*year) - 1) / (r_daily));
          }
      }
      let yearEndValue = pGrowth + cGrowth;
      let totalContribToDate = principal + (pmt * 12 * year);
      yearlyData.push({
          year,
          principal: totalContribToDate,
          interest: yearEndValue - totalContribToDate,
          balance: yearEndValue
      });
  }

  return { futureValue, totalContributions, totalInterestEarned, yearlyData };
}

// Mortgage: M = P[r(1+r)^n]/[(1+r)^n-1]
export function calcMortgage(homePrice: number, downPaymentAmount: number, rate: number, termYears: number, monthlyTax: number, monthlyInsurance: number, hoa: number) {
  const p = homePrice - downPaymentAmount;
  const r = rate / 100 / 12;
  const n = termYears * 12;

  let m = 0;
  if (r > 0) {
    m = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else {
    m = p / n;
  }

  const totalMonthlyPayment = m + monthlyTax + monthlyInsurance + hoa;
  const totalCost = (m * n) + downPaymentAmount; // Total cost of home including interest
  const totalInterest = (m * n) - p;

  return {
      monthlyPayment: totalMonthlyPayment,
      principalAndInterest: m,
      totalInterest,
      totalCost,
      tax: monthlyTax,
      insurance: monthlyInsurance,
      hoa
  };
}

// Loan payment: same amortization formula
export function calcLoanPayment(loanAmount: number, rate: number, termMonths: number) {
  const p = loanAmount;
  const r = rate / 100 / 12;
  const n = termMonths;

  let m = 0;
  if (r > 0) {
    m = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else {
    m = p / n;
  }

  const totalRepayment = m * n;
  const totalInterest = totalRepayment - p;

  return {
      paymentAmount: m,
      totalInterest,
      totalRepayment
  };
}

// Crypto ROI: profit = (sellPrice - buyPrice) * qty - fees; ROI = profit / (buyPrice * qty)
export function calcCryptoProfit(buyPrice: number, sellPrice: number, qty: number, fees: number) {
  const initialInvestment = buyPrice * qty;
  const grossProfit = (sellPrice - buyPrice) * qty;
  const netProfit = grossProfit - fees;
  const roi = initialInvestment > 0 ? (netProfit / initialInvestment) * 100 : 0;
  const breakEven = buyPrice + (fees / qty);

  return {
      grossProfit,
      netProfit,
      roi,
      breakEven
  };
}

// Savings goal: use FV formula to find time or required contribution
export function calcSavingsGoal(target: number, currentSavings: number, monthlyContribution: number, annualReturn: number, timelineMonths: number) {
  const r = annualReturn / 100 / 12;
  
  // If timeline is fixed, find required monthly savings
  let requiredMonthly = 0;
  if (timelineMonths > 0) {
      if(r > 0) {
        // target = current * (1+r)^n + PMT * ((1+r)^n - 1) / r
        const futureCurrent = currentSavings * Math.pow(1 + r, timelineMonths);
        const diff = target - futureCurrent;
        requiredMonthly = diff / (((Math.pow(1 + r, timelineMonths) - 1) / r));
      } else {
        requiredMonthly = (target - currentSavings) / timelineMonths;
      }
      requiredMonthly = Math.max(0, requiredMonthly); // don't return negative if already reached
  }

  // Find time to target with given monthly contribution
  let monthsToTarget = 0;
  if (monthlyContribution > 0) {
      let balance = currentSavings;
      let m = 0;
      while(balance < target && m < 1200) { // cap at 100 years
          balance = balance * (1 + r) + monthlyContribution;
          m++;
      }
      monthsToTarget = m;
  }

  return {
      timeToTargetMonths: monthsToTarget,
      requiredMonthlySavings: requiredMonthly,
  };
}

// Mock currency rates (USD base)
export const MOCK_RATES: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.5,
    CAD: 1.36,
    AUD: 1.35,
    CHF: 0.88,
    CNY: 7.23,
    INR: 83.15,
    BRL: 82.90,
    MXN: 17.15,
    ZAR: 18.90,
    SGD: 1.34,
    NZD: 1.34,
    HKD: 1.34,
    SEK: 1.62,
    KRW: 10.45,
    NOK: 10.50,
    DKK: 10.60,
    AED: 1.34
};
