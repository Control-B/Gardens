import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { AIBar } from "@/components/AIBar";
import { ToolCard } from "@/components/ToolCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TrendingUp, PiggyBank, Calculator, PlayCircle, ShieldCheck, DollarSign, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseNaturalLanguage } from "@/lib/nlParser";
import heroBg from "@assets/Landing41.jpeg";
import articleBg from "@assets/Landing39.jpeg";
import toolCompound from "@assets/Landing41.jpeg";
import toolSavings from "@assets/Landing39.jpeg";
import toolCurrency from "@assets/Landing22.jpeg";
import step1Img from "@assets/Landing39.jpeg";
import step2Img from "@assets/Landing62.jpeg";
import step3Img from "@assets/Landing47.jpeg";
import slide1 from "@assets/Landing62.jpeg";
import slide2 from "@assets/Landing41.jpeg";
import slide3 from "@assets/Landing39.jpeg";
import slide4 from "@assets/Landing15.jpeg";
import slide5 from "@assets/Landing47.jpeg";
import slide6 from "@assets/Landing49.jpeg";

const carouselSlides = [
  { src: slide1, label: "Finance Dashboard", message: "Your wealth, visualized.", gradient: "from-emerald-300 to-teal-300" },
  { src: slide2, label: "Compound Growth", message: "Let your money work for you.", gradient: "from-lime-300 to-emerald-300" },
  { src: slide3, label: "Savings Planning", message: "Every penny counts.", gradient: "from-teal-300 to-cyan-300" },
  { src: slide4, label: "Portfolio Tracker", message: "Know your numbers.", gradient: "from-green-300 to-emerald-300" },
  { src: slide5, label: "Data-Driven Decisions", message: "Plan smarter, live better.", gradient: "from-emerald-300 to-lime-300" },
  { src: slide6, label: "Smart Finance Tools", message: "AI-powered financial clarity.", gradient: "from-cyan-300 to-teal-300" },
];

