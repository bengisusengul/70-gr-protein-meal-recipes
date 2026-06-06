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
| **Gumroad (paid)** | https://bengisus.gumroad.com/l/igjxu (id `igjxu`) — "The 70 g Protein Cookbook", ~£/$12 founding, 30-day guarantee, category *Self-Improvement › Cooking › Recipes* + tags. Published. |
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

- ✅ Free interactive web app (Recipes, Plan & Shop, 7-Day Plans, Tracker, Why It Works) — 100 recipes, real photos, 100 SEO recipe pages + `sitemap.xml`/`robots.txt`, offline PWA.
- ✅ **Site → Gumroad** buy CTAs wired everywhere (homepage, `free-plan.html`, 100 recipe pages + hub). `cookbook.html` locked down (noindex, unlinked, off sitemap).
- ✅ **Gumroad listing polished** — 30-day-guarantee line, category + tags. Live.
- ✅ **Email capture live (Kit)** — inline form on `free-plan.html`, double opt-in, incentive email delivers the free 7-day PDF on confirm. Tested end-to-end.
- ✅ **Premium redesign** — selling hero (Fraunces type, gold "70 g"), sticky "Get the cookbook" CTA, chef/trust band, refined cards, mobile-tuned. New on-brand hero photo (protein bowl).
- ✅ **Kit account activated** (email confirmed + approved) + brand colors saved.
- ✅ **Custom domain LIVE** — `the70gprotein.com` registered, DNS configured, site served over HTTPS (enforced), all site URLs updated, old github.io URLs 301-redirect.
- ✅ Free lead-magnet PDF upsells to Gumroad; `BOOK.website` set to the new domain.

---

## ⏭️ Next — to-do, in priority order

1. **Kit: verify `the70gprotein.com` as the sending domain.** In Kit Settings → add the domain → add the DKIM/SPF/Return-Path DNS records it gives you to Namecheap DNS → verify. Then set the from-address to `@the70gprotein.com`. *(Better inbox deliverability. I add the DNS records.)*
2. **Google Search Console.** Add `the70gprotein.com` as a **Domain** property → add its TXT verification record to Namecheap DNS → verify → submit `https://the70gprotein.com/sitemap.xml` → request indexing. *(All 100 recipe pages stay indexed since we kept them free. I add the DNS record.)*
3. **Pinterest.** Upload the 12 pins in `pins/` (business account); link each to a recipe page or `free-plan.html`; keyword-rich titles/descriptions; enable Rich Pins. *(Needs Pinterest login in Chrome.)*
4. **Build the £29 "4-Week 70 g Protein Reset" on Gumroad.** Repackage cookbook PDF + 3 meal plans + printable shopping/meal-plan packs + the science into a structured program; new outcome-focused listing copy. Keep the £12 cookbook as the impulse tier.
5. **Kit welcome→sell email sequence** (~4–5 emails): welcome + deliver PDF → chef story/value → soft pitch → social proof/objection → last call. Nurtures free subscribers toward the Reset. Build in Kit (Automate → Sequences).
6. **Later: recurring membership** (£5–8/mo) — new monthly meal plans + recipes + community.

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
- After recipe/photo changes, **rebuild + recompress the PDF** and re-upload to Gumroad (`npm run build:pdf` → `python3 build/compress-pdf.py …`).
- **Owner-only actions** (Claude cannot do these): entering passwords / logging in, making purchases, creating accounts, entering card/payment details. Claude guides; the owner clicks those.
