/*
 * build-pages.js — generates crawlable static recipe pages for SEO.
 * ------------------------------------------------------------------
 * For each recipe: recipes/<id>.html with FULL static content (so search
 * engines & social previews see real text, not an empty SPA shell), a unique
 * <head> (title/description/canonical/OG/Twitter), and JSON-LD schema.org/Recipe
 * (eligible for Google rich results). Also writes recipes/index.html (hub),
 * sitemap.xml and robots.txt. The interactive app (index.html) is untouched.
 *   node build/build-pages.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
global.window = {};
require(path.join(ROOT, "js", "recipes-data.js"));
require(path.join(ROOT, "js", "recipes-extra.js"));
require(path.join(ROOT, "js", "recipe-images.js"));
require(path.join(ROOT, "js", "swaps.js"));
const RECIPES = window.RECIPES, X = window.RECIPE_EXTRA, HASIMG = new Set(window.RECIPE_IMAGES);
const SWAPS = window.SWAPS;

// ---- site config (edit BASE / STORE_URL when the domain / store is live) ----
const BASE = "https://the70gprotein.com";
const STORE_URL = "https://bengisus.gumroad.com/l/igjxu"; // empty -> link to in-browser book; set -> external Gumroad store
const AUTHOR = "Bengisu Sengul";
const buyHref = STORE_URL || "../cookbook.html";
const buyText = STORE_URL ? "Get the full cookbook (PDF)" : "Read the full cookbook";
const buyAttrs = /^https?:\/\//i.test(buyHref) ? ' target="_blank" rel="noopener"' : ""; // open external store in a new tab

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const iso = (m) => "PT" + (m || 0) + "M";
function qty(i) {
  if (i.qty == null) return (i.unit && i.unit !== "") ? i.item + ", " + i.unit : i.item; // "Garlic & ginger, to taste"
  var u = (i.unit && i.unit !== "") ? " " + i.unit : "";
  return i.qty + u + " " + i.item; // "230 g Chicken breast" / "2 Large eggs"
}

function jsonld(r) {
  const x = X[r.id], t = r.time.prep + r.time.cook;
  const obj = {
    "@context": "https://schema.org/", "@type": "Recipe",
    name: r.name,
    image: [BASE + "/img/recipes/" + r.id + ".jpg"],
    description: x.seoDescription,
    author: { "@type": "Person", name: AUTHOR },
    keywords: (x.seoKeywords || []).join(", "),
    recipeCategory: r.category,
    recipeCuisine: "High-Protein",
    prepTime: iso(r.time.prep), cookTime: iso(r.time.cook), totalTime: iso(t),
    recipeYield: x.servings + " serving",
    suitableForDiet: [].concat(r.macros.netCarbs <= 12 ? ["https://schema.org/LowCalorieDiet"] : [], r.vegetarian ? ["https://schema.org/VegetarianDiet"] : []),
    recipeIngredient: r.ingredients.map(qty),
    recipeInstructions: r.steps.map((s) => ({ "@type": "HowToStep", text: s })),
    nutrition: {
      "@type": "NutritionInformation",
      calories: r.macros.calories + " kcal",
      proteinContent: r.macros.protein + " g",
      carbohydrateContent: r.macros.netCarbs + " g",
      fiberContent: r.macros.fiber + " g",
      fatContent: r.macros.fat + " g",
      saturatedFatContent: x.satFat_g + " g",
      sugarContent: x.sugar_g + " g",
      sodiumContent: x.sodium_mg + " mg",
      servingSize: "1 serving"
    }
  };
  return JSON.stringify(obj);
}

function page(r) {
  const x = X[r.id], t = r.time.prep + r.time.cook, url = BASE + "/recipes/" + r.id + ".html";
  const img = "../img/recipes/" + r.id + ".jpg", imgAbs = BASE + "/img/recipes/" + r.id + ".jpg";
  const swaps = (SWAPS && SWAPS.forRecipe) ? SWAPS.forRecipe(r) : [];
  const ingLis = r.ingredients.map((i) => "<li>" + esc(qty(i)) + "</li>").join("");
  const stepLis = r.steps.map((s) => "<li>" + esc(s) + "</li>").join("");
  const badgeEls = (x.badges || []).map((b) => '<span class="badge">' + esc(b) + "</span>").join("");
  const swapEls = swaps.length ? '<section class="swaps"><h2>Dietary swaps</h2>' + swaps.map((s) => "<p><strong>" + esc(s.label) + ":</strong> " + esc(s.items.map((i) => i.from + " → " + i.to).join("; ")) + (s.note ? " <em>(" + esc(s.note) + ")</em>" : "") + "</p>").join("") + "</section>" : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${esc(x.seoTitle)} | The 70 g Protein Cookbook</title>
<meta name="description" content="${esc(x.seoDescription)}">
<meta name="keywords" content="${esc((x.seoKeywords || []).join(", "))}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(r.name)}">
<meta property="og:description" content="${esc(x.seoDescription)}">
<meta property="og:image" content="${imgAbs}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="The 70 g Protein Cookbook">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(r.name)}">
<meta name="twitter:description" content="${esc(x.seoDescription)}">
<meta name="twitter:image" content="${imgAbs}">
<meta name="theme-color" content="#2f7d52">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../css/styles.css">
<style>
 .rp{max-width:760px;margin:0 auto;padding:16px}
 .rp .crumb{font-size:14px;margin:8px 0}
 .rp h1{font-size:30px;line-height:1.15;margin:.2em 0}
 .rp .hero{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:14px;margin:10px 0;background:#eee}
 .rp .meta{color:#5b5048;font-size:15px;margin:4px 0 10px}
 .rp .badges{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}
 .rp .badge{background:#eaf3ec;color:#256241;border-radius:999px;padding:3px 10px;font-size:13px;font-weight:600}
 .rp .lede{font-size:18px;line-height:1.5}
 .rp .macros{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0;padding:12px;background:#faf6ef;border-radius:12px}
 .rp .macros div{flex:1 1 80px;text-align:center}
 .rp .macros b{display:block;font-size:20px;color:#23402e}
 .rp .macros span{font-size:12px;color:#6b6157;text-transform:uppercase;letter-spacing:.04em}
 .rp .cols{display:grid;grid-template-columns:1fr 1.3fr;gap:24px}
 @media(max-width:620px){.rp .cols{grid-template-columns:1fr}}
 .rp h2{font-size:20px;border-bottom:2px solid #ead9c6;padding-bottom:4px;margin-top:22px}
 .rp ol,.rp ul{padding-left:20px;line-height:1.6}
 .rp .cta{display:block;text-align:center;background:#2f7d52;color:#fff;font-weight:700;padding:14px;border-radius:12px;text-decoration:none;margin:22px 0}
 .rp .note{font-size:13px;color:#7a7066;margin-top:18px}
 .rp footer{margin-top:28px;border-top:1px solid #e7ddd0;padding-top:12px;font-size:13px;color:#7a7066}
 .rp a.back{color:#2f7d52;font-weight:600;text-decoration:none}
</style>
<script type="application/ld+json">${jsonld(r)}</script>
</head>
<body>
<main class="rp">
<nav class="crumb"><a class="back" href="../index.html">← The 70 g Protein Cookbook</a> · <a class="back" href="./index.html">All recipes</a> · ${esc(r.category)}</nav>
<h1>${esc(r.name)}</h1>
<div class="meta">${esc(r.category)} · ${esc(x.difficulty)} · ${t} min (${r.time.prep} prep + ${r.time.cook} cook) · ${esc(x.servingsNote)}</div>
<div class="badges">${badgeEls}</div>
<img class="hero" src="${img}" alt="${esc(r.name)} — high-protein ${esc(r.category.toLowerCase())} recipe" width="760" height="475" loading="eager">
<p class="lede">${esc(x.headnote)}</p>
<div class="macros">
 <div><b>${r.macros.protein} g</b><span>Protein</span></div>
 <div><b>${r.macros.netCarbs} g</b><span>Net carbs</span></div>
 <div><b>${r.macros.fat} g</b><span>Fat</span></div>
 <div><b>${r.macros.fiber} g</b><span>Fiber</span></div>
 <div><b>${r.macros.calories}</b><span>Calories</span></div>
</div>
<div class="cols">
 <section><h2>Ingredients</h2><ul>${ingLis}</ul>
   ${x.equipment && x.equipment.length ? "<h2>Equipment</h2><ul><li>" + x.equipment.map(esc).join("</li><li>") + "</li></ul>" : ""}
 </section>
 <section><h2>Method</h2><ol>${stepLis}</ol>
   <h2>Storage &amp; make-ahead</h2><p>${esc(x.storage)}</p>
   ${r.notes ? "<h2>Tip</h2><p>" + esc(r.notes) + "</p>" : ""}
 </section>
</div>
${swapEls}
<p class="note">Full nutrition (estimated, per serving): ${r.macros.calories} kcal · ${r.macros.protein} g protein · ${r.macros.netCarbs} g net carbs · ${r.macros.fat} g fat (${x.satFat_g} g sat) · ${r.macros.fiber} g fiber · ${x.sugar_g} g sugar · ${x.sodium_mg} mg sodium. Allergens: ${(x.allergens && x.allergens.length ? x.allergens.join(", ") : "none of the major allergens flagged")}. Macros are realistic estimates from standard food-composition values; brands and portions vary.</p>
<a class="cta" href="${buyHref}"${buyAttrs}>${esc(buyText)} — 100 recipes, 3 meal plans &amp; the science →</a>
<footer>
<p><strong>The 70 g Protein Cookbook</strong> — 100 high-protein, low-sugar recipes. <a class="back" href="../index.html">Open the free interactive app</a> to plan your week and auto-build a shopping list.</p>
<p>Not medical advice. 70 g/meal is a high per-meal target — match your total daily protein to your body and goals; consult a professional if you have a medical condition.</p>
</footer>
</main>
</body>
</html>
`;
}

// recipes hub page
function hub() {
  const byCat = {};
  RECIPES.forEach((r) => { (byCat[r.category] = byCat[r.category] || []).push(r); });
  const order = ["Breakfast", "Lunch", "Dinner", "Snack"];
  let body = "";
  order.forEach((c) => {
    if (!byCat[c]) return;
    body += "<h2>" + esc(c) + " (" + byCat[c].length + ")</h2><ul class=hublist>";
    byCat[c].forEach((r) => { body += '<li><a href="' + r.id + '.html">' + esc(r.name) + "</a> — " + r.macros.protein + "g protein, " + r.macros.netCarbs + "g net carbs</li>"; });
    body += "</ul>";
  });
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>All 100 Recipes | The 70 g Protein Cookbook</title>
<meta name="description" content="Browse all 100 high-protein, low-sugar recipes — breakfasts, lunches, dinners and snacks, each with ~70 g protein and under 20 g net carbs.">
<link rel="canonical" href="${BASE}/recipes/index.html">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../css/styles.css">
<style>.rp{max-width:760px;margin:0 auto;padding:16px}.rp h1{font-size:30px}.hublist{line-height:1.8;padding-left:18px}.rp a{color:#2f7d52}</style>
</head><body><main class="rp">
<nav><a href="../index.html">← The 70 g Protein Cookbook</a></nav>
<h1>All 100 high-protein recipes</h1>
<p>Every recipe delivers ~70 g of protein with very low sugar. Tap any recipe for ingredients, method, macros and dietary swaps.</p>
${body}
<p style="margin-top:22px"><a href="${buyHref}"${buyAttrs}>${esc(buyText)} →</a></p>
</main></body></html>`;
}

// ---- write ----
const dir = path.join(ROOT, "recipes");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
let n = 0;
RECIPES.forEach((r) => { fs.writeFileSync(path.join(dir, r.id + ".html"), page(r)); n++; });
fs.writeFileSync(path.join(dir, "index.html"), hub());

// sitemap
const today = (process.argv[2] || "2026-06-01"); // pass a date; default fixed
let urls = [BASE + "/", BASE + "/reset.html", BASE + "/free-plan.html", BASE + "/recipes/index.html"].concat(RECIPES.map((r) => BASE + "/recipes/" + r.id + ".html")); // cookbook.html intentionally excluded — paid product, not advertised to crawlers
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => "  <url><loc>" + u + "</loc><lastmod>" + today + "</lastmod></url>").join("\n") + "\n</urlset>\n";
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(ROOT, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: " + BASE + "/sitemap.xml\n");

console.log("wrote " + n + " recipe pages + recipes/index.html, sitemap.xml (" + urls.length + " urls), robots.txt");
