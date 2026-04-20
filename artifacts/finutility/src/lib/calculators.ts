// Home & Garden Calculators

// ── Roof Cost Calculator ────────────────────────────────────────────────────
export interface RoofCostResult {
  totalCost: number;
  materialCost: number;
  laborCost: number;
  removalCost: number;
  costPerSqFt: number;
  squares: number; // roofing squares (100 sq ft each)
}

export function calcRoofCost(
  roofAreaSqFt: number,
  material: string,
  pitchMultiplier: number,
  includeRemoval: boolean,
  laborRatePerSquare: number
): RoofCostResult {
  const materialRates: Record<string, number> = {
    asphalt_3tab: 90,
    asphalt_architectural: 130,
    metal_standing_seam: 600,
    metal_corrugated: 350,
    wood_shake: 450,
    tile_concrete: 400,
    tile_clay: 700,
    slate: 1000,
  };

  const rate = materialRates[material] ?? 130;
  const squares = Math.ceil((roofAreaSqFt * pitchMultiplier) / 100);
  const materialCost = squares * rate;
  const laborCost = squares * (laborRatePerSquare || 150);
  const removalCost = includeRemoval ? squares * 50 : 0;
  const totalCost = materialCost + laborCost + removalCost;

  return {
    totalCost,
    materialCost,
    laborCost,
    removalCost,
    costPerSqFt: roofAreaSqFt > 0 ? totalCost / roofAreaSqFt : 0,
    squares,
  };
}

// ── Paint Calculator ────────────────────────────────────────────────────────
export interface PaintResult {
  gallonsNeeded: number;
  gallonsWithWaste: number;
  totalCost: number;
  coatsNeeded: number;
  coverageNotes: string;
}

export function calcPaint(
  wallAreaSqFt: number,
  coats: number,
  pricePerGallon: number,
  coveragePerGallon: number,
  includeWaste: boolean
): PaintResult {
  const coverage = coveragePerGallon || 350;
  const gallonsNeeded = (wallAreaSqFt * coats) / coverage;
  const gallonsWithWaste = includeWaste ? gallonsNeeded * 1.1 : gallonsNeeded;
  const roundedGallons = Math.ceil(gallonsWithWaste);
  const totalCost = roundedGallons * (pricePerGallon || 40);

  return {
    gallonsNeeded: parseFloat(gallonsNeeded.toFixed(2)),
    gallonsWithWaste: parseFloat(gallonsWithWaste.toFixed(2)),
    totalCost,
    coatsNeeded: coats,
    coverageNotes: `Based on ${coverage} sq ft per gallon coverage`,
  };
}

export function calcPaintWallArea(
  rooms: { length: number; width: number; height: number; doors: number; windows: number }[]
): number {
  return rooms.reduce((total, room) => {
    const perimeter = 2 * (room.length + room.width);
    const wallArea = perimeter * room.height;
    const openings = room.doors * 21 + room.windows * 15;
    return total + Math.max(0, wallArea - openings);
  }, 0);
}

// ── Lawn Care Cost Calculator ───────────────────────────────────────────────
export interface LawnCareResult {
  annualCost: number;
  monthlyCost: number;
  perVisitCost: number;
  seasonalBreakdown: { service: string; cost: number }[];
  diyVsPro: { diy: number; pro: number; savings: number };
}

