export interface EducationalContentCard {
  title: string;
  description: string;
  bullets: string[];
}

export interface EducationalContentEntry {
  eyebrow: string;
  heading: string;
  intro: string;
  cards: EducationalContentCard[];
}

export const homeEducationContent: EducationalContentEntry = {
  eyebrow: "Learn before you spend",
  heading: "Smart homeowners understand costs before picking up the phone",
  intro:
    "Every home and garden project has hidden costs, better alternatives, and common mistakes that turn a $500 job into a $3,000 problem. Our tools pair calculators with plain-English education so you can make confident decisions before committing to any project.",
  cards: [
    {
      title: "What Gardens helps you understand",
      description:
        "Gardens pairs cost calculators with real-world guidance — so you know what a roof costs before getting a quote, how much paint to buy before you shop, and what lawn care you can DIY before signing a contract.",
      bullets: [
        "Material choices affect long-term cost more than any single contractor quote.",
        "Project scope and timing can save thousands when planned correctly.",
        "The right tool for the job matters — and the right information matters even more.",
      ],
    },
    {
      title: "Mistakes that cost homeowners money",
      description:
        "Without accurate cost benchmarks, homeowners routinely overpay for labor, buy the wrong materials, and skip prep steps that cause projects to fail early.",
      bullets: [
        "Getting only one quote means paying 20–40% more than necessary.",
        "Choosing materials by price alone often leads to early replacement and higher total cost.",
        "Skipping permits or hiring unlicensed workers can void homeowner's insurance and reduce resale value.",
      ],
    },
  ],
};

export const homeImprovementEducationContent: EducationalContentEntry = {
  eyebrow: "Home improvement basics",
  heading: "Understanding project scope and costs before work begins saves real money",
  intro:
    "Home improvement decisions are often made under pressure — a leaking roof, a broken HVAC, a growing family. Better decisions come from understanding material options, realistic cost ranges, and which work genuinely requires licensed professionals.",
  cards: [
    {
      title: "What homeowners should understand first",
      description:
        "Before starting any project, it helps to understand the scope of work, permit requirements, and the true cost difference between DIY and professional installation.",
      bullets: [
        "Permits protect your home's resale value and your insurance coverage.",
        "Material quality affects long-term performance more than brand name or appearance.",
        "Labor costs vary significantly by region — getting local estimates is essential.",
      ],
    },
    {
      title: "What goes wrong without planning",
      description:
        "Projects that start without accurate budgets run over cost. Jobs started without permits create legal and resale headaches. Work done out of season or in poor weather fails faster.",
      bullets: [
        "Scope creep is the leading cause of renovation budget overruns.",
        "Hiring the lowest bidder without checking references costs more in corrections.",
        "Starting exterior projects too late in fall or too early in spring reduces material performance.",
      ],
    },
  ],
};

export const gardenEducationContent: EducationalContentEntry = {
  eyebrow: "Gardening basics",
  heading: "Successful gardens start with understanding soil, spacing, and seasonality",
  intro:
    "Gardening failures are almost always preventable — they come from poor soil prep, incorrect plant spacing, or wrong plant selection for the climate. Understanding the fundamentals before planting season saves money and frustration.",
  cards: [
    {
      title: "What every gardener should know first",
      description:
        "Before buying plants or seeds, understanding soil health, sun requirements, and planting zones eliminates the guesswork that kills gardens before they start.",
      bullets: [
        "Soil pH affects nutrient availability more than fertilizer choices.",
        "Sun mapping — tracking light patterns for 2 days — prevents planting shade plants in full sun.",
        "Knowing your USDA hardiness zone determines which plants survive your winters.",
      ],
    },
    {
      title: "Why gardens fail without the right plan",
      description:
        "Most garden disappointments come from over-planting small spaces, choosing plants that don't suit the climate, or skipping soil prep in favor of jumping straight to planting.",
      bullets: [
        "Overcrowded plants compete for nutrients and create disease pressure.",
        "Annuals that look good in April often fail in July heat without proper selection.",
        "Skipping compost amendment is the single most common cause of poor yield.",
      ],
    },
  ],
};

