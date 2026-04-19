import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { AIBar } from "@/components/AIBar";
import { ToolCard } from "@/components/ToolCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Bitcoin, Calculator, PlayCircle, ShieldCheck, DollarSign, Search, ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseNaturalLanguage } from "@/lib/nlParser";
import heroBg from "@assets/Crypto3.jpeg";
import articleBg from "@assets/Landing48.jpeg";
import toolCrypto from "@assets/Crypto3.jpeg";
import toolCurrency from "@assets/Landing22.jpeg";
import slide1 from "@assets/Crypto3.jpeg";
import slide2 from "@assets/Landing48.jpeg";
import slide3 from "@assets/Landing22.jpeg";
import slide4 from "@assets/Landing14.jpeg";
import slide5 from "@assets/Landing7.jpeg";
import slide6 from "@assets/Landing49.jpeg";

const carouselSlides = [
  { src: slide1, label: "Crypto Dashboard", message: "Trade smarter with real data.", gradient: "from-fuchsia-300 to-violet-300" },
  { src: slide2, label: "Market Analysis", message: "Master the market.", gradient: "from-violet-300 to-purple-300" },
  { src: slide3, label: "Global Currency", message: "Convert anything, instantly.", gradient: "from-cyan-300 to-sky-300" },
  { src: slide4, label: "Investment Tracker", message: "Know your portfolio inside out.", gradient: "from-orange-300 to-amber-300" },
  { src: slide5, label: "Global Finance", message: "Your money, your rules.", gradient: "from-rose-300 to-fuchsia-300" },
  { src: slide6, label: "Smart Analytics", message: "AI-powered financial clarity.", gradient: "from-indigo-300 to-violet-300" },
];

