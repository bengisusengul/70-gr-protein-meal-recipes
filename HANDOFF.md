# 📒 SESSION HANDOFF — The 70 g Protein Cookbook
### Complete context for a fresh Claude Code session. Read this top-to-bottom before doing anything.
*Last updated: 2026-06-03 (end of session — launching tomorrow). Supersedes the older `PROGRESS.md`.*

> **▶ RESUME HERE — next session is LAUNCH DAY.** Everything is built, committed and pushed. Nothing is half-finished. Pick up at **§9 → A. Go-live**: (1) enable GitHub Pages, (2) set up Gumroad and upload `book/the-70g-protein-cookbook.pdf` then give Claude the product URL to wire the "Buy" CTAs + rebuild, (3) connect an email provider in `free-plan.html`, (4) submit `/sitemap.xml` to Google Search Console, (5) upload the 12 `pins/` to Pinterest. Only ask Bengisu for the Pexels key if you need to re-fetch photos.

---

## 0. TL;DR (read me first)
- **Product:** an independent chef's **digital high-protein, low-sugar cookbook** — a free interactive **web app** + a **sellable PDF** (the paid product), generated from one shared dataset of **100 recipes**.
- **Owner / author:** **Bengisu Sengul**, a professional chef (Sous Chef → Head Chef, 4 yrs). Contact: **bengisu_sengul@hotmail.com**.
- **Goal of this session:** make it look professional and **sellable straight away** — real photos, SEO, a real PWA, deeper recipes, a sales funnel, a polished PDF, and a research-backed cover/copy/pricing pass.
- **Where the code is:** local git clone at **`~/Desktop/70-gr-protein-meal-recipes`** on branch **`claude/high-protein-cookbook-3Av3B`** (this is the default branch; **do NOT use `main`**). GitHub: `https://github.com/bengisusengul/70-gr-protein-meal-recipes`.
- **Latest commit:** `e1571b5` (pushed). Everything below is committed EXCEPT the full sellable PDF (intentionally git-ignored — see §6).
- **Status:** essentially launch-ready. Remaining work is mostly **off-platform setup the owner must do** (Gumroad, email provider, enable GitHub Pages) + optional polish. See §9 (Next tasks).

> ⚠️ **Critical brand decision:** This is **HIGH-PROTEIN, NOT carnivore.** Bengisu's personal story is carnivore, but a check proved **0 of the 100 recipes are carnivore** (all contain plants; 27 are vegetarian). We deliberately tell her comeback story as a *high-protein / low-sugar* journey. **Never add a "carnivore" claim anywhere.**

---

## 1. Environment & exact paths
| Thing | Path / value |
|---|---|
| **Working git clone (USE THIS)** | `~/Desktop/70-gr-protein-meal-recipes` |
| **Stale/incomplete copy (IGNORE / can delete)** | `~/Desktop/70-gr-protein-meal-recipes-claude-high-protein-cookbook-3Av3B` (an old unzip — missing files, not a git repo) |
| GitHub repo | `https://github.com/bengisusengul/70-gr-protein-meal-recipes` |
| Branch (default) | `claude/high-protein-cookbook-3Av3B` |
| This session's plan file (local, NOT portable) | `~/.claude/plans/hey-rickety-progress-file-refactored-riddle.md` — historical only; **this HANDOFF is the source of truth.** |
| Machine | macOS (zsh). Tools present: node, npm, git, python3 + Pillow + PyMuPDF (installed via pip --user), sips. **No** ImageMagick/Ghostscript. |
| Live site (once Pages enabled) | `https://bengisusengul.github.io/70-gr-protein-meal-recipes/` |

**Secrets:** A **Pexels API key** is required to (re)fetch photos. Bengisu pasted one in chat; it is **deliberately NOT stored in this repo or this doc** (security). A new session must **ask Bengisu for the Pexels key** and use it as an env var only (`PEXELS_API_KEY=...`), never commit/echo it.

---

