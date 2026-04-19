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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calcLoanPayment } from "@/lib/calculators";
import { generateLoanInsight } from "@/lib/aiInsights";
import { Search, Zap, Clock, ShieldCheck, Home, Briefcase, TrendingUp } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { motion } from "framer-motion";

export default function LoanPaymentCalculator() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [loanAmount, setLoanAmount] = useState(searchParams.get("loanAmount") || "25000");
  const [rate, setRate] = useState(searchParams.get("rate") || "7");
  const [termMonths, setTermMonths] = useState(searchParams.get("termMonths") || "60");
  
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const results = useMemo(() => {
    return calcLoanPayment(
      Number(loanAmount) || 0,
      Number(rate) || 0,
      Number(termMonths) || 0
    );
  }, [loanAmount, rate, termMonths]);

  const insight = useMemo(() => {
    return generateLoanInsight(
      results.paymentAmount, 
      results.totalInterest, 
      Number(loanAmount) || 0,
      Number(termMonths) || 0
    );
  }, [results, loanAmount, termMonths]);

  // Generate simple schedule summary table
  const scheduleData = useMemo(() => {
    const amount = Number(loanAmount) || 0;
    const rateMonth = (Number(rate) || 0) / 100 / 12;
    const months = Number(termMonths) || 0;
    const pmt = results.paymentAmount;
    
    let balance = amount;
    const schedule = [];
    
    // Just show yearly summaries for large loans to save DOM nodes
    for (let m = 1; m <= months; m++) {
      const interest = balance * rateMonth;
      const principal = pmt - interest;
      balance = Math.max(0, balance - principal);
      
      if (m % 12 === 0 || m === months) {
        schedule.push({
          month: m,
          year: Math.ceil(m / 12),
          payment: pmt * (m % 12 === 0 ? 12 : m % 12),
          principal: principal, // simplfied
          interest: interest,
          balance: balance
        });
      }
    }
    return schedule;
  }, [loanAmount, rate, termMonths, results]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const intent = parseNaturalLanguage(query);
    if (intent) {
      if (intent.calculator !== "/loan-payment-calculator") {
        setLocation(`${intent.calculator}?${new URLSearchParams(intent.params).toString()}`);
      } else {
        if(intent.params.loanAmount) setLoanAmount(intent.params.loanAmount);
        if(intent.params.rate) setRate(intent.params.rate);
        if(intent.params.termMonths) setTermMonths(intent.params.termMonths);
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Loan Payment <br/><span className="text-blue-400">Calculator</span></h1>
                <p className="text-lg text-slate-300 mb-8 max-w-xl">Calculate your monthly payments and total interest for personal, auto, or student loans.</p>
                
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
                    placeholder="e.g. loan of 20k at 5% for 60 months"
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
                  src="/images/loan.png" 
                  alt="Handshake over financial documents" 
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
              <CalculatorCard title="Loan Details">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount" className="text-sm font-semibold">Loan Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-500 font-medium">$</span>
                      </div>
                      <Input 
                        id="loanAmount" 
                        type="number" 
                        min="0" 
                        className="pl-8 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" 
                        value={loanAmount} 
                        onChange={(e) => setLoanAmount(e.target.value)} 
                      />
                    </div>
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
                  <div className="space-y-2">
                    <Label htmlFor="termMonths" className="text-sm font-semibold">Loan Term (months)</Label>
                    <Input 
                      id="termMonths" 
                      type="number" 
                      min="1" 
                      className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500" 
                      value={termMonths} 
                      onChange={(e) => setTermMonths(e.target.value)} 
                    />
                    <div className="flex gap-2 mt-3">
                      <Button type="button" size="sm" variant={termMonths === "36" ? "default" : "outline"} onClick={() => setTermMonths("36")} className="flex-1 h-10 rounded-lg font-bold bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 transition-colors" data-state={termMonths === "36" ? "active" : "inactive"}>36m (3y)</Button>
                      <Button type="button" size="sm" variant={termMonths === "60" ? "default" : "outline"} onClick={() => setTermMonths("60")} className="flex-1 h-10 rounded-lg font-bold bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 transition-colors" data-state={termMonths === "60" ? "active" : "inactive"}>60m (5y)</Button>
                      <Button type="button" size="sm" variant={termMonths === "72" ? "default" : "outline"} onClick={() => setTermMonths("72")} className="flex-1 h-10 rounded-lg font-bold bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 transition-colors" data-state={termMonths === "72" ? "active" : "inactive"}>72m (6y)</Button>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20" 
                    onClick={handleCalculate}
                  >
                    Calculate Payment
                  </Button>
                </div>
              </CalculatorCard>
            </div>

            <div className="lg:col-span-8 flex flex-col space-y-6">
              <motion.div 
                animate={isCalculating ? { scale: [1, 1.02, 1], opacity: [1, 0.8, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <ResultCard 
                  title="Monthly Payment" 
                  value={`$${results.paymentAmount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                />
                <ResultCard 
                  title="Total Interest" 
                  value={`$${results.totalInterest.toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:0})}`}
                  valueColorClass="text-rose-600"
                />
                <ResultCard 
                  title="Total Repayment" 
                  value={`$${results.totalRepayment.toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:0})}`}
                  valueColorClass="text-slate-900"
                />
              </motion.div>

              {/* Section 3: Charts & Visualization */}
              {scheduleData.length > 0 && (
                <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mt-6">
                  <div className="p-6 border-b border-border bg-slate-50">
                    <h3 className="font-bold text-lg">Yearly Balance Summary</h3>
                  </div>
                  <div className="max-h-[400px] overflow-auto">
                    <Table>
                      <TableHeader className="bg-white sticky top-0 shadow-sm">
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead className="text-right">Remaining Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scheduleData.map((row) => (
                          <TableRow key={row.year}>
                            <TableCell className="font-medium text-slate-900">Year {row.year} (Mo {row.month})</TableCell>
                            <TableCell className="text-right font-bold text-slate-900">${row.balance.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          </div>

          <AdPlaceholder />

          {/* Section 4: AI Insight Card */}
          <div className="my-8">
            <AIInsightCard content={insight} />
            <div className="flex flex-wrap gap-2 mt-4 ml-2">
              <span className="text-sm font-medium text-slate-500 flex items-center mr-2">Related tools:</span>
              <a href="/mortgage-calculator" className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">Mortgage Calculator</a>
              <a href="/savings-goal-calculator" className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">Savings Goal</a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            
            {/* Section 5: How the Math Works */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">How Loan Payments Are Calculated</h2>
                <div className="prose prose-blue max-w-none text-slate-600 leading-relaxed">
                  <p>Most auto, personal, and student loans use an amortized payment schedule. This means your monthly payment is fixed, but the amount going toward interest vs. principal changes over time.</p>
                  
                  <div className="my-8 bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-sm shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-slate-800 px-3 py-1 text-xs font-bold rounded-bl-lg text-slate-400">FORMULA</div>
                    <div className="mb-4 text-blue-400 font-bold text-lg">M = P[r(1+r)^n]/[(1+r)^n-1]</div>
                    <ul className="space-y-2 opacity-90 list-none pl-0">
                      <li><strong className="text-white">M</strong> = Fixed monthly payment</li>
                      <li><strong className="text-white">P</strong> = Principal loan amount</li>
                      <li><strong className="text-white">r</strong> = Monthly interest rate</li>
                      <li><strong className="text-white">n</strong> = Total number of payments (months)</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Impact of the Loan Term</h3>
                  <p>Choosing a longer loan term (like 72 months instead of 48 months for a car loan) will lower your monthly payment. However, because you are keeping the debt longer, you will pay significantly more in total interest. If possible, opt for the shortest term you can afford to minimize interest costs.</p>
                </div>
              </div>
            </div>

            {/* Section 6: FAQ & Related */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
                <FAQAccordion items={[
                  {
                    question: "Can I pay off my loan early?",
                    answer: "Usually, yes. Paying extra each month or making a lump-sum payment will reduce your principal faster and save you interest. However, check your loan agreement for 'prepayment penalties', which some lenders charge to recoup lost interest."
                  },
                  {
                    question: "Why is the interest so high?",
                    answer: "Interest is the cost of borrowing money. The rate is determined by your credit score, the loan term, current economic conditions, and whether the loan is secured (like an auto loan) or unsecured (like a personal loan)."
                  },
                  {
                    question: "What is APR vs Interest Rate?",
                    answer: "The interest rate is the base cost of borrowing. The APR (Annual Percentage Rate) includes the interest rate PLUS any additional fees the lender charges to originate the loan, giving you a truer picture of the cost."
                  }
                ]} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Explore Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard 
                    title="Mortgage Calculator" 
                    description="Estimate home payments with taxes and insurance."
                    href="/mortgage-calculator"
                    icon={<Home className="h-6 w-6" />}
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
