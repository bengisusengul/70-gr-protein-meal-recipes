/*
 * build-extra.js — generates js/recipes-extra.js (window.RECIPE_EXTRA).
 * ------------------------------------------------------------------
 * Adds depth the core data lacks: headnote, servings, storage, difficulty,
 * equipment, allergens/badges, SEO title/description/keywords, and ESTIMATED
 * sodium / saturated fat / sugar. The core js/recipes-data.js is NOT modified.
 *
 * Nutrition values here are ESTIMATES summed from a per-ingredient table
 * (USDA-style), the same spirit as the existing macro estimates — treat as a
 * close guide, not a lab analysis. Run: node build/build-extra.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
global.window = {};
require(path.join(ROOT, "js", "recipes-data.js"));
const RECIPES = window.RECIPES;

// ---- nutrition table: per 100 g -> {na: sodium mg, sf: sat fat g, su: sugar g}
// keys matched as substrings of the lowercased ingredient name (longest key wins)
const N = {
  "powdered peanut butter": { na: 350, sf: 1, su: 8 }, "peanut butter": { na: 400, sf: 10, su: 9 },
  "smoked salmon": { na: 700, sf: 1, su: 0 }, "salmon": { na: 60, sf: 1.5, su: 0 },
  "smoked deli turkey": { na: 1000, sf: 0.5, su: 1 }, "deli turkey": { na: 1000, sf: 0.5, su: 1 },
  "turkey breakfast sausage": { na: 700, sf: 4, su: 0 }, "turkey sausage": { na: 700, sf: 4, su: 0 },
  "ground turkey": { na: 75, sf: 2, su: 0 }, "turkey": { na: 80, sf: 1, su: 0 },
  "ground beef": { na: 70, sf: 5, su: 0 }, "beef": { na: 60, sf: 4, su: 0 }, "beef jerky": { na: 1700, sf: 2, su: 8 },
  "chicken breast": { na: 65, sf: 1, su: 0 }, "chicken": { na: 75, sf: 1.5, su: 0 },
  "pork tenderloin": { na: 55, sf: 1.5, su: 0 }, "pork": { na: 60, sf: 4, su: 0 }, "ham": { na: 1100, sf: 2, su: 1 }, "chorizo": { na: 900, sf: 7, su: 0 }, "bacon": { na: 1300, sf: 9, su: 0 },
  "canned tuna": { na: 250, sf: 0.2, su: 0 }, "tuna steak": { na: 40, sf: 0.5, su: 0 }, "tuna": { na: 120, sf: 0.3, su: 0 },
  "cod": { na: 60, sf: 0.1, su: 0 }, "haddock": { na: 60, sf: 0.1, su: 0 }, "trout": { na: 60, sf: 1, su: 0 }, "mackerel": { na: 500, sf: 3, su: 0 },
  "shrimp": { na: 220, sf: 0.3, su: 0 }, "prawn": { na: 220, sf: 0.3, su: 0 },
  "cottage cheese": { na: 360, sf: 1, su: 3 }, "greek yogurt": { na: 36, sf: 0.2, su: 4 }, "skyr": { na: 40, sf: 0.1, su: 4 }, "quark": { na: 40, sf: 0.3, su: 4 },
  "feta": { na: 1100, sf: 14, su: 4 }, "parmesan": { na: 1600, sf: 12, su: 0 }, "halloumi": { na: 1350, sf: 16, su: 1 }, "paneer": { na: 20, sf: 13, su: 1 },
  "cream cheese": { na: 380, sf: 9, su: 4 }, "cheddar": { na: 620, sf: 19, su: 0 }, "swiss": { na: 190, sf: 17, su: 1 }, "ricotta": { na: 100, sf: 7, su: 3 }, "mozzarella": { na: 500, sf: 10, su: 1 }, "cheese": { na: 600, sf: 18, su: 1 },
  "double cream": { na: 30, sf: 30, su: 3 }, "heavy cream": { na: 30, sf: 30, su: 3 }, "butter": { na: 50, sf: 51, su: 0 },
  "liquid egg whites": { na: 166, sf: 0, su: 0 }, "egg white": { na: 166, sf: 0, su: 0 }, "egg": { na: 124, sf: 3.3, su: 0.4 },
  "whey protein": { na: 300, sf: 1, su: 5 }, "protein powder": { na: 300, sf: 1, su: 5 },
  "olive oil": { na: 0, sf: 14, su: 0 }, "sesame oil": { na: 0, sf: 15, su: 0 }, "avocado oil": { na: 0, sf: 12, su: 0 }, "ghee": { na: 0, sf: 62, su: 0 },
  "almond milk": { na: 60, sf: 0, su: 0 }, "almond flour": { na: 1, sf: 4, su: 4 }, "coconut flour": { na: 30, sf: 9, su: 7 }, "almond": { na: 1, sf: 4, su: 4 },
  "tofu": { na: 10, sf: 0.7, su: 0.6 }, "edamame": { na: 6, sf: 0.2, su: 2 }, "black soybean": { na: 5, sf: 1, su: 1 }, "soy sauce": { na: 5500, sf: 0, su: 1 }, "teriyaki": { na: 3700, sf: 0, su: 15 }, "soy": { na: 30, sf: 1, su: 1 },
  "avocado": { na: 7, sf: 2, su: 0.7 }, "berries": { na: 1, sf: 0, su: 8 }, "berry": { na: 1, sf: 0, su: 8 },
  "kalamata olive": { na: 1500, sf: 1, su: 0 }, "olive": { na: 1500, sf: 1, su: 0 }, "caper": { na: 2300, sf: 0, su: 0 },
  "hemp": { na: 5, sf: 1, su: 1 }, "chia": { na: 16, sf: 1, su: 0 }, "pumpkin seed": { na: 7, sf: 1.7, su: 0.4 }, "seeds": { na: 5, sf: 1, su: 1 },
  "cocoa": { na: 20, sf: 2, su: 1 }, "mayo": { na: 600, sf: 8, su: 1 }, "mustard": { na: 1100, sf: 0, su: 1 }, "vinegar": { na: 5, sf: 0, su: 0 },
  "kimchi": { na: 500, sf: 0, su: 2 }, "marinara": { na: 400, sf: 0.3, su: 6 }, "tomato": { na: 10, sf: 0, su: 3 }, "salsa": { na: 430, sf: 0, su: 4 }, "tzatziki": { na: 300, sf: 2, su: 2 },
  "everything bagel": { na: 1200, sf: 0, su: 0 }, "bagel seasoning": { na: 1200, sf: 0, su: 0 },
  "spinach": { na: 24, sf: 0, su: 0.4 }, "cucumber": { na: 2, sf: 0, su: 1.7 }, "pepper": { na: 4, sf: 0, su: 4 }, "broccoli": { na: 33, sf: 0, su: 1.7 }, "asparagus": { na: 2, sf: 0, su: 1.9 }, "zucchini": { na: 8, sf: 0, su: 2.5 }, "cauliflower": { na: 30, sf: 0, su: 2 }, "mushroom": { na: 5, sf: 0, su: 2 }, "onion": { na: 4, sf: 0, su: 4 }, "lettuce": { na: 10, sf: 0, su: 1 }, "cabbage": { na: 18, sf: 0, su: 3 }, "green bean": { na: 6, sf: 0, su: 3 }, "carrot": { na: 69, sf: 0, su: 5 }, "brussels": { na: 25, sf: 0, su: 2 },
  "garlic": { na: 17, sf: 0, su: 1 }, "baking powder": { na: 10000, sf: 0, su: 0 }, "sweetener": { na: 0, sf: 0, su: 0 }, "cinnamon": { na: 0, sf: 0, su: 0 }, "herbs": { na: 5, sf: 0, su: 0 }, "dill": { na: 5, sf: 0, su: 0 }, "parsley": { na: 5, sf: 0, su: 0 }, "lemon": { na: 1, sf: 0, su: 1 }, "lime": { na: 1, sf: 0, su: 0 },
};
const NKEYS = Object.keys(N).sort((a, b) => b.length - a.length);

function grams(ing) {
  var q = ing.qty, u = (ing.unit || "").toLowerCase(), name = ing.item.toLowerCase();
  if (q == null) { // "to taste" / null
    if (/salt/.test(name)) return 1.2; // a small pinch of salt (~1.2 g -> ~470 mg Na via salt rule below)
    return 0;
  }
  if (u === "g") return q;
  if (u === "ml") return q;
  if (u === "tbsp") return q * (/oil|ghee/.test(name) ? 14 : /seed|hemp|chia/.test(name) ? 10 : 15);
  if (u === "tsp") return q * 5;
  if (u === "slice" || u === "slices") return q * 20;
  if (u === "cloves" || u === "clove") return q * 3;
  if (u === "") { // count
    if (/olive/.test(name)) return q * 4;
    if (/caper/.test(name)) return q * 3;
    if (/pickle/.test(name)) return q * 15;
    if (/avocado/.test(name)) return q * 150;
    if (/cherry tomato/.test(name)) return q * 17;
    if (/bell pepper|pepper/.test(name)) return q * 120;
    if (/onion/.test(name)) return q * 110;
    if (/egg/.test(name)) return q * 50;
    if (/tomato/.test(name)) return q * 90;
    return q * 50;
  }
  return q;
}
function lookup(name) {
  for (var i = 0; i < NKEYS.length; i++) if (name.indexOf(NKEYS[i]) !== -1) return N[NKEYS[i]];
  return null;
}
function estimate(r) {
  var na = 0, sf = 0, su = 0;
  r.ingredients.forEach(function (ing) {
    var name = ing.item.toLowerCase();
    var g = grams(ing);
    // salt to taste -> sodium from salt (39% of NaCl is sodium)
    if (ing.qty == null && /salt/.test(name)) { na += 1.2 * 0.39 * 1000; }
    var t = lookup(name); if (!t) return;
    na += t.na * g / 100; sf += t.sf * g / 100; su += t.su * g / 100;
  });
  return { sodium_mg: Math.round(na / 10) * 10, satFat_g: Math.round(sf * 2) / 2, sugar_g: Math.round(su * 2) / 2 };
}

// ---- derived fields
function difficulty(r) {
  var t = r.time.prep + r.time.cook;
  return (r.steps.length >= 5 || r.time.cook >= 25 || r.ingredients.length >= 9) ? "Medium" : "Easy";
}
function equipment(r) {
  var s = r.steps.join(" ").toLowerCase(), e = [];
  if (/skillet|pan|saut|brown|fry|sear|scramble/.test(s)) e.push("non-stick skillet");
  if (/oven|bake|roast|sheet|grill under|broil/.test(s)) e.push("oven + sheet pan");
  if (/blend|blender|shake|smoothie/.test(s)) e.push("blender");
  if (/grill|griddle/.test(s) && !/under a grill/.test(s)) e.push("grill pan");
  if (/saucepan|simmer|boil|poach/.test(s)) e.push("saucepan");
  if (!e.length) e.push("mixing bowl");
  return e.slice(0, 2);
}
function allergens(r) {
  var names = r.ingredients.map(function (i) { return i.item.toLowerCase(); }).join(" | ");
  var has = {};
  if (/cottage|yogurt|skyr|quark|feta|parmesan|halloumi|paneer|cream cheese|cheddar|swiss|ricotta|mozzarella|cheese|cream|butter|ghee|whey|protein powder/.test(names)) has.Milk = 1;
  if (/egg/.test(names)) has.Egg = 1;
  if (/salmon|tuna|cod|haddock|trout|mackerel|fish|anchov/.test(names)) has.Fish = 1;
  if (/shrimp|prawn/.test(names)) has.Shellfish = 1;
  if (/tofu|edamame|soy|tempeh|teriyaki/.test(names)) has.Soy = 1;
  if (/almond|peanut|walnut|cashew|pecan|hazelnut|pistachio/.test(names)) has.Nuts = 1;
  if (/bread|wrap|tortilla|panko|breadcrumb|oats|wheat|flour(?!less)/.test(names) && !/almond flour|coconut flour/.test(names)) has.Gluten = 1;
  return Object.keys(has);
}
function badges(r, alg) {
  var b = ["High-protein"];
  if (r.macros.netCarbs <= 12) b.push("Low-carb");
  if (alg.indexOf("Gluten") === -1) b.push("Gluten-free");
  if (r.vegetarian) b.push("Vegetarian");
  if (alg.indexOf("Milk") === -1) b.push("Dairy-free");
  if ((r.tags || []).indexOf("no-cook") !== -1) b.push("No-cook");
  return b;
}

// ---- copy
function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
function pick(arr, id) { return arr[hash(id) % arr.length]; }
function mainProtein(r) {
  var order = ["chicken", "beef", "turkey", "salmon", "tuna", "shrimp", "pork", "tofu", "egg", "cottage", "yogurt"];
  for (var i = 0; i < order.length; i++) if ((r.tags || []).indexOf(order[i]) !== -1) return order[i];
  var nm = r.name.toLowerCase();
  for (i = 0; i < order.length; i++) if (nm.indexOf(order[i]) !== -1) return order[i];
  return "protein";
}
function headnote(r) {
  var t = r.time.prep + r.time.cook, cat = r.category.toLowerCase(), noCook = (r.tags || []).indexOf("no-cook") !== -1;
  var hooks = noCook
    ? ["no cooking required — just assemble and eat", "zero stove time, ready in minutes", "a no-cook assembly job that still hits the numbers"]
    : ["ready in about " + t + " minutes", "a quick " + cat + " that comes together fast", "minimal fuss, maximum protein"];
  var benefits = [
    "That's enough high-quality protein in one sitting to clear the leucine threshold for muscle repair.",
    "It keeps net carbs low and added sugar near zero, so your energy stays steady.",
    "A filling, macro-balanced " + cat + " that won't spike your blood sugar.",
    "Exactly the kind of meal that makes a high-protein, low-carb week easy to stick to."
  ];
  var lead = r.name + " delivers " + r.macros.protein + " g of protein for just " + r.macros.netCarbs + " g net carbs — " + pick(hooks, r.id) + ".";
  return lead + " " + pick(benefits, r.id + "b");
}
function storage(r) {
  var tags = r.tags || [], nm = r.name.toLowerCase();
  if (/shake|smoothie|hot chocolate/.test(nm)) return "Best blended fresh. Pre-portion the dry ingredients ahead so it's a 60-second job when you want it.";
  if (/pudding|mousse|cheesecake|bark|parfait|chia/.test(nm)) return "Keeps in the fridge for up to 4 days (the bark freezes for 1–2 months). Perfect to make ahead for grab-and-go.";
  if (/pancake|waffle|french toast|mug cake|muffin/.test(nm)) return "Fridge up to 4 days or freeze up to 2 months; reheat in a toaster or microwave. Great for batch breakfasts.";
  if (tags.indexOf("no-cook") !== -1 || /salad|bowl|plate|box|wrap|roll/.test(nm)) return "Best assembled fresh. Prep the components up to 2 days ahead, keep chilled, and combine just before eating.";
  return "Fridge: keeps 3–4 days in an airtight container — reheat gently. Most portions freeze well for up to 2 months; thaw overnight.";
}
function seo(r, prot) {
  var cat = r.category.toLowerCase(), t = r.time.prep + r.time.cook;
  var title = (r.name + " — " + r.macros.protein + "g Protein " + r.category).slice(0, 65);
  var desc = (difficulty(r) + ", " + t + "-min high-protein " + cat + ": " + r.macros.protein + " g protein, " + r.macros.netCarbs + " g net carbs, " + r.macros.calories + " kcal. Low-sugar and easy to make.").slice(0, 160);
  var kw = ["high protein " + cat, "low carb " + (prot === "protein" ? cat : prot + " recipe"), r.macros.protein + "g protein " + cat, "high protein low carb recipe", "low sugar " + cat];
  if (r.vegetarian) kw.push("high protein vegetarian " + cat);
  return { seoTitle: title, seoDescription: desc, seoKeywords: kw };
}

var out = {};
RECIPES.forEach(function (r) {
  var est = estimate(r), alg = allergens(r), prot = mainProtein(r), s = seo(r, prot);
  out[r.id] = {
    headnote: headnote(r),
    servings: 1,
    servingsNote: "Makes 1 serving (~" + r.macros.protein + " g protein). Use the planner's servings stepper to batch-cook.",
    storage: storage(r),
    difficulty: difficulty(r),
    equipment: equipment(r),
    allergens: alg,
    badges: badges(r, alg),
    sodium_mg: est.sodium_mg, satFat_g: est.satFat_g, sugar_g: est.sugar_g,
    seoTitle: s.seoTitle, seoDescription: s.seoDescription, seoKeywords: s.seoKeywords
  };
});

var banner = "/* auto-generated by build/build-extra.js — do not edit by hand.\n" +
  " * Per-recipe depth: headnote, servings, storage, difficulty, equipment,\n" +
  " * allergens/badges, SEO fields, and ESTIMATED sodium/sat-fat/sugar.\n" +
  " * Nutrition figures are estimates (USDA-style), a close guide not a lab test. */\n";
fs.writeFileSync(path.join(ROOT, "js", "recipes-extra.js"),
  banner + "window.RECIPE_EXTRA = " + JSON.stringify(out, null, 1) + ";\n");
console.log("wrote js/recipes-extra.js for " + Object.keys(out).length + " recipes");
