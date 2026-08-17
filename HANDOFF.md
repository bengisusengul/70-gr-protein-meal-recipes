# 📕 MASTER HANDOFF — The 70 g Protein Cookbook

_Rewritten clean on **2026-07-04** (supersedes the old session-appended handoff; that history is
condensed in §11 and fully preserved in git). This file + the three operating docs below are
everything a fresh session — or a fresh human — needs._

**▶ Read-first order for any new session:**
1. **This file** (the map — 10 minutes)
2. `LAUNCH-STATUS.md` (the status ledger + owner to-dos)
3. `marketing/90-DAY-SALES-PLAN.md` (**THE operating plan**, July–September 2026)
4. `marketing/SCOREBOARD.md` (weekly numbers — the ground truth of execution)

---

## 1. What this business is

One validated dataset — **100 recipes, each ≈70 g protein and <20 g net carbs** — rendered into
four surfaces:

| Surface | What | Price | Where |
|---|---|---|---|
| **Web app + 100 SEO recipe pages + 8 collection pages** | Traffic & trust engine (planner, tracker, shopping lists; PWA) | Free | https://the70gprotein.com |
| **Free 7-day plan (PDF)** | Email magnet → Kit list | Free | /free-plan.html |
| **The 70 g Protein Cookbook (PDF)** | Impulse product ("support the chef") | **£19** (founding £12 ended 17 Aug) | https://bengisus.gumroad.com/l/igjxu |
| **The 4-Week 70 g Protein Reset** | Core money-maker: 26-pp program guide + printables pack + cookbook bundled | **£29** | https://bengisus.gumroad.com/l/reset |

**Owner/author:** Bengisu Sengul, professional chef (ex Sous/Head Chef), UK.
Emails: `bengisushopify@gmail.com` (Kit, Namecheap, Google) · `bengisu_sengul@hotmail.com` (book contact).

**Strategy (locked):** keep the app + all 100 recipes FREE (traffic/email engine — do NOT gate);
monetise via the funnel: attention → email → £12 → £29 → (later, gated) membership. Taste-first
positioning; **HIGH-PROTEIN, NOT carnivore** (27 recipes are vegetarian — never claim carnivore).

---

## 2. Status snapshot — 2026-07-04

**LIVE & working:** site on custom domain (HTTPS) · both Gumroad products published & purchasable ·
Kit form capturing emails + delivering the free PDF (double opt-in) · 8 SEO collection pages ·
GoatCounter analytics LIVE site-wide (code `the70gprotein`, verified Jul 4 — see §3) · 12 Pinterest pins on the board ·
GSC verified, sitemap (112 URLs) submitted · 34 pin images + ready-to-click queue for 22 more.

**THE HONEST GAP:** the June-10 growth engine was **never executed** — as of Jul 4 there were
0 videos posted, 0 warm messages sent, 0 subscribers, no recorded sales, and the Kit trial lapsed
to the free tier (~Jun 18; the 5-email sequence is saved but **paused** until a Creator upgrade).
The 90-day plan is built around fixing exactly this: **Week-0 restart + weekly rhythm + scoreboard.**

**Two scheduled sales moments (real, one-time):** cookbook **£12 → £19 on Sun 17 Aug** (announce
from Aug 3) · **Reset Challenge cohort starts Mon 8 Sep** (push Aug 25–Sep 7).

---

## 3. Accounts & key facts

