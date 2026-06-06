# 🚀 Launch status & to-do — The 70 g Protein Cookbook

_Last updated: 2026-06-06. This is the up-to-date handoff: read it first to resume._

**What this is:** a free interactive web app **+** a sellable PDF, from one dataset of 100
high-protein (~70 g), low-sugar (<20 g net carbs) recipes. Owner/author: **Bengisu Sengul** (chef).

Legend: ✅ done · ⏭️ next (do in order) · ⬜ optional / later

---

## 🔑 Key facts & accounts (so we never lose context)

| Thing | Detail |
|---|---|
| **Live website** | **https://the70gprotein.com** (custom domain, HTTPS enforced) |
| **Hosting** | GitHub Pages, repo `github.com/bengisusengul/70-gr-protein-meal-recipes`, branch **`claude/high-protein-cookbook-3Av3B`** (push ONLY here; deploys on push) |
| **Domain** | `the70gprotein.com` — Namecheap, order 204487821, expires **2027-06-05**, registrant email verified. **Auto-renew is OFF** (see to-do). DNS: 4× A `@` → `185.199.108/109/110/111.153`, CNAME `www` → `bengisusengul.github.io.` |
| **Gumroad — cookbook (£12)** | https://bengisus.gumroad.com/l/igjxu (id `igjxu`) — "The 70 g Protein Cookbook", ~£/$12 founding, 30-day guarantee, category *Self-Improvement › Cooking › Recipes* + tags. Published. |
| **Gumroad — Reset (£29)** | https://bengisus.gumroad.com/l/reset (slug `reset`, edit id `ardyku`) — "The 4-Week 70 g Protein Reset". **DRAFT** (name/£29/description/slug all set). Needs owner to upload 3 PDFs + 5 images, then Publish — see `marketing/FINISH-LAUNCH.md`. Bundle = `book/the-4-week-reset.pdf` + `book/reset-printables.pdf` + `book/the-70g-protein-cookbook.pdf`. |
| **Google Search Console** | `the70gprotein.com` **verified** (URL-prefix, via `google065c8bec089f087c.html` at site root — do NOT delete it). `sitemap.xml` submitted. Logged in under bengisushopify@gmail.com. |
| **Kit / ConvertKit (email)** | Account **active** (email confirmed + approved). Form "Clare form" **id 9523057 / uid `57976b6071`**, embedded in `free-plan.html`. Double opt-in; incentive email → redirects to the free PDF on confirm. Brand colors saved (green `#2F7D52`, gold `#E0B13A`, deep green `#143527`). **Currently sends from `hello@softwareyeah.com`** (→ switch to `@the70gprotein.com` after domain verification). Test subscriber `bengisushopify+70gtest@gmail.com` is *Unconfirmed* — safe to delete. |
| **Free lead magnet** | https://the70gprotein.com/book/free-7-day-plan.pdf |
| **Hero image** | `img/book/hero.jpg` (Pexels, Sergey Meshkov; credited in `CREDITS.md`) |
| **Owner emails** | `bengisushopify@gmail.com` (Kit + Namecheap + Gmail) · `bengisu_sengul@hotmail.com` (cookbook contact). UK address on file (private via WhoisGuard). |
| **Service worker** | `sw.js` cache **v3**. Bump version when changing precached assets; returning visitors may need 1 refresh. |

---

## 🎯 Strategy (decided — important context)

**Keep the web app + all 100 recipes FREE. Do NOT gate.** The free app is the traffic / trust /
email engine. (We considered gating to ~10 free recipes but decided against it — it fights the
interactive planner/tracker/plans, kills SEO/Pinterest traffic, and the recipe data ships in-page anyway.)

**Monetization = "all-in on the funnel":** free recipes → email list → sell *outcomes* + recurring.
The money is in the **email list + recurring revenue**, not the £12 PDF. Revenue ladder:

1. **Free** — the app + 100 recipes (magnet → email list)
2. **£9–15 impulse** — the PDF cookbook (easy yes / "support the chef")
3. **£25–35 core** — **"4-Week 70 g Protein Reset"** program (the main money-maker)
4. **£5–8/mo** — membership (the compounding money)
5. **Later** — a chef-led "21-Day Challenge" cohort

---

## ✅ Done

