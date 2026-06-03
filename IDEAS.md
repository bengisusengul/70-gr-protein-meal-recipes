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
