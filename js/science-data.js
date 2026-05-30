/*
 * science-data.js
 * ------------------------------------------------------------------
 * The researched, cited nutrition rationale behind this cookbook.
 * Rendered in the "Why This Works" tab. Claims are numbered and map
 * to the references array at the bottom.
 */

window.SCIENCE = {
  intro:
    "This cookbook is built on one rule — 70 g of protein and low sugar per meal — " +
    "but that rule isn't arbitrary. It comes from a fairly consistent body of nutrition " +
    "and longevity research on protein, muscle, metabolic health, and healthy aging. " +
    "Here's the evidence, in plain language, with sources you can check.",

  sections: [
    {
      heading: "1. Protein is the macronutrient most of us under-eat",
      body: [
        "The official RDA for protein is 0.8 g per kg of body weight per day — but that's the amount " +
          "set to prevent deficiency in the average sedentary person, not the amount that optimizes " +
          "muscle, strength, body composition, or healthy aging. [1]",
        "The largest meta-analysis on the topic (Morton et al., 49 studies, 1,863 people) found that " +
          "protein intakes up to ~1.6 g/kg/day produced progressively greater gains in lean mass with " +
          "resistance training, with some individuals benefiting up to ~2.2 g/kg/day. For a 70 kg adult " +
          "that's roughly 112–154 g of protein per day. [2]",
        "Spread across three main meals, that lands right around 50–70 g per meal — which is exactly " +
          "what these recipes deliver. Importantly, the same research shows that evenly distributing " +
          "protein across the day beats back-loading it all at dinner. [2][4]"
      ]
    },
    {
      heading: "2. Each meal needs enough protein to actually trigger muscle building",
      body: [
        "Muscle protein synthesis (MPS) — the process that maintains and builds muscle — works like a " +
          "pulse, not a steady drip. A meal raises it for ~2–3 hours, then it fades even if amino acids " +
          "are still in the blood. To get a strong pulse, a meal needs to clear a 'leucine threshold' of " +
          "roughly 2–3 g of leucine, which corresponds to about 0.4 g of protein per kg of body weight " +
          "in a single sitting. [3][4]",
        "For a larger or older adult, ~0.4 g/kg can mean 30–40 g of protein per meal just to maximize " +
          "the response — and older muscle is 'anabolically resistant,' meaning it needs even more " +
          "protein per meal than young muscle to get the same effect. A 70 g protein meal comfortably " +
          "clears that threshold for almost everyone. [3][5]"
      ]
    },
    {
      heading: "3. Protein, muscle, and longevity (with the nuance)",
      body: [
        "After about age 30 we lose muscle steadily — a process called sarcopenia — and low muscle mass " +
          "in older age predicts frailty, falls, loss of independence, and higher mortality. Expert " +
          "groups (PROT-AGE, ESPEN) now recommend older adults eat 1.0–1.2 g/kg/day, and 1.2–1.5 g/kg or " +
          "more if they're ill or have sarcopenia — well above the standard RDA. [5][6]",
        "There's a genuine scientific debate worth being honest about: in middle age (50–65), one " +
          "influential study (Levine/Longo) linked very high animal-protein intake to higher mortality, " +
          "via growth pathways like IGF-1 and mTOR — but in the same study, adults over 65 with higher " +
          "protein intake had LOWER mortality. The harms were also attenuated when protein came from " +
          "plant sources. [7]",
        "How this cookbook threads that needle: it hits a protein target high enough to protect muscle " +
          "and support healthy aging, leans on high-quality and varied sources (including several " +
          "plant-forward meals), pairs protein with fiber and vegetables rather than refined carbs, and " +
          "keeps total calories sane. Protein per meal is a tool — match your overall daily intake to " +
          "your age, size, activity, and goals."
      ]
    },
    {
      heading: "4. Why 'very low sugar' is the second half of the rule",
      body: [
        "Added sugar is one of the most consistently harmful things in the modern diet. In large cohort " +
          "studies, people eating ~25% of calories from added sugar had about 2.75x the cardiovascular " +
          "mortality of those eating under 10%; even at the average US intake (~15%), CVD mortality risk " +
          "rose ~18% over 15 years. [8]",
        "An umbrella review of meta-analyses tied higher sugar intake to harmful associations across " +
          "dozens of outcomes — obesity, type 2 diabetes, fatty liver, high blood pressure, and heart " +
          "disease among them. The American Heart Association caps prudent added sugar at ~25 g/day for " +
          "women and ~36 g/day for men. [8][9]",
        "Keeping each meal under ~20 g of NET carbs (total carbs minus fiber), with almost no added " +
          "sugar, blunts blood-sugar and insulin spikes, supports steadier energy and appetite, and " +
          "improves the metabolic markers most associated with long-term health."
      ]
    },
    {
      heading: "5. The supporting cast: fiber, smart fats, and satiety",
      body: [
        "Low-carb doesn't mean no-fiber. A landmark Lancet review (Reynolds et al.) found that people " +
          "eating the most fiber (25–29 g/day or more) had 15–30% lower all-cause and cardiovascular " +
          "mortality than those eating the least. That's why these recipes build carbs from non-starchy " +
          "vegetables, seeds, avocado, and legumes like edamame and black soybeans — high fiber, low " +
          "sugar. [10]",
        "High-protein meals are also the most filling. Protein has the highest thermic effect of food " +
          "(your body burns more digesting it) and is the most satiating macronutrient, which helps with " +
          "appetite control and maintaining a healthy weight — without willpower battles. [11]",
        "Fats here come mostly from whole foods — olive oil, avocado, nuts, seeds, eggs, and fatty fish " +
          "rich in omega-3s — rather than from refined or fried sources."
      ]
    },
    {
      heading: "6. Responsible use — please read",
      body: [
        "70 g of protein is a deliberately high, per-MAIN-MEAL target. You do not need to eat all three " +
          "of these meals every day. Use them as building blocks and match your TOTAL daily protein to " +
          "your body weight and goals (a common range is ~1.6 g/kg/day; scale portions up or down).",
        "For healthy adults, higher protein intake has not been shown to harm the kidneys — reviews and " +
          "meta-analyses find a rise in filtration rate that reflects normal adaptation, not damage. " +
          "[12]",
        "BUT: if you have chronic kidney disease, are on a protein-restricted diet, are pregnant, or " +
          "have any medical condition, talk to your doctor or a registered dietitian before adopting a " +
          "high-protein plan. This cookbook is educational, not medical advice."
      ]
    }
  ],

  references: [
    { n: 1, text: "Dietary Reference Intakes / RDA for protein (0.8 g/kg/day) — overview.", url: "https://www.ncbi.nlm.nih.gov/books/NBK56068/" },
    { n: 2, text: "Morton RW et al. Systematic review & meta-analysis of protein supplementation and resistance training. Br J Sports Med, 2018.", url: "https://pubmed.ncbi.nlm.nih.gov/28698222/" },
    { n: 3, text: "Per-meal protein / leucine threshold (~0.4 g/kg, ~2–3 g leucine) to maximize MPS.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4258944/" },
    { n: 4, text: "Protein distribution across meals supports lean mass — review.", url: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2024.1388986/full" },
    { n: 5, text: "Bauer J et al. PROT-AGE position paper: optimal protein intake in older people. JAMDA, 2013.", url: "https://www.sciencedirect.com/science/article/pii/S1525861013003265" },
    { n: 6, text: "Deutz NEP et al. ESPEN Expert Group recommendations on protein and aging. Clin Nutr, 2014.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4208946/" },
    { n: 7, text: "Levine ME, Longo VD et al. Low protein intake, IGF-1, cancer & mortality (age-dependent). Cell Metab, 2014.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3988204/" },
    { n: 8, text: "Added sugar intake and cardiovascular disease mortality — cohort evidence.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9127522/" },
    { n: 9, text: "Dietary sugar consumption and health: umbrella review of meta-analyses. BMJ, 2023.", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10074550/" },
    { n: 10, text: "Reynolds A et al. Carbohydrate quality and human health (fiber & mortality). Lancet, 2019.", url: "https://www.eurekalert.org/news-releases/720345" },
    { n: 11, text: "Halton TL, Hu FB. High-protein diets, thermogenesis, satiety & weight: critical review. J Am Coll Nutr, 2004.", url: "https://pubmed.ncbi.nlm.nih.gov/15466943/" },
    { n: 12, text: "Devries MC et al. Higher protein intake & kidney function in healthy adults: meta-analysis. J Nutr, 2018.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6236074/" }
  ]
};
