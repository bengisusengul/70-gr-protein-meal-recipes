/*
 * collections-def.js — single source of truth for the SEO collection pages.
 * ------------------------------------------------------------------
 * Used by BOTH build scripts so slugs/filters never drift:
 *   - build/build-collections.js  -> writes collections/<slug>.html
 *   - build/build-pages.js        -> sitemap URLs, hub "browse by collection"
 *                                    row, per-recipe footer links
 * Each entry: { slug, title, h1, metaDescription, intro, heroId, filter, sort? }
 *   filter(r, x): r = recipe from RECIPES, x = RECIPE_EXTRA[r.id] (may be undefined)
 *   sort(a, b):   optional ordering for the page's card grid
 */

const MEAL_PREP_TAGS = ["meal-prep", "batch-cook", "make-ahead", "freezer-friendly"];
const hasMealPrepTag = (r) => (r.tags || []).some((t) => MEAL_PREP_TAGS.indexOf(String(t).toLowerCase()) !== -1);
const totalMins = (r) => (r.time.prep || 0) + (r.time.cook || 0);

const COLLECTIONS = [
  {
    slug: "high-protein-breakfast-ideas",
    title: "High-Protein Breakfast Ideas — 70 g Protein Each",
    h1: "High-Protein Breakfast Ideas",
    metaDescription: "20 high-protein breakfast ideas with ~70 g of protein and under 20 g net carbs each — scrambles, protein pancakes, smoothies and no-cook bowls, all with photos and macros.",
    intro: "Breakfast is where most people fall 40 g short before lunchtime. Every recipe here front-loads your day with roughly 70 g of protein and very little sugar — from five-minute yogurt bowls to proper chef-made scrambles — so the 3pm crash never turns up.",
    heroId: "greek-yogurt-granola-parfait",
    filter: (r) => r.category === "Breakfast"
  },
  {
    slug: "high-protein-lunch-ideas",
    title: "High-Protein Lunch Ideas — 70 g Protein Each",
    h1: "High-Protein Lunch Ideas",
    metaDescription: "25 high-protein lunch ideas with ~70 g of protein and under 20 g net carbs — salads, bowls and wraps that keep you full all afternoon, with photos and full macros.",
    intro: "A proper high-protein lunch is the difference between an afternoon of focus and an afternoon of snack drawers. These 25 lunches — big salads, bowls, wraps and protein plates — each land about 70 g of protein with almost no sugar, and most pack well for work.",
    heroId: "greek-chicken-salad-bowl",
    filter: (r) => r.category === "Lunch"
  },
  {
    slug: "high-protein-dinner-recipes",
    title: "High-Protein Dinner Recipes — 70 g Protein Each",
    h1: "High-Protein Dinner Recipes",
    metaDescription: "33 high-protein dinner recipes with ~70 g of protein and under 20 g net carbs — steak, salmon, chicken, curries and comfort-food classics, with photos and full macros.",
    intro: "Dinner is where flavour earns its keep. These 33 chef-built dinners — garlic-butter steak, baked salmon, proper curries, comfort classics — each deliver around 70 g of protein and under 20 g net carbs, so eating like this never feels like a diet.",
    heroId: "baked-salmon-asparagus-parmesan",
    filter: (r) => r.category === "Dinner"
  },
  {
    slug: "high-protein-snacks",
    title: "High-Protein Snacks That Actually Fill You Up",
    h1: "High-Protein Snacks",
    metaDescription: "22 high-protein snacks with ~70 g of protein each — protein mousses, snack boxes, cheesecake cups and savoury plates that hold you over for hours. Photos and macros included.",
    intro: "Most “protein snacks” are 12 g of protein wrapped in marketing. These 22 are engineered like meals — around 70 g of protein each — so one snack genuinely holds you for hours. Sweet mousses and cheesecake cups included, sugar not.",
    heroId: "whipped-cottage-berry-protein-pot",
    filter: (r) => r.category === "Snack"
  },
  {
    slug: "vegetarian-high-protein-recipes",
    title: "Vegetarian High-Protein Recipes — 70 g Without Meat",
    h1: "Vegetarian High-Protein Recipes",
    metaDescription: "27 vegetarian high-protein recipes hitting ~70 g of protein without meat — tofu, paneer, eggs, Greek yogurt, cottage cheese and halloumi, with photos and full macros.",
    intro: "Hitting 70 g of protein without meat is completely doable — you just need the right building blocks. These 27 vegetarian recipes lean on tofu, paneer, eggs, halloumi, Greek yogurt and cottage cheese to get there, with all the flavour a chef can throw at them.",
    heroId: "paneer-tofu-tikka-spinach",
    filter: (r) => !!r.vegetarian
  },
  {
    slug: "quick-high-protein-meals-under-30-minutes",
    title: "Quick High-Protein Meals — Ready in Under 30 Minutes",
    h1: "Quick High-Protein Meals (Under 30 Minutes)",
    metaDescription: "58 quick high-protein meals ready in 20 minutes or less — each with ~70 g of protein and under 20 g net carbs. No-cook bowls, wraps, scrambles and fast dinners with macros.",
    intro: "Every meal on this page is on the table in 20 minutes or less — comfortably inside your lunch break. Around 70 g of protein each, very low sugar, and plenty of no-cook options for the days when even the hob feels like too much admin.",
    heroId: "tuna-avocado-lettuce-wraps",
    filter: (r) => totalMins(r) <= 20,
    sort: (a, b) => totalMins(a) - totalMins(b)
  },
  {
    slug: "high-protein-low-calorie-meals",
    title: "High-Protein, Low-Calorie Meals — Under 500 kcal",
    h1: "High-Protein, Low-Calorie Meals",
    metaDescription: "31 high-protein, low-calorie meals — each ~70 g of protein under 500 kcal. The best protein-per-calorie recipes for fat loss, with photos and full macros.",
    intro: "When the goal is fat loss, protein-per-calorie is the number that matters. Each of these 31 meals packs roughly 70 g of protein into fewer than 500 kcal — maximum fullness per calorie, no rabbit-food energy about it.",
    heroId: "baked-cod-lemon-broccoli",
    filter: (r) => r.macros.calories < 500,
    sort: (a, b) => a.macros.calories - b.macros.calories
  },
  {
    slug: "high-protein-meal-prep",
    title: "High-Protein Meal Prep Recipes — Batch-Friendly",
    h1: "High-Protein Meal Prep Recipes",
    metaDescription: "23 batch-friendly high-protein meal prep recipes (~70 g protein each) that hold up in the fridge — chilis, sheet-pan dinners, egg muffins and make-ahead bowls with macros.",
    intro: "Cooked protein in the fridge is the single biggest reason people stick to eating this way. These 23 recipes are the batch-cook heroes of the book — chilis, sheet-pans, egg muffins and make-ahead bowls that taste just as good on day three.",
    heroId: "low-carb-beef-chili",
    filter: (r) => hasMealPrepTag(r)
  },
  {
    slug: "high-protein-chicken-recipes",
    title: "High-Protein Chicken Recipes — 70 g Protein Each",
    h1: "High-Protein Chicken Recipes",
    metaDescription: "16 high-protein chicken recipes with ~70 g of protein and under 20 g net carbs each — tikka masala, souvlaki, piccata, sheet-pan thighs and more, with photos and full macros.",
    intro: "Chicken is the workhorse of high-protein cooking — and the first thing to go boring in the wrong hands. These 16 chicken recipes are the chef's counter-argument: tikka masala, souvlaki bowls, piccata, crispy sheet-pan thighs — each landing about 70 g of protein with barely any sugar.",
    heroId: "chicken-tikka-masala-cauli-rice",
    filter: (r) => r.ingredients.some((i) => i.item.toLowerCase().includes("chicken"))
  },
  {
    slug: "high-protein-fish-seafood-recipes",
    title: "High-Protein Fish & Seafood Recipes — 70 g Each",
    h1: "High-Protein Fish & Seafood Recipes",
    metaDescription: "21 high-protein fish and seafood recipes hitting ~70 g of protein — salmon, cod, prawns, tuna and trout, grilled, baked and seared, with photos and full macros.",
    intro: "Fish is the most underrated route to 70 g of protein — light on the stomach, quick in the pan, and impossible to make boring if you know what you're doing. Salmon, cod, prawns, tuna, trout: 21 recipes, each with the macros done for you.",
    heroId: "pan-seared-salmon-creamed-spinach",
    filter: (r) => r.ingredients.some((i) => i.aisle === "Seafood")
  },
  {
    slug: "15-minute-high-protein-meals",
    title: "15-Minute High-Protein Meals — 70 g Protein, Fast",
    h1: "15-Minute High-Protein Meals",
    metaDescription: "44 high-protein meals ready in 15 minutes or less — each with ~70 g of protein and under 20 g net carbs. No-cook plates, wraps, scrambles and flash-pan dinners with macros.",
    intro: "Fifteen minutes is the honest limit of a weeknight. Every meal here is done inside it — many with no cooking at all — and still lands around 70 g of protein. Speed is a technique, and these are the recipes where it shows.",
    heroId: "smoked-salmon-egg-rollups",
    filter: (r) => totalMins(r) <= 15,
    sort: (a, b) => totalMins(a) - totalMins(b)
  },
  {
    slug: "high-protein-desserts",
    title: "High-Protein Desserts — 70 g Protein, Low Sugar",
    h1: "High-Protein Desserts",
    metaDescription: "High-protein desserts with ~70 g of protein each and hardly any sugar — cheesecake cups, chocolate mousse, mug cake, frozen yogurt bark and more, with full macros.",
    intro: "Dessert is usually where good intentions go to die. Not here: cheesecake cups, chocolate mousse, a one-minute mug cake, frozen yogurt bark — each one delivers about 70 g of protein with almost no sugar, and every single one is vegetarian.",
    heroId: "protein-cheesecake-quark-cup",
    filter: (r) => (r.tags || []).some((t) => ["sweet", "dessert"].indexOf(String(t).toLowerCase()) !== -1)
      || /mousse|cheesecake|mug cake|pudding|bark|hot chocolate|parfait|french toast|pancake/i.test(r.name)
  },
  {
    slug: "high-protein-one-pan-meals",
    title: "High-Protein One-Pan Meals — 70 g Protein, One Wash-Up",
    h1: "High-Protein One-Pan Meals",
    metaDescription: "High-protein one-pan and sheet-pan meals with ~70 g of protein each — skillets, stir-fries and traybakes where dinner and the washing-up both take one pan.",
    intro: "One pan in, one pan out. Skillets, stir-fries and sheet-pan traybakes where the whole 70 g of protein happens in a single vessel — maximum dinner, minimum washing-up. The weeknight format every chef secretly lives on at home.",
    heroId: "sheet-pan-chicken-thighs-brussels",
    filter: (r) => (r.tags || []).some((t) => ["one-pan", "sheet-pan", "stir-fry"].indexOf(String(t).toLowerCase()) !== -1)
  }
];

module.exports = { COLLECTIONS, MEAL_PREP_TAGS, totalMins };
