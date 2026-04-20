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
import { calcRoofCost } from "@/lib/calculators";
import { generateRoofCostInsight } from "@/lib/aiInsights";
import { roofCostEducationContent } from "@/lib/educationContent";
import { roofCostTrustContent } from "@/lib/trustContent";
import { parseNaturalLanguage } from "@/lib/nlParser";
import { Search, Zap, Clock, ShieldCheck, Paintbrush, Fence, Hammer } from "lucide-react";
import { motion } from "framer-motion";

const MATERIALS = [
  { value: "asphalt_3tab", label: "Asphalt 3-Tab Shingles (Budget)" },
  { value: "asphalt_architectural", label: "Architectural Asphalt (Most Popular)" },
  { value: "metal_standing_seam", label: "Metal — Standing Seam (Premium)" },
  { value: "metal_corrugated", label: "Metal — Corrugated" },
  { value: "wood_shake", label: "Wood Shake" },
  { value: "tile_concrete", label: "Concrete Tile" },
  { value: "tile_clay", label: "Clay Tile" },
  { value: "slate", label: "Natural Slate (Highest Durability)" },
];

const PITCH_OPTIONS = [
  { value: "1.0", label: "Low Pitch (Flat to 3/12)" },
  { value: "1.15", label: "Moderate (4/12 – 6/12)" },
  { value: "1.3", label: "Steep (7/12 – 9/12)" },
  { value: "1.5", label: "Very Steep (10/12+)" },
];