| Thing | Detail |
|---|---|
| **Repo / hosting** | github.com/bengisusengul/70-gr-protein-meal-recipes · branch **`claude/high-protein-cookbook-3Av3B`** (the ONLY branch — push here; GitHub Pages auto-deploys). Local: `~/Desktop/cookbook/70-gr-protein-meal-recipes` |
| **Domain** | `the70gprotein.com` — Namecheap (order 204487821), expires **2027-06-05**, **auto-renew OFF** (owner to-do). DNS: 4× A → 185.199.108/109/110/111.153, CNAME www → bengisusengul.github.io |
| **Gumroad £12** | `/l/igjxu` — published. Founding price until Aug 17. Owner still to paste the cross-sell line (text in LAUNCH-STATUS §Session-4) |
| **Gumroad £29** | `/l/reset` (edit id `ardyku`) — published, verified purchasable; Discover category+tags set. Files = the 3 PDFs in `book/` (paid ones git-ignored) |
| **Kit (ConvertKit)** | Form "Clare form" id **9523057** / uid **`57976b6071`** on free-plan.html. 5-email sequence + automation BUILT, currently **paused on free tier**. Sends from `hello@softwareyeah.com` until sending-domain DNS is added. **Gate:** upgrade to Creator ANNUAL ($390/yr) at ~250 subs or first £100 month — never "Creator Pro". Broadcasts work on free tier |
| **Google Search Console** | Verified via `google065c8bec089f087c.html` at site root — **never delete that file**. Resubmit sitemap after URL changes |
| **GoatCounter** | **LIVE** since Jul 4 — code **`the70gprotein`**, dashboard https://the70gprotein.goatcounter.com (login bengisushopify@gmail.com, email verified). Tracks pageviews + `buy-*` click events on every Gumroad CTA. Verified end-to-end (first visit recorded). Note: GoatCounter drops data until the account email is verified; count.js skips hidden/background tabs |
| **Pinterest** | Board "High-Protein Low-Sugar Recipes" — 12 pins live **plus ~11 duplicates (owner dedupes via board → Organise)**. Queue for 22 more: `marketing/pinterest-queue.md`. Pin via Pin-from-URL only (§10) |
| **Socials** | TikTok / Instagram / YouTube — **not created yet**; Week-0 item (one handle, bio link → /free-plan.html) |
| **Site assets** | Hero `img/book/hero.jpg` (Pexels, Sergey Meshkov — credited in CREDITS.md). 100 recipe photos in `img/recipes/`, credits in `img/recipes/_credits.json` |

---

## 4. The Desktop folder — `~/Desktop/cookbook/`

```
cookbook/
├── 70-gr-protein-meal-recipes/   ← THE repo (everything current; committed & pushed)
├── NEXT-SESSION-START-HERE.md    ← 1-page pointer: state + owner sprint + session queue
├── RESET-UPLOADS/                ← convenience copies used for the Jun-6 Gumroad/Pinterest uploads
│   ├── 1-gumroad/                  (3 product PDFs + 5 listing images — already uploaded)
│   └── 2-pinterest/                (the 12 pin images — already pinned)
├── gumroad-images/               ← £12 cookbook listing images (already uploaded Jun 3)
└── _archive/                     ← stale June-1 copies; see WHY-THIS-EXISTS.md; safe to delete
```
Nothing cookbook-related lives anywhere else on this machine's Desktop. The repo is the single
source of truth; RESET-UPLOADS/gumroad-images are already-consumed upload copies kept for convenience.

---

## 5. Repo map (what matters, where)

**Pages (site root):** `index.html` (app shell) · `reset.html` (£29 sales page) · `free-plan.html`
(email capture) · `cookbook.html` (print shell — **noindex, unlinked, keep off sitemap**) ·
`google065c8bec089f087c.html` (GSC — keep) · `sitemap.xml`+`robots.txt` (generated) ·
`sw.js` (service worker, CACHE **v6** — bump on any precached-asset change).

**Generated dirs (committed):** `recipes/` (100 pages + hub — from build-pages.js) ·
`collections/` (8 SEO hubs — from build-collections.js) · `pins/` (34 pin images).

**Data (`js/`):** `recipes-data.js` — the validated 100-recipe core, **NEVER edit** ·
`recipes-extra.js` (per-recipe depth; regenerate via build-extra.js) · `recipe-images.js`,
`science-data.js`, `plans-data.js`, `swaps.js`, `storage.js`, `app.js`, `cookbook.js` (PDF renderer,
`BOOK` config at top).

