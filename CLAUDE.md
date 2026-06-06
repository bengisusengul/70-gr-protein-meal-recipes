# CLAUDE.md — The 70 g Protein Cookbook

You are resuming work on **The 70 g Protein Cookbook**: a high-protein, low-sugar product —
a free interactive web app **plus** a sellable PDF, generated from one dataset of 100 recipes.
Author/owner: **Bengisu Sengul** (bengisu_sengul@hotmail.com), a professional chef.

## 👉 FIRST: read `HANDOFF.md` in this folder.
It is the complete, self-contained session context — file map, build commands, decisions, the
research evidence, and the next-tasks roadmap. `PROGRESS.md` is the short status.

## Essentials
- **Branch:** `claude/high-protein-cookbook-3Av3B` (the default — never use `main`; push only here).
- **It is HIGH-PROTEIN, NOT carnivore** — never add a carnivore claim (0/100 recipes are carnivore; 27 are vegetarian).
- **Do not edit `js/recipes-data.js`** (validated 100-recipe core). Add per-recipe data in `js/recipes-extra.js`.
- **Pexels API key:** ask Bengisu for it; use it env-only (`PEXELS_API_KEY=…`); never commit or echo it.
- **The full PDF** `book/the-70g-protein-cookbook.pdf` is **git-ignored** (it's the paid Gumroad product).
  Rebuild: `npm run build:pdf` → `python3 build/compress-pdf.py dist/the-70g-protein-cookbook.pdf book/the-70g-protein-cookbook.pdf 1000 72`.
- Always run the recipe validator + a JS syntax check before committing (see `HANDOFF.md` §7).

## Status & next step
**LAUNCHED & SELLING** — live at **https://the70gprotein.com**. The **£29 "4-Week Reset"** (`/l/reset`)
and **£12 cookbook** (`igjxu`) are published on Gumroad; the Kit email funnel (5-email sequence +
automation) is running; 12 Pinterest pins + Google Search Console are seeding traffic.
👉 **Read `LAUNCH-STATUS.md` first** — current status + the few owner tidy-ups left (dedupe Pinterest,
Kit billing decision, Namecheap DNS). Owner checklist: `marketing/FINISH-LAUNCH.md`.
