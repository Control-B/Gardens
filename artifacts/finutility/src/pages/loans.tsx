import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { AIBar } from "@/components/AIBar";
import { ToolCard } from "@/components/ToolCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Home, Briefcase, PlayCircle, ShieldCheck, Search, ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseNaturalLanguage } from "@/lib/nlParser";
import heroBg from "@assets/Landing65.jpeg";
import articleBg from "@assets/Landing67.jpeg";
import toolMortgage from "@assets/Landing37.jpeg";
import toolLoan from "@assets/Landing66.jpeg";
import slide1 from "@assets/Landing65.jpeg";
import slide2 from "@assets/Landing67.jpeg";
import slide3 from "@assets/Landing37.jpeg";
import slide4 from "@assets/Landing66.jpeg";
import slide5 from "@assets/Landing36.jpeg";
import slide6 from "@assets/Landing61.jpeg";

const carouselSlides = [
  { src: slide1, label: "Mortgage Calculator", message: "Own your dream home.", gradient: "from-blue-300 to-indigo-300" },
  { src: slide2, label: "Payment Breakdown", message: "Know every dollar you owe.", gradient: "from-indigo-300 to-violet-300" },
  { src: slide3, label: "Home Buying Tools", message: "Calculate before you commit.", gradient: "from-cyan-300 to-blue-300" },
  { src: slide4, label: "Loan Calculator", message: "Break down every payment.", gradient: "from-orange-300 to-amber-300" },
  { src: slide5, label: "Smart Borrowing", message: "Borrow smarter, pay less.", gradient: "from-sky-300 to-indigo-300" },
  { src: slide6, label: "Loan Steps", message: "Clarity at every step.", gradient: "from-violet-300 to-blue-300" },
];

