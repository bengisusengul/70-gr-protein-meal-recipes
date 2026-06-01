/*
 * app.js
 * ------------------------------------------------------------------
 * All rendering + interaction for the High-Protein Cookbook SPA:
 *   - Recipes tab: searchable/filterable cards, mark tried/favorite,
 *     add to the weekly plan.
 *   - Planner tab: chosen recipes (with a servings multiplier) and an
 *     auto-generated, aisle-grouped shopping list with check-off boxes.
 *   - Tracker tab: progress checklist of tried vs untried recipes.
 *   - Why This Works tab: the cited nutrition rationale.
 *
 * No framework, no build step. Data comes from window.RECIPES /
 * window.SCIENCE; state persists via window.Store.
 */
(function () {
  "use strict";

  var RECIPES = window.RECIPES || [];
  var SCIENCE = window.SCIENCE || { sections: [], references: [] };
  var PLANS = window.MEAL_PLANS || [];
  var ART = window.ART || { hero: function () { return ""; }, categoryIcon: function () { return ""; }, aisleIcon: function () { return ""; } };
  var SWAPS = window.SWAPS || { forRecipe: function () { return []; } };
  var Store = window.Store;
  var K = Store.KEYS;

  var AISLE_ORDER = ["Produce", "Meat & Poultry", "Seafood", "Eggs & Dairy", "Frozen", "Pantry", "Condiments & Spices", "Supplements", "Other"];

  var byId = {};
  RECIPES.forEach(function (r) { byId[r.id] = r; });

  // ---------- small DOM helpers ----------
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k.indexOf("on") === 0 && typeof attrs[k] === "function") {
          node.addEventListener(k.slice(2), attrs[k]);
        } else if (attrs[k] != null) {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }
  function $(sel) { return document.querySelector(sel); }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  // ---------- formatting ----------
  function fmtQty(qty, unit) {
    if (qty == null) return unit || "to taste"; // e.g. "to taste"
    // round sensibly so scaled portions stay tidy:
    // grams/ml -> whole numbers; bare counts -> nearest 0.5; else 2 decimals
    var n;
    if (unit === "g" || unit === "ml") n = Math.round(qty);
    else if (unit === "") n = Math.round(qty * 2) / 2;
    else n = Math.round(qty * 100) / 100;
    return unit ? n + " " + unit : String(n);
  }

  // ============================================================
  //  PORTION SCALING  (from the user's bodyweight/protein target)
  //  Base recipe = 70 g protein. If the user sets a target we scale
  //  every quantity & macro by (their per-meal target / 70), clamped
  //  to a sane 0.5x–2x so portions never get silly.
  // ============================================================
  function getTarget() { return Store.read("target", null); }
  function targetDaily() {
    var t = getTarget();
    if (!t || !t.weight) return null;
    var kg = t.unit === "lb" ? t.weight * 0.453592 : t.weight;
    return kg * (t.gPerKg || 1.6);
  }
  function targetPerMeal() {
    var daily = targetDaily();
    var t = getTarget();
    if (daily == null) return 70;
    return daily / ((t && t.meals) || 3);
  }
  function scaleFactor() {
    var f = targetPerMeal() / 70;
    if (!isFinite(f) || f <= 0) return 1;
    return Math.max(0.5, Math.min(2, f));
  }
  function scaleQty(qty) {
    if (qty == null) return null;
    return Math.round(qty * scaleFactor() * 100) / 100;
  }
  function scaleMacros(m) {
    var f = scaleFactor();
    return {
      protein: Math.round(m.protein * f),
      netCarbs: Math.round(m.netCarbs * f),
      fat: Math.round(m.fat * f),
      fiber: Math.round(m.fiber * f),
      calories: Math.round(m.calories * f)
    };
  }

  // ============================================================
  //  "WHAT CAN I MAKE NOW?"  — match recipes to ingredients on hand
  //  Pantry staples are assumed in the cupboard and ignored.
  // ============================================================
  var PANTRY_WORDS = [
    "salt", "pepper", "olive oil", " oil", "cooking spray", "water", "garlic",
    "onion powder", "garlic powder", "paprika", "cumin", "chili", "chilli",
    "oregano", "basil", "thyme", "dill", "parsley", "cilantro", "coriander",
    "mint", "lemon", "lime", "vinegar", "mustard", "hot sauce", "sriracha",
    "soy sauce", "tamari", "stock", "broth", "stevia", "erythritol", "sweetener",
    "monk fruit", "cinnamon", "vanilla", "baking powder", "baking soda",
    "everything bagel", "sesame", "capers", "herbs", "seasoning", "spice",
    "nutmeg", "turmeric", "ginger", "bay leaf", "red pepper", "cocoa", "cacao"
  ];
  function isPantry(name) {
    name = (" " + name).toLowerCase();
    for (var i = 0; i < PANTRY_WORDS.length; i++) {
      if (name.indexOf(PANTRY_WORDS[i]) !== -1) return true;
    }
    return false;
  }
  function coreIngredients(r) {
    return r.ingredients.filter(function (ing) {
      return ing.qty != null && !isPantry(ing.item);
    });
  }
  function matchInfo(r) {
    var have = recipeFilters.have;
    var core = coreIngredients(r);
    var missing = [];
    core.forEach(function (ing) {
      var name = ing.item.toLowerCase();
      var got = have.some(function (tok) {
        return tok && (name.indexOf(tok) !== -1 || tok.indexOf(name) !== -1);
      });
      if (!got) missing.push(ing.item);
    });
    var total = core.length;
    return {
      total: total,
      have: total - missing.length,
      missing: missing,
      coverage: total ? (total - missing.length) / total : 0
    };
  }

  // ============================================================
  //  CORE: shopping-list aggregation (reused by Planner)
  //  Sum identical ingredients (same item + unit) across all
  //  chosen recipes x servings, then group by aisle.
  // ============================================================
  function buildShoppingList(plan) {
    var combined = {}; // key -> { item, unit, qty (or null), aisle }
    var f = scaleFactor();
    plan.forEach(function (entry) {
      var recipe = byId[entry.id];
      if (!recipe) return;
      var mult = entry.servings || 1;
      recipe.ingredients.forEach(function (ing) {
        var key = (ing.item + "|" + (ing.unit || "")).toLowerCase();
        if (!combined[key]) {
          combined[key] = {
            item: ing.item,
            unit: ing.unit || "",
            aisle: ing.aisle || "Other",
            qty: ing.qty == null ? null : 0,
            toTaste: ing.qty == null
          };
        }
        if (ing.qty != null) {
          if (combined[key].qty == null) combined[key].qty = 0;
          combined[key].qty += ing.qty * mult * f;
        } else {
          combined[key].toTaste = true;
        }
      });
    });

    // group by aisle
    var aisles = {};
    Object.keys(combined).forEach(function (key) {
      var c = combined[key];
      c.key = key;
      if (!aisles[c.aisle]) aisles[c.aisle] = [];
      aisles[c.aisle].push(c);
    });
    Object.keys(aisles).forEach(function (a) {
      aisles[a].sort(function (x, y) { return x.item.localeCompare(y.item); });
    });
    return aisles;
  }

  function sortedAisleNames(aisles) {
    return Object.keys(aisles).sort(function (a, b) {
      var ia = AISLE_ORDER.indexOf(a), ib = AISLE_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
  }
  function itemQtyText(c) {
    return c.toTaste && (c.qty == null || c.qty === 0)
      ? "to taste"
      : fmtQty(c.qty, c.unit) + (c.toTaste ? " (+ to taste)" : "");
  }

  // ============================================================
  //  RECIPES TAB
  // ============================================================
  var recipeFilters = { q: "", category: "All", veg: false, untried: false, have: [], cookNowOnly: false };

  function macroBadges(m) {
    return el("div", { class: "macros" }, [
      el("span", { class: "macro macro-protein", title: "Protein" }, [m.protein + "g protein"]),
      el("span", { class: "macro macro-carb", title: "Net carbs" }, [m.netCarbs + "g net carb"]),
      el("span", { class: "macro", title: "Fat" }, [m.fat + "g fat"]),
      el("span", { class: "macro", title: "Fiber" }, [m.fiber + "g fiber"]),
      el("span", { class: "macro", title: "Calories" }, [m.calories + " kcal"])
    ]);
  }

  function recipeCard(r) {
    var tried = Store.has(K.TRIED, r.id);
    var fav = Store.has(K.FAVORITES, r.id);
    var inPlan = Store.read(K.PLAN, []).some(function (p) { return p.id === r.id; });

    var card = el("article", { class: "card" + (tried ? " is-tried" : ""), "data-id": r.id });

    var hero = el("div", { class: "card-hero", "data-art": ART.pickArtKey ? ART.pickArtKey(r) : "", html: ART.hero(r) });

    var head = el("div", { class: "card-head" }, [
      el("div", { class: "card-cat", html: ART.categoryIcon(r.category) + "<span>" + r.category + (r.vegetarian ? " · veg" : "") + "</span>" }),
      el("button", {
        class: "fav-btn" + (fav ? " on" : ""), title: "Favorite",
        onclick: function () {
          Store.toggle(K.FAVORITES, r.id);
          this.classList.toggle("on");
        }
      }, [fav ? "★" : "☆"])
    ]);

    var title = el("h3", { class: "card-title" }, [r.name]);
    var time = el("div", { class: "card-time" }, [
      "⏱ " + r.time.prep + " min prep · " + r.time.cook + " min cook"
    ]);

    // collapsible details
    var sm = scaleMacros(r.macros);
    var ingHeading = scaleFactor() === 1
      ? "Ingredients (1 serving)"
      : "Ingredients (scaled to ≈" + sm.protein + " g protein)";
    var ingList = el("ul", { class: "ing-list" }, r.ingredients.map(function (ing) {
      return el("li", {}, [
        el("span", { class: "ing-qty" }, [fmtQty(scaleQty(ing.qty), ing.unit)]),
        el("span", { class: "ing-name" }, [" " + ing.item])
      ]);
    }));
    var steps = el("ol", { class: "step-list" }, r.steps.map(function (s) {
      return el("li", {}, [s]);
    }));
    var notes = r.notes ? el("p", { class: "card-notes" }, ["💡 " + r.notes]) : null;

    // dietary swap suggestions (auto-derived from the ingredients)
    var swapGroups = SWAPS.forRecipe(r);
    var swapEl = null;
    if (swapGroups.length) {
      swapEl = el("div", { class: "swaps" }, [el("h4", {}, ["Make it… (swaps)"])]);
      swapGroups.forEach(function (g) {
        var ul = el("ul", { class: "swap-list" }, g.items.map(function (it) {
          return el("li", {}, [
            el("span", { class: "swap-from" }, [it.from]),
            el("span", { class: "swap-arrow" }, [" → "]),
            el("span", { class: "swap-to" }, [it.to])
          ]);
        }));
        swapEl.appendChild(el("div", { class: "swap-group" }, [
          el("span", { class: "swap-diet" }, [g.label]),
          el("span", { class: "swap-note" }, [" " + g.note]),
          ul
        ]));
      });
    }

    var details = el("div", { class: "card-details" }, [
      el("h4", {}, [ingHeading]), ingList,
      el("h4", {}, ["Method"]), steps,
      notes,
      swapEl
    ]);
    details.style.display = "none";

    var toggleBtn = el("button", { class: "link-btn" }, ["Show recipe ▾"]);
    toggleBtn.addEventListener("click", function () {
      var open = details.style.display === "none";
      details.style.display = open ? "block" : "none";
      toggleBtn.textContent = open ? "Hide recipe ▴" : "Show recipe ▾";
    });

    var triedBtn = el("button", {
      class: "btn btn-tried" + (tried ? " on" : ""),
      onclick: function () {
        var nowTried = Store.toggle(K.TRIED, r.id);
        card.classList.toggle("is-tried", nowTried);
        this.classList.toggle("on", nowTried);
        this.textContent = nowTried ? "✓ Made it" : "Mark as made";
        updateTrackerBadge();
      }
    }, [tried ? "✓ Made it" : "Mark as made"]);

    var planBtn = el("button", {
      class: "btn btn-plan" + (inPlan ? " on" : ""),
      onclick: function () {
        var plan = Store.read(K.PLAN, []);
        var idx = plan.map(function (p) { return p.id; }).indexOf(r.id);
        if (idx === -1) { plan.push({ id: r.id, servings: 1 }); this.classList.add("on"); this.textContent = "✓ In plan"; }
        else { plan.splice(idx, 1); this.classList.remove("on"); this.textContent = "+ Add to plan"; }
        Store.write(K.PLAN, plan);
        updatePlanBadge();
      }
    }, [inPlan ? "✓ In plan" : "+ Add to plan"]);

    var actions = el("div", { class: "card-actions" }, [planBtn, triedBtn, toggleBtn]);

    card.appendChild(hero);
    card.appendChild(head);
    card.appendChild(title);
    card.appendChild(macroBadges(sm));
    card.appendChild(time);

    // "what can I make now?" coverage line (only when ingredients are entered)
    if (recipeFilters.have.length) {
      var mi = matchInfo(r);
      if (mi.total > 0) {
        var ml = mi.missing.length === 0
          ? el("p", { class: "match-line have-all" }, ["✓ You have all " + mi.total + " key ingredients"])
          : el("p", { class: "match-line" }, ["You have " + mi.have + "/" + mi.total + " — need: " + mi.missing.join(", ")]);
        card.appendChild(ml);
      }
    }

    card.appendChild(actions);
    card.appendChild(details);
    return card;
  }

  function recipeMatches(r) {
    var f = recipeFilters;
    if (f.category !== "All" && r.category !== f.category) return false;
    if (f.veg && !r.vegetarian) return false;
    if (f.untried && Store.has(K.TRIED, r.id)) return false;
    if (f.cookNowOnly) {
      var mi = matchInfo(r);
      if (!(mi.total > 0 && mi.missing.length === 0)) return false;
    }
    if (f.q) {
      var hay = (r.name + " " + r.tags.join(" ") + " " +
        r.ingredients.map(function (i) { return i.item; }).join(" ")).toLowerCase();
      if (hay.indexOf(f.q.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function renderRecipes() {
    var grid = $("#recipe-grid");
    clear(grid);
    var shown = RECIPES.filter(recipeMatches);
    // when ingredients are on hand, surface the closest matches first
    if (recipeFilters.have.length) {
      shown = shown.slice().sort(function (a, b) {
        return matchInfo(b).coverage - matchInfo(a).coverage;
      });
    }
    $("#recipe-count").textContent = shown.length + " of " + RECIPES.length + " recipes";
    updateScaleNote();
    if (!shown.length) {
      var msg;
      if (recipeFilters.cookNowOnly && !recipeFilters.have.length)
        msg = "Add a few ingredients you have (above), then I'll show what you can make right now.";
      else if (recipeFilters.cookNowOnly)
        msg = "No recipe uses only what you listed. Untick “Only what I can make now” to see your closest matches and exactly what's missing.";
      else
        msg = "No recipes match those filters.";
      grid.appendChild(el("p", { class: "empty" }, [msg]));
      return;
    }
    shown.forEach(function (r) { grid.appendChild(recipeCard(r)); });
  }

  function updateScaleNote() {
    var note = $("#scale-note");
    if (!note) return;
    var f = scaleFactor();
    if (f === 1) { note.style.display = "none"; return; }
    note.style.display = "block";
    note.textContent = "⚖️ Portions scaled ×" + f.toFixed(2) + " to about " +
      Math.round(70 * f) + " g protein per meal (your target).";
  }

  function buildRecipeControls() {
    var cats = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];
    var catWrap = $("#category-filters");
    cats.forEach(function (c) {
      var b = el("button", {
        class: "chip" + (c === "All" ? " active" : ""),
        onclick: function () {
          recipeFilters.category = c;
          catWrap.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("active"); });
          this.classList.add("active");
          renderRecipes();
        }
      }, [c]);
      catWrap.appendChild(b);
    });

    $("#search").addEventListener("input", function () {
      recipeFilters.q = this.value;
      renderRecipes();
    });
    $("#veg-toggle").addEventListener("change", function () {
      recipeFilters.veg = this.checked;
      renderRecipes();
    });
    $("#untried-toggle").addEventListener("change", function () {
      recipeFilters.untried = this.checked;
      renderRecipes();
    });
  }

  // ---------- protein-target calculator (scales portions) ----------
  function updateTargetResult() {
    var res = $("#tg-result");
    if (!res) return;
    var daily = targetDaily();
    if (daily == null) {
      res.innerHTML = "Enter your bodyweight to scale every recipe to you. Right now portions use the book's default <b>70 g protein per meal</b>.";
      return;
    }
    var t = getTarget();
    var perMeal = Math.round(targetPerMeal());
    var f = scaleFactor();
    var capped = Math.abs((targetPerMeal() / 70) - f) > 0.001;
    res.innerHTML = "Daily target ≈ <b>" + Math.round(daily) + " g protein</b> → about <b>" +
      perMeal + " g per meal</b> across " + ((t && t.meals) || 3) + " meals. " +
      "Recipes now scale to ≈" + Math.round(70 * f) + " g each (×" + f.toFixed(2) + ")." +
      (capped ? " <span class='tg-cap'>(capped to a sensible 0.5–2× range)</span>" : "");
  }

  function buildTargetControls() {
    var weightEl = $("#tg-weight"), goalEl = $("#tg-goal"), mealsEl = $("#tg-meals");
    var kgBtn = $("#tg-unit-kg"), lbBtn = $("#tg-unit-lb"), resetBtn = $("#tg-reset");
    if (!weightEl) return;

    var t = getTarget();
    var uiUnit = (t && t.unit) || "kg";

    function paintUnit() {
      kgBtn.classList.toggle("active", uiUnit === "kg");
      lbBtn.classList.toggle("active", uiUnit === "lb");
    }
    function save() {
      var w = parseFloat(weightEl.value);
      Store.write("target", {
        weight: (isFinite(w) && w > 0) ? w : null,
        unit: uiUnit,
        gPerKg: parseFloat(goalEl.value) || 1.6,
        meals: parseInt(mealsEl.value, 10) || 3
      });
      updateTargetResult();
      renderRecipes();
      renderPlanner();
    }

    if (t) {
      if (t.weight) weightEl.value = t.weight;
      if (t.gPerKg) goalEl.value = String(t.gPerKg);
      if (t.meals) mealsEl.value = String(t.meals);
    }
    paintUnit();
    updateTargetResult();

    weightEl.addEventListener("input", save);
    goalEl.addEventListener("change", save);
    mealsEl.addEventListener("change", save);

    kgBtn.addEventListener("click", function () {
      if (uiUnit === "kg") return;
      var v = parseFloat(weightEl.value);
      if (isFinite(v)) weightEl.value = Math.round(v * 0.453592);
      uiUnit = "kg"; paintUnit(); save();
    });
    lbBtn.addEventListener("click", function () {
      if (uiUnit === "lb") return;
      var v = parseFloat(weightEl.value);
      if (isFinite(v)) weightEl.value = Math.round(v / 0.453592);
      uiUnit = "lb"; paintUnit(); save();
    });
    resetBtn.addEventListener("click", function () {
      Store.write("target", null);
      weightEl.value = ""; goalEl.value = "1.6"; mealsEl.value = "3";
      uiUnit = "kg"; paintUnit();
      updateTargetResult();
      renderRecipes();
      renderPlanner();
    });
  }

  // ---------- "what can I make now?" ingredient filter ----------
  function buildCookNowControls() {
    var input = $("#have-input"), toggle = $("#cooknow-toggle"), quick = $("#have-quick");
    if (!input) return;

    function parseHave() {
      recipeFilters.have = input.value.split(",").map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);
      Store.write("have", input.value);
    }

    var saved = Store.read("have", "");
    if (saved) input.value = saved;
    parseHave();

    input.addEventListener("input", function () { parseHave(); renderRecipes(); });
    toggle.addEventListener("change", function () {
      recipeFilters.cookNowOnly = this.checked;
      renderRecipes();
    });

    if (quick) {
      ["chicken", "eggs", "greek yogurt", "salmon", "beef", "tuna", "tofu", "cottage cheese", "shrimp", "spinach"].forEach(function (w) {
        var b = el("button", {
          type: "button", class: "chip have-chip",
          onclick: function () {
            var tokens = input.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
            if (tokens.map(function (x) { return x.toLowerCase(); }).indexOf(w) === -1) {
              tokens.push(w);
              input.value = tokens.join(", ");
              parseHave();
              renderRecipes();
            }
          }
        }, ["+ " + w]);
        quick.appendChild(b);
      });
    }
  }

  // ============================================================
  //  PLANNER TAB  (plan list + shopping list)
  // ============================================================
  function renderPlanner() {
    var plan = Store.read(K.PLAN, []);
    var planWrap = $("#plan-list");
    clear(planWrap);

    if (!plan.length) {
      planWrap.appendChild(el("p", { class: "empty" }, [
        "Your plan is empty. Go to the Recipes tab and tap “+ Add to plan” on the meals you want to cook this week."
      ]));
      clear($("#shopping-list"));
      updatePlanSummary(plan);
      return;
    }

    plan.forEach(function (entry) {
      var r = byId[entry.id];
      if (!r) return;
      var row = el("div", { class: "plan-row" }, [
        el("div", { class: "plan-row-main" }, [
          el("span", { class: "plan-name" }, [r.name]),
          el("span", { class: "plan-cat" }, [r.category + " · " + r.macros.protein + "g protein"])
        ]),
        el("div", { class: "serv-control" }, [
          el("button", { class: "step-btn", title: "Fewer servings", onclick: function () { changeServings(entry.id, -1); } }, ["−"]),
          el("span", { class: "serv-count" }, [String(entry.servings || 1) + "x"]),
          el("button", { class: "step-btn", title: "More servings", onclick: function () { changeServings(entry.id, 1); } }, ["+"]),
          el("button", { class: "remove-btn", title: "Remove", onclick: function () { removeFromPlan(entry.id); } }, ["✕"])
        ])
      ]);
      planWrap.appendChild(row);
    });

    updatePlanSummary(plan);
    renderShoppingList(plan);
  }

  function updatePlanSummary(plan) {
    var f = scaleFactor();
    var meals = 0, protein = 0, carbs = 0, cals = 0;
    plan.forEach(function (e) {
      var r = byId[e.id]; if (!r) return;
      var m = e.servings || 1;
      meals += m;
      protein += r.macros.protein * m;
      carbs += r.macros.netCarbs * m;
      cals += r.macros.calories * m;
    });
    $("#plan-summary").textContent = plan.length
      ? meals + " meals · " + Math.round(protein * f) + "g protein · " +
        Math.round(carbs * f) + "g net carbs · " + Math.round(cals * f) + " kcal total"
      : "";
  }

  function changeServings(id, delta) {
    var plan = Store.read(K.PLAN, []);
    plan.forEach(function (e) {
      if (e.id === id) e.servings = Math.max(1, (e.servings || 1) + delta);
    });
    Store.write(K.PLAN, plan);
    renderPlanner();
  }
  function removeFromPlan(id) {
    var plan = Store.read(K.PLAN, []).filter(function (e) { return e.id !== id; });
    Store.write(K.PLAN, plan);
    renderPlanner();
    renderRecipes(); // reflect "in plan" buttons
    updatePlanBadge();
  }

  function renderShoppingList(plan) {
    var wrap = $("#shopping-list");
    clear(wrap);
    var aisles = buildShoppingList(plan);
    var names = sortedAisleNames(aisles);

    var checked = Store.read(K.SHOPPING_CHECKED, []);
    names.forEach(function (aisle) {
      var section = el("div", { class: "aisle" }, [
        el("h4", { class: "aisle-name", html: ART.aisleIcon(aisle) + "<span>" + aisle + "</span>" })
      ]);
      var ul = el("ul", { class: "shop-items" });
      aisles[aisle].forEach(function (c) {
        var isChecked = checked.indexOf(c.key) !== -1;
        var qtyText = itemQtyText(c);
        var id = "chk_" + c.key.replace(/[^a-z0-9]/gi, "_");
        var box = el("input", { type: "checkbox", id: id });
        box.checked = isChecked;
        box.addEventListener("change", function () {
          Store.toggle(K.SHOPPING_CHECKED, c.key);
          li.classList.toggle("checked", this.checked);
        });
        var li = el("li", { class: "shop-item" + (isChecked ? " checked" : "") }, [
          box,
          el("label", { "for": id }, [
            el("span", { class: "shop-qty" }, [qtyText]),
            el("span", { class: "shop-name" }, [" " + c.item])
          ])
        ]);
        ul.appendChild(li);
      });
      section.appendChild(ul);
      wrap.appendChild(section);
    });
  }

  // ---- export the shopping list as plain text (iOS share sheet / clipboard) ----
  function shoppingListText() {
    var plan = Store.read(K.PLAN, []);
    if (!plan.length) return "";
    var aisles = buildShoppingList(plan);
    var names = sortedAisleNames(aisles);
    var f = scaleFactor();
    var meals = 0, protein = 0;
    plan.forEach(function (e) {
      var r = byId[e.id]; if (!r) return;
      var m = e.servings || 1;
      meals += m; protein += r.macros.protein * m;
    });
    var lines = ["🛒 Shopping List — The 70 g Protein Cookbook"];
    lines.push(meals + " meals · " + Math.round(protein * f) + " g protein total");
    lines.push("");
    names.forEach(function (a) {
      lines.push(a.toUpperCase());
      aisles[a].forEach(function (c) {
        lines.push("• " + itemQtyText(c) + "  " + c.item);
      });
      lines.push("");
    });
    return lines.join("\n").replace(/\n+$/, "\n");
  }

  function shareShoppingList() {
    var text = shoppingListText();
    if (!text) { alert("Your shopping list is empty — add some meals to your plan first."); return; }
    if (navigator.share) {
      navigator.share({ title: "Shopping List", text: text }).catch(function () { /* user cancelled */ });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { alert("Shopping list copied! Paste it into Notes, Messages, or anywhere."); },
        function () { window.prompt("Copy your shopping list:", text); }
      );
    } else {
      window.prompt("Copy your shopping list:", text);
    }
  }

  function buildPlannerControls() {
    $("#print-list").addEventListener("click", function () { window.print(); });
    var shareBtn = $("#share-list");
    if (shareBtn) shareBtn.addEventListener("click", shareShoppingList);
    $("#clear-plan").addEventListener("click", function () {
      if (!confirm("Clear your whole meal plan and shopping list?")) return;
      Store.write(K.PLAN, []);
      Store.write(K.SHOPPING_CHECKED, []);
      renderPlanner();
      renderRecipes();
      updatePlanBadge();
    });
    $("#uncheck-all").addEventListener("click", function () {
      Store.write(K.SHOPPING_CHECKED, []);
      renderPlanner();
    });
  }

  // ============================================================
  //  TRACKER TAB
  // ============================================================
  function renderTracker() {
    var wrap = $("#tracker-list");
    clear(wrap);
    var cats = ["Breakfast", "Lunch", "Dinner", "Snack"];
    cats.forEach(function (cat) {
      var inCat = RECIPES.filter(function (r) { return r.category === cat; });
      if (!inCat.length) return;
      var section = el("div", { class: "track-cat" }, [el("h4", {}, [cat])]);
      var ul = el("ul", { class: "track-items" });
      inCat.forEach(function (r) {
        var tried = Store.has(K.TRIED, r.id);
        var id = "trk_" + r.id;
        var box = el("input", { type: "checkbox", id: id });
        box.checked = tried;
        var li = el("li", { class: "track-item" + (tried ? " done" : "") });
        box.addEventListener("change", function () {
          Store.toggle(K.TRIED, r.id);
          li.classList.toggle("done", this.checked);
          updateTrackerBadge();
          renderRecipes();
        });
        li.appendChild(box);
        li.appendChild(el("label", { "for": id }, [r.name]));
        li.appendChild(el("span", { class: "track-macro" }, [r.macros.protein + "g · " + r.macros.netCarbs + "g carb"]));
        ul.appendChild(li);
      });
      section.appendChild(ul);
      wrap.appendChild(section);
    });
    updateTrackerBadge();
  }

  function updateTrackerBadge() {
    var triedCount = RECIPES.filter(function (r) { return Store.has(K.TRIED, r.id); }).length;
    var pct = Math.round((triedCount / RECIPES.length) * 100);
    var bar = $("#tracker-progress-bar");
    if (bar) bar.style.width = pct + "%";
    var label = $("#tracker-progress-label");
    if (label) label.textContent = triedCount + " of " + RECIPES.length + " recipes made (" + pct + "%)";
  }

  function updatePlanBadge() {
    var plan = Store.read(K.PLAN, []);
    var badge = $("#plan-badge");
    if (badge) {
      badge.textContent = plan.length;
      badge.style.display = plan.length ? "inline-flex" : "none";
    }
  }

  // ============================================================
  //  7-DAY PLANS TAB
  // ============================================================
  // remembers, per plan, whether the optional snack is folded in
  function snackOn(planId) {
    var map = Store.read("planSnacks", {});
    return !!map[planId];
  }
  function setSnackOn(planId, on) {
    var map = Store.read("planSnacks", {});
    map[planId] = on;
    Store.write("planSnacks", map);
  }

  // all recipe ids in a plan, optionally including the daily snacks
  function planMealIds(plan, withSnack) {
    var ids = [];
    plan.days.forEach(function (d) {
      d.meals.forEach(function (id) { if (byId[id]) ids.push(id); });
      if (withSnack && d.snack && byId[d.snack]) ids.push(d.snack);
    });
    return ids;
  }

  function planTotals(plan, withSnack) {
    var t = { meals: 0, protein: 0, carbs: 0, cals: 0 };
    planMealIds(plan, withSnack).forEach(function (id) {
      var r = byId[id];
      t.meals += 1;
      t.protein += r.macros.protein;
      t.carbs += r.macros.netCarbs;
      t.cals += r.macros.calories;
    });
    return t;
  }

  function renderPlans() {
    var wrap = $("#plans-list");
    clear(wrap);
    var slots = ["Breakfast", "Lunch", "Dinner"];

    PLANS.forEach(function (plan) {
      var withSnack = snackOn(plan.id);
      var t = planTotals(plan, withSnack);
      var card = el("div", { class: "plan-card" });

      card.appendChild(el("div", { class: "plan-card-head" }, [
        el("h3", {}, [plan.name]),
        el("p", { class: "plan-sub" }, [plan.subtitle])
      ]));
      card.appendChild(el("p", { class: "plan-desc" }, [plan.description]));
      card.appendChild(el("p", { class: "plan-week-summary" }, [
        Math.round(t.protein / 7) + "g protein/day avg · " +
        Math.round(t.carbs / 7) + "g net carbs/day avg · " +
        Math.round(t.cals / 7) + " kcal/day avg"
      ]));

      // optional-snack toggle
      var snackChk = el("input", { type: "checkbox", id: "snack_" + plan.id });
      snackChk.checked = withSnack;
      snackChk.addEventListener("change", function () {
        setSnackOn(plan.id, this.checked);
        renderPlans();
      });
      var snackToggle = el("label", { class: "snack-toggle" }, [
        snackChk,
        el("span", {}, ["Include the optional daily snack (≈ +70 g protein/day)"])
      ]);
      card.appendChild(snackToggle);

      var loadBtn = el("button", { class: "btn btn-plan on plan-load-btn" }, [
        withSnack ? "⬇ Load this week (with snacks) into the Planner" : "⬇ Load this week into the Planner"
      ]);
      loadBtn.addEventListener("click", function () { loadPlanIntoPlanner(plan, withSnack); });
      card.appendChild(loadBtn);

      var headCols = [el("th", {}, ["Day"])].concat(slots.map(function (s) { return el("th", {}, [s]); }));
      if (withSnack) headCols.push(el("th", { class: "col-snack" }, ["Snack"]));
      headCols.push(el("th", { class: "col-total" }, ["Day total"]));
      var table = el("table", { class: "plan-table" });
      table.appendChild(el("tr", {}, headCols));

      plan.days.forEach(function (d) {
        var cells = [el("td", { class: "day-name", "data-label": "Day" }, [d.day])];
        var dayProtein = 0;
        d.meals.forEach(function (id, mi) {
          var r = byId[id];
          if (!r) { cells.push(el("td", { "data-label": slots[mi] }, ["—"])); return; }
          dayProtein += r.macros.protein;
          cells.push(mealCell(r, false, slots[mi]));
        });
        if (withSnack) {
          var sr = byId[d.snack];
          if (sr) { dayProtein += sr.macros.protein; cells.push(mealCell(sr, true, "Snack")); }
          else cells.push(el("td", { class: "col-snack", "data-label": "Snack" }, ["—"]));
        }
        cells.push(el("td", { class: "col-total", "data-label": "Day total" }, [dayProtein + "g"]));
        table.appendChild(el("tr", {}, cells));
      });

      card.appendChild(el("div", { class: "plan-table-wrap" }, [table]));
      wrap.appendChild(card);
    });
  }

  function mealCell(r, isSnack, label) {
    return el("td", { class: isSnack ? "col-snack" : "", "data-label": label || "" }, [
      el("span", { class: "meal-name" }, [r.name]),
      el("span", { class: "meal-macro" }, [r.macros.protein + "g · " + r.macros.netCarbs + "g carb"])
    ]);
  }

  function loadPlanIntoPlanner(plan, withSnack) {
    var existing = Store.read(K.PLAN, []);
    var label = plan.name + (withSnack ? " (with snacks)" : "");
    if (existing.length && !confirm("Replace your current plan with “" + label + "”? This rebuilds your shopping list for the whole week.")) {
      return;
    }
    // flatten the week into deduped {id, servings}
    var counts = {};
    planMealIds(plan, withSnack).forEach(function (id) {
      counts[id] = (counts[id] || 0) + 1;
    });
    var newPlan = Object.keys(counts).map(function (id) { return { id: id, servings: counts[id] }; });
    Store.write(K.PLAN, newPlan);
    Store.write(K.SHOPPING_CHECKED, []); // fresh shopping list
    updatePlanBadge();
    renderRecipes();
    showTab("planner");
  }

  // ============================================================
  //  SCIENCE TAB
  // ============================================================
  function renderScience() {
    var wrap = $("#science-content");
    if (wrap.dataset.rendered) return;
    wrap.appendChild(el("p", { class: "science-intro" }, [SCIENCE.intro]));
    SCIENCE.sections.forEach(function (s) {
      var sec = el("section", { class: "science-section" }, [el("h3", {}, [s.heading])]);
      s.body.forEach(function (p) {
        // turn [n] markers into links to references
        var html = p.replace(/\[(\d+)\]/g, function (_, n) {
          return '<a class="cite" href="#ref-' + n + '">[' + n + "]</a>";
        });
        sec.appendChild(el("p", { html: html }));
      });
      wrap.appendChild(sec);
    });
    var refs = el("section", { class: "references" }, [el("h3", {}, ["References"])]);
    var ol = el("ol", { class: "ref-list" });
    SCIENCE.references.forEach(function (r) {
      ol.appendChild(el("li", { id: "ref-" + r.n }, [
        r.text + " ",
        el("a", { href: r.url, target: "_blank", rel: "noopener" }, ["link ↗"])
      ]));
    });
    refs.appendChild(ol);
    wrap.appendChild(refs);
    wrap.dataset.rendered = "1";
  }

  // ============================================================
  //  TAB NAVIGATION
  // ============================================================
  function showTab(name) {
    document.querySelectorAll(".tab-panel").forEach(function (p) {
      p.classList.toggle("active", p.id === "tab-" + name);
    });
    document.querySelectorAll(".tab-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.tab === name);
    });
    if (name === "planner") renderPlanner();
    if (name === "tracker") renderTracker();
    if (name === "science") renderScience();
    if (name === "plans") renderPlans();
    if (name === "recipes") renderRecipes();
    window.scrollTo(0, 0);
  }

  function buildTabs() {
    document.querySelectorAll(".tab-btn").forEach(function (b) {
      b.addEventListener("click", function () { showTab(this.dataset.tab); });
    });
  }

  // ============================================================
  //  INIT
  // ============================================================
  document.addEventListener("DOMContentLoaded", function () {
    if (!Store.available) {
      var warn = $("#storage-warning");
      if (warn) warn.style.display = "block";
    }
    var headerMount = $("#header-art-mount");
    if (headerMount && ART.headerArt) headerMount.innerHTML = ART.headerArt();
    buildTabs();
    buildRecipeControls();
    buildTargetControls();
    buildCookNowControls();
    buildPlannerControls();
    renderRecipes();
    updatePlanBadge();
    updateTrackerBadge();
    showTab("recipes");
  });
})();
