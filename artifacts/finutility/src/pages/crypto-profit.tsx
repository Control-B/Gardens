import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorCard } from "@/components/CalculatorCard";
import { ResultCard } from "@/components/ResultCard";
import { AIInsightCard } from "@/components/AIInsightCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calcCryptoProfit } from "@/lib/calculators";
import { generateCryptoInsight } from "@/lib/aiInsights";
import { Search } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";

export default function CryptoProfitCalculator() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [coin, setCoin] = useState(searchParams.get("coin") || "BTC");
  const [buyPrice, setBuyPrice] = useState(searchParams.get("buyPrice") || "40000");
  const [sellPrice, setSellPrice] = useState(searchParams.get("sellPrice") || "60000");
  const [qty, setQty] = useState(searchParams.get("qty") || "0.5");
  const [fees, setFees] = useState("50");
  
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    return calcCryptoProfit(
      Number(buyPrice) || 0,
      Number(sellPrice) || 0,
      Number(qty) || 0,
      Number(fees) || 0
    );
  }, [buyPrice, sellPrice, qty, fees]);

  const insight = useMemo(() => {
    return generateCryptoInsight(
      results.roi,
      results.netProfit,
      results.breakEven,
      Number(buyPrice) || 0
    );
  }, [results, buyPrice]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const intent = parseNaturalLanguage(query);
    if (intent) {
      if (intent.calculator !== "/crypto-profit-calculator") {
        setLocation(`${intent.calculator}?${new URLSearchParams(intent.params).toString()}`);
      } else {
        if(intent.params.coin) setCoin(intent.params.coin);
        if(intent.params.buyPrice) setBuyPrice(intent.params.buyPrice);
        if(intent.params.sellPrice) setSellPrice(intent.params.sellPrice);
        if(intent.params.qty) setQty(intent.params.qty);
      }
    }
  };

  const isProfit = results.netProfit >= 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="bg-white py-12 border-b border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Crypto Profit Calculator</h1>
            <p className="text-lg text-muted-foreground mb-8">Calculate your net profit, ROI, and break-even price for cryptocurrency trades.</p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g., bought 2 ETH at 2000 sold at 3500"
                className="h-14 pl-12 pr-32 text-base rounded-full shadow-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-2 h-10 rounded-full px-4">
                Calculate
              </Button>
            </form>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
            <div className="lg:col-span-4">
              <CalculatorCard title="Trade Details">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="coin">Coin/Token (Optional)</Label>
                    <Input id="coin" type="text" placeholder="e.g., BTC" value={coin} onChange={(e) => setCoin(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qty">Quantity</Label>
                    <Input id="qty" type="number" min="0" step="any" value={qty} onChange={(e) => setQty(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buyPrice">Buy Price ($)</Label>
                    <Input id="buyPrice" type="number" min="0" step="any" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellPrice">Sell Price ($)</Label>
                    <Input id="sellPrice" type="number" min="0" step="any" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} />
                  </div>
                  <div className="space-y-2 pt-4 border-t border-border">
                    <Label htmlFor="fees">Total Trading Fees ($)</Label>
                    <Input id="fees" type="number" min="0" value={fees} onChange={(e) => setFees(e.target.value)} />
                    <p className="text-xs text-muted-foreground">Include both buy and sell fees, plus any network gas fees.</p>
                  </div>
                </div>
              </CalculatorCard>
            </div>

            <div className="lg:col-span-8 flex flex-col space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultCard 
                  title="Net Profit / Loss" 
                  value={`${isProfit ? '+' : ''}$${results.netProfit.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                  valueColorClass={isProfit ? "text-green-600" : "text-red-600"}
                  subtitle={`Gross: $${results.grossProfit.toLocaleString()}`}
                />
                <ResultCard 
                  title="Return on Investment (ROI)" 
                  value={`${isProfit ? '+' : ''}${results.roi.toFixed(2)}%`}
                  valueColorClass={isProfit ? "text-green-600" : "text-red-600"}
                />
              </div>

              <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex flex-col md:flex-row items-center gap-8 mt-4">
                <div className="w-full">
                  <h3 className="font-bold text-lg mb-4">Trade Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between pb-2 border-b border-border/50">
                      <span className="text-muted-foreground">Initial Investment</span>
                      <span className="font-medium">${((Number(buyPrice) || 0) * (Number(qty) || 0)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border/50">
                      <span className="text-muted-foreground">Total Exit Value</span>
                      <span className="font-medium">${((Number(sellPrice) || 0) * (Number(qty) || 0)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border/50">
                      <span className="text-muted-foreground text-red-500">Fees Paid</span>
                      <span className="font-medium text-red-500">-${(Number(fees) || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 bg-muted/30 p-3 rounded-lg">
                      <span className="text-foreground font-bold">Break-even Price</span>
                      <span className="font-bold text-primary">${results.breakEven.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})} / {coin || 'coin'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">You must sell above the break-even price to make a profit after fees.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AdPlaceholder />

          <AIInsightCard content={insight} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-16">
            <article className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold text-foreground">Calculating Crypto Profit</h2>
              <p>Trading cryptocurrencies involves extreme volatility. Knowing your true numbers is critical to risk management.</p>
              <h3>Why Break-even Matters</h3>
              <p>Your break-even price is the price point at which your trade results in exactly $0 profit and $0 loss. It is simply your buy price plus the total fees divided by the quantity you bought. Knowing this number helps you set realistic stop-loss and take-profit orders on your exchange.</p>
              <h3>Don't Ignore the Fees</h3>
              <p>Many new traders forget to account for fees. Centralized exchanges charge a percentage on both buys and sells. Decentralized exchanges require you to pay network gas fees, which can sometimes be extremely high depending on network congestion.</p>
            </article>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <FAQAccordion items={[
                {
                  question: "What is ROI?",
                  answer: "ROI (Return on Investment) measures the profitability of your trade relative to your initial cost. An ROI of 50% means you made half your money back in profit. An ROI of 100% means you doubled your money."
                },
                {
                  question: "How do I calculate average buy price?",
                  answer: "If you bought the same coin multiple times at different prices (Dollar Cost Averaging), you calculate your average buy price by dividing the total amount of money you spent by the total number of coins you received."
                }
              ]} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
