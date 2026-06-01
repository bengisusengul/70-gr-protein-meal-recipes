# PROGRESS — agent handoff notes (read me first in a new session)

> Private working notes for the AI assistant on the **70 g Protein Cookbook**
> project. Not part of the sellable product. Last updated: 2026-06-01.

## TL;DR — where we are
- A full **interactive web app** + a **sellable 112-page PDF cookbook**, both
  generated from the same data. **100 recipes**, all ~70 g protein / low sugar.
- Everything is committed on branch **`claude/high-protein-cookbook-3Av3B`**
  (NOT `main`). Latest commit ~ `03fb582` ("Clickable book + photo support").
- **THE NEXT JOB:** download a real food photo per recipe from **Pexels** and
  wire them in. Blocked only because the default session has **no internet**.
  See "NEXT SESSION" below.

## How to talk to the user
Non-technical, on a Mac/Chrome. Keep it plain, friendly, step-by-step, no
jargon. They sell on the idea of a polished, professional product. Confirm
before anything irreversible. They get confused by GitHub settings — spell
clicks out exactly.

---

## What's built

### Web app (`index.html`) — 5 tabs
Recipes · Plan & Shop · 7-Day Plans · Tracker · Why It Works. Script load order:
`recipes-data, science-data, plans-data, illustrations, swaps, recipe-images,
storage, app`.
- **Recipes:** cards (illustration OR photo), macro badges, search, filters
  (category chips / veg-only / untried), favorite ⭐, mark-as-made ✓, add-to-plan,
  expandable details (ingredients, method, swaps).
- **🎯 Protein-target calculator** (top of Recipes): bodyweight (kg/lb) + goal
  (g/kg) + meals/day → scales every recipe's macros, ingredient qtys, planner
  totals and shopping list. Clamped 0.5–2× of the 70 g base. Persisted (`target`).
- **🧊 "What can I make now?"**: ingredient text box + quick chips + "only what
  I can make now" toggle. Pantry staples ignored. Persisted (`have`).
- **🔄 Swaps**: each recipe auto-lists dairy/nut/soy-free substitutions.
- **Plan & Shop:** plan rows w/ servings steppers, scaled summary, auto shopping
  list grouped by aisle (+icons, checkboxes), **Share/Export** (navigator.share
  → iOS share sheet, clipboard fallback), Print, Uncheck all, Clear plan.
- **7-Day Plans:** 3 plans, optional-snack toggle, "Load into Planner".
- **Tracker:** progress bar + checklist. **Why It Works:** science + refs.
- Mobile-responsive (safe-area insets, 16px inputs, the weekly table stacks
  into day-cards on phones).

### PDF cookbook (`cookbook.html` + `build/build-cookbook.js`)
112 pages: cover → title/copyright → **clickable Contents** → How to Use →
Why It Works (science + 12 refs) → 4 category dividers → 100 recipe pages
(illustration/photo, macro strip, **metric+imperial** ingredients, method,
tip, swaps) → 3 weekly plans → Conversions & protein-chart appendix → A–Z index.
- Built with Puppeteer: `tagged:true, outline:true` (clickable bookmarks),
  running header + footer page numbers, A4 (flip `PAGE_SIZE` to "Letter").
- Metric→imperial via `altMeasure()` in `js/cookbook.js`.
- Branding lives in the `BOOK` config at top of `js/cookbook.js`
  (title, subtitle, author = "Bengisu Sengul", year, website "", edition).

## Key files
```
index.html / cookbook.html        # app shell / print-book shell
css/styles.css                    # app styles (responsive + print)
css/cookbook.css                  # A4 book layout
js/recipes-data.js                # window.RECIPES — 100 recipes
js/science-data.js                # window.SCIENCE {intro, sections[6], references[12]}
js/plans-data.js                  # window.MEAL_PLANS — 3 plans (days[7]{day,meals[3],snack})
js/illustrations.js               # window.ART {hero,pickArtKey,categoryIcon,aisleIcon,headerArt}
js/swaps.js                       # window.SWAPS.forRecipe()
js/recipe-images.js               # window.RECIPE_IMAGES = []  (photo manifest; auto-generated)
js/storage.js                     # window.Store (localStorage)
js/app.js                         # all app logic
build/build-cookbook.js           # Puppeteer -> dist/the-70g-protein-cookbook.pdf
build/fetch-images.js             # Pexels downloader (NEXT JOB)
package.json                      # scripts: build:pdf, fetch:images, serve
book/the-70g-protein-cookbook.pdf # committed copy of the latest built book
img/recipes/                      # photos go here as <id>.jpg (only .gitkeep so far)
.gitignore                        # ignores node_modules, package-lock.json, dist/
```

### Recipe object shape
```js
{ id, name, category:"Breakfast|Lunch|Dinner|Snack", tags:[], vegetarian:bool,
  time:{prep,cook}, macros:{protein:70, netCarbs, fat, fiber, calories},
  ingredients:[{item, qty(|null), unit, aisle}], steps:[], notes }
```
Counts: 20 breakfast / 25 lunch / 33 dinner / 22 snack; 27 vegetarian.
Valid aisles: `Meat & Poultry, Seafood, Eggs & Dairy, Produce, Pantry,
Condiments & Spices, Supplements, Frozen`.

