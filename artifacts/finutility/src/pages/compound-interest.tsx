import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorCard } from "@/components/CalculatorCard";
import { ResultCard } from "@/components/ResultCard";
import { AIInsightCard } from "@/components/AIInsightCard";
import { ChartModule } from "@/components/ChartModule";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calcCompoundInterest } from "@/lib/calculators";
import { generateCompoundInterestInsight } from "@/lib/aiInsights";
import { Search } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";

export default function CompoundInterestCalculator() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [principal, setPrincipal] = useState(searchParams.get("principal") || "10000");
  const [rate, setRate] = useState(searchParams.get("rate") || "5");
  const [years, setYears] = useState(searchParams.get("years") || "10");
  const [frequency, setFrequency] = useState("Annually");
  const [monthlyContribution, setMonthlyContribution] = useState("0");
  
  const [query, setQuery] = useState("");

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-white py-12 border-b border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Compound Interest Calculator</h1>
            <p className="text-lg text-muted-foreground mb-8">Calculate how your money can grow exponentially over time.</p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g., compound interest on $5000 at 7% for 20 years"
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
            {/* Calculator Form */}
            <div className="lg:col-span-4">
              <CalculatorCard title="Enter Details">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="principal">Initial Investment ($)</Label>
                    <Input id="principal" type="number" min="0" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contribution">Monthly Contribution ($)</Label>
                    <Input id="contribution" type="number" min="0" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years">Investment Length (years)</Label>
                    <Input id="years" type="number" min="1" max="100" value={years} onChange={(e) => setYears(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Estimated Annual Rate (%)</Label>
                    <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Compounding Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger id="frequency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Annually">Annually (1x/yr)</SelectItem>
                        <SelectItem value="Monthly">Monthly (12x/yr)</SelectItem>
                        <SelectItem value="Daily">Daily (365x/yr)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CalculatorCard>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-8 flex flex-col space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard 
                  title="Future Value" 
                  value={`$${results.futureValue.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                />
                <ResultCard 
                  title="Total Contributions" 
                  value={`$${results.totalContributions.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                  valueColorClass="text-foreground"
                />
                <ResultCard 
                  title="Total Interest" 
                  value={`$${results.totalInterestEarned.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                  valueColorClass="text-green-600"
                />
              </div>

              <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-6">Growth Over Time</h3>
                <ChartModule 
                  type="bar"
                  data={results.yearlyData}
                  xAxisKey="year"
                  bars={[
                    { dataKey: "principal", name: "Principal", color: "#2563EB" },
                    { dataKey: "interest", name: "Interest", color: "#16A34A" }
                  ]}
                />
              </div>
            </div>
          </div>

          <AdPlaceholder />

          <AIInsightCard content={insight} />

          {/* Breakdown Table */}
          <div className="my-12 bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-bold text-lg">Yearly Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
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
                      <TableCell className="font-medium">{row.year}</TableCell>
                      <TableCell className="text-right text-muted-foreground">${row.principal.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                      <TableCell className="text-right text-green-600">${row.interest.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                      <TableCell className="text-right font-bold">${row.balance.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Content & FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-16">
            <article className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold text-foreground">How Compound Interest Works</h2>
              <p>Compound interest is the interest on savings calculated on both the initial principal and the accumulated interest from previous periods. It essentially means "interest on interest."</p>
              <h3>The Formula</h3>
              <p>The mathematical formula for compound interest is: <code>A = P(1 + r/n)^(nt)</code></p>
              <ul>
                <li><strong>A</strong> = the future value of the investment</li>
                <li><strong>P</strong> = the principal investment amount</li>
                <li><strong>r</strong> = the annual interest rate (decimal)</li>
                <li><strong>n</strong> = the number of times interest is compounded per year</li>
                <li><strong>t</strong> = the number of years the money is invested</li>
              </ul>
              <p>By making regular monthly contributions, you add to the principal consistently, accelerating the compounding effect dramatically.</p>
            </article>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <FAQAccordion items={[
                {
                  question: "Is daily compounding much better than monthly?",
                  answer: "While daily compounding yields more than monthly, the difference is usually marginal for most retail investors compared to the impact of a higher interest rate or adding more to the principal."
                },
                {
                  question: "Does this account for inflation?",
                  answer: "No, this calculator shows nominal value. To find the real purchasing power of your future money, you would need to subtract the expected average inflation rate from your interest rate."
                },
                {
                  question: "Where can I get 7% or 10% returns?",
                  answer: "Historically, broad stock market index funds (like the S&P 500) have returned roughly 7-10% annually over long periods, though they carry risk and are volatile in the short term. High-yield savings accounts typically offer lower, but guaranteed, returns."
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
