# PROGRESS — The 70 g Protein Cookbook

> **⚠️ HISTORICAL — frozen at 2026-06-03 (pre-launch).** Everything below is long done.
> Current status lives in `LAUNCH-STATUS.md`; full context in `HANDOFF.md`; the operating
> plan is `marketing/90-DAY-SALES-PLAN.md`.

## Where we are
A free interactive **web app** + a **sellable PDF**, both from one dataset of **100 recipes**
(~70 g protein, low sugar). This session delivered: **100 real photos** (enhanced, de-duplicated,
license-clean), **100 SEO recipe pages** + `Recipe` JSON-LD + `sitemap.xml`/`robots.txt`, a real
**PWA** (offline + installable), **recipe depth** (`js/recipes-extra.js`: headnotes, servings,
storage, difficulty, allergens, estimated sodium/sat-fat/sugar), a **sales funnel** (free
lead-magnet PDF + `free-plan.html` + 12 Pinterest `pins/` + `MARKETING.md`), a polished **118-page
PDF** (welcome letter, About-the-Author w/ chef crest, dedication, buyer license, closing CTA,
**single-hero cover**, photo section dividers), and a **research-backed cover/copy/pricing pass**.

Branch **`claude/high-protein-cookbook-3Av3B`** (NOT `main`); see `git log` for the latest commit.
The full sellable PDF builds locally to `book/the-70g-protein-cookbook.pdf` and is **git-ignored**
(it's the paid product — upload to Gumroad). The free `book/free-7-day-plan.pdf` is committed.

## Decisions (locked)
- **HIGH-PROTEIN, not carnivore** — 0/100 recipes are carnivore; 27 are vegetarian. **Never** add a carnivore claim.
- Author **Bengisu Sengul**; contact **bengisu_sengul@hotmail.com**; dedication "Greetings to myself…".
- **Single-hero cover** (steak) + macro callout badge; variety shown on the "What's Inside" page.
- **Taste-first** copy everywhere; macros demoted to a badge (counters "healthy = less tasty").
- **Pricing:** $12 founding (first 7 days) → $19, with a $39 anchor and a $27 bundle.

## Next session = LAUNCH (full steps in `HANDOFF.md` §9)
1. Enable **GitHub Pages** (Settings → Pages → branch `claude/high-protein-cookbook-3Av3B` → `/(root)`).
2. **Gumroad:** upload `book/the-70g-protein-cookbook.pdf`; give Claude the product URL → it wires the
   "Buy" CTAs (`STORE_URL` in `build/build-pages.js`, `index.html`/`free-plan.html`, `BOOK.website`) + rebuilds.
3. **Email provider:** paste the form URL into `free-plan.html`; deliver `book/free-7-day-plan.pdf`.
4. **Google Search Console:** submit `/sitemap.xml`. **Pinterest:** upload the 12 `pins/`.
5. Then: beta-tester testimonials (social proof), recipe reliability QA, optional headnote/typography polish.

## 💡 Note to self (future idea — see `IDEAS.md`)
Build an **AI agent / agents to manage this book's selling & promotion** (Pinterest,
email funnel, listings/SEO, social, reviews, analytics) — likely via the Claude Agent SDK.
Not now; after launch. Full sketch in `IDEAS.md`.

## Guardrails for the next agent
Don't edit `js/recipes-data.js` (validated core; use `js/recipes-extra.js`). Pexels API key: **ask
Bengisu**, keep it env-only, never commit. Push only to the feature branch. Rebuild + compress the
full PDF after any photo/content change (`npm run build:pdf` → `python3 build/compress-pdf.py …`).
