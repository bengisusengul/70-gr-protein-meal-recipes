/*
 * fetch-multi.js — multi-source, license-safe photo fetcher/selector.
 * ------------------------------------------------------------------
 * Open platforms (keyless except Pexels): Pexels, Openverse (Creative
 * Commons aggregator), TheMealDB. Only commercial-use images; license +
 * attribution recorded per recipe in a persistent store (img/recipes/_credits.json),
 * from which CREDITS.md + js/recipe-images.js are regenerated.
 *
 * Modes:
 *   node build/fetch-multi.js --gather            # download candidates -> img/_candidates/<id>/
 *   node build/fetch-multi.js --promote picks.json# set chosen candidate as img/recipes/<id>.jpg
 *   node build/fetch-multi.js --regen             # rebuild manifest + CREDITS.md from the store
 *
 * REPLACE holds {id: query} for recipes being upgraded this pass.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const IMG = path.join(ROOT, "img", "recipes");
const CAND = path.join(ROOT, "img", "_candidates");
const STORE = path.join(IMG, "_credits.json");
const KEY = process.env.PEXELS_API_KEY || "";

let _recipes = null;
function getRecipes() {
  if (_recipes) return _recipes;
  global.window = {};
  require(path.join(ROOT, "js", "recipes-data.js"));
  _recipes = global.window.RECIPES;
  return _recipes;
}

const REPLACE = {
  "cottage-smoked-salmon-bowl": "smoked salmon cottage cheese bowl",
  "smoked-salmon-egg-rollups": "smoked salmon cream cheese pinwheel",
  "greek-chicken-souvlaki-bowl": "chicken souvlaki greek bowl",
  "greek-yogurt-protein-mousse": "chocolate mousse glass dessert",
  "vanilla-almond-protein-shake": "vanilla milkshake glass",
  "tuna-stuffed-avocado": "avocado boats tuna salad",
  "turkey-cheese-snack-box": "turkey cheese pinwheels plate",
  "smoked-salmon-cream-cheese-omelette": "salmon omelette plate",
  "turkey-bacon-egg-white-wrap": "breakfast egg wrap",
  "kimchi-egg-tofu-scramble": "scrambled tofu turmeric plate",
  "carnitas-pork-cauli-bowl": "pulled pork rice bowl",
  "turkey-club-lettuce-wrap": "turkey lettuce wrap",
  "smoked-trout-egg-salad": "smoked trout salad plate",
  "chicken-tikka-masala-cauli-rice": "chicken tikka masala curry",
  "lamb-kofta-tzatziki": "lamb kofta kebab plate",
  "steak-fajita-bowl": "steak fajita peppers bowl",
  "turkey-burger-slaw": "turkey burger patty plate salad",
  "beef-jerky-cheese-plate": "charcuterie board cured meat cheese",
  "salmon-egg-protein-pot": "smoked salmon scrambled eggs",
  "bunless-cheeseburger-bowl": "ground beef taco salad bowl"
};

function get(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: headers || {} }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => (res.statusCode === 200 ? resolve(d) : reject(new Error("HTTP " + res.statusCode + " " + d.slice(0, 80)))));
    }).on("error", reject);
  });
}
function download(url, dest, hops) {
  hops = hops || 0;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && hops < 4) {
        res.resume(); return resolve(download(res.headers.location, dest, hops + 1));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error("img HTTP " + res.statusCode)); }
      const f = fs.createWriteStream(dest);
      res.pipe(f); f.on("finish", () => f.close(() => resolve()));
    }).on("error", (e) => { try { fs.unlinkSync(dest); } catch (x) {} reject(e); });
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pexels(q, n) {
  if (!KEY) return [];
  try {
    const j = JSON.parse(await get("https://api.pexels.com/v1/search?per_page=" + n + "&orientation=landscape&size=large&query=" + encodeURIComponent(q), { Authorization: KEY }));
    return (j.photos || []).map((p) => ({ source: "Pexels", license: "Pexels (free, no attribution req.)", author: p.photographer, page: p.url, key: "pexels:" + p.id, img: p.src.large || p.src.original }));
  } catch (e) { console.log("   pexels err:", e.message); return []; }
}
async function openverse(q, n, lic) {
  const u = "https://api.openverse.org/v1/images/?page_size=" + n + "&aspect_ratio=wide&" + (lic === "free" ? "license=cc0,pdm" : "license_type=commercial") + "&q=" + encodeURIComponent(q);
  try {
    const j = JSON.parse(await get(u, { "User-Agent": "cookbook-fetch/1.0" }));
    return (j.results || []).filter((r) => r.url).map((r) => ({ source: "Openverse/" + (r.source || "cc"), license: (r.license || "").toUpperCase() + " " + (r.license_version || ""), author: r.creator || "", page: r.foreign_landing_url || r.url, key: "ov:" + r.id, img: r.url }));
  } catch (e) { console.log("   openverse err:", e.message); return []; }
}
async function themealdb(q) {
  try {
    const word = q.split(" ")[0];
    const j = JSON.parse(await get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(word)));
    return (j.meals || []).slice(0, 2).map((m) => ({ source: "TheMealDB", license: "TheMealDB (free use)", author: m.strSource ? "TheMealDB" : "TheMealDB", page: "https://www.themealdb.com/meal/" + m.idMeal, key: "mealdb:" + m.idMeal, img: m.strMealThumb }));
  } catch (e) { return []; }
}

async function gather() {
  if (!fs.existsSync(CAND)) fs.mkdirSync(CAND, { recursive: true });
  const candJson = path.join(CAND, "_candidates.json");
  const only = (process.argv[3] || "").split(",").filter(Boolean);
  const ids = only.length ? only : Object.keys(REPLACE);
  const manifest = (only.length && fs.existsSync(candJson)) ? JSON.parse(fs.readFileSync(candJson, "utf8")) : {};
  for (const id of ids) {
    const q = REPLACE[id];
    const dir = path.join(CAND, id);
    fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    let cands = [];
    cands = cands.concat(await pexels(q, 3));
    cands = cands.concat(await openverse(q, 3, "free"));
    cands = cands.concat(await openverse(q, 2, "commercial"));
    cands = cands.concat(await themealdb(q));
    // de-dup by key
    const seen = {}; cands = cands.filter((c) => (seen[c.key] ? false : (seen[c.key] = 1)));
    const saved = [];
    for (let i = 0; i < cands.length; i++) {
      const c = cands[i];
      const file = path.join(dir, i + ".jpg");
      try { await download(c.img, file); saved.push(Object.assign({ idx: i, file: path.relative(ROOT, file) }, c)); }
      catch (e) { /* skip broken */ }
      await sleep(120);
    }
    manifest[id] = { query: q, candidates: saved };
    console.log("✓ " + id + " — " + saved.length + " candidates (" + saved.map((s) => s.source.split("/")[0]).join(",") + ")");
  }
  fs.writeFileSync(candJson, JSON.stringify(manifest, null, 2));
  console.log("\nWrote " + path.relative(ROOT, path.join(CAND, "_candidates.json")));
}

