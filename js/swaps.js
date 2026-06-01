/*
 * swaps.js
 * ------------------------------------------------------------------
 * Auto-generated dietary swap suggestions for any recipe — no
 * per-recipe data needed. It scans a recipe's ingredient names and,
 * for each diet (dairy-free, nut-free, soy-free), returns concrete
 * "use X instead of Y" substitutions drawn from a rules table.
 *
 * window.SWAPS.forRecipe(recipe) -> [ { label, note, items:[{from,to}] } ]
 */

window.SWAPS = (function () {
  "use strict";

  function inc(name, words) {
    for (var i = 0; i < words.length; i++) {
      if (name.indexOf(words[i]) !== -1) return true;
    }
    return false;
  }

  // Rules are checked in order; the FIRST match for an ingredient wins,
  // so put specific items (feta, cottage cheese) before generic ones (cheese).
  var DIETS = [
    {
      label: "Dairy-free",
      note: "for lactose intolerance or a dairy-free diet",
      rules: [
        { t: function (n) { return inc(n, ["feta"]); }, to: "vegan feta, or simply omit" },
        { t: function (n) { return inc(n, ["parmesan", "parmigiano", "pecorino"]); }, to: "nutritional yeast or vegan parmesan" },
        { t: function (n) { return inc(n, ["cottage cheese"]); }, to: "dairy-free cottage cheese or blended silken tofu" },
        { t: function (n) { return inc(n, ["cream cheese"]); }, to: "dairy-free cream cheese" },
        { t: function (n) { return inc(n, ["ricotta"]); }, to: "blended firm tofu" },
        { t: function (n) { return inc(n, ["paneer"]); }, to: "extra-firm tofu" },
        { t: function (n) { return inc(n, ["mozzarella", "cheddar", "gouda", "halloumi", "manchego"]); }, to: "dairy-free cheese" },
        { t: function (n) { return inc(n, ["greek yogurt", "yogurt", "skyr"]); }, to: "unsweetened coconut or soy yogurt" },
        { t: function (n) { return inc(n, ["whey", "casein"]); }, to: "pea or other plant protein powder" },
        { t: function (n) { return inc(n, ["butter"]) && !inc(n, ["nut butter", "peanut", "almond butter", "seed butter"]); }, to: "olive oil or vegan butter" },
        { t: function (n) { return inc(n, ["cream"]) && !inc(n, ["cream cheese", "ice cream"]); }, to: "coconut cream" },
        { t: function (n) { return inc(n, ["milk"]) && !inc(n, ["almond", "soy", "oat", "coconut", "cashew", "plant"]); }, to: "soy, oat, or almond milk" },
        { t: function (n) { return inc(n, ["cheese"]); }, to: "dairy-free cheese" }
      ]
    },
    {
      label: "Nut-free",
      note: "for nut allergies — seeds work just as well",
      rules: [
        { t: function (n) { return inc(n, ["almond milk"]); }, to: "oat or soy milk" },
        { t: function (n) { return inc(n, ["almond flour", "almond meal"]); }, to: "sunflower-seed flour" },
        { t: function (n) { return inc(n, ["peanut butter", "almond butter", "cashew butter"]); }, to: "sunflower-seed butter (e.g. SunButter)" },
        { t: function (n) { return inc(n, ["almond", "peanut", "cashew", "walnut", "pecan", "pistachio", "hazelnut", "macadamia"]); }, to: "toasted sunflower or pumpkin seeds" }
      ]
    },
    {
      label: "Soy-free",
      note: "note: a couple of these shift the protein source slightly",
      rules: [
        { t: function (n) { return inc(n, ["soy sauce", "tamari"]); }, to: "coconut aminos" },
        { t: function (n) { return inc(n, ["edamame"]); }, to: "green peas or lima beans" },
        { t: function (n) { return inc(n, ["tofu"]); }, to: "paneer, or extra chicken / egg" },
        { t: function (n) { return inc(n, ["tempeh"]); }, to: "chicken or paneer" },
        { t: function (n) { return inc(n, ["soy milk"]); }, to: "oat or almond milk" },
        { t: function (n) { return inc(n, ["soy protein"]); }, to: "pea protein" },
        { t: function (n) { return inc(n, ["miso"]); }, to: "chickpea miso" }
      ]
    }
  ];

  function forRecipe(recipe) {
    var out = [];
    DIETS.forEach(function (diet) {
      var items = [], seen = {};
      recipe.ingredients.forEach(function (ing) {
        var name = (ing.item || "").toLowerCase();
        for (var i = 0; i < diet.rules.length; i++) {
          if (diet.rules[i].t(name)) {
            if (!seen[ing.item]) { items.push({ from: ing.item, to: diet.rules[i].to }); seen[ing.item] = 1; }
            break;
          }
        }
      });
      if (items.length) out.push({ label: diet.label, note: diet.note, items: items });
    });
    return out;
  }

  return { forRecipe: forRecipe };
})();