**Build (`build/`):** `build-pages.js` (recipe pages + hub + **sitemap — single writer**, GC snippet,
collection interlinks) · `collections-def.js` (**single source of truth** for the 8 collections) ·
`build-collections.js` · `build-pins.py` + `build-pin-queue.js` (pins + Pin-from-URL queue) ·
`build-extra.js` · `build-cookbook.js` + `compress-pdf.py` (paid cookbook PDF) · `build-reset.js`
(Reset guide + printables) · `build-reset-gumroad.js` (listing images) · `build-lead-magnet.js`
(free PDF) · `fetch-images.js`/`fetch-multi.js` (photos; need `PEXELS_API_KEY`, env-only) ·
`enhance-photos.py`.

**`book/`:** `free-7-day-plan.pdf` (free magnet — **committed**) · `the-70g-protein-cookbook.pdf`,
`the-4-week-reset.pdf`, `reset-printables.pdf` (**paid — git-ignored**, live locally + on Gumroad;
rebuild commands in §6).

**`marketing/` (all docs):** `90-DAY-SALES-PLAN.md` ⭐ the operating plan · `SCOREBOARD.md` ⭐ weekly
tracker · `broadcast-templates.md` (July emails) · `30-day-content-calendar.md` (30 video scripts) ·
`reddit-posts.md` (6 posts) · `warm-network-messages.md` (first-sales templates + review-ask) ·
`pinterest-queue.md` (22 ready-to-click pins) · `pinterest-pins.md` (batch-1, historical) ·
`email-sequence.md` (the 5-email Kit sequence source) · `reset-gumroad-listing.md` (listing copy) ·
`FINISH-LAUNCH.md` (legacy tidy-ups, mostly folded into the 90-day plan's Week 0).

**Other docs:** `LAUNCH-STATUS.md` (status ledger) · `CLAUDE.md` (session entry pointer) ·
`README.md`, `CREDITS.md`, `MARKETING.md`, `IDEAS.md`, `PROGRESS.md` (historical).

---

## 6. Build & verify (copy-paste)

```bash
cd ~/Desktop/cookbook/70-gr-protein-meal-recipes
npm install        # once (Puppeteer). Python needs: pip install --user pymupdf pillow

# 1) Recipe validator — must print "100 VALID" before any commit
node -e 'global.window={};require("./js/recipes-data.js");const R=window.RECIPES,P=[];const ok=new Set(["Meat & Poultry","Seafood","Eggs & Dairy","Produce","Pantry","Condiments & Spices","Supplements","Frozen"]);R.forEach(r=>{if(r.macros.protein<68||r.macros.protein>72)P.push(r.id);if(r.macros.netCarbs>20)P.push(r.id);r.ingredients.forEach(i=>{if(!ok.has(i.aisle))P.push(r.id)})});console.log(R.length,P.length?P:"VALID")'

# 2) Site pages (ALWAYS pass today's date — default lastmod is stale)
node build/build-pages.js YYYY-MM-DD     # 100 recipe pages + hub + sitemap (expect 112 URLs) + robots
node build/build-collections.js          # 8 collection pages (defs: build/collections-def.js)
# ^ shared defs; either order; rerun-safe. After editing defs run BOTH.

# 3) Analytics — DONE (Jul 4): code `the70gprotein` is wired everywhere; dashboard at
#    the70gprotein.goatcounter.com. If a Pages deploy seems stuck, check
#    curl -s api.github.com/repos/bengisusengul/70-gr-protein-meal-recipes/actions/runs?per_page=3
#    (public, no auth) — a failed "Deploy" step is transient; retrigger with an empty commit.

# 4) PDFs (only after recipe/photo changes; re-upload to Gumroad after)
npm run build:pdf && python3 build/compress-pdf.py dist/the-70g-protein-cookbook.pdf book/the-70g-protein-cookbook.pdf 1000 72
node build/build-reset.js && python3 build/compress-pdf.py dist/the-4-week-reset.pdf book/the-4-week-reset.pdf 1400 80
node build/build-lead-magnet.js          # free magnet (committed)

# 5) Preview + ship
npm run serve                            # localhost:8000 (GoatCounter ignores localhost — expected)
git add -A && git status                 # ⚠️ CHECK for unexpected deletions before committing (§10)
git commit && git push origin claude/high-protein-cookbook-3Av3B   # push = deploy
```

---

## 7. The operating plan (summary — full version is the doc)

`marketing/90-DAY-SALES-PLAN.md`, calibrated 2026-07-04 (owner: 10–20 h/wk, **FACELESS video only
— decided 2026-08-14: hands-and-pans + text overlays, voiceover optional, never face on camera**,
£0 ads, socials from zero):

- **Week 0:** create socials → 30 warm messages → film videos 1–3 (calendar exists) → pin queue +
  dedupe → GoatCounter signup → Kit-on-free check → resubmit sitemap.
- **DO (ranked):** short-form video 5–7/wk · Pinterest · Wednesday email · Reddit value posts ·
  SEO collections (done) · review-ask every sale · the two sales moments · collabs in months 2–3.
- **DON'T:** paid ads · bought followers/fake reviews · new products before the Reset sells weekly ·
  new assets before executing existing ones · more platforms · fake urgency · head-term SEO ·
  redesigns · paid PR · flying blind.
- **Targets:** Jul 10–20 sales / 75–150 subs · Aug +15–35 / 200–400 subs · Sep +20–40 / 400–700
  subs. **Quarter: £400–£1,500 realistic, £2–4k stretch.** Gates + kill-switches in the doc (§4).
- **Rhythm:** Sun scoreboard · Mon batch-film · Tue–Sat post daily · Wed email · Thu Reddit.
  Minimum viable week: 2 videos, 3 pins, 1 email.

---

## 8. Owner's to-do (as of 2026-07-04)

**Now (Week 0 — see plan §1):** socials · warm messages · film 1–3 · pins + dedupe board ·
~~GoatCounter account~~ ✅ done Jul 4 · confirm Kit on free · resubmit sitemap in GSC.
**Soon:** ⚠️ **fix £12 cookbook currency on Gumroad** — it's priced **$12 USD**, so UK buyers pay
only ~£8.98 while the site says "£12"; switch the product currency to GBP £12 (the Reset is already
GBP — found in the Jul-8 audit; matters more before the Aug 17 rise to £19) · paste cross-sell line
into £12 listing · Namecheap: auto-renew ON + Kit sending-domain DNS (when upgrading Kit) · delete
Kit test subscriber.
**Gated:** Kit → Creator annual (~250 subs or £100 month) · membership tier (only after Reset
sells ≥5/wk for 3 straight weeks).

## 9. Claude's next-session queue

1. ~~Swap in the GoatCounter code~~ ✅ done Jul 4 (commit 0f79a62; verified live).
2. Read `SCOREBOARD.md` rows / owner screenshots + GoatCounter dashboard → analyze → adjust hooks/formats.
3. **Early Aug:** month-2 video-script pack (from real July retention data) + price-rise emails.
4. **Mid-Aug:** September Reset-Challenge kit (launch emails, challenge emails, daily scripts, pins).
5. On 3+ reviews: testimonial quote-strip into reset.html (placeholder comment is in the code).
6. Anytime: new pin batches, broadcast drafts, collab DMs, metrics reads.

---

## 10. Conventions & gotchas (hard-won — read before acting)

- **Push ONLY to `claude/high-protein-cookbook-3Av3B`** — it's the default branch AND the deploy.
- **`git add -A` gotcha:** files sometimes vanish from disk between sessions (a lead-magnet PDF
  deletion was silently staged on Jul 4 and caught pre-push). **Always read `git status` for
  unexpected `D` lines before committing.**
- **Bump `sw.js` CACHE** (now v6) whenever precached assets change (index/reset/css/js).
- **HIGH-PROTEIN, NOT carnivore.** Never add a carnivore claim. 27 recipes are vegetarian.
- **Never edit `js/recipes-data.js`** — per-recipe additions go in `js/recipes-extra.js`.
- **Collections:** selection/copy lives ONLY in `build/collections-def.js`; `build-pages.js` is the
  ONLY sitemap writer; after def changes run both builds; sitemap must read 112 (104 + 8).
- **GoatCounter is live** (`the70gprotein`). New pages get the snippet from the build scripts
  automatically. GitHub Pages' "Deploy" step can fail transiently after a green build — check the
  public actions API and retrigger with an empty commit (happened Jul 4 on 0f79a62).
- **Paid PDFs are git-ignored by design** (`book/the-70g-protein-cookbook.pdf`, `the-4-week-reset.pdf`,
  `reset-printables.pdf`, `build/reset-gumroad/`). If missing locally: rebuild (§6) — masters also
  live on Gumroad and in `~/Desktop/cookbook/RESET-UPLOADS/`.
- **Pinterest:** create pins via the Pin-from-URL flow
  (`pinterest.com/pin/create/button/?url=…&media=…&description=…` — images are live under
  `/pins/`). Builder loads slowly (12–28 s): screenshot to confirm the board picker rendered,
  click the board **exactly once** (blind re-clicks double-saved batch 1). Claude cannot delete
  pins (destructive) — dedupe is owner-only via board → Organise. Max ~2 pins/day; never bulk.
- **Browser file-upload limitation (Claude):** `file_upload` only accepts files the user attaches
  in-chat; working-dir files and `@`-referenced files are rejected. Gumroad file/cover uploads are
  therefore owner-only. URL-based flows (Pinterest) are the workaround.
- **Kit editor automation:** body fields need a standalone `cmd+a` ×10 + Backspace to clear; verify
  the cursor is in the editor before typing (unfocused keystrokes trigger Kit nav shortcuts).
- **Gumroad comboboxes** (category/tags): type → ArrowDown → Enter; plain click/Return fails.
- **Pexels API key:** ask the owner; env-only (`PEXELS_API_KEY=…`); never commit or echo.
- **Fake urgency is banned** — the Aug 17 price rise and Sep 8 cohort are real and one-time each.
- **Owner-only actions:** logins/passwords, purchases/billing, account creation, file uploads to
  Gumroad, deleting pins/posts/data. Claude prepares everything else.

---

## 11. Session changelog (condensed; full detail in git history + LAUNCH-STATUS)

- **S1 · May 31–Jun 4** — Built everything: 100-recipe dataset + web app (PWA), 100 photos
  (Pexels, credited), 100 SEO pages, 118-pp cookbook PDF, free-plan funnel, 12 pins, research-based
  cover/copy/pricing (taste-first, single hero, charm pricing).
- **S2 · Jun 5–6** — LAUNCH: GitHub Pages live → Gumroad £12 published + CTAs wired → Kit form +
  incentive email live → premium redesign (Fraunces hero, sticky CTA) → custom domain
  `the70gprotein.com` + HTTPS. Decision: keep all recipes free; sell outcomes via funnel.
- **S3 · Jun 6** — Built + published the **£29 Reset** (guide + printables + bundle; `/l/reset`),
  reset.html landing (flagship CTA), Kit 5-email sequence + automation (activated), 12 pins posted
  via Pin-from-URL, GSC verified + sitemap, Gumroad imagery, all listing/email/pin copy.
- **S4 · Jun 10** — Month-1 growth engine: 30-day video calendar, 6 Reddit posts, warm-network
  templates, +22 pins & queue, reset.html conversion pass (JSON-LD, value anchor), Reset Discover
  category/tags. *(Subsequently not executed — see S5.)*
- **S5 · Jul 4** — Honest audit (nothing executed; no analytics) → **90-day sales plan** +
  scoreboard + July broadcasts; **GoatCounter wired site-wide** (placeholder + buy-click events);
  **8 SEO collection pages** (sitemap 104→112, interlinked); sw v6; this handoff rewritten;
  Desktop folder tidied (`_archive/`).
- **S6 · Jul 4 (evening)** — **GoatCounter LIVE**: owner created account `the70gprotein` (email
  verified), placeholder swapped everywhere (0f79a62), first Pages deploy failed transiently →
  retriggered with empty commit (58f0c22), verified end-to-end (count POST 200 + visit on the
  dashboard).

---
*End of handoff. If you're a fresh session: `LAUNCH-STATUS.md` next, then live out of
`marketing/90-DAY-SALES-PLAN.md` + `marketing/SCOREBOARD.md`.*
