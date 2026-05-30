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
  var Store = window.Store;
  var K = Store.KEYS;

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
    // round to at most 2 decimals, drop trailing zeros
    var n = Math.round(qty * 100) / 100;
    return unit ? n + " " + unit : String(n);
  }

  // ============================================================
  //  CORE: shopping-list aggregation (reused by Planner)
  //  Sum identical ingredients (same item + unit) across all
  //  chosen recipes x servings, then group by aisle.
  // ============================================================
  function buildShoppingList(plan) {
    var combined = {}; // key -> { item, unit, qty (or null), aisle }
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
          combined[key].qty += ing.qty * mult;
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

  // ============================================================
  //  RECIPES TAB
  // ============================================================
  var recipeFilters = { q: "", category: "All", veg: false, untried: false };

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

    var head = el("div", { class: "card-head" }, [
      el("div", { class: "card-cat" }, [r.category + (r.vegetarian ? " · veg" : "")]),
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
    var ingList = el("ul", { class: "ing-list" }, r.ingredients.map(function (ing) {
      return el("li", {}, [
        el("span", { class: "ing-qty" }, [fmtQty(ing.qty, ing.unit)]),
        el("span", { class: "ing-name" }, [" " + ing.item])
      ]);
    }));
    var steps = el("ol", { class: "step-list" }, r.steps.map(function (s) {
      return el("li", {}, [s]);
    }));
    var notes = r.notes ? el("p", { class: "card-notes" }, ["💡 " + r.notes]) : null;

    var details = el("div", { class: "card-details" }, [
      el("h4", {}, ["Ingredients (1 serving)"]), ingList,
      el("h4", {}, ["Method"]), steps,
      notes
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

    card.appendChild(head);
    card.appendChild(title);
    card.appendChild(macroBadges(r.macros));
    card.appendChild(time);
    card.appendChild(actions);
    card.appendChild(details);
    return card;
  }

  function recipeMatches(r) {
    var f = recipeFilters;
    if (f.category !== "All" && r.category !== f.category) return false;
    if (f.veg && !r.vegetarian) return false;
    if (f.untried && Store.has(K.TRIED, r.id)) return false;
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
    $("#recipe-count").textContent = shown.length + " of " + RECIPES.length + " recipes";
    if (!shown.length) {
      grid.appendChild(el("p", { class: "empty" }, ["No recipes match those filters."]));
      return;
    }
    shown.forEach(function (r) { grid.appendChild(recipeCard(r)); });
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
      ? meals + " meals · " + protein + "g protein · " + carbs + "g net carbs · " + cals + " kcal total"
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
    var aisleOrder = ["Produce", "Meat & Poultry", "Seafood", "Eggs & Dairy", "Frozen", "Pantry", "Condiments & Spices", "Supplements", "Other"];
    var names = Object.keys(aisles).sort(function (a, b) {
      var ia = aisleOrder.indexOf(a), ib = aisleOrder.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    var checked = Store.read(K.SHOPPING_CHECKED, []);
    names.forEach(function (aisle) {
      var section = el("div", { class: "aisle" }, [
        el("h4", { class: "aisle-name" }, [aisle])
      ]);
      var ul = el("ul", { class: "shop-items" });
      aisles[aisle].forEach(function (c) {
        var isChecked = checked.indexOf(c.key) !== -1;
        var qtyText = c.toTaste && (c.qty == null || c.qty === 0)
          ? "to taste"
          : fmtQty(c.qty, c.unit) + (c.toTaste ? " (+ to taste)" : "");
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

  function buildPlannerControls() {
    $("#print-list").addEventListener("click", function () { window.print(); });
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
    buildTabs();
    buildRecipeControls();
    buildPlannerControls();
    renderRecipes();
    updatePlanBadge();
    updateTrackerBadge();
    showTab("recipes");
  });
})();
