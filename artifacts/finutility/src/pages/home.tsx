import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocation } from "wouter";
import { Search, Home, Briefcase, Bitcoin, PiggyBank, DollarSign, TrendingUp, CheckCircle2, ArrowRight, Landmark, ChartNoAxesCombined, CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { AIBar } from "@/components/AIBar";
import { ToolCard } from "@/components/ToolCard";
import { CategoryCard } from "@/components/CategoryCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { motion, type Variants } from "framer-motion";
import heroDashboard from "@assets/Landing62.jpeg";
import step1Image from "@assets/Landing47.jpeg";
import step2Image from "@assets/Landing66.jpeg";
import step3Image from "@assets/Landing6.jpeg";
import articleCompound from "@assets/Landing41.jpeg";
import articleMortgage from "@assets/Landing37.jpeg";
import articleCrypto from "@assets/Crypto3.jpeg";
import categoryFinance from "@assets/Landing41.jpeg";
import categoryCrypto from "@assets/Crypto3.jpeg";
import categoryLoans from "@assets/Landing37.jpeg";
import toolSavings from "@assets/Landing39.jpeg";
import toolCurrency from "@assets/Landing7.jpeg";
import carouselImg1 from "@assets/Landing62.jpeg";
import carouselImg2 from "@assets/Crypto3.jpeg";
import carouselImg3 from "@assets/Landing15.jpeg";
import carouselImg4 from "@assets/Landing14.jpeg";
import carouselImg5 from "@assets/Landing22.jpeg";
import carouselImg6 from "@assets/Landing49.jpeg";
import carouselImg7 from "@assets/Landing47.jpeg";
import carouselImg8 from "@assets/Landing48.jpeg";
import carouselImg9 from "@assets/Landing65.jpeg";
import carouselImg10 from "@assets/Landing67.jpeg";

const carouselImages = [
  { src: carouselImg1, label: "Finance Dashboard", message: "Your wealth, visualized.", gradient: "from-emerald-300 to-cyan-300" },
  { src: carouselImg2, label: "Crypto Trading", message: "Trade smarter with real data.", gradient: "from-fuchsia-300 to-violet-300" },
  { src: carouselImg3, label: "Personal Finance App", message: "Your money, your rules.", gradient: "from-blue-300 to-indigo-300" },
  { src: carouselImg4, label: "Investment Dashboard", message: "Smart investments start here.", gradient: "from-orange-300 to-amber-300" },
  { src: carouselImg5, label: "Global Currency", message: "Convert anything, instantly.", gradient: "from-cyan-300 to-sky-300" },
  { src: carouselImg6, label: "Smart Financial Tools", message: "AI-powered financial clarity.", gradient: "from-violet-300 to-pink-300" },
  { src: carouselImg7, label: "Data Analysis", message: "Visualize your wealth journey.", gradient: "from-lime-300 to-emerald-300" },
  { src: carouselImg8, label: "Market Trading", message: "Master the market.", gradient: "from-rose-300 to-orange-300" },
  { src: carouselImg9, label: "Mortgage Calculator", message: "Own your dream home.", gradient: "from-indigo-300 to-blue-300" },
  { src: carouselImg10, label: "Loan Breakdown", message: "Break down every payment.", gradient: "from-teal-300 to-cyan-300" },
];

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [carouselIndex, setCarouselIndex] = useState(0);

  const scrollCarouselTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCarouselIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 3500);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(timer);
    };
  }, [emblaApi]);

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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const tryExamples = [
    {
      label: "Mortgage",
      query: "mortgage on 500000 with 20% down at 6.5%",
      icon: <Landmark className="h-4 w-4 text-cyan-200" />,
    },
    {
      label: "Compound Interest",
      query: "compound interest on 10000 at 5% for 10 years",
      icon: <ChartNoAxesCombined className="h-4 w-4 text-cyan-200" />,
    },
    {
      label: "Auto Loan",
      query: "loan of 25000 at 7% for 60 months",
      icon: <CarFront className="h-4 w-4 text-cyan-200" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <section className="relative overflow-hidden bg-slate-950 pt-24 pb-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(37,99,235,0.24),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.18),_transparent_36%)]"></div>
          </div>
          
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
                  {tryExamples.map((example) => (
                    <button
                      key={example.label}
                      onClick={() => setExampleQuery(example.query)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 border border-white/12 hover:bg-white/12 text-white/90 shadow-sm shadow-black/10 transition-colors"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                        {example.icon}
                      </span>
                      <span>{example.label}</span>
                    </button>
                  ))}
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
                  src={heroDashboard}
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

        {/* AI Bar */}
        <AIBar
          placeholder="Ask anything about your finances, e.g. 'Compound interest on $10k at 5% for 20 years'"
          suggestions={[
            "What is compound interest?",
            "How much mortgage can I afford on $80k salary?",
            "Calculate crypto profit on $5,000 investment",
            "Best savings rate for $50k over 10 years?",
          ]}
        />

        {/* Section 2: Trust Strip */}
        <section className="bg-slate-50 border-b border-slate-200 py-6">
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

        {/* Ad above Featured Calculators */}
        <div className="bg-white px-4 pt-4 pb-0">
          <div className="container mx-auto px-4 md:px-8">
            <AdPlaceholder />
          </div>
        </div>

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
                  backgroundImage={articleCompound}
                  titleGradient="from-emerald-300 to-teal-300"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Mortgage Calculator" 
                  description="Estimate your monthly mortgage payments including taxes, insurance, and HOA."
                  href="/mortgage-calculator"
                  icon={<Home className="h-7 w-7" />}
                  backgroundImage={articleMortgage}
                  titleGradient="from-blue-300 to-indigo-300"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Loan Payment" 
                  description="Calculate your monthly payments, total interest, and payoff timeline for any loan."
                  href="/loan-payment-calculator"
                  icon={<Briefcase className="h-7 w-7" />}
                  backgroundImage={step2Image}
                  titleGradient="from-orange-300 to-amber-300"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Currency Converter" 
                  description="Check exchange rates and convert between over 20 global currencies instantly."
                  href="/currency-converter"
                  icon={<DollarSign className="h-7 w-7" />}
                  backgroundImage={toolCurrency}
                  titleGradient="from-cyan-300 to-sky-300"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Crypto Profit" 
                  description="Calculate your net profit, ROI, and break-even price for cryptocurrency trades."
                  href="/crypto-profit-calculator"
                  icon={<Bitcoin className="h-7 w-7" />}
                  backgroundImage={articleCrypto}
                  titleGradient="from-fuchsia-300 to-violet-300"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ToolCard 
                  title="Savings Goal" 
                  description="Find out exactly how much you need to save monthly to reach your financial target."
                  href="/savings-goal-calculator"
                  icon={<PiggyBank className="h-7 w-7" />}
                  backgroundImage={toolSavings}
                  titleGradient="from-lime-300 to-emerald-300"
                />
              </motion.div>
            </motion.div>
            
          </div>
        </section>

        {/* Section 4: Image Carousel */}
        <section className="py-24 bg-slate-900 overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 mb-12 text-center">
            <h2 className="text-4xl font-black text-white mb-4">Built for Every Financial Need</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Powerful tools designed for real-world financial decisions.</p>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 px-8">
              {carouselImages.map((img, i) => (
                <div
                  key={i}
                  className="relative shrink-0 w-[85vw] md:w-[55vw] lg:w-[40vw] rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-500"
                  style={{ opacity: i === carouselIndex ? 1 : 0.45, transform: i === carouselIndex ? "scale(1)" : "scale(0.93)" }}
                  onClick={() => scrollCarouselTo(i)}
                >
                  <img src={img.src} alt={img.label} className="w-full h-64 md:h-80 object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 gap-2">
                    <p className={`text-2xl font-black text-transparent bg-clip-text bg-linear-to-r ${img.gradient} leading-tight drop-shadow-lg`}>
                      {img.message}
                    </p>
                    <span className="text-white/70 font-medium text-sm bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 w-fit">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollCarouselTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === carouselIndex ? "w-8 bg-blue-400" : "w-2 bg-slate-600 hover:bg-slate-400"}`}
              />
            ))}
          </div>
        </section>

        {/* Section 5: How It Works */}
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
                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10"></div>
                    <img src={step1Image} alt="Person reviewing financial data on laptop" className="w-full h-72 md:h-96 object-cover object-center" />
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
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img src={step2Image} alt="Loan calculator with visual breakdown" className="w-full h-72 md:h-96 object-cover object-top" />
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
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Understand with Financial Insights</h3>
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
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img src={step3Image} alt="AI-powered financial insights" className="w-full h-72 md:h-96 object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ad above Explore Categories */}
        <div className="bg-white px-4 pt-10 pb-0">
          <div className="container mx-auto px-4 md:px-8">
            <AdPlaceholder />
          </div>
        </div>

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
                  colorClass="text-emerald-400 bg-emerald-500/20 shadow-emerald-500/20"
                  backgroundImage={categoryFinance}
                  titleGradient="from-emerald-300 to-teal-300"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="h-full">
                <CategoryCard 
                  title="Crypto" 
                  description="Trading profits, ROI calculators, and conversion tools."
                  href="/crypto"
                  icon={<Bitcoin className="h-8 w-8" />}
                  colorClass="text-fuchsia-400 bg-fuchsia-500/20 shadow-fuchsia-500/20"
                  backgroundImage={categoryCrypto}
                  titleGradient="from-fuchsia-300 to-violet-300"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="h-full">
                <CategoryCard 
                  title="Loans" 
                  description="Mortgages, auto loans, and debt payoff planning."
                  href="/loans"
                  icon={<Home className="h-8 w-8" />}
                  colorClass="text-blue-400 bg-blue-500/20 shadow-blue-500/20"
                  backgroundImage={categoryLoans}
                  titleGradient="from-blue-300 to-indigo-300"
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
                  <div className="h-48 relative overflow-hidden">
                    <img src={articleCompound} alt="Growing plants on stacked coins representing compound interest" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 via-slate-800/20 to-transparent"></div>
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
                  <div className="h-48 relative overflow-hidden">
                    <img src={articleMortgage} alt="House model with calculator and keys" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 via-slate-800/20 to-transparent"></div>
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
                  <div className="h-48 relative overflow-hidden">
                    <img src={articleCrypto} alt="Crypto trading dashboard" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 via-slate-800/20 to-transparent"></div>
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

        {/* Section 7: Image Carousel — placeholder, moved above */}

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
