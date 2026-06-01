# The 70 g Protein Cookbook 🥩🥚🐟

An interactive, offline-friendly cookbook website. **50 recipes (growing toward 100+)**, and every
single one follows one unbreakable rule:

> **~70 g of protein** and **very low sugar / carbs** (target **< 20 g net carbs**) per serving.

It's not just a list of recipes — it's a little kitchen app that helps you
**plan your week, build a grocery list automatically, and track what you've cooked**,
all backed by a researched, cited explanation of *why* eating this way supports
muscle, metabolic health, and healthy aging.

No build step, no server, no account, no tracking. Just open it.

---

## 🌐 Live site

Once GitHub Pages is enabled (below), the app is hosted at:

**https://bengisusengul.github.io/70-gr-protein-meal-recipes/**

On your iPhone, open that link in Safari, then **Share → Add to Home Screen**
for an app-like icon. All your plans, shopping checkmarks, and "made it" marks
are saved on your phone.

### Enable hosting (one-time, ~15 seconds)

A deploy workflow (`.github/workflows/deploy-pages.yml`) publishes the site
automatically. You just need to turn the source on once:

1. Go to the repo on GitHub → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's it — the workflow runs on every push and updates the live link in ~1 min.

> **No-workflow alternative:** Settings → Pages → Source → **Deploy from a
> branch** → branch `claude/high-protein-cookbook-3Av3B`, folder `/ (root)` →
> Save. Same URL, no Actions needed.

---

## ✨ What it does

| Tab | What you get |
| --- | --- |
| **Recipes** | All recipes as cards — each with its own **illustrated dish header**, full macros (protein / net carbs / fat / fiber / calories), ingredients, and method. Search by name or ingredient, filter by meal type, "vegetarian only", or "not tried yet". Favorite ⭐ and "Mark as made" ✓ any recipe. Plus a **🎯 protein-target calculator**, a **"what can I make now?"** ingredient filter, and **dietary swaps** (see below). |
| **Plan & Shop** | Add the meals you want to cook, set **servings** for each (e.g. batch a dinner ×3), and get an **auto-generated grocery list**. Identical ingredients are **summed across every meal**, **grouped by store aisle** (each with its own icon), with **check-off boxes**, a **Print** button, and **📤 Share / Export** (sends the list to the iOS share sheet → Notes, Messages, etc., or copies it to the clipboard). |
| **7-Day Plans** | Three ready-made **balanced weeks** (Classic, Mediterranean-leaning, Lean & Light). Each day pairs a breakfast + lunch + dinner for ~210 g protein, plus an **optional snack** you can toggle on to reach ~280 g/day. One click **loads a whole week into the Planner** and builds the week's shopping list for you. |
| **Tracker** | A checklist of every recipe with a progress bar — see at a glance which you've made and which are still to try. |
| **Why It Works** | A plain-language, **cited** tour of the nutrition & longevity science behind the 70 g / low-sugar rule (protein needs, muscle & aging, sugar & metabolic health, fiber, satiety, and a responsible-use note). |

### Personalisation features (Recipes tab)

- **🎯 Protein-target calculator** — enter your bodyweight (kg/lb), a goal
  (1.2–2.2 g/kg), and meals per day. Every recipe's portions and macros, and
  the whole shopping list, **scale to your per-meal target** (clamped to a sane
  0.5–2× of the 70 g baseline). Reset anytime to the default 70 g/meal.
- **🧊 "What can I make now?"** — type the ingredients you have on hand. Recipes
  re-sort by best match and each card shows **what you have vs. what's missing**
  (pantry staples like salt/oil/spices are assumed). Tick **"only what I can
  make now"** to hide anything you can't cook right this minute.
- **🔄 Dietary swaps** — every recipe auto-suggests **dairy-free, nut-free and
  soy-free substitutions** based on its ingredients (e.g. *feta → vegan feta*,
  *almond milk → oat milk*, *tofu → paneer or extra chicken/egg*).

All artwork is **hand-crafted SVG generated in the browser** — no photos are
fetched from the internet, so the site looks the same offline and nothing can
break or expire.

Everything you do — your plan, servings, shopping check-offs, tried list, and
favorites — is saved in your browser via `localStorage`, so it's there when you
come back. (It stays on your device; nothing is uploaded.)

---

## 📕 Produce the sellable cookbook (PDF)

The repo also generates a **standalone, print-quality PDF cookbook** from the
*same* recipe data — so it's a separate product you can sell (Gumroad, Etsy,
your own site), and it auto-updates whenever you add recipes. The interactive
web app is untouched.

What's in the book: a designed **cover**, title/copyright page, a clickable
**table of contents**, the cited **science intro**, **every recipe** on its own
page (illustration, macros, ingredients, method, tips & dietary swaps), the
**3 weekly meal plans**, and an A–Z **recipe index** — with page numbers.

**Build it:**

```bash
npm install          # one time — downloads a headless browser
npm run build:pdf    # → dist/the-70g-protein-cookbook.pdf
```

- Preview/edit the layout by opening `cookbook.html` in a browser (or
  **Print → Save as PDF** straight from there).
- **Brand it** by editing the `BOOK` config at the top of `js/cookbook.js`
  (title, subtitle, author, year, website).
- For a **US-Letter** edition, set `PAGE_SIZE = "Letter"` in
  `build/build-cookbook.js`.

Files: `cookbook.html` · `js/cookbook.js` · `css/cookbook.css` ·
`build/build-cookbook.js`. The generated PDF lands in `dist/` (git-ignored).

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
js/recipes-data.js    # the recipes (data)
js/science-data.js    # cited nutrition rationale (data)
js/plans-data.js      # the three 7-day balanced plans (data)
js/illustrations.js   # hand-crafted SVG dish art, category & aisle icons
js/storage.js         # localStorage helpers
js/app.js             # rendering, planner, shopping-list aggregation, tracker, plans
.nojekyll             # serve assets as-is on GitHub Pages
```

Pure HTML/CSS/vanilla JS — no dependencies to install.
