import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Home, Briefcase } from "lucide-react";
import { Link } from "wouter";

export default function LoansCategory() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="bg-primary/5 py-16 border-b border-border">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 mb-6">
              <Home className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Loans & Mortgages</h1>
            <p className="text-lg text-muted-foreground">
              Take the guesswork out of borrowing. Estimate monthly payments, analyze amortization, and manage your debt.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-12">
          <AdPlaceholder />
          
          <h2 className="text-2xl font-bold text-foreground mb-8 mt-8">Borrowing Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <ToolCard 
              title="Mortgage Calculator" 
              description="Estimate your monthly mortgage payments including taxes and insurance."
              href="/mortgage-calculator"
              icon={<Home className="h-6 w-6" />}
            />
            <ToolCard 
              title="Loan Payment" 
              description="Calculate your monthly payments and total interest for personal, auto, or student loans."
              href="/loan-payment-calculator"
              icon={<Briefcase className="h-6 w-6" />}
            />
          </div>

          <AdPlaceholder />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Loan Guides</h2>
              <div className="space-y-4">
                <Link href="/how-to-calculate-mortgage-payments" className="block p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card">
                  <h3 className="text-lg font-bold text-primary mb-2">How to Calculate Mortgage Payments</h3>
                  <p className="text-muted-foreground text-sm">Understand the components of a mortgage payment: Principal, Interest, Taxes, and Insurance (PITI).</p>
                </Link>
                <Link href="/loan-interest-explained" className="block p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card">
                  <h3 className="text-lg font-bold text-primary mb-2">Loan Interest & Amortization Explained</h3>
                  <p className="text-muted-foreground text-sm">Why your early loan payments are mostly interest, and how making extra principal payments saves you money.</p>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Loan FAQ</h2>
              <FAQAccordion items={[
                {
                  question: "What is APR vs Interest Rate?",
                  answer: "The interest rate is the cost of borrowing the principal. The APR (Annual Percentage Rate) includes the interest rate plus any other fees or charges from the lender, giving you a truer picture of the total cost."
                },
                {
                  question: "How does a down payment affect my loan?",
                  answer: "A larger down payment reduces the total amount you need to borrow, which lowers your monthly payment and reduces the total interest paid over the life of the loan. For mortgages, it can also remove the need for Private Mortgage Insurance (PMI)."
                },
                {
                  question: "What does amortized mean?",
                  answer: "Amortization is the process of spreading a loan into a series of fixed payments over time. While the payment stays the same, the portion going toward interest decreases over time, while the portion paying down the principal increases."
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
