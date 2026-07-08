# CLAUDE.md — The 70 g Protein Cookbook

You are resuming work on **The 70 g Protein Cookbook**: a high-protein, low-sugar product —
a free interactive web app **plus** a sellable PDF, generated from one dataset of 100 recipes.
Author/owner: **Bengisu Sengul** (bengisu_sengul@hotmail.com), a professional chef.

## 👉 FIRST: read `HANDOFF.md` in this folder.
It is the complete, self-contained session context — file map, build commands, decisions, the
research evidence, and the next-tasks roadmap. `LAUNCH-STATUS.md` is the status ledger.
(`PROGRESS.md` is historical — frozen at 2026-06-03.)

## Essentials
- **Branch:** `claude/high-protein-cookbook-3Av3B` (the default — never use `main`; push only here).
- **It is HIGH-PROTEIN, NOT carnivore** — never add a carnivore claim (0/100 recipes are carnivore; 27 are vegetarian).
- **Do not edit `js/recipes-data.js`** (validated 100-recipe core). Add per-recipe data in `js/recipes-extra.js`.
- **Pexels API key:** ask Bengisu for it; use it env-only (`PEXELS_API_KEY=…`); never commit or echo it.
- **The full PDF** `book/the-70g-protein-cookbook.pdf` is **git-ignored** (it's the paid Gumroad product).
  Rebuild: `npm run build:pdf` → `python3 build/compress-pdf.py dist/the-70g-protein-cookbook.pdf book/the-70g-protein-cookbook.pdf 1000 72`.
- Always run the recipe validator + a JS syntax check before committing (see `HANDOFF.md` §6).

## Status & next step (as of 2026-07-08)
**LIVE, not yet selling** — site live at **https://the70gprotein.com**, both products published on
Gumroad (£29 Reset `/l/reset`, £12 cookbook `igjxu`), **no recorded sales yet**; the June growth
engine was never executed, so July–September runs on **`marketing/90-DAY-SALES-PLAN.md` (THE
operating doc)** + `marketing/SCOREBOARD.md` (filled Sundays). Kit form captures emails but the
5-email sequence is **paused on the free tier** (upgrade gate: ~250 subs or first £100 month).
GoatCounter analytics **live** since Jul 4 (code `the70gprotein`).
👉 Read order: `HANDOFF.md` → `LAUNCH-STATUS.md` → the 90-day plan + scoreboard.
