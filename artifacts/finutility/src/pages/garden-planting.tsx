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
import { calcGardenPlanting } from "@/lib/calculators";
import { generateGardenInsight } from "@/lib/aiInsights";
import { gardenPlantingEducationContent } from "@/lib/educationContent";
import { gardenPlantingTrustContent } from "@/lib/trustContent";
import { Fence, Hammer, Leaf, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const PLANT_TYPES = [
  { value: "tomatoes", label: "Tomatoes (24 in spacing)" },
  { value: "peppers", label: "Peppers (18 in spacing)" },
  { value: "lettuce", label: "Lettuce (8 in spacing)" },
  { value: "carrots", label: "Carrots (3 in spacing)" },
  { value: "herbs", label: "Herbs (12 in spacing)" },
  { value: "flowers", label: "Annual Flowers (12 in spacing)" },
  { value: "perennials", label: "Perennial Flowers (18 in spacing)" },
  { value: "custom", label: "Custom Spacing" },
];

const SPACING_MAP: Record<string, string> = {
  tomatoes: "24",
  peppers: "18",
  lettuce: "8",
  carrots: "3",
  herbs: "12",
  flowers: "12",
  perennials: "18",
  custom: "12",
};

export default function GardenPlantingCalculator() {
  const [bedLength, setBedLength] = useState("8");
  const [bedWidth, setBedWidth] = useState("4");
  const [bedDepth, setBedDepth] = useState("12");
  const [plantType, setPlantType] = useState("tomatoes");
  const [customSpacing, setCustomSpacing] = useState("12");
  const [plantPrice, setPlantPrice] = useState("4");
  const [soilPrice, setSoilPrice] = useState("8");
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const effectiveSpacing = plantType === "custom" ? customSpacing : SPACING_MAP[plantType] ?? "12";

  const results = useMemo(() => {
    return calcGardenPlanting(
      Number(bedLength) || 0,
      Number(bedWidth) || 0,
      Number(bedDepth) || 12,
      Number(effectiveSpacing) || 12,
      Number(plantPrice) || 4,
      Number(soilPrice) || 8,
      1.5,
      plantType !== "custom" ? plantType : undefined
    );
  }, [bedLength, bedWidth, bedDepth, effectiveSpacing, plantPrice, soilPrice, plantType]);

  const insight = useMemo(() => {
    return generateGardenInsight(
      results.plantsNeeded,
      results.estimatedCost,
      Number(bedLength) * Number(bedWidth)
    );
  }, [results, bedLength, bedWidth]);

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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-lime-950 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-500/20 border border-lime-500/30 text-lime-300 text-sm font-medium mb-6">
                Garden Planning
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Garden Planting<br /><span className="text-lime-400">Calculator</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Plan exactly how many plants fit your garden bed at the right spacing, how much soil you need to fill it, and what the total setup will cost.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <Zap className="h-4 w-4 text-yellow-400" /> Instant planting grid
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-green-400" /> Soil volume + cost
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 my-8" ref={resultsRef}>
            <div className="xl:col-span-4">
              <CalculatorCard title="Garden Bed Details">
                <div className="space-y-5">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="bedLength" className="text-sm font-semibold">Length (ft)</Label>
                      <Input id="bedLength" type="number" min="1" className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200" value={bedLength} onChange={(e) => setBedLength(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bedWidth" className="text-sm font-semibold">Width (ft)</Label>
                      <Input id="bedWidth" type="number" min="1" className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200" value={bedWidth} onChange={(e) => setBedWidth(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bedDepth" className="text-sm font-semibold">Depth (in)</Label>
                      <Input id="bedDepth" type="number" min="4" className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200" value={bedDepth} onChange={(e) => setBedDepth(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Plant Type</Label>
                    <Select value={plantType} onValueChange={(v) => { setPlantType(v); if (SPACING_MAP[v]) setCustomSpacing(SPACING_MAP[v]); }}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-medium text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PLANT_TYPES.map((p) => (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {plantType === "custom" && (
                    <div className="space-y-2">
                      <Label htmlFor="spacing" className="text-sm font-semibold">Plant Spacing (inches)</Label>
                      <Input id="spacing" type="number" min="1" className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200" value={customSpacing} onChange={(e) => setCustomSpacing(e.target.value)} />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="plantPrice" className="text-sm font-semibold">Plant Price ($ea)</Label>
                      <Input id="plantPrice" type="number" min="1" className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200" value={plantPrice} onChange={(e) => setPlantPrice(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="soilPrice" className="text-sm font-semibold">Soil ($/bag)</Label>
                      <Input id="soilPrice" type="number" min="1" className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200" value={soilPrice} onChange={(e) => setSoilPrice(e.target.value)} />
                    </div>
                  </div>

                  <Button
                    className="w-full h-14 text-lg font-bold rounded-xl bg-lime-600 hover:bg-lime-700 shadow-lg shadow-lime-600/20"
                    onClick={handleCalculate}
                  >
                    Plan My Garden
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
                <ResultCard title="Plants Needed" value={`${results.plantsNeeded}`} />
                <ResultCard title="Soil Bags" value={`${results.soilBags}`} valueColorClass="text-slate-900" />
                <ResultCard title="Total Cost" value={`$${results.estimatedCost.toLocaleString()}`} valueColorClass="text-lime-600" />
                <ResultCard title="Soil (cu ft)" value={`${results.soilCubicFeet}`} valueColorClass="text-amber-600" />
              </motion.div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                <h3 className="font-black text-xl text-slate-900 mb-4">Planting Grid Layout</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-lime-50 rounded-xl border border-lime-200">
                    <p className="text-sm font-medium text-lime-800 mb-1">Grid</p>
                    <p className="text-2xl font-black text-lime-700">{results.plantingGrid.rows} rows × {results.plantingGrid.cols} columns</p>
                    <p className="text-xs text-lime-600 mt-1">at {effectiveSpacing}" spacing</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-medium text-slate-600 mb-1">Bed Area</p>
                    <p className="text-2xl font-black text-slate-700">{(Number(bedLength) * Number(bedWidth)).toFixed(0)} sq ft</p>
                    <p className="text-xs text-slate-500 mt-1">{bedLength}ft × {bedWidth}ft × {bedDepth}in deep</p>
                  </div>
                </div>
                {results.harvestYield && (
                  <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-sm font-bold text-green-800">Expected Harvest Yield</p>
                    <p className="text-lg font-black text-green-700 mt-1">{results.harvestYield}</p>
                    <p className="text-xs text-green-600 mt-1">based on average growing conditions</p>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h3 className="font-black text-lg text-slate-900 mb-3">Soil Mix Recommendation</h3>
                <div className="space-y-2">
                  {[
                    { label: "Topsoil", percent: 60, color: "bg-amber-600" },
                    { label: "Compost", percent: 30, color: "bg-green-600" },
                    { label: "Perlite / Coarse Sand", percent: 10, color: "bg-slate-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-24 text-xs font-medium text-slate-600 text-right">{item.label}</div>
                      <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                      </div>
                      <div className="w-8 text-xs font-bold text-slate-700">{item.percent}%</div>
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
            <EducationalContentBlock {...gardenPlantingEducationContent} theme="emerald" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-black text-slate-900">Garden Planning That Actually Works</h2>
              <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                <p><strong>Problem:</strong> Most gardening failures happen before the first seed goes in the ground — wrong spacing, wrong soil depth, wrong sun exposure. The result is wasted plants and wasted money.</p>
                <p><strong>Solution:</strong> Planning spacing correctly before you plant is the single highest-leverage thing you can do for garden success. This calculator tells you exactly how many plants fit at proper spacing so you buy the right amount and space them optimally.</p>
                <h3 className="text-xl font-bold text-slate-900">STAR Scenario: Sarah's Tomato Yield Doubles</h3>
                <p><strong>Situation:</strong> Sarah's 4×8 raised bed produced only 12 lbs of tomatoes despite 8 plants.</p>
                <p><strong>Task:</strong> Improve yield without expanding.</p>
                <p><strong>Action:</strong> She tested soil pH (5.2 — too acidic), added lime, used the planting calculator to confirm she should plant 6 tomatoes at 24" spacing instead of 8 at 12".</p>
                <p><strong>Result:</strong> Same bed produced 28 lbs the following year — a 133% increase. Soil amendments: $35.</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-10">
              <FAQAccordion items={[
                { question: "What soil depth do raised beds need?", answer: "Most vegetables need 12 inches minimum. Root vegetables (carrots, parsnips) need 18 inches. Shallow-rooted herbs and lettuce can grow in 6–8 inches. Always overfill by 10–15% to account for settling." },
                { question: "Square foot gardening vs. traditional row spacing?", answer: "Square foot gardening places plants in a grid at their minimum spacing. This produces 40–80% more yield per square foot than traditional row gardening because there's no wasted walkway space." },
                { question: "Should I start from seed or transplants?", answer: "Transplants are more expensive but 6–8 weeks ahead of seeds. For tomatoes, peppers, and eggplant, transplants are strongly preferred. For carrots, beets, and beans, direct sowing works best — these dislike transplanting." },
                { question: "What's the best soil mix for raised beds?", answer: "60% topsoil, 30% compost, 10% perlite or coarse sand for drainage. Avoid pure potting mix — it's expensive at scale and drains too fast for raised beds. A cubic yard of bulk mix costs $30–$60 and fills about 3 cubic feet more than bagged options." },
              ]} />

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard title="Lawn Care Cost" description="Compare DIY vs. professional lawn care." href="/lawn-care-calculator" icon={<Leaf className="h-6 w-6" />} />
                  <ToolCard title="Fence Cost Calculator" description="Estimate fence installation for your garden perimeter." href="/fence-cost-calculator" icon={<Fence className="h-6 w-6" />} />
                  <ToolCard title="Home Renovation Budget" description="Plan full renovation costs with contingency." href="/home-renovation-calculator" icon={<Hammer className="h-6 w-6" />} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TrustSection {...gardenPlantingTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
