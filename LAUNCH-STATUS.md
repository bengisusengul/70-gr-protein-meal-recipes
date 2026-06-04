# Launch status — The 70 g Protein Cookbook

_Last updated: 2026-06-04_

Live assets:
- **Free web app:** https://bengisusengul.github.io/70-gr-protein-meal-recipes/
- **Paid PDF (Gumroad):** https://bengisus.gumroad.com/l/igjxu

Legend: ✅ done · ⏳ needs your action · ⬜ optional / later

---

## ✅ Built & live

- ✅ Free interactive web app deployed on GitHub Pages (Recipes, Plan & Shop, 7-Day Plans, Tracker, Why It Works).
- ✅ 100 recipes (~70 g protein, <20 g net carbs each) with real photos.
- ✅ 100 static SEO recipe pages + hub, each with `schema.org/Recipe` JSON-LD, plus `sitemap.xml` and `robots.txt`.
- ✅ Installable offline PWA (`manifest.json` + `sw.js`).
- ✅ Paid cookbook PDF **published** on Gumroad (product `igjxu`).
- ✅ Free lead-magnet PDF committed (`book/free-7-day-plan.pdf`).
- ✅ 12 Pinterest pins generated (`pins/`) and Gumroad gallery images prepared (`../gumroad-images/`).

## ✅ Shipped this session — site ↔ Gumroad now connected

- ✅ Every "Get the full cookbook (PDF)" buy CTA points to the live Gumroad product and opens in a new tab: homepage footer (`index.html`), `free-plan.html`, all 100 recipe pages + the hub (via `STORE_URL` in `build/build-pages.js`).
- ✅ Locked down the free full book: removed `cookbook.html` from the sitemap, added `noindex`, and removed every public link to it. (Note: it still returns `200` by direct URL — unavoidable on a static host — but it is unlinked and de-indexed.)

## ⏳ Needs your action

- ⏳ **Optimize the Gumroad listing** _(W2)_ — connect the **Claude-in-Chrome** extension and log into Gumroad; I'll then read the live listing and apply an improved title, description, price, and gallery images (keeping the `igjxu` permalink so the wired links don't break).
- ⏳ **Connect email capture** _(W3)_ — the free-plan signup form (`free-plan.html`) still isn't wired to a provider. Recommended: **Kit (ConvertKit)** free plan (hosts the form + auto-emails the free PDF). Create the account, then give me the form action/embed URL and I'll wire it in.
- ⬜ **PDF store/website links** _(W1 Tier B, optional)_ — set `BOOK.website` in `js/cookbook.js` to the live site and add the store link in `build/build-lead-magnet.js`, then rebuild the PDF (`npm run build:pdf` → `python3 build/compress-pdf.py …`) and **re-upload** it to Gumroad.

## ⏳ Owner tasks (manual — step-by-step)

### Google Search Console (get the recipes indexed)
1. Open https://search.google.com/search-console → **Add property** → **URL prefix** → `https://bengisusengul.github.io/70-gr-protein-meal-recipes/`.
2. Verify with the **HTML tag** method — Google gives you a `<meta name="google-site-verification" …>` tag. **Send me that tag** and I'll add it to `index.html` and push.
3. After verification: **Sitemaps** → submit `https://bengisusengul.github.io/70-gr-protein-meal-recipes/sitemap.xml`.
4. Optionally use **URL Inspection** → "Request indexing" on the homepage and a few top recipes.

### Pinterest (free traffic engine)
1. Use a **Pinterest business account**; create a couple of boards (e.g. "High-Protein Recipes", "Low-Sugar Meals").
2. Upload the 12 images in `pins/`. For each pin: keyword-rich title + description, and set the **destination link** to the matching recipe page (or `free-plan.html` to grow the email list).
3. Optionally claim the website / enable **Rich Pins** — the recipe pages already expose Open Graph + Recipe schema, so Pinterest can pull rich metadata.

## ⬜ Optional / later

- ⬜ Custom domain (CNAME) — currently using the `github.io` subdomain.
- ⬜ Upsell/bundle (printables, meal-plan pack) per `MARKETING.md`.
