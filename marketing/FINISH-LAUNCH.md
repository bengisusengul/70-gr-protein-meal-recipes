# ✅ Finish the launch — your 15-minute owner checklist

Claude did everything it could do without your login/files. These last steps need **you**
(file uploads, DNS, and a billing choice are blocked for an automated assistant). Each is quick.
Order is by money impact.

---

## 1. 🟢 Publish the Reset on Gumroad (≈5 min) — THIS is what turns on sales

The product is **already created and 90% filled in** as a draft:
- Name: **The 4-Week 70 g Protein Reset** · Price: **£29** · URL: **bengisus.gumroad.com/l/reset**
  (the website "Start the Reset" buttons already point here)
- Full description: written ✓

**You just need to add the files + images, then hit Publish.** Open the draft:
→ https://app.gumroad.com/products (click "The 4-Week 70 g Protein Reset")

**a) Content tab → "Upload files"** — add these 3 PDFs (this is what the buyer downloads):
```
book/the-4-week-reset.pdf
book/reset-printables.pdf
book/the-70g-protein-cookbook.pdf
```
Full paths (drag these in from Finder):
- `/Users/bengisusengul/Desktop/cookbook/70-gr-protein-meal-recipes/book/the-4-week-reset.pdf`
- `/Users/bengisusengul/Desktop/cookbook/70-gr-protein-meal-recipes/book/reset-printables.pdf`
- `/Users/bengisusengul/Desktop/cookbook/70-gr-protein-meal-recipes/book/the-70g-protein-cookbook.pdf`

**b) Product tab → Cover** — upload these 4 (1600×900), cover first:
- `build/reset-gumroad/cover.jpg`
- `build/reset-gumroad/gallery-1-whats-inside.jpg`
- `build/reset-gumroad/gallery-2-arc.jpg`
- `build/reset-gumroad/gallery-3-results.jpg`

**c) Product tab → Thumbnail** — upload `build/reset-gumroad/thumbnail.jpg` (800×800).

**d)** (optional) Set Discover **category** = Self-Improvement › Cooking › Recipes and **tags**:
`high protein, meal plan, low sugar, meal prep, weight loss, high protein recipes` (see `reset-gumroad-listing.md`).

**e) Hit "Publish".** Done — the £29 Reset is live and the website already sells it.

> After publishing, add a cross-sell line to the **£12 cookbook** listing (igjxu):
> "Want the whole 4-week system (this cookbook included)? → bengisus.gumroad.com/l/reset"

---

## 2. 📌 Pinterest — upload the 12 pins (≈10 min, big free-traffic lever)

All copy (title + description + destination link) is in **`marketing/pinterest-pins.md`**.
The pin images are in `pins/` and also live at `https://the70gprotein.com/pins/<name>.jpg`.

- First, make sure you're on a **Business** account (free): pinterest.com/business/convert → enables Rich Pins.
- Create 4 boards: *High-Protein Dinners, Breakfast, Lunch & Meal Prep, Low-Carb High-Protein Recipes*.
- For each pin: upload the image, paste the title + description, paste the destination URL. Post a few/day.

Full path: `/Users/bengisusengul/Desktop/cookbook/70-gr-protein-meal-recipes/pins/`

---

## 3. ✉️ Kit — build the welcome→sell sequence (≈10 min)

Full paste-ready copy (5 emails, subjects, bodies, timing) is in **`marketing/email-sequence.md`**.

- Kit → **Automate → Sequences → New sequence**. Add the 5 emails, set each delay (+2 days).
- Then **Automate → Automations**: "When someone subscribes to the Clare form (57976b6071) → add to this sequence."
- Heads-up: sequences need Kit's **Creator (paid) plan**. You're on a free trial now (works during the trial).
  Decide whether to keep the paid plan before it ends — it's the engine that converts subscribers to Reset buyers.

---

## 4. 🌐 Namecheap DNS — verify your sending domain in Kit (≈10 min, deliverability)

So emails send from `@the70gprotein.com` (better inbox placement) instead of `hello@softwareyeah.com`:
1. Kit → **Settings → Email → Sending domains** → add `the70gprotein.com`. Kit shows you 3-4 DNS records (DKIM/SPF/Return-Path).
2. Log into **Namecheap** → Domain List → `the70gprotein.com` → **Advanced DNS** → add each record exactly as Kit lists it.
3. Back in Kit, click **Verify**. Then set the from-address to `@the70gprotein.com`.

While you're in Namecheap: **turn ON auto-renew** (domain expires 2027-06-05, auto-renew is currently OFF).

---

## 5. 🧹 Tiny Kit cleanups (optional, 1 min)

- Delete the test subscriber `bengisushopify+70gtest@gmail.com` (Unconfirmed).
- (Cosmetic) Update the incentive-email redirect to `https://the70gprotein.com/book/free-7-day-plan.pdf`.

---

### Already done for you (no action needed)
- ✅ Reset Program Guide + Printables Pack built (`book/the-4-week-reset.pdf`, `book/reset-printables.pdf`)
- ✅ Reset landing page **live**: https://the70gprotein.com/reset.html (+ homepage/chef-band/footer CTAs)
- ✅ Gumroad Reset product created (draft, £29, slug `reset`, full description)
- ✅ Branded Gumroad images generated (`build/reset-gumroad/`)
- ✅ Google Search Console: domain verified + `sitemap.xml` submitted
- ✅ Cookbook + lead-magnet PDFs rebuilt with the new domain
- ✅ All marketing copy written (`marketing/`)
