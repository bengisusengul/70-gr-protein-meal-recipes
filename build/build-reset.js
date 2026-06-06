/*
 * build-reset.js — builds the paid "4-Week 70 g Protein Reset" program.
 * ------------------------------------------------------------------
 * Generates two PDFs from the same 100-recipe dataset:
 *   1) dist/the-4-week-reset.pdf   — the Program Guide (the hero deliverable:
 *        welcome, how it works, the science distilled, setup, 4 structured
 *        weeks with day-by-day plans + computed aisle-grouped shopping lists,
 *        coaching, troubleshooting, FAQ, progress tracking, maintenance).
 *   2) book/reset-printables.pdf    — the Printables Pack (print-and-use:
 *        4 weekly plan grids, 4 shopping lists with check boxes, a 28-day
 *        habit tracker, and a weekly check-in / measurements log).
 *
 * The £29 Reset is sold as a bundle: this guide + the printables pack +
 * the full 100-recipe cookbook PDF (book/the-70g-protein-cookbook.pdf).
 *
 *   node build/build-reset.js            (after npm install)
 *   then compress the guide if needed:
 *   python3 build/compress-pdf.py dist/the-4-week-reset.pdf book/the-4-week-reset.pdf 1400 80
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
const planById = (id) => PLANS.find((p) => p.id === id);
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const imgAbs = (rel) => "file://" + path.join(ROOT, rel);
const STORE_COOKBOOK = "https://bengisus.gumroad.com/l/igjxu";
const SITE = "https://the70gprotein.com";

// ---- shopping-list aggregation (mirrors js/app.js buildShoppingList + fmtQty) ----
const AISLE_ORDER = ["Produce", "Meat & Poultry", "Seafood", "Eggs & Dairy", "Frozen", "Pantry", "Condiments & Spices", "Supplements", "Other"];
function fmtQty(qty, unit) {
  if (qty == null) return unit || "to taste";
  let n;
  if (unit === "g" || unit === "ml") n = Math.round(qty);
  else if (unit === "") n = Math.round(qty * 2) / 2;
  else n = Math.round(qty * 100) / 100;
  return unit ? n + " " + unit : String(n);
}
// Aggregate the week's MAIN meals (breakfast+lunch+dinner, 1 serving each) into
// an aisle-grouped, alphabetised list — exactly like the app's planner.
function weekShoppingList(days) {
  const combined = {};
  days.forEach((d) => (d.meals || []).forEach((id) => {
    const r = byId(id); if (!r) return;
    r.ingredients.forEach((ing) => {
      const key = (ing.item + "|" + (ing.unit || "")).toLowerCase();
      if (!combined[key]) combined[key] = { item: ing.item, unit: ing.unit || "", aisle: ing.aisle || "Other", qty: ing.qty == null ? null : 0, toTaste: ing.qty == null };
      if (ing.qty != null) { if (combined[key].qty == null) combined[key].qty = 0; combined[key].qty += ing.qty; }
      else combined[key].toTaste = true;
    });
  }));
  const aisles = {};
  Object.keys(combined).forEach((k) => { const c = combined[k]; (aisles[c.aisle] = aisles[c.aisle] || []).push(c); });
  Object.keys(aisles).forEach((a) => aisles[a].sort((x, y) => x.item.localeCompare(y.item)));
  return aisles;
}
function qtyText(c) {
  return c.toTaste && (c.qty == null || c.qty === 0) ? "to taste" : fmtQty(c.qty, c.unit) + (c.toTaste ? " (+ to taste)" : "");
}
function sortedAisles(aisles) {
  return Object.keys(aisles).sort((a, b) => {
    const ia = AISLE_ORDER.indexOf(a), ib = AISLE_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}

// ============================================================
//  PROGRAM STRUCTURE — 4 weeks with a clear arc
// ============================================================
// Weeks 1–3 reuse the three balanced plans; week 4 is a curated "make it
// yours" greatest-hits week (variety across cuisines, fresh recipes).
const WEEK4_DAYS = [
  { day: "Monday",    meals: ["protein-french-toast", "chicken-shawarma-salad-bowl", "steak-fajita-bowl"], snack: "protein-cheesecake-quark-cup" },
  { day: "Tuesday",   meals: ["turkey-shakshuka-feta", "teriyaki-salmon-poke-bowl", "chicken-cacciatore"], snack: "peanut-butter-protein-mousse" },
  { day: "Wednesday", meals: ["chocolate-protein-chia-pudding", "korean-beef-bulgogi-cauli-bowl", "thai-shrimp-coconut-curry-cauli"], snack: "whipped-cottage-berry-protein-pot" },
  { day: "Thursday",  meals: ["ham-cheese-egg-muffins", "greek-chicken-salad-bowl", "lamb-kofta-tzatziki"], snack: "protein-hot-chocolate" },
  { day: "Friday",    meals: ["cottage-cheese-protein-waffles", "italian-antipasto-protein-plate", "baked-haddock-parmesan-crust"], snack: "ricotta-berry-protein-bowl" },
  { day: "Saturday",  meals: ["chorizo-egg-breakfast-bowl", "thai-beef-larb-lettuce-cups", "chicken-tikka-masala-cauli-rice"], snack: "frozen-greek-yogurt-protein-bark" },
  { day: "Sunday",    meals: ["high-protein-tofu-scramble", "smoked-trout-egg-salad", "swedish-style-beef-meatballs"], snack: "protein-mug-cake" }
];

const WEEKS = [
  {
    n: 1, theme: "Foundation", img: "img/book/breakfast.jpg",
    planId: "balanced-classic",
    goal: "Get the system in place. This week is about one thing: hitting protein at every meal without thinking too hard about it.",
    focus: [
      "Eat three protein-anchored meals a day. Don't skip — a skipped meal is a missed protein pulse you can't get back later.",
      "Shop once (list below), prep your proteins on day one, and let the week run itself.",
      "Don't count calories yet. Just hit the protein and keep the sugar low. That alone does most of the work."
    ],
    habit: "Anchor every meal to a protein first, then build the plate around it.",
    tip: "Batch-cook your week's chicken, beef or salmon in one tray on Sunday. Cooked protein in the fridge is the single biggest reason people actually stick to this."
  },
  {
    n: 2, theme: "Momentum", img: "img/book/lunch.jpg",
    planId: "balanced-mediterranean",
    goal: "You've proven you can do it. Now we fight boredom — the real reason most plans die in week two — with brighter, Mediterranean-leaning flavours.",
    focus: [
      "Notice what's already changed: steadier energy, fewer cravings, no 3pm crash. That's the low sugar working.",
      "Lean into fish and olive-oil-forward plates this week. Variety is what makes a diet survivable.",
      "Start drinking more water. Higher protein needs it, and thirst often masquerades as hunger."
    ],
    habit: "Add a fist of non-starchy veg or a handful of greens to every plate.",
    tip: "Keep a 'flavour shelf' — lemon, good olive oil, feta, fresh herbs, harissa, tzatziki. Two minutes of acid and herbs turns plain protein into something you crave."
  },
  {
    n: 3, theme: "Lean & Light", img: "img/book/dinner.jpg",
    planId: "balanced-lean-light",
    goal: "Dial it in. This week favours the leanest recipes in the book — maximum protein, lowest calories — for the cleanest week of the four.",
    focus: [
      "Same protein, fewer calories. If fat loss is your goal, this is the week the scale and the mirror usually start to agree.",
      "Sleep and walking matter now more than any 'fat-burning' trick. Aim for 7–8 hours and a daily walk.",
      "If you train, keep training. Protein protects the muscle you have while you lose fat."
    ],
    habit: "Stop eating at 'satisfied,' not 'full.' High-protein meals make this easy — they keep you fuller for longer.",
    tip: "Lean doesn't mean dry. Poach, don't fry; finish fish with lemon and a knob of butter off the heat; rest your meat. Lean food only tastes like 'diet food' when it's overcooked."
  },
  {
    n: 4, theme: "Lock-In — Make It Yours", img: "img/book/snack.jpg",
    days: WEEK4_DAYS,
    goal: "The whole point of a reset is that it ends — and you keep going. This week is a curated 'greatest hits' to enjoy, plus the framework to build every week from here yourself.",
    focus: [
      "This week's plan is my own favourites — a tour of cuisines so you finish on a high.",
      "Then build week five yourself: pick 3 breakfasts, 3 lunches and 3 dinners you genuinely loved, and rotate them. That's the whole skill.",
      "Use the free app at the70gprotein.com to plan any week and auto-build the shopping list in one tap."
    ],
    habit: "Plan next week before this one ends. The people who keep the results are the people who never run out of a plan.",
    tip: "Keep three 'emergency' meals you can make from pantry and freezer staples (a tin of tuna, eggs, frozen prawns, cottage cheese). The plan only fails on the days you didn't plan for."
  }
];

function dailyProtein(day) {
  return (day.meals || []).reduce((s, id) => { const r = byId(id); return s + (r ? r.macros.protein : 0); }, 0);
}
function mealName(id) { const r = byId(id); return r ? r.name : "—"; }

// ---- plan grid (used in guide + printables) ----
function planGrid(days, opts) {
  opts = opts || {};
  const rows = days.map((d) => {
    const tds = d.meals.map((id) => "<td>" + esc(mealName(id)) + "</td>").join("");
    const snack = opts.snack === false ? "" : "<td class='snack'>" + esc(mealName(d.snack)) + "</td>";
    const total = opts.totals === false ? "" : "<td class='total'>~" + dailyProtein(d) + " g</td>";
    return "<tr><td class='day'>" + esc(d.day) + "</td>" + tds + snack + total + "</tr>";
  }).join("");
  const snackTh = opts.snack === false ? "" : "<th>Optional snack (+~70 g)</th>";
  const totalTh = opts.totals === false ? "" : "<th>Day total</th>";
  return "<table class='plan'><tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th>" + snackTh + totalTh + "</tr>" + rows + "</table>";
}

// ---- shopping list block ----
function shoppingBlock(days, opts) {
  opts = opts || {};
  const aisles = weekShoppingList(days);
  const cols = sortedAisles(aisles).map((a) => {
    const items = aisles[a].map((c) => {
      const box = opts.checkbox ? "<span class='cb'></span>" : "";
      return "<li>" + box + "<span class='qn'>" + esc(qtyText(c)) + "</span> " + esc(c.item) + "</li>";
    }).join("");
    return "<div class='aisle'><h4>" + esc(a) + "</h4><ul>" + items + "</ul></div>";
  }).join("");
  return "<div class='shop'>" + cols + "</div>";
}

// ============================================================
//  GUIDE CONTENT
// ============================================================
function scienceDistilled() {
  return `
  <div class="page">
    <span class="kick">THE WHY</span>
    <h2>The science, in 90 seconds</h2>
    <p class="lede">You don't need to believe me — you need to know <em>why</em> two simple rules (a lot of protein, very little sugar) reliably change how people look and feel. Here it is, honestly.</p>
    <div class="sci">
      <h3>1. Most of us under-eat protein</h3>
      <p>The largest review on the subject (Morton et&nbsp;al., 49 studies) found benefits to muscle and body composition up to roughly <strong>1.6&nbsp;g of protein per kg of bodyweight per day</strong> — far above the bare-minimum RDA. Spread over three meals, that lands right around 50–70&nbsp;g per meal. That's the whole design of this plan.</p>
      <h3>2. Each meal has to clear a threshold to count</h3>
      <p>Muscle building works in pulses, not a steady drip. A meal has to clear a "leucine threshold" — about <strong>0.4&nbsp;g of protein per kg in one sitting</strong> — to switch it on. Older muscle needs even more. A 70&nbsp;g meal clears it comfortably for almost everyone, which is why we anchor every single plate.</p>
      <h3>3. Protein keeps you full — without willpower</h3>
      <p>Protein is the most satiating macronutrient and has the highest "thermic effect" (your body burns more just digesting it). That's why people on this plan stop snacking out of habit: they're genuinely not hungry. No willpower battle required.</p>
      <h3>4. Cutting sugar is the other half</h3>
      <p>Keeping each meal under ~20&nbsp;g of <em>net</em> carbs with almost no added sugar blunts the blood-sugar spikes and crashes that drive cravings and the afternoon slump. Steadier energy, steadier appetite, better long-term metabolic markers.</p>
      <h3>5. We don't skimp on fibre or good fats</h3>
      <p>Low-carb here doesn't mean low-fibre: the carbs come from vegetables, seeds, avocado and legumes like edamame. Fats come from whole foods — olive oil, eggs, nuts, fatty fish. That combination is what makes the food satisfying instead of punishing.</p>
    </div>
    <p class="src">Full citations (Morton 2018; leucine-threshold and protein-distribution reviews; AHA sugar guidance; Reynolds 2019 on fibre; Halton &amp; Hu on satiety) are in the "Why It Works" tab of the free app at the70gprotein.com.</p>
    <p class="med">Educational, not medical advice. 70&nbsp;g per meal is a deliberately high target — match your <em>total</em> daily protein to your size and goals. If you have kidney disease, are pregnant, or have a medical condition, talk to your doctor or a registered dietitian first.</p>
  </div>`;
}

function weekPages() {
  return WEEKS.map((w) => {
    const days = w.days || (planById(w.planId) ? planById(w.planId).days : []);
    const focus = w.focus.map((f) => "<li>" + esc(f) + "</li>").join("");
    return `
    <div class="page weekcover" style="background-image:linear-gradient(180deg,rgba(13,33,24,.62),rgba(13,33,24,.86)),url('${imgAbs(w.img)}')">
      <div class="wc-inner">
        <span class="wc-kick">WEEK ${w.n}</span>
        <h2 class="wc-title">${esc(w.theme)}</h2>
        <p class="wc-goal">${esc(w.goal)}</p>
      </div>
    </div>
    <div class="page">
      <span class="kick">WEEK ${w.n} · ${esc(w.theme).toUpperCase()}</span>
      <h2>This week's focus</h2>
      <ul class="focus">${focus}</ul>
      <div class="callout habit"><strong>Habit to build this week:</strong> ${esc(w.habit)}</div>
      <div class="callout tip"><strong>Chef's tip:</strong> ${esc(w.tip)}</div>
    </div>
    <div class="page">
      <span class="kick">WEEK ${w.n} · ${esc(w.theme).toUpperCase()}</span>
      <h2>Your week at a glance</h2>
      <p class="note">Three meals a day ≈ 210&nbsp;g of protein. Cook in any order; the optional snack takes a day to ~280&nbsp;g for heavier-training or bigger-appetite days. Find every recipe in your cookbook PDF or in the free app.</p>
      ${planGrid(days)}
    </div>
    <div class="page">
      <span class="kick">WEEK ${w.n} · ${esc(w.theme).toUpperCase()}</span>
      <h2>Week ${w.n} shopping list</h2>
      <p class="note">Everything for the week's breakfasts, lunches and dinners (one serving of each), summed and grouped by aisle. Snacks and pantry staples (oil, salt, spices) not included — check your cupboard. Scale up if you're cooking for more than one.</p>
      ${shoppingBlock(days)}
    </div>`;
  }).join("");
}

function guideHTML() {
  return `<!doctype html><html><head><meta charset="utf8"><style>${GUIDE_CSS}</style></head><body>

<!-- COVER -->
<div class="page cover" style="background-image:linear-gradient(160deg,rgba(13,33,24,.55) 0%,rgba(13,33,24,.50) 40%,rgba(13,33,24,.92) 100%),url('${imgAbs("img/book/hero.jpg")}')">
  <div class="cover-top">
    <div class="kick gold">A 28-DAY PROGRAM · BY BENGISU SENGUL, CHEF</div>
  </div>
  <div class="cover-mid">
    <h1>The 4-Week<br><span class="g">70&nbsp;g Protein</span><br>Reset</h1>
    <p class="cover-sub">Eat real, crave-worthy food. Hit your protein. Cut the sugar. Feel like yourself again — in 28 days.</p>
  </div>
  <div class="cover-bot">
    <div class="cover-badge"><b>~210 g</b><span>protein / day</span></div>
    <div class="cover-badge"><b>4 weeks</b><span>done-for-you</span></div>
    <div class="cover-badge"><b>&lt;20 g</b><span>net carbs / meal</span></div>
  </div>
</div>

<!-- TITLE / COPYRIGHT -->
<div class="page title">
  <h2 class="tt">The 4-Week 70&nbsp;g Protein Reset</h2>
  <p class="tt-sub">A structured 28-day high-protein, low-sugar program</p>
  <p class="tt-by">by Bengisu Sengul · Professional Chef</p>
  <div class="tt-rule"></div>
  <p class="tt-meta">First Edition · ${SITE}<br>Companion to <em>The 70&nbsp;g Protein Cookbook</em> (100 recipes)</p>
  <p class="tt-copy">© ${new Date().getFullYear()} Bengisu Sengul. For personal use by the purchaser. Please don't redistribute — independent creators live or die by your support, and I'd rather spend my time writing you new recipes than chasing copies. Educational only; not medical advice.</p>
</div>

<!-- WELCOME -->
<div class="page">
  <span class="kick">WELCOME</span>
  <h2>You don't need more willpower. You need a plan that feeds you.</h2>
  <p class="lede">I'm Bengisu — a chef who once felt tired, heavy and stuck in my own body, surrounded by food all day. What pulled me out wasn't a crash diet. It was two boring, powerful rules: <strong>eat enough protein, and cut the sugar</strong> — without ever eating food I didn't love. I felt alive again in about two weeks. This is that, made repeatable for you.</p>
  <p>Here's the honest truth most plans won't tell you: people don't fail because they're weak. They fail because they're <em>hungry</em>, <em>bored</em>, and <em>improvising</em> three times a day. High-protein meals fix the hunger. A rotating, genuinely tasty menu fixes the boredom. And this program fixes the improvising — for 28 days, the thinking is already done.</p>
  <p>Four weeks isn't magic. But it's long enough to feel the difference — steadier energy, fewer cravings, clothes fitting better — and to turn "I'm trying to eat better" into "this is just how I eat now." That second thing is the whole prize.</p>
  <p>So: cook the food. Enjoy it. Don't be perfect — be consistent. I'll be in your corner the whole way.</p>
  <p class="sign">— Bengisu</p>
</div>

<!-- HOW IT WORKS -->
<div class="page">
  <span class="kick">THE PLAN</span>
  <h2>How the Reset works</h2>
  <p class="lede">Three rules, four weeks, zero guesswork.</p>
  <div class="rules">
    <div class="rule"><span class="rn">1</span><div><h3>~70 g of protein at every main meal</h3><p>Three meals a day ≈ 210&nbsp;g — enough to protect and build muscle, and enough to keep you genuinely full. Add an optional protein snack on hungry or training days.</p></div></div>
    <div class="rule"><span class="rn">2</span><div><h3>Under ~20 g of net carbs per meal</h3><p>Very low sugar, carbs from vegetables and whole foods. This is what kills the cravings and the energy crashes.</p></div></div>
    <div class="rule"><span class="rn">3</span><div><h3>Real food you actually want to eat</h3><p>No shakes-only nonsense, no sad chicken and broccoli every night. Every meal is a proper recipe a chef would cook for herself.</p></div></div>
  </div>
  <h3>The four-week arc</h3>
  <div class="arc">
    <div class="arcw"><b>Week 1 · Foundation</b><span>Get the system in. Just hit protein, every meal.</span></div>
    <div class="arcw"><b>Week 2 · Momentum</b><span>Beat boredom with brighter, Mediterranean flavours.</span></div>
    <div class="arcw"><b>Week 3 · Lean &amp; Light</b><span>Dial it in: max protein, lowest calories.</span></div>
    <div class="arcw"><b>Week 4 · Lock-In</b><span>A favourites tour — then learn to build it yourself.</span></div>
  </div>
  <p class="note">Each week you get: a focus, a habit to build, a chef's tip, a full day-by-day meal plan, and a ready-made shopping list. Every recipe lives in your <strong>cookbook PDF</strong> and in the <strong>free app</strong> (the70gprotein.com), where you can scale portions to your bodyweight and tick recipes off as you cook them.</p>
</div>

<!-- SETUP -->
<div class="page">
  <span class="kick">BEFORE YOU START</span>
  <h2>Set yourself up to win</h2>
  <p class="lede">Twenty minutes of setup is worth more than all the motivation in the world. Do these five things before day one.</p>
  <ol class="setup">
    <li><strong>Pick your start day.</strong> Most people do best starting on a Sunday or Monday so the big shop and the first prep land on a quieter day.</li>
    <li><strong>Find your protein number.</strong> 70&nbsp;g per meal suits most adults. If you're smaller, older, or eating more or fewer meals, open the free app's protein-target calculator — it scales every portion to you in one tap.</li>
    <li><strong>Do one big shop.</strong> Use this week's list (it's already summed and sorted by aisle). One trip beats five.</li>
    <li><strong>Batch your proteins.</strong> Roast or pan-cook 2–3 days of chicken, beef, salmon or tofu at once. Cooked protein in the fridge is the difference between sticking to this and ordering takeaway.</li>
    <li><strong>Stock a flavour shelf.</strong> Lemons, good olive oil, feta, Greek yogurt, mustard, hot sauce, fresh herbs, garlic. These turn "fuel" into food you look forward to.</li>
  </ol>
  <div class="callout tip"><strong>Eating out?</strong> You can do this anywhere. Order a protein (steak, chicken, fish, eggs) plus vegetables or salad; skip the bread, fries and sugary drinks; ask for sauces on the side. You'll hit the plan at almost any restaurant.</div>
</div>

${scienceDistilled()}

${weekPages()}

<!-- TROUBLESHOOTING -->
<div class="page">
  <span class="kick">WHEN IT GETS HARD</span>
  <h2>Troubleshooting</h2>
  <div class="faq">
    <h3>"I'm hungry."</h3>
    <p>First, eat your full protein portion — most hunger on this plan is an under-eaten protein. Still hungry? Add an optional snack, or a fist of vegetables and a glass of water. Real hunger an hour after a 70&nbsp;g meal is rare; habit and thirst are the usual culprits.</p>
    <h3>"I'm bored of the food."</h3>
    <p>Swap within the same meal slot — any breakfast for any breakfast. You have 100 recipes; you will not run out. Change one flavour lever (a different sauce, herb or spice) and a familiar protein feels new.</p>
    <h3>"The scale isn't moving."</h3>
    <p>Weight is noisy — water, hormones and salt swing it by pounds overnight. Judge progress over two weeks, not two days, and use photos, the tape measure and how your clothes fit. If it's genuinely stalled by week 3, lean on the Lean &amp; Light recipes and tighten portions slightly.</p>
    <h3>"I slipped / had a bad day."</h3>
    <p>One meal, or one day, changes nothing. The only mistake is using a slip as a reason to quit. Next meal, hit your protein. That's it. Consistency beats perfection every single time.</p>
    <h3>"I'm vegetarian."</h3>
    <p>The plan works — there are plenty of meat-free 70&nbsp;g meals (tofu, edamame, eggs, dairy, Greek yogurt, halloumi, paneer). In the app, flip on "Vegetarian only" and build your weeks from those.</p>
    <h3>"I'm cooking for a family."</h3>
    <p>Scale the shopping list by the number of people. The recipes are one serving each; double or triple the quantities. Non-dieters at the table just add a carb (rice, potatoes, bread) to their own plate.</p>
  </div>
</div>

<!-- PROGRESS -->
<div class="page">
  <span class="kick">TRACK IT</span>
  <h2>Measure what matters</h2>
  <p class="lede">The scale lies; trends don't. Take two minutes at the start, and again at the end of each week. Print the check-in sheet from your <em>Printables Pack</em>, or jot the numbers here.</p>
  <table class="checkin">
    <tr><th>Check-in</th><th>Weight</th><th>Waist</th><th>Energy /10</th><th>Sleep /10</th><th>How clothes fit</th></tr>
    ${["Start (Day 0)", "End of Week 1", "End of Week 2", "End of Week 3", "End of Week 4"].map((l) => "<tr><td class='ci'>" + l + "</td><td></td><td></td><td></td><td></td><td></td></tr>").join("")}
  </table>
  <div class="callout"><strong>Take a photo on day one</strong> — same light, same spot, same time of day. In four weeks it'll tell you more than any number on the scale.</div>
  <h3>The non-scale wins to watch for</h3>
  <ul class="focus">
    <li>Fewer cravings and no afternoon energy crash (usually by the end of week 1).</li>
    <li>Steadier mood and better sleep.</li>
    <li>Clothes — especially waistbands — fitting more easily.</li>
    <li>Cooking high-protein on autopilot, without checking the plan.</li>
  </ul>
</div>

<!-- AFTER -->
<div class="page">
  <span class="kick">AFTER THE 28 DAYS</span>
  <h2>Keep what you built</h2>
  <p class="lede">A reset that ends with a binge isn't a reset — it's a diet. Here's how to keep your results for good.</p>
  <ol class="setup">
    <li><strong>Keep the protein anchor forever.</strong> It's not a "diet rule," it's just a better way to eat. Hold ~1.6&nbsp;g/kg/day most days and your body composition takes care of itself.</li>
    <li><strong>Relax the carbs slightly, keep the sugar low.</strong> If you want to add some rice, fruit or potatoes back, do it around training and keep added sugar rare. The sugar discipline is what protects the energy and the cravings.</li>
    <li><strong>Run it on repeat.</strong> Rotate your favourite weeks. Re-run the whole Reset any time you've drifted — it works every time precisely because it's simple.</li>
    <li><strong>Plan every week in the app.</strong> Two minutes on a Sunday, one tap for the shopping list, and you never improvise your way off-plan again.</li>
  </ol>
  <div class="callout tip"><strong>What's next:</strong> I'm building monthly fresh meal plans and new seasonal recipes for people who want to keep going. Stay on the email list (you're on it if you got this) and you'll be the first to know.</div>
</div>

<!-- CLOSING / CTA -->
<div class="page cta">
  <h2 class="cta-h">You started. That's everything.</h2>
  <p class="cta-p">Most people never get past "I should." You're four weeks in. Whatever the scale says, you've proven you can feed yourself well — and that skill doesn't expire.</p>
  <p class="cta-p">Your tools, always free:</p>
  <div class="cta-links">
    <div class="cta-card"><b>The free app</b><span>Plan any week, scale to your body, auto-build the shopping list, tick off recipes.</span><span class="u">${SITE}</span></div>
    <div class="cta-card"><b>Your cookbook</b><span>All 100 recipes with photos, macros, swaps and the full science — yours in this bundle.</span></div>
  </div>
  <p class="cta-sign">Greetings to yourself — you began again, and that's the hardest part.<br>— Bengisu Sengul, Chef</p>
</div>

</body></html>`;
}

// ============================================================
//  PRINTABLES PACK
// ============================================================
function trackerGrid() {
  let rows = "";
  for (let d = 1; d <= 28; d++) {
    rows += "<tr><td class='dn'>Day " + d + "</td><td class='hb'></td><td class='hb'></td><td class='hb'></td><td class='hb'></td><td class='note-cell'></td></tr>";
  }
  return `<table class="tracker">
    <tr><th>Day</th><th>3 protein meals</th><th>Sugar low</th><th>Water</th><th>Moved / walked</th><th>Notes</th></tr>
    ${rows}
  </table>`;
}

function printablesHTML() {
  const planPages = WEEKS.map((w) => {
    const days = w.days || (planById(w.planId) ? planById(w.planId).days : []);
    return `<div class="page">
      <h2>Week ${w.n} · ${esc(w.theme)} — meal plan</h2>
      <p class="note">Three meals a day ≈ 210&nbsp;g protein. The optional snack adds ~70&nbsp;g. Find every recipe in your cookbook or the free app at the70gprotein.com.</p>
      ${planGrid(days)}
    </div>
    <div class="page">
      <h2>Week ${w.n} shopping list</h2>
      <p class="note">Everything for the week's breakfasts, lunches &amp; dinners (one serving each), summed and grouped by aisle. Tick as you shop. Pantry staples and snacks not included.</p>
      ${shoppingBlock(days, { checkbox: true })}
    </div>`;
  }).join("");
  return `<!doctype html><html><head><meta charset="utf8"><style>${PRINT_CSS}</style></head><body>
  <div class="page coverp">
    <div class="kick gold">PRINT &amp; STICK ON THE FRIDGE</div>
    <h1>The 4-Week Reset<br>Printables Pack</h1>
    <p>Weekly plans · shopping lists · a 28-day habit tracker · a weekly check-in log. Print what you need; tick as you go.</p>
    <p class="by">by Bengisu Sengul · the70gprotein.com</p>
  </div>
  ${planPages}
  <div class="page">
    <h2>28-Day habit tracker</h2>
    <p class="note">Tick a box each day you hit it. Aim for progress, not a perfect grid — a row of mostly-ticks is a winning week.</p>
    ${trackerGrid()}
  </div>
  <div class="page">
    <h2>Weekly check-in log</h2>
    <p class="note">Same time of day, same conditions. Judge the trend over the whole month, not day to day.</p>
    <table class="checkin">
      <tr><th>Check-in</th><th>Weight</th><th>Waist</th><th>Energy /10</th><th>Sleep /10</th><th>Win of the week</th></tr>
      ${["Start (Day 0)", "End of Week 1", "End of Week 2", "End of Week 3", "End of Week 4"].map((l) => "<tr><td class='ci'>" + l + "</td><td></td><td></td><td></td><td></td><td></td></tr>").join("")}
    </table>
    <div class="callout"><strong>Photo log:</strong> front / side photo on Day 0 and Day 28, same light and spot. It's the most honest progress tracker there is.</div>
  </div>
  </body></html>`;
}

// ============================================================
//  CSS
// ============================================================
const GUIDE_CSS = `
 @page{size:A4;margin:0}
 *{box-sizing:border-box}
 body{font-family:Georgia,'Times New Roman',serif;color:#2c2620;margin:0;font-size:12.5pt;line-height:1.55}
 .page{page-break-after:always;padding:20mm 18mm;min-height:297mm;position:relative}
 h1,h2,h3,h4,.kick,.cover-badge b,.hero-stats,.tt,.cta-h,.wc-title{font-family:'Helvetica Neue',Arial,sans-serif}
 .kick{display:inline-block;letter-spacing:.18em;font-size:10pt;font-weight:800;color:#2f7d52;margin-bottom:6px}
 .kick.gold{color:#caa233}
 h2{font-size:25pt;color:#1d4e34;line-height:1.1;margin:.1em 0 .5em;letter-spacing:-.01em}
 h3{font-size:14.5pt;color:#23402e;margin:1.1em 0 .3em}
 .lede{font-size:14pt;color:#4b4239;line-height:1.5}
 p{margin:0 0 .8em}
 .note{font-size:10.5pt;color:#6b6157;line-height:1.45}
 .src{font-size:9.5pt;color:#8a8074;margin-top:14px;font-style:italic}
 .med{font-size:9.5pt;color:#8a8074;margin-top:8px;border-top:1px solid #e7ddd0;padding-top:8px}
 .sign{font-style:italic;color:#1d4e34;font-size:14pt;margin-top:14px}
 em{color:#1d4e34}

 /* COVER */
 .cover{background-size:cover;background-position:center;color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:24mm 18mm}
 .cover .kick.gold{color:#f1dca6}
 .cover-mid{margin-top:auto}
 .cover h1{font-family:'Helvetica Neue',Arial,sans-serif;font-weight:800;font-size:50pt;line-height:1.0;margin:0;letter-spacing:-.02em;text-shadow:0 2px 30px rgba(0,0,0,.35)}
 .cover h1 .g{color:#e9c860;font-style:normal}
 .cover-sub{font-family:Georgia,serif;font-size:15pt;line-height:1.45;max-width:24em;margin-top:14px;opacity:.96}
 .cover-bot{display:flex;gap:14px;margin-top:26px}
 .cover-badge{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.3);border-radius:12px;padding:10px 16px;text-align:center}
 .cover-badge b{display:block;font-size:18pt;color:#fff}
 .cover-badge span{font-size:8.5pt;letter-spacing:.05em;text-transform:uppercase;opacity:.85}

 /* TITLE */
 .title{text-align:center;display:flex;flex-direction:column;justify-content:center}
 .tt{font-size:26pt;color:#1d4e34}
 .tt-sub{font-size:13pt;color:#5b5048}
 .tt-by{font-style:italic;color:#5b5048;margin-top:4px}
 .tt-rule{width:60px;height:3px;background:#e0b13a;margin:22px auto}
 .tt-meta{font-size:11pt;color:#6b6157}
 .tt-copy{font-size:9.5pt;color:#8a8074;max-width:34em;margin:30px auto 0;line-height:1.5}

 /* RULES + ARC */
 .rules{margin:8px 0 6px}
 .rule{display:flex;gap:14px;align-items:flex-start;margin:12px 0}
 .rn{flex:0 0 auto;width:34px;height:34px;border-radius:50%;background:#2f7d52;color:#fff;font-family:Arial;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:15pt}
 .rule h3{margin:.1em 0 .15em}
 .rule p{margin:0;font-size:11.5pt;color:#4b4239}
 .arc{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px}
 .arcw{background:#f4efe3;border-left:3px solid #2f7d52;border-radius:8px;padding:10px 12px}
 .arcw b{display:block;font-family:Arial;font-size:11pt;color:#1d4e34}
 .arcw span{font-size:10.5pt;color:#5b5048}

 /* SETUP / FOCUS / FAQ */
 ol.setup,ul.focus{padding-left:20px;line-height:1.5}
 ol.setup li,ul.focus li{margin:7px 0}
 .faq h3{margin:14px 0 .2em;color:#1d4e34}
 .faq p{font-size:11.5pt;color:#4b4239;margin:0}

 /* CALLOUTS */
 .callout{background:#f4efe3;border-radius:10px;padding:12px 14px;margin:14px 0;font-size:11.5pt;line-height:1.45}
 .callout.tip{background:#fbf3dd;border-left:3px solid #e0b13a}
 .callout.habit{background:#eaf3ec;border-left:3px solid #2f7d52}

 /* SCIENCE */
 .sci h3{font-size:13pt;margin:12px 0 .15em}
 .sci p{font-size:11.5pt;color:#4b4239;margin:0 0 .3em}

 /* WEEK COVER */
 .weekcover{background-size:cover;background-position:center;color:#fff;display:flex;align-items:flex-end;padding:24mm 18mm}
 .wc-kick{display:inline-block;letter-spacing:.22em;font-family:Arial;font-weight:800;font-size:11pt;color:#f1dca6}
 .wc-title{font-size:40pt;line-height:1.04;font-weight:800;margin:.08em 0 .25em;letter-spacing:-.02em;text-shadow:0 2px 24px rgba(0,0,0,.35)}
 .wc-goal{font-family:Georgia,serif;font-size:14pt;line-height:1.45;max-width:30em;opacity:.96}

 /* TABLES */
 table.plan{width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:9.5pt;margin-top:8px}
 table.plan th{background:#1d4e34;color:#fff;padding:7px 6px;text-align:left;font-size:9pt}
 table.plan td{border-bottom:1px solid #e2d7c6;padding:6px;vertical-align:top}
 table.plan td.day{font-weight:700;background:#f6efe3;white-space:nowrap}
 table.plan td.snack{color:#6b6157;font-style:italic}
 table.plan td.total{font-weight:700;color:#2f7d52;white-space:nowrap}

 .checkin{width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:10pt;margin-top:10px}
 .checkin th{background:#2f7d52;color:#fff;padding:8px;text-align:left}
 .checkin td{border:1px solid #d8ccb8;padding:14px 8px}
 .checkin td.ci{font-weight:700;background:#f6efe3;padding:8px}

 /* SHOPPING */
 .shop{column-count:3;column-gap:16px}
 .aisle{break-inside:avoid;margin-bottom:9px}
 .aisle h4{font-family:Arial;font-size:9.5pt;color:#1d4e34;border-bottom:2px solid #e0b13a;padding-bottom:2px;margin:0 0 3px}
 .aisle ul{list-style:none;padding:0;margin:0;font-size:9.3pt;line-height:1.4}
 .aisle li{padding:.5px 0}
 .qn{font-weight:700;color:#2c2620}

 /* CTA */
 .cta{display:flex;flex-direction:column;justify-content:center;text-align:center}
 .cta-h{font-size:26pt}
 .cta-p{font-size:13pt;color:#4b4239;max-width:32em;margin:0 auto .7em}
 .cta-links{display:flex;gap:14px;justify-content:center;margin:16px 0}
 .cta-card{background:#f4efe3;border-radius:12px;padding:16px;width:240px;text-align:left}
 .cta-card b{font-family:Arial;color:#1d4e34;display:block;margin-bottom:4px}
 .cta-card span{display:block;font-size:10.5pt;color:#5b5048;margin-bottom:4px}
 .cta-card .u{color:#2f7d52;font-weight:700;font-size:10pt}
 .cta-sign{font-style:italic;color:#1d4e34;font-size:13pt;margin-top:18px}
`;

const PRINT_CSS = `
 @page{size:A4;margin:14mm}
 *{box-sizing:border-box}
 body{font-family:'Helvetica Neue',Arial,sans-serif;color:#2c2620;margin:0;font-size:10pt}
 .page{page-break-after:always}
 h1{font-size:30pt;color:#1d4e34;line-height:1.05;margin:.2em 0}
 h2{font-size:17pt;color:#1d4e34;border-bottom:2px solid #2f7d52;padding-bottom:5px;margin:0 0 8px}
 .kick{letter-spacing:.16em;font-size:9.5pt;font-weight:800;color:#2f7d52}
 .kick.gold{color:#caa233}
 .coverp{text-align:center;padding-top:60mm}
 .coverp p{font-size:12pt;color:#5b5048;max-width:30em;margin:10px auto}
 .coverp .by{font-style:italic;font-size:11pt;margin-top:30px}
 .note{font-size:9.5pt;color:#6b6157;margin:0 0 8px}
 table.plan{width:100%;border-collapse:collapse;font-size:8.7pt}
 table.plan th{background:#1d4e34;color:#fff;padding:6px 5px;text-align:left}
 table.plan td{border-bottom:1px solid #e2d7c6;padding:5px;vertical-align:top}
 table.plan td.day{font-weight:700;background:#f6efe3;white-space:nowrap}
 table.plan td.snack{color:#6b6157;font-style:italic}
 table.plan td.total{font-weight:700;color:#2f7d52}
 .shop{column-count:3;column-gap:14px;margin-top:6px}
 .aisle{break-inside:avoid;margin-bottom:8px}
 .aisle h4{font-size:9.5pt;color:#1d4e34;border-bottom:1.5px solid #e0b13a;padding-bottom:2px;margin:0 0 3px}
 .aisle ul{list-style:none;padding:0;margin:0;font-size:9pt;line-height:1.55}
 .cb{display:inline-block;width:10px;height:10px;border:1.4px solid #1d4e34;border-radius:3px;margin-right:5px;vertical-align:middle}
 .qn{font-weight:700}
 .tracker{width:100%;border-collapse:collapse;font-size:9.5pt}
 .tracker th{background:#2f7d52;color:#fff;padding:7px 5px;text-align:left}
 .tracker td{border:1px solid #d8ccb8;padding:6px 5px}
 .tracker td.dn{font-weight:700;background:#f6efe3;white-space:nowrap}
 .tracker td.hb{width:90px}
 .checkin{width:100%;border-collapse:collapse;font-size:10pt}
 .checkin th{background:#2f7d52;color:#fff;padding:8px;text-align:left}
 .checkin td{border:1px solid #d8ccb8;padding:16px 8px}
 .checkin td.ci{font-weight:700;background:#f6efe3;padding:8px;white-space:nowrap}
 .callout{background:#fbf3dd;border-left:3px solid #e0b13a;border-radius:8px;padding:10px 12px;margin-top:12px;font-size:10pt}
`;

// ============================================================
//  RENDER
// ============================================================
(async () => {
  const puppeteer = require("puppeteer");
  if (!fs.existsSync(path.join(ROOT, "dist"))) fs.mkdirSync(path.join(ROOT, "dist"));
  if (!fs.existsSync(path.join(ROOT, "book"))) fs.mkdirSync(path.join(ROOT, "book"));

  const guideTmp = path.join(ROOT, "_reset-guide.build.html");
  const printTmp = path.join(ROOT, "_reset-print.build.html");
  fs.writeFileSync(guideTmp, guideHTML());
  fs.writeFileSync(printTmp, printablesHTML());

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });

  const g = await browser.newPage();
  await g.goto("file://" + guideTmp, { waitUntil: "networkidle0" });
  await g.pdf({ path: path.join(ROOT, "dist", "the-4-week-reset.pdf"), format: "A4", printBackground: true });

  const p = await browser.newPage();
  await p.goto("file://" + printTmp, { waitUntil: "networkidle0" });
  await p.pdf({ path: path.join(ROOT, "book", "reset-printables.pdf"), format: "A4", printBackground: true });

  await browser.close();
  fs.unlinkSync(guideTmp);
  fs.unlinkSync(printTmp);

  const mb = (f) => Math.round(fs.statSync(f).size / 1024 / 1024 * 10) / 10;
  const kb = (f) => Math.round(fs.statSync(f).size / 1024);
  console.log("✓ dist/the-4-week-reset.pdf (" + mb(path.join(ROOT, "dist", "the-4-week-reset.pdf")) + " MB) — compress into book/");
  console.log("✓ book/reset-printables.pdf (" + kb(path.join(ROOT, "book", "reset-printables.pdf")) + " KB)");
})().catch((e) => { console.error(e); process.exit(1); });
