import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Calculator, Home, Briefcase, Bitcoin, PiggyBank, DollarSign, TrendingUp, CheckCircle2, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { CategoryCard } from "@/components/CategoryCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { motion } from "framer-motion";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const intent = parseNaturalLanguage(query);
    if (intent) {
      const searchParams = new URLSearchParams(intent.params).toString();
      setLocation(`${intent.calculator}?${searchParams}`);
    } else {
      // Default fallback
      setLocation("/compound-interest-calculator");
    }
  };

  const setExampleQuery = (text: string) => {
    setQuery(text);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative overflow-hidden bg-slate-950 pt-24 pb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-left"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
                  AI-Powered Financial Tools
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                  Calculate anything <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">instantly</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl">
                  Your smart financial hub for compound interest, mortgages, loans, and crypto. Fast, precise, and completely private.
                </p>

                <div className="relative max-w-xl mb-6 group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-full p-2 shadow-xl">
                    <Search className="absolute left-5 h-6 w-6 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="e.g. mortgage on 500k at 6.5%"
                      className="h-14 pl-14 pr-36 text-lg rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-slate-900 placeholder:text-slate-400"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      data-testid="input-hero-search"
                    />
                    <Button 
                      type="submit" 
                      className="absolute right-2 h-12 rounded-full px-8 font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all hover:shadow-lg"
                      data-testid="btn-hero-calculate"
                    >
                      Calculate
                    </Button>
                  </form>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="font-medium">Try:</span>
                  <button onClick={() => setExampleQuery("mortgage on 500000 with 20% down at 6.5%")} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    🏠 Mortgage
                  </button>
                  <button onClick={() => setExampleQuery("compound interest on 10000 at 5% for 10 years")} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    📈 Compound Interest
                  </button>
                  <button onClick={() => setExampleQuery("loan of 25000 at 7% for 60 months")} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    🚗 Auto Loan
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="relative lg:h-[600px] flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
                <img 
                  src="/images/hero-dashboard.png" 
                  alt="Modern financial dashboard UI mockup" 
                  className="relative z-10 w-full max-w-lg mx-auto rounded-2xl shadow-2xl shadow-black/50 border border-white/10"
                />
                
                {/* Floating stat cards */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -left-8 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl z-20 hidden md:block"
                >
                  <div className="text-sm text-blue-200 font-medium mb-1">Total Calculations</div>
                  <div className="text-2xl font-black text-white">500K+</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -right-4 bottom-1/3 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl z-20 hidden md:block"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-white font-bold">100% Free & Private</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
            <ArrowRight className="h-6 w-6 rotate-90" />
          </div>
        </section>

        {/* Section 2: Trust Strip */}
        <section className="bg-slate-50 border-b border-slate-200 py-12">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              <motion.div variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">500k+</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Calculations Run</div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">98%</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">User Satisfaction</div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">$2.3B+</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Calculated</div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">100%</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Free Forever</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Featured Calculators */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">The Financial Tools You Need</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">Powerful, precise calculators designed to give you clarity on your financial journey.</p>
            </div>
            
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
                  title="Mortgage Calculator" 
                  description="Estimate your monthly mortgage payments including taxes, insurance, and HOA."
                  href="/mortgage-calculator"
                  icon={<Home className="h-7 w-7" />}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Loan Payment" 
                  description="Calculate your monthly payments, total interest, and payoff timeline for any loan."
                  href="/loan-payment-calculator"
                  icon={<Briefcase className="h-7 w-7" />}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Currency Converter" 
                  description="Check exchange rates and convert between over 20 global currencies instantly."
                  href="/currency-converter"
                  icon={<DollarSign className="h-7 w-7" />}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Crypto Profit" 
                  description="Calculate your net profit, ROI, and break-even price for cryptocurrency trades."
                  href="/crypto-profit-calculator"
                  icon={<Bitcoin className="h-7 w-7" />}
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
            </motion.div>
            
            <div className="mt-16 text-center">
              <AdPlaceholder />
            </div>
          </div>
        </section>

        {/* Section 4: How It Works */}
        <section className="py-24 bg-slate-50 overflow-hidden">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Smarter Calculations, Simplified</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">We've removed the complexity from financial planning so you can focus on making the right decisions.</p>
            </div>

            <div className="space-y-24">
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
              >
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold mb-6">1</div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Ask in plain English</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Don't worry about finding the right form fields. Just type your scenario into our search bar exactly as you would say it out loud.
                  </p>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Natural language processing understands intent</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Automatically extracts numbers and rates</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Routes you to the correct calculator instantly</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                    <img src="/images/hero-dashboard.png" alt="Person typing on laptop" className="w-full h-auto object-cover scale-110" />
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
              >
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl p-8 bg-white border border-slate-100">
                    {/* Mock chart illustration */}
                    <div className="flex items-end gap-2 h-48 mb-6">
                      <div className="w-1/6 bg-blue-100 rounded-t-sm h-1/6"></div>
                      <div className="w-1/6 bg-blue-200 rounded-t-sm h-2/6"></div>
                      <div className="w-1/6 bg-blue-300 rounded-t-sm h-3/6"></div>
                      <div className="w-1/6 bg-blue-400 rounded-t-sm h-4/6"></div>
                      <div className="w-1/6 bg-blue-500 rounded-t-sm h-5/6"></div>
                      <div className="w-1/6 bg-blue-600 rounded-t-sm h-full"></div>
                    </div>
                    <div className="h-4 bg-slate-100 rounded w-full mb-3"></div>
                    <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold mb-6">2</div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Get precise, visual results</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    See exactly where your money goes. Interactive charts and detailed amortization tables make complex math easy to understand at a glance.
                  </p>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Interactive, responsive data visualizations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Detailed month-by-month breakdowns</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Deterministic, industry-standard formulas</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
              >
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold mb-6">3</div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Understand with AI insights</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Raw numbers aren't enough. Our AI analyzes your specific calculation to provide contextual advice, highlighting risks and opportunities.
                  </p>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Personalized analysis of your results</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Actionable tips to save money</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Contextual warnings for high-risk scenarios</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-xl border border-blue-100">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">AI</span>
                        </div>
                        <div className="font-bold text-slate-900">AI Insight</div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-3 bg-slate-100 rounded w-full"></div>
                        <div className="h-3 bg-slate-100 rounded w-11/12"></div>
                        <div className="h-3 bg-slate-100 rounded w-full"></div>
                        <div className="h-3 bg-slate-100 rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 5: Category Explorer */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">Explore Categories</h2>
                <p className="text-lg text-slate-500 max-w-xl">Find the exact tool you need organized by financial domain.</p>
              </div>
              <Button variant="outline" className="hidden md:flex font-semibold" asChild>
                <a href="/finance">View All Tools <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div variants={itemVariants} className="h-full">
                <CategoryCard 
                  title="Finance" 
                  description="Wealth building, savings goals, and compound interest."
                  href="/finance"
                  icon={<TrendingUp className="h-8 w-8" />}
                  colorClass="text-emerald-600 bg-emerald-100 shadow-emerald-500/20"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="h-full">
                <CategoryCard 
                  title="Crypto" 
                  description="Trading profits, ROI calculators, and conversion tools."
                  href="/crypto"
                  icon={<Bitcoin className="h-8 w-8" />}
                  colorClass="text-orange-500 bg-orange-100 shadow-orange-500/20"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="h-full">
                <CategoryCard 
                  title="Loans" 
                  description="Mortgages, auto loans, and debt payoff planning."
                  href="/loans"
                  icon={<Home className="h-8 w-8" />}
                  colorClass="text-indigo-600 bg-indigo-100 shadow-indigo-500/20"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 6: Educational Resources */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">Learn the Fundamentals</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Master the concepts behind the math to make smarter long-term decisions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Article 1 */}
              <a href="/what-is-compound-interest" className="group block h-full">
                <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-2xl group-hover:-translate-y-2 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-emerald-900 to-slate-800 relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                      <TrendingUp className="h-20 w-20 text-emerald-400" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Investing • 5 min read</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">The Magic of Compound Interest</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow">Discover how earning interest on your interest can turn small, consistent contributions into massive wealth over time.</p>
                  </div>
                </div>
              </a>

              {/* Article 2 */}
              <a href="/how-to-calculate-mortgage-payments" className="group block h-full">
                <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-2xl group-hover:-translate-y-2 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-indigo-900 to-slate-800 relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                      <Home className="h-20 w-20 text-indigo-400" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">Real Estate • 8 min read</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Deconstructing Your Mortgage</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow">Understand PITI, amortization schedules, and how making extra principal payments can save you thousands.</p>
                  </div>
                </div>
              </a>

              {/* Article 3 */}
              <a href="/crypto-profit-vs-loss-explained" className="group block h-full">
                <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-2xl group-hover:-translate-y-2 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-orange-900 to-slate-800 relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                      <Bitcoin className="h-20 w-20 text-orange-400" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-3">Crypto • 6 min read</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Calculating Crypto ROI Realistically</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow">Learn how to factor in network fees, exchange spreads, and taxes when calculating your true cryptocurrency profits.</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Section 7: Testimonials */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Loved by Smart Planners</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">See how people use our tools to make life-changing financial decisions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
                <div className="flex text-amber-400 mb-4">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 italic">"I used the mortgage calculator to confirm I could actually afford my first home. The breakdown of taxes and insurance gave me the confidence to make an offer. Way better than the basic bank calculators."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">SM</div>
                  <div>
                    <div className="font-bold text-slate-900">Sarah M.</div>
                    <div className="text-sm text-slate-500">First-time Homebuyer</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
                <div className="flex text-amber-400 mb-4">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 italic">"The AI insights on the compound interest tool blew my mind. It showed me that just adding $50 more per month would shave 3 years off my retirement goal. I updated my auto-transfer that same day."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">JD</div>
                  <div>
                    <div className="font-bold text-slate-900">James D.</div>
                    <div className="text-sm text-slate-500">Retail Investor</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
                <div className="flex text-amber-400 mb-4">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 italic">"The natural language search is incredible. I literally just typed 'loan of 15k at 8% for 4 years' and boom—there was my amortization table. Fast, clean, and exactly what I needed."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">ML</div>
                  <div>
                    <div className="font-bold text-slate-900">Marcus L.</div>
                    <div className="text-sm text-slate-500">Small Business Owner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: CTA Banner */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Start calculating smarter, right now.</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">No account needed. No data saved. Always free.</p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center shadow-2xl rounded-full p-2 bg-white/10 backdrop-blur-md border border-white/20">
              <Search className="absolute left-6 h-6 w-6 text-white/70" />
              <Input
                type="text"
                placeholder="What do you want to calculate?"
                className="h-16 pl-16 pr-40 text-lg rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-white placeholder:text-white/60"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-2 h-14 rounded-full px-8 font-bold bg-white text-blue-700 hover:bg-slate-100 shadow-md text-lg"
              >
                Go <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
