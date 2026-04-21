export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  calculatorHref?: string;
  calculatorLabel?: string;
  relatedSlugs: string[];
  sections: GuideSection[];
}

export const guideArticles: GuideArticle[] = [
  {
    slug: "how-to-fix-a-leaking-faucet",
    title: "How to Fix a Leaking Faucet Without Hiring a Plumber",
    description: "A leaking faucet wastes water and drives up your bill. Learn the exact steps to diagnose and fix any drip yourself and save $150 or more.",
    category: "Plumbing DIY",
    readTime: "8 min read",
    calculatorHref: "/home-renovation-calculator",
    calculatorLabel: "Estimate Repair Costs",
    relatedSlugs: ["when-to-diy-vs-hire-a-contractor", "how-to-winterize-your-home"],
    sections: [
      {
        heading: "The Problem: A Dripping Faucet Is Costing You Money",
        paragraphs: [
          "A single faucet dripping once per second wastes over 3,000 gallons of water per year — enough to fill a backyard pool. That translates to $20–$35 added to your water bill every month, and the longer you wait, the worse the damage to your pipes and fixtures.",
          "Most homeowners call a plumber for this repair, paying $150–$300 for a job that takes 30 minutes. The parts cost less than $15 at any hardware store.",
        ],
      },
      {
        heading: "The Solution: Tools and Materials You Need",
        paragraphs: [
          "You need: adjustable wrench, Phillips and flathead screwdrivers, replacement O-rings or cartridge, plumber's grease, and a towel. Identify your faucet type first: ball, cartridge, ceramic disc, or compression. Most modern faucets are cartridge-based.",
          "Take a photo of your faucet brand and model before heading to the hardware store. Store staff can match the exact replacement cartridge or washer.",
        ],
      },
      {
        heading: "The Benefit: Save $150+ and Prevent Water Damage",
        paragraphs: [
          "Fixing a leaking faucet yourself saves the plumber's service fee entirely. More importantly, you prevent the drip from worsening into a corroded valve seat — a repair that can cost $400 or more if left untreated.",
          "Homeowners who handle small plumbing repairs themselves save an average of $400–$800 per year on maintenance calls.",
        ],
      },
      {
        heading: "STAR Scenario: How Marcus Saved $150 in 30 Minutes",
        paragraphs: [
          "Situation: Marcus noticed his kitchen faucet dripping nonstop. His water bill had crept up $25 over two months.",
          "Task: Fix the leak without calling a plumber, which his neighbor quoted at $175.",
          "Action: Marcus watched a 5-minute video, identified his Moen cartridge faucet, bought a $12 replacement cartridge, and followed the steps — shut-off valve, remove handle, swap cartridge, reassemble.",
          "Result: The leak stopped in under 30 minutes. He saved $163 on the repair and learned a skill he has now used three more times.",
        ],
      },
      {
        heading: "Step-by-Step Fix Guide",
        paragraphs: [
          "1. Turn off the water supply valves under the sink. Test by turning the handle — no water should flow.",
          "2. Remove the decorative cap on the faucet handle and unscrew the handle screw. Pull the handle straight up.",
          "3. For cartridge faucets: pull the cartridge straight up using pliers. Note the orientation before removing.",
          "4. Take the old cartridge to the hardware store for an exact match.",
          "5. Insert the new cartridge in the same orientation. Apply plumber's grease to O-rings before reassembling.",
          "6. Reinstall the handle, turn the water back on slowly, and test.",
        ],
      },
      {
        heading: "Pro Tips",
        paragraphs: [
          "Always photograph every step before disassembly — it makes reassembly much easier.",
          "If the leak comes from under the handle rather than the spout, the O-ring on the valve stem is the culprit, not the cartridge.",
          "Replacing all O-rings at once while you have the faucet apart prevents future leaks from different spots.",
        ],
      },
      {
        heading: "FAQ",
        paragraphs: [
          "Q: How do I know what type of faucet I have? A: Remove the handle and look at the internal mechanism. Ball types have a rounded brass ball; cartridge types have a cylindrical cartridge; ceramic disc types have a wide cylinder with ceramic discs.",
          "Q: My faucet still drips after replacing the cartridge. What now? A: Check the valve seat — a worn seat causes leaks even with a new cartridge. A seat wrench ($8) lets you replace it yourself.",
          "Q: Should I replace both hot and cold cartridges at once? A: Yes. If one has worn out, the other is close behind. Replacing both while you have the faucet apart saves a second repair job within months.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-roof-material",
    title: "How to Choose the Right Roofing Material for Your Home",
    description: "Not all roofing materials are equal. Learn how to compare asphalt, metal, tile, and slate by cost, lifespan, and climate suitability before spending $10,000+.",
    category: "Roofing",
    readTime: "10 min read",
    calculatorHref: "/roof-cost-calculator",
    calculatorLabel: "Calculate Roof Replacement Cost",
    relatedSlugs: ["best-home-upgrades-that-add-value", "when-to-diy-vs-hire-a-contractor"],
    sections: [
      {
        heading: "The Problem: Choosing the Wrong Material Costs Thousands",
        paragraphs: [
          "A roof replacement is one of the most expensive home projects — typically $8,000 to $30,000 depending on material and size. Homeowners who choose based on upfront cost alone often end up re-roofing again in 15 years instead of 50.",
          "The wrong material for your climate also means higher energy bills, premature wear, and voided warranties.",
        ],
      },
      {
        heading: "Material Comparison: What Each Option Delivers",
        paragraphs: [
          "Asphalt 3-Tab Shingles: $90–$100 per square, 15–20 year lifespan. Best for budget-conscious owners who plan to sell within a decade.",
          "Architectural Asphalt: $120–$150 per square, 25–30 year lifespan. Better appearance and durability — the most popular residential choice.",
          "Metal (Standing Seam): $500–$700 per square, 40–70 year lifespan. Excellent in snow and rain climates. High upfront cost offset by near-zero maintenance.",
          "Clay/Concrete Tile: $400–$700 per square, 50+ year lifespan. Ideal for warm, dry climates. Heavy — requires structural reinforcement in many homes.",
          "Slate: $800–$1,000+ per square, 75–150 year lifespan. Premium choice for historic or high-end homes. Rarely needs replacement in a homeowner's lifetime.",
        ],
      },
      {
        heading: "The Benefit: Matching Material to Climate Saves Long-Term",
        paragraphs: [
          "A homeowner in Minnesota who chooses metal roofing avoids ice dam damage and saves an estimated $3,000–$6,000 in repairs over 20 years compared to asphalt.",
          "In Florida, clay tile's resistance to humidity, UV, and hurricane wind ratings justifies its cost within 10–15 years.",
        ],
      },
      {
        heading: "STAR Scenario: The Johnson Family Saves $18,000",
        paragraphs: [
          "Situation: The Johnsons needed a new roof after hail damage. Their 2,200 sq ft home in Colorado gets heavy snow each winter.",
          "Task: Choose a material that would last without ice dam problems and fit a $20,000 budget.",
          "Action: They used a roof cost calculator, compared asphalt architectural ($11,500) vs. metal standing seam ($19,000). The metal would last 50+ years vs. 25 for asphalt — meaning one replacement instead of two.",
          "Result: They chose metal, paid $19,000, and avoided a projected second $22,000 replacement in 25 years. Net savings over 50 years: $18,000+, plus energy savings from better insulation.",
        ],
      },
      {
        heading: "5 Mistakes to Avoid When Replacing a Roof",
        paragraphs: [
          "1. Choosing the cheapest bid without checking licensing and insurance.",
          "2. Ignoring attic ventilation — poor ventilation shortens any roof's life by 30%.",
          "3. Layering new shingles over old ones to save removal cost. This voids most warranties.",
          "4. Not checking HOA rules before choosing a non-standard material or color.",
          "5. Skipping ice-and-water shield underlayment in cold climates.",
        ],
      },
    ],
  },
  {
    slug: "how-to-prepare-garden-for-spring",
    title: "How to Prepare Your Garden for Spring in 8 Steps",
    description: "Spring garden prep sets the stage for your entire growing season. Follow this 8-step checklist to maximize yield, reduce pests, and save on replanting costs.",
    category: "Gardening",
    readTime: "7 min read",
    calculatorHref: "/garden-planting-calculator",
    calculatorLabel: "Plan Your Planting Layout",
    relatedSlugs: ["best-plants-for-low-maintenance-gardens", "how-to-create-a-raised-garden-bed"],
    sections: [
      {
        heading: "The Problem: Skipping Prep Kills Your Garden Before It Starts",
        paragraphs: [
          "Most gardening failures happen before the first seed goes in the ground. Compacted soil, leftover disease from last year's plants, and poor drainage cause seeds to rot, seedlings to die, and transplants to struggle.",
          "Homeowners who skip spring prep spend 40–60% more on replacement plants by mid-summer.",
        ],
      },
      {
        heading: "The Solution: An 8-Step Spring Prep Checklist",
        paragraphs: [
          "1. Test your soil pH. Most vegetables need 6.0–7.0. A $12 test kit from a hardware store prevents guesswork.",
          "2. Clear dead plant material from last season. This removes overwintering pests and disease spores.",
          "3. Add 2–3 inches of compost and work it into the top 6 inches of soil.",
          "4. Check drainage. Standing water 30 minutes after rain means you need raised beds or drainage work.",
          "5. Apply pre-emergent weed control to areas that won't have seeds for 6+ weeks.",
          "6. Sharpen and clean garden tools. Dirty tools spread disease between plants.",
          "7. Plan your layout using a planting grid calculator — spacing matters for yield.",
          "8. Start cool-season seeds indoors 6–8 weeks before your last frost date.",
        ],
      },
      {
        heading: "The Benefit: Better Yields, Less Replanting Cost",
        paragraphs: [
          "Gardeners who prep properly harvest 25–40% more produce per square foot and spend significantly less on replacement plants.",
          "Proper soil prep also reduces fertilizer needs throughout the season, saving $30–$80 in mid-summer treatments.",
        ],
      },
      {
        heading: "STAR Scenario: Sarah's Tomato Yield Doubles",
        paragraphs: [
          "Situation: Sarah's 4×8 raised bed produced only 12 lbs of tomatoes last year despite planting 8 plants.",
          "Task: Diagnose the problem and improve yield without expanding the garden.",
          "Action: She tested soil (pH was 5.2 — too acidic), added lime, amended with compost, used a planting calculator to space plants 24 inches apart instead of 12, and started seeds 7 weeks before last frost.",
          "Result: Same bed produced 28 lbs of tomatoes — a 133% increase. Cost of soil amendments: $35.",
        ],
      },
    ],
  },
  {
    slug: "how-to-save-on-lawn-care-costs",
    title: "How to Cut Your Lawn Care Costs by 50% Without Sacrificing Results",
    description: "Professional lawn care can cost $1,200–$3,000 per year. Learn which services are worth paying for and which you can do yourself for a fraction of the price.",
    category: "Lawn Care",
    readTime: "9 min read",
    calculatorHref: "/lawn-care-calculator",
    calculatorLabel: "Calculate Your Lawn Care Cost",
    relatedSlugs: ["summer-lawn-care-calendar", "best-plants-for-low-maintenance-gardens"],
    sections: [
      {
        heading: "The Problem: Lawn Service Bills Add Up Fast",
        paragraphs: [
          "A professional lawn service for a 1/4-acre yard typically runs $100–$200 per month for mowing alone. Add fertilizing, aeration, overseeding, and weed control and the annual bill easily reaches $2,000–$3,500.",
          "Many homeowners pay for services they could easily handle themselves with basic equipment they already own.",
        ],
      },
      {
        heading: "The Solution: Hybrid Approach — Pay for Expertise, DIY the Rest",
        paragraphs: [
          "Hire professionals for: core aeration (requires specialized equipment), complex pest treatments, and large tree trimming.",
          "DIY with confidence: mowing, edging, fertilizing on a schedule, overseeding, and basic weed control.",
          "A robotic mower ($400–$1,000 one-time) pays for itself in 1–2 seasons versus weekly mowing service.",
        ],
      },
      {
        heading: "The Benefit: Save $800–$1,500 Per Year",
        paragraphs: [
          "Homeowners who move mowing, fertilizing, and overseeding to DIY save an average of $900 annually. Spreading those services correctly still delivers professional results.",
          "Using a lawn care calculator to plan service frequency prevents over-treating, which can damage grass and waste hundreds of dollars per year.",
        ],
      },
      {
        heading: "STAR Scenario: The Rodriguezes Cut Their Lawn Bill in Half",
        paragraphs: [
          "Situation: The Rodriguez family was spending $2,400/year on a full-service lawn contract for their 8,000 sq ft lawn.",
          "Task: Reduce costs without losing curb appeal before selling their home.",
          "Action: They kept professional aeration and weed treatment ($320/year), bought a self-propelled mower ($350 one-time), and followed a DIY fertilizing schedule from the lawn care calculator.",
          "Result: Annual lawn cost dropped to $1,050 — a 56% reduction. The lawn looked better because they mowed at the right height and frequency.",
        ],
      },
    ],
  },
  {
    slug: "diy-fence-installation-guide",
    title: "DIY Fence Installation: What It Really Costs and How to Do It Right",
    description: "Professional fence installation runs $20–$50 per linear foot. Learn the materials, tools, and process for installing your own fence and save 40–60%.",
    category: "Fencing",
    readTime: "11 min read",
    calculatorHref: "/fence-cost-calculator",
    calculatorLabel: "Calculate Fence Materials Cost",
    relatedSlugs: ["how-to-choose-roof-material", "when-to-diy-vs-hire-a-contractor"],
    sections: [
      {
        heading: "The Problem: Fence Quotes Are All Over the Map",
        paragraphs: [
          "A 150-foot privacy fence from a professional contractor runs $4,500–$9,000. Many homeowners get three quotes and still don't know if they're being overcharged for materials or labor.",
          "DIY installation of the same fence typically costs $1,500–$2,500 in materials — a 50–70% savings if you have two helpers and a weekend.",
        ],
      },
      {
        heading: "The Solution: Choose the Right Material and Plan Before You Buy",
        paragraphs: [
          "Wood privacy fence: $12–$20 per linear foot in materials. Requires painting/staining every 3–5 years but offers the most flexibility for style.",
          "Vinyl: $22–$30 per linear foot. No painting, minimal maintenance. More expensive upfront but lower lifetime cost.",
          "Chain link: $8–$14 per linear foot. Functional and durable, but limited privacy.",
          "A fence cost calculator accounts for linear footage, post spacing, gate openings, and material to give you an accurate materials budget before you step into a lumber yard.",
        ],
      },
      {
        heading: "The Benefit: Save $2,000–$5,000 in Labor",
        paragraphs: [
          "Professional fence installation labor runs $8–$20 per linear foot. For 200 feet of fencing, that's $1,600–$4,000 in labor alone.",
          "DIY installation with proper planning takes 1–2 weekends and requires only basic tools: post hole digger, level, drill, and saw.",
        ],
      },
      {
        heading: "STAR Scenario: Dave Saves $3,400 on a New Fence",
        paragraphs: [
          "Situation: Dave needed 180 feet of 6-foot privacy fence around his backyard. Contractor quotes ranged from $5,200 to $7,800.",
          "Task: Determine if DIY was realistic and estimate actual material costs.",
          "Action: He used a fence calculator to confirm he needed 180 linear feet of cedar planks, 24 posts, 3 gates, and hardware. Total material cost: $2,100. He rented a post-hole digger for $85/day.",
          "Result: Fence installed in two weekends. Total cost: $2,310. Savings: $3,400 vs. the lowest contractor quote.",
        ],
      },
    ],
  },
  {
    slug: "when-to-diy-vs-hire-a-contractor",
    title: "When to DIY vs. Hire a Contractor: A Practical Decision Guide",
    description: "Knowing which home projects you can handle yourself vs. when to call a pro can save thousands — and avoid costly mistakes that violate building codes.",
    category: "Home Improvement",
    readTime: "8 min read",
    calculatorHref: "/home-renovation-calculator",
    calculatorLabel: "Estimate Project Cost",
    relatedSlugs: ["diy-fence-installation-guide", "how-to-fix-a-leaking-faucet"],
    sections: [
      {
        heading: "The Problem: DIY Gone Wrong Is More Expensive Than Hiring Out",
        paragraphs: [
          "A botched electrical job that fails inspection or a structural wall incorrectly removed can cost 2–3× the original project price to fix. Insurance claims for DIY damage are frequently denied.",
          "The challenge is knowing which projects are genuinely doable and which require licensed professionals for safety and code compliance.",
        ],
      },
      {
        heading: "The Framework: Risk, Permits, and Skill Level",
        paragraphs: [
          "Always hire a licensed professional for: electrical panel work and new circuit installation, plumbing that moves drain/supply lines, structural changes (removing walls, adding beams), HVAC ductwork modification, gas line work.",
          "Safe DIY with basic skills: painting, basic drywall repair, trim installation, cabinet hardware, flooring installation, landscaping, fence installation, deck staining.",
          "The permit question matters — work done without required permits reduces home value and can force you to undo completed work at sale time.",
        ],
      },
      {
        heading: "The Benefit: Right-Sizing Saves Money Both Ways",
        paragraphs: [
          "Homeowners who hire out DIY-able projects overpay by an estimated $3,000–$8,000 per year. Those who DIY work requiring permits or licenses risk fines and redo costs that far exceed the saved labor.",
          "A practical rule: if the worst-case failure creates a safety hazard, liability, or structural damage, hire a licensed professional.",
        ],
      },
      {
        heading: "STAR Scenario: Lisa Avoids a $12,000 Mistake",
        paragraphs: [
          "Situation: Lisa wanted to convert her unfinished basement into a living space and watched videos showing how to add framing, drywall, and recessed lighting.",
          "Task: Decide what she could DIY and what needed contractors.",
          "Action: She hired an electrician for the recessed lighting and outlets ($1,800 with permits), DIY'd the framing and drywall ($900 in materials + 3 weekends), and hired a licensed contractor to add an egress window required by code ($2,200).",
          "Result: Total project cost: $4,900. A contractor quote for the full project was $14,500. She saved $9,600 while ensuring all work passed inspection and protected home resale value.",
        ],
      },
    ],
  },
  {
    slug: "how-to-create-a-raised-garden-bed",
    title: "How to Build a Raised Garden Bed: Complete Cost and Build Guide",
    description: "Raised beds grow more food in less space and are easier to maintain than in-ground gardens. Build one for under $150 with this step-by-step guide.",
    category: "Gardening",
    readTime: "9 min read",
    calculatorHref: "/garden-planting-calculator",
    calculatorLabel: "Plan Your Garden Layout",
    relatedSlugs: ["how-to-prepare-garden-for-spring", "best-plants-for-low-maintenance-gardens"],
    sections: [
      {
        heading: "The Problem: In-Ground Gardens Are Hard to Control",
        paragraphs: [
          "Most backyard soil is compacted, full of clay, rocks, or weed seeds. In-ground gardening in poor soil produces low yields and constant frustration — spending $100+ on amendments that wash away every season.",
          "Raised beds solve soil quality, drainage, and weed pressure in one project.",
        ],
      },
      {
        heading: "The Solution: Build a 4×8 Raised Bed for Under $150",
        paragraphs: [
          "Materials needed: two 2×10×8 cedar boards, two 2×10×4 cedar boards, four 4×4×12 corner posts, exterior screws, weed barrier fabric.",
          "Cedar is naturally rot-resistant and lasts 10–20 years without treatment. Avoid treated lumber if you're growing food.",
          "Fill formula: 60% topsoil, 30% compost, 10% coarse sand or perlite. A garden planting calculator helps you determine exact cubic feet needed.",
        ],
      },
      {
        heading: "The Benefit: 3× More Yield Per Square Foot Than In-Ground",
        paragraphs: [
          "Studies from UC Davis and Oregon State show raised beds produce up to 4× more yield per square foot than traditional row gardening — because you can plant densely, have no compacted walkways, and control soil quality.",
          "The initial investment of $80–$150 pays back in produce value within one growing season for most vegetable gardeners.",
        ],
      },
      {
        heading: "STAR Scenario: Tom Grows $600 Worth of Vegetables for $140",
        paragraphs: [
          "Situation: Tom had poor clay soil and a $200 gardening budget. Previous years of in-ground attempts produced minimal results.",
          "Task: Build a productive vegetable garden that didn't require expensive soil remediation.",
          "Action: He built one 4×8 raised bed for $95 in cedar lumber, filled it with a $45 soil mix, and used a planting calculator to maximize the space with tomatoes, peppers, lettuce, and basil.",
          "Result: First season yield valued at approximately $610 in grocery-store equivalent produce. ROI: 330% in year one.",
        ],
      },
    ],
  },
  {
    slug: "best-plants-for-low-maintenance-gardens",
    title: "Best Plants for Low Maintenance Gardens That Actually Look Good",
    description: "Not every garden needs constant attention. These 15 plants thrive with minimal water, pruning, and care — perfect for busy homeowners who want curb appeal without the work.",
    category: "Gardening",
    readTime: "7 min read",
    calculatorHref: "/garden-planting-calculator",
    calculatorLabel: "Plan Your Planting Layout",
    relatedSlugs: ["how-to-create-a-raised-garden-bed", "how-to-prepare-garden-for-spring"],
    sections: [
      {
        heading: "The Problem: High-Maintenance Plants Lead to Abandoned Gardens",
        paragraphs: [
          "Homeowners spend an average of $400–$800 on new plants each spring, only to watch half of them die by August due to drought, neglect, or poor plant selection for the climate.",
          "The solution is matching plant selection to your actual maintenance capacity — not your aspirational one.",
        ],
      },
      {
        heading: "Top 15 Low-Maintenance Plants by Zone",
        paragraphs: [
          "Perennial flowers (come back every year): Black-eyed Susan, Coneflower (Echinacea), Daylily, Russian Sage, Ornamental Grasses.",
          "Shrubs: Knockout Rose, Spirea, Viburnum, Boxwood, Hydrangea paniculata.",
          "Ground covers (replace lawn in shaded or sloped areas): Creeping Phlox, Liriope, Pachysandra, Sedum, Mondo Grass.",
          "Most require only one annual pruning, no fertilizing after establishment, and minimal watering once root systems are established (typically 1 full season).",
        ],
      },
      {
        heading: "The Benefit: Cut Garden Maintenance Time by 60%",
        paragraphs: [
          "A garden planted with 80% perennials and native shrubs requires an estimated 3–4 hours per month in summer versus 10–15 hours for annual-heavy beds.",
          "Perennials cost more per plant initially but eliminate annual replanting costs — typically saving $200–$500 per year by year three.",
        ],
      },
      {
        heading: "STAR Scenario: Nancy Transforms Her Garden Routine",
        paragraphs: [
          "Situation: Nancy spent 8 hours per week maintaining her annual flower beds during summer. She was tired and the garden looked ragged by July.",
          "Task: Redesign the front beds for curb appeal with under 2 hours of weekly maintenance.",
          "Action: She replaced annual beds with Knockout Roses, Coneflowers, and ornamental grasses. Used a planting calculator to determine spacing for 23 plants covering 240 sq ft.",
          "Result: Maintenance dropped to 90 minutes per week. Beds look better by August than they ever did with annuals. Annual plant cost: $0 after year one.",
        ],
      },
    ],
  },
  {
    slug: "how-to-winterize-your-home",
    title: "How to Winterize Your Home and Cut Heating Bills by Up to 30%",
    description: "Air sealing, insulation, and weatherstripping are the highest-ROI home improvements you can make. This guide shows exactly where to focus and what it costs.",
    category: "Home Improvement",
    readTime: "10 min read",
    calculatorHref: "/home-renovation-calculator",
    calculatorLabel: "Estimate Energy Upgrade Costs",
    relatedSlugs: ["when-to-diy-vs-hire-a-contractor", "how-to-fix-a-leaking-faucet"],
    sections: [
      {
        heading: "The Problem: Air Leaks Cost Homeowners $300–$600 Per Year",
        paragraphs: [
          "The EPA estimates that air sealing and insulation saves an average of 15% on heating and cooling costs — and in older homes, the savings can exceed 30%. Most of the money walks straight out through gaps around windows, doors, outlets, and attic hatches.",
          "The average American home has air leaks equivalent to a 2×2 foot hole in the wall.",
        ],
      },
      {
        heading: "Where to Focus: Highest ROI Winterization Projects",
        paragraphs: [
          "1. Attic air sealing and insulation: $500–$2,000 DIY, $1,500–$4,500 professional. Payback period: 2–4 years.",
          "2. Weatherstripping doors and windows: $50–$200 total. Immediate payback.",
          "3. Outlet and switch plate foam gaskets: $10–$30. One afternoon project.",
          "4. Basement rim joist insulation: $100–$400 DIY. Often overlooked but significant heat loss point.",
          "5. HVAC furnace filter and service: $100–$300. Keeps heating efficiency at rated levels.",
        ],
      },
      {
        heading: "The Benefit: $300–$900 Annual Energy Savings",
        paragraphs: [
          "A comprehensive weatherization project costing $800–$2,500 typically pays back in 2–4 years through reduced heating and cooling bills. The improvements also increase home comfort and reduce humidity problems.",
          "Many utility companies offer rebates of 20–50% on insulation and weatherization work — reducing your net cost significantly.",
        ],
      },
      {
        heading: "STAR Scenario: The Nguyens Save $480 Per Year",
        paragraphs: [
          "Situation: The Nguyens had a 1978 colonial with single-pane windows and minimal attic insulation. Their heating bill averaged $380/month in January and February.",
          "Task: Reduce heating costs without replacing all windows (quoted at $18,000).",
          "Action: They added attic insulation ($1,200 with a utility rebate of $400), weatherstripped all exterior doors ($90), and installed cellular shades on north-facing windows ($320).",
          "Result: First winter heating bills dropped 28%. Annual savings: approximately $480. Payback period: 2.5 years.",
        ],
      },
    ],
  },
  {
    slug: "how-to-paint-a-room-like-a-pro",
    title: "How to Paint a Room Like a Pro: Costs, Tools, and the Right Technique",
    description: "Professional painters charge $400–$1,000 per room. With the right prep and technique, you can achieve the same results for $80–$150 in materials.",
    category: "Home Improvement",
    readTime: "8 min read",
    calculatorHref: "/paint-calculator",
    calculatorLabel: "Calculate Paint Needed",
    relatedSlugs: ["how-to-patch-drywall-holes", "when-to-diy-vs-hire-a-contractor"],
    sections: [
      {
        heading: "The Problem: Most DIY Paint Jobs Look Amateurish",
        paragraphs: [
          "The biggest complaint about DIY painting is uneven coverage, visible roller marks, and missed prep work that causes peeling within 2 years. These issues almost always come from rushing the prep — not from lack of painting skill.",
          "Professional painters spend 60% of their time on prep. Most DIYers spend 10%.",
        ],
      },
      {
        heading: "The Solution: Proper Prep and the Right Materials",
        paragraphs: [
          "Materials for one standard room (12×12): 1–2 gallons quality paint ($35–$60/gallon), painter's tape, drop cloth, angled brush, 3/8 inch nap roller, paint tray.",
          "Use a paint calculator to determine exact gallons needed — buying too little forces a second store trip mid-project and risks mismatched batches.",
          "Prep steps that matter: fill holes with spackling, sand smooth, clean walls with TSP substitute, prime stain-blocked areas.",
        ],
      },
      {
        heading: "The Benefit: Save $300–$800 Per Room",
        paragraphs: [
          "Professional painting in most markets runs $2–$4 per square foot. A 12×12 room with 9-foot ceilings has roughly 490 sq ft of wall area — that's $980–$1,960 professionally done versus $80–$150 in DIY materials.",
          "A properly prepped DIY paint job done with quality paint lasts just as long as a professional one.",
        ],
      },
      {
        heading: "STAR Scenario: Jennifer Refreshes Five Rooms for $400",
        paragraphs: [
          "Situation: Jennifer wanted to refresh five rooms before selling her home. Painting quotes totaled $4,200.",
          "Task: Paint all five rooms herself without obvious DIY quality issues that would hurt the listing.",
          "Action: She used the paint calculator to buy exactly 9 gallons total (no waste), bought quality brushes and rollers, spent one day prepping (filling, taping, cleaning), and painted over two weekends.",
          "Result: Total materials cost: $410. A realtor commented the paint looked professionally done. The home sold for $7,000 over asking price.",
        ],
      },
    ],
  },
  {
    slug: "how-to-patch-drywall-holes",
    title: "How to Patch Drywall Holes Without Making the Wall Look Worse",
    description: "Small drywall damage turns into expensive repainting when it's rushed. Learn the right patch method for dents, nail pops, and larger holes so the repair blends in cleanly.",
    category: "Repairs & Fixes",
    readTime: "8 min read",
    calculatorHref: "/paint-calculator",
    calculatorLabel: "Estimate Patch and Paint Materials",
    relatedSlugs: ["how-to-paint-a-room-like-a-pro", "when-to-diy-vs-hire-a-contractor"],
    sections: [
      {
        heading: "The Problem: Rushed Drywall Repairs Stay Visible",
        paragraphs: [
          "Drywall repairs often fail because the patch method does not match the size of the damage. Overfilled compound creates a hump, weak backing causes cracks, and poor priming makes the patch flash through the final coat of paint.",
          "Hiring a pro for minor wall repairs often costs far more than the materials, especially when the job only needs a patch, sanding, primer, and touch-up paint.",
        ],
      },
      {
        heading: "The Solution: Match the Patch to the Hole",
        paragraphs: [
          "Use lightweight spackle for dents and nail pops, self-adhesive mesh for smaller holes, and a backer-supported drywall patch for larger openings. Work in thin coats, sand between coats, and always prime before painting.",
          "A basic repair kit only needs a utility knife, putty knife, sanding sponge, patch material, joint compound, primer, and paint.",
        ],
      },
      {
        heading: "The Benefit: A Clean Repair Protects the Whole Room Finish",
        paragraphs: [
          "A proper patch prevents a small wall blemish from turning into a full repaint or a visible defect during a home showing, inspection, or move-out walk-through.",
          "It also gives homeowners a fast, repeatable skill for handling everyday wear without paying a handyman each time.",
        ],
      },
      {
        heading: "STAR Scenario: Priya Fixed a Wall for Under $25",
        paragraphs: [
          "Situation: Priya had a 3-inch hole in a bedroom wall after a door handle hit the drywall.",
          "Task: Repair it before listing photos were taken, without paying a $225 handyman quote.",
          "Action: She cut the damaged area clean, installed a small backer, applied three thin coats of compound, sanded, primed, and repainted.",
          "Result: The finished wall looked smooth in natural light and the total material cost stayed under $25.",
        ],
      },
    ],
  },
  {
    slug: "kitchen-remodel-cost-guide",
    title: "Kitchen Remodel Cost Guide: What a Realistic Budget Looks Like",
    description: "Kitchen remodel budgets get wrecked by vague scope and hidden labor. Learn what drives cost before you request contractor bids or commit to a design.",
    category: "Cost & Budgeting",
    readTime: "10 min read",
    calculatorHref: "/home-renovation-calculator",
    calculatorLabel: "Build a Kitchen Budget",
    relatedSlugs: ["bathroom-renovation-cost-guide", "when-to-diy-vs-hire-a-contractor"],
    sections: [
      {
        heading: "The Problem: Kitchen Costs Balloon When Scope Is Undefined",
        paragraphs: [
          "Cabinets and countertops get most of the attention, but budgets are often blown by electrical upgrades, layout changes, flooring transitions, plumbing moves, appliance installation, and change orders.",
          "A project that starts as a cosmetic kitchen refresh can quickly turn into a much larger remodel once walls, lighting, or appliance locations change.",
        ],
      },
      {
        heading: "The Solution: Budget by System and Scope",
        paragraphs: [
          "Light kitchen refreshes often fall in the $8,000 to $18,000 range, mid-range remodels commonly land between $25,000 and $55,000, and higher-end projects with custom work climb fast beyond that.",
          "Break the budget into cabinets, counters, labor, flooring, appliances, electrical, plumbing, permits, and a 15% contingency so you can compare quotes clearly.",
        ],
      },
      {
        heading: "The Benefit: Better Budgeting Creates Better Contractor Conversations",
        paragraphs: [
          "When you already understand the big cost buckets, it becomes much easier to spot missing allowances, suspiciously low bids, and upgrades that add expense without improving daily use.",
          "That clarity also helps you decide what is worth keeping, moving, or simplifying before demo starts.",
        ],
      },
      {
        heading: "STAR Scenario: The Parkers Avoided a Low-Bid Trap",
        paragraphs: [
          "Situation: The Parkers were drawn to a low kitchen quote that seemed to save them thousands.",
          "Task: Verify whether the number was realistic before signing.",
          "Action: They used a renovation calculator and discovered the quote excluded electrical work, backsplash labor, and demolition haul-away.",
          "Result: They chose a fuller proposal that fit their real budget and avoided expensive surprises mid-project.",
        ],
      },
    ],
  },
  {
    slug: "bathroom-renovation-cost-guide",
    title: "Bathroom Renovation Cost Guide: Where the Money Goes and Where You Can Save",
    description: "Bathrooms are compact but expensive because tile labor, waterproofing, and plumbing details add up fast. Use this guide to set a realistic budget before demo begins.",
    category: "Cost & Budgeting",
    readTime: "9 min read",
    calculatorHref: "/home-renovation-calculator",
    calculatorLabel: "Estimate Bathroom Renovation Cost",
    relatedSlugs: ["kitchen-remodel-cost-guide", "when-to-diy-vs-hire-a-contractor"],
    sections: [
      {
        heading: "The Problem: Small Rooms Hide Expensive Complexity",
        paragraphs: [
          "Bathrooms look simple on paper, but labor-heavy tile work, ventilation, waterproofing, plumbing rough-ins, and electrical code requirements make them one of the easiest spaces to underestimate.",
          "Hidden subfloor damage and old plumbing are also common once the walls or tub surround are opened up.",
        ],
      },
      {
        heading: "The Solution: Protect Layout and Prioritize Waterproofing",
        paragraphs: [
          "Cosmetic bathroom refreshes often start around $6,000 to $15,000, while full gut renovations with shower rebuilds, layout changes, and tile work can move well beyond that range.",
          "One of the simplest ways to control budget is to keep the toilet, tub, and vanity in the same place whenever possible.",
        ],
      },
      {
        heading: "The Benefit: You Save Money Without Cutting the Wrong Corners",
        paragraphs: [
          "It is usually smarter to simplify finishes than to underfund waterproofing, ventilation, or plumbing repairs. Those are the parts that protect the room long after the design trends change.",
          "A structured budget helps you save where changes are easy and spend where failure is expensive.",
        ],
      },
      {
        heading: "STAR Scenario: Elena Saved $7,000 by Keeping the Layout Intact",
        paragraphs: [
          "Situation: Elena wanted a brighter bathroom but was overwhelmed by quotes ranging from affordable to extreme.",
          "Task: Lower cost without ending up with a fragile remodel.",
          "Action: She kept plumbing locations fixed, simplified glass selections, and used large-format tile to reduce labor time.",
          "Result: The project stayed within budget while preserving the upgrades that mattered most for durability.",
        ],
      },
    ],
  },
  {
    slug: "how-to-lower-your-electric-bill-at-home",
    title: "How to Lower Your Electric Bill at Home Without a Full Remodel",
    description: "Most utility savings come from fixing recurring waste, not chasing the flashiest upgrade first. Start with the changes that reduce energy use fastest and cheapest.",
    category: "Energy & Efficiency",
    readTime: "8 min read",
    calculatorHref: "/home-renovation-calculator",
    calculatorLabel: "Estimate Upgrade Costs",
    relatedSlugs: ["how-to-winterize-your-home", "best-home-upgrades-that-add-value"],
    sections: [
      {
        heading: "The Problem: Energy Bills Usually Rise for the Same Few Reasons",
        paragraphs: [
          "Leaky air sealing, poor insulation, inefficient lighting, neglected HVAC maintenance, and peak-hour habits are behind many high electric bills. The problem is often cumulative rather than dramatic.",
          "Homeowners often jump to major upgrades before tightening the basic systems that waste money every month.",
        ],
      },
      {
        heading: "The Solution: Cut Load Before Buying Bigger Equipment",
        paragraphs: [
          "Start with air sealing, insulation improvements, thermostat programming, LED swaps, maintenance, and duct sealing. Then evaluate larger upgrades like appliances, heat pumps, or solar with better baseline data.",
          "Looking at a full year of bills helps you tell the difference between a seasonal comfort issue and a year-round efficiency issue.",
        ],
      },
      {
        heading: "The Benefit: Small Fixes Stack Into Predictable Savings",
        paragraphs: [
          "A set of modest efficiency improvements can reduce monthly bills meaningfully without the financing or disruption of a full remodel.",
          "They also improve comfort, which makes the payoff easier to feel than a line item on a utility bill alone.",
        ],
      },
      {
        heading: "STAR Scenario: Devin Cut Summer Bills by 22%",
        paragraphs: [
          "Situation: Devin's cooling bills climbed every summer in a house with attic leaks and inconsistent thermostat settings.",
          "Task: Reduce monthly costs without replacing the HVAC system.",
          "Action: He sealed gaps, added weatherstripping, installed a smart thermostat, cleaned equipment, and swapped the most-used bulbs to LED.",
          "Result: Summer bills dropped noticeably and the hottest rooms felt more stable during heat waves.",
        ],
      },
    ],
  },
  {
    slug: "spring-garden-checklist",
    title: "Spring Garden Checklist: What to Do First for a Strong Growing Season",
    description: "Spring success comes from preparation, not impulse buying. Use this checklist to prep beds, improve soil, and avoid wasting money on plants that are not set up to thrive.",
    category: "Seasonal Gardening",
    readTime: "7 min read",
    calculatorHref: "/garden-planting-calculator",
    calculatorLabel: "Plan Spring Planting",
    relatedSlugs: ["how-to-prepare-garden-for-spring", "how-to-create-a-raised-garden-bed"],
    sections: [
      {
        heading: "The Problem: Spring Excitement Can Outrun Bed Readiness",
        paragraphs: [
          "Many gardeners shop before checking frost timing, soil temperature, drainage, or available sun. That leads to weak starts, disappointing yields, and unnecessary replacement costs.",
          "The first nice weekend of the year is not always the right planting weekend.",
        ],
      },
      {
        heading: "The Solution: Prep the Site Before Buying Plants",
        paragraphs: [
          "Clear debris, test the soil, add compost, inspect irrigation, sharpen tools, and map spacing before you purchase seeds or transplants. Then choose plants that fit your zone and the current part of the season.",
          "A simple checklist keeps you focused on prep tasks that are easy to skip but expensive to ignore.",
        ],
      },
      {
        heading: "The Benefit: Stronger Establishment and Fewer Replacement Trips",
        paragraphs: [
          "Beds that start with healthier soil and better spacing settle in faster and need less correction by early summer.",
          "That saves money, but it also makes the season feel easier and more predictable.",
        ],
      },
      {
        heading: "STAR Scenario: Prep Saved the Wilsons Most of Their Plant Budget",
        paragraphs: [
          "Situation: The Wilsons usually bought spring plants twice because the first round struggled.",
          "Task: Improve outcomes without spending more.",
          "Action: They delayed planting until conditions were right, improved soil, and planned bed spacing before visiting the garden center.",
          "Result: Replacement spending dropped and the beds filled in more evenly by summer.",
        ],
      },
    ],
  },
  {
    slug: "summer-lawn-care-calendar",
    title: "Summer Lawn Care Calendar: What Your Lawn Actually Needs Each Month",
    description: "Most summer lawn damage comes from timing mistakes. Follow a simple month-by-month routine instead of mowing too short, watering too often, or forcing growth in peak heat.",
    category: "Seasonal Gardening",
    readTime: "8 min read",
    calculatorHref: "/lawn-care-calculator",
    calculatorLabel: "Estimate Lawn Care Costs",
    relatedSlugs: ["how-to-save-on-lawn-care-costs", "best-plants-for-low-maintenance-gardens"],
    sections: [
      {
        heading: "The Problem: Heat Stress Makes Every Lawn Mistake More Visible",
        paragraphs: [
          "Short mowing, shallow watering, dull blades, and over-fertilizing all hit harder in summer. Symptoms show up quickly, but the wrong response often makes them worse.",
          "That is why lawn care in hot weather needs a calendar, not guesswork.",
        ],
      },
      {
        heading: "The Solution: Use a Month-by-Month Summer Routine",
        paragraphs: [
          "Raise mowing height at the start of summer, water deeply before sunrise, avoid aggressive fertilizing in peak heat, and save major recovery work for late summer into fall.",
          "A simple seasonal routine helps you spend less on products while giving the grass what it actually needs.",
        ],
      },
      {
        heading: "The Benefit: Healthier Turf With Less Water and Waste",
        paragraphs: [
          "Following the right schedule improves root depth, reduces stress, and lowers the urge to throw more fertilizer or weed treatment at every patch of discoloration.",
          "That usually means better turf quality and lower summer maintenance costs.",
        ],
      },
      {
        heading: "STAR Scenario: One Routine Change Helped a Stressed Lawn Recover",
        paragraphs: [
          "Situation: A family kept watering every evening and mowing low to keep the lawn neat.",
          "Task: Stop brown patches from spreading without paying for a full treatment plan.",
          "Action: They switched to deeper morning watering, raised mowing height, and stopped pushing fertilizer in hot weather.",
          "Result: The lawn stayed more stable through summer and needed fewer corrective treatments later.",
        ],
      },
    ],
  },
  {
    slug: "mulch-vs-gravel-for-landscaping",
    title: "Mulch vs. Gravel for Landscaping: Which One Saves More Work and Money?",
    description: "Mulch and gravel are both useful, but they solve different problems. Use this comparison to choose the right material for planting beds, paths, drainage areas, and low-maintenance yards.",
    category: "Landscaping & Design",
    readTime: "8 min read",
    calculatorHref: "/garden-planting-calculator",
    calculatorLabel: "Plan Bed Coverage",
    relatedSlugs: ["best-plants-for-low-maintenance-gardens", "best-home-upgrades-that-add-value"],
    sections: [
      {
        heading: "The Problem: The Wrong Ground Cover Creates More Maintenance",
        paragraphs: [
          "Mulch can wash away or need refreshing, while gravel can migrate, trap debris, and make planting adjustments harder. Choosing only by looks usually creates extra work later.",
          "Different parts of a yard need different surface materials if you want the result to stay practical.",
        ],
      },
      {
        heading: "The Solution: Match the Material to the Use Case",
        paragraphs: [
          "Organic mulch is usually the better choice for planting beds because it improves soil and helps regulate moisture. Gravel works better in drainage zones, paths, xeriscape areas, and places where decomposition is not helpful.",
          "The best landscapes often use both materials, just in different places and for different reasons.",
        ],
      },
      {
        heading: "The Benefit: Better Choices Mean Less Rework and Cleaner Curb Appeal",
        paragraphs: [
          "Choosing the right surface helps reduce weeds, protect moisture, and keep maintenance predictable rather than annoying.",
          "It also improves the visual consistency of the yard, which matters if resale or curb appeal is part of the goal.",
        ],
      },
      {
        heading: "STAR Scenario: A Mixed-Material Plan Solved Two Problems at Once",
        paragraphs: [
          "Situation: A homeowner wanted cleaner planting beds and a side-yard path that stopped getting muddy.",
          "Task: Reduce maintenance without making the planted areas harder to manage.",
          "Action: They used mulch in shrub beds and gravel only along the drainage-prone side path with edging.",
          "Result: The beds stayed healthier, the path drained better, and upkeep became easier instead of more complicated.",
        ],
      },
    ],
  },
  {
    slug: "best-home-upgrades-that-add-value",
    title: "Best Home Upgrades That Add Value Without Over-Improving the House",
    description: "The most valuable upgrades improve how a house functions, feels, and shows to buyers. Focus on the improvements that support comfort, efficiency, and curb appeal before luxury extras.",
    category: "Home Value & ROI",
    readTime: "9 min read",
    calculatorHref: "/home-renovation-calculator",
    calculatorLabel: "Estimate Upgrade Budgets",
    relatedSlugs: ["kitchen-remodel-cost-guide", "how-to-choose-roof-material"],
    sections: [
      {
        heading: "The Problem: Expensive Does Not Automatically Mean Valuable",
        paragraphs: [
          "Homeowners often assume the biggest remodel creates the biggest return, but practical improvements like roofing, paint, insulation, lighting, flooring updates, and landscaping often do more for both daily life and resale confidence.",
          "Over-improving for the neighborhood can make a project harder to recover financially.",
        ],
      },
      {
        heading: "The Solution: Prioritize Function, Condition, and Buyer Confidence",
        paragraphs: [
          "Start with maintenance and curb appeal, then layer in energy savings and layout improvements that make the home easier to live in. Kitchens and baths matter, but only when the scope fits the market and the rest of the house is not being ignored.",
          "A value-first plan usually works from the outside in rather than starting with the flashiest room.",
        ],
      },
      {
        heading: "The Benefit: Smarter Upgrades Pay Off Now and Later",
        paragraphs: [
          "When upgrades solve real problems, the house becomes more comfortable immediately and easier to sell later. That dual return is why value-focused improvements outperform trend-driven spending.",
          "It also protects you from sinking money into finishes while bigger condition issues remain visible.",
        ],
      },
      {
        heading: "STAR Scenario: Practical Upgrades Beat a Flashy Remodel",
        paragraphs: [
          "Situation: A couple had a fixed budget and were tempted by one dramatic remodel.",
          "Task: Improve resale appeal without overspending for their area.",
          "Action: They repaired exterior issues, repainted key spaces, improved lighting, refreshed landscaping, and added insulation instead of choosing a luxury kitchen package.",
          "Result: The home showed better, operated more efficiently, and used the budget more effectively across the whole property.",
        ],
      },
    ],
  },
];

export const guidesBySlug: Record<string, GuideArticle> = Object.fromEntries(
  guideArticles.map((g) => [g.slug, g])
);
