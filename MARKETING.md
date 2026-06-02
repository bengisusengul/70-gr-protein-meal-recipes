# Marketing & monetization playbook — The 70 g Protein Cookbook

Everything you need to start selling. Copy/paste the listing text, follow the
setup steps, and price as suggested. (This file is for you, not part of the product.)

---

## 1. Pricing

| Product | Price | Why |
|---|---|---|
| **Digital PDF cookbook** | **$17–24** | 100 recipes + 3 meal plans + cited science + photos. Sweet spot for a niche digital cookbook. Launch at **$14** for the first 2 weeks, then raise to **$19**. |
| **Free 7-day plan** | $0 (lead magnet) | Builds your email list — your most valuable asset. |
| **Print edition (Amazon KDP, optional)** | $19–29 | Print-on-demand; you hold no stock. Adds credibility + passive Amazon search traffic. |
| **Bundle / upsell** | +$8–15 | "Cookbook + printable meal-plan & shopping-list pack" or a body-weight protein planner. |

Anchor the price: show "**$19**" next to "~$0.19 per recipe."

---

## 2. Sales-page / listing copy (Gumroad, Etsy, Amazon)

**Title:** The 70 g Protein Cookbook — 100 High-Protein, Low-Sugar Recipes

**Subtitle:** Hit 70 g of protein every meal, keep sugar low, and actually enjoy it — 100 recipes, 3 done-for-you weeks, and the science, in one book.

**Short blurb (Gumroad/Etsy summary):**
> Tired of choking down plain chicken to hit your protein? This is 100 real,
> satisfying meals — breakfasts, lunches, dinners and snacks — each engineered
> for ~70 g of protein and under 20 g net carbs. Includes 3 ready-made balanced
> weeks, auto shopping lists, dietary swaps, and a plain-language, cited guide to
> why high-protein/low-sugar eating supports muscle, metabolism and healthy aging.

**Benefit bullets:**
- 🥩 **100 recipes, every one ~70 g protein** and very low sugar (<20 g net carbs)
- 📅 **3 done-for-you 7-day plans** (Classic, Mediterranean, Lean & Light)
- 🛒 **Auto shopping lists** grouped by aisle — no planning headache
- 🔄 **Dairy-, nut- & soy-free swaps** on every recipe
- 🔬 **The science, cited** — 12 peer-reviewed sources, in plain English
- 📏 **Metric + imperial** units, real food photos, difficulty + storage notes
- 📱 **Free companion web app** to plan, track and shop offline

**FAQ:**
- *Is this keto?* Low-sugar and low-carb (<20 g net per meal), but protein-first rather than fat-first.
- *Vegetarian options?* Yes — 27 vegetarian recipes, clearly labelled.
- *Do I need supplements?* No. Whey is used in a few recipes; swaps are given.
- *Format?* Instant PDF, ~112 pages, A4, works on phone/tablet/print.
- *Is the nutrition exact?* Estimates from standard food-composition values — a close guide; brands vary.

**Back-cover / closing line:**
> Eat for strength, energy and the long game — one 70-gram meal at a time.

---

## 3. Setup steps (one-time, ~60–90 min total)

### A. Sell the PDF on Gumroad (fastest)
1. Create a free account at **gumroad.com**.
2. **New product → Digital product**. Upload `book/the-70g-protein-cookbook.pdf`.
3. Title/description: paste section 2 above. Price: **$14 launch**.
4. Add 3–4 images: the cover + 2–3 recipe pages (export from `cookbook.html`) + a Pinterest pin from `pins/`.
5. Publish → copy the product URL (looks like `https://YOURNAME.gumroad.com/l/xxxx`).
6. Put that URL in two places: `STORE_URL` near the top of **`build/build-pages.js`**, then re-run `npm run build:pages`; and the footer "Get the full cookbook" link in **`index.html`** + `BOOK.website` in **`js/cookbook.js`**. (Tell me the URL and I'll wire all of these in one pass.)

### B. Email list + lead magnet
1. Free account at **ConvertKit**, **MailerLite**, or **Buttondown**.
2. Create a "form" → copy its form **action URL**.
3. Paste it into the `action="..."` of the form in **`free-plan.html`** (replacing `REPLACE_WITH_YOUR_EMAIL_PROVIDER_FORM_URL`).
4. In the provider, set the welcome automation to deliver `book/free-7-day-plan.pdf` (the lead-magnet I generate).
5. (Tell me the URL and I'll paste it in.)

### C. Pinterest (your #1 free traffic source for recipes)
1. Create a **free Pinterest *business*** account; "claim" your site URL.
2. Make boards: "High-Protein Breakfasts", "Low-Carb Dinners", etc.
3. Upload the vertical pins from **`pins/`** (I generate these). For each pin's
   destination link, use that recipe's page, e.g.
   `https://bengisusengul.github.io/70-gr-protein-meal-recipes/recipes/<id>.html`.
4. Pin 3–5/day. Pinterest sends recipe traffic for months, unlike social posts.

### D. Google (already wired — just submit)
1. **Google Search Console** → add your site → verify.
2. Submit `https://bengisusengul.github.io/70-gr-protein-meal-recipes/sitemap.xml`.
3. Test a recipe page in the **Rich Results Test** (search.google.com/test/rich-results) — it should detect a valid Recipe.

### E. Print edition (optional, later)
- **Amazon KDP** (kdp.amazon.com) → paperback → upload a print PDF (Letter size:
  set `PAGE_SIZE = "Letter"` in `build/build-cookbook.js` and rebuild) → KDP gives
  you a **free ISBN**. Sells on Amazon with zero inventory.

---

## 4. Launch checklist
- [ ] Enable GitHub Pages (Settings → Pages → branch `claude/high-protein-cookbook-3Av3B`, `/root`).
- [ ] Submit sitemap to Search Console; confirm Rich Results on 1 recipe.
- [ ] Gumroad product live; URL wired into the site.
- [ ] Email provider connected in `free-plan.html`; welcome email delivers the free plan.
- [ ] 10+ Pinterest pins scheduled, each linking to a recipe page.
- [ ] Post the launch in 2–3 relevant communities (r/ProteinRecipes, r/loseit, fitness FB groups) — link the **free plan**, not the paid book.
- [ ] Ask 5 friends to try a recipe and send a testimonial for the sales page.

## 5. Where the money compounds
Free recipes (SEO + Pinterest) → email list (free plan) → paid PDF → upsell
(printables / planner) → print edition. The list is the asset: a 1,000-person
list at a 2% buy rate on a $19 book is ~$380 per email you send. Keep feeding it.