export const exteriorEducationContent: EducationalContentEntry = {
  eyebrow: "Exterior and curb appeal",
  heading: "The right exterior upgrades add more home value than almost any interior renovation",
  intro:
    "Roofing, fencing, painting, and landscaping are the highest-ROI home improvements for resale value and curb appeal. Understanding material choices and maintenance requirements helps homeowners invest wisely in their home's exterior.",
  cards: [
    {
      title: "Where exterior dollars go furthest",
      description:
        "REMODELING Magazine's annual Cost vs. Value report consistently shows exterior projects — garage doors, siding, entry doors, and decks — return 60–90% of cost at resale, often outperforming kitchen and bath remodels.",
      bullets: [
        "A new garage door returns 93–102% of cost on average at resale.",
        "Fresh exterior paint returns $2–$5 for every $1 spent when selling.",
        "Landscaping improvements return 100–200% of cost at resale for well-maintained properties.",
      ],
    },
    {
      title: "Common exterior mistakes to avoid",
      description:
        "Exterior projects done poorly are more visible and harder to hide than interior work. Poor material selection, incorrect installation, or deferred maintenance turn curb appeal into a liability.",
      bullets: [
        "Choosing paint or stain without proper surface prep leads to peeling within 2 years.",
        "Installing fence without checking property lines or HOA rules creates legal issues.",
        "Using pressure-treated wood for vegetable garden beds introduces chemical concerns.",
      ],
    },
  ],
};

export const roofCostEducationContent: EducationalContentEntry = {
  eyebrow: "Roof cost guide",
  heading: "A roof replacement is one of the largest home investments — understanding your options saves thousands",
  intro:
    "The material you choose, the timing of replacement, and the contractor you hire all significantly affect what you pay and how long the result lasts. This calculator helps you benchmark costs before getting contractor quotes.",
  cards: [
    {
      title: "What the roof cost calculator helps clarify",
      description:
        "The calculator shows estimated costs by material type and roof size so you can compare options and identify whether contractor quotes are in a reasonable range.",
      bullets: [
        "Material alone can vary from $90 to $1,000+ per roofing square depending on type.",
        "Roof pitch multiplies material needs — steeper roofs cost 20–40% more to install.",
        "Old roof removal adds $50+ per square — often worth asking contractors to itemize separately.",
      ],
    },
    {
      title: "What homeowners miss in roofing decisions",
      description:
        "Focusing only on the lowest quote often means choosing the lowest-grade material or skipping ice-and-water shield underlayment that prevents costly interior water damage.",
      bullets: [
        "Manufacturer warranties often require specific installation practices — ask if the crew is certified.",
        "Ventilation issues shorten any roof's life significantly — verify soffit and ridge vents are adequate.",
        "Insurance claims after hail damage may cover upgrades in material quality — always ask your adjuster.",
      ],
    },
  ],
};

export const paintEducationContent: EducationalContentEntry = {
  eyebrow: "Paint buying guide",
  heading: "Buying the right amount of paint is the first step toward a professional result",
  intro:
    "Too little paint forces you to buy a second batch that may not match the original. Too much wastes $30–$60 per extra gallon. The paint calculator gives you an exact target before you shop.",
  cards: [
    {
      title: "What the paint calculator helps you understand",
      description:
        "The calculator accounts for wall area, door and window deductions, number of coats, and coverage rate so you leave the store with exactly what you need.",
      bullets: [
        "Coverage rates vary by paint type — flat paints cover more per gallon than semi-gloss.",
        "Dark colors and dramatic color changes require more coats than same-shade touch-ups.",
        "Adding 10% waste factor prevents falling short mid-wall on a large room.",
      ],
    },
    {
      title: "Paint quality decisions that matter",
      description:
        "Cheap paint costs more over time — it requires more coats, fades faster, and doesn't clean without removing the finish. Buying better quality paint saves money and time.",
      bullets: [
        "Premium paint ($50–$70/gallon) typically covers 10–15% more area per gallon than budget paint.",
        "Washable finishes (eggshell, satin) are worth the premium for kitchens, baths, and kids' rooms.",
        "The right primer cuts total paint consumption by 20–30% on previously unpainted surfaces.",
      ],
    },
  ],
};

