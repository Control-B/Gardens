export interface ParsedIntent {
  calculator: string;
  params: Record<string, string>;
}

export function parseNaturalLanguage(input: string): ParsedIntent | null {
  const lowerInput = input.toLowerCase();

  // Roof cost: "roof cost for 2000 sq ft house" or "replace roof 1500 sqft"
  if (lowerInput.includes("roof") && (lowerInput.includes("cost") || lowerInput.includes("replace") || lowerInput.includes("install"))) {
    const areaMatch = lowerInput.match(/([\d,]+)\s*(?:sq\.?\s*ft|square\s*feet)/);
    const materialMatch = lowerInput.includes("metal") ? "metal_standing_seam"
      : lowerInput.includes("tile") ? "tile_concrete"
      : lowerInput.includes("slate") ? "slate"
      : lowerInput.includes("wood") ? "wood_shake"
      : "asphalt_architectural";

    return {
      calculator: "/roof-cost-calculator",
      params: {
        area: areaMatch ? areaMatch[1].replace(/,/g, "") : "",
        material: materialMatch,
      },
    };
  }

  // Paint: "how much paint for 400 sq ft" or "paint 3 rooms"
  if (lowerInput.includes("paint") && (lowerInput.includes("gallon") || lowerInput.includes("sq") || lowerInput.includes("room") || lowerInput.includes("how much"))) {
    const areaMatch = lowerInput.match(/([\d,]+)\s*(?:sq\.?\s*ft|square\s*feet)/);
    const roomMatch = lowerInput.match(/([\d]+)\s*rooms?/);

    return {
      calculator: "/paint-calculator",
      params: {
        area: areaMatch ? areaMatch[1].replace(/,/g, "") : "",
        rooms: roomMatch ? roomMatch[1] : "",
      },
    };
  }

  // Lawn care: "lawn care cost for 5000 sq ft" or "mowing service 1/4 acre"
  if (lowerInput.includes("lawn") && (lowerInput.includes("cost") || lowerInput.includes("care") || lowerInput.includes("mow") || lowerInput.includes("service"))) {
    const areaMatch = lowerInput.match(/([\d,]+)\s*(?:sq\.?\s*ft|square\s*feet)/)
      || lowerInput.match(/([\d.]+)\s*acre/);

    return {
      calculator: "/lawn-care-calculator",
      params: {
        area: areaMatch ? String(parseFloat(areaMatch[1].replace(/,/g, "")) * (lowerInput.includes("acre") ? 43560 : 1)) : "",
      },
    };
  }

  // Fence: "fence cost for 150 linear feet" or "install wood fence 200 ft"
  if (lowerInput.includes("fence") && (lowerInput.includes("cost") || lowerInput.includes("install") || lowerInput.includes("linear") || lowerInput.includes("feet") || lowerInput.includes("ft"))) {
    const lengthMatch = lowerInput.match(/([\d,]+)\s*(?:linear\s*)?(?:feet|ft)/);
    const materialMatch = lowerInput.includes("vinyl") ? "vinyl"
      : lowerInput.includes("chain") ? "chain_link"
      : lowerInput.includes("metal") ? "aluminum"
      : lowerInput.includes("iron") ? "wrought_iron"
      : "wood_privacy";

    return {
      calculator: "/fence-cost-calculator",
      params: {
        linearFeet: lengthMatch ? lengthMatch[1].replace(/,/g, "") : "",
        material: materialMatch,
      },
    };
  }

  // Garden / planting: "garden bed 4x8" or "plant tomatoes in 10x5 bed"
  if ((lowerInput.includes("garden") || lowerInput.includes("plant") || lowerInput.includes("bed")) &&
    (lowerInput.includes("x") || lowerInput.includes("by") || lowerInput.includes("sqft") || lowerInput.includes("sq ft"))) {
    const dimMatch = lowerInput.match(/([\d.]+)\s*[x×by]\s*([\d.]+)/);

    return {
      calculator: "/garden-planting-calculator",
      params: {
        length: dimMatch ? dimMatch[1] : "",
        width: dimMatch ? dimMatch[2] : "",
        plant: lowerInput.includes("tomato") ? "tomatoes"
          : lowerInput.includes("lettuce") ? "lettuce"
          : lowerInput.includes("pepper") ? "peppers"
          : lowerInput.includes("carrot") ? "carrots"
          : lowerInput.includes("herb") ? "herbs"
          : "",
      },
    };
  }

  // Renovation: "renovate kitchen" or "bathroom remodel cost"
  if ((lowerInput.includes("renovate") || lowerInput.includes("remodel") || lowerInput.includes("renovation")) &&
    (lowerInput.includes("kitchen") || lowerInput.includes("bathroom") || lowerInput.includes("bedroom") || lowerInput.includes("basement") || lowerInput.includes("house"))) {
    const roomMatch = lowerInput.includes("kitchen") ? "kitchen"
      : lowerInput.includes("bathroom") ? "bathroom"
      : lowerInput.includes("basement") ? "basement"
      : lowerInput.includes("bedroom") ? "bedroom"
      : "whole_house";

    return {
      calculator: "/home-renovation-calculator",
      params: { room: roomMatch },
    };
  }

  return null;
}
