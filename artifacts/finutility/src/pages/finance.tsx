import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TrendingUp, PiggyBank, Briefcase, Calculator } from "lucide-react";
import { Link } from "wouter";

export default function FinanceCategory() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="bg-primary/5 py-16 border-b border-border">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 mb-6">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Personal Finance</h1>
            <p className="text-lg text-muted-foreground">
              Build wealth, plan for the future, and manage your everyday finances with our suite of smart calculators.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-12">
          <AdPlaceholder />
          
          <h2 className="text-2xl font-bold text-foreground mb-8 mt-8">Finance Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <ToolCard 
              title="Compound Interest" 
              description="See how your money can grow exponentially over time with regular contributions."
              href="/compound-interest-calculator"
              icon={<TrendingUp className="h-6 w-6" />}
            />
            <ToolCard 
              title="Savings Goal" 
              description="Find out how much you need to save monthly to reach your financial target."
              href="/savings-goal-calculator"
              icon={<PiggyBank className="h-6 w-6" />}
            />
            <ToolCard 
              title="Currency Converter" 
              description="Convert between global currencies."
              href="/currency-converter"
              icon={<Calculator className="h-6 w-6" />}
            />
          </div>

          <AdPlaceholder />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Finance Guides</h2>
              <div className="space-y-4">
                <Link href="/what-is-compound-interest" className="block p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card">
                  <h3 className="text-lg font-bold text-primary mb-2">What is Compound Interest?</h3>
                  <p className="text-muted-foreground text-sm">Learn the basics of how compounding works and why it's often called the eighth wonder of the world.</p>
                </Link>
                <Link href="/how-to-save-money-faster" className="block p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card">
                  <h3 className="text-lg font-bold text-primary mb-2">How to Save Money Faster</h3>
                  <p className="text-muted-foreground text-sm">Actionable strategies and automated systems to help you hit your savings goals ahead of schedule.</p>
                </Link>
                <Link href="/how-currency-conversion-works" className="block p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card">
                  <h3 className="text-lg font-bold text-primary mb-2">Understanding Currency Exchange</h3>
                  <p className="text-muted-foreground text-sm">A beginner's guide to FOREX, conversion rates, and what drives currency valuation.</p>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Finance FAQ</h2>
              <FAQAccordion items={[
                {
                  question: "How much should I save each month?",
                  answer: "A common rule of thumb is the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Adjust this based on your specific income and goals."
                },
                {
                  question: "What is an emergency fund?",
                  answer: "An emergency fund is money set aside to cover unexpected expenses like medical bills or job loss. Experts generally recommend saving 3 to 6 months' worth of living expenses."
                },
                {
                  question: "Why is compound interest important?",
                  answer: "Compound interest allows you to earn interest not just on your initial principal, but also on the accumulated interest from previous periods. Over long timeframes, this causes exponential growth of wealth."
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
