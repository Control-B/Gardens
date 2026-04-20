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
import { calcHomeRenovation } from "@/lib/calculators";
import { generateRenovationInsight } from "@/lib/aiInsights";
import { renovationEducationContent } from "@/lib/educationContent";
import { renovationTrustContent } from "@/lib/trustContent";
import { Home, Paintbrush, TreeDeciduous, Zap, ShieldCheck, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const ROOM_TYPES = [
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "bedroom", label: "Bedroom" },
  { value: "living_room", label: "Living Room" },
  { value: "basement", label: "Basement" },
  { value: "deck", label: "Deck / Patio" },
  { value: "whole_house", label: "Whole House" },
];

const SCOPE_OPTIONS = [
  { value: "cosmetic", label: "Cosmetic (paint, hardware, fixtures)" },
  { value: "mid", label: "Mid-Range (new cabinets, flooring, tile)" },
  { value: "full", label: "Full Gut Renovation (layout change, all new)" },
];

interface RoomEntry {
  id: number;
  type: string;
  sqFt: string;
  scope: "cosmetic" | "mid" | "full";
}

export default function HomeRenovationCalculator() {
  const [rooms, setRooms] = useState<RoomEntry[]>([
    { id: 1, type: "kitchen", sqFt: "200", scope: "mid" },
  ]);
  const [contingency, setContingency] = useState("15");
  const [financeMonths, setFinanceMonths] = useState("");
  const [financeRate, setFinanceRate] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const nextId = useRef(2);

  const addRoom = () => {
    setRooms((prev) => [...prev, { id: nextId.current++, type: "bedroom", sqFt: "150", scope: "mid" }]);
  };

  const removeRoom = (id: number) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRoom = (id: number, field: keyof RoomEntry, value: string) => {
    setRooms((prev) => prev.map((r) => r.id === id ? { ...r, [field]: value } : r));
  };

  const results = useMemo(() => {
    const roomData = rooms.map((r) => ({
      type: r.type,
      sqFt: Number(r.sqFt) || 150,
      scope: r.scope,
    }));
    return calcHomeRenovation(
      roomData,
      Number(contingency) || 15,
      financeMonths ? Number(financeMonths) : undefined,
      financeRate ? Number(financeRate) : undefined
    );
  }, [rooms, contingency, financeMonths, financeRate]);

  const insight = useMemo(() => {
    return generateRenovationInsight(results.totalEstimate, results.contingencyAmount, rooms.length);
  }, [results, rooms.length]);

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
                Home Renovation<br /><span className="text-emerald-400">Budget Calculator</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Build a realistic renovation budget before talking to contractors. Add rooms, choose scope, and get a cost range that actually accounts for surprises.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <Zap className="h-4 w-4 text-yellow-400" /> Multi-room planning
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-green-400" /> Contingency included
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
          <AdPlaceholder />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 my-8" ref={resultsRef}>
            <div className="xl:col-span-5">
              <CalculatorCard title="Renovation Scope">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Rooms to Renovate</Label>
                    {rooms.map((room) => (
                      <div key={room.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <Select value={room.type} onValueChange={(v) => updateRoom(room.id, "type", v)}>
                            <SelectTrigger className="h-10 rounded-lg bg-white border-slate-200 font-medium text-sm flex-1 mr-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ROOM_TYPES.map((t) => (
                                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {rooms.length > 1 && (
                            <button onClick={() => removeRoom(room.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors flex-shrink-0">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-slate-600 mb-1 block">Size (sq ft)</Label>
                            <Input
                              type="number"
                              min="50"
                              value={room.sqFt}
                              onChange={(e) => updateRoom(room.id, "sqFt", e.target.value)}
                              className="h-9 text-sm rounded-lg bg-white border-slate-200"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-slate-600 mb-1 block">Scope</Label>
                            <Select value={room.scope} onValueChange={(v) => updateRoom(room.id, "scope", v as "cosmetic" | "mid" | "full")}>
                              <SelectTrigger className="h-9 rounded-lg bg-white border-slate-200 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {SCOPE_OPTIONS.map((s) => (
                                  <SelectItem key={s.value} value={s.value} className="text-xs">{s.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full border-dashed" onClick={addRoom}>
                      <Plus className="h-4 w-4 mr-2" /> Add Another Room
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="contingency" className="text-sm font-semibold">Contingency %</Label>
                      <Input id="contingency" type="number" min="0" max="50" value={contingency} onChange={(e) => setContingency(e.target.value)} className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="financeMonths" className="text-sm font-semibold">Finance (mo)</Label>
                      <Input id="financeMonths" type="number" min="12" placeholder="—" value={financeMonths} onChange={(e) => setFinanceMonths(e.target.value)} className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="financeRate" className="text-sm font-semibold">Rate %</Label>
                      <Input id="financeRate" type="number" step="0.1" placeholder="—" value={financeRate} onChange={(e) => setFinanceRate(e.target.value)} className="text-lg font-medium h-12 rounded-xl bg-slate-50 border-slate-200" />
                    </div>
                  </div>

                  <Button
                    className="w-full h-14 text-lg font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                    onClick={handleCalculate}
                  >
                    Calculate Budget
                  </Button>
                </div>
              </CalculatorCard>
            </div>

            <div className="xl:col-span-7 flex flex-col space-y-6">
              <motion.div
                animate={isCalculating ? { scale: [1, 1.02, 1], opacity: [1, 0.8, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <ResultCard title="Total Estimate" value={`$${results.totalEstimate.toLocaleString()}`} />
                <ResultCard title="Low Range" value={`$${results.lowEstimate.toLocaleString()}`} valueColorClass="text-slate-900" />
                <ResultCard title="High Range" value={`$${results.highEstimate.toLocaleString()}`} valueColorClass="text-amber-600" />
                <ResultCard title="Contingency" value={`$${results.contingencyAmount.toLocaleString()}`} valueColorClass="text-emerald-600" />
              </motion.div>

              {results.monthlyPayment && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm font-medium text-blue-800">Estimated Monthly Payment (financed)</p>
                  <p className="text-3xl font-black text-blue-700 mt-1">${results.monthlyPayment.toLocaleString()}/mo</p>
                </div>
              )}

              {/* Per-room breakdown */}
              {results.breakdown.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="font-black text-lg text-slate-900 mb-4">Cost Range by Room</h3>
                  <div className="space-y-3">
                    {results.breakdown.map((item) => (
                      <div key={item.category} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-slate-700 text-sm capitalize">{item.category}</span>
                          <span className="font-bold text-slate-900 text-sm">${item.avg.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-slate-500">Range: ${item.low.toLocaleString()} – ${item.high.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="my-8">
            <AIInsightCard content={insight} />
          </div>

          <div className="my-12"><AdPlaceholder /></div>

          <div className="my-12">
            <EducationalContentBlock {...renovationEducationContent} theme="emerald" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-black text-slate-900">Building a Realistic Renovation Budget</h2>
              <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                <p><strong>Why 75% of renovations go over budget:</strong> Homeowners enter projects with a number they've seen on HGTV or from one contractor quote, without accounting for: hidden conditions once walls are opened, permit fees, design changes mid-project, and material cost volatility.</p>
                <p><strong>What this calculator does differently:</strong> It shows a low-to-high range for each room type and renovation scope — and forces you to include a contingency buffer before the number feels complete.</p>
                <h3 className="text-xl font-bold text-slate-900">The 3 Questions to Ask Every Contractor</h3>
                <ul className="space-y-2">
                  <li><strong>1.</strong> "What's not included in this quote?" — Hidden exclusions are how budget overruns start.</li>
                  <li><strong>2.</strong> "What allowances are you using for materials?" — Allowances are placeholders. If you choose something more expensive, the quote goes up.</li>
                  <li><strong>3.</strong> "What is your change-order process and how are they priced?" — Change orders are where contractors make real money on tight bids.</li>
                </ul>
                <h3 className="text-xl font-bold text-slate-900">STAR Scenario: Lisa Avoids a $12,000 Mistake</h3>
                <p><strong>Situation:</strong> Lisa wanted to finish her basement and had a $15,000 budget from watching renovation videos.</p>
                <p><strong>Action:</strong> She used this calculator with basement (600 sq ft, full scope) and got a range of $24,000–$48,000. She reduced scope to mid-range: $9,000–$18,000. Hired an electrician for permits, DIY'd framing and drywall.</p>
                <p><strong>Result:</strong> Total cost: $13,400. The realistic budget from the calculator prevented her from starting a project she couldn't finish.</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-10">
              <FAQAccordion items={[
                { question: "What does a kitchen remodel typically cost?", answer: "Cosmetic kitchen update (paint, hardware, appliances): $5,000–$15,000. Mid-range remodel (new cabinets, countertops, flooring): $20,000–$40,000. Full gut renovation with layout changes: $50,000–$100,000+." },
                { question: "Is a 15% contingency really necessary?", answer: "Yes — 15% is the minimum recommended by professional project managers. On projects involving older homes (pre-1980), use 20–25%. The contingency covers: structural surprises, code upgrades, material price changes, and design modifications." },
                { question: "Should I get one quote or three?", answer: "Always get three. For projects over $5,000, the range between lowest and highest quote is typically 30–60%. Three quotes let you identify outliers in both directions — suspiciously low (red flag for cut corners) and unreasonably high." },
                { question: "Can I live in my home during a major renovation?", answer: "For single-room renovations: usually yes. For whole-house renovations or anything involving HVAC, plumbing shutoffs, or structural work: budget for temporary housing. Trying to live through major renovation work slows contractors and increases stress significantly." },
              ]} />

              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Related Tools</h2>
                <div className="grid gap-4">
                  <ToolCard title="Roof Cost Calculator" description="Estimate roof replacement cost before contractor quotes." href="/roof-cost-calculator" icon={<Home className="h-6 w-6" />} />
                  <ToolCard title="Paint Calculator" description="Calculate paint gallons for any room or exterior." href="/paint-calculator" icon={<Paintbrush className="h-6 w-6" />} />
                  <ToolCard title="Garden Planting Calculator" description="Plan garden layout, soil, and planting costs." href="/garden-planting-calculator" icon={<TreeDeciduous className="h-6 w-6" />} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TrustSection {...renovationTrustContent} />
      </main>

      <Footer />
    </div>
  );
}
