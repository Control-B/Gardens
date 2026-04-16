import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Home, Briefcase, PlayCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LoansCategory() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500/20">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative overflow-hidden bg-slate-950 pt-24 pb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white mb-8 shadow-lg shadow-indigo-500/20">
                <Home className="h-10 w-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Loans & <span className="text-indigo-400">Mortgages</span></h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Take the guesswork out of borrowing. Estimate monthly payments, analyze amortization, and manage your debt safely.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-8 h-14" asChild>
                  <Link href="/mortgage-calculator">Calculate Mortgage</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full font-bold px-8 h-14 bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                  <Link href="/loan-payment-calculator">Calculate Loan</Link>
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
                <div className="text-3xl md:text-4xl font-black text-indigo-600 mb-1">8.5M</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mortgages Analyzed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-indigo-600 mb-1">$1.2T</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loan Value</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-indigo-600 mb-1">100%</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Data Privacy</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-indigo-600 mb-1">PITI</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Breakdown</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-16">
          
          {/* Section 3: Tool Cards Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Borrowing Tools</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Mortgage Calculator" 
                  description="Estimate your monthly mortgage payments including taxes and insurance."
                  href="/mortgage-calculator"
                  icon={<Home className="h-7 w-7" />}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Loan Payment" 
                  description="Calculate your monthly payments and total interest for personal, auto, or student loans."
                  href="/loan-payment-calculator"
                  icon={<Briefcase className="h-7 w-7" />}
                />
              </motion.div>
            </motion.div>
          </div>

          <AdPlaceholder />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20">
            
            {/* Section 4 & 5: Educational Resources & Popular Articles */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Loan Guides & Resources</h2>
                
                {/* Featured Article */}
                <Link href="/how-to-calculate-mortgage-payments" className="group block mb-8">
                  <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl relative h-80 flex flex-col justify-end p-8 border border-slate-800 hover:border-indigo-500/50 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10"></div>
                    <div className="absolute top-0 right-0 w-full h-full bg-indigo-900/20 z-0"></div>
                    
                    <div className="relative z-20">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-3">
                        <PlayCircle className="h-4 w-4" /> Home Buying
                      </div>
                      <h3 className="text-3xl font-black text-white mb-3 group-hover:text-indigo-300 transition-colors">How to Calculate Mortgage Payments</h3>
                      <p className="text-slate-300 max-w-lg leading-relaxed">Understand the components of a mortgage payment: Principal, Interest, Taxes, and Insurance (PITI).</p>
                    </div>
                  </div>
                </Link>

                <h3 className="text-xl font-bold text-slate-900 mb-4">Popular Guides</h3>
                <div className="space-y-4">
                  <Link href="/loan-interest-explained" className="flex items-center gap-6 p-4 rounded-xl border border-slate-200 hover:border-indigo-500/50 hover:shadow-md transition-all bg-white group">
                    <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors shrink-0">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">Loan Interest & Amortization Explained</h4>
                      <p className="text-slate-500 text-sm">Why your early loan payments are mostly interest, and how making extra principal payments saves you money.</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 6: FAQ */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Loan FAQ</h2>
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
              
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
                <ShieldCheck className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Secure & Private</h3>
                <p className="text-slate-500 text-sm mb-6">Your debt details remain strictly on your device. We do not transmit or store loan data.</p>
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