**Session 3 (2026-06-06) — the £29 Reset + funnel build:**
- ✅ **Built the £29 "4-Week 70 g Protein Reset" product** (`build/build-reset.js`): a 26-page Program Guide (`book/the-4-week-reset.pdf`) + an 11-page Printables Pack (`book/reset-printables.pdf`) with computed aisle-grouped shopping lists, day-by-day plans, a 28-day tracker, coaching, troubleshooting & FAQ. Sold as a bundle with the cookbook PDF. (Paid PDFs git-ignored.)
- ✅ **Reset landing page LIVE** — `reset.html` (https://the70gprotein.com/reset.html): selling hero, what's-inside, 4-week arc, £49→£29 pricing, 30-day guarantee, FAQ. Wired as the **flagship CTA** on the homepage hero + chef-band + footer, and as the free-plan upsell. `sw.js` cache v3→v4; reset.html + free-plan.html added to sitemap.
- ✅ **Gumroad Reset product created (DRAFT)** — `/l/reset`, £29, full description + slug set. Branded cover/thumbnail/gallery images generated (`build/build-reset-gumroad.js` → `build/reset-gumroad/`).
- ✅ **Google Search Console** — domain verified + sitemap submitted.
- ✅ **All marketing copy written** (`marketing/`): Gumroad listing, 5-email Kit sequence, 12 Pinterest pins, and `FINISH-LAUNCH.md` (owner checklist).
- ✅ **Cookbook + lead-magnet PDFs rebuilt** so they show `the70gprotein.com`.

**Sessions 1–2 (the app + first launch):**
- ✅ Free interactive web app (Recipes, Plan & Shop, 7-Day Plans, Tracker, Why It Works) — 100 recipes, real photos, 100 SEO recipe pages + `sitemap.xml`/`robots.txt`, offline PWA.
- ✅ **Site → Gumroad** buy CTAs wired everywhere (homepage, `free-plan.html`, 100 recipe pages + hub). `cookbook.html` locked down (noindex, unlinked, off sitemap).
- ✅ **Gumroad listing polished** — 30-day-guarantee line, category + tags. Live.
- ✅ **Email capture live (Kit)** — inline form on `free-plan.html`, double opt-in, incentive email delivers the free 7-day PDF on confirm. Tested end-to-end.
- ✅ **Premium redesign** — selling hero (Fraunces type, gold "70 g"), sticky "Get the cookbook" CTA, chef/trust band, refined cards, mobile-tuned. New on-brand hero photo (protein bowl).
- ✅ **Kit account activated** (email confirmed + approved) + brand colors saved.
- ✅ **Custom domain LIVE** — `the70gprotein.com` registered, DNS configured, site served over HTTPS (enforced), all site URLs updated, old github.io URLs 301-redirect.
- ✅ Free lead-magnet PDF upsells to Gumroad; `BOOK.website` set to the new domain.

---

## ⏭️ Next — OWNER ACTIONS (≈15–30 min)

👉 **Everything that can be automated is done. The rest needs your login/files/billing — a tight,
step-by-step checklist is in `marketing/FINISH-LAUNCH.md`.** In priority order:

1. **Publish the Reset on Gumroad** (≈5 min) — the draft is ready; upload the 3 PDFs + 5 images and hit Publish. *(Claude can't upload local files — the browser sandbox only accepts files you attach. This is the one blocker on turning sales on.)*
2. **Pinterest** — upload the 12 pins with the copy in `marketing/pinterest-pins.md` (Business account → Rich Pins).
3. **Kit sequence** — paste the 5 emails from `marketing/email-sequence.md` (Automate → Sequences), trigger on form `57976b6071`. Needs Kit's paid Creator plan (you're on a trial).
4. **Namecheap DNS** — add Kit's sending-domain records (DKIM/SPF/Return-Path) so email sends from `@the70gprotein.com`; also turn ON domain auto-renew.
5. **Later: recurring membership** (£5–8/mo) — new monthly meal plans + recipes + community.

*Why these are owner-only: file uploads (Gumroad/Pinterest) are blocked for the assistant; DNS needs the Namecheap login (not signed in); the Kit plan is a billing decision.*

---

## ⬜ Optional / smaller

- ⬜ **Enable domain auto-renew** at Namecheap (so it doesn't lapse 2027-06-05).
- ⬜ Delete the test subscriber `bengisushopify+70gtest@gmail.com` in Kit.
- ⬜ Update the Kit incentive redirect URL to the `the70gprotein.com` PDF (currently github.io — redirects fine, so cosmetic).
- ⬜ Full cookbook PDF rebuild so `BOOK.website` (now the new domain) shows on the PDF → re-upload to Gumroad. Minor.
- ⬜ Kit **Creator Profile** (another email-capture hub).

---

## ⚠️ Conventions & gotchas

- **Push only to `claude/high-protein-cookbook-3Av3B`** — GitHub Pages auto-deploys from it.
- **Bump `sw.js` CACHE version** (now `v3`) when changing precached assets; returning visitors may need one refresh to see updates.
- **HIGH-PROTEIN, NOT carnivore** (27 vegetarian recipes) — never add a carnivore claim.
- **Don't edit `js/recipes-data.js`** (validated 100-recipe core); add per-recipe data in `js/recipes-extra.js`.
- **Pexels API key:** env-only, never commit.
- After recipe/photo changes, **rebuild + recompress the PDFs** and re-upload to Gumroad:
  - Cookbook: `npm run build:pdf` → `python3 build/compress-pdf.py dist/the-70g-protein-cookbook.pdf book/the-70g-protein-cookbook.pdf 1000 72`
  - Reset: `node build/build-reset.js` → `python3 build/compress-pdf.py dist/the-4-week-reset.pdf book/the-4-week-reset.pdf 1400 80` (printables already small) · Gumroad images: `node build/build-reset-gumroad.js`
- **Don't delete `google065c8bec089f087c.html`** at the repo root — it keeps Google Search Console verified.
- **Reset slug on Gumroad = `reset`** — the site CTAs hard-link to `bengisus.gumroad.com/l/reset`; keep that slug when publishing.
- **Owner-only actions** (Claude cannot do these): entering passwords / logging in, making purchases, creating accounts, entering card/payment details. Claude guides; the owner clicks those.
