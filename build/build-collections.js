/*
 * build-collections.js — generates the SEO collection pages.
 * ------------------------------------------------------------------
 * For each entry in build/collections-def.js: collections/<slug>.html —
 * a crawlable, keyword-targeted hub (unique title/description/canonical/OG,
 * ItemList JSON-LD, card grid linking to the recipe pages, sibling-collection
 * links, free-plan + cookbook CTAs, GoatCounter snippet).
 *
 * The sitemap is written by build-pages.js (single writer), which pulls the
 * same defs — run either script in any order; both are rerun-safe.
 *   node build/build-collections.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
global.window = {};
require(path.join(ROOT, "js", "recipes-data.js"));
require(path.join(ROOT, "js", "recipes-extra.js"));
const { COLLECTIONS, totalMins } = require("./collections-def.js");
const RECIPES = window.RECIPES, X = window.RECIPE_EXTRA;

// ---- site config (keep in sync with build-pages.js) ----
const BASE = "https://the70gprotein.com";
const STORE_URL = "https://bengisus.gumroad.com/l/igjxu";
// GoatCounter (free, no cookie banner). the70gprotein is a placeholder until
// the owner creates the account — a bogus subdomain fails silently, so it is
// harmless to deploy; replace in all files at once (grep the70gprotein).
const GC_SNIPPET = '<script data-goatcounter="https://the70gprotein.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>';

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function itemListJsonld(c, recipes) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.h1,
    description: c.metaDescription,
    numberOfItems: recipes.length,
    itemListElement: recipes.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.name,
      url: BASE + "/recipes/" + r.id + ".html"
    }))
  });
}

function card(r) {
  const t = totalMins(r);
  const veg = r.vegetarian ? ' · <span class="veg">Veg</span>' : "";
  return `<a class="ccard" href="../recipes/${r.id}.html">
  <img src="../img/recipes/${r.id}.jpg" alt="${esc(r.name)} — high-protein ${esc(r.category.toLowerCase())} recipe" width="400" height="250" loading="lazy">
  <span class="ccard-body">
    <span class="ccard-name">${esc(r.name)}</span>
    <span class="ccard-meta">${r.macros.protein} g protein · ${r.macros.calories} kcal · ${t} min${veg}</span>
  </span>
</a>`;
}

function page(c) {
  let recipes = RECIPES.filter((r) => c.filter(r, X[r.id]));
  if (c.sort) recipes = recipes.slice().sort(c.sort);
  const url = BASE + "/collections/" + c.slug + ".html";
  const heroAbs = BASE + "/img/recipes/" + c.heroId + ".jpg";
  const siblings = COLLECTIONS.filter((o) => o.slug !== c.slug)
    .map((o) => `<a href="${o.slug}.html">${esc(o.h1)}</a>`).join(" · ");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${esc(c.title)} | The 70 g Protein Cookbook</title>
<meta name="description" content="${esc(c.metaDescription)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(c.title)}">
<meta property="og:description" content="${esc(c.metaDescription)}">
<meta property="og:image" content="${heroAbs}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="The 70 g Protein Cookbook">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(c.title)}">
<meta name="twitter:description" content="${esc(c.metaDescription)}">
<meta name="twitter:image" content="${heroAbs}">
<meta name="theme-color" content="#2f7d52">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../css/styles.css">
<style>
 .cp{max-width:980px;margin:0 auto;padding:16px}
 .cp .crumb{font-size:14px;margin:8px 0}
 .cp a.back{color:#2f7d52;font-weight:600;text-decoration:none}
 .cp h1{font-size:32px;line-height:1.15;margin:.25em 0 .2em}
 .cp .lede{font-size:17px;line-height:1.55;color:#4b4239;max-width:70ch}
 .cp .count{font-size:14px;color:#6b6157;margin:10px 0 18px}
 .cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px}
 .ccard{display:block;background:#fff;border:1px solid #e7ddd0;border-radius:14px;overflow:hidden;text-decoration:none;color:#2c2620;transition:transform .15s ease,box-shadow .15s ease}
 .ccard:hover{transform:translateY(-3px);box-shadow:0 10px 26px rgba(20,40,28,.12)}
 .ccard img{width:100%;height:150px;object-fit:cover;display:block;background:#eee}
 .ccard-body{display:block;padding:10px 12px 12px}
 .ccard-name{display:block;font-weight:700;font-size:15px;line-height:1.3}
 .ccard-meta{display:block;margin-top:4px;font-size:12.5px;color:#6b6157}
 .ccard .veg{color:#2f7d52;font-weight:700}
 .cp .more{margin:26px 0 0;padding:14px 16px;background:#f4efe3;border-radius:12px;font-size:14px;line-height:1.7}
 .cp .more a{color:#2f7d52;font-weight:600;text-decoration:none}
 .cp .ctas{display:flex;flex-wrap:wrap;gap:12px;margin:22px 0}
 .cp .cta{display:inline-block;text-align:center;background:#2f7d52;color:#fff;font-weight:700;padding:13px 20px;border-radius:12px;text-decoration:none}
 .cp .cta.ghost{background:#fff;color:#1d4e34;border:1.5px solid #cdbfa9}
 .cp footer{margin-top:26px;border-top:1px solid #e7ddd0;padding-top:12px;font-size:13px;color:#7a7066}
</style>
<script type="application/ld+json">${itemListJsonld(c, recipes)}</script>
</head>
<body>
<main class="cp">
<nav class="crumb"><a class="back" href="../index.html">← The 70 g Protein Cookbook</a> · <a class="back" href="../recipes/index.html">All 100 recipes</a></nav>
<h1>${esc(c.h1)}</h1>
<p class="lede">${esc(c.intro)}</p>
<p class="count">${recipes.length} recipes · every one lands ≈70 g of protein with under 20 g net carbs · tap any card for the full recipe, macros &amp; dietary swaps</p>
<div class="cgrid">
${recipes.map(card).join("\n")}
</div>
<div class="ctas">
  <a class="cta ghost" href="../free-plan.html">Get the free 7-day plan (PDF)</a>
  <a class="cta" href="${STORE_URL}" target="_blank" rel="noopener" data-goatcounter-click="buy-cookbook-collection">Get all 100 recipes — the cookbook →</a>
</div>
<p class="more"><strong>More collections:</strong> ${siblings}</p>
<footer>
<p><strong>The 70 g Protein Cookbook</strong> by Bengisu Sengul — 100 high-protein, low-sugar recipes. <a class="back" href="../index.html">Open the free interactive app</a> to plan a week and auto-build your shopping list.</p>
<p>Not medical advice. 70 g/meal is a high per-meal target — match your total daily protein to your body and goals.</p>
</footer>
</main>
${GC_SNIPPET}
</body>
</html>
`;
}

// ---- write ----
const dir = path.join(ROOT, "collections");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
let n = 0;
COLLECTIONS.forEach((c) => {
  const recipes = RECIPES.filter((r) => c.filter(r, X[r.id]));
  if (!recipes.length) { console.warn("! skipping empty collection: " + c.slug); return; }
  fs.writeFileSync(path.join(dir, c.slug + ".html"), page(c));
  console.log("  " + c.slug + ".html  (" + recipes.length + " recipes)");
  n++;
});
console.log("wrote " + n + " collection pages -> collections/ (sitemap handled by build-pages.js)");
