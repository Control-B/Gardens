import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Calculator, Home, Briefcase, Bitcoin, PiggyBank, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { CategoryCard } from "@/components/CategoryCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { parseNaturalLanguage } from "@/lib/nlParser";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const intent = parseNaturalLanguage(query);
    if (intent) {
      const searchParams = new URLSearchParams(intent.params).toString();
      setLocation(`${intent.calculator}?${searchParams}`);
    } else {
      // Default fallback
      setLocation("/compound-interest-calculator");
    }
  };

  const setExampleQuery = (text: string) => {
    setQuery(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 md:px-8 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-6">
            Calculate anything <span className="text-primary">instantly</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Your smart financial hub for compound interest, mortgages, loans, and crypto profit. Fast, free, and secure.
          </p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative flex items-center mb-6">
            <Search className="absolute left-4 h-6 w-6 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Calculate compound interest on $10,000 at 5% for 5 years"
              className="h-16 pl-14 pr-36 text-lg rounded-full border-2 border-border focus-visible:border-primary shadow-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-testid="input-hero-search"
            />
            <Button 
              type="submit" 
              className="absolute right-2 h-12 rounded-full px-6 font-bold"
              data-testid="btn-hero-calculate"
            >
              Calculate
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm text-muted-foreground">
            <span>Try:</span>
            <button onClick={() => setExampleQuery("mortgage on 500000 with 20% down at 6.5%")} className="hover:text-primary transition-colors underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary">
              Estimate monthly mortgage
            </button>
            <span className="hidden md:inline">•</span>
            <button onClick={() => setExampleQuery("loan of 25000 at 7% for 60 months")} className="hover:text-primary transition-colors underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary">
              Car loan payment
            </button>
            <span className="hidden md:inline">•</span>
            <button onClick={() => setExampleQuery("bought 2 ETH at 1500 sold at 3000")} className="hover:text-primary transition-colors underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary">
              Crypto profit
            </button>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 pb-8">
          <AdPlaceholder />
        </div>

        {/* Featured Calculators Grid */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Featured Calculators</h2>
              <p className="text-muted-foreground">Powerful tools to make smarter financial decisions.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard 
                title="Compound Interest" 
                description="See how your money can grow exponentially over time with regular contributions."
                href="/compound-interest-calculator"
                icon={<TrendingUp className="h-6 w-6" />}
              />
              <ToolCard 
                title="Mortgage Calculator" 
                description="Estimate your monthly mortgage payments including taxes and insurance."
                href="/mortgage-calculator"
                icon={<Home className="h-6 w-6" />}
              />
              <ToolCard 
                title="Loan Payment" 
                description="Calculate your monthly payments and total interest for any type of loan."
                href="/loan-payment-calculator"
                icon={<Briefcase className="h-6 w-6" />}
              />
              <ToolCard 
                title="Currency Converter" 
                description="Check live exchange rates and convert between over 20 global currencies."
                href="/currency-converter"
                icon={<DollarSign className="h-6 w-6" />}
              />
              <ToolCard 
                title="Crypto Profit" 
                description="Calculate your net profit, ROI, and break-even price for crypto trades."
                href="/crypto-profit-calculator"
                icon={<Bitcoin className="h-6 w-6" />}
              />
              <ToolCard 
                title="Savings Goal" 
                description="Find out how much you need to save monthly to reach your financial target."
                href="/savings-goal-calculator"
                icon={<PiggyBank className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-16">How FinUtility AI Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
              <div>
                <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                <h3 className="text-xl font-bold mb-3">Ask in plain English</h3>
                <p className="text-muted-foreground leading-relaxed">Type your financial scenario exactly as you'd say it. Our AI parses your numbers and intents instantly.</p>
              </div>
              <div>
                <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-xl font-bold mb-3">Review calculations</h3>
                <p className="text-muted-foreground leading-relaxed">Get accurate, deterministic math instantly mapped to interactive charts and detailed amortization tables.</p>
              </div>
              <div>
                <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-xl font-bold mb-3">Gain insights</h3>
                <p className="text-muted-foreground leading-relaxed">Read AI-generated contextual insights to understand the 'why' behind the numbers and make better choices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CategoryCard 
                title="Finance" 
                description="Wealth building and saving tools."
                href="/finance"
                icon={<TrendingUp className="h-8 w-8" />}
                colorClass="text-green-600 bg-green-100"
              />
              <CategoryCard 
                title="Crypto" 
                description="Trading and ROI calculators."
                href="/crypto"
                icon={<Bitcoin className="h-8 w-8" />}
                colorClass="text-orange-500 bg-orange-100"
              />
              <CategoryCard 
                title="Loans" 
                description="Debt and mortgage planning."
                href="/loans"
                icon={<Home className="h-8 w-8" />}
                colorClass="text-purple-600 bg-purple-100"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Frequently Asked Questions</h2>
            <FAQAccordion items={[
              {
                question: "Are these calculators free to use?",
                answer: "Yes, all calculators and tools on FinUtility AI are completely free to use. We support the site through unobtrusive advertising."
              },
              {
                question: "Is my financial data saved or shared?",
                answer: "No. All calculations are performed directly in your browser. We do not store your numbers, send them to a server, or share them with any third parties."
              },
              {
                question: "How accurate are the results?",
                answer: "Our calculators use standard financial formulas to ensure high accuracy. However, they provide estimates for educational purposes and should not be considered formal financial advice. Always consult with a lender or financial advisor for exact numbers."
              },
              {
                question: "What does the AI Insight feature do?",
                answer: "The AI Insight feature analyzes the results of your calculation to provide a plain-English explanation of what the numbers mean for you. For example, it might highlight how much interest you could save by paying a loan off faster."
              },
              {
                question: "How often are currency rates updated?",
                answer: "Currently, we use a fixed set of reference rates for demonstration. In a production environment, these would be updated hourly from global financial APIs."
              }
            ]} />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
