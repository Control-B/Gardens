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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MOCK_RATES } from "@/lib/calculators";
import { generateCurrencyInsight } from "@/lib/aiInsights";
import { Search, ArrowRightLeft } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";

export default function CurrencyConverter() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [amount, setAmount] = useState(searchParams.get("amount") || "1000");
  const [fromCurrency, setFromCurrency] = useState(searchParams.get("from") || "USD");
  const [toCurrency, setToCurrency] = useState(searchParams.get("to") || "EUR");
  
  const [query, setQuery] = useState("");

  const currencies = Object.keys(MOCK_RATES).sort();

  const results = useMemo(() => {
    const amt = Number(amount) || 0;
    const rateFrom = MOCK_RATES[fromCurrency] || 1;
    const rateTo = MOCK_RATES[toCurrency] || 1;
    
    // convert from base (USD) to target
    // rate in MOCK_RATES is USD -> target
    // so USD -> EUR is 0.92
    // EUR -> USD is 1 / 0.92
    // EUR -> GBP is (1 / EUR_RATE) * GBP_RATE
    
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="bg-white py-12 border-b border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Currency Converter</h1>
            <p className="text-lg text-muted-foreground mb-8">Convert between major global currencies with ease.</p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g., convert 500 USD to GBP"
                className="h-14 pl-12 pr-32 text-base rounded-full shadow-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-2 h-10 rounded-full px-4">
                Convert
              </Button>
            </form>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
            <div className="lg:col-span-5">
              <CalculatorCard title="Conversion Details">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} className="text-lg" />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="space-y-2 flex-1">
                      <Label>From</Label>
                      <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-6">
                      <Button variant="ghost" size="icon" onClick={handleSwap} className="rounded-full bg-muted/50 hover:bg-muted text-primary">
                        <ArrowRightLeft className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2 flex-1">
                      <Label>To</Label>
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CalculatorCard>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <ResultCard 
                title={`${amount || 0} ${fromCurrency} equals`}
                value={`${results.converted.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${toCurrency}`}
                subtitle={`1 ${fromCurrency} = ${results.exchangeRate.toFixed(6)} ${toCurrency}`}
              />
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Rates are for educational purposes. Real-world rates may vary by provider.
              </p>
            </div>
          </div>

          <AdPlaceholder />

          <AIInsightCard content={insight} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-16">
            <article className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold text-foreground">Understanding Exchange Rates</h2>
              <p>An exchange rate is the rate at which one currency will be exchanged for another. It is also regarded as the value of one country's currency in relation to another currency.</p>
              <h3>Why do rates fluctuate?</h3>
              <p>Currencies are traded on the foreign exchange market (FOREX), which is open 24 hours a day. Supply and demand dictate prices. Factors include:</p>
              <ul>
                <li>Inflation differentials between countries</li>
                <li>Interest rate changes by central banks</li>
                <li>Public debt and economic performance</li>
                <li>Geopolitical stability</li>
              </ul>
            </article>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <FAQAccordion items={[
                {
                  question: "Is this the rate my bank will give me?",
                  answer: "No. The rates shown are mid-market rates (the midpoint between buy and sell prices). Banks and exchange services typically add a margin or markup to this rate when you convert money."
                },
                {
                  question: "What is a 'strong' currency?",
                  answer: "A currency is considered strong when its relative value increases against other currencies. For example, if it takes fewer USD to buy 1 EUR today than it did yesterday, the USD has strengthened against the EUR."
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
