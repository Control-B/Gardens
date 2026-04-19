import { useState, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorCard } from "@/components/CalculatorCard";
import { ResultCard } from "@/components/ResultCard";
import { AIInsightCard } from "@/components/AIInsightCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ToolCard } from "@/components/ToolCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calcCryptoProfit } from "@/lib/calculators";
import { generateCryptoInsight } from "@/lib/aiInsights";
import { Search, Zap, Clock, ShieldCheck, Bitcoin, DollarSign } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { motion } from "framer-motion";

export default function CryptoProfitCalculator() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [coin, setCoin] = useState(searchParams.get("coin") || "BTC");
  const [buyPrice, setBuyPrice] = useState(searchParams.get("buyPrice") || "40000");
  const [sellPrice, setSellPrice] = useState(searchParams.get("sellPrice") || "60000");
  const [qty, setQty] = useState(searchParams.get("qty") || "0.5");
  const [fees, setFees] = useState("50");
  
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

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

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 500);
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isProfit = results.netProfit >= 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-24 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Crypto Profit <br/><span className="text-orange-400">Calculator</span></h1>
                <p className="text-lg text-slate-300 mb-8 max-w-xl">Calculate your true net profit, ROI, and break-even price for cryptocurrency trades after fees.</p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                    <Zap className="h-4 w-4 text-yellow-400" /> Instant results
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                    <Clock className="h-4 w-4 text-blue-400" /> Financial Insights
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                    <ShieldCheck className="h-4 w-4 text-green-400" /> Free forever
                  </div>
                </div>

                <form onSubmit={handleSearch} className="max-w-xl relative flex items-center bg-white/10 p-1.5 rounded-full backdrop-blur-md border border-white/20">
                  <Search className="absolute left-5 h-5 w-5 text-white/50" />
                  <Input
                    type="text"
                    placeholder="e.g. bought 2 ETH at 2000 sold at 3500"
                    className="h-12 pl-14 pr-32 text-base rounded-full bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button type="submit" className="absolute right-1.5 h-10 rounded-full px-6 bg-orange-500 hover:bg-orange-600 text-white">
                    Apply
                  </Button>
                </form>
              </div>

              <div className="hidden lg:flex justify-center">
                <img 
                  src="/images/crypto.png" 
                  alt="Glowing crypto coins" 
                  className="w-full max-w-md rounded-2xl shadow-2xl border border-white/10 object-cover aspect-4/3"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          {/* Section 2: Calculator Tool */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8" ref={resultsRef}>
            <div className="lg:col-span-4">
              <CalculatorCard title="Trade Details">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="coin" className="text-sm font-semibold">Coin/Token <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                    <Input 
                      id="coin" 
                      type="text" 
                      placeholder="e.g., BTC" 
                      className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 uppercase focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      value={coin} 
                      onChange={(e) => setCoin(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qty" className="text-sm font-semibold">Quantity Purchased</Label>
                    <Input 
                      id="qty" 
                      type="number" 
                      min="0" 
                      step="any" 
                      className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      value={qty} 
                      onChange={(e) => setQty(e.target.value)} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buyPrice" className="text-sm font-semibold">Buy Price</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-slate-500">$</span></div>
                        <Input id="buyPrice" type="number" min="0" step="any" className="pl-8 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-orange-500 focus-visible:border-orange-500" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sellPrice" className="text-sm font-semibold">Sell Price</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-slate-500">$</span></div>
                        <Input id="sellPrice" type="number" min="0" step="any" className="pl-8 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-orange-500 focus-visible:border-orange-500" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <Label htmlFor="fees" className="text-sm font-semibold">Total Trading Fees</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-slate-500">$</span></div>
                      <Input id="fees" type="number" min="0" className="pl-8 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-orange-500 focus-visible:border-orange-500" value={fees} onChange={(e) => setFees(e.target.value)} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Include buy/sell exchange fees and network gas.</p>
                  </div>
                  
                  <Button 
                    className="w-full h-14 text-lg font-bold rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20" 
                    onClick={handleCalculate}
                  >
                    Calculate Profit
                  </Button>
                </div>
              </CalculatorCard>
            </div>

            <div className="lg:col-span-8 flex flex-col space-y-6">
              <motion.div 
                animate={isCalculating ? { scale: [1, 1.02, 1], opacity: [1, 0.8, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <ResultCard 
                  title="Net Profit / Loss" 
                  value={`${isProfit ? '+' : ''}$${Math.abs(results.netProfit).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                  valueColorClass={isProfit ? "text-emerald-600" : "text-rose-600"}
                  subtitle={`Gross: $${results.grossProfit.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                />
                <ResultCard 
                  title="Return on Investment (ROI)" 
                  value={`${isProfit ? '+' : ''}${results.roi.toFixed(2)}%`}
                  valueColorClass={isProfit ? "text-emerald-600" : "text-rose-600"}
                />
              </motion.div>

              {/* Section 3: Detailed Breakdown */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                <h3 className="font-black text-xl text-slate-900 mb-6">Trade Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Initial Investment</span>
                    <span className="font-bold text-slate-900">${((Number(buyPrice) || 0) * (Number(qty) || 0)).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Total Exit Value</span>
                    <span className="font-bold text-slate-900">${((Number(sellPrice) || 0) * (Number(qty) || 0)).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Fees Paid</span>
                    <span className="font-bold text-rose-500">-${(Number(fees) || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 bg-orange-50 p-4 rounded-xl mt-4">
                    <div className="flex flex-col">
                      <span className="text-slate-900 font-bold">Break-even Price</span>
                      <span className="text-xs text-slate-500 font-medium">Sell above this to profit</span>
                    </div>
                    <span className="font-black text-2xl text-orange-600">${results.breakEven.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})} <span className="text-base text-orange-400 font-bold uppercase">/ {coin || 'coin'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AdPlaceholder />

          {/* Section 4: AI Insight Card */}
          <div className="my-8">
            <AIInsightCard content={insight} />
            <div className="flex flex-wrap gap-2 mt-4 ml-2">
              <span className="text-sm font-medium text-slate-500 flex items-center mr-2">Related tools:</span>
              <a href="/currency-converter" className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">Currency Converter</a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            
            {/* Section 5: How the Math Works */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Calculating Crypto Profit</h2>
                <div className="prose prose-blue max-w-none text-slate-600 leading-relaxed">
                  <p>Trading cryptocurrencies involves extreme volatility. Knowing your true numbers is critical to risk management.</p>
                  
                  <div className="my-8 bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-sm shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-800 px-3 py-1 text-xs font-bold rounded-bl-lg text-slate-400">FORMULA</div>
                    <div className="mb-4 text-blue-400 font-bold text-lg">Net Profit = [(Sell Price - Buy Price) × Qty] - Fees</div>
                    <div className="mb-4 text-orange-400 font-bold text-lg">ROI = (Net Profit / Initial Investment) × 100</div>
                    <p className="opacity-90">Where Initial Investment = Buy Price × Qty</p>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why Break-even Matters</h3>
                  <p>Your break-even price is the price point at which your trade results in exactly $0 profit and $0 loss. It is simply your buy price plus the total fees divided by the quantity you bought. Knowing this number helps you set realistic stop-loss and take-profit orders on your exchange.</p>
                  
                  <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">Don't Ignore the Fees</h3>
                  <p>Many new traders forget to account for fees. Centralized exchanges charge a percentage on both buys and sells. Decentralized exchanges require you to pay network gas fees, which can sometimes be extremely high depending on network congestion.</p>
                </div>
              </div>
            </div>

            {/* Section 6: FAQ & Related */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
                <FAQAccordion items={[
                  {
                    question: "What is ROI?",
                    answer: "ROI (Return on Investment) measures the profitability of your trade relative to your initial cost. An ROI of 50% means you made half your money back in profit. An ROI of 100% means you doubled your money."
                  },
                  {
                    question: "How do I calculate average buy price?",
                    answer: "If you bought the same coin multiple times at different prices (Dollar Cost Averaging), you calculate your average buy price by dividing the total amount of money you spent by the total number of coins you received."
                  },
                  {
                    question: "Do I need to pay taxes on crypto gains?",
                    answer: "In most jurisdictions, yes. Cryptocurrency trades are generally subject to capital gains tax. You should track your profit and loss accurately and consult a tax professional in your region."
                  }
                ]} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Explore Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard 
                    title="Currency Converter" 
                    description="Convert fiat values to estimate capital."
                    href="/currency-converter"
                    icon={<DollarSign className="h-6 w-6" />}
                  />
                  <ToolCard 
                    title="Compound Interest" 
                    description="See how your wealth grows over time."
                    href="/compound-interest-calculator"
                    icon={<Zap className="h-6 w-6" />}
                  />
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