## 2. What the product is
- **Web app** (`index.html`, vanilla JS, no framework, no build step) — 5 tabs: Recipes, Plan & Shop, 7-Day Plans, Tracker, Why It Works. Data in `localStorage`. Now also a real **PWA** (installable + offline).
- **Sellable PDF** (`cookbook.html` + `build/build-cookbook.js`, rendered with Puppeteer) — 118-page A4 book from the same data.
- **SEO layer** — 100 static crawlable recipe pages under `recipes/` with `Recipe` JSON-LD, a hub, `sitemap.xml`, `robots.txt`.
- **Funnel** — free lead-magnet PDF + `free-plan.html` email-capture page + 12 Pinterest pins + `MARKETING.md` (listing copy, pricing, setup steps).
- The "unbreakable rule": every recipe ≈ **70 g protein**, **< ~20 g net carbs**, one serving.

---

## 3. Author, brand & key decisions (locked with Bengisu)
- **Name on the book:** Bengisu Sengul. **Contact:** bengisu_sengul@hotmail.com. **Dedication:** "Greetings to myself — and to anyone beginning again."
- **Her story (told as high-protein, NOT carnivore):** was overweight/unhealthy → did a protein-first, very-low-sugar reset → "felt alive again in two weeks" → as a chef, refused bland food, so built flavourful high-protein recipes to help others. (Used in the PDF Welcome letter + About-the-Author.)
- **Positioning:** **sell TASTE first, demote the macros to a badge** (research: foregrounding "healthy" lowers perceived tastiness & sales). Cover/listing/hero copy all lead with flavour.
- **Cover:** **single warm hero photo** (a steak) + big title + macro callout badge + negative space (research: a single hero out-converts a collage at thumbnail size). Variety is shown on a separate **"What's Inside"** page, not the cover.
- **Pricing (in `MARKETING.md`):** charm **$19** regular, **$39 anchor**, **$12 founding price for the first 7 days only** (real, time-boxed), **$27 bundle** (book + meal-plan pack) as the target middle tier.
- **Photos:** sourced from **Pexels (primary) + Openverse (CC) + TheMealDB**, **commercial-use only, no CC-BY-SA**; per-image source/license recorded in `CREDITS.md` and `img/recipes/_credits.json`. A subtle, consistent warm + saturation **enhancement** was applied to all photos.
- **Licensing/monetization posture:** the full polished PDF is the **paid product** → kept **out of the public repo** (git-ignored); only the **free** lead-magnet PDF is committed.
- **Do NOT edit** `js/recipes-data.js` (the validated 100-recipe core) — all added per-recipe content lives in `js/recipes-extra.js`.

---

## 4. File / architecture map
**App + book shells**
- `index.html` — web app shell (head has SEO/OG/canonical/PWA links + inline `<style>` for card badges & the photo header banner). Loads JS in order: recipes-data, science-data, plans-data, illustrations, swaps, recipe-images, **recipes-extra**, storage, app; registers `sw.js`.
- `cookbook.html` — print/PDF shell (loads the same data + recipes-extra + cookbook.js; has an inline `<style>` block for the new PDF pages/cover/dividers).

**Data (`js/`)**
- `recipes-data.js` — `window.RECIPES` (100 recipes). **CORE — do not edit.** Shape: `{id,name,category(Breakfast|Lunch|Dinner|Snack),tags[],vegetarian,time{prep,cook},macros{protein,netCarbs,fat,fiber,calories},ingredients[{item,qty,unit,aisle}],steps[],notes}`.
- `recipes-extra.js` — `window.RECIPE_EXTRA[id]` = headnote, servings, servingsNote, storage, difficulty, equipment[], allergens[], badges[], seoTitle, seoDescription, seoKeywords[], **sodium_mg, satFat_g, sugar_g** (estimates). Generated by `build/build-extra.js`.
- `recipe-images.js` — `window.RECIPE_IMAGES` = ids that have a photo (currently all 100). Auto-generated.
- `science-data.js` (cited science), `plans-data.js` (3 weekly plans), `swaps.js` (`SWAPS.forRecipe`), `illustrations.js` (`ART` — SVG art; now only used as a hidden fallback behind photos + the small line-icons for category/aisle), `storage.js` (localStorage), `app.js` (all web-app logic; recipe cards merge `RECIPE_EXTRA`, show badges/headnote/storage, deep-link to `recipes/<id>.html`).
- `cookbook.js` — PDF builder. `BOOK` config at top (title, subtitle [taste-first], author, contact, price "$19", dedication, website [empty placeholder]). Pages: cover (single hero) → title/copyright → dedication → contents → **welcome letter** → **what's inside** → how-to → science → category dividers (photos) → 100 recipe pages (photo + badges + macros + full nutrition + storage + swaps) → meal plans → conversions → index → **About-the-Author (chef crest)** → **buyer license** → **closing CTA**.