export function calcLawnCare(
  lawnSizeSqFt: number,
  services: {
    mowing: boolean;
    fertilizing: boolean;
    aeration: boolean;
    overseeding: boolean;
    weedControl: boolean;
    leafRemoval: boolean;
  },
  visitsPerMonth: number,
  regionMultiplier: number
): LawnCareResult {
  const rm = regionMultiplier || 1;
  const sizeFactor = lawnSizeSqFt / 5000;

  const serviceCosts: { service: string; cost: number; enabled: boolean }[] = [
    { service: "Mowing", cost: Math.round(35 * sizeFactor * rm * visitsPerMonth * 12), enabled: services.mowing },
    { service: "Fertilizing (4x/yr)", cost: Math.round(60 * sizeFactor * rm * 4), enabled: services.fertilizing },
    { service: "Core Aeration", cost: Math.round(80 * sizeFactor * rm), enabled: services.aeration },
    { service: "Overseeding", cost: Math.round(200 * sizeFactor * rm), enabled: services.overseeding },
    { service: "Weed Control", cost: Math.round(50 * sizeFactor * rm * 6), enabled: services.weedControl },
    { service: "Leaf Removal", cost: Math.round(120 * sizeFactor * rm * 2), enabled: services.leafRemoval },
  ];

  const breakdown = serviceCosts.filter((s) => s.enabled).map(({ service, cost }) => ({ service, cost }));
  const annualCost = breakdown.reduce((s, i) => s + i.cost, 0);
  const monthlyCost = annualCost / 12;
  const perVisitCost = visitsPerMonth > 0 ? monthlyCost / visitsPerMonth : monthlyCost;

  const diyAnnual = Math.round(annualCost * 0.35);

  return {
    annualCost,
    monthlyCost: parseFloat(monthlyCost.toFixed(2)),
    perVisitCost: parseFloat(perVisitCost.toFixed(2)),
    seasonalBreakdown: breakdown,
    diyVsPro: { diy: diyAnnual, pro: annualCost, savings: annualCost - diyAnnual },
  };
}

// ── Fence Cost Calculator ───────────────────────────────────────────────────
export interface FenceCostResult {
  totalCost: number;
  materialCost: number;
  laborCost: number;
  postCost: number;
  linearFeet: number;
  costPerLinearFoot: number;
}

export function calcFenceCost(
  linearFeet: number,
  material: string,
  height: number,
  includeGates: number,
  laborCostPerFt: number
): FenceCostResult {
  const materialRates: Record<string, number> = {
    wood_privacy: 18,
    wood_picket: 12,
    vinyl: 28,
    chain_link: 10,
    aluminum: 26,
    wrought_iron: 35,
    split_rail: 10,
    bamboo: 14,
  };

  const heightMultiplier = height / 6;
  const rate = (materialRates[material] ?? 18) * heightMultiplier;
  const materialCost = linearFeet * rate;
  const posts = Math.ceil(linearFeet / 8);
  const postCost = posts * 12;
  const gateCost = includeGates * 150;
  const labor = laborCostPerFt || 10;
  const laborCost = linearFeet * labor + includeGates * 100;
  const totalCost = materialCost + postCost + gateCost + laborCost;

  return {
    totalCost,
    materialCost: materialCost + postCost + gateCost,
    laborCost,
    postCost,
    linearFeet,
    costPerLinearFoot: linearFeet > 0 ? totalCost / linearFeet : 0,
  };
}

// ── Garden Planting Calculator ──────────────────────────────────────────────
export interface GardenPlantingResult {
  plantsNeeded: number;
  soilCubicFeet: number;
  soilBags: number;
  estimatedCost: number;
  plantingGrid: { rows: number; cols: number };
  harvestYield?: string;
}

export function calcGardenPlanting(
  bedLengthFt: number,
  bedWidthFt: number,
  bedDepthIn: number,
  spacingIn: number,
  plantPriceEach: number,
  soilPricePerBag: number,
  bagSizeCuFt: number,
  plantType?: string
): GardenPlantingResult {
  const areaFt = bedLengthFt * bedWidthFt;
  const spacingFt = spacingIn / 12;
  const cols = Math.floor(bedLengthFt / spacingFt);
  const rows = Math.floor(bedWidthFt / spacingFt);
  const plantsNeeded = Math.max(1, rows * cols);
  const soilCuFt = (areaFt * bedDepthIn) / 12;
  const soilBags = Math.ceil(soilCuFt / (bagSizeCuFt || 1.5));
  const estimatedCost = plantsNeeded * (plantPriceEach || 4) + soilBags * (soilPricePerBag || 8);

  const yieldMap: Record<string, string> = {
    tomatoes: `~${plantsNeeded * 10}–${plantsNeeded * 15} lbs`,
    lettuce: `~${plantsNeeded * 0.5}–${plantsNeeded * 1} lbs`,
    peppers: `~${plantsNeeded * 6}–${plantsNeeded * 10} lbs`,
    carrots: `~${plantsNeeded * 0.3}–${plantsNeeded * 0.5} lbs`,
    herbs: `Fresh herbs all season`,
  };

  return {
    plantsNeeded,
    soilCubicFeet: parseFloat(soilCuFt.toFixed(1)),
    soilBags,
    estimatedCost,
    plantingGrid: { rows, cols },
    harvestYield: plantType ? yieldMap[plantType] : undefined,
  };
}

