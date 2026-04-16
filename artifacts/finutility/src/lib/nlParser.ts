export interface ParsedIntent {
  calculator: string;
  params: Record<string, string>;
}

export function parseNaturalLanguage(input: string): ParsedIntent | null {
  const lowerInput = input.toLowerCase();
  
  // Compound Interest: "compound interest on 10000 at 5% for 10 years"
  if (lowerInput.includes("compound interest") || lowerInput.includes("compound")) {
    const amountMatch = lowerInput.match(/on\s+\$?([\d,]+)/) || lowerInput.match(/\$?([\d,]+)\s+at/);
    const rateMatch = lowerInput.match(/at\s+([\d.]+)\s*%/);
    const yearsMatch = lowerInput.match(/for\s+([\d.]+)\s*years/);
    
    return {
      calculator: "/compound-interest-calculator",
      params: {
        principal: amountMatch ? amountMatch[1].replace(/,/g, '') : "",
        rate: rateMatch ? rateMatch[1] : "",
        years: yearsMatch ? yearsMatch[1] : "",
      }
    };
  }

  // Mortgage: "mortgage on 500000 with 20% down at 6.5%"
  if (lowerInput.includes("mortgage")) {
    const amountMatch = lowerInput.match(/on\s+\$?([\d,]+)/) || lowerInput.match(/\$?([\d,]+)/);
    const downMatch = lowerInput.match(/with\s+([\d.]+)\s*%\s*down/) || lowerInput.match(/([\d.]+)\s*%\s*down/);
    const rateMatch = lowerInput.match(/at\s+([\d.]+)\s*%/);
    
    return {
      calculator: "/mortgage-calculator",
      params: {
        homePrice: amountMatch ? amountMatch[1].replace(/,/g, '') : "",
        downPaymentPercent: downMatch ? downMatch[1] : "",
        rate: rateMatch ? rateMatch[1] : "",
      }
    };
  }

  // Crypto: "bought 2 btc at 40000 sold at 60000"
  if (lowerInput.includes("bought") && lowerInput.includes("at")) {
    const qtyMatch = lowerInput.match(/bought\s+([\d.]+)\s+([a-z]+)/);
    const buyMatch = lowerInput.match(/at\s+\$?([\d,]+)/);
    const sellMatch = lowerInput.match(/(?:sold|now)\s+at\s+\$?([\d,]+)/) || lowerInput.match(/and\s+sold\s+for\s+\$?([\d,]+)/);
    
    return {
      calculator: "/crypto-profit-calculator",
      params: {
        qty: qtyMatch ? qtyMatch[1] : "",
        coin: qtyMatch ? qtyMatch[2].toUpperCase() : "",
        buyPrice: buyMatch ? buyMatch[1].replace(/,/g, '') : "",
        sellPrice: sellMatch ? sellMatch[1].replace(/,/g, '') : "",
      }
    };
  }

  // Loan: "loan of 20000 at 5% for 60 months"
  if (lowerInput.includes("loan") || lowerInput.includes("car payment") || lowerInput.includes("auto payment")) {
    const amountMatch = lowerInput.match(/(?:of|on)\s+\$?([\d,]+)/) || lowerInput.match(/\$?([\d,]+)/);
    const rateMatch = lowerInput.match(/at\s+([\d.]+)\s*%/);
    const monthsMatch = lowerInput.match(/for\s+([\d.]+)\s*months/);
    
    return {
      calculator: "/loan-payment-calculator",
      params: {
        loanAmount: amountMatch ? amountMatch[1].replace(/,/g, '') : "",
        rate: rateMatch ? rateMatch[1] : "",
        termMonths: monthsMatch ? monthsMatch[1] : "",
      }
    };
  }

  // Currency: "convert 100 usd to eur"
  if (lowerInput.includes("convert") || lowerInput.includes("exchange")) {
    const amountMatch = lowerInput.match(/(?:convert|exchange)\s+([\d,.]+)/);
    const fromMatch = lowerInput.match(/([\d,.]+)\s+([a-z]{3})/);
    const toMatch = lowerInput.match(/to\s+([a-z]{3})/);
    
    return {
      calculator: "/currency-converter",
      params: {
        amount: amountMatch ? amountMatch[1].replace(/,/g, '') : "",
        from: fromMatch ? fromMatch[2].toUpperCase() : "",
        to: toMatch ? toMatch[1].toUpperCase() : "",
      }
    };
  }

  return null;
}
