# 🚀 Launch status & to-do — The 70 g Protein Cookbook

_Last updated: 2026-07-04. This is the up-to-date handoff: read it first to resume._
_**Current operating doc: `marketing/90-DAY-SALES-PLAN.md`** (July–Sept). Fill `marketing/SCOREBOARD.md` every Sunday._

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
| **Gumroad — Reset (£29)** | https://bengisus.gumroad.com/l/reset (slug `reset`, edit id `ardyku`) — "The 4-Week 70 g Protein Reset". **PUBLISHED & LIVE ✅** (owner uploaded the 3 PDFs + cover/gallery + thumbnail and hit Publish, 2026-06-06; verified purchasable). Bundle = `book/the-4-week-reset.pdf` + `book/reset-printables.pdf` + `book/the-70g-protein-cookbook.pdf`. 30-day guarantee. *Still optional:* set Discover category/tags + add a cross-sell line on the £12 listing. |
| **Google Search Console** | `the70gprotein.com` **verified** (URL-prefix, via `google065c8bec089f087c.html` at site root — do NOT delete it). `sitemap.xml` submitted. Logged in under bengisushopify@gmail.com. |
| **Kit / ConvertKit (email)** | Account **active** (email confirmed + approved). Form "Clare form" **id 9523057 / uid `57976b6071`**, embedded in `free-plan.html`. Double opt-in; incentive email → redirects to the free PDF on confirm. Brand colors saved (green `#2F7D52`, gold `#E0B13A`, deep green `#143527`). **Currently sends from `hello@softwareyeah.com`** (→ switch to `@the70gprotein.com` after domain verification). Test subscriber `bengisushopify+70gtest@gmail.com` is *Unconfirmed* — safe to delete. **Plan:** on a free trial of **Creator** ($39/mo or $390/yr = 2 months free; ≤1,000 subs), ends ~2026-06-18 then **auto-cancels to free**. The 5-email sequence + automation need Creator to run; recommended to let it lapse to free now (0 subs) and upgrade to Creator (annual) once the list grows — NOT "Creator Pro". |
| **Free lead magnet** | https://the70gprotein.com/book/free-7-day-plan.pdf |
| **Hero image** | `img/book/hero.jpg` (Pexels, Sergey Meshkov; credited in `CREDITS.md`) |
| **Owner emails** | `bengisushopify@gmail.com` (Kit + Namecheap + Gmail) · `bengisu_sengul@hotmail.com` (cookbook contact). UK address on file (private via WhoisGuard). |
| **Service worker** | `sw.js` cache **v6**. Bump version when changing precached assets; returning visitors may need 1 refresh. |
| **Analytics** | **GoatCounter** wired site-wide (pageviews + `buy-*` click events on every Gumroad CTA) — **placeholder `GOATCOUNTER_SITE`** until the owner creates the free account (goatcounter.com/signup) and gives Claude the site code to swap in (grep `GOATCOUNTER_SITE`). Harmless while placeholder (fails silently). |

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

**Session 5 (2026-07-04) — the 90-day sales plan, measurement & SEO collections:**
- ✅ **`marketing/90-DAY-SALES-PLAN.md`** — the July→September operating plan. Honest reset: the June engine was built but **never executed** (0 videos/messages/subs as of Jul 4), so month 1 = *turn it on* + measure + habit. Includes: Week-0 sprint, ranked DO list, DON'T list, monthly targets & gates, weekly rhythm + minimum-viable-week, and **two real sales moments** (cookbook £12→£19 on **Aug 17**; **Reset Challenge cohort starts Sep 8**). Calibrated to owner's answers: 10–20 h/wk, face+voice video, £0 ads, socials from zero.
- ✅ **`marketing/SCOREBOARD.md`** — 13-week accountability tracker (fill Sundays; paste to Claude for analysis).
- ✅ **`marketing/broadcast-templates.md`** — 4 July Kit broadcasts (work on the FREE Kit tier).
- ✅ **GoatCounter analytics wired site-wide** — snippet on index/reset/free-plan + all 101 recipe pages + 8 collections; `data-goatcounter-click` buy-events on every Gumroad CTA (`buy-cookbook-home/-recipe/-hub/-collection/-reset`, `buy-reset`, `free-plan-pdf`). Placeholder until owner creates the account. `sw.js` → **v6**.
- ✅ **8 SEO collection pages** (`collections/`, via new `build/collections-def.js` + `build/build-collections.js`; sitemap now **112 URLs**): breakfast/lunch/dinner/snacks (20/25/33/22), vegetarian (27), under-30-min (58), under-500-kcal (31), meal-prep (23). ItemList JSON-LD, unique intros, interlinked from all 100 recipe pages + hub + homepage footer. **Owner: resubmit sitemap.xml in Search Console (2 min).**

