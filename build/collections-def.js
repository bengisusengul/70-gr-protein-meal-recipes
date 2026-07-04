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
  }
];

module.exports = { COLLECTIONS, MEAL_PREP_TAGS, totalMins };
