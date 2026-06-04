/*
 * build-lead-magnet.js — renders a small, free "7-Day Plan" PDF teaser
 * (book/free-7-day-plan.pdf) used as the email lead magnet on free-plan.html.
 * Cover + Week-1 plan table + a few full sample recipes + a buy CTA.
 *   node build/build-lead-magnet.js     (after npm install)
 */
const path = require("path");
const fs = require("fs");
const ROOT = path.join(__dirname, "..");
global.window = {};
require(path.join(ROOT, "js", "recipes-data.js"));
require(path.join(ROOT, "js", "plans-data.js"));
require(path.join(ROOT, "js", "recipes-extra.js"));
const RECIPES = window.RECIPES, X = window.RECIPE_EXTRA || {}, PLANS = window.MEAL_PLANS || [];
const byId = (id) => RECIPES.find((r) => r.id === id);
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const imgAbs = (id) => "file://" + path.join(ROOT, "img", "recipes", id + ".jpg");
const STORE = "https://bengisus.gumroad.com/l/igjxu"; // Gumroad product (live)

const plan = PLANS[0] || { name: "Week 1", days: [] };
// unique meals in week 1
const seen = {}, meals = [];
plan.days.forEach((d) => (d.meals || []).forEach((id) => { if (!seen[id]) { seen[id] = 1; meals.push(id); } }));
const samples = meals.slice(0, 4).map(byId).filter(Boolean);

function dayRows() {
  return plan.days.map((d) => {
    const tds = d.meals.map((id) => { const r = byId(id); return "<td>" + (r ? esc(r.name) : "—") + "</td>"; }).join("");
    return "<tr><td class=day>" + esc(d.day) + "</td>" + tds + "</tr>";
  }).join("");
}
function recipeCard(r) {
  const x = X[r.id] || {};
  const ings = r.ingredients.map((i) => "<li>" + esc((i.qty != null ? i.qty + (i.unit && i.unit !== "" ? " " + i.unit : "") + " " : "") + i.item) + "</li>").join("");
  const steps = r.steps.map((s) => "<li>" + esc(s) + "</li>").join("");
  return `<section class="rcp">
    <img src="${imgAbs(r.id)}" alt="${esc(r.name)}">
    <h3>${esc(r.name)}</h3>
    <p class="macros">${r.macros.protein} g protein · ${r.macros.netCarbs} g net carbs · ${r.macros.calories} kcal · ${esc(x.difficulty || "")}</p>
    <div class="cols"><div><h4>Ingredients</h4><ul>${ings}</ul></div><div><h4>Method</h4><ol>${steps}</ol></div></div>
  </section>`;
}

const html = `<!doctype html><html><head><meta charset="utf8"><style>
 @page{size:A4;margin:16mm}
 body{font-family:Georgia,'Times New Roman',serif;color:#2c2620;margin:0}
 .page{page-break-after:always}
 .cover{text-align:center;padding-top:120px}
 .cover .kick{font-family:Arial,sans-serif;letter-spacing:3px;color:#2f7d52;font-weight:700;font-size:14px}
 .cover h1{font-size:46px;margin:14px 40px;line-height:1.1;color:#23402e}
 .cover p{font-size:18px;color:#5b5048;margin:6px 40px}
 h2{font-size:26px;color:#23402e;border-bottom:3px solid #2f7d52;padding-bottom:6px}
 table{width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px;margin-top:10px}
 th{background:#2f7d52;color:#fff;padding:7px;text-align:left}
 td{border-bottom:1px solid #e2d7c6;padding:7px;vertical-align:top}
 td.day{font-weight:700;background:#f6efe3}
 .rcp{page-break-inside:avoid;margin-bottom:18px}
 .rcp img{width:100%;height:230px;object-fit:cover;border-radius:10px}
 .rcp h3{font-size:21px;color:#23402e;margin:10px 0 2px}
 .rcp .macros{font-family:Arial,sans-serif;font-size:12px;color:#b4612a;font-weight:700;margin:0 0 8px}
 .cols{display:grid;grid-template-columns:1fr 1.3fr;gap:20px;font-size:13px}
 .cols h4{margin:0 0 4px;color:#2f7d52}
 ul,ol{padding-left:18px;line-height:1.5;margin:0}
 .cta{text-align:center;padding-top:80px}
 .cta h2{border:0;font-size:34px}
 .cta a,.cta .buy{display:inline-block;background:#2f7d52;color:#fff;font-family:Arial,sans-serif;font-weight:700;padding:14px 26px;border-radius:12px;text-decoration:none;margin-top:16px;font-size:18px}
</style></head><body>
<div class="page cover">
  <div class="kick">THE 70 g PROTEIN COOKBOOK</div>
  <h1>Your Free 7-Day<br>Protein Plan</h1>
  <p>21 high-protein, low-sugar meals · ~210 g protein a day</p>
  <p style="margin-top:30px;font-style:italic">by Bengisu Sengul · Head Chef</p>
</div>
<div class="page">
  <h2>${esc(plan.name)} — your week at a glance</h2>
  <p style="color:#5b5048">Each day pairs a breakfast, lunch and dinner for about 210 g of protein with very little sugar. Cook in any order; batch what you can.</p>
  <table><tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th></tr>${dayRows()}</table>
  <p style="margin-top:14px;font-size:13px;color:#7a7066">This is a taste of <strong>The 70 g Protein Cookbook</strong> — 100 recipes, 3 plans, auto shopping lists and the science. A few full recipes follow →</p>
</div>
<div class="page">
  <h2>A few recipes to start</h2>
  ${samples.map(recipeCard).join("")}
</div>
<div class="page cta">
  <h2>Hungry for the other 96?</h2>
  <p style="font-size:18px;color:#5b5048;margin:10px 60px">Get all 100 high-protein, low-sugar recipes — with photos, dietary swaps, three meal-plan weeks and the cited science — in the full cookbook.</p>
  ${STORE ? '<a class="buy" href="' + STORE + '">Get the full cookbook (PDF) &rarr;</a>' : '<div class="buy">Get the full cookbook — link inside your welcome email</div>'}
  <p style="margin-top:40px;font-style:italic;color:#7a7066">Greetings to yourself — you started, and that's everything. — Bengisu</p>
</div>
</body></html>`;

const tmp = path.join(ROOT, "_leadmagnet.build.html");
fs.writeFileSync(tmp, html);

(async () => {
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  await page.goto("file://" + tmp, { waitUntil: "networkidle0" });
  if (!fs.existsSync(path.join(ROOT, "book"))) fs.mkdirSync(path.join(ROOT, "book"));
  await page.pdf({ path: path.join(ROOT, "book", "free-7-day-plan.pdf"), format: "A4", printBackground: true });
  await browser.close();
  fs.unlinkSync(tmp);
  const kb = Math.round(fs.statSync(path.join(ROOT, "book", "free-7-day-plan.pdf")).size / 1024);
  console.log("✓ book/free-7-day-plan.pdf (" + kb + " KB)");
})().catch((e) => { console.error(e); process.exit(1); });
