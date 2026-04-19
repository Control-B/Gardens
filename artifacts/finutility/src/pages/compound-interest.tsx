import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorCard } from "@/components/CalculatorCard";
import { ResultCard } from "@/components/ResultCard";
import { AIInsightCard } from "@/components/AIInsightCard";
import { ChartModule } from "@/components/ChartModule";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ToolCard } from "@/components/ToolCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calcCompoundInterest } from "@/lib/calculators";
import { generateCompoundInterestInsight } from "@/lib/aiInsights";
import { Search, Zap, Clock, ShieldCheck, Home, Briefcase, PiggyBank } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { motion } from "framer-motion";

export default function CompoundInterestCalculator() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [principal, setPrincipal] = useState(searchParams.get("principal") || "10000");
  const [rate, setRate] = useState(searchParams.get("rate") || "5");
  const [years, setYears] = useState(searchParams.get("years") || "10");
  const [frequency, setFrequency] = useState("Annually");
  const [monthlyContribution, setMonthlyContribution] = useState("0");
  
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const results = useMemo(() => {
    return calcCompoundInterest(
      Number(principal) || 0,
      Number(rate) || 0,
      Number(years) || 0,
      frequency,
      Number(monthlyContribution) || 0
    );
  }, [principal, rate, years, frequency, monthlyContribution]);

  const insight = useMemo(() => {
    return generateCompoundInterestInsight(Number(principal) || 0, results.futureValue, Number(years) || 0);
  }, [principal, results.futureValue, years]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const intent = parseNaturalLanguage(query);
    if (intent) {
      if (intent.calculator !== "/compound-interest-calculator") {
        setLocation(`${intent.calculator}?${new URLSearchParams(intent.params).toString()}`);
      } else {
        if(intent.params.principal) setPrincipal(intent.params.principal);
        if(intent.params.rate) setRate(intent.params.rate);
        if(intent.params.years) setYears(intent.params.years);
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Compound Interest <br/><span className="text-blue-400">Calculator</span></h1>
                <p className="text-lg text-slate-300 mb-8 max-w-xl">Calculate how your money can grow exponentially over time. See the power of "interest on interest."</p>
                
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
                    placeholder="e.g. compound 5k at 7% for 20 years"
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
                  src="/images/compound-interest.png" 
                  alt="Growing plant made of coins" 
                  className="w-full max-w-md rounded-2xl shadow-2xl border border-white/10 object-cover aspect-4/3"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          {/* Section 2: Calculator Tool */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 my-8" ref={resultsRef}>
            <div className="xl:col-span-4">
              <CalculatorCard title="Enter Details">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="principal" className="text-sm font-semibold">Initial Investment</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-500 font-medium">$</span>
                      </div>
                      <Input 
                        id="principal" 
                        type="number" 
                        min="0" 
                        className="pl-8 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" 
                        value={principal} 
                        onChange={(e) => setPrincipal(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contribution" className="text-sm font-semibold">Monthly Contribution</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-500 font-medium">$</span>
                      </div>
                      <Input 
                        id="contribution" 
                        type="number" 
                        min="0" 
                        className="pl-8 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" 
                        value={monthlyContribution} 
                        onChange={(e) => setMonthlyContribution(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="years" className="text-sm font-semibold">Years to Grow</Label>
                      <Input 
                        id="years" 
                        type="number" 
                        min="1" 
                        max="100" 
                        className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" 
                        value={years} 
                        onChange={(e) => setYears(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rate" className="text-sm font-semibold">Interest Rate</Label>
                      <div className="relative">
                        <Input 
                          id="rate" 
                          type="number" 
                          step="0.1" 
                          className="pr-8 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" 
                          value={rate} 
                          onChange={(e) => setRate(e.target.value)} 
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-slate-500 font-medium">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency" className="text-sm font-semibold">Compounding Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger id="frequency" className="h-12 rounded-xl bg-slate-50 border-slate-200 font-medium text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Annually">Annually (1x/yr)</SelectItem>
                        <SelectItem value="Monthly">Monthly (12x/yr)</SelectItem>
                        <SelectItem value="Daily">Daily (365x/yr)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20" 
                    onClick={handleCalculate}
                  >
                    Calculate Results
                  </Button>
                </div>
              </CalculatorCard>
            </div>

            <div className="xl:col-span-8 flex flex-col space-y-6">
              <motion.div 
                animate={isCalculating ? { scale: [1, 1.02, 1], opacity: [1, 0.8, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <ResultCard 
                  title="Future Value" 
                  value={`$${results.futureValue.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                />
                <ResultCard 
                  title="Total Contributions" 
                  value={`$${results.totalContributions.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                  valueColorClass="text-slate-900"
                />
                <ResultCard 
                  title="Total Interest" 
                  value={`$${results.totalInterestEarned.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                  valueColorClass="text-emerald-600"
                />
              </motion.div>

              {/* Section 3: Charts & Visualization */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h3 className="font-black text-2xl text-slate-900">Growth Over Time</h3>
                    <p className="text-slate-500 text-sm mt-1">See how your balance shifts from contributions to interest over {years} years.</p>
                  </div>
                </div>
                
                <div className="h-[350px]">
                  <ChartModule 
                    type="area"
                    data={results.yearlyData}
                    xAxisKey="year"
                    lineOrAreaKeys={[
                      { dataKey: "principal", name: "Contributions", color: "#64748b" },
                      { dataKey: "balance", name: "Total Balance", color: "#2563eb" }
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
              <a href="/savings-goal-calculator" className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">Savings Goal</a>
              <a href="/mortgage-calculator" className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">Mortgage Calculator</a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            
            {/* Section 5: How the Math Works */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">How Compound Interest Works</h2>
                <div className="prose prose-blue max-w-none text-slate-600 leading-relaxed">
                  <p>Compound interest is the interest on savings calculated on both the initial principal and the accumulated interest from previous periods. It essentially means "interest on interest" and is the mathematical engine behind long-term wealth building.</p>
                  
                  <div className="my-8 bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-sm shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-800 px-3 py-1 text-xs font-bold rounded-bl-lg text-slate-400">FORMULA</div>
                    <div className="mb-4 text-blue-400 font-bold text-lg">A = P(1 + r/n)^(nt)</div>
                    <ul className="space-y-2 opacity-90 list-none pl-0">
                      <li><strong className="text-white">A</strong> = Future value of the investment</li>
                      <li><strong className="text-white">P</strong> = Principal investment amount</li>
                      <li><strong className="text-white">r</strong> = Annual interest rate (decimal)</li>
                      <li><strong className="text-white">n</strong> = Compounding frequency per year</li>
                      <li><strong className="text-white">t</strong> = Number of years invested</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Key concepts to remember:</h3>
                  <ul className="space-y-3">
                    <li><strong>Time is your best friend:</strong> Because the exponent <code>t</code> is in the formula, extending your investment timeline has a much more dramatic effect than increasing the interest rate.</li>
                    <li><strong>Consistent contributions win:</strong> Adding even small amounts monthly accelerates the compounding curve significantly, especially in the later years.</li>
                    <li><strong>Rule of 72:</strong> To quickly estimate how long it takes to double your money, divide 72 by the interest rate. (e.g., at 7%, it takes ~10 years).</li>
                  </ul>
                </div>
              </div>
              
              {/* Breakdown Table inside math section */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mt-8">
                <div className="p-6 border-b border-border bg-slate-50">
                  <h3 className="font-bold text-lg">Detailed Yearly Breakdown</h3>
                </div>
                <div className="max-h-[400px] overflow-auto">
                  <Table>
                    <TableHeader className="bg-white sticky top-0 shadow-sm">
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead className="text-right">Total Contributions</TableHead>
                        <TableHead className="text-right">Interest Accrued</TableHead>
                        <TableHead className="text-right">End Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.yearlyData.map((row) => (
                        <TableRow key={row.year}>
                          <TableCell className="font-medium text-slate-900">{row.year}</TableCell>
                          <TableCell className="text-right text-slate-500">${row.principal.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                          <TableCell className="text-right text-emerald-600 font-medium">${row.interest.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                          <TableCell className="text-right font-bold text-slate-900">${row.balance.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            {/* Section 6: FAQ & Related */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
                <FAQAccordion items={[
                  {
                    question: "Is daily compounding much better than monthly?",
                    answer: "While daily compounding yields more than monthly, the difference is usually marginal for most retail investors compared to the impact of a higher interest rate or adding more to the principal."
                  },
                  {
                    question: "Does this account for inflation?",
                    answer: "No, this calculator shows nominal value. To find the real purchasing power of your future money, you would need to subtract the expected average inflation rate (historically 2-3%) from your return rate."
                  },
                  {
                    question: "Where can I get 7% or 10% returns?",
                    answer: "Historically, broad stock market index funds (like the S&P 500) have returned roughly 7-10% annually over long periods, though they carry risk and are volatile in the short term. High-yield savings accounts typically offer lower, but guaranteed, returns."
                  },
                  {
                    question: "When should I use the 'Savings Goal' calculator instead?",
                    answer: "Use the Savings Goal calculator when you have a specific target number in mind (like $100,000 for a house down payment) and want to know exactly how much to save each month to hit it by a certain date."
                  }
                ]} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Explore Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard 
                    title="Savings Goal Calculator" 
                    description="Calculate exactly how much to save monthly for a target."
                    href="/savings-goal-calculator"
                    icon={<PiggyBank className="h-6 w-6" />}
                  />
                  <ToolCard 
                    title="Mortgage Calculator" 
                    description="Estimate home payments with taxes and insurance."
                    href="/mortgage-calculator"
                    icon={<Home className="h-6 w-6" />}
                  />
                  <ToolCard 
                    title="Loan Payment" 
                    description="Calculate payments and interest for any loan type."
                    href="/loan-payment-calculator"
                    icon={<Briefcase className="h-6 w-6" />}
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
