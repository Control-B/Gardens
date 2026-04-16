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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calcLoanPayment } from "@/lib/calculators";
import { generateLoanInsight } from "@/lib/aiInsights";
import { Search } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";

export default function LoanPaymentCalculator() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [loanAmount, setLoanAmount] = useState(searchParams.get("loanAmount") || "25000");
  const [rate, setRate] = useState(searchParams.get("rate") || "7");
  const [termMonths, setTermMonths] = useState(searchParams.get("termMonths") || "60");
  
  const [query, setQuery] = useState("");

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="bg-white py-12 border-b border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Loan Payment Calculator</h1>
            <p className="text-lg text-muted-foreground mb-8">Calculate your monthly payments and total interest for personal, auto, or student loans.</p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g., loan of 20000 at 5% for 60 months"
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
              <CalculatorCard title="Loan Details">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                    <Input id="loanAmount" type="number" min="0" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Interest Rate (%)</Label>
                    <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="termMonths">Loan Term (months)</Label>
                    <Input id="termMonths" type="number" min="1" value={termMonths} onChange={(e) => setTermMonths(e.target.value)} />
                    <div className="flex gap-2 mt-2">
                      <Button type="button" size="sm" variant={termMonths === "36" ? "default" : "outline"} onClick={() => setTermMonths("36")} className="flex-1">36m (3y)</Button>
                      <Button type="button" size="sm" variant={termMonths === "60" ? "default" : "outline"} onClick={() => setTermMonths("60")} className="flex-1">60m (5y)</Button>
                      <Button type="button" size="sm" variant={termMonths === "72" ? "default" : "outline"} onClick={() => setTermMonths("72")} className="flex-1">72m (6y)</Button>
                    </div>
                  </div>
                </div>
              </CalculatorCard>
            </div>

            <div className="lg:col-span-8 flex flex-col space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard 
                  title="Monthly Payment" 
                  value={`$${results.paymentAmount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                />
                <ResultCard 
                  title="Total Interest" 
                  value={`$${results.totalInterest.toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:0})}`}
                  valueColorClass="text-red-600"
                />
                <ResultCard 
                  title="Total Repayment" 
                  value={`$${results.totalRepayment.toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:0})}`}
                  valueColorClass="text-foreground"
                />
              </div>

              {scheduleData.length > 0 && (
                <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden mt-6">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-bold text-lg">Yearly Balance Summary</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead className="text-right">Remaining Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scheduleData.map((row) => (
                          <TableRow key={row.year}>
                            <TableCell className="font-medium">Year {row.year} (Mo {row.month})</TableCell>
                            <TableCell className="text-right font-bold">${row.balance.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
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

          <AIInsightCard content={insight} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-16">
            <article className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How Loan Payments Are Calculated</h2>
              <p>Most auto, personal, and student loans use an amortized payment schedule. This means your monthly payment is fixed, but the amount going toward interest vs. principal changes over time.</p>
              <h3>The Impact of the Loan Term</h3>
              <p>Choosing a longer loan term (like 72 months instead of 48 months for a car loan) will lower your monthly payment. However, because you are keeping the debt longer, you will pay significantly more in total interest. If possible, opt for the shortest term you can afford to minimize interest costs.</p>
            </article>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <FAQAccordion items={[
                {
                  question: "Can I pay off my loan early?",
                  answer: "Usually, yes. Paying extra each month or making a lump-sum payment will reduce your principal faster and save you interest. However, check your loan agreement for 'prepayment penalties', which some lenders charge to recoup lost interest."
                },
                {
                  question: "Why is the interest so high?",
                  answer: "Interest is the cost of borrowing money. The rate is determined by your credit score, the loan term, current economic conditions, and whether the loan is secured (like an auto loan) or unsecured (like a personal loan)."
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