**Build scripts (`build/`)**
- `fetch-images.js` — Pexels downloader (`npm run fetch:images`, needs `PEXELS_API_KEY`). Has `PHOTO_QUERIES` overrides + de-dup + a `SKIP` list.
- `fetch-multi.js` — **multi-source** fetcher/selector (Pexels + Openverse + TheMealDB). Modes: `--gather [ids]`, `--promote picks.json`, `--regen`. Writes `img/recipes/_credits.json` + regenerates manifest + `CREDITS.md`.
- `build-extra.js` — generates `js/recipes-extra.js` (incl. nutrition estimates from an ingredient table).
- `build-pages.js` — generates `recipes/<id>.html` (+ hub), `sitemap.xml`, `robots.txt`. **Set `STORE_URL` here once Gumroad is live**, then re-run.
- `build-cookbook.js` — Puppeteer → `dist/the-70g-protein-cookbook.pdf` (A4; flip `PAGE_SIZE="Letter"` for KDP print).
- `compress-pdf.py` — shrinks the Puppeteer PDF (downsamples + re-encodes images via PyMuPDF; Puppeteer outputs ~75 MB → ~9 MB). Usage: `python3 build/compress-pdf.py in.pdf out.pdf 1000 72`.
- `build-pins.py` — 12 vertical 1000×1500 Pinterest pins → `pins/`.
- `build-lead-magnet.js` — free 7-day-plan teaser PDF → `book/free-7-day-plan.pdf`.
- `enhance-photos.py` — subtle warm/saturation/contrast edit (`python3 build/enhance-photos.py <files>`; `--test in out` for a copy).