**Session 4 (2026-06-10) — the growth engine (sales push month 1):**
- ✅ **30-day video content calendar** — `marketing/30-day-content-calendar.md`: a script/hook/caption for every day (real recipes + exact macros), weekly themes, filming workflow. Owner films & posts (Reels + TikTok + Shorts).
- ✅ **Reddit launch posts** — `marketing/reddit-posts.md`: 6 value-first posts (r/MealPrepSunday, r/HighProtein, r/EatCheapAndHealthy, r/Volumeeating, r/loseit, r/recipes) + reply templates + sequencing. All share only the FREE app.
- ✅ **Warm-network templates** — `marketing/warm-network-messages.md`: WhatsApp/IG/FB/email scripts for the first 10–20 sales, the review-ask, the share-ask.
- ✅ **22 new Pinterest pins generated & LIVE** on the site (34 total in `pins/`; `build/build-pins.py` paths fixed + batch 2). **Ready-to-click pin queue:** `marketing/pinterest-queue.md` (Pin-from-URL links, **2/day for 11 days** — do NOT bulk-pin).
- ✅ **reset.html conversion pass** — value anchor (£12 cookbook included), checkout microcopy, "not ready → free 7-day plan" path at the pricing box, Product JSON-LD. `sw.js` cache → v5.
- ✅ **Gumroad Reset Discover enabled** — category **Self Improvement > Cooking > Nutrition** + tags (high protein recipes, meal plan, low carb, meal prep, weight loss). Saved & verified in-browser.
- ⬜ *Denied/not done:* cross-sell line on the **£12 cookbook** description (permission scope) — owner: paste into `igjxu`'s description end: *"PS — Want the next four weeks fully planned for you? The 4-Week 70 g Protein Reset includes this cookbook PLUS 28 days of meal plans, aisle-grouped shopping lists and a habit tracker: https://bengisus.gumroad.com/l/reset"*

