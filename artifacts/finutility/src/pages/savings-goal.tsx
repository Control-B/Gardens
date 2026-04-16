import { useState, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorCard } from "@/components/CalculatorCard";
import { ResultCard } from "@/components/ResultCard";
import { AIInsightCard } from "@/components/AIInsightCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ChartModule } from "@/components/ChartModule";
import { ToolCard } from "@/components/ToolCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calcSavingsGoal } from "@/lib/calculators";
import { generateSavingsInsight } from "@/lib/aiInsights";
import { Search, Zap, Clock, ShieldCheck, PiggyBank, Home, TrendingUp } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { motion } from "framer-motion";

export default function SavingsGoalCalculator() {
  const [location, setLocation] = useLocation();
  
  const [targetAmount, setTargetAmount] = useState("50000");
  const [currentSavings, setCurrentSavings] = useState("5000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("5");
  const [timelineMonths, setTimelineMonths] = useState("60");
  
  const [calcMode, setCalcMode] = useState<"time" | "required">("time");
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const results = useMemo(() => {
    return calcSavingsGoal(
      Number(targetAmount) || 0,
      Number(currentSavings) || 0,
      Number(monthlyContribution) || 0,
      Number(annualReturn) || 0,
      Number(timelineMonths) || 0
    );
  }, [targetAmount, currentSavings, monthlyContribution, annualReturn, timelineMonths]);

  const insight = useMemo(() => {
    return generateSavingsInsight(
      Number(targetAmount) || 0,
      Number(currentSavings) || 0,
      Number(monthlyContribution) || 0,
      calcMode === "time" ? results.timeToTargetMonths : Number(timelineMonths) || 0
    );
  }, [results, targetAmount, currentSavings, monthlyContribution, calcMode, timelineMonths]);

  const chartData = useMemo(() => {
    const data = [];
    const r = (Number(annualReturn) || 0) / 100 / 12;
    const pmt = calcMode === "time" ? (Number(monthlyContribution) || 0) : results.requiredMonthlySavings;
    const months = calcMode === "time" ? results.timeToTargetMonths : (Number(timelineMonths) || 0);
    const target = Number(targetAmount) || 0;
    
    let balance = Number(currentSavings) || 0;
    let totalInvested = balance;
    
    // limit to reasonable amount of points for the chart
    const step = Math.max(1, Math.floor(months / 20));
    
    for (let m = 0; m <= months; m++) {
      if (m > 0) {
        balance = balance * (1 + r) + pmt;
        totalInvested += pmt;
      }
      
      if (m % step === 0 || m === months) {
        data.push({
          month: `M${m}`,
          total: Math.min(balance, target), // don't overshoot visually wildly
          contributions: Math.min(totalInvested, target)
        });
      }
      if(balance >= target) break;
    }
    return data;
  }, [currentSavings, annualReturn, calcMode, monthlyContribution, results, timelineMonths, targetAmount]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const intent = parseNaturalLanguage(query);
    if (intent) {
      setLocation(`${intent.calculator}?${new URLSearchParams(intent.params).toString()}`);
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Savings Goal <br/><span className="text-blue-400">Calculator</span></h1>
                <p className="text-lg text-slate-300 mb-8 max-w-xl">Determine how much you need to save or exactly how long it will take to reach your financial target.</p>
                
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
                    placeholder="What do you want to calculate?"
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
                  src="/images/savings.png" 
                  alt="Savings jar with house" 
                  className="w-full max-w-md rounded-2xl shadow-2xl border border-white/10 object-cover aspect-4/3 bg-white"
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
              <CalculatorCard title="Goal Details">
                <div className="space-y-6">
                  <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl mb-4">
                    <Button 
                      type="button" 
                      variant={calcMode === "time" ? "default" : "ghost"} 
                      className={`flex-1 rounded-lg font-bold ${calcMode === "time" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"}`}
                      onClick={() => setCalcMode("time")}
                    >Find Time</Button>
                    <Button 
                      type="button" 
                      variant={calcMode === "required" ? "default" : "ghost"} 
                      className={`flex-1 rounded-lg font-bold ${calcMode === "required" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"}`}
                      onClick={() => setCalcMode("required")}
                    >Find Amount</Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAmount" className="text-sm font-semibold">Target Goal Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-slate-500 font-medium">$</span></div>
                      <Input id="targetAmount" type="number" min="0" className="pl-8 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentSavings" className="text-sm font-semibold">Current Savings</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-slate-500 font-medium">$</span></div>
                      <Input id="currentSavings" type="number" min="0" className="pl-8 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualReturn" className="text-sm font-semibold">Expected Annual Return</Label>
                    <div className="relative">
                      <Input id="annualReturn" type="number" step="0.1" className="pr-8 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="text-slate-500 font-medium">%</span></div>
                    </div>
                  </div>

                  {calcMode === "time" ? (
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      <Label htmlFor="monthlyContribution" className="text-blue-600 font-bold">I plan to save monthly</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-slate-500 font-medium">$</span></div>
                        <Input id="monthlyContribution" type="number" min="0" className="pl-8 text-lg font-medium h-12 rounded-xl bg-blue-50 border-blue-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      <Label htmlFor="timelineMonths" className="text-blue-600 font-bold">I want to reach this in (months)</Label>
                      <Input id="timelineMonths" type="number" min="1" className="text-lg font-medium h-12 rounded-xl bg-blue-50 border-blue-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" value={timelineMonths} onChange={(e) => setTimelineMonths(e.target.value)} />
                      <p className="text-xs font-semibold text-slate-500 mt-1">{Math.floor(Number(timelineMonths)/12)} years, {Number(timelineMonths)%12} months</p>
                    </div>
                  )}

                  <Button 
                    className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20" 
                    onClick={handleCalculate}
                  >
                    Calculate Target
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
                {calcMode === "time" ? (
                  <>
                    <ResultCard 
                      title="Time to Target" 
                      value={`${Math.floor(results.timeToTargetMonths / 12)}y ${results.timeToTargetMonths % 12}m`}
                      subtitle={`${results.timeToTargetMonths} total months`}
                    />
                    <ResultCard 
                      title="Target Amount" 
                      value={`$${Number(targetAmount).toLocaleString()}`}
                      valueColorClass="text-slate-900"
                    />
                  </>
                ) : (
                  <>
                    <ResultCard 
                      title="Required Monthly Savings" 
                      value={`$${results.requiredMonthlySavings.toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:0})}`}
                    />
                    <ResultCard 
                      title="Target Amount" 
                      value={`$${Number(targetAmount).toLocaleString()}`}
                      valueColorClass="text-slate-900"
                    />
                  </>
                )}
              </motion.div>

              {/* Section 3: Charts & Visualization */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h3 className="font-black text-2xl text-slate-900">Progress to Goal</h3>
                    <p className="text-slate-500 text-sm mt-1">See how your balance grows toward your target over time.</p>
                  </div>
                </div>
                
                <div className="h-[350px]">
                  <ChartModule 
                    type="area"
                    data={chartData}
                    xAxisKey="month"
                    lineOrAreaKeys={[
                      { dataKey: "contributions", name: "Total Invested", color: "#94A3B8" },
                      { dataKey: "total", name: "Total Balance", color: "#2563EB" }
                    ]}
                  />
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
              <a href="/compound-interest-calculator" className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">Compound Interest</a>
              <a href="/mortgage-calculator" className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">Mortgage Calculator</a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            
            {/* Section 5: How the Math Works */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Reaching Your Savings Goals</h2>
                <div className="prose prose-blue max-w-none text-slate-600 leading-relaxed">
                  <p>Whether you're saving for a down payment on a house, a new car, or a rainy day fund, knowing exactly how much you need to save each month makes the goal achievable.</p>
                  
                  <div className="my-8 bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-sm shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-800 px-3 py-1 text-xs font-bold rounded-bl-lg text-slate-400">FORMULA</div>
                    <div className="mb-4 text-blue-400 font-bold text-lg">FV = PV(1+r)^n + PMT[((1+r)^n - 1) / r]</div>
                    <ul className="space-y-2 opacity-90 list-none pl-0">
                      <li><strong className="text-white">FV</strong> = Future Value (Target Amount)</li>
                      <li><strong className="text-white">PV</strong> = Present Value (Current Savings)</li>
                      <li><strong className="text-white">PMT</strong> = Monthly Contribution</li>
                      <li><strong className="text-white">r</strong> = Monthly Interest Rate</li>
                      <li><strong className="text-white">n</strong> = Number of Months</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Power of Yield</h3>
                  <p>Where you store your savings matters. A standard checking account earning 0.01% provides almost no growth. A High-Yield Savings Account (HYSA) earning 4-5% can shave months or even years off your timeline without exposing your money to stock market risk. For timelines over 5-7 years, investing in broad market index funds historically provides even higher returns, though with more volatility.</p>
                </div>
              </div>
            </div>

            {/* Section 6: FAQ & Related */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
                <FAQAccordion items={[
                  {
                    question: "What should my emergency fund goal be?",
                    answer: "Experts typically recommend saving 3 to 6 months of essential living expenses. If you are self-employed or have a highly variable income, aim for 6 to 12 months."
                  },
                  {
                    question: "How do I save when things are tight?",
                    answer: "Pay yourself first. Set up an automatic transfer from your checking to your savings account on the day you get paid. Even $50 a month builds the habit."
                  },
                  {
                    question: "Should I save or pay off debt first?",
                    answer: "Generally, you should build a small emergency fund ($1,000-$2,000) first. Then, aggressively pay off high-interest debt (like credit cards). Once high-interest debt is gone, you can focus on larger savings goals."
                  }
                ]} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Explore Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard 
                    title="Compound Interest" 
                    description="See how your wealth grows over time."
                    href="/compound-interest-calculator"
                    icon={<TrendingUp className="h-6 w-6" />}
                  />
                  <ToolCard 
                    title="Mortgage Calculator" 
                    description="Estimate home payments with taxes and insurance."
                    href="/mortgage-calculator"
                    icon={<Home className="h-6 w-6" />}
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
