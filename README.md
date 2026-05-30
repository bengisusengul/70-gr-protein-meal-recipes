# The 70 g Protein Cookbook 🥩🥚🐟

An interactive, offline-friendly cookbook website. **32 recipes**, and every
single one follows one unbreakable rule:

> **~70 g of protein** and **very low sugar / carbs** (target **< 20 g net carbs**) per serving.

It's not just a list of recipes — it's a little kitchen app that helps you
**plan your week, build a grocery list automatically, and track what you've cooked**,
all backed by a researched, cited explanation of *why* eating this way supports
muscle, metabolic health, and healthy aging.

No build step, no server, no account, no tracking. Just open it.

---

## ✨ What it does

| Tab | What you get |
| --- | --- |
| **Recipes** | All 32 recipes as cards — each with its own **illustrated dish header**, full macros (protein / net carbs / fat / fiber / calories), ingredients, and method. Search by name or ingredient, filter by meal type, "vegetarian only", or "not tried yet". Favorite ⭐ and "Mark as made" ✓ any recipe. |
| **Plan & Shop** | Add the meals you want to cook, set **servings** for each (e.g. batch a dinner ×3), and get an **auto-generated grocery list**. Identical ingredients are **summed across every meal**, **grouped by store aisle** (each with its own icon), with **check-off boxes** and a **Print** button. |
| **7-Day Plans** | Three ready-made **balanced weeks** (Classic, Mediterranean-leaning, Lean & Light). Each day pairs a breakfast + lunch + dinner for ~210 g protein. One click **loads a whole week into the Planner** and builds the week's shopping list for you. |
| **Tracker** | A checklist of every recipe with a progress bar — see at a glance which you've made and which are still to try. |
| **Why It Works** | A plain-language, **cited** tour of the nutrition & longevity science behind the 70 g / low-sugar rule (protein needs, muscle & aging, sugar & metabolic health, fiber, satiety, and a responsible-use note). |

All artwork is **hand-crafted SVG generated in the browser** — no photos are
fetched from the internet, so the site looks the same offline and nothing can
break or expire.

Everything you do — your plan, servings, shopping check-offs, tried list, and
favorites — is saved in your browser via `localStorage`, so it's there when you
come back. (It stays on your device; nothing is uploaded.)

---

## 🚀 How to use it

**Option A — just open it.** Download/clone the repo and double-click
`index.html`. It works straight from disk (the recipe data is embedded in JS, so
no server is required).

**Option B — run a tiny local server** (nicer for some browsers):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

**Option C — host it free on GitHub Pages:**

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**, pick your
   branch and the `/ (root)` folder, and save.
4. Your cookbook will be live at `https://<you>.github.io/<repo>/`.
   (The included `.nojekyll` file makes sure all assets are served as-is.)

---

## 📋 The unbreakable rule & how macros were set

- Every recipe targets **68–72 g protein** and keeps **net carbs under ~20 g**
  (net carbs = total carbs − fiber).
- **One recipe = one serving = ~70 g protein.** Use the Planner's servings
  control to cook several portions.
- Macros are realistic estimates from standard (USDA-style) food-composition
  values. Brands, cuts, and cooking methods vary, so treat them as a close guide.
- Protein is hit through a deliberate mix of sources — chicken, beef, turkey,
  pork, salmon / cod / shrimp / tuna, eggs and egg whites, Greek yogurt /
  cottage cheese / skyr, whey, and plant proteins (tofu, edamame, hemp, paneer,
  black soybeans) — so it never gets monotonous.

## 🧪 The science, briefly

The "Why It Works" tab explains, with sources, why ~70 g protein per main meal
clears the "leucine threshold" for muscle building, why higher protein protects
against age-related muscle loss (sarcopenia), why keeping added sugar very low
matters for long-term metabolic and cardiovascular health, and how fiber and
smart fats round it out. It also includes an honest note on the protein /
longevity debate and a responsible-use disclaimer.

> ⚠️ **Not medical advice.** 70 g/meal is a high, per-main-meal target — match
> your *total* daily protein to your body weight and goals. If you have kidney
> disease, are pregnant, or have any medical condition, talk to a doctor or
> registered dietitian first.

---

## 🗂 Project structure

```
index.html            # single-page app shell (5 tabs)
css/styles.css        # styling + print styles for the shopping list
js/recipes-data.js    # the 32 recipes (data)
js/science-data.js    # cited nutrition rationale (data)
js/plans-data.js      # the three 7-day balanced plans (data)
js/illustrations.js   # hand-crafted SVG dish art, category & aisle icons
js/storage.js         # localStorage helpers
js/app.js             # rendering, planner, shopping-list aggregation, tracker, plans
.nojekyll             # serve assets as-is on GitHub Pages
```

Pure HTML/CSS/vanilla JS — no dependencies to install.
