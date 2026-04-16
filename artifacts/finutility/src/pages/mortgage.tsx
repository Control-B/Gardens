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
import { Button } from "@/components/ui/button";
import { calcMortgage } from "@/lib/calculators";
import { generateMortgageInsight } from "@/lib/aiInsights";
import { Search } from "lucide-react";
import { parseNaturalLanguage } from "@/lib/nlParser";

export default function MortgageCalculator() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [homePrice, setHomePrice] = useState(searchParams.get("homePrice") || "400000");
  const [downPaymentPercent, setDownPaymentPercent] = useState(searchParams.get("downPaymentPercent") || "20");
  const [rate, setRate] = useState(searchParams.get("rate") || "6.5");
  const [years, setYears] = useState("30");
  const [propertyTax, setPropertyTax] = useState("400");
  const [insurance, setInsurance] = useState("150");
  const [hoa, setHoa] = useState("0");
  
  const [query, setQuery] = useState("");

  const downPaymentAmount = (Number(homePrice) * (Number(downPaymentPercent) / 100)) || 0;

  const results = useMemo(() => {
    return calcMortgage(
      Number(homePrice) || 0,
      downPaymentAmount,
      Number(rate) || 0,
      Number(years) || 0,
      Number(propertyTax) || 0,
      Number(insurance) || 0,
      Number(hoa) || 0
    );
  }, [homePrice, downPaymentAmount, rate, years, propertyTax, insurance, hoa]);

  const insight = useMemo(() => {
    return generateMortgageInsight(
      results.principalAndInterest, 
      results.monthlyPayment, 
      results.totalInterest, 
      (Number(homePrice) - downPaymentAmount)
    );
  }, [results, homePrice, downPaymentAmount]);

  const chartData = [
    { name: "Principal & Interest", value: results.principalAndInterest },
    { name: "Property Tax", value: results.tax },
    { name: "Home Insurance", value: results.insurance },
    { name: "HOA Fees", value: results.hoa }
  ].filter(d => d.value > 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const intent = parseNaturalLanguage(query);
    if (intent) {
      if (intent.calculator !== "/mortgage-calculator") {
        setLocation(`${intent.calculator}?${new URLSearchParams(intent.params).toString()}`);
      } else {
        if(intent.params.homePrice) setHomePrice(intent.params.homePrice);
        if(intent.params.rate) setRate(intent.params.rate);
        if(intent.params.downPaymentPercent) setDownPaymentPercent(intent.params.downPaymentPercent);
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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mortgage Calculator</h1>
            <p className="text-lg text-muted-foreground mb-8">Estimate your monthly payments, including taxes, insurance, and HOA fees.</p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g., mortgage on 450000 with 10% down at 7%"
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
              <CalculatorCard title="Loan Details">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="homePrice">Home Price ($)</Label>
                    <Input id="homePrice" type="number" min="0" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="downPaymentPercent">Down Payment</Label>
                      <span className="text-xs text-muted-foreground">${downPaymentAmount.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                    </div>
                    <div className="flex gap-2">
                      <Input id="downPaymentPercent" type="number" min="0" max="100" className="w-1/3" value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(e.target.value)} />
                      <div className="flex items-center text-muted-foreground">%</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Interest Rate (%)</Label>
                    <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years">Loan Term (years)</Label>
                    <div className="flex gap-2">
                      <Button type="button" variant={years === "15" ? "default" : "outline"} onClick={() => setYears("15")} className="flex-1">15</Button>
                      <Button type="button" variant={years === "20" ? "default" : "outline"} onClick={() => setYears("20")} className="flex-1">20</Button>
                      <Button type="button" variant={years === "30" ? "default" : "outline"} onClick={() => setYears("30")} className="flex-1">30</Button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border space-y-4">
                    <h4 className="text-sm font-bold text-foreground">Monthly Expenses</h4>
                    <div className="space-y-2">
                      <Label htmlFor="propertyTax">Property Tax ($)</Label>
                      <Input id="propertyTax" type="number" min="0" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance">Home Insurance ($)</Label>
                      <Input id="insurance" type="number" min="0" value={insurance} onChange={(e) => setInsurance(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hoa">HOA Fees ($)</Label>
                      <Input id="hoa" type="number" min="0" value={hoa} onChange={(e) => setHoa(e.target.value)} />
                    </div>
                  </div>
                </div>
              </CalculatorCard>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-8 flex flex-col space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard 
                  title="Monthly Payment" 
                  value={`$${results.monthlyPayment.toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:0})}`}
                />
                <ResultCard 
                  title="Principal Amount" 
                  value={`$${(Number(homePrice) - downPaymentAmount).toLocaleString(undefined, {maximumFractionDigits:0})}`}
                  valueColorClass="text-foreground"
                />
                <ResultCard 
                  title="Total Interest" 
                  value={`$${results.totalInterest.toLocaleString(undefined, {maximumFractionDigits:0})}`}
                  valueColorClass="text-red-600"
                />
              </div>

              <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="font-bold text-lg mb-2">Payment Breakdown</h3>
                  <ChartModule 
                    type="pie"
                    data={chartData}
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      <span className="text-muted-foreground">Principal & Interest</span>
                    </div>
                    <span className="font-bold">${results.principalAndInterest.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      <span className="text-muted-foreground">Property Tax</span>
                    </div>
                    <span className="font-bold">${results.tax.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      <span className="text-muted-foreground">Home Insurance</span>
                    </div>
                    <span className="font-bold">${results.insurance.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  </div>
                  {results.hoa > 0 && (
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-muted-foreground">HOA Fees</span>
                      </div>
                      <span className="font-bold">${results.hoa.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-muted-foreground font-medium">Total Cost of Home</span>
                    <span className="font-bold text-lg">${results.totalCost.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AdPlaceholder />

          <AIInsightCard content={insight} />

          {/* Content & FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-16">
            <article className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-bold text-foreground">Understanding Your Mortgage</h2>
              <p>A mortgage payment consists of several parts, commonly referred to as PITI: Principal, Interest, Taxes, and Insurance.</p>
              <h3>Principal and Interest</h3>
              <p>The principal is the amount you borrowed, and the interest is the fee charged by the lender. In the early years of a mortgage, the majority of your payment goes toward interest. Over time, as the principal balance decreases, more of your payment goes toward paying down the principal.</p>
              <h3>Taxes and Insurance</h3>
              <p>Most lenders require you to pay property taxes and home insurance into an escrow account monthly. They will then pay these bills on your behalf when they are due.</p>
              <h3>Private Mortgage Insurance (PMI)</h3>
              <p>If your down payment is less than 20% of the home's value, lenders usually require PMI to protect themselves if you default. This adds an extra monthly fee not shown in the base calculation.</p>
            </article>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <FAQAccordion items={[
                {
                  question: "Should I choose a 15-year or 30-year mortgage?",
                  answer: "A 15-year mortgage has higher monthly payments but significantly less total interest paid over the life of the loan. A 30-year mortgage offers lower monthly payments, providing more flexibility in your monthly budget, but costs much more in total interest."
                },
                {
                  question: "How much should I put down?",
                  answer: "A 20% down payment is ideal as it eliminates the need for PMI and provides instant equity. However, many loans allow 3.5% or even 0% down depending on the program (like VA or USDA loans)."
                },
                {
                  question: "What happens if I pay extra toward principal?",
                  answer: "Making additional principal payments reduces your overall loan balance faster. This means subsequent interest charges are calculated on a smaller balance, saving you money and shortening the life of the loan."
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