function loadStore() {
  if (fs.existsSync(STORE)) return JSON.parse(fs.readFileSync(STORE, "utf8"));
  // seed from existing CREDITS.md (Pexels-era entries) keyed by recipe name
  const store = {};
  const cp = path.join(ROOT, "CREDITS.md");
  if (fs.existsSync(cp)) {
    const byName = {}; getRecipes().forEach((r) => (byName[r.name] = r.id));
    fs.readFileSync(cp, "utf8").split("\n").forEach((line) => {
      const m = line.match(/^- \*\*(.+?)\*\* — photo by (.+?) \((https?:\/\/\S+)\)/);
      if (m && byName[m[1]]) store[byName[m[1]]] = { source: "Pexels", license: "Pexels (free, no attribution req.)", author: m[2], page: m[3] };
    });
  }
  return store;
}

function promote(picksFile) {
  const picks = JSON.parse(fs.readFileSync(picksFile, "utf8"));
  const cm = JSON.parse(fs.readFileSync(path.join(CAND, "_candidates.json"), "utf8"));
  const store = loadStore();
  for (const id of Object.keys(picks)) {
    const choice = picks[id];
    if (choice === "skip") { try { fs.unlinkSync(path.join(IMG, id + ".jpg")); } catch (e) {} delete store[id]; console.log("• " + id + " -> SVG fallback"); continue; }
    const cand = (cm[id].candidates || []).find((c) => c.idx === choice);
    if (!cand) { console.log("! no candidate " + choice + " for " + id); continue; }
    fs.copyFileSync(path.join(ROOT, cand.file), path.join(IMG, id + ".jpg"));
    store[id] = { source: cand.source, license: cand.license, author: cand.author, page: cand.page };
    console.log("✓ " + id + " <- " + cand.source + " (#" + choice + ")");
  }
  fs.writeFileSync(STORE, JSON.stringify(store, null, 2));
  regen(store);
}

function regen(store) {
  store = store || loadStore();
  const RECIPES = getRecipes();
  const done = RECIPES.filter((r) => fs.existsSync(path.join(IMG, r.id + ".jpg"))).map((r) => r.id);
  fs.writeFileSync(path.join(ROOT, "js", "recipe-images.js"),
    "/* auto-generated by build/fetch-multi.js — do not edit */\nwindow.RECIPE_IMAGES = " + JSON.stringify(done) + ";\n");
  let md = "# Photo credits\n\nImagery from open platforms (Pexels, Openverse/Creative Commons, TheMealDB), commercial-use only. CC-BY items credited below; Pexels/CC0/public-domain need no attribution.\n\n";
  RECIPES.forEach((r) => {
    if (done.indexOf(r.id) === -1) return;
    const c = store[r.id]; if (!c) { md += "- **" + r.name + "** — (source unrecorded)\n"; return; }
    md += "- **" + r.name + "** — " + (c.source || "") + (c.author ? ", by " + c.author : "") + (c.license ? " [" + c.license.trim() + "]" : "") + (c.page ? " (" + c.page + ")" : "") + "\n";
  });
  fs.writeFileSync(path.join(ROOT, "CREDITS.md"), md);
  console.log("regen: manifest " + done.length + " photos; CREDITS.md updated.");
}

const arg = process.argv[2];
if (arg === "--gather") gather().catch((e) => { console.error(e); process.exit(1); });
else if (arg === "--promote") promote(process.argv[3]);
else if (arg === "--regen") regen();
else console.log("usage: --gather | --promote picks.json | --regen");
