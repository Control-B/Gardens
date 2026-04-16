import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Bitcoin, Calculator, PlayCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CryptoCategory() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-orange-500/20">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative overflow-hidden bg-slate-950 pt-24 pb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white mb-8 shadow-lg shadow-orange-500/20">
                <Bitcoin className="h-10 w-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Cryptocurrency <span className="text-orange-400">Tools</span></h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Calculate your trading profits, analyze ROI, and manage your digital asset portfolio with precision.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-14" asChild>
                  <Link href="/crypto-profit-calculator">Calculate Crypto Profit</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full font-bold px-8 h-14 bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                  <Link href="/currency-converter">Convert Fiat Rates</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Stats Strip */}
        <section className="bg-slate-50 border-b border-slate-200 py-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-black text-orange-500 mb-1">10M+</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trades Analyzed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-orange-500 mb-1">99.9%</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Math Accuracy</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-orange-500 mb-1">$45B</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Volume Calculated</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-orange-500 mb-1">All</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Major Coins</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-16">
          
          {/* Section 3: Tool Cards Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Essential Crypto Tools</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Crypto Profit Calculator" 
                  description="Calculate your net profit, ROI, and break-even price for your crypto trades."
                  href="/crypto-profit-calculator"
                  icon={<Bitcoin className="h-7 w-7" />}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Currency Converter" 
                  description="Convert fiat values to estimate your investment capital."
                  href="/currency-converter"
                  icon={<Calculator className="h-7 w-7" />}
                />
              </motion.div>
            </motion.div>
          </div>

          <AdPlaceholder />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20">
            
            {/* Section 4 & 5: Educational Resources & Popular Articles */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Crypto Guides & Resources</h2>
                
                {/* Featured Article */}
                <Link href="/how-to-calculate-crypto-profit" className="group block mb-8">
                  <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl relative h-80 flex flex-col justify-end p-8 border border-slate-800 hover:border-orange-500/50 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10"></div>
                    <div className="absolute top-0 right-0 w-full h-full bg-orange-900/20 z-0"></div>
                    
                    <div className="relative z-20">
                      <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider mb-3">
                        <PlayCircle className="h-4 w-4" /> Recommended
                      </div>
                      <h3 className="text-3xl font-black text-white mb-3 group-hover:text-orange-300 transition-colors">How to Calculate Crypto Profit accurately</h3>
                      <p className="text-slate-300 max-w-lg leading-relaxed">Don't forget the fees. Learn the formula for calculating true net profit and ROI on your digital asset trades.</p>
                    </div>
                  </div>
                </Link>

                <h3 className="text-xl font-bold text-slate-900 mb-4">Popular Guides</h3>
                <div className="space-y-4">
                  <Link href="/crypto-profit-vs-loss-explained" className="flex items-center gap-6 p-4 rounded-xl border border-slate-200 hover:border-orange-500/50 hover:shadow-md transition-all bg-white group">
                    <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors shrink-0">
                      <Bitcoin className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-1">Profit vs Loss: Knowing Your Break-even</h4>
                      <p className="text-slate-500 text-sm">Why understanding your break-even price is critical for setting stop-losses and take-profit targets.</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 6: FAQ */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Crypto FAQ</h2>
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
              
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
                <ShieldCheck className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Secure & Private</h3>
                <p className="text-slate-500 text-sm mb-6">We never connect to your wallet or exchange accounts. All calculations are mathematical and stateless.</p>
                <Button className="w-full rounded-full" variant="outline">Read Privacy Policy</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