// ── Home Renovation Budget Calculator ──────────────────────────────────────
export interface RenovationResult {
  totalEstimate: number;
  lowEstimate: number;
  highEstimate: number;
  contingencyAmount: number;
  breakdown: { category: string; low: number; high: number; avg: number }[];
  monthlyPayment?: number;
}

export function calcHomeRenovation(
  rooms: {
    type: string;
    sqFt: number;
    scope: "cosmetic" | "mid" | "full";
  }[],
  contingencyPercent: number,
  financeMonths?: number,
  financeRate?: number
): RenovationResult {
  const costRanges: Record<string, Record<string, [number, number]>> = {
    kitchen: { cosmetic: [5000, 15000], mid: [20000, 40000], full: [50000, 100000] },
    bathroom: { cosmetic: [2000, 5000], mid: [7000, 15000], full: [18000, 35000] },
    bedroom: { cosmetic: [1000, 3000], mid: [4000, 8000], full: [10000, 20000] },
    living_room: { cosmetic: [2000, 5000], mid: [6000, 12000], full: [15000, 30000] },
    basement: { cosmetic: [3000, 8000], mid: [15000, 30000], full: [40000, 80000] },
    deck: { cosmetic: [2000, 5000], mid: [8000, 20000], full: [20000, 50000] },
    whole_house: { cosmetic: [10000, 30000], mid: [50000, 100000], full: [120000, 300000] },
  };

  const breakdown = rooms.map((room) => {
    const ranges = costRanges[room.type] ?? costRanges.bedroom;
    const [low, high] = ranges[room.scope] ?? ranges.mid;
    const sqFtFactor = Math.max(0.5, room.sqFt / 200);
    return {
      category: `${room.type.replace(/_/g, " ")} (${room.scope})`,
      low: Math.round(low * sqFtFactor),
      high: Math.round(high * sqFtFactor),
      avg: Math.round(((low + high) / 2) * sqFtFactor),
    };
  });

  const totalLow = breakdown.reduce((s, r) => s + r.low, 0);
  const totalHigh = breakdown.reduce((s, r) => s + r.high, 0);
  const totalAvg = breakdown.reduce((s, r) => s + r.avg, 0);
  const contingencyAmount = Math.round(totalAvg * ((contingencyPercent || 15) / 100));
  const totalEstimate = totalAvg + contingencyAmount;

  let monthlyPayment: number | undefined;
  if (financeMonths && financeRate) {
    const monthlyRate = financeRate / 100 / 12;
    monthlyPayment = monthlyRate > 0
      ? totalEstimate * (monthlyRate * Math.pow(1 + monthlyRate, financeMonths)) / (Math.pow(1 + monthlyRate, financeMonths) - 1)
      : totalEstimate / financeMonths;
  }

  return {
    totalEstimate,
    lowEstimate: totalLow,
    highEstimate: totalHigh,
    contingencyAmount,
    breakdown,
    monthlyPayment: monthlyPayment ? parseFloat(monthlyPayment.toFixed(2)) : undefined,
  };
}

// ── Mulch & Soil Volume Calculator ─────────────────────────────────────────
export interface MulchResult {
  cubicYards: number;
  cubicFeet: number;
  bags: number;
  bagCost: number;
  bulkCost: number;
  recommendation: string;
}

export function calcMulch(
  areaLengthFt: number,
  areaWidthFt: number,
  depthIn: number,
  pricePerBag: number,
  bagVolumeCuFt: number,
  bulkPricePerCuYd: number
): MulchResult {
  const cuFt = (areaLengthFt * areaWidthFt * depthIn) / 12;
  const cuYd = cuFt / 27;
  const bags = Math.ceil(cuFt / (bagVolumeCuFt || 2));
  const bagCost = bags * (pricePerBag || 5);
  const bulkCost = Math.ceil(cuYd) * (bulkPricePerCuYd || 35);

  return {
    cubicYards: parseFloat(cuYd.toFixed(2)),
    cubicFeet: parseFloat(cuFt.toFixed(1)),
    bags,
    bagCost,
    bulkCost,
    recommendation: bulkCost < bagCost ? "Buying in bulk saves money for this project." : "Bagged mulch is more economical for this smaller area.",
  };
}
