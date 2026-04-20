/**
 * aiInsights.ts — Data-driven home & garden insights generated from calculator inputs.
 */

export function generateRoofCostInsight(
  totalCost: number,
  material: string,
  squares: number
): string {
  if (totalCost === 0)
    return "Enter your roof dimensions to see a detailed cost estimate by material type — and learn which choice delivers the best long-term value for your climate.";

  const materialLabels: Record<string, string> = {
    asphalt_3tab: "3-tab asphalt shingles",
    asphalt_architectural: "architectural asphalt shingles",
    metal_standing_seam: "standing seam metal roofing",
    metal_corrugated: "corrugated metal roofing",
    wood_shake: "wood shake roofing",
    tile_concrete: "concrete tile roofing",
    tile_clay: "clay tile roofing",
    slate: "natural slate roofing",
  };

  const lifespans: Record<string, string> = {
    asphalt_3tab: "15–20 years",
    asphalt_architectural: "25–30 years",
    metal_standing_seam: "40–70 years",
    metal_corrugated: "30–45 years",
    wood_shake: "20–30 years",
    tile_concrete: "40–50 years",
    tile_clay: "50+ years",
    slate: "75–150 years",
  };

  const label = materialLabels[material] ?? "roofing";
  const lifespan = lifespans[material] ?? "20–30 years";

  return `Your estimated ${label} replacement for ${squares} squares is $${totalCost.toLocaleString()}. This material has an expected lifespan of ${lifespan}. Always get at least 3 contractor quotes and verify each contractor is licensed and insured. Proper attic ventilation can extend any roof's life by 5–10 years — ask contractors to assess yours during the estimate.`;
}

export function generatePaintInsight(
  gallons: number,
  totalCost: number,
  area: number
): string {
  if (gallons === 0)
    return "Enter your wall area to calculate exactly how much paint to buy — and see tips for achieving a professional finish.";

  return `You'll need approximately ${gallons} gallons to cover ${area.toLocaleString()} sq ft. Buying quality paint in the $45–$65/gallon range typically results in better coverage per gallon than budget options, often meaning fewer coats — so the per-square-foot cost is similar or lower. Have all gallons mixed at the same time to ensure consistent color. Your estimated material cost is $${totalCost.toLocaleString()}. Professional painters charge $2–$4 per sq ft — doing it yourself saves $${Math.round(area * 3 - totalCost).toLocaleString()} on this project.`;
}

export function generateLawnCareInsight(
  annualCost: number,
  lawnSize: number,
  diyAnnual: number
): string {
  if (annualCost === 0)
    return "Enter your lawn size and select services to see your annual lawn care cost and DIY savings potential.";

  const savings = annualCost - diyAnnual;
  return `Your annual lawn care cost is estimated at $${annualCost.toLocaleString()} for your ${lawnSize.toLocaleString()} sq ft lawn. Handling mowing, fertilizing, and overseeding yourself could reduce this to approximately $${diyAnnual.toLocaleString()} — saving $${savings.toLocaleString()} per year. Services worth keeping professional: core aeration (requires specialized equipment) and disease/pest diagnosis (mistakes are expensive). A robotic mower ($400–$800 one-time) can eliminate ongoing mowing costs entirely within 1–2 seasons.`;
}

export function generateFenceCostInsight(
  totalCost: number,
  linearFeet: number,
  material: string
): string {
  if (totalCost === 0)
    return "Enter your fence dimensions to get a realistic material and labor estimate before calling contractors.";

  const materialLabels: Record<string, string> = {
    wood_privacy: "wood privacy fence",
    wood_picket: "wood picket fence",
    vinyl: "vinyl fence",
    chain_link: "chain link fence",
    aluminum: "aluminum fence",
    wrought_iron: "wrought iron fence",
    split_rail: "split rail fence",
    bamboo: "bamboo fence",
  };

  const label = materialLabels[material] ?? "fence";
  const costPerFt = totalCost / linearFeet;

  return `Your estimated ${label} project is $${totalCost.toLocaleString()} for ${linearFeet} linear feet ($${costPerFt.toFixed(0)}/ft all-in). Before purchasing materials: call 811 to mark utilities, confirm property lines against your survey, and check HOA approval if applicable. DIY fence installation saves 40–60% in labor costs — plan for 1–2 weekends and a rented post hole digger ($85/day) for this size project.`;
}

export function generateGardenInsight(
  plantsNeeded: number,
  estimatedCost: number,
  bedArea: number
): string {
  if (plantsNeeded === 0)
    return "Enter your garden bed dimensions and plant spacing to calculate how many plants you need and what it will cost.";

  const valuePerPlant = estimatedCost > 0 ? (estimatedCost / plantsNeeded).toFixed(2) : "0";

  return `Your ${bedArea.toFixed(0)} sq ft garden bed fits ${plantsNeeded} plants at proper spacing. Starting cost is approximately $${estimatedCost.toLocaleString()} including plants and soil. Tip: buying starter plants ($3–$6 each) saves 6–8 weeks vs. starting from seed but costs more upfront. If this is a new raised bed, add 15–20% to soil volume estimates for settling. Properly spaced plants in amended soil typically yield 25–40% more produce than crowded, in-ground equivalents.`;
}

export function generateRenovationInsight(
  totalEstimate: number,
  contingency: number,
  rooms: number
): string {
  if (totalEstimate === 0)
    return "Select rooms and renovation scope to get a realistic starting budget before talking to contractors.";

  return `Your estimated renovation budget for ${rooms} room${rooms > 1 ? "s" : ""} is $${totalEstimate.toLocaleString()}, including a $${contingency.toLocaleString()} contingency buffer. The contingency is not optional — experienced contractors add 15–20% because older homes almost always reveal surprises once walls are opened. Get at least 3 written quotes, check contractor licenses at your state contractor board, and verify they carry general liability and workers' comp insurance before signing anything.`;
}