export const lawnCareEducationContent: EducationalContentEntry = {
  eyebrow: "Lawn care fundamentals",
  heading: "Understanding when and why to apply lawn treatments prevents costly over-treatment and under-treatment",
  intro:
    "Lawn care is a schedule-driven discipline — applying fertilizer at the wrong time, mowing too short, or watering incorrectly causes the same visible damage as neglect. The lawn care calculator helps plan services against your lawn size and real costs.",
  cards: [
    {
      title: "What makes a lawn care plan effective",
      description:
        "The best lawn care programs are based on grass type, soil condition, and seasonal timing — not just whatever a service company offers as a default annual package.",
      bullets: [
        "Cool-season grasses (fescue, bluegrass) need fall fertilizing — not spring.",
        "Mowing height is more important than mowing frequency for lawn health.",
        "Aeration is only worth doing on compacted soil — testing with a screwdriver saves the cost on healthy lawns.",
      ],
    },
    {
      title: "Why lawn care programs often waste money",
      description:
        "Pre-packaged lawn service contracts include treatments your lawn may not need and apply them on fixed schedules that ignore weather, growth, and actual soil conditions.",
      bullets: [
        "Over-fertilizing causes excessive growth that requires more mowing and creates thatch buildup.",
        "Applying weed control after weeds have set seed is too late — timing matters.",
        "Watering too often with shallow water trains shallow roots that die in drought.",
      ],
    },
  ],
};

export const fenceCostEducationContent: EducationalContentEntry = {
  eyebrow: "Fence planning guide",
  heading: "Accurate fence cost estimates prevent budget surprises when you're mid-project",
  intro:
    "Fence costs depend on material, height, linear footage, terrain, and gates. This calculator gives you a realistic material and labor baseline before you call a single contractor.",
  cards: [
    {
      title: "What drives fence cost",
      description:
        "The calculator shows why material choice matters as much as size — a vinyl fence can cost 2× a wood fence upfront but requires almost no maintenance for 25+ years.",
      bullets: [
        "Post spacing affects material quantities significantly — standard is 6–8 ft on center.",
        "Gate openings require extra hardware and framing that adds $100–$300 per gate.",
        "Sloped terrain requires step-down or raked panels that increase labor cost 15–30%.",
      ],
    },
    {
      title: "What homeowners overlook when estimating fence costs",
      description:
        "Most cost overruns come from surprises discovered mid-installation: underground utilities, rocky soil, incorrect property line measurements, or HOA requirement conflicts.",
      bullets: [
        "Call 811 before digging any post holes — utility strikes are dangerous and costly.",
        "Check your property survey before marking fence lines — neighbor disputes are expensive.",
        "HOA approval for fence style and height should be confirmed before purchasing materials.",
      ],
    },
  ],
};

export const gardenPlantingEducationContent: EducationalContentEntry = {
  eyebrow: "Planting planning guide",
  heading: "The right plant spacing is the most important decision in garden design",
  intro:
    "Overcrowded plants compete for nutrients and light, creating weak growth and disease pressure. Too much spacing wastes productive bed area and lets weeds establish. The planting calculator finds the right balance for your specific plants and bed size.",
  cards: [
    {
      title: "What the planting calculator shows",
      description:
        "The calculator determines how many plants fit your bed dimensions at proper spacing, how much soil you need to fill raised beds, and the estimated total cost before you shop.",
      bullets: [
        "Square-foot gardening spacing differs from traditional row spacing by 40–60%.",
        "Soil volume calculations prevent under-filling raised beds — settling reduces depth by 15–20%.",
        "Plant cost estimates help you decide whether to start from seed or buy transplants.",
      ],
    },
    {
      title: "Planning mistakes that reduce garden yield",
      description:
        "Most first-time gardeners plant too close together, use insufficient soil depth, and put the wrong plants in available sun conditions — all preventable with basic planning.",
      bullets: [
        "Tomatoes planted less than 24 inches apart produce significantly less per plant.",
        "Raised beds need a minimum of 6 inches of quality soil — most need 12 inches for root vegetables.",
        "Shade mapping before planting prevents wasted investment on sun-loving plants in low-light areas.",
      ],
    },
  ],
};

