import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorCard } from "@/components/CalculatorCard";
import { ResultCard } from "@/components/ResultCard";
import { AIInsightCard } from "@/components/AIInsightCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ChartModule } from "@/components/ChartModule";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calcSavingsGoal } from "@/lib/calculators";
import { generateSavingsInsight } from "@/lib/aiInsights";
import { Search } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";

export default function SavingsGoalCalculator() {
  const [location, setLocation] = useLocation();
  
  const [targetAmount, setTargetAmount] = useState("50000");
  const [currentSavings, setCurrentSavings] = useState("5000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("5");
  const [timelineMonths, setTimelineMonths] = useState("60");
  
  const [calcMode, setCalcMode] = useState<"time" | "required">("time");
  const [query, setQuery] = useState("");

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="bg-white py-12 border-b border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Savings Goal Calculator</h1>
            <p className="text-lg text-muted-foreground mb-8">Determine how much you need to save or how long it will take to reach your goal.</p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g., compound interest on $1000 at 5%..."
                className="h-14 pl-12 pr-32 text-base rounded-full shadow-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-2 h-10 rounded-full px-4">
                Search
              </Button>
            </form>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
            <div className="lg:col-span-4">
              <CalculatorCard title="Goal Details">
                <div className="space-y-5">
                  <div className="flex gap-2 p-1 bg-muted rounded-lg mb-4">
                    <Button 
                      type="button" 
                      variant={calcMode === "time" ? "default" : "ghost"} 
                      className="flex-1"
                      onClick={() => setCalcMode("time")}
                    >Find Time</Button>
                    <Button 
                      type="button" 
                      variant={calcMode === "required" ? "default" : "ghost"} 
                      className="flex-1"
                      onClick={() => setCalcMode("required")}
                    >Find Required Savings</Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Target Amount ($)</Label>
                    <Input id="targetAmount" type="number" min="0" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentSavings">Current Savings ($)</Label>
                    <Input id="currentSavings" type="number" min="0" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
                    <Input id="annualReturn" type="number" step="0.1" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} />
                  </div>

                  {calcMode === "time" ? (
                    <div className="space-y-2 pt-4 border-t border-border">
                      <Label htmlFor="monthlyContribution" className="text-primary font-semibold">I plan to save monthly ($)</Label>
                      <Input id="monthlyContribution" type="number" min="0" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
                    </div>
                  ) : (
                    <div className="space-y-2 pt-4 border-t border-border">
                      <Label htmlFor="timelineMonths" className="text-primary font-semibold">I want to reach this in (months)</Label>
                      <Input id="timelineMonths" type="number" min="1" value={timelineMonths} onChange={(e) => setTimelineMonths(e.target.value)} />
                      <p className="text-xs text-muted-foreground text-right">{Math.floor(Number(timelineMonths)/12)} years, {Number(timelineMonths)%12} months</p>
                    </div>
                  )}
                </div>
              </CalculatorCard>
            </div>

            <div className="lg:col-span-8 flex flex-col space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      valueColorClass="text-foreground"
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
                      valueColorClass="text-foreground"
                    />
                  </>
                )}
              </div>

              <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-6">Progress to Goal</h3>
                <ChartModule 
                  type="area"
                  data={chartData}
                  xAxisKey="month"
                  lineOrAreaKeys={[
                    { dataKey: "total", name: "Total Balance", color: "#2563EB" },
                    { dataKey: "contributions", name: "Total Contributions", color: "#94A3B8" }
                  ]}
                />
              </div>
            </div>
          </div>

          <AdPlaceholder />

          <AIInsightCard content={insight} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-16">
            <article className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold text-foreground">Reaching Your Savings Goals</h2>
              <p>Whether you're saving for a down payment on a house, a new car, or a rainy day fund, knowing exactly how much you need to save each month makes the goal achievable.</p>
              <h3>The Power of Yield</h3>
              <p>Where you store your savings matters. A standard checking account earning 0.01% provides almost no growth. A High-Yield Savings Account (HYSA) earning 4-5% can shave months or even years off your timeline without exposing your money to stock market risk.</p>
            </article>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <FAQAccordion items={[
                {
                  question: "What should my emergency fund goal be?",
                  answer: "Experts typically recommend saving 3 to 6 months of essential living expenses. If you are self-employed or have a highly variable income, aim for 6 to 12 months."
                },
                {
                  question: "How do I save when things are tight?",
                  answer: "Pay yourself first. Set up an automatic transfer from your checking to your savings account on the day you get paid. Even $50 a month builds the habit."
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