**Assets**
- `img/recipes/<id>.jpg` — 100 photos (enhanced). `img/book/{cover,breakfast,lunch,dinner,snack}.jpg` — cover hero + 4 divider photos. `pins/` — 12 pins. `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `manifest.json`, `sw.js`.
- `recipes/*.html` (100 + index) — static SEO pages. `sitemap.xml`, `robots.txt`.
- `book/free-7-day-plan.pdf` (committed, free lead magnet). `book/the-70g-protein-cookbook.pdf` (**local only, git-ignored** — the paid product; 118 pp, ~9.9 MB).
- `CREDITS.md` (photo credits), `MARKETING.md` (sales playbook), `README.md`.

---

## 5. What was done THIS session (chronological, by commit)
1. **Started** from a prior session's state (`316f809`): 100 recipes, a 112-page PDF, SVG-illustration art, **no real photos**, the original `PROGRESS.md` said "next job = fetch Pexels photos."
2. **`fa6cc1f` — the big build:**
   - Fetched a real photo per recipe (Pexels), de-duplicated (found & fixed 10 duplicate groups + many mismatches via visual review), recorded credits.
   - **Recipe depth:** generated `js/recipes-extra.js` (headnotes, servings, storage, difficulty, equipment, allergen badges, SEO copy, estimated sodium/sat-fat/sugar).
   - **SEO:** 100 static recipe pages + JSON-LD + hub + `sitemap.xml` + `robots.txt`; fixed home `<head>` (OG/Twitter/canonical/favicon; "30+"→"100").
   - **PWA:** `manifest.json` + `sw.js` (real offline + installable).
   - **App integration:** cards show badges/headnote/storage + deep-link to static pages.
   - **Funnel assets:** `free-plan.html`, `MARKETING.md`, 12 Pinterest pins, footer CTAs.
   - **PDF:** added Welcome letter, About-the-Author (custom SVG chef crest), Dedication, Buyer License, Closing CTA; surfaced depth fields on recipe pages.
3. **`a19be28`** — replaced the flat SVG **cover + 4 section dividers** with real stock food photos.
4. **`3e1e2ed`** — (interim) variety-collage cover + web header photo banner + email.
5. **`e1571b5` — research-backed sellability pass (latest):** ran a 4-pillar literature study (see §8) and applied it: **single-hero cover** + new **"What's Inside"** variety page; **taste-first** cover/hero/listing copy; **subtle photo enhancement** across all 105 photos + refreshed pins; **research-based pricing**; **email** set to bengisu_sengul@hotmail.com.

**Current numbers:** 100 recipes · 100 photos (enhanced, 0 duplicates, license-clean) · 101 SEO recipe pages · 118-page PDF (~9.9 MB) · 12 pins · validator passes (`VALID`).

---

## 6. What's committed vs NOT
- **Committed:** all code, 100 recipe photos, 5 book photos, 12 pins, recipe pages, sitemap/robots, icons/manifest/sw, `free-plan.html`, `MARKETING.md`, `CREDITS.md`, all `build/*` scripts, `book/free-7-day-plan.pdf`.
- **Git-ignored (NOT in repo):** `book/the-70g-protein-cookbook.pdf` (paid product — lives locally for Gumroad upload), `dist/`, `node_modules/`, `package-lock.json`, `img/_candidates/`, `sample.html`, `.DS_Store`.

---

## 7. How to build / run everything
```bash
cd ~/Desktop/70-gr-protein-meal-recipes
npm install                                  # one-time (Puppeteer/Chromium)

# validate the 100 recipes (must print "VALID")
node -e 'global.window={};require("./js/recipes-data.js");require("./js/illustrations.js");const R=window.RECIPES,A=window.ART,P=[];const ok=new Set(["Meat & Poultry","Seafood","Eggs & Dairy","Produce","Pantry","Condiments & Spices","Supplements","Frozen"]);R.forEach(r=>{if(r.macros.protein<68||r.macros.protein>72)P.push(r.id);if(r.macros.netCarbs>20)P.push(r.id);r.ingredients.forEach(i=>{if(!ok.has(i.aisle))P.push(r.id)})});console.log(R.length,P.length?P:"VALID")'

# regenerate derived data + SEO + assets
node build/build-extra.js                    # -> js/recipes-extra.js
node build/build-pages.js                    # -> recipes/*.html, sitemap.xml, robots.txt
python3 build/build-pins.py                  # -> pins/

# (re)fetch or improve photos (NEEDS the Pexels key from Bengisu)
PEXELS_API_KEY=xxxx node build/fetch-images.js          # simple Pexels
PEXELS_API_KEY=xxxx node build/fetch-multi.js --gather  # multi-source candidates

# build the sellable PDF (then compress into book/)
npm run build:pdf                            # -> dist/the-70g-protein-cookbook.pdf (~75MB)
python3 build/compress-pdf.py dist/the-70g-protein-cookbook.pdf book/the-70g-protein-cookbook.pdf 1000 72   # -> ~9MB
node build/build-lead-magnet.js              # -> book/free-7-day-plan.pdf

# preview locally
python3 -m http.server 8000                  # open http://localhost:8000/ and /cookbook.html
```

---

## 8. Research findings applied (the evidence base, condensed)
**Eating psychology:** photos drive craving nearly as much as real food (Spence 2016; Boswell & Kober 2016) → every recipe needs a great photo. "Healthy = less tasty" bias (Raghunathan 2006) → **lead with taste**; indulgent/taste-first labels beat "healthy" by 25–41% (Turnwald 2017/2019; Wansink 2001). Abundance/whole-plate reads satisfying. Faked "motion" in stills doesn't help (Mulier 2021).
**Color & photography:** warm tones (red/orange/gold) stimulate appetite, green = fresh; **believable high saturation reads as tastier AND healthier** (Kunz 2020). Soft side/back natural light, 45° for hero/layered & flat-lay for bowls, one hero focal point, real matte surfaces, consistency. **Cover = ONE warm hero + big title + negative space** (Reedsy; DocHipo).
**Cookbook UX:** reliability is the #1 thing reviewers judge; complete recipe schema (yield, times, ordered ingredients, numbered steps, headnote, macros-with-protein); 2–3 fonts, body ~12pt/17px, 45–75 char lines, 1.4–1.5 line-height; photo per recipe; mobile-first <3s; never strip PDF photos.
**Conversion/sales:** cover is the #1 lever (pro covers +12–53% CTR); charm pricing (~+24%) + anchor + real time-boxed launch (fake urgency loses ~45% trust); reviews convert ~3.5× (use testimonials with faces); free sample → email → 4-email nurture → launch; Pinterest is a recipe search engine (52% search food, 97% unbranded); author story builds trust. (Full sources were delivered in chat; can be saved to `RESEARCH.md` on request.)

---

## 9. NEXT TASKS / roadmap (what's left)
### A. Go-live (mostly Bengisu's actions — Claude prepares assets + exact steps; all detailed in `MARKETING.md`)
1. **Enable GitHub Pages:** repo → Settings → Pages → Deploy from branch → `claude/high-protein-cookbook-3Av3B` → `/(root)` → Save. Site then live at the URL in §1.
2. **Gumroad:** create account → New product → Digital → upload `book/the-70g-protein-cookbook.pdf` → paste title/description from `MARKETING.md` → set **$12 founding (7 days) → $19**. Then give Claude the product URL → Claude wires `STORE_URL` in `build/build-pages.js`, the "Buy" CTAs in `index.html`/`free-plan.html`, and `BOOK.website` in `js/cookbook.js`, and rebuilds.
3. **Email provider** (ConvertKit/MailerLite/Buttondown): create a form → paste its action URL into `free-plan.html` (replace `REPLACE_WITH_YOUR_EMAIL_PROVIDER_FORM_URL`) → set the welcome email to deliver `book/free-7-day-plan.pdf`.
4. **Google Search Console:** verify site → submit `…/sitemap.xml` → test one recipe in the Rich Results Test.
5. **Pinterest (business):** upload the 12 `pins/`; link each pin to its recipe page (`…/recipes/<id>.html`).

### B. Polish / trust (P1–P2, Claude can do; some need owner input)
6. **Social proof:** Bengisu recruits 10–20 beta testers → Claude adds a testimonials section (with photos) to the sales/free-plan pages.
7. **Recipe reliability QA** (the #1 review risk): a units/times/steps pass across all 100; ideally cook-test a sample; keep "estimated" labels on nutrition.
8. Optional: punch up recipe **headnotes** with more sensory/indulgent words (keep SEO names); minor **typography** pass (body size/line-height, ≤2 fonts); back-cover blurb; review-request automation.
9. **ISBN + print** (later): KDP gives a free ISBN; set `PAGE_SIZE="Letter"` and rebuild for a paperback.

### C. Known caveats / guardrails for the next session
- **Never claim "carnivore."** It's a high-protein book (27 vegetarian recipes; 0 carnivore).
- Don't edit `js/recipes-data.js` (keeps the validator green); add per-recipe content in `recipes-extra.js`.
- Keep the Pexels key env-only; never commit/echo it. Keep CC images commercial-use; no CC-BY-SA.
- The big PDF stays git-ignored. Rebuild + compress it after any content/photo change, for the owner's Gumroad upload.
- Puppeteer needs Chromium (downloads on `npm install`); PDF compression needs `pip install --user pymupdf pillow`.
- Always run the validator + `node -e "new Function(...)"` syntax checks before committing; push only to `claude/high-protein-cookbook-3Av3B`.

---

## 10. Open questions for Bengisu (carry into the next session)
- Do you have Gumroad / an email provider set up yet? (If yes, paste the URLs so the CTAs get wired.)
- Confirm the Pexels API key for any photo re-fetch.
- Any recipes whose photo you still dislike? (Easy targeted re-fetch via `fetch-multi.js`.)
- Want the full cited research saved as `RESEARCH.md`, and the headnote/typography polish done?

---
## 11. Owner's note-to-self (future idea — full version in `IDEAS.md`)
After launch, Bengisu wants to **build an AI agent / agents to run this book's selling &
promotion** (Pinterest, email funnel, listings/SEO, social content, reviews/social proof,
analytics) — likely via the Claude Agent SDK, drawing on this repo's assets (`pins/`,
`recipes/` SEO pages, `MARKETING.md`, the email lead magnet). Not part of the current
launch scope — revisit once the book is live.

---
*End of handoff. A new Claude session: read §0–§4 first, then §5–§7 to reproduce, then §9 for what to do next.*