export default function LoansCategory() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [carouselIndex, setCarouselIndex] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCarouselIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 3500);
    return () => { emblaApi.off("select", onSelect); clearInterval(timer); };
  }, [emblaApi]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const intent = parseNaturalLanguage(query);
    setLocation(intent ? `${intent.calculator}?${new URLSearchParams(intent.params)}` : "/mortgage-calculator");
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 pt-24 pb-32">
          <div className="absolute inset-0 z-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-indigo-950/80 to-slate-900/85"></div>
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-600 text-white mb-8 shadow-lg shadow-indigo-500/20">
                <Home className="h-10 w-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Loans & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300">Mortgages</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">Take the guesswork out of borrowing. Estimate monthly payments, analyze amortization, and manage your debt safely.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 h-14" asChild>
                  <Link href="/mortgage-calculator">Calculate Mortgage</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full font-bold px-8 h-14 bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                  <Link href="/loan-payment-calculator">Calculate Loan</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI Bar */}
        <AIBar
          placeholder="Ask any loan question, e.g. 'What's my monthly mortgage on a $450k home with 20% down at 6.5%?'"
          suggestions={[
            "What mortgage can I afford on $90k salary?",
            "How much interest on a $300k mortgage at 6.5% for 30 years?",
            "Should I pay extra on my mortgage principal?",
            "Difference between fixed vs adjustable-rate mortgage?",
          ]}
          accentColor="text-indigo-400"
        />

        {/* Stats Strip */}
        <section className="bg-slate-900 border-b border-slate-800 py-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[["8.5M","Mortgages Analyzed"],["$1.2T","Loan Value"],["100%","Data Privacy"],["PITI","Full Breakdown"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300 mb-1">{val}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ad */}
        <div className="bg-white px-4 pt-4 pb-4">
          <div className="container mx-auto px-4 md:px-8">
            <AdPlaceholder />
          </div>
        </div>

        {/* Tool Cards */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Borrowing Tools</h2>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants}>
                <ToolCard title="Mortgage Calculator" description="Estimate your monthly mortgage payments including taxes, insurance, and HOA." href="/mortgage-calculator" icon={<Home className="h-7 w-7" />} backgroundImage={toolMortgage} titleGradient="from-blue-300 to-indigo-300" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard title="Loan Payment" description="Calculate monthly payments and total interest for personal, auto, or student loans." href="/loan-payment-calculator" icon={<Briefcase className="h-7 w-7" />} backgroundImage={toolLoan} titleGradient="from-orange-300 to-amber-300" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard title="Compound Interest" description="See how interest compounds on your loan or savings over time and plan your repayment strategy." href="/compound-interest-calculator" icon={<TrendingUp className="h-7 w-7" />} backgroundImage={slide3} titleGradient="from-emerald-300 to-teal-300" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Carousel */}
        <section className="py-24 bg-slate-900 overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 mb-12 text-center">
            <h2 className="text-4xl font-black text-white mb-4">Built for Every Borrower</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Understand your loan before you sign — every time.</p>
          </div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 px-8">
              {carouselSlides.map((img, i) => (
                <div key={i} className="relative shrink-0 w-[85vw] md:w-[55vw] lg:w-[40vw] rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-500"
                  style={{ opacity: i === carouselIndex ? 1 : 0.45, transform: i === carouselIndex ? "scale(1)" : "scale(0.93)" }}
                  onClick={() => scrollTo(i)}>
                  <img src={img.src} alt={img.label} className="w-full h-64 md:h-80 object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 gap-2">
                    <p className={`text-2xl font-black text-transparent bg-clip-text bg-linear-to-r ${img.gradient} leading-tight`}>{img.message}</p>
                    <span className="text-white/70 text-sm bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 w-fit">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {carouselSlides.map((_, i) => (
              <button key={i} onClick={() => scrollTo(i)} className={`h-2 rounded-full transition-all duration-300 ${i === carouselIndex ? "w-8 bg-indigo-400" : "w-2 bg-slate-600 hover:bg-slate-400"}`} />
            ))}
          </div>
        </section>

        {/* Learn the Fundamentals */}
        <section className="bg-slate-900 py-20">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-black text-white mb-8">Loan Guides & Resources</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7 space-y-8">
                <Link href="/how-to-calculate-mortgage-payments" className="group block">
                  <div className="rounded-2xl overflow-hidden shadow-xl relative h-80 flex flex-col justify-end p-8 border border-slate-700 hover:border-indigo-500/50 transition-colors">
                    <img src={articleBg} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-3"><PlayCircle className="h-4 w-4" /> Home Buying</div>
                      <h3 className="text-3xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-blue-300 transition-all">How to Calculate Mortgage Payments</h3>
                      <p className="text-slate-300 max-w-lg leading-relaxed">Understand the components of a mortgage payment: Principal, Interest, Taxes, and Insurance (PITI).</p>
                    </div>
                  </div>
                </Link>
                <h3 className="text-xl font-bold text-white mb-4">Popular Guides</h3>
                <div className="space-y-4">
                  <Link href="/loan-interest-explained" className="flex items-center gap-6 p-4 rounded-xl border border-slate-700 hover:border-indigo-500/50 hover:shadow-md transition-all bg-slate-800 group">
                    <div className="h-16 w-16 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-indigo-900/50 group-hover:text-indigo-400 transition-colors shrink-0"><Briefcase className="h-8 w-8" /></div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">Loan Interest & Amortization Explained</h4>
                      <p className="text-slate-400 text-sm">Why your early loan payments are mostly interest, and how extra principal payments save you money.</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h2 className="text-2xl font-black text-white mb-6">Loan FAQ</h2>
                  <FAQAccordion items={[
                    { question: "What is APR vs Interest Rate?", answer: "The interest rate is the cost of borrowing the principal. APR includes the interest rate plus any lender fees, giving a truer picture of total cost." },
                    { question: "How does a down payment affect my loan?", answer: "A larger down payment reduces the amount you borrow, lowers your monthly payment, and reduces total interest. For mortgages it can eliminate PMI." },
                    { question: "What does amortized mean?", answer: "Amortization spreads a loan into fixed payments over time. Early payments are mostly interest; later payments shift toward principal." }
                  ]} />
                </div>
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center">
                  <ShieldCheck className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
                  <p className="text-slate-400 text-sm mb-6">Your debt details remain strictly on your device. We do not transmit or store loan data.</p>
                  <Button className="w-full rounded-full bg-indigo-600 hover:bg-indigo-500 text-white border-0" variant="outline">Read Privacy Policy</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-slate-900">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-blue-300 mb-4">Loan Calculations, Simplified</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Know your exact payment before signing anything.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Enter your loan details", icon: <Search className="h-6 w-6" />, desc: "Input loan amount, interest rate, and term. Use our natural language search or fill in the fields.", img: slide1, gradient: "from-indigo-300 to-blue-300", accent: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
                { step: "02", title: "See your full breakdown", icon: <TrendingUp className="h-6 w-6" />, desc: "Get your monthly payment, total interest, amortization schedule, and a visual payment chart.", img: slide2, gradient: "from-blue-300 to-sky-300", accent: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
                { step: "03", title: "Make a confident decision", icon: <CheckCircle2 className="h-6 w-6" />, desc: "Compare scenarios and use data-driven insights to understand the real cost of your loan over time.", img: slide3, gradient: "from-sky-300 to-cyan-300", accent: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
              ].map(({ step, title, desc, icon, img, gradient, accent }) => (
                <div key={step} className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative h-48 overflow-hidden">
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-800 via-slate-800/40 to-transparent" />
                    <div className={`absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold ${accent}`}>
                      {icon} Step {step}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-black text-transparent bg-clip-text bg-linear-to-r ${gradient} mb-3`}>{title}</h3>
                    <p className="text-slate-300 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-500 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Start calculating smarter, right now.</h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto font-medium">No account needed. No data saved. Always free.</p>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center shadow-2xl rounded-full p-2 bg-white/10 backdrop-blur-md border border-white/20">
              <Search className="absolute left-6 h-6 w-6 text-white/70" />
              <Input type="text" placeholder="e.g. mortgage on 400k at 6.5% for 30 years" className="h-16 pl-16 pr-40 text-lg rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-white placeholder:text-white/60" value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button type="submit" className="absolute right-2 h-14 rounded-full px-8 font-bold bg-white text-indigo-700 hover:bg-slate-100 shadow-md text-lg">
                Go <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </section>

        <div className="bg-white px-4 pt-4 pb-6">
          <div className="container mx-auto px-4 md:px-8">
            <AdPlaceholder />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
