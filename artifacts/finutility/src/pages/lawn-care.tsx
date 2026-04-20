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
import { Switch } from "@/components/ui/switch";
import { calcLawnCare } from "@/lib/calculators";
import { generateLawnCareInsight } from "@/lib/aiInsights";
import { lawnCareEducationContent } from "@/lib/educationContent";
import { lawnCareTrustContent } from "@/lib/trustContent";
import { TreeDeciduous, Fence, Hammer, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const REGIONS = [
  { value: "0.8", label: "Rural / Small Town" },
  { value: "1.0", label: "Suburban (National Average)" },
  { value: "1.3", label: "Mid-Size City" },
  { value: "1.6", label: "Large Metro / High Cost Area" },
];

export default function LawnCareCalculator() {
  const [lawnSize, setLawnSize] = useState("5000");
  const [region, setRegion] = useState("1.0");
  const [visitsPerMonth, setVisitsPerMonth] = useState("4");
  const [services, setServices] = useState({
    mowing: true,
    fertilizing: true,
    aeration: true,
    overseeding: false,
    weedControl: true,
    leafRemoval: false,
  });
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const toggleService = (key: keyof typeof services) => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const results = useMemo(() => {
    return calcLawnCare(Number(lawnSize) || 0, services, Number(visitsPerMonth) || 4, Number(region) || 1);
  }, [lawnSize, services, visitsPerMonth, region]);

  const insight = useMemo(() => {
    return generateLawnCareInsight(results.annualCost, Number(lawnSize) || 0, results.diyVsPro.diy);
  }, [results, lawnSize]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 400);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const serviceOptions: { key: keyof typeof services; label: string; note: string }[] = [
    { key: "mowing", label: "Mowing", note: "Regular mowing" },
    { key: "fertilizing", label: "Fertilizing", note: "4× per year" },
    { key: "aeration", label: "Core Aeration", note: "Once per year" },
    { key: "overseeding", label: "Overseeding", note: "Annual" },
    { key: "weedControl", label: "Weed Control", note: "6× per year" },
    { key: "leafRemoval", label: "Leaf Removal", note: "2× per fall" },
  ];

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
                Lawn & Garden
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Lawn Care<br /><span className="text-emerald-400">Cost Calculator</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Know what your lawn care should actually cost before you sign a service contract. Compare professional vs. DIY costs and find where you can save.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <Zap className="h-4 w-4 text-yellow-400" /> Instant breakdown
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-green-400" /> DIY vs. Pro comparison
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 my-8" ref={resultsRef}>
            <div className="xl:col-span-4">
              <CalculatorCard title="Your Lawn Details">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="lawnSize" className="text-sm font-semibold">Lawn Size (sq ft)</Label>
                    <Input
                      id="lawnSize"
                      type="number"
                      min="500"
                      className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-emerald-500"
                      value={lawnSize}
                      onChange={(e) => setLawnSize(e.target.value)}
                    />
                    <p className="text-xs text-slate-500">Typical 1/4 acre yard = 10,800 sq ft (excluding house). Average front + back = 5,000–8,000 sq ft.</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Region / Cost Area</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-medium text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {REGIONS.map((r) => (
                          <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Mowing Visits / Month</Label>
                    <Select value={visitsPerMonth} onValueChange={setVisitsPerMonth}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2× per month</SelectItem>
                        <SelectItem value="4">4× per month (weekly)</SelectItem>
                        <SelectItem value="8">8× per month (twice weekly)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold mb-3 block">Services to Include</Label>
                    <div className="space-y-2">
                      {serviceOptions.map(({ key, label, note }) => (
                        <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                          <div>
                            <p className="text-sm font-medium text-slate-800">{label}</p>
                            <p className="text-xs text-slate-500">{note}</p>
                          </div>
                          <Switch checked={services[key]} onCheckedChange={() => toggleService(key)} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full h-14 text-lg font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                    onClick={handleCalculate}
                  >
                    Calculate Lawn Care Cost
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
                <ResultCard title="Annual Cost (Pro)" value={`$${results.annualCost.toLocaleString()}`} />
                <ResultCard title="Monthly Cost" value={`$${results.monthlyCost.toFixed(0)}`} valueColorClass="text-slate-900" />
                <ResultCard title="DIY Annual" value={`$${results.diyVsPro.diy.toLocaleString()}`} valueColorClass="text-emerald-600" />
                <ResultCard title="DIY Savings" value={`$${results.diyVsPro.savings.toLocaleString()}`} valueColorClass="text-amber-600" />
              </motion.div>

              {/* Service Breakdown */}
              {results.seasonalBreakdown.length > 0 && (
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                  <h3 className="font-black text-xl text-slate-900 mb-4">Annual Service Breakdown</h3>
                  <div className="space-y-3">
                    {results.seasonalBreakdown.map((item) => (
                      <div key={item.service} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-700">{item.service}</span>
                        <span className="font-bold text-slate-900">${item.cost.toLocaleString()}/yr</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <span className="font-bold text-emerald-900">Total Annual (Professional)</span>
                      <span className="font-black text-emerald-700 text-lg">${results.annualCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* DIY vs Pro Comparison */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                <h3 className="font-black text-xl text-slate-900 mb-4">DIY vs. Professional Cost</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <p className="text-sm font-medium text-slate-600 mb-1">Full Professional Service</p>
                    <p className="text-3xl font-black text-slate-900">${results.diyVsPro.pro.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 mt-1">per year</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                    <p className="text-sm font-medium text-emerald-700 mb-1">DIY (materials only)</p>
                    <p className="text-3xl font-black text-emerald-700">${results.diyVsPro.diy.toLocaleString()}</p>
                    <p className="text-xs text-emerald-600 mt-1">save ${results.diyVsPro.savings.toLocaleString()}/yr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <AIInsightCard content={insight} />
          </div>

          <div className="my-12"><AdPlaceholder /></div>

          <div className="my-12">
            <EducationalContentBlock {...lawnCareEducationContent} theme="emerald" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-black text-slate-900">Lawn Care That Actually Works</h2>
              <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                <p><strong>Problem:</strong> Lawn care contracts lock homeowners into bundled services — including ones their specific grass type doesn't need, applied on a fixed schedule that ignores actual soil and growth conditions.</p>
                <p><strong>Solution:</strong> A hybrid approach — hire professionals for specialized services (core aeration, pest/disease diagnosis) and handle mowing, fertilizing, and basic weed control yourself.</p>
                <p><strong>Benefit:</strong> Homeowners who take this approach save $800–$1,500 per year while maintaining the same or better lawn quality because they can respond to actual conditions rather than a predetermined schedule.</p>
                <h3 className="text-xl font-bold text-slate-900">STAR Scenario: The Rodriguezes Cut Their Bill in Half</h3>
                <p><strong>Situation:</strong> The Rodriguez family was spending $2,400/year on a full-service lawn contract for their 8,000 sq ft lawn.</p>
                <p><strong>Task:</strong> Reduce costs without losing curb appeal before selling their home.</p>
                <p><strong>Action:</strong> They kept professional aeration and weed treatment ($320/year), bought a self-propelled mower ($350), and followed a DIY fertilizing schedule.</p>
                <p><strong>Result:</strong> Annual lawn cost dropped to $1,050 — a 56% reduction. The lawn looked better because they mowed at the right height and frequency.</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-10">
              <FAQAccordion items={[
                { question: "How often should I fertilize my lawn?", answer: "Cool-season grasses: fertilize in fall (September–November) and light spring feeding. Warm-season grasses: fertilize in late spring through summer when actively growing. Over-fertilizing causes excessive growth, thatch buildup, and disease." },
                { question: "Is core aeration really necessary?", answer: "Only if your soil is compacted. Test: push a screwdriver into the lawn. If it resists and doesn't go in easily, aeration will help. Sandy soil rarely needs aeration." },
                { question: "When is the best time to overseed?", answer: "Cool-season grasses: late summer to early fall (soil still warm but air cooling). Warm-season grasses: late spring when soil reaches 65°F. Never overseed during summer heat or drought stress." },
                { question: "Can I mow wet grass?", answer: "Avoid mowing wet grass — it clumps, clogs mowers, creates an uneven cut, and spreads fungal disease. Wait until the grass is dry, ideally mowing in the late morning." },
              ]} />

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard title="Garden Planting Calculator" description="Plan garden beds, spacing, and soil needs." href="/garden-planting-calculator" icon={<TreeDeciduous className="h-6 w-6" />} />
                  <ToolCard title="Fence Cost Calculator" description="Estimate fence materials and installation." href="/fence-cost-calculator" icon={<Fence className="h-6 w-6" />} />
                  <ToolCard title="Home Renovation Budget" description="Plan full home improvement project costs." href="/home-renovation-calculator" icon={<Hammer className="h-6 w-6" />} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TrustSection {...lawnCareTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
