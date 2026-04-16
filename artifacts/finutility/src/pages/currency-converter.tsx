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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MOCK_RATES } from "@/lib/calculators";
import { generateCurrencyInsight } from "@/lib/aiInsights";
import { Search, ArrowRightLeft, Zap, Clock, ShieldCheck, DollarSign, Bitcoin } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { motion } from "framer-motion";

export default function CurrencyConverter() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [amount, setAmount] = useState(searchParams.get("amount") || "1000");
  const [fromCurrency, setFromCurrency] = useState(searchParams.get("from") || "USD");
  const [toCurrency, setToCurrency] = useState(searchParams.get("to") || "EUR");
  
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const currencies = Object.keys(MOCK_RATES).sort();

  const results = useMemo(() => {
    const amt = Number(amount) || 0;
    const rateFrom = MOCK_RATES[fromCurrency] || 1;
    const rateTo = MOCK_RATES[toCurrency] || 1;
    
    // convert from base (USD) to target
    const exchangeRate = (1 / rateFrom) * rateTo;
    const converted = amt * exchangeRate;
    
    return {
      converted,
      exchangeRate
    };
  }, [amount, fromCurrency, toCurrency]);

  const insight = useMemo(() => {
    return generateCurrencyInsight(fromCurrency, toCurrency, Number(amount) || 0, results.exchangeRate);
  }, [fromCurrency, toCurrency, amount, results.exchangeRate]);

  const handleSwap = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 500);
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const intent = parseNaturalLanguage(query);
    if (intent) {
      if (intent.calculator !== "/currency-converter") {
        setLocation(`${intent.calculator}?${new URLSearchParams(intent.params).toString()}`);
      } else {
        if(intent.params.amount) setAmount(intent.params.amount);
        if(intent.params.from && MOCK_RATES[intent.params.from]) setFromCurrency(intent.params.from);
        if(intent.params.to && MOCK_RATES[intent.params.to]) setToCurrency(intent.params.to);
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Currency <br/><span className="text-blue-400">Converter</span></h1>
                <p className="text-lg text-slate-300 mb-8 max-w-xl">Convert between major global currencies instantly with live-equivalent educational rates.</p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                    <Zap className="h-4 w-4 text-yellow-400" /> Instant results
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                    <Clock className="h-4 w-4 text-blue-400" /> AI-powered insights
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                    <ShieldCheck className="h-4 w-4 text-green-400" /> Free forever
                  </div>
                </div>

                <form onSubmit={handleSearch} className="max-w-xl relative flex items-center bg-white/10 p-1.5 rounded-full backdrop-blur-md border border-white/20">
                  <Search className="absolute left-5 h-5 w-5 text-white/50" />
                  <Input
                    type="text"
                    placeholder="e.g. convert 500 USD to GBP"
                    className="h-12 pl-14 pr-32 text-base rounded-full bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button type="submit" className="absolute right-1.5 h-10 rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white">
                    Apply
                  </Button>
                </form>
              </div>

              <div className="hidden lg:flex justify-center">
                <img 
                  src="/images/currency.png" 
                  alt="Global currency symbols floating" 
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
            <div className="lg:col-span-5">
              <CalculatorCard title="Conversion Details">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-semibold">Amount</Label>
                    <div className="relative">
                      <Input 
                        id="amount" 
                        type="number" 
                        min="0" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="space-y-2 flex-1">
                      <Label className="text-sm font-semibold">From</Label>
                      <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-medium text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-6">
                      <Button variant="ghost" size="icon" onClick={handleSwap} className="rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 text-slate-500 h-12 w-12 transition-colors">
                        <ArrowRightLeft className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="space-y-2 flex-1">
                      <Label className="text-sm font-semibold">To</Label>
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-medium text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 mt-4" 
                    onClick={handleCalculate}
                  >
                    Convert Now
                  </Button>
                </div>
              </CalculatorCard>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div
                animate={isCalculating ? { scale: [1, 1.02, 1], opacity: [1, 0.8, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                  <h3 className="text-lg font-medium text-slate-500 uppercase tracking-wider mb-2">
                    {amount || 0} <span className="font-bold text-slate-900">{fromCurrency}</span> equals
                  </h3>
                  <div className="text-5xl md:text-7xl font-black text-blue-600 break-words my-4">
                    {results.converted.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-6">
                    {toCurrency}
                  </div>
                  
                  <div className="bg-slate-50 px-6 py-3 rounded-xl border border-slate-100">
                    <p className="text-sm font-medium text-slate-600">
                      1 {fromCurrency} = {results.exchangeRate.toFixed(6)} {toCurrency}
                    </p>
                  </div>
                </div>
              </motion.div>
              <p className="text-xs text-slate-400 mt-4 text-center font-medium">
                Rates are for educational purposes. Real-world rates may vary by provider.
              </p>
            </div>
          </div>

          <AdPlaceholder />

          {/* Section 4: AI Insight Card */}
          <div className="my-8">
            <AIInsightCard content={insight} />
            <div className="flex flex-wrap gap-2 mt-4 ml-2">
              <span className="text-sm font-medium text-slate-500 flex items-center mr-2">Related tools:</span>
              <a href="/crypto-profit-calculator" className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">Crypto Profit</a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            
            {/* Section 5: How the Math Works */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Understanding Exchange Rates</h2>
                <div className="prose prose-blue max-w-none text-slate-600 leading-relaxed">
                  <p>An exchange rate is the rate at which one currency will be exchanged for another. It is also regarded as the value of one country's currency in relation to another currency.</p>
                  
                  <div className="my-8 bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-sm shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-800 px-3 py-1 text-xs font-bold rounded-bl-lg text-slate-400">FORMULA</div>
                    <div className="mb-4 text-blue-400 font-bold text-lg">Target Amount = Base Amount × (1 / BaseRate) × TargetRate</div>
                    <p className="opacity-90">Where rates are measured against a common denominator (like USD).</p>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why do rates fluctuate?</h3>
                  <p>Currencies are traded on the foreign exchange market (FOREX), which is open 24 hours a day. Supply and demand dictate prices. Factors include:</p>
                  <ul className="space-y-2">
                    <li><strong>Inflation differentials:</strong> Countries with consistently lower inflation exhibit rising currency value.</li>
                    <li><strong>Interest rates:</strong> Higher interest rates offer lenders a higher return, attracting foreign capital and causing the exchange rate to rise.</li>
                    <li><strong>Public debt:</strong> Countries with large public deficits and debts are less attractive to foreign investors.</li>
                    <li><strong>Geopolitical stability:</strong> Political turmoil can cause a loss of confidence in a currency.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 6: FAQ & Related */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
                <FAQAccordion items={[
                  {
                    question: "Is this the rate my bank will give me?",
                    answer: "No. The rates shown are mid-market rates (the midpoint between buy and sell prices). Banks and exchange services typically add a margin or markup to this rate when you convert money."
                  },
                  {
                    question: "What is a 'strong' currency?",
                    answer: "A currency is considered strong when its relative value increases against other currencies. For example, if it takes fewer USD to buy 1 EUR today than it did yesterday, the USD has strengthened against the EUR."
                  },
                  {
                    question: "Should I exchange money at the airport?",
                    answer: "Usually not. Airport kiosks typically offer the worst exchange rates and highest fees because of their convenient location and lack of competition. Use a local ATM or a dedicated exchange service instead."
                  }
                ]} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Explore Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard 
                    title="Crypto Profit Calculator" 
                    description="Calculate ROI and break-even for crypto."
                    href="/crypto-profit-calculator"
                    icon={<Bitcoin className="h-6 w-6" />}
                  />
                  <ToolCard 
                    title="Compound Interest" 
                    description="See how your wealth grows over time."
                    href="/compound-interest-calculator"
                    icon={<TrendingUp className="h-6 w-6" />}
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
