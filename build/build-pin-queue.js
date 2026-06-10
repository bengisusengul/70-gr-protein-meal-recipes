/* build-pin-queue.js — emits marketing/pinterest-queue.md with ready-to-click
 * Pin-from-URL links for batch-2 pins (images in pins/, hosted on the live site).
 * Run: node build/build-pin-queue.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.dirname(__dirname);
const SITE = "https://the70gprotein.com";

// batch 2 — title/description copy follows marketing/pinterest-pins.md formula:
// benefit + macros first, sensory middle, "free 7-day plan" close, 4-6 hashtags.
const PINS = [
  ["garlic-butter-steak-mushrooms", "Dinner",
   "Garlic Butter Steak with Mushrooms — 70g Protein, Low-Carb Dinner",
   "Steakhouse dinner at home: 70g protein, 5g net carbs, one pan, 17 minutes. Garlic butter-basted steak with sautéed mushrooms — low sugar, zero compromise. Tap for the full recipe + a free 7-day high-protein meal plan. #highprotein #lowcarb #steakdinner #onepan #healthydinner"],
  ["shrimp-scampi-zoodles", "Dinner",
   "Shrimp Scampi over Zucchini Noodles — 70g Protein, Low Carb",
   "Garlic-lemon shrimp scampi over zoodles — 70g protein, 8g net carbs, on the table in 20 minutes. Restaurant flavour, low sugar. Get the recipe + a free 7-day high-protein meal plan. #highprotein #lowcarb #shrimprecipes #zoodles #quickdinner"],
  ["bunless-cheeseburger-bowl", "Dinner",
   "Bunless Cheeseburger Bowl — 70g Protein, 7g Net Carbs",
   "All the cheeseburger, none of the bun: 70g protein, 7g net carbs. Seasoned beef, melted cheese, pickles and burger sauce over crisp lettuce. An easy low-carb dinner. Recipe + free 7-day protein plan inside. #highprotein #lowcarb #burgerbowl #mealprep #healthydinner"],
  ["sheet-pan-chicken-thighs-brussels", "Dinner",
   "Sheet-Pan Chicken Thighs with Brussels Sprouts — 70g Protein",
   "One pan, zero thinking: crispy chicken thighs with roasted Brussels sprouts — 70g protein, 7g net carbs. The easiest high-protein, low-carb weeknight dinner. Tap for the recipe + a free 7-day protein meal plan. #highprotein #sheetpandinner #lowcarb #onepan #weeknightdinner"],
  ["teriyaki-chicken-broccoli", "Dinner",
   "Teriyaki Chicken & Broccoli — 70g Protein, Low-Sugar Takeaway",
   "Sticky teriyaki chicken with broccoli — 70g protein, 14g net carbs, ready in 22 minutes. Takeaway flavour without the sugar. Get the recipe and a free 7-day high-protein meal plan. #highprotein #teriyakichicken #lowcarb #fakeaway #healthydinner"],
  ["thai-shrimp-coconut-curry-cauli", "Dinner",
   "Thai Shrimp Coconut Curry with Cauliflower Rice — 70g Protein",
   "Creamy Thai coconut shrimp curry over cauliflower rice — 70g protein, 13g net carbs. Fragrant, fast and low sugar. Full recipe + a free 7-day high-protein meal plan inside. #highprotein #lowcarb #thaicurry #coconutcurry #healthyrecipes"],
  ["swedish-style-beef-meatballs", "Dinner",
   "Swedish Beef Meatballs in Cream Sauce — 70g Protein, Low Carb",
   "Comfort food that hits your macros: Swedish-style meatballs in a silky cream sauce — 70g protein, 9g net carbs. Cosy, low-sugar dinner. Tap for the recipe + a free 7-day protein meal plan. #highprotein #meatballs #lowcarb #comfortfood #healthydinner"],
  ["turkey-meatballs-marinara-zoodles", "Dinner",
   "Turkey Meatballs in Marinara with Zoodles — 70g Protein",
   "Juicy turkey meatballs in marinara over zucchini noodles — 70g protein, 13g net carbs. Italian comfort, low carb and low sugar. Get the recipe + a free 7-day high-protein meal plan. #highprotein #turkeymeatballs #zoodles #lowcarb #italianfood"],
  ["baked-cod-lemon-broccoli", "Dinner",
   "Baked Cod with Lemon & Broccoli — 70g Protein, 6g Net Carbs",
   "Light, flaky baked cod with lemon and roasted broccoli — 70g protein, just 6g net carbs, ready in 23 minutes. An easy low-carb, high-protein dinner. Recipe + free 7-day protein plan inside. #highprotein #lowcarb #codrecipes #fishdinner #healthydinner"],
  ["chicken-shawarma-salad-bowl", "Lunch & Meal Prep",
   "Chicken Shawarma Salad Bowl — 70g Protein, Low-Carb Lunch",
   "Smoky chicken shawarma over crisp salad with garlic-yogurt drizzle — 70g protein, 11g net carbs. A meal-prep-friendly high-protein lunch, no wrap needed. Tap for the recipe + a free 7-day protein plan. #highprotein #shawarma #mealprep #lowcarb #healthylunch"],
  ["buffalo-chicken-lettuce-cups", "Lunch & Meal Prep",
   "Buffalo Chicken Lettuce Cups — 70g Protein, 6g Net Carbs",
   "Spicy buffalo chicken in cool, crisp lettuce cups — 70g protein, 6g net carbs, 20 minutes. Big flavour, low carb, meal-prep friendly. Get the recipe + a free 7-day high-protein meal plan. #highprotein #buffalochicken #lettucewraps #lowcarb #mealprep"],
  ["teriyaki-salmon-poke-bowl", "Lunch & Meal Prep",
   "Teriyaki Salmon Poke Bowl — 70g Protein, Low-Sugar Lunch",
   "A poke-style bowl with teriyaki salmon — 70g protein, 14g net carbs. Fresh, filling and low sugar. One of 100 free high-protein recipes. Recipe + free 7-day protein plan inside. #highprotein #pokebowl #salmonrecipes #lowcarb #healthylunch"],
  ["thai-beef-larb-lettuce-cups", "Lunch & Meal Prep",
   "Thai Beef Larb Lettuce Cups — 70g Protein, Low-Carb Lunch",
   "Zingy Thai beef larb with lime, chilli and herbs in lettuce cups — 70g protein, 8g net carbs, 20 minutes. Light but seriously filling. Tap for the recipe + a free 7-day high-protein plan. #highprotein #larb #thaifood #lettucewraps #lowcarb"],
  ["halloumi-greek-salad-bowl", "Lunch & Meal Prep",
   "Grilled Halloumi Greek Salad Bowl — 70g Protein (Vegetarian)",
   "A vegetarian lunch that actually hits 70g protein: golden grilled halloumi over a Greek salad — 9g net carbs, big Mediterranean flavour. Recipe + a free 7-day high-protein meal plan inside. #highprotein #vegetarian #halloumi #greeksalad #lowcarb"],
  ["tuna-avocado-lettuce-wraps", "Lunch & Meal Prep",
   "Tuna & Avocado Lettuce Wraps — 72g Protein, No-Cook Lunch",
   "No-cook lunch in 10 minutes: creamy tuna and avocado salad in crisp lettuce wraps — 72g protein, 6g net carbs. Desk-lunch hero, low carb and low sugar. Get the recipe + free 7-day protein plan. #highprotein #tunasalad #nocook #lettucewraps #mealprep"],
  ["protein-pancakes", "Breakfast",
   "Fluffy Protein Pancakes — 71g Protein Breakfast (Vegetarian)",
   "Actually fluffy protein pancakes — 71g protein, 9g net carbs, 15 minutes. A high-protein breakfast that feels like the weekend (vegetarian). Tap for the recipe + a free 7-day high-protein meal plan. #proteinpancakes #highprotein #breakfast #lowcarb #vegetarian"],
  ["protein-french-toast", "Breakfast",
   "Protein French Toast — 70g Protein, Low-Sugar Breakfast",
   "Golden, custardy French toast with 70g protein and 15g net carbs (vegetarian). Weekend breakfast without the sugar crash. Get the recipe + a free 7-day protein meal plan. #frenchtoast #highprotein #breakfast #lowsugar #vegetarian"],
  ["turkey-shakshuka-feta", "Breakfast",
   "Turkey Shakshuka with Feta — 70g Protein Breakfast",
   "Eggs poached in spiced tomato with turkey and feta — 70g protein, 12g net carbs. A one-pan high-protein breakfast or brunch, low sugar. Recipe + free 7-day high-protein plan inside. #shakshuka #highprotein #breakfast #onepan #brunch"],
  ["chocolate-protein-chia-pudding", "Breakfast",
   "Chocolate Protein Chia Pudding — 70g Protein (Vegetarian)",
   "Make-ahead chocolate chia pudding with 70g protein and 12g net carbs (vegetarian). Five minutes tonight, breakfast done tomorrow. Tap for the recipe + a free 7-day high-protein meal plan. #chiapudding #highprotein #mealprep #breakfast #lowsugar"],
  ["protein-mug-cake", "Snacks & Desserts",
   "1-Minute Protein Mug Cake — 70g Protein Dessert",
   "A mug cake with 70g of protein — one minute in the microwave, 12g net carbs, actually fluffy (vegetarian). Dessert that fits your macros. Get the recipe + a free 7-day protein meal plan. #mugcake #proteindessert #highprotein #lowcarb #sweettooth"],
  ["frozen-greek-yogurt-protein-bark", "Snacks & Desserts",
   "Frozen Greek Yogurt Protein Bark — 70g Protein Snack",
   "Freezer dessert with 70g protein: Greek yogurt bark with berries and dark chocolate — 13g net carbs, vegetarian. Make once, snack all week. Recipe + free 7-day high-protein plan inside. #yogurtbark #proteinsnack #highprotein #lowsugar #frozentreat"],
  ["protein-hot-chocolate", "Snacks & Desserts",
   "Protein Hot Chocolate — 70g Protein, Low-Sugar Treat",
   "A hot chocolate with 70g of protein and 12g net carbs (vegetarian). The evening sweet tooth, solved in 8 minutes. Tap for the recipe + a free 7-day high-protein meal plan. #hotchocolate #proteindessert #highprotein #lowsugar #cosy"],
];

const pinUrl = (id, desc) =>
  "https://www.pinterest.com/pin/create/button/" +
  `?url=${encodeURIComponent(`${SITE}/recipes/${id}.html`)}` +
  `&media=${encodeURIComponent(`${SITE}/pins/${id}.jpg`)}` +
  `&description=${encodeURIComponent(desc)}`;

let md = `# 📌 Pinterest queue — batch 2 (22 pins, ready to click)

_Generated ${new Date().toISOString().slice(0, 10)} by \`build/build-pin-queue.js\`. Images are in
\`pins/\` and live at \`the70gprotein.com/pins/…\` once pushed._

## How to use (2 clicks per pin)
1. Be logged into Pinterest.
2. Click a **Pin link** below → Pinterest opens pre-filled (image + description + destination).
3. Pick the board **High-Protein Low-Sugar Recipes** → Save. Tick the checkbox here.

## Cadence — do NOT pin all at once
**2 per day for 11 days** (one morning, one evening). Steady pinning reads as a healthy account;
bulk dumps read as spam — and last batch's duplicates came from re-running the flow, so click
each link ONCE. Suggested order below mixes meal types so each day looks varied.

| ✓ | Day | Pin | Board section | Link |
|---|-----|-----|---------------|------|
`;

PINS.forEach(([id, board, title, desc], i) => {
  const day = Math.floor(i / 2) + 1;
  md += `| ☐ | ${day} | ${title} | ${board} | [Pin it](${pinUrl(id, desc)}) |\n`;
});

md += `
## Copy reference (if you ever pin manually)

`;
PINS.forEach(([id, board, title, desc]) => {
  md += `### pins/${id}.jpg — ${board}\n- **Title:** ${title}\n- **Description:** ${desc}\n- **Link:** ${SITE}/recipes/${id}.html\n\n`;
});

md += `---
_Batch 1 (the first 12 pins) is documented in \`marketing/pinterest-pins.md\` — already published
2026-06-06. Reminder: the board still needs deduping (~23 → 12) via the board's Organise tool._
`;

fs.writeFileSync(path.join(ROOT, "marketing", "pinterest-queue.md"), md);
console.log(`wrote marketing/pinterest-queue.md with ${PINS.length} pins`);