export default function RoofCostCalculator() {
  const [, setLocation] = useLocation();
  const [area, setArea] = useState("2000");
  const [material, setMaterial] = useState("asphalt_architectural");
  const [pitch, setPitch] = useState("1.15");
  const [includeRemoval, setIncludeRemoval] = useState(true);
  const [laborRate, setLaborRate] = useState("150");
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const results = useMemo(() => {
    return calcRoofCost(
      Number(area) || 0,
      material,
      Number(pitch) || 1.15,
      includeRemoval,
      Number(laborRate) || 150
    );
  }, [area, material, pitch, includeRemoval, laborRate]);

  const insight = useMemo(() => {
    return generateRoofCostInsight(results.totalCost, material, results.squares);
  }, [results.totalCost, material, results.squares]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const intent = parseNaturalLanguage(query);
    if (intent) {
      if (intent.calculator !== "/roof-cost-calculator") {
        setLocation(`${intent.calculator}?${new URLSearchParams(intent.params).toString()}`);
      } else {
        if (intent.params.area) setArea(intent.params.area);
        if (intent.params.material) setMaterial(intent.params.material);
      }
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
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-24 border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-emerald-950 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6">
                Exterior & Roofing
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Roof Cost<br /><span className="text-emerald-400">Calculator</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Get a realistic roof replacement cost estimate by material type before calling a single contractor. Know if a quote is fair before you sign anything.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <Zap className="h-4 w-4 text-yellow-400" /> Instant estimate
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <Clock className="h-4 w-4 text-emerald-400" /> Compare 8 materials
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-green-400" /> Free forever
                </div>
              </div>
              <form onSubmit={handleSearch} className="max-w-xl relative flex items-center bg-white/10 p-1.5 rounded-full backdrop-blur-md border border-white/20">
                <Search className="absolute left-5 h-5 w-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="e.g. roof cost for 2000 sq ft metal roof"
                  className="h-12 pl-14 pr-32 text-base rounded-full bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" className="absolute right-1.5 h-10 rounded-full px-6 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Apply
                </Button>
              </form>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 my-8" ref={resultsRef}>
            {/* Calculator Inputs */}
            <div className="xl:col-span-4">
              <CalculatorCard title="Enter Roof Details">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-sm font-semibold">Roof Footprint Area (sq ft)</Label>
                    <Input
                      id="area"
                      type="number"
                      min="100"
                      className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-emerald-500"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                    <p className="text-xs text-slate-500">Measure your home's footprint (length × width). For a 2,000 sq ft house, enter 2000.</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Roofing Material</Label>
                    <Select value={material} onValueChange={setMaterial}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-medium text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MATERIALS.map((m) => (
                          <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Roof Pitch</Label>
                    <Select value={pitch} onValueChange={setPitch}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-medium text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PITCH_OPTIONS.map((p) => (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="labor" className="text-sm font-semibold">Labor Rate (per roofing square)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
                      <Input
                        id="labor"
                        type="number"
                        min="50"
                        className="pl-7 text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-emerald-500"
                        value={laborRate}
                        onChange={(e) => setLaborRate(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-slate-500">National average: $100–$200/square. Adjust for your region.</p>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <Label className="text-sm font-semibold">Include Old Roof Removal</Label>
                      <p className="text-xs text-slate-500 mt-0.5">~$50/square for tear-off</p>
                    </div>
                    <Switch checked={includeRemoval} onCheckedChange={setIncludeRemoval} />
                  </div>

                  <Button
                    className="w-full h-14 text-lg font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                    onClick={handleCalculate}
                  >
                    Calculate Roof Cost
                  </Button>
                </div>
              </CalculatorCard>
            </div>

            {/* Results */}
            <div className="xl:col-span-8 flex flex-col space-y-6">
              <motion.div
                animate={isCalculating ? { scale: [1, 1.02, 1], opacity: [1, 0.8, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <ResultCard title="Total Estimate" value={`$${results.totalCost.toLocaleString()}`} />
                <ResultCard title="Materials" value={`$${results.materialCost.toLocaleString()}`} valueColorClass="text-slate-900" />
                <ResultCard title="Labor" value={`$${results.laborCost.toLocaleString()}`} valueColorClass="text-amber-600" />
                <ResultCard title="Roofing Squares" value={`${results.squares}`} valueColorClass="text-emerald-600" />
              </motion.div>

              {/* Cost Breakdown */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                <h3 className="font-black text-xl text-slate-900 mb-6">Cost Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: "Materials", value: results.materialCost, color: "bg-emerald-500", percent: results.totalCost > 0 ? (results.materialCost / results.totalCost) * 100 : 0 },
                    { label: "Labor", value: results.laborCost, color: "bg-amber-500", percent: results.totalCost > 0 ? (results.laborCost / results.totalCost) * 100 : 0 },
                    { label: "Old Roof Removal", value: results.removalCost, color: "bg-slate-400", percent: results.totalCost > 0 ? (results.removalCost / results.totalCost) * 100 : 0 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">{item.label}</span>
                        <span className="font-bold text-slate-900">${item.value.toLocaleString()} ({item.percent.toFixed(0)}%)</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-900">Cost per sq ft</span>
                    <span className="text-2xl font-black text-emerald-700">${results.costPerSqFt.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-emerald-700 mt-1">Based on {Number(area).toLocaleString()} sq ft footprint</p>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <AIInsightCard content={insight} />
            <div className="flex flex-wrap gap-2 mt-4 ml-2">
              <span className="text-sm font-medium text-slate-500 flex items-center mr-2">Related tools:</span>
              <a href="/home-renovation-calculator" className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">Renovation Budget</a>
              <a href="/paint-calculator" className="text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors">Paint Calculator</a>
            </div>
          </div>

          <div className="my-12"><AdPlaceholder /></div>

          <div className="my-12">
            <EducationalContentBlock {...roofCostEducationContent} theme="emerald" />
          </div>

          {/* Educational Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-3xl font-black text-slate-900">Understanding Roofing Costs</h2>

              <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                <p><strong>Problem:</strong> Most homeowners have no idea what a roof replacement should cost until a contractor shows up with a quote. Without a benchmark, it's impossible to know if you're being overcharged by $3,000 or underbid by a contractor who plans to cut corners.</p>

                <p><strong>Solution:</strong> This calculator gives you a realistic estimate based on material type, roof size, pitch complexity, labor rates, and removal costs — before you make a single call.</p>

                <p><strong>Benefit:</strong> Homeowners who enter contractor conversations with an accurate benchmark are far less likely to overpay and far more likely to catch red flags in low-ball bids that signal substandard materials or unlicensed labor.</p>

                <h3 className="text-xl font-bold text-slate-900 mt-6">STAR Scenario: The Andersons Save $4,200</h3>
                <p><strong>Situation:</strong> The Andersons needed a new roof after hail damage. Three contractors quoted $14,500, $18,700, and $22,000 for the same 2,400 sq ft house with architectural shingles.</p>
                <p><strong>Task:</strong> Determine a fair price before accepting any bid.</p>
                <p><strong>Action:</strong> They used this calculator with their measurements: 2,400 sq ft, moderate pitch, architectural shingles, including removal. Estimate: $14,800–$17,200.</p>
                <p><strong>Result:</strong> The $22,000 quote was rejected. The $14,500 contractor was asked for references, verified as licensed, and accepted. Savings versus the highest quote: $7,500. Savings versus mid-quote: $4,200.</p>

                <h3 className="text-xl font-bold text-slate-900 mt-6">What Affects Roof Cost Beyond Material</h3>
                <ul className="space-y-2">
                  <li><strong>Pitch:</strong> Steep roofs require more material (more actual surface area than flat footprint) and slower, more difficult labor. Add 20–50% for steep pitches.</li>
                  <li><strong>Ventilation:</strong> Inadequate ridge and soffit ventilation is the #1 cause of premature roof failure. A good contractor will assess and address this.</li>
                  <li><strong>Underlayment quality:</strong> Ice-and-water shield is critical in cold climates. Don't let a low-bid contractor skip it.</li>
                  <li><strong>Flashing:</strong> Chimney, skylight, and valley flashing replacement adds $300–$1,500 and should not be skipped on older homes.</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
                <FAQAccordion items={[
                  {
                    question: "How do I measure my roof area?",
                    answer: "Measure your home's footprint (length × width). For a simple rectangular house that's your area. For complex roof lines, add up each section separately. A professional should measure from the roof itself for precise quotes."
                  },
                  {
                    question: "Should I repair or replace my roof?",
                    answer: "If damage covers more than 25–30% of the roof area, replacement is usually more cost-effective than repair. If the roof is over 20 years old (asphalt), replacement is typically the right choice even for localized damage."
                  },
                  {
                    question: "How long does a roof replacement take?",
                    answer: "Most residential roofs can be replaced in 1–3 days for crews of 3–6 workers. Complex rooflines, weather delays, or material delivery issues can extend this."
                  },
                  {
                    question: "Is a permit required for roof replacement?",
                    answer: "Most jurisdictions require a permit for roof replacement (not just repair). Your contractor should handle this — if they suggest skipping it to save money, that is a red flag."
                  },
                  {
                    question: "What's the difference between 3-tab and architectural shingles?",
                    answer: "Architectural shingles are thicker, more durable (25–30 year vs. 15–20 year lifespan), and look better. The cost difference is typically $300–$600 more for a standard home — almost always worth it."
                  },
                ]} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard title="Home Renovation Budget" description="Estimate full room or whole-house renovation costs." href="/home-renovation-calculator" icon={<Hammer className="h-6 w-6" />} />
                  <ToolCard title="Paint Calculator" description="Calculate exactly how many gallons of paint you need." href="/paint-calculator" icon={<Paintbrush className="h-6 w-6" />} />
                  <ToolCard title="Fence Cost Calculator" description="Estimate fence materials and labor by material type." href="/fence-cost-calculator" icon={<Fence className="h-6 w-6" />} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TrustSection {...roofCostTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
