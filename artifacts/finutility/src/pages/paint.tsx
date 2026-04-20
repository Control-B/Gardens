import { useState, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorCard } from "@/components/CalculatorCard";
import { ResultCard } from "@/components/ResultCard";
import { AIInsightCard } from "@/components/AIInsightCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ToolCard } from "@/components/ToolCard";
import { EducationalContentBlock } from "@/components/EducationalContentBlock";
import { TrustSection } from "@/components/TrustSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { calcPaint } from "@/lib/calculators";
import { generatePaintInsight } from "@/lib/aiInsights";
import { paintEducationContent } from "@/lib/educationContent";
import { paintTrustContent } from "@/lib/trustContent";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { Search, Zap, ShieldCheck, Home, Hammer, TreeDeciduous } from "lucide-react";
import { motion } from "framer-motion";

export default function PaintCalculator() {
  const [, setLocation] = useLocation();
  const [wallArea, setWallArea] = useState("490");
  const [coats, setCoats] = useState("2");
  const [pricePerGallon, setPricePerGallon] = useState("45");
  const [coveragePerGallon, setCoveragePerGallon] = useState("350");
  const [includeWaste, setIncludeWaste] = useState(true);
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const results = useMemo(() => {
    return calcPaint(
      Number(wallArea) || 0,
      Number(coats) || 2,
      Number(pricePerGallon) || 45,
      Number(coveragePerGallon) || 350,
      includeWaste
    );
  }, [wallArea, coats, pricePerGallon, coveragePerGallon, includeWaste]);

  const insight = useMemo(() => {
    return generatePaintInsight(results.gallonsWithWaste, results.totalCost, Number(wallArea) || 0);
  }, [results, wallArea]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const intent = parseNaturalLanguage(query);
    if (intent && intent.calculator !== "/paint-calculator") {
      setLocation(`${intent.calculator}?${new URLSearchParams(intent.params).toString()}`);
    }
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 400);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-24 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-emerald-950 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6">
                Home Improvement
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Paint<br /><span className="text-emerald-400">Calculator</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Calculate exactly how many gallons of paint to buy — no guessing, no wasted trips, no mismatched batches. Get the right amount before you shop.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <Zap className="h-4 w-4 text-yellow-400" /> Instant estimate
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-green-400" /> Free forever
                </div>
              </div>
              <form onSubmit={handleSearch} className="max-w-xl relative flex items-center bg-white/10 p-1.5 rounded-full backdrop-blur-md border border-white/20">
                <Search className="absolute left-5 h-5 w-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="e.g. how much paint for 3 rooms"
                  className="h-12 pl-14 pr-32 text-base rounded-full bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" className="absolute right-1.5 h-10 rounded-full px-6 bg-emerald-600 hover:bg-emerald-700 text-white">Apply</Button>
              </form>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 my-8" ref={resultsRef}>
            <div className="xl:col-span-4">
              <CalculatorCard title="Enter Paint Details">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="wallArea" className="text-sm font-semibold">Total Wall Area (sq ft)</Label>
                    <Input
                      id="wallArea"
                      type="number"
                      min="0"
                      className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-emerald-500"
                      value={wallArea}
                      onChange={(e) => setWallArea(e.target.value)}
                    />
                    <p className="text-xs text-slate-500">A standard 12×12 room with 9-ft ceilings has ~490 sq ft of wall area.</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Number of Coats</Label>
                    <Select value={coats} onValueChange={setCoats}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 coat (touch-up / same color)</SelectItem>
                        <SelectItem value="2">2 coats (standard)</SelectItem>
                        <SelectItem value="3">3 coats (dark color / new drywall)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="coverage" className="text-sm font-semibold">Coverage (sq ft/gal)</Label>
                      <Input
                        id="coverage"
                        type="number"
                        min="100"
                        className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200"
                        value={coveragePerGallon}
                        onChange={(e) => setCoveragePerGallon(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-semibold">Price per Gallon ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="10"
                        className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200"
                        value={pricePerGallon}
                        onChange={(e) => setPricePerGallon(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <Label className="text-sm font-semibold">Add 10% Waste Buffer</Label>
                      <p className="text-xs text-slate-500 mt-0.5">Recommended for new rooms</p>
                    </div>
                    <Switch checked={includeWaste} onCheckedChange={setIncludeWaste} />
                  </div>

                  <Button
                    className="w-full h-14 text-lg font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                    onClick={handleCalculate}
                  >
                    Calculate Paint Needed
                  </Button>
                </div>
              </CalculatorCard>
            </div>

            <div className="xl:col-span-8 flex flex-col space-y-6">
              <motion.div
                animate={isCalculating ? { scale: [1, 1.02, 1], opacity: [1, 0.8, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <ResultCard title="Gallons to Buy" value={`${Math.ceil(results.gallonsWithWaste)}`} />
                <ResultCard title="Exact Gallons" value={`${results.gallonsNeeded}`} valueColorClass="text-slate-900" />
                <ResultCard title="Total Cost" value={`$${results.totalCost.toLocaleString()}`} valueColorClass="text-emerald-600" />
                <ResultCard title="Coats" value={`${results.coatsNeeded}`} valueColorClass="text-amber-600" />
              </motion.div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                <h3 className="font-black text-xl text-slate-900 mb-4">Pro Painting Tips</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { tip: "Buy all gallons at once", detail: "Have them mixed in the same batch to ensure consistent color throughout the project." },
                    { tip: "Prep is everything", detail: "Fill holes, sand, clean with TSP substitute. Painters spend 60% of their time on prep — most DIYers spend 10%." },
                    { tip: "Work top to bottom", detail: "Paint ceiling first, then walls, then trim. This prevents repainting areas splattered from higher surfaces." },
                    { tip: "Two thin coats beat one thick", detail: "Thick coats drip, run, and take longer to dry. Thin coats dry faster and look more professional." },
                  ].map((item) => (
                    <div key={item.tip} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="font-semibold text-emerald-900 text-sm">{item.tip}</p>
                      <p className="text-xs text-emerald-700 mt-1">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <AIInsightCard content={insight} />
          </div>

          <div className="my-12"><AdPlaceholder /></div>

          <div className="my-12">
            <EducationalContentBlock {...paintEducationContent} theme="emerald" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-black text-slate-900">How to Calculate Paint Correctly</h2>
              <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                <p><strong>The formula:</strong> Wall area ÷ coverage per gallon × number of coats = gallons needed. Add 10% for waste on any room larger than 150 sq ft.</p>
                <h3 className="text-xl font-bold text-slate-900">How to Measure Wall Area</h3>
                <p>For each room: measure the perimeter (add all 4 wall lengths) × ceiling height = total wall area. Then subtract: each standard door = 21 sq ft, each window = 15 sq ft.</p>
                <p>Example: 12×12 room, 9-ft ceiling = (4 walls × 12 ft × 9 ft) = 432 sq ft. Subtract 2 doors (42 sq ft) + 2 windows (30 sq ft) = 360 sq ft net wall area.</p>
                <h3 className="text-xl font-bold text-slate-900">STAR Scenario: Jennifer Paints 5 Rooms for $410</h3>
                <p><strong>Situation:</strong> Jennifer wanted to refresh five rooms before listing her home. Painting quotes totaled $4,200.</p>
                <p><strong>Task:</strong> Paint all five rooms herself without obvious quality issues that would hurt the listing.</p>
                <p><strong>Action:</strong> She used the paint calculator to buy exactly 9 gallons total, bought quality brushes and rollers, spent one day prepping (filling, taping, cleaning), and painted over two weekends.</p>
                <p><strong>Result:</strong> Total materials cost: $410. A realtor commented the paint looked professionally done. The home sold for $7,000 over asking price.</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">FAQ</h2>
                <FAQAccordion items={[
                  { question: "What is a typical paint coverage rate?", answer: "Most paints cover 350–400 sq ft per gallon. Premium paints can cover up to 450 sq ft. Budget paints often cover only 250–300 sq ft — meaning you use more gallons for the same job." },
                  { question: "Do I need primer?", answer: "Use primer on: new drywall, stain-blocked areas, when making a dramatic color change (dark to light), or on bare wood. Primer can cut total paint consumption by 20–30% on unpainted surfaces." },
                  { question: "Flat vs. eggshell vs. satin — which finish?", answer: "Flat is forgiving on imperfect walls but hard to clean. Eggshell is the standard for living rooms and bedrooms — slight sheen, washable. Satin or semi-gloss for kitchens, bathrooms, and trim — very washable." },
                  { question: "Can I return unused paint?", answer: "Most stores accept returns of unopened cans within 30 days. Opened paint is typically non-returnable. Buying close to exact quantity prevents this waste." },
                ]} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard title="Roof Cost Calculator" description="Estimate roof replacement costs before contractor quotes." href="/roof-cost-calculator" icon={<Home className="h-6 w-6" />} />
                  <ToolCard title="Home Renovation Budget" description="Plan full renovation costs with contingency." href="/home-renovation-calculator" icon={<Hammer className="h-6 w-6" />} />
                  <ToolCard title="Garden Planting Calculator" description="Plan your garden layout and soil needs." href="/garden-planting-calculator" icon={<TreeDeciduous className="h-6 w-6" />} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TrustSection {...paintTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
