import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TrendingUp, PiggyBank, Briefcase, Calculator, ArrowRight, PlayCircle, ShieldCheck, Zap } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function FinanceCategory() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-emerald-500/20">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative overflow-hidden bg-slate-950 pt-24 pb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white mb-8 shadow-lg shadow-emerald-500/20">
                <TrendingUp className="h-10 w-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Personal <span className="text-emerald-400">Finance</span></h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Build wealth, plan for the future, and manage your everyday finances with our suite of smart calculators.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 h-14" asChild>
                  <Link href="/compound-interest-calculator">Calculate Compound Interest</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full font-bold px-8 h-14 bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                  <Link href="/savings-goal-calculator">Set Savings Goal</Link>
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
                <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-1">3.2M</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interest Calculated</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-1">$840B</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Wealth Tracked</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-1">2.4M</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Goals Reached</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-1">0%</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cost to Use</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-16">
          
          {/* Section 3: Tool Cards Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Essential Finance Tools</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Compound Interest" 
                  description="See how your money can grow exponentially over time with regular contributions."
                  href="/compound-interest-calculator"
                  icon={<TrendingUp className="h-7 w-7" />}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Savings Goal" 
                  description="Find out exactly how much you need to save monthly to reach your financial target."
                  href="/savings-goal-calculator"
                  icon={<PiggyBank className="h-7 w-7" />}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Currency Converter" 
                  description="Check live exchange rates and convert between over 20 global currencies."
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
                <h2 className="text-3xl font-black text-slate-900 mb-6">Learn the Fundamentals</h2>
                
                {/* Featured Article */}
                <Link href="/what-is-compound-interest" className="group block mb-8">
                  <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl relative h-80 flex flex-col justify-end p-8 border border-slate-800 hover:border-emerald-500/50 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10"></div>
                    <div className="absolute top-0 right-0 w-full h-full bg-emerald-900/20 z-0"></div>
                    
                    <div className="relative z-20">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-3">
                        <PlayCircle className="h-4 w-4" /> Start Here
                      </div>
                      <h3 className="text-3xl font-black text-white mb-3 group-hover:text-emerald-300 transition-colors">What is Compound Interest?</h3>
                      <p className="text-slate-300 max-w-lg leading-relaxed">Learn the basics of how compounding works and why it's often called the eighth wonder of the world.</p>
                    </div>
                  </div>
                </Link>

                <h3 className="text-xl font-bold text-slate-900 mb-4">Popular Guides</h3>
                <div className="space-y-4">
                  <Link href="/how-to-save-money-faster" className="flex items-center gap-6 p-4 rounded-xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all bg-white group">
                    <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors shrink-0">
                      <PiggyBank className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">How to Save Money Faster</h4>
                      <p className="text-slate-500 text-sm">Actionable strategies and automated systems to help you hit your savings goals ahead of schedule.</p>
                    </div>
                  </Link>
                  <Link href="/how-currency-conversion-works" className="flex items-center gap-6 p-4 rounded-xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all bg-white group">
                    <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors shrink-0">
                      <Calculator className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">Understanding Currency Exchange</h4>
                      <p className="text-slate-500 text-sm">A beginner's guide to FOREX, conversion rates, and what drives currency valuation globally.</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 6: FAQ */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Finance FAQ</h2>
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
              
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
                <ShieldCheck className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Secure & Private</h3>
                <p className="text-slate-500 text-sm mb-6">Your financial data never leaves your browser. We don't store or sell your personal numbers.</p>
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
