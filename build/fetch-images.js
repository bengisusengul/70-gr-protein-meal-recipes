/*
 * fetch-images.js
 * ------------------------------------------------------------------
 * Downloads one professional food photo per recipe from Pexels
 * (free, allowed for commercial use, no attribution required) into
 * img/recipes/<id>.jpg, then regenerates js/recipe-images.js and a
 * CREDITS.md photo-credit list.
 *
 * Pexels photos can be used in a cookbook you sell; you just can't
 * resell the photos themselves as stock. Keeping CREDITS.md is good
 * practice even though attribution isn't required.
 *
 * USAGE (needs network access to api.pexels.com + a free key):
 *   1. Get a free key at https://www.pexels.com/api/
 *   2. export PEXELS_API_KEY=xxxxxxxx
 *   3. npm run fetch:images
 *
 * Re-run anytime; it skips ids that already have an image unless you
 * pass --force. To improve a specific recipe's photo, delete its
 * img/recipes/<id>.jpg and re-run (it will only re-fetch the missing
 * ones), optionally adding/adjusting its entry in PHOTO_QUERIES below.
 *
 * Two quality safeguards:
 *  - PHOTO_QUERIES: per-recipe search overrides for recipes whose name
 *    confuses generic search (e.g. "rolls" -> sushi, "muffin" -> sandwich).
 *  - de-duplication: similar recipe names otherwise return the SAME top
 *    photo. We request several candidates and pick the first Pexels photo
 *    id not already used by another recipe, so every recipe is distinct.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const KEY = process.env.PEXELS_API_KEY;
const FORCE = process.argv.indexOf("--force") !== -1;
const ROOT = path.join(__dirname, "..");
const IMG_DIR = path.join(ROOT, "img", "recipes");

if (!KEY) {
  console.error("\nMissing PEXELS_API_KEY.\n  Get a free key at https://www.pexels.com/api/ then:\n  export PEXELS_API_KEY=xxxx && npm run fetch:images\n");
  process.exit(1);
}

// Per-recipe search overrides. Keys are recipe ids. Use when the recipe
// name leads generic search to the wrong dish, or to keep look-alikes apart.
var PHOTO_QUERIES = {
  // --- corrected mismatches ---
  "roast-beef-cream-cheese-rollups": "pinwheel roll ups deli meat",
  "chocolate-pb-protein-smoothie": "chocolate smoothie glass drink",
  "ham-cheese-egg-muffins": "mini frittata egg bites",
  "smoked-salmon-cucumber-rolls": "cucumber rolls smoked salmon appetizer",
  "buffalo-chicken-lettuce-cups": "chicken salad lettuce cups",
  "turkey-cheese-snack-box": "turkey cheese pinwheels",
  "tuna-stuffed-avocado": "avocado tuna salad",
  "greek-yogurt-protein-mousse": "chocolate mousse dessert cup spoon",
  "spinach-feta-egg-white-scramble": "scrambled eggs spinach feta plate",
  "seared-tuna-sesame-bok-choy": "seared ahi tuna sliced plate",
  "beef-jerky-cheese-plate": "beef jerky cheese snack board",
  // --- de-duplicated look-alikes (distinct query per recipe) ---
  "cottage-smoked-salmon-bowl": "smoked salmon cottage cheese breakfast bowl",
  "smoked-salmon-egg-rollups": "smoked salmon canape cream cheese",
  "smoked-salmon-cream-cheese-omelette": "salmon omelette eggs plate",
  "greek-chicken-salad-bowl": "greek salad chicken olives feta cucumber",
  "cottage-cheese-cucumber-plate": "cottage cheese cucumber plate",
  "tofu-edamame-sesame-bowl": "crispy tofu buddha bowl",
  "edamame-tofu-poke-bowl": "poke bowl tofu edamame avocado",
  "baked-trout-lemon-asparagus": "baked trout fillet asparagus lemon",
  "chicken-piccata-zoodles": "chicken piccata lemon capers zucchini noodles",
  "chicken-shawarma-salad-bowl": "chicken shawarma salad bowl",
  "chicken-tikka-salad-bowl": "chicken tikka salad bowl",
  "smoked-mackerel-egg-salad-plate": "smoked mackerel egg salad plate",
  "smoked-trout-egg-salad": "smoked trout fillet egg salad plate",
  "salmon-egg-protein-pot": "salmon scrambled eggs breakfast plate",
  "ricotta-berry-protein-bowl": "whipped ricotta berries bowl"
};

// Recipes intentionally left to the built-in SVG illustration because no
// suitable, on-brand stock photo exists — e.g. a "bunless" low-carb dish that
// photo search only returns as a regular bunned burger with fries. The app and
// the PDF fall back to the SVG automatically when an id is absent from the
// manifest, so this is cleaner than shipping a misleading photo.
var SKIP = { "bunless-cheeseburger-bowl": 1 };

// load recipe data the same way the browser does
global.window = {};
require(path.join(ROOT, "js", "recipes-data.js"));
var RECIPES = global.window.RECIPES || [];

if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

// A photogenic search query per recipe: explicit override, else drop
// parentheticals & filler words from the name.
function queryFor(r) {
  if (PHOTO_QUERIES[r.id]) return PHOTO_QUERIES[r.id];
  var n = r.name.replace(/\(.*?\)/g, "").replace(/[-–]/g, " ").trim();
  return n + " food";
}

// Parse the existing CREDITS.md so a partial re-fetch preserves the
// credits (and photo ids, for de-dup) of recipes we are NOT re-fetching.
function parseCredits() {
  var map = {};
  var p = path.join(ROOT, "CREDITS.md");
  if (!fs.existsSync(p)) return map;
  fs.readFileSync(p, "utf8").split("\n").forEach(function (line) {
    var m = line.match(/^- \*\*(.+?)\*\* — photo by (.+?) \((https?:\/\/\S+)\)/);
    if (m) map[m[1]] = { by: m[2], url: m[3] };
  });
  return map;
}
function photoIdFromUrl(u) { var m = (u || "").match(/-(\d+)\/?$/); return m ? m[1] : null; }

function getJSON(url) {
  return new Promise(function (resolve, reject) {
    https.get(url, { headers: { Authorization: KEY } }, function (res) {
      var data = "";
      res.on("data", function (c) { data += c; });
      res.on("end", function () {
        if (res.statusCode !== 200) return reject(new Error("HTTP " + res.statusCode + " " + data.slice(0, 120)));
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

function download(url, dest) {
  return new Promise(function (resolve, reject) {
    var file = fs.createWriteStream(dest);
    https.get(url, function (res) {
      if (res.statusCode !== 200) return reject(new Error("img HTTP " + res.statusCode));
      res.pipe(file);
      file.on("finish", function () { file.close(function () { resolve(); }); });
    }).on("error", function (e) { fs.unlink(dest, function () {}); reject(e); });
  });
}

function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

async function main() {
  var existing = parseCredits();
  var creditByName = {};
  Object.keys(existing).forEach(function (n) { creditByName[n] = existing[n]; });

  // Seed the used-photo set with the photos of recipes we will SKIP, so
  // re-fetched recipes never duplicate a photo we are keeping.
  var usedPhotoIds = {};
  RECIPES.forEach(function (r) {
    var dest = path.join(IMG_DIR, r.id + ".jpg");
    if (fs.existsSync(dest) && !FORCE) {
      var pid = photoIdFromUrl((existing[r.name] || {}).url);
      if (pid) usedPhotoIds[pid] = true;
    }
  });

  var done = [];
  for (var i = 0; i < RECIPES.length; i++) {
    var r = RECIPES[i];
    var dest = path.join(IMG_DIR, r.id + ".jpg");
    if (SKIP[r.id]) { if (fs.existsSync(dest)) { try { fs.unlinkSync(dest); } catch (e) {} } continue; }
    if (fs.existsSync(dest) && !FORCE) { done.push(r.id); continue; }
    var url = "https://api.pexels.com/v1/search?per_page=15&orientation=landscape&size=large&query=" + encodeURIComponent(queryFor(r));
    try {
      var json = await getJSON(url);
      var photos = (json.photos || []).filter(function (p) { return p && p.src; });
      var photo = null;
      for (var k = 0; k < photos.length; k++) {
        if (!usedPhotoIds[String(photos[k].id)]) { photo = photos[k]; break; }
      }
      if (!photo) photo = photos[0]; // all candidates already used — fall back
      if (!photo) { console.log("  ✗ no result: " + r.name); continue; }
      usedPhotoIds[String(photo.id)] = true;
      await download(photo.src.large || photo.src.original, dest);
      done.push(r.id);
      creditByName[r.name] = { by: photo.photographer, url: photo.url };
      console.log("  ✓ " + r.name + "  (by " + photo.photographer + ")");
      await sleep(400); // be gentle with the rate limit
    } catch (e) {
      console.log("  ✗ " + r.name + ": " + e.message);
    }
  }

  // regenerate the manifest the app + cookbook read (ids that have a photo)
  fs.writeFileSync(
    path.join(ROOT, "js", "recipe-images.js"),
    "/* auto-generated by build/fetch-images.js — do not edit */\n" +
    "window.RECIPE_IMAGES = " + JSON.stringify(done) + ";\n"
  );

  // write a complete credit list (re-fetched recipes use the new photo,
  // skipped recipes keep their previously-recorded credit)
  var md = "# Photo credits\n\nFood photography from [Pexels](https://www.pexels.com) " +
    "(free for commercial use, no attribution required). Listed here as good practice.\n\n";
  RECIPES.forEach(function (r) {
    if (done.indexOf(r.id) === -1) return;
    var c = creditByName[r.name];
    if (c) md += "- **" + r.name + "** — photo by " + c.by + " (" + c.url + ")\n";
  });
  fs.writeFileSync(path.join(ROOT, "CREDITS.md"), md);

  console.log("\n✓ " + done.length + "/" + RECIPES.length + " recipes have photos. Manifest + CREDITS.md updated.");
  console.log("  Next: npm run build:pdf  (and refresh the web app)\n");
}

main().catch(function (e) { console.error(e); process.exit(1); });
