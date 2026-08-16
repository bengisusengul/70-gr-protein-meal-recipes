# 💡 IDEAS — Bengisu's notes to self (not building these yet)

Park interesting ideas here. Don't act on them until you decide to — they're out of
scope for the current launch.

---

## 2026-06-03 — Build an AI agent (or a small team of agents) to run sales & promotion
**Remember this:** I want to build an AI agent / agents to **manage this book's selling
and promotion** — so the marketing largely runs itself instead of being manual.

Starting sketch of what they could do (for when I pick this up):
- **Pinterest agent** — auto-create + schedule keyword pins from recipes (we already
  generate them in `pins/`), each linking to its recipe page; double down on what performs.
- **Email / funnel agent** — write and schedule the nurture sequence, re-engage
  subscribers, and send launch / seasonal offers.
- **Listing & SEO agent** — keep the Gumroad/Etsy/Amazon listings + on-site SEO copy
  fresh; A/B test titles, cover, and price.
- **Social / content agent** — turn recipes into short posts, reel captions, and
  carousels; repurpose across channels.
- **Reviews / social-proof agent** — request reviews after purchase, collect
  testimonials (with photos), and surface them on the sales page.
- **Analytics agent** — watch traffic / sales / conversion and recommend the next move.

Tech notes for later: likely built with the **Claude Agent SDK** + scheduled agents.
This repo already holds the assets these agents would draw on (photos, `pins/`, the
`recipes/` SEO pages, `MARKETING.md`, the email lead magnet). One "orchestrator" could
coordinate the specialists.

---

## 2026-08-15 — "Recipe of the Week" series (Bengisu's idea — WORK ON THIS)

**The idea (owner's words):** make a series like Video 2 — a nice reusable template that
presents one recipe step by step, released weekly. Could also run as a **carousel post**.

**Why it's strong:** a recognizable weekly format is how small food accounts compound —
viewers learn the shape, the algorithm learns the audience, and 100 validated recipes =
100 ready episodes (2 years of content, zero new material needed).

**What already exists to build on (2026-08-15):**
- The Video-2 template is built and platform-safe: hook photo → ingredients w/ gold icons
  → 3 step-cards (icon badge + "STEP n OF 3" + progress dots) → macros card → CTA.
  Produced by Claude's local Puppeteer+ffmpeg pipeline (£0, ~minutes per episode).
- Scene generator: `scenes23.js` pattern (scratchpad) — worth promoting into the repo as
  `build/build-recipe-video.js <recipe-id>` so any recipe becomes an episode on demand.
- All data comes from `js/recipes-data.js` (ingredients, steps, macros) — real numbers only.

**Carousel variant:** the same 6–8 scene stills ARE the carousel — export as PNGs, post as
an IG carousel (great saves/shares signal) and as Pinterest idea-pin frames. One build,
three formats (video, carousel, pins).

**Sketch when picking this up:**
1. Claude: turn the scene generator into `build/build-recipe-video.js` (parameterized by
   recipe id; outputs video + carousel PNGs + caption).
2. Pick a weekly slot (e.g. Sunday = "Recipe of the Week #1") and a series title card.
3. Episode order: start with the crowd-pleasers (steak done, then tikka masala, protein
   cheesecake cups, shakshuka, bulgogi bowl…) — check GoatCounter for which recipe pages
   get real traffic and follow demand.
4. Batch-produce 4 episodes at a time; owner just posts + replies to comments.

---

## 2026-08-15 — Influencer affiliate programme (owner's idea; Claude's honest shaping)

**The idea (owner's words):** reach influencers whose audience matches ours and have them
sell the book for **50% of the income** — money without the hustle.

**Honest assessment (agreed with owner):** the model is sound (digital product, zero marginal
cost, Gumroad has built-in affiliate links with automatic payout splits) but it is NOT
passive — outreach is a 50-100-message numbers game — and it needs **proof first**: with 0
reviews/0 sales history, no serious creator will promote. Prerequisite = first sales + 3-5
reviews (the warm-network weekend).

**The shape that works at our stage — "gift first":**
1. Build a list of 20-30 UK micro-creators (5-50k, high-protein / fitness food / "what I eat
   in a day"; IG + YouTube + newsletters over TikTok — small accounts can't link on TikTok).
2. Send the book FREE with a short personal note, no ask.
3. Whoever genuinely likes it → invite to a 50% Gumroad affiliate link (£9.50/sale at £19).
4. Partners must disclose #ad (UK ASA rules). Never scripts — their own words convert better.

**When:** month 2-3 slot of the 90-day plan, unlocked by first reviews. Claude does the list,
the notes, and the affiliate setup mechanics; owner sends and owns the relationships.