---

## ⭐ NEXT SESSION — fetch recipe photos (the pending task)

**Why pending:** the cookbook/app currently use flat SVG illustrations; the user
wants real professional food photos. Infra is fully built and falls back to SVG
when a photo is missing. Source = **Pexels** (free, commercial use OK, no
attribution required — fine for a paid book; `fetch-images.js` also writes
`CREDITS.md` as good practice).

**Blocker:** default sessions have a locked network policy — every external host
returns `403 "Host not in allowlist"` (only `registry.npmjs.org` is allowed).
Photos can't be fetched until the session has internet.

**Steps when in an internet-enabled session:**
1. Confirm reachability:
   `curl -s -m8 -o /dev/null -w "%{http_code}\n" -H "Authorization: $PEXELS_API_KEY" "https://api.pexels.com/v1/search?query=test&per_page=1"`
   → expect `200` (not `403 Host not in allowlist`).
2. Key: user supplied `PEXELS_API_KEY` (may be set as env var; if not, ask — they
   pasted one in chat previously but plan to regenerate it). Check env first:
   `[ -n "$PEXELS_API_KEY" ] && echo set || echo missing`.
3. Run: `npm run fetch:images` (uses only Node built-ins — no install needed for
   the fetch itself). It downloads one landscape photo per recipe to
   `img/recipes/<id>.jpg`, rewrites `js/recipe-images.js`, writes `CREDITS.md`.
4. Spot-check matches; for weak ones, improve the query (consider adding an
   optional per-recipe `photoQuery` field and reading it in `queryFor()`), or
   re-run a single id. Offer the user a quick list of any to swap.
5. Rebuild the book: `npm install` (gets puppeteer) then `npm run build:pdf`.
   Copy `dist/...pdf` → `book/...pdf`. Send the PDF to the user.
6. Commit `img/recipes/*.jpg`, `js/recipe-images.js`, `CREDITS.md`, the new
   `book/...pdf`. Heads-up: PDF will grow to ~15–25 MB; repo gets heavier (fine).

---

## Verification / build commands
```bash
# validate all 100 recipes (70g rule, carb ceiling, kcal consistency, aisles, art)
node -e 'global.window={};require("./js/recipes-data.js");require("./js/illustrations.js");
const R=window.RECIPES,A=window.ART,P=[];const ok=new Set(["Meat & Poultry","Seafood","Eggs & Dairy","Produce","Pantry","Condiments & Spices","Supplements","Frozen"]);
R.forEach(r=>{if(r.macros.protein<68||r.macros.protein>72)P.push(r.id+" P");if(r.macros.netCarbs>20)P.push(r.id+" C");
if(Math.abs((4*r.macros.protein+4*r.macros.netCarbs+9*r.macros.fat)-r.macros.calories)/r.macros.calories>0.13)P.push(r.id+" kcal");
if(A.pickArtKey(r)==="plate")P.push(r.id+" art");r.ingredients.forEach(i=>{if(!ok.has(i.aisle))P.push(r.id+" aisle");});});
console.log(R.length,"recipes;",P.length?P:"VALID");'

# build the PDF
npm install && npm run build:pdf      # -> dist/the-70g-protein-cookbook.pdf

# serve the site locally
python3 -m http.server 8000           # open http://localhost:8000  (and /cookbook.html)
```
Note: a headless **jsdom boot test** was used earlier but jsdom is NOT in
package.json and gets pruned by `npm install`; re-add with `npm install jsdom
--no-save` if needed. The Puppeteer build is the authoritative render test.

## Decisions locked with the user
- Brand: **"The 70 g Protein Cookbook — 100 High-Protein, Low-Sugar Recipes"**,
  broad omnivore + vegetarian section (NOT carnivore). Author: Bengisu Sengul.
- 100 recipes (reached). Units: **metric + imperial**. Imagery: **real photos**
  (Pexels) replacing icons — in progress.
- No PR unless asked. Develop/push only to `claude/high-protein-cookbook-3Av3B`.

## Open threads / gotchas
- **GitHub Pages not live yet (404).** User must enable: repo **Settings → Pages
  → Source: Deploy from a branch → branch `claude/high-protein-cookbook-3Av3B`,
  folder `/ (root)` → Save**. (The failing Actions workflow was removed.) Site
  then at https://bengisusengul.github.io/70-gr-protein-meal-recipes/ ( `/` = app,
  `/cookbook.html` = book).
- All work is on the feature branch; `main` may be empty. **Offered to merge to
  `main`** to simplify Pages + make the repo open to the product — user hasn't
  confirmed. Do NOT merge without explicit OK.
- The user can also just **download the repo ZIP and double-click `index.html` /
  `cookbook.html`** (works offline, file://) — good fallback to "see it".
- `book/the-70g-protein-cookbook.pdf` is the committed, viewable/downloadable
  copy (since `dist/` is git-ignored).

## Backlog / future ideas (mentioned, not started)
1. Real photos (in progress). 2. Custom cover graphic + logo. 3. "About the
author" / intro letter page. 4. Page numbers in the printed Contents (2-pass
build). 5. Themed spin-off editions from the same data (vegetarian-only,
quick-meals, etc.). 6. Grow to 150/200 recipes. 7. Optional per-recipe
`photoQuery` for better image matching.
