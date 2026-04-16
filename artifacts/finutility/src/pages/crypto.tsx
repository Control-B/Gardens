import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Bitcoin, Calculator } from "lucide-react";
import { Link } from "wouter";

export default function CryptoCategory() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="bg-primary/5 py-16 border-b border-border">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 mb-6">
              <Bitcoin className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Cryptocurrency</h1>
            <p className="text-lg text-muted-foreground">
              Calculate your trading profits, analyze ROI, and manage your digital asset portfolio with precision.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-12">
          <AdPlaceholder />
          
          <h2 className="text-2xl font-bold text-foreground mb-8 mt-8">Crypto Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <ToolCard 
              title="Crypto Profit Calculator" 
              description="Calculate your net profit, ROI, and break-even price for your crypto trades."
              href="/crypto-profit-calculator"
              icon={<Bitcoin className="h-6 w-6" />}
            />
            <ToolCard 
              title="Currency Converter" 
              description="Convert fiat values to estimate your investment capital."
              href="/currency-converter"
              icon={<Calculator className="h-6 w-6" />}
            />
          </div>

          <AdPlaceholder />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Crypto Guides</h2>
              <div className="space-y-4">
                <Link href="/how-to-calculate-crypto-profit" className="block p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card">
                  <h3 className="text-lg font-bold text-primary mb-2">How to Calculate Crypto Profit accurately</h3>
                  <p className="text-muted-foreground text-sm">Don't forget the fees. Learn the formula for calculating true net profit and ROI on your digital asset trades.</p>
                </Link>
                <Link href="/crypto-profit-vs-loss-explained" className="block p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card">
                  <h3 className="text-lg font-bold text-primary mb-2">Profit vs Loss: Knowing Your Break-even</h3>
                  <p className="text-muted-foreground text-sm">Why understanding your break-even price is critical for setting stop-losses and take-profit targets.</p>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Crypto FAQ</h2>
              <FAQAccordion items={[
                {
                  question: "How do exchange fees affect my profit?",
                  answer: "Exchanges charge fees on both the buy and sell sides. Even if the price of an asset goes up slightly, you might still take a loss once trading fees and network (gas) fees are factored in."
                },
                {
                  question: "What is ROI?",
                  answer: "ROI stands for Return on Investment. It is the ratio of your net profit to your total initial investment, expressed as a percentage. It's the best way to compare the performance of different trades."
                },
                {
                  question: "Do I need to pay taxes on crypto gains?",
                  answer: "In most jurisdictions, yes. Cryptocurrency trades are generally subject to capital gains tax. You should track your profit and loss accurately and consult a tax professional in your region."
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