export const renovationEducationContent: EducationalContentEntry = {
  eyebrow: "Renovation planning",
  heading: "Accurate renovation budgets include contingency, scope, and sequence — not just material cost",
  intro:
    "Home renovation projects run over budget 75% of the time. The primary reasons are underestimating scope, ignoring hidden conditions, and skipping the contingency buffer. This calculator helps you build a realistic starting estimate.",
  cards: [
    {
      title: "What the renovation calculator helps establish",
      description:
        "The calculator provides realistic cost ranges by room type and renovation scope, plus a contingency recommendation, so you enter contractor conversations with a benchmarked budget.",
      bullets: [
        "Cosmetic, mid-range, and full renovations have very different cost profiles for the same room.",
        "A 15–20% contingency is standard practice — unexpected conditions are common in older homes.",
        "Financing costs are part of the real project cost — the calculator shows monthly payments to help plan cash flow.",
      ],
    },
    {
      title: "Why renovation budgets fail without proper planning",
      description:
        "Homeowners who enter renovation projects with only a rough number in mind frequently face 30–50% budget overruns when hidden conditions, material delays, or scope changes emerge.",
      bullets: [
        "Opening walls in older homes commonly reveals plumbing, electrical, or mold issues not visible at quote time.",
        "Material cost volatility means prices quoted in winter may differ significantly from spring start dates.",
        "Sequencing mistakes — like tiling before plumbing rough-in is done — create expensive redo costs.",
      ],
    },
  ],
};

export const contactEducationContent: EducationalContentEntry = {
  eyebrow: "Support and trust",
  heading: "Clear support matters when you are planning a significant home investment",
  intro:
    "Home and garden projects involve real money and real risk. Questions about how to use our calculators, interpret results, or find local resources are always welcome.",
  cards: [
    {
      title: "Why users reach out",
      description:
        "Homeowners contact us when planning large projects, comparing contractor quotes, or trying to understand whether a calculator result is in the right range for their area.",
      bullets: [
        "Regional cost variations can make national averages misleading — we can help contextualize results.",
        "Feedback helps improve calculator accuracy and guide content for future visitors.",
        "Partnership and content correction requests help keep Gardens useful and credible.",
      ],
    },
    {
      title: "How better information helps",
      description:
        "When users can ask questions and verify results, they are more likely to catch planning errors before committing money — which is exactly what this platform is designed to enable.",
      bullets: [
        "Good communication helps surface missing topics and confusing areas in our tools.",
        "Trust grows when educational tools are transparent, reachable, and open to improvement.",
        "Users who verify estimates before hiring contractors avoid the most common overpayment scenarios.",
      ],
    },
  ],
};

export const guidesEducationContent: EducationalContentEntry = {
  eyebrow: "Learning before acting",
  heading: "Home and garden guides are most useful when they connect the concept to a real project decision",
  intro:
    "A good guide should do more than explain a technique. It should help you understand why the approach works, what goes wrong without it, and how to estimate the real cost of the choice you're making.",
  cards: [
    {
      title: "What the guides are designed to do",
      description:
        "Gardens guides are written to make home improvement and gardening topics accessible without glossing over the practical details that determine success or failure.",
      bullets: [
        "Each guide pairs a plain-English explanation with a relevant calculator or cost tool.",
        "Topics focus on real decisions: when to DIY, what materials to use, and how to avoid common mistakes.",
        "Readers can move from understanding to their own project numbers without leaving the learning flow.",
      ],
    },
    {
      title: "Why home improvement knowledge changes outcomes",
      description:
        "Homeowners who understand the scope of work before talking to contractors are dramatically less likely to be overcharged, miss important details, or make decisions they later regret.",
      bullets: [
        "Education reduces guesswork and helps you compare contractor quotes intelligently.",
        "Understanding scope makes it easier to spot unrealistic timelines or suspicious bids.",
        "Conceptual clarity helps you ask the right questions before work begins.",
      ],
    },
  ],
};

export const articleTrustContent = {
  eyebrow: "Using this guide responsibly",
  heading: "How to use a home and garden guide effectively",
  intro:
    "Guide pages explain concepts and provide realistic cost ranges, but local conditions, material prices, and labor costs vary. Always verify estimates with local contractors before committing to a project budget.",
  cards: [
    {
      title: "Estimates are starting points, not final quotes",
      description:
        "Calculator outputs and guide cost ranges give you a realistic benchmark — but local labor rates, permit fees, and current material prices affect your actual project cost.",
      bullets: [
        "Get 3 contractor quotes for any project over $2,000.",
        "Verify material costs at your local supplier before finalizing a budget.",
        "Check your local building department for permit requirements before starting work.",
      ],
    },
    {
      title: "Pair reading with your own numbers",
      description:
        "The best use of these guides is to build context, then use the calculators to plug in your own measurements and get a realistic starting estimate.",
      bullets: [
        "Use the planting calculator to size your garden before buying plants.",
        "Use the roof cost calculator before getting contractor quotes so you can spot outliers.",
        "Use the paint calculator to buy the right amount — not too little or too much.",
      ],
    },
  ],
};
