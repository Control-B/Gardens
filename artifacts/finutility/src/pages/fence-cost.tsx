import { useState, useMemo, useRef } from "react";
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
import { calcFenceCost } from "@/lib/calculators";
import { generateFenceCostInsight } from "@/lib/aiInsights";
import { fenceCostEducationContent } from "@/lib/educationContent";
import { fenceCostTrustContent } from "@/lib/trustContent";
import { Home, Paintbrush, TreeDeciduous, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const MATERIALS = [
  { value: "wood_privacy", label: "Wood — Privacy" },
  { value: "wood_picket", label: "Wood — Picket" },
  { value: "vinyl", label: "Vinyl (Low Maintenance)" },
  { value: "chain_link", label: "Chain Link (Budget)" },
  { value: "aluminum", label: "Aluminum (Decorative)" },
  { value: "wrought_iron", label: "Wrought Iron (Premium)" },
  { value: "split_rail", label: "Split Rail (Rural)" },
  { value: "bamboo", label: "Bamboo (Natural)" },
];

const HEIGHTS = [
  { value: "3", label: "3 ft (Decorative / Garden)" },
  { value: "4", label: "4 ft (Standard Picket)" },
  { value: "6", label: "6 ft (Privacy Standard)" },
  { value: "8", label: "8 ft (Maximum Privacy)" },
];

export default function FenceCostCalculator() {
  const [linearFeet, setLinearFeet] = useState("150");
  const [material, setMaterial] = useState("wood_privacy");
  const [height, setHeight] = useState("6");
  const [gates, setGates] = useState("1");
  const [laborRate, setLaborRate] = useState("10");
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const results = useMemo(() => {
    return calcFenceCost(
      Number(linearFeet) || 0,
      material,
      Number(height) || 6,
      Number(gates) || 0,
      Number(laborRate) || 10
    );
  }, [linearFeet, material, height, gates, laborRate]);

  const insight = useMemo(() => {
    return generateFenceCostInsight(results.totalCost, Number(linearFeet) || 0, material);
  }, [results.totalCost, linearFeet, material]);

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
                Exterior & Fencing
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Fence Cost<br /><span className="text-emerald-400">Calculator</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Know your real fence materials and labor cost before calling a contractor. Compare materials and find the right fence for your budget and lifestyle.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <Zap className="h-4 w-4 text-yellow-400" /> 8 material types
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-green-400" /> Material + labor estimate
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 my-8" ref={resultsRef}>
            <div className="xl:col-span-4">
              <CalculatorCard title="Fence Details">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="linearFeet" className="text-sm font-semibold">Total Linear Feet</Label>
                    <Input
                      id="linearFeet"
                      type="number"
                      min="10"
                      className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-emerald-500"
                      value={linearFeet}
                      onChange={(e) => setLinearFeet(e.target.value)}
                    />
                    <p className="text-xs text-slate-500">Tip: A standard 1/4-acre rectangular backyard perimeter ≈ 420 linear feet.</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Fence Material</Label>
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
                    <Label className="text-sm font-semibold">Fence Height</Label>
                    <Select value={height} onValueChange={setHeight}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-medium text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {HEIGHTS.map((h) => (
                          <SelectItem key={h.value} value={h.value}>{h.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gates" className="text-sm font-semibold">Number of Gates</Label>
                      <Input
                        id="gates"
                        type="number"
                        min="0"
                        max="10"
                        className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200"
                        value={gates}
                        onChange={(e) => setGates(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="laborRate" className="text-sm font-semibold">Labor ($/ft)</Label>
                      <Input
                        id="laborRate"
                        type="number"
                        min="5"
                        className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200"
                        value={laborRate}
                        onChange={(e) => setLaborRate(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full h-14 text-lg font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                    onClick={handleCalculate}
                  >
                    Calculate Fence Cost
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
                <ResultCard title="Total Cost" value={`$${results.totalCost.toLocaleString()}`} />
                <ResultCard title="Materials" value={`$${results.materialCost.toLocaleString()}`} valueColorClass="text-slate-900" />
                <ResultCard title="Labor" value={`$${results.laborCost.toLocaleString()}`} valueColorClass="text-amber-600" />
                <ResultCard title="Cost per Foot" value={`$${results.costPerLinearFoot.toFixed(2)}`} valueColorClass="text-emerald-600" />
              </motion.div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                <h3 className="font-black text-xl text-slate-900 mb-6">Before You Install: Checklist</h3>
                <div className="space-y-3">
                  {[
                    { step: "Call 811", detail: "Mark underground utilities before digging any post holes. Free, required by law." },
                    { step: "Verify property lines", detail: "Check your survey or hire a surveyor if uncertain. Installing on a neighbor's land is expensive to correct." },
                    { step: "Check HOA rules", detail: "Many HOAs restrict fence height, materials, and color. Get written approval before purchasing materials." },
                    { step: "Pull a permit", detail: "Most municipalities require a fence permit. Unpermitted fences can complicate home sales." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex-shrink-0 mt-0.5">✓</div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{item.step}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                      </div>
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
            <EducationalContentBlock {...fenceCostEducationContent} theme="emerald" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-black text-slate-900">Understanding Fence Costs</h2>
              <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                <p><strong>Problem:</strong> Contractor fence quotes range widely — for the same 150-foot wood privacy fence, quotes can vary from $3,500 to $9,000. Without material benchmarks, it's impossible to know which is fair and which is predatory.</p>
                <p><strong>Solution:</strong> This calculator gives you a baseline material + labor estimate by material type before you call anyone.</p>
                <h3 className="text-xl font-bold text-slate-900">Material Lifespan Comparison</h3>
                <ul className="space-y-2">
                  <li><strong>Wood:</strong> 15–20 years with regular staining/sealing. Most affordable upfront.</li>
                  <li><strong>Vinyl:</strong> 25–30 years with almost no maintenance. Higher upfront, lower lifetime cost.</li>
                  <li><strong>Aluminum:</strong> 30+ years, rust-resistant, low maintenance. Good mid-range choice.</li>
                  <li><strong>Chain Link:</strong> 15–20 years, very low cost, minimal privacy.</li>
                  <li><strong>Wrought Iron:</strong> 50+ years with proper rust prevention. Premium aesthetic.</li>
                </ul>
                <h3 className="text-xl font-bold text-slate-900">STAR Scenario: Dave Saves $3,400</h3>
                <p><strong>Situation:</strong> Dave needed 180 feet of 6-foot privacy fence. Quotes ranged from $5,200 to $7,800.</p>
                <p><strong>Action:</strong> He used this calculator, confirmed material cost: $2,100. Rented a post-hole digger for $85/day. Two weekend project.</p>
                <p><strong>Result:</strong> Total cost: $2,310. Savings: $3,400 vs. the lowest contractor quote.</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-10">
              <FAQAccordion items={[
                { question: "Can I install a fence myself?", answer: "Yes — fence installation is one of the most approachable DIY projects. You need: post hole digger (rent for ~$85/day), level, drill, and saw. The main challenges are keeping posts plumb and consistent spacing." },
                { question: "How deep should fence posts be set?", answer: "At least 1/3 of the total post length should be in the ground. For a 6-foot fence with 8-foot posts, set 2.5 feet deep minimum. In cold climates, set below the frost line to prevent heaving." },
                { question: "What is the best fence material for privacy?", answer: "Wood privacy and vinyl fence provide the most complete privacy. Wood is more affordable; vinyl requires no painting or staining. For high-wind areas, solid panels create more wind load — consider spaced boards instead." },
                { question: "How long does fence installation take?", answer: "A 100–150 foot fence takes 1–2 days for 2–3 people. Setting posts one day and attaching panels the next works well. Let concrete set 24 hours before attaching panels to posts." },
              ]} />

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard title="Roof Cost Calculator" description="Estimate roof replacement before contractor quotes." href="/roof-cost-calculator" icon={<Home className="h-6 w-6" />} />
                  <ToolCard title="Paint Calculator" description="Calculate paint needed for any room or exterior." href="/paint-calculator" icon={<Paintbrush className="h-6 w-6" />} />
                  <ToolCard title="Lawn Care Cost" description="Compare DIY vs. pro lawn care costs." href="/lawn-care-calculator" icon={<TreeDeciduous className="h-6 w-6" />} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TrustSection {...fenceCostTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