**Session 3 (2026-06-06) — the £29 Reset + funnel build:**
- ✅ **Built the £29 "4-Week 70 g Protein Reset" product** (`build/build-reset.js`): a 26-page Program Guide (`book/the-4-week-reset.pdf`) + an 11-page Printables Pack (`book/reset-printables.pdf`) with computed aisle-grouped shopping lists, day-by-day plans, a 28-day tracker, coaching, troubleshooting & FAQ. Sold as a bundle with the cookbook PDF. (Paid PDFs git-ignored.)
- ✅ **Reset landing page LIVE** — `reset.html` (https://the70gprotein.com/reset.html): selling hero, what's-inside, 4-week arc, £49→£29 pricing, 30-day guarantee, FAQ. Wired as the **flagship CTA** on the homepage hero + chef-band + footer, and as the free-plan upsell. `sw.js` cache v3→v4; reset.html + free-plan.html added to sitemap.
- ✅ **Gumroad Reset product PUBLISHED & LIVE** — `/l/reset`, £29, full description + slug + cover/gallery/thumbnail. Branded images generated via `build/build-reset-gumroad.js`; owner uploaded the files & hit Publish (verified purchasable). **Sales are ON.**
- ✅ **Kit email funnel BUILT & ACTIVE** — a 5-email welcome→sell sequence (all published) + a live Visual Automation (Clare form `57976b6071` → sequence). Auto-nurtures every new free-plan signup toward the Reset. (Needs the paid Creator plan to keep running past the trial — owner decision.)
- ✅ **Pinterest: all 12 pins PUBLISHED** to the board "High-Protein Low-Sugar Recipes" — branded vertical images + keyword descriptions + recipe-page links. Done via Pinterest's Pin-from-URL flow (`pinterest.com/pin/create/button/?url=…&media=…&description=…`; the pins are live at `the70gprotein.com/pins/`), which sidesteps the file-upload limitation. ⚠️ **The loop double-saved — the board has ~23 pins (≈2× each); owner to dedupe via the board's "Organise" tool** (Claude can't delete pins).
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

## ⏭️ Next — OWNER ACTIONS

**👉 THE operating doc is now `marketing/90-DAY-SALES-PLAN.md` — start with its WEEK-0 sprint
(§1): create the TikTok/IG/YT accounts, send the warm messages, film videos 1–3, start the pin
queue, create the free GoatCounter account (then tell Claude the site code), check Kit is on free,
resubmit sitemap.xml in GSC.** The items below are the same engine, kept for reference:
1. **Send the warm-network messages** (`marketing/warm-network-messages.md`) — 30 personal messages over 3–4 days. The first 10–20 sales + first reviews live here.
2. **Film & post daily** from `marketing/30-day-content-calendar.md` (batch-film 3–4 videos per cook; post to Reels + TikTok + Shorts; free-plan link in bio).
3. **Pin 2/day** from `marketing/pinterest-queue.md` (11 days of ready-to-click links). First dedupe the board (~23 → 12, board → Organise).
4. **Post to Reddit** per the schedule in `marketing/reddit-posts.md` (warm the account with normal comments first).
5. **Ask every buyer for a Gumroad review** within 24h (template G in the warm-network file).
6. **Paste the cross-sell line** into the £12 cookbook's Gumroad description (text in Session 4 notes above).

**Tidy-ups (from before, still open) — checklist in `marketing/FINISH-LAUNCH.md`:**

1. **Pinterest — dedupe the board** (~2 min). All 12 pins are live, but the pinning double-saved (~23 pins). Open the "High-Protein Low-Sugar Recipes" board → **Organise** → delete one copy of each duplicate (keep 12). *(Claude can't delete pins.)* Optional: convert to a Business account for Rich Pins/analytics.
2. **Kit — billing decision (no rush).** The 5-email sequence + automation are built & ACTIVE on a 12-day trial of **Creator** ($39/mo, or $390/yr = 2 months free; ≤1,000 subs). With 0 subscribers, recommended to let the trial **lapse to free** (forms still capture emails + deliver the PDF; the sell-sequence just pauses, fully saved) and **upgrade to Creator — annual — once the list starts growing**. **Skip "Creator Pro"** — not needed. Trial auto-cancels, no surprise charge.
3. **Namecheap DNS** — verify Kit's sending domain (add the DKIM/SPF/Return-Path records Kit gives you so email sends from `@the70gprotein.com`); also turn ON domain auto-renew (expires 2027-06-05).
4. **Later: recurring membership** (£5–8/mo) — new monthly meal plans + recipes + community.

*Why these are owner-only: Pinterest pin deletion + the Namecheap login + the Kit billing decision all need you. The revenue-critical work (product live, funnel running, pins up, SEO submitted) is done.*

---

## ⬜ Optional / smaller

- ⬜ **Enable domain auto-renew** at Namecheap (so it doesn't lapse 2027-06-05).
- ⬜ Delete the test subscriber `bengisushopify+70gtest@gmail.com` in Kit.
- ⬜ Update the Kit incentive redirect URL to the `the70gprotein.com` PDF (currently github.io — redirects fine, so cosmetic).
- ⬜ The cookbook PDF was **rebuilt** with the new domain and is in the Reset bundle ✅. Optional: re-upload that refreshed `book/the-70g-protein-cookbook.pdf` to the standalone **£12** cookbook listing (`igjxu`) so it shows the new domain too. Minor.
- ⬜ Kit **Creator Profile** (another email-capture hub).

---

## ⚠️ Conventions & gotchas

- **Push only to `claude/high-protein-cookbook-3Av3B`** — GitHub Pages auto-deploys from it.
- **Bump `sw.js` CACHE version** (now `v6`) when changing precached assets; returning visitors may need one refresh to see updates.
- **Collections**: recipe selection/copy lives in `build/collections-def.js` (shared by `build/build-collections.js` AND `build-pages.js` for the sitemap + interlinks). After changing defs, run BOTH builds. Sitemap should read 112 URLs.
- **GOATCOUNTER_SITE** is a deliberate placeholder — swap it everywhere (`grep -rl GOATCOUNTER_SITE`, then rebuild pages) once the owner's account exists.
- **HIGH-PROTEIN, NOT carnivore** (27 vegetarian recipes) — never add a carnivore claim.
- **Don't edit `js/recipes-data.js`** (validated 100-recipe core); add per-recipe data in `js/recipes-extra.js`.
- **Pexels API key:** env-only, never commit.
- After recipe/photo changes, **rebuild + recompress the PDFs** and re-upload to Gumroad:
  - Cookbook: `npm run build:pdf` → `python3 build/compress-pdf.py dist/the-70g-protein-cookbook.pdf book/the-70g-protein-cookbook.pdf 1000 72`
  - Reset: `node build/build-reset.js` → `python3 build/compress-pdf.py dist/the-4-week-reset.pdf book/the-4-week-reset.pdf 1400 80` (printables already small) · Gumroad images: `node build/build-reset-gumroad.js`
- **Don't delete `google065c8bec089f087c.html`** at the repo root — it keeps Google Search Console verified.
- **Reset slug on Gumroad = `reset`** — the site CTAs hard-link to `bengisus.gumroad.com/l/reset`; keep that slug when publishing.
- **Owner-only actions** (Claude cannot do these): entering passwords / logging in, making purchases, creating accounts, entering card/payment details. Claude guides; the owner clicks those.
