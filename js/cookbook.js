/*
 * cookbook.js
 * ------------------------------------------------------------------
 * Renders the print/PDF edition of the cookbook from the SAME data the
 * web app uses (window.RECIPES / SCIENCE / MEAL_PLANS) and the same
 * illustration + swap engines (window.ART / SWAPS). Add a recipe to
 * recipes-data.js and it flows straight into the book — no extra work.
 *
 * Pages are laid out for A4; build/build-cookbook.js renders this file
 * to a PDF with Puppeteer. Edit the BOOK config below to brand it.
 */
(function () {
  "use strict";

  // ---- branding: edit these to make the book yours ----
  var BOOK = {
    title: "The 70 g Protein Cookbook",
    subtitle: "100 High-Protein, Low-Sugar Recipes for Strength, Energy & Healthy Aging",
    author: "Bengisu Sengul",
    year: new Date().getFullYear(),
    website: "",                       // e.g. "yourdomain.com" (optional)
    edition: "First Edition"
  };

  var RECIPES = window.RECIPES || [];
  var SCIENCE = window.SCIENCE || { intro: "", sections: [], references: [] };
  var PLANS = window.MEAL_PLANS || [];
  var ART = window.ART || { hero: function () { return ""; } };
  var SWAPS = window.SWAPS || { forRecipe: function () { return []; } };
  var RECIPE_IMAGES = window.RECIPE_IMAGES || [];

  function heroNode(r, cls) {
    var node = el("div", { class: cls, html: ART.hero(r) });
    if (RECIPE_IMAGES.indexOf(r.id) !== -1) {
      node.appendChild(el("img", { class: "hero-img", src: "img/recipes/" + r.id + ".jpg", alt: r.name, onerror: "this.remove()" }));
    }
    return node;
  }

  var CATEGORY_ORDER = ["Breakfast", "Lunch", "Dinner", "Snack"];

  // ---------- tiny DOM helpers (mirrors app.js) ----------
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (attrs[k] != null) node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }
  function fmtQty(qty, unit) {
    if (qty == null) return unit || "to taste";
    var n;
    if (unit === "g" || unit === "ml") n = Math.round(qty);
    else if (unit === "") n = Math.round(qty * 2) / 2;
    else n = Math.round(qty * 100) / 100;
    return unit ? n + " " + unit : String(n);
  }
  // metric→imperial (and vice-versa) so each ingredient shows both systems
  function fmtFrac(value) {
    var whole = Math.floor(value);
    var q = Math.round((value - whole) * 4) / 4;
    if (q === 1) { whole += 1; q = 0; }
    var map = { 0: "", 0.25: "¼", 0.5: "½", 0.75: "¾" };
    var f = map[q] || "";
    if (whole === 0) return f || "0";
    return whole + f;
  }
  function altMeasure(qty, unit) {
    if (qty == null) return null;
    if (unit === "g") { var oz = fmtFrac(qty / 28.3495); return oz === "0" ? null : oz + " oz"; }
    if (unit === "ml") {
      if (qty < 15) return fmtFrac(qty / 5) + " tsp";
      if (qty < 60) return fmtFrac(qty / 15) + " tbsp";
      var c = qty / 240; return fmtFrac(c) + (c >= 2 ? " cups" : " cup");
    }
    if (unit === "tsp") return Math.round(qty * 5) + " ml";
    if (unit === "tbsp") return Math.round(qty * 15) + " ml";
    if (unit === "cup") return Math.round(qty * 240) + " ml";
    if (unit === "oz") return Math.round(qty * 28.35) + " g";
    return null; // counts (eggs), "to taste", etc.
  }

  function recipeAnchor(r) { return "r-" + r.id; }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-"); }

  // ============================================================
  //  PAGES
  // ============================================================
  function pageCover() {
    var sample = RECIPES[0] || {};
    return el("section", { class: "page page-cover" }, [
      el("div", { class: "cover-frame" }, [
        el("div", { class: "cover-kicker" }, [String(RECIPES.length) + " recipes · 70 g protein each · very low sugar"]),
        el("h1", { class: "cover-title" }, [BOOK.title]),
        el("p", { class: "cover-subtitle" }, [BOOK.subtitle]),
        el("div", { class: "cover-art", html: ART.hero(sample) }),
        el("p", { class: "cover-author" }, ["by " + BOOK.author])
      ])
    ]);
  }

  function pageTitle() {
    var veg = RECIPES.filter(function (r) { return r.vegetarian; }).length;
    return el("section", { class: "page page-title" }, [
      el("div", { class: "title-block" }, [
        el("h1", {}, [BOOK.title]),
        el("p", { class: "title-sub" }, [BOOK.subtitle]),
        el("p", { class: "title-author" }, [BOOK.author + " · " + BOOK.edition]),
        el("div", { class: "title-stats" }, [
          el("span", {}, [RECIPES.length + " recipes"]),
          el("span", {}, ["every meal = ~70 g protein"]),
          el("span", {}, [veg + " vegetarian options"]),
          el("span", {}, [PLANS.length + " weekly meal plans"])
        ])
      ]),
      el("div", { class: "copyright" }, [
        el("p", {}, ["Copyright © " + BOOK.year + " " + BOOK.author + ". All rights reserved."]),
        el("p", {}, ["No part of this book may be reproduced or distributed in any form without the author's written permission."]),
        BOOK.website ? el("p", {}, [BOOK.website]) : null,
        el("p", { class: "disclaimer" }, [
          "This book is for general education and is not medical advice. Macros are realistic estimates that vary with brand, cut, and cooking method. " +
          "If you have a medical condition (including kidney disease), are pregnant, or take medication, consult a doctor or registered dietitian before starting a high-protein diet."
        ])
      ])
    ]);
  }

  function pageContents() {
    var list = el("ol", { class: "toc-list" });
    list.appendChild(tocEntry("How to use this book", "#sec-howto"));
    list.appendChild(tocEntry("The science: why this works", "#sec-intro"));
    CATEGORY_ORDER.forEach(function (cat) {
      var inCat = RECIPES.filter(function (r) { return r.category === cat; });
      if (!inCat.length) return;
      list.appendChild(tocEntry(cat + " (" + inCat.length + ")", "#sec-" + slug(cat), "toc-section"));
      inCat.forEach(function (r) {
        list.appendChild(tocEntry(r.name, "#" + recipeAnchor(r), "toc-recipe"));
      });
    });
    list.appendChild(tocEntry("7-Day meal plans", "#sec-plans", "toc-section"));
    list.appendChild(tocEntry("Kitchen conversions & protein chart", "#sec-appendix", "toc-section"));
    list.appendChild(tocEntry("Recipe index (A–Z)", "#sec-index", "toc-section"));

    return el("section", { class: "page page-contents" }, [
      el("h2", { class: "section-title" }, ["Contents"]),
      el("p", { class: "toc-hint" }, ["Tip: in the digital edition, tap any recipe below to jump straight to it — or use your reader's bookmarks panel."]),
      list
    ]);
  }
  function tocEntry(label, href, cls) {
    return el("li", { class: "toc-entry " + (cls || "") }, [
      el("a", { href: href }, [label])
    ]);
  }

  function pageHowToUse() {
    return el("section", { class: "page page-howto", id: "sec-howto" }, [
      el("h2", { class: "section-title" }, ["How to Use This Book"]),
      el("p", { class: "howto-lead" }, [
        "Welcome. Every recipe here is engineered around one simple promise — about " +
        "70 g of protein per serving with very low sugar — so you can hit serious " +
        "protein goals without counting all day. Here's how to get the most from it."
      ]),
      howtoItem("The 70 g rule", "Each recipe makes one serving delivering roughly 70 g of protein (target 68–72 g) while keeping net carbs low — usually under 20 g. The portions are sized to get you there, so you don't have to do the math."),
      howtoItem("Reading a recipe", "Under each title you'll see the time and a macro strip: protein, net carbs, fat, fiber and calories. Net carbs = total carbs minus fiber — the number that actually affects blood sugar."),
      howtoItem("Scaling to you", "70 g per meal is a high, per-main-meal target. If you're smaller or less active, eat a portion of a serving; if you're bigger or training hard, add a snack. The companion web app can scale every recipe to your bodyweight automatically."),
      howtoItem("Make it yours", "Most recipes include a “Make it…” line with dairy-free, nut-free or soy-free swaps so you can adapt them to your needs without losing the protein."),
      howtoItem("Plan your week", "Use the ready-made 7-Day Meal Plans near the back, or mix and match. Aim to spread protein across the day rather than loading it all into one meal."),
      howtoItem("About the numbers", "Macros are realistic estimates based on standard food-composition values; they'll vary a little with brand, cut and cooking method. Treat them as a close guide, not a lab assay."),
      el("p", { class: "howto-safety" }, [
        "This book is educational, not medical advice. If you have a medical condition " +
        "(including kidney disease), are pregnant, or take medication, talk to your doctor " +
        "or a registered dietitian before starting a high-protein diet."
      ])
    ]);
  }
  function howtoItem(h, body) {
    return el("div", { class: "howto-item" }, [
      el("h4", {}, [h]),
      el("p", {}, [body])
    ]);
  }

  function chartTable(headers, rows, cls) {
    var t = el("table", { class: "chart-table " + (cls || "") });
    t.appendChild(el("tr", {}, headers.map(function (h) { return el("th", {}, [h]); })));
    rows.forEach(function (row) {
      t.appendChild(el("tr", {}, row.map(function (c) { return el("td", {}, [String(c)]); })));
    });
    return t;
  }
  function pageConversions() {
    var weight = chartTable(["Metric", "Imperial"], [
      ["25 g", "≈ 1 oz"], ["50 g", "≈ 1¾ oz"], ["100 g", "≈ 3½ oz"], ["150 g", "≈ 5¼ oz"],
      ["200 g", "≈ 7 oz"], ["250 g", "≈ 8¾ oz"], ["500 g", "≈ 1 lb 1½ oz"],
      ["1 oz", "= 28 g"], ["1 lb", "= 454 g"]
    ]);
    var volume = chartTable(["Measure", "Metric"], [
      ["1 tsp", "5 ml"], ["1 tbsp", "15 ml"], ["¼ cup", "60 ml"], ["⅓ cup", "80 ml"],
      ["½ cup", "120 ml"], ["1 cup", "240 ml"], ["1 fl oz", "30 ml"]
    ]);
    var oven = chartTable(["°C", "°F", "Gas"], [
      ["150", "300", "2"], ["160", "325", "3"], ["180", "350", "4"],
      ["190", "375", "5"], ["200", "400", "6"], ["220", "425", "7"], ["230", "450", "8"]
    ]);
    var protein = chartTable(["Food (per 100 g cooked)", "Protein"], [
      ["Chicken / turkey breast", "≈ 30 g"], ["Lean beef, pork tenderloin", "≈ 26 g"],
      ["Salmon, tuna", "≈ 25 g"], ["White fish (cod), shrimp", "≈ 23 g"],
      ["Eggs (≈ 6 g each)", "≈ 13 g"], ["Egg whites", "≈ 11 g"],
      ["0% Greek yogurt", "≈ 10 g"], ["Low-fat cottage cheese", "≈ 11 g"],
      ["Feta", "≈ 14 g"], ["Parmesan", "≈ 36 g"], ["Paneer", "≈ 18 g"],
      ["Firm tofu", "≈ 12 g"], ["Tempeh", "≈ 19 g"], ["Edamame (shelled)", "≈ 11 g"],
      ["Whey protein (per 30 g scoop)", "≈ 24 g"]
    ]);

    return el("section", { class: "page page-appendix", id: "sec-appendix" }, [
      el("h2", { class: "section-title" }, ["Kitchen Conversions & Protein Chart"]),
      el("p", { class: "appendix-lead" }, ["Quick references for cooking the recipes and for building your own 70 g meals."]),
      el("div", { class: "chart-grid" }, [
        el("div", { class: "chart-card" }, [el("h4", {}, ["Weight"]), weight]),
        el("div", { class: "chart-card" }, [el("h4", {}, ["Volume"]), volume]),
        el("div", { class: "chart-card" }, [el("h4", {}, ["Oven temperatures"]), oven])
      ]),
      el("div", { class: "chart-rules" }, [
        el("p", {}, [el("strong", {}, ["Handy rules: "]), "1 tbsp = 3 tsp · 1 cup = 16 tbsp · 1 oz ≈ 28 g · a palm of meat ≈ 100 g ≈ 30 g protein."])
      ]),
      el("h3", { class: "appendix-h" }, ["Protein cheat sheet"]),
      el("p", { class: "appendix-note" }, ["Use this to hit ~70 g protein from whatever you have on hand."]),
      protein
    ]);
  }

  function pageIntro() {
    var wrap = el("section", { class: "page page-intro", id: "sec-intro" }, [
      el("h2", { class: "section-title" }, ["Why This Works"]),
      el("p", { class: "intro-lead" }, [SCIENCE.intro || ""])
    ]);
    (SCIENCE.sections || []).forEach(function (s) {
      wrap.appendChild(el("h3", { class: "intro-h" }, [s.heading]));
      (s.body || []).forEach(function (p) {
        var html = p.replace(/\[(\d+)\]/g, function (_, n) {
          return '<sup class="cite">' + n + "</sup>";
        });
        wrap.appendChild(el("p", { class: "intro-p", html: html }));
      });
    });
    if ((SCIENCE.references || []).length) {
      wrap.appendChild(el("h3", { class: "intro-h" }, ["References"]));
      var ol = el("ol", { class: "ref-list" });
      SCIENCE.references.forEach(function (r) {
        ol.appendChild(el("li", {}, [r.text + (r.url ? "  " + r.url : "")]));
      });
      wrap.appendChild(ol);
    }
    return wrap;
  }

  function pageDivider(cat) {
    var inCat = RECIPES.filter(function (r) { return r.category === cat; });
    var sample = inCat[0] || {};
    return el("section", { class: "page page-divider", id: "sec-" + slug(cat) }, [
      el("div", { class: "divider-inner" }, [
        el("div", { class: "divider-art", html: ART.hero(sample) }),
        el("h2", { class: "divider-title" }, [cat]),
        el("p", { class: "divider-count" }, [inCat.length + (inCat.length === 1 ? " recipe" : " recipes")])
      ])
    ]);
  }

  function recipePage(r) {
    var m = r.macros;
    var macroStrip = el("div", { class: "rcp-macros" }, [
      macroBox(m.protein + " g", "protein", "rcp-protein"),
      macroBox(m.netCarbs + " g", "net carbs", "rcp-carb"),
      macroBox(m.fat + " g", "fat"),
      macroBox(m.fiber + " g", "fiber"),
      macroBox(m.calories, "kcal")
    ]);

    var ings = el("ul", { class: "rcp-ings" }, r.ingredients.map(function (ing) {
      var alt = altMeasure(ing.qty, ing.unit);
      return el("li", {}, [
        el("span", { class: "rcp-qty" }, [fmtQty(ing.qty, ing.unit)]),
        alt ? el("span", { class: "rcp-alt" }, [" (" + alt + ")"]) : null,
        el("span", { class: "rcp-item" }, [" " + ing.item])
      ]);
    }));
    var steps = el("ol", { class: "rcp-steps" }, r.steps.map(function (s) {
      return el("li", {}, [s]);
    }));

    var col = el("div", { class: "rcp-cols" }, [
      el("div", { class: "rcp-col-ings" }, [el("h4", {}, ["Ingredients"]), el("p", { class: "rcp-serv" }, ["Makes 1 serving · ~70 g protein"]), ings]),
      el("div", { class: "rcp-col-method" }, [el("h4", {}, ["Method"]), steps])
    ]);

    var extras = el("div", { class: "rcp-extras" });
    if (r.notes) extras.appendChild(el("p", { class: "rcp-notes" }, [el("strong", {}, ["Tip. "]), r.notes]));
    var swaps = SWAPS.forRecipe(r);
    if (swaps.length) {
      var sb = el("div", { class: "rcp-swaps" }, [el("h4", {}, ["Make it…"])]);
      swaps.forEach(function (g) {
        sb.appendChild(el("p", { class: "swap-line" }, [
          el("span", { class: "swap-diet" }, [g.label + ": "]),
          g.items.map(function (it) { return it.from + " → " + it.to; }).join("  ·  ")
        ]));
      });
      extras.appendChild(sb);
    }

    return el("section", { class: "page page-recipe", id: recipeAnchor(r) }, [
      heroNode(r, "rcp-hero"),
      el("div", { class: "rcp-cat" }, [r.category + (r.vegetarian ? "  ·  Vegetarian" : "")]),
      el("h2", { class: "rcp-name" }, [r.name]),
      el("p", { class: "rcp-time" }, ["Prep " + r.time.prep + " min · Cook " + r.time.cook + " min"]),
      macroStrip,
      col,
      extras
    ]);
  }
  function macroBox(value, label, cls) {
    return el("div", { class: "rcp-macro " + (cls || "") }, [
      el("span", { class: "rcp-macro-val" }, [String(value)]),
      el("span", { class: "rcp-macro-lbl" }, [label])
    ]);
  }

  function byId(id) {
    for (var i = 0; i < RECIPES.length; i++) if (RECIPES[i].id === id) return RECIPES[i];
    return null;
  }
  function pagePlans() {
    var wrap = el("section", { class: "page page-plans", id: "sec-plans" }, [
      el("h2", { class: "section-title" }, ["7-Day Meal Plans"]),
      el("p", { class: "plans-lead" }, ["Three balanced weeks. Each day pairs a breakfast, lunch and dinner for about 210 g of protein. Mix and match to taste."])
    ]);
    PLANS.forEach(function (plan) {
      var table = el("table", { class: "plan-table" });
      table.appendChild(el("tr", {}, [
        el("th", {}, ["Day"]), el("th", {}, ["Breakfast"]), el("th", {}, ["Lunch"]), el("th", {}, ["Dinner"])
      ]));
      plan.days.forEach(function (d) {
        var cells = [el("td", { class: "pl-day" }, [d.day])];
        d.meals.forEach(function (id) {
          var rr = byId(id);
          cells.push(el("td", {}, [rr ? rr.name : "—"]));
        });
        table.appendChild(el("tr", {}, cells));
      });
      wrap.appendChild(el("div", { class: "plan-block" }, [
        el("h3", {}, [plan.name]),
        el("p", { class: "plan-sub" }, [plan.subtitle]),
        table
      ]));
    });
    return wrap;
  }

  function pageIndex() {
    var sorted = RECIPES.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
    var list = el("ul", { class: "index-list" }, sorted.map(function (r) {
      return el("li", {}, [
        el("a", { href: "#" + recipeAnchor(r) }, [r.name]),
        el("span", { class: "index-cat" }, [" — " + r.category])
      ]);
    }));
    return el("section", { class: "page page-index", id: "sec-index" }, [
      el("h2", { class: "section-title" }, ["Recipe Index"]),
      list
    ]);
  }

  // ============================================================
  //  BUILD
  // ============================================================
  function render() {
    var root = document.getElementById("book");
    if (!root) return;
    document.title = BOOK.title;

    root.appendChild(pageCover());
    root.appendChild(pageTitle());
    root.appendChild(pageContents());
    root.appendChild(pageHowToUse());
    root.appendChild(pageIntro());

    CATEGORY_ORDER.forEach(function (cat) {
      var inCat = RECIPES.filter(function (r) { return r.category === cat; });
      if (!inCat.length) return;
      root.appendChild(pageDivider(cat));
      inCat.forEach(function (r) { root.appendChild(recipePage(r)); });
    });

    root.appendChild(pagePlans());
    root.appendChild(pageConversions());
    root.appendChild(pageIndex());

    document.body.setAttribute("data-rendered", "1"); // signal for the PDF builder
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
