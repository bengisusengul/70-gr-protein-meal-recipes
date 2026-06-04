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

## ✅ Shipped this session

- ✅ **Site → Gumroad wiring (W1):** every "Get the full cookbook (PDF)" buy CTA points to the live Gumroad product (new tab) — homepage footer (`index.html`), `free-plan.html`, all 100 recipe pages + the hub (via `STORE_URL` in `build/build-pages.js`). Verified live.
- ✅ **Locked down the free full book:** removed `cookbook.html` from the sitemap, added `noindex`, and removed every public link to it. (Still returns `200` by direct URL — unavoidable on a static host — but unlinked + de-indexed.)
- ✅ **Gumroad listing polished (W2):** added a 30-day-money-back-guarantee line to the description; set Category → *Self Improvement › Cooking › Recipes* + 5 tags (high protein, protein, meal prep, low carb, low sugar). Permalink unchanged (`igjxu`); enables Gumroad Discover after first sale + risk review.
- ✅ **Email capture wired (W3):** `free-plan.html` embeds a published **Kit (ConvertKit)** inline form (uid `57976b6071`, green "Send me the free plan" button). Double opt-in; instant-download fallback kept.
- ✅ **Lead-magnet upsell (Tier B):** the free 7-day-plan PDF now ends with a clickable Gumroad link; `BOOK.website` set for the next full PDF rebuild.

## ⏳ Needs your action

- ⏳ **Activate your Kit account** — two banners in Kit: (1) **confirm your sign-up email** (click the link Kit emailed you), and (2) **complete account approval** ("Start the approvals process"). Until both are done, Kit holds the double-opt-in confirmation emails, so new subscribers stay pending. The form already captures emails — this just switches on sending.
- ⬜ **(Optional) Auto-email the free PDF** — in Kit, set the form's **Incentive** email to deliver `book/free-7-day-plan.pdf` (or link to the hosted copy) so subscribers get it on confirm. The on-page download already gives instant access, so this is a nice-to-have.
- ⬜ **(Optional) Full cookbook PDF rebuild (Tier B)** — rebuild so the companion-site URL appears on the PDF's copyright/about pages, then re-upload to Gumroad. Minor.

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