export default function FinanceCategory() {
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
    setLocation(intent ? `${intent.calculator}?${new URLSearchParams(intent.params)}` : "/compound-interest-calculator");
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
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-emerald-950/80 to-slate-900/85"></div>
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white mb-8 shadow-lg shadow-emerald-500/20">
                <TrendingUp className="h-10 w-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Finance</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">Build wealth, plan for the future, and manage your everyday finances with our suite of smart calculators.</p>
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

        {/* AI Bar */}
        <AIBar
          placeholder="Ask any finance question, e.g. 'How long to double $20k at 7% compound interest?'"
          suggestions={[
            "How does compound interest work?",
            "How much should I save monthly for retirement?",
            "What's better: lump sum or monthly investing?",
            "Convert $5,000 USD to EUR",
          ]}
          accentColor="text-emerald-400"
        />

        {/* Stats Strip */}
        <section className="bg-slate-900 border-b border-slate-800 py-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[["3.2M","Interest Calculated"],["$840B","Total Wealth Tracked"],["2.4M","Goals Reached"],["0%","Cost to Use"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 mb-1">{val}</div>
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
            <h2 className="text-3xl font-black text-slate-900 mb-8">Essential Finance Tools</h2>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants}>
                <ToolCard title="Compound Interest" description="See how your money grows exponentially over time with regular contributions." href="/compound-interest-calculator" icon={<TrendingUp className="h-7 w-7" />} backgroundImage={toolCompound} titleGradient="from-emerald-300 to-teal-300" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard title="Savings Goal" description="Find out exactly how much you need to save monthly to reach your target." href="/savings-goal-calculator" icon={<PiggyBank className="h-7 w-7" />} backgroundImage={toolSavings} titleGradient="from-lime-300 to-emerald-300" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard title="Currency Converter" description="Check live exchange rates and convert between over 20 global currencies." href="/currency-converter" icon={<DollarSign className="h-7 w-7" />} backgroundImage={toolCurrency} titleGradient="from-cyan-300 to-sky-300" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Carousel */}
        <section className="py-24 bg-slate-900 overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 mb-12 text-center">
            <h2 className="text-4xl font-black text-white mb-4">Finance, Simplified for Everyone</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Real tools for real financial decisions — all in one place.</p>
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
              <button key={i} onClick={() => scrollTo(i)} className={`h-2 rounded-full transition-all duration-300 ${i === carouselIndex ? "w-8 bg-emerald-400" : "w-2 bg-slate-600 hover:bg-slate-400"}`} />
            ))}
          </div>
        </section>

        {/* Learn the Fundamentals */}
        <section className="bg-slate-900 py-20">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-black text-white mb-8">Learn the Fundamentals</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7 space-y-8">
                <Link href="/what-is-compound-interest" className="group block">
                  <div className="rounded-2xl overflow-hidden shadow-xl relative h-80 flex flex-col justify-end p-8 border border-slate-700 hover:border-emerald-500/50 transition-colors">
                    <img src={articleBg} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-3"><PlayCircle className="h-4 w-4" /> Start Here</div>
                      <h3 className="text-3xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-teal-300 transition-all">What is Compound Interest?</h3>
                      <p className="text-slate-300 max-w-lg leading-relaxed">Learn the basics of how compounding works and why it's called the eighth wonder of the world.</p>
                    </div>
                  </div>
                </Link>
                <h3 className="text-xl font-bold text-white mb-4">Popular Guides</h3>
                <div className="space-y-4">
                  {[{ href: "/how-to-save-money-faster", icon: <PiggyBank className="h-8 w-8" />, title: "How to Save Money Faster", desc: "Actionable strategies and automated systems to hit your savings goals ahead of schedule." },
                    { href: "/how-currency-conversion-works", icon: <Calculator className="h-8 w-8" />, title: "Understanding Currency Exchange", desc: "A beginner's guide to FOREX, conversion rates, and what drives currency valuation." }
                  ].map(({ href, icon, title, desc }) => (
                    <Link key={href} href={href} className="flex items-center gap-6 p-4 rounded-xl border border-slate-700 hover:border-emerald-500/50 hover:shadow-md transition-all bg-slate-800 group">
                      <div className="h-16 w-16 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-emerald-900/50 group-hover:text-emerald-400 transition-colors shrink-0">{icon}</div>
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">{title}</h4>
                        <p className="text-slate-400 text-sm">{desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h2 className="text-2xl font-black text-white mb-6">Finance FAQ</h2>
                  <FAQAccordion items={[
                    { question: "How much should I save each month?", answer: "A common rule of thumb is the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment." },
                    { question: "What is an emergency fund?", answer: "An emergency fund covers unexpected expenses. Experts recommend 3–6 months of living expenses." },
                    { question: "Why is compound interest important?", answer: "Compound interest earns returns on both principal and accumulated interest, causing exponential wealth growth over time." }
                  ]} />
                </div>
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center">
                  <ShieldCheck className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
                  <p className="text-slate-400 text-sm mb-6">Your financial data never leaves your browser. We don't store or sell your numbers.</p>
                  <Button className="w-full rounded-full bg-emerald-600 hover:bg-emerald-500 text-white border-0" variant="outline">Read Privacy Policy</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-slate-900">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 mb-4">From Numbers to Clarity in 3 Steps</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">No spreadsheets. No confusion. Just clear, actionable financial insight.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01", title: "Enter your numbers", icon: <Search className="h-6 w-6" />,
                  desc: "Type your scenario in plain English or fill in the form fields. Our tools handle the math instantly.",
                  img: step1Img, gradient: "from-emerald-300 to-teal-300", accent: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                },
                {
                  step: "02", title: "See precise results", icon: <TrendingUp className="h-6 w-6" />,
                  desc: "Interactive charts and detailed breakdowns make complex calculations easy to understand at a glance.",
                  img: step2Img, gradient: "from-teal-300 to-cyan-300", accent: "bg-teal-500/20 text-teal-300 border-teal-500/30"
                },
                {
                  step: "03", title: "Make better decisions", icon: <CheckCircle2 className="h-6 w-6" />,
                  desc: "Use data-driven insights to understand risks, opportunities, and ways to optimize your finances.",
                  img: step3Img, gradient: "from-cyan-300 to-sky-300", accent: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                },
              ].map(({ step, title, desc, icon, img, gradient, accent }) => (
                <div key={step} className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative h-48 overflow-hidden">
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/40 to-transparent"></div>
                    <div className={`absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold ${accent}`}>
                      {icon} Step {step}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-3`}>{title}</h3>
                    <p className="text-slate-300 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-500 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Start calculating smarter, right now.</h2>
            <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto font-medium">No account needed. No data saved. Always free.</p>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center shadow-2xl rounded-full p-2 bg-white/10 backdrop-blur-md border border-white/20">
              <Search className="absolute left-6 h-6 w-6 text-white/70" />
              <Input type="text" placeholder="e.g. compound interest on 10000 at 5% for 10 years" className="h-16 pl-16 pr-40 text-lg rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-white placeholder:text-white/60" value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button type="submit" className="absolute right-2 h-14 rounded-full px-8 font-bold bg-white text-emerald-700 hover:bg-slate-100 shadow-md text-lg">
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