export default function CryptoCategory() {
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
    setLocation(intent ? `${intent.calculator}?${new URLSearchParams(intent.params)}` : "/crypto-profit-calculator");
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
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-fuchsia-950/80 to-slate-900/85"></div>
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-400 to-violet-600 text-white mb-8 shadow-lg shadow-fuchsia-500/20">
                <Bitcoin className="h-10 w-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Cryptocurrency <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-violet-300">Tools</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">Calculate your trading profits, analyze ROI, and manage your digital asset portfolio with precision.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold px-8 h-14" asChild>
                  <Link href="/crypto-profit-calculator">Calculate Crypto Profit</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full font-bold px-8 h-14 bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                  <Link href="/currency-converter">Convert Fiat Rates</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI Bar */}
        <AIBar
          placeholder="Ask any crypto question, e.g. 'What's my profit if I bought BTC at $30k and sold at $65k?'"
          suggestions={[
            "What is my crypto ROI if I bought at $30k, sold at $65k?",
            "How do gas fees affect my trade profit?",
            "What's the break-even price for my crypto trade?",
            "Explain dollar-cost averaging for Bitcoin",
          ]}
          accentColor="text-fuchsia-400"
        />

        {/* Stats Strip */}
        <section className="bg-slate-900 border-b border-slate-800 py-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[["10M+","Trades Analyzed"],["99.9%","Math Accuracy"],["$45B","Volume Calculated"],["All","Major Coins"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-violet-300 mb-1">{val}</div>
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
            <h2 className="text-3xl font-black text-slate-900 mb-8">Essential Crypto Tools</h2>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants}>
                <ToolCard title="Crypto Profit Calculator" description="Calculate your net profit, ROI, and break-even price for your crypto trades." href="/crypto-profit-calculator" icon={<Bitcoin className="h-7 w-7" />} backgroundImage={toolCrypto} titleGradient="from-fuchsia-300 to-violet-300" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard title="Currency Converter" description="Convert fiat values to estimate your investment capital across 20+ currencies." href="/currency-converter" icon={<DollarSign className="h-7 w-7" />} backgroundImage={toolCurrency} titleGradient="from-cyan-300 to-sky-300" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard title="Savings Goal" description="Set a crypto savings target and find out exactly how much to invest each month to get there." href="/savings-goal-calculator" icon={<Calculator className="h-7 w-7" />} backgroundImage={slide2} titleGradient="from-pink-300 to-fuchsia-300" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Carousel */}
        <section className="py-24 bg-slate-900 overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 mb-12 text-center">
            <h2 className="text-4xl font-black text-white mb-4">Built for Every Crypto Trader</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Precision tools for digital asset decisions — from analysis to execution.</p>
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
              <button key={i} onClick={() => scrollTo(i)} className={`h-2 rounded-full transition-all duration-300 ${i === carouselIndex ? "w-8 bg-fuchsia-400" : "w-2 bg-slate-600 hover:bg-slate-400"}`} />
            ))}
          </div>
        </section>

        {/* Learn the Fundamentals */}
        <section className="bg-slate-900 py-20">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-black text-white mb-8">Crypto Guides & Resources</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7 space-y-8">
                <Link href="/how-to-calculate-crypto-profit" className="group block">
                  <div className="rounded-2xl overflow-hidden shadow-xl relative h-80 flex flex-col justify-end p-8 border border-slate-700 hover:border-fuchsia-500/50 transition-colors">
                    <img src={articleBg} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-fuchsia-400 font-bold text-xs uppercase tracking-wider mb-3"><PlayCircle className="h-4 w-4" /> Recommended</div>
                      <h3 className="text-3xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-300 group-hover:to-violet-300 transition-all">How to Calculate Crypto Profit Accurately</h3>
                      <p className="text-slate-300 max-w-lg leading-relaxed">Don't forget the fees. Learn the formula for calculating true net profit and ROI on digital asset trades.</p>
                    </div>
                  </div>
                </Link>
                <h3 className="text-xl font-bold text-white mb-4">Popular Guides</h3>
                <div className="space-y-4">
                  <Link href="/crypto-profit-vs-loss-explained" className="flex items-center gap-6 p-4 rounded-xl border border-slate-700 hover:border-fuchsia-500/50 hover:shadow-md transition-all bg-slate-800 group">
                    <div className="h-16 w-16 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-fuchsia-900/50 group-hover:text-fuchsia-400 transition-colors shrink-0"><Bitcoin className="h-8 w-8" /></div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition-colors mb-1">Profit vs Loss: Knowing Your Break-even</h4>
                      <p className="text-slate-400 text-sm">Why your break-even price is critical for setting stop-losses and take-profit targets.</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h2 className="text-2xl font-black text-white mb-6">Crypto FAQ</h2>
                  <FAQAccordion items={[
                    { question: "How do exchange fees affect my profit?", answer: "Exchanges charge fees on both buy and sell sides. Even if the price rises, fees can eliminate gains." },
                    { question: "What is ROI?", answer: "ROI is the ratio of net profit to initial investment, expressed as a percentage — the best way to compare trade performance." },
                    { question: "Do I need to pay taxes on crypto gains?", answer: "In most jurisdictions, yes. Crypto trades are subject to capital gains tax. Consult a tax professional in your region." }
                  ]} />
                </div>
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center">
                  <ShieldCheck className="h-12 w-12 text-fuchsia-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
                  <p className="text-slate-400 text-sm mb-6">We never connect to your wallet or exchange accounts. All calculations are mathematical and stateless.</p>
                  <Button className="w-full rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-0" variant="outline">Read Privacy Policy</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-slate-900">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-fuchsia-300 to-violet-300 mb-4">Crypto Calculations, Simplified</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Know your exact numbers before you trade — every time.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Enter your trade", icon: <Search className="h-6 w-6" />, desc: "Input your buy price, sell price, fees, and investment amount. Our calculator handles the rest.", img: slide1, gradient: "from-fuchsia-300 to-violet-300", accent: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30" },
                { step: "02", title: "Get precise ROI", icon: <TrendingUp className="h-6 w-6" />, desc: "See your net profit, ROI percentage, and break-even price — all calculated with industry-standard formulas.", img: slide4, gradient: "from-violet-300 to-purple-300", accent: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
                { step: "03", title: "Trade with confidence", icon: <CheckCircle2 className="h-6 w-6" />, desc: "Use the results to set realistic targets, manage risk, and make data-driven trading decisions.", img: slide5, gradient: "from-purple-300 to-pink-300", accent: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
              ].map(({ step, title, desc, icon, img, gradient, accent }) => (
                <div key={step} className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-fuchsia-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
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
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-700 to-violet-600 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Start calculating smarter, right now.</h2>
            <p className="text-xl text-fuchsia-100 mb-10 max-w-2xl mx-auto font-medium">No account needed. No data saved. Always free.</p>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center shadow-2xl rounded-full p-2 bg-white/10 backdrop-blur-md border border-white/20">
              <Search className="absolute left-6 h-6 w-6 text-white/70" />
              <Input type="text" placeholder="e.g. crypto profit on 5000 bought at 30000 sold at 45000" className="h-16 pl-16 pr-40 text-lg rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-white placeholder:text-white/60" value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button type="submit" className="absolute right-2 h-14 rounded-full px-8 font-bold bg-white text-fuchsia-700 hover:bg-slate-100 shadow-md text-lg">
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
