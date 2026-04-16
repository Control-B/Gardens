import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ArticlePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <article className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
          <Link href="/" className="text-sm text-primary hover:underline mb-8 inline-block">← Back to Calculators</Link>
          
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
            Financial Education Hub
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Learn the foundational concepts of personal finance, debt management, and investing to make smarter decisions with your money.
          </p>
          
          <div className="my-8">
            <AdPlaceholder />
          </div>
          
          <div className="prose prose-blue prose-lg max-w-none text-foreground">
            <h2>Why Financial Literacy Matters</h2>
            <p>
              Understanding how money works—how it grows through compounding, how debt drains it through interest, and how to protect it—is essential for long-term security.
            </p>
            
            <h3>Core Concepts</h3>
            <ul>
              <li><strong>Compound Interest:</strong> The eighth wonder of the world. It's the process of earning interest on your interest, leading to exponential growth.</li>
              <li><strong>Amortization:</strong> How loans are paid off over time. Early payments are mostly interest; later payments are mostly principal.</li>
              <li><strong>ROI (Return on Investment):</strong> A universal metric for evaluating the profitability of an investment relative to its cost.</li>
            </ul>

            <div className="bg-muted/30 p-8 rounded-2xl border border-border my-12 text-center">
              <h3 className="mt-0 text-2xl font-bold">Ready to run your own numbers?</h3>
              <p className="text-muted-foreground mb-6">Use our free, instant calculators to see how these concepts apply to your specific financial situation.</p>
              <Button asChild size="lg">
                <Link href="/compound-interest-calculator">Go to Calculators</Link>
              </Button>
            </div>
            
            <h2>Taking Action</h2>
            <p>
              Knowledge without action is just trivia. The best way to learn is to apply these concepts to your own life. Start by calculating your net worth, tracking your spending, and defining clear savings goals.
            </p>
          </div>
          
          <div className="my-12">
            <AdPlaceholder />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
