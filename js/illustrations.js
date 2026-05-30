/*
 * illustrations.js
 * ------------------------------------------------------------------
 * Hand-crafted, flat-style SVG artwork — generated in JS so the whole
 * site stays fully offline with zero dependencies and nothing to fetch.
 *
 * window.ART exposes:
 *   hero(recipe)        -> a plated-dish illustration for a recipe card
 *   categoryIcon(name)  -> small icon for Breakfast/Lunch/Dinner/Snack
 *   aisleIcon(name)     -> icon for a shopping-list aisle header
 *   headerArt()         -> decorative band for the site header
 *
 * All functions return SVG markup strings.
 */

window.ART = (function () {
  "use strict";

  // ---- palettes per protein motif (plate-food fill, accent) ----
  var PAL = {
    chicken:  { bg: "#fbf3e4", food: "#e6b266", accent: "#b9762f", veg: "#6fae54" },
    beef:     { bg: "#f7ece9", food: "#9b4a3c", accent: "#6f2f25", veg: "#6fae54" },
    pork:     { bg: "#f9eef0", food: "#cf8a85", accent: "#9c5650", veg: "#7bb35e" },
    turkey:   { bg: "#f6efe6", food: "#cf9a5c", accent: "#92632f", veg: "#6fae54" },
    salmon:   { bg: "#fdeee8", food: "#f08a63", accent: "#cf5d3a", veg: "#6fae54" },
    cod:      { bg: "#eef4f5", food: "#eae3d6", accent: "#b9a98a", veg: "#6fae54" },
    shrimp:   { bg: "#fdeee9", food: "#f3a98f", accent: "#e3795a", veg: "#6fae54" },
    tuna:     { bg: "#eef2f4", food: "#c4584f", accent: "#8f3a33", veg: "#6fae54" },
    eggs:     { bg: "#fdf6e3", food: "#ffffff", accent: "#f5c542", veg: "#6fae54" },
    tofu:     { bg: "#f3f6ee", food: "#f3ead2", accent: "#cdbb84", veg: "#6fae54" },
    paneer:   { bg: "#f6f1ea", food: "#f6efe0", accent: "#d8b15e", veg: "#5fa247" },
    yogurt:   { bg: "#f3eefb", food: "#ffffff", accent: "#b48ee0", veg: "#d2547e" },
    cottage:  { bg: "#eef5f1", food: "#fbfbf7", accent: "#9bbfa6", veg: "#6fae54" },
    edamame:  { bg: "#eef6ea", food: "#86bf63", accent: "#4d8a3a", veg: "#3f7a2e" },
    smoothie: { bg: "#f1ece1", food: "#7a5230", accent: "#4f3620", veg: "#caa15e" },
    pancakes: { bg: "#fbf1e0", food: "#e0a965", accent: "#a86a30", veg: "#c44d6e" },
    plate:    { bg: "#eef1ee", food: "#cdd6cd", accent: "#8aa18f", veg: "#6fae54" }
  };

  function svg(inner, vb) {
    return '<svg viewBox="' + (vb || "0 0 200 120") + '" preserveAspectRatio="xMidYMid meet" ' +
      'xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">' + inner + "</svg>";
  }

  // A reusable plate base centered around (cx, cy)
  function plate(cx, cy, p) {
    return (
      '<ellipse cx="' + cx + '" cy="' + (cy + 26) + '" rx="62" ry="13" fill="rgba(0,0,0,0.06)"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="46" fill="#ffffff" stroke="#e7e7e2" stroke-width="2"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="34" fill="' + p.bg + '"/>'
    );
  }

  // --- motif builders: each draws food on top of a plate at (100,60) ---
  var MOTIF = {
    chicken: function (p) {
      return plate(100, 60, p) +
        // grilled fillet
        '<path d="M78 64 q10 -20 34 -16 q22 4 14 24 q-8 18 -32 14 q-22 -4 -16 -22 z" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>' +
        '<path d="M84 56 l30 6 M82 64 l32 5 M86 72 l28 3" stroke="' + p.accent + '" stroke-width="2" opacity="0.6" fill="none"/>' +
        broccoli(122, 70, p);
    },
    beef: function (p) {
      return plate(100, 60, p) +
        '<path d="M74 60 q4 -18 26 -18 q30 0 30 18 q0 18 -28 18 q-30 0 -28 -18 z" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>' +
        '<path d="M90 52 q8 8 0 18 M104 50 q8 10 0 20" stroke="#d98c6a" stroke-width="3" fill="none" opacity="0.7"/>' +
        mushroom(126, 72, p);
    },
    pork: function (p) {
      return plate(100, 60, p) +
        '<rect x="74" y="50" width="42" height="22" rx="11" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>' +
        '<rect x="80" y="56" width="42" height="14" rx="7" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>' +
        greenbeans(120, 70, p);
    },
    turkey: function (p) {
      return plate(100, 60, p) +
        '<path d="M76 62 q6 -20 26 -18 q24 2 18 22 q-6 16 -28 12 q-20 -4 -16 -16 z" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>' +
        broccoli(124, 70, p);
    },
    salmon: function (p) {
      return plate(100, 60, p) +
        '<path d="M72 60 q12 -16 30 -14 q26 2 28 16 q-2 14 -28 16 q-22 0 -30 -18 z" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>' +
        '<path d="M80 54 q24 4 40 8 M78 62 q24 3 42 6 M82 70 q22 2 36 3" stroke="#fff" stroke-width="2" opacity="0.7" fill="none"/>' +
        '<path d="M150 52 l8 8 -8 8" fill="none" stroke="' + p.accent + '" stroke-width="2"/>' +  // lemon hint
        asparagus(118, 74, p);
    },
    cod: function (p) {
      return plate(100, 60, p) +
        '<path d="M74 60 q14 -16 30 -14 q24 2 26 14 q-2 14 -26 16 q-22 0 -30 -16 z" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>' +
        '<circle cx="150" cy="54" r="9" fill="#f6e27a" stroke="#d9b441" stroke-width="2"/>' +  // lemon
        broccoli(120, 72, p);
    },
    shrimp: function (p) {
      var s = "";
      [[88, 56], [104, 62], [92, 70]].forEach(function (c) {
        s += '<path d="M' + c[0] + ' ' + c[1] + ' a9 9 0 1 1 9 4 q-6 1 -7 -4" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>';
      });
      return plate(100, 60, p) + s + asparagus(122, 74, p);
    },
    tuna: function (p) {
      return plate(100, 60, p) +
        '<path d="M76 70 q10 -22 24 -22 q14 0 24 22 z" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>' +
        '<path d="M84 66 h32 M88 60 h24" stroke="#fff" stroke-width="2" opacity="0.6"/>' +
        '<circle cx="110" cy="50" r="6" fill="#9ccf6b"/>';  // avocado dot
    },
    eggs: function (p) {
      return plate(100, 60, p) +
        '<ellipse cx="96" cy="62" rx="24" ry="17" fill="#ffffff" stroke="#ece6cf" stroke-width="2"/>' +
        '<circle cx="98" cy="60" r="9" fill="' + p.accent + '"/>' +
        '<path d="M120 70 q6 -8 14 -4" stroke="' + p.veg + '" stroke-width="3" fill="none"/>' +
        spinach(126, 56, p);
    },
    tofu: function (p) {
      var s = "";
      [[86, 54], [104, 56], [90, 70], [108, 70]].forEach(function (c) {
        s += '<rect x="' + c[0] + '" y="' + c[1] + '" width="15" height="15" rx="3" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>';
      });
      return plate(100, 60, p) + s + edamamePods(126, 66, p) +
        '<circle cx="80" cy="48" r="2.5" fill="#3a3a3a"/><circle cx="116" cy="50" r="2.5" fill="#3a3a3a"/>'; // sesame
    },
    paneer: function (p) {
      var s = "";
      [[88, 56], [106, 58], [94, 72]].forEach(function (c) {
        s += '<rect x="' + c[0] + '" y="' + c[1] + '" width="16" height="14" rx="2" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>';
      });
      return plate(100, 60, p) +
        '<path d="M70 66 q14 10 60 2" stroke="' + p.veg + '" stroke-width="6" fill="none" opacity="0.5"/>' + s;
    },
    yogurt: function (p) {
      return (
        '<ellipse cx="100" cy="98" rx="46" ry="10" fill="rgba(0,0,0,0.06)"/>' +
        '<path d="M64 56 q36 16 72 0 l-6 36 q-30 12 -60 0 z" fill="#ffffff" stroke="#e7e7e2" stroke-width="2"/>' +
        '<ellipse cx="100" cy="56" rx="36" ry="11" fill="' + p.food + '" stroke="#ece6cf" stroke-width="2"/>' +
        '<circle cx="88" cy="54" r="5" fill="#d2547e"/><circle cx="104" cy="57" r="5" fill="#7a4fb0"/>' +
        '<circle cx="112" cy="52" r="4" fill="#d2547e"/><circle cx="96" cy="50" r="3.5" fill="' + p.accent + '"/>'
      );
    },
    cottage: function (p) {
      return (
        '<ellipse cx="100" cy="98" rx="46" ry="10" fill="rgba(0,0,0,0.06)"/>' +
        '<path d="M64 56 q36 16 72 0 l-6 36 q-30 12 -60 0 z" fill="#ffffff" stroke="#e7e7e2" stroke-width="2"/>' +
        '<ellipse cx="100" cy="56" rx="36" ry="11" fill="' + p.food + '"/>' +
        '<circle cx="86" cy="55" r="3" fill="#eef0ea"/><circle cx="96" cy="58" r="3" fill="#eef0ea"/>' +
        '<circle cx="108" cy="54" r="3" fill="#eef0ea"/><circle cx="100" cy="52" r="3" fill="#eef0ea"/>' +
        '<path d="M92 50 q4 -8 10 -2" stroke="' + p.veg + '" stroke-width="3" fill="none"/>' +  // cucumber
        '<circle cx="116" cy="50" r="4" fill="#cf5d3a"/>'
      );
    },
    edamame: function (p) {
      return plate(100, 60, p) + edamamePods(96, 56, p) + edamamePods(110, 68, p) + edamamePods(82, 66, p);
    },
    smoothie: function (p) {
      return (
        '<ellipse cx="100" cy="100" rx="30" ry="8" fill="rgba(0,0,0,0.06)"/>' +
        '<path d="M82 38 h36 l-4 58 q-14 6 -28 0 z" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>' +
        '<rect x="80" y="32" width="40" height="8" rx="4" fill="#ffffff" stroke="' + p.accent + '" stroke-width="2"/>' +
        '<rect x="104" y="20" width="5" height="26" rx="2.5" fill="#cf5d3a" transform="rotate(12 104 20)"/>' +  // straw
        '<circle cx="96" cy="60" r="3" fill="#fff" opacity="0.5"/><circle cx="106" cy="74" r="2.5" fill="#fff" opacity="0.4"/>'
      );
    },
    pancakes: function (p) {
      return (
        '<ellipse cx="100" cy="92" rx="48" ry="11" fill="rgba(0,0,0,0.06)"/>' +
        '<circle cx="100" cy="80" r="40" fill="#ffffff" stroke="#e7e7e2" stroke-width="2"/>' +
        stack(100, p) +
        '<circle cx="86" cy="44" r="5" fill="#d2547e"/><circle cx="112" cy="46" r="5" fill="#7a4fb0"/>'  // berries
      );
    },
    plate: function (p) {
      return plate(100, 60, p) +
        '<circle cx="96" cy="58" r="16" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="2"/>' +
        broccoli(122, 70, p);
    }
  };

  // small shared garnish helpers
  function broccoli(x, y, p) {
    return '<circle cx="' + x + '" cy="' + y + '" r="8" fill="' + p.veg + '"/>' +
      '<circle cx="' + (x + 7) + '" cy="' + (y - 4) + '" r="6" fill="' + p.veg + '"/>' +
      '<rect x="' + (x - 2) + '" y="' + y + '" width="4" height="8" fill="#9ccf6b"/>';
  }
  function asparagus(x, y, p) {
    var s = "";
    for (var i = 0; i < 3; i++) {
      s += '<rect x="' + (x + i * 6) + '" y="' + (y - 18) + '" width="4" height="22" rx="2" fill="' + p.veg + '"/>' +
        '<circle cx="' + (x + 2 + i * 6) + '" cy="' + (y - 18) + '" r="3" fill="#4d8a3a"/>';
    }
    return s;
  }
  function greenbeans(x, y, p) {
    return '<path d="M' + x + ' ' + y + ' q14 -6 26 2 M' + x + ' ' + (y + 6) + ' q14 -6 26 2" stroke="' + p.veg + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
  }
  function mushroom(x, y, p) {
    return '<path d="M' + (x - 8) + ' ' + y + ' a8 6 0 0 1 16 0 z" fill="#cdb79a" stroke="#a98e6c" stroke-width="1.5"/>' +
      '<rect x="' + (x - 3) + '" y="' + y + '" width="6" height="7" fill="#e3d4bd"/>';
  }
  function spinach(x, y, p) {
    return '<path d="M' + x + ' ' + y + ' q8 -8 16 0 q-8 8 -16 0 z" fill="' + p.veg + '"/>';
  }
  function edamamePods(x, y, p) {
    return '<path d="M' + x + ' ' + y + ' q12 -8 20 2 q-10 8 -20 -2 z" fill="' + p.food + '" stroke="' + p.accent + '" stroke-width="1.5"/>' +
      '<circle cx="' + (x + 6) + '" cy="' + (y + 0) + '" r="2.5" fill="' + p.accent + '"/>' +
      '<circle cx="' + (x + 12) + '" cy="' + (y + 1) + '" r="2.5" fill="' + p.accent + '"/>';
  }
  function stack(cx, p) {
    var s = "", colors = [p.food, "#e9b873", p.food];
    for (var i = 0; i < 3; i++) {
      s += '<ellipse cx="' + cx + '" cy="' + (78 - i * 9) + '" rx="30" ry="9" fill="' + colors[i] + '" stroke="' + p.accent + '" stroke-width="1.5"/>';
    }
    s += '<path d="M' + (cx - 22) + ' 56 q22 -10 44 0 q-4 6 -22 6 q-18 0 -22 -6 z" fill="#caa15e"/>';  // syrup
    return s;
  }

  // ---- choose an art key from a recipe's existing fields (no data edits) ----
  function pickArtKey(recipe) {
    var hay = (recipe.id + " " + recipe.name + " " + (recipe.tags || []).join(" ")).toLowerCase();
    var order = [
      ["salmon", "salmon"], ["white-fish", "cod"], ["cod", "cod"], ["shrimp", "shrimp"],
      ["tuna", "tuna"], ["beef", "beef"], ["steak", "beef"], ["pork", "pork"],
      ["turkey", "turkey"], ["paneer", "paneer"], ["tofu", "tofu"], ["edamame", "edamame"],
      ["smoothie", "smoothie"], ["shake", "smoothie"], ["blender", "smoothie"],
      ["pancake", "pancakes"], ["mousse", "yogurt"], ["yogurt", "yogurt"],
      ["cottage", "cottage"], ["chicken", "chicken"], ["eggs", "eggs"], ["egg", "eggs"]
    ];
    for (var i = 0; i < order.length; i++) {
      if (hay.indexOf(order[i][0]) !== -1) return order[i][1];
    }
    return "plate";
  }

  function hero(recipe) {
    var key = pickArtKey(recipe);
    var p = PAL[key] || PAL.plate;
    var bg = '<rect x="0" y="0" width="200" height="120" fill="' + p.bg + '"/>' +
      '<circle cx="28" cy="24" r="30" fill="rgba(255,255,255,0.35)"/>' +
      '<circle cx="178" cy="104" r="26" fill="rgba(255,255,255,0.25)"/>';
    return svg(bg + (MOTIF[key] || MOTIF.plate)(p));
  }

  // ---- simple line icons (1em) for categories and aisles ----
  function icon(inner) {
    return '<svg viewBox="0 0 24 24" class="ico" xmlns="http://www.w3.org/2000/svg" ' +
      'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>";
  }
  var CAT_ICON = {
    Breakfast: icon('<circle cx="12" cy="13" r="6"/><circle cx="12" cy="13" r="2.3" fill="currentColor" stroke="none"/><path d="M5 5l1.5 2M19 5l-1.5 2"/>'), // fried egg + sun rays
    Lunch:     icon('<path d="M5 3v8a3 3 0 0 0 3 3v7M8 3v6M11 3v6"/><path d="M18 3c-1.5 1-1.5 6 0 8v10"/>'), // fork + knife
    Dinner:    icon('<circle cx="12" cy="12" r="8"/><path d="M12 8v8M9 10l6 4"/>'), // plate
    Snack:     icon('<path d="M5 11a7 7 0 0 1 14 0z"/><path d="M4 11h16M8 11V8M12 11V7M16 11V8"/>') // bowl
  };
  function categoryIcon(name) { return CAT_ICON[name] || ""; }

  var AISLE_ICON = {
    "Produce":            icon('<path d="M12 7c4-5 9-1 6 4s-6 9-6 9-3-4-6-9 2-9 6-4z"/><path d="M12 7V4"/>'),
    "Meat & Poultry":     icon('<path d="M7 17l-2 2M14 5a4 4 0 0 1 4 6l-6 6a4 4 0 0 1-6-6z"/>'),
    "Seafood":            icon('<path d="M3 12c4-5 12-5 16 0-4 5-12 5-16 0z"/><circle cx="8" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M19 12l3-3v6z"/>'),
    "Eggs & Dairy":       icon('<path d="M7 4h7l2 4v12H7zM16 8h3v9h-3"/>'),
    "Frozen":             icon('<path d="M12 3v18M4 7l16 10M20 7L4 17M9 4l3 3 3-3M9 20l3-3 3 3"/>'),
    "Pantry":             icon('<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M6 9h12"/>'),
    "Condiments & Spices":icon('<path d="M9 3h6v3l1 3v11H8V9l1-3z"/><path d="M10 13h4"/>'),
    "Supplements":        icon('<path d="M4 14a4 4 0 0 0 8 0V6a3 3 0 0 0-6 0"/><path d="M12 10h6a2 2 0 0 1 2 2v2a4 4 0 0 1-8 0"/>'),
    "Other":              icon('<circle cx="12" cy="12" r="8"/>')
  };
  function aisleIcon(name) { return AISLE_ICON[name] || AISLE_ICON.Other; }

  function headerArt() {
    // a soft row of plate/leaf shapes behind the title
    return '<svg class="header-art" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid slice" ' +
      'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<g fill="rgba(255,255,255,0.10)">' +
      '<circle cx="80" cy="30" r="46"/><circle cx="1120" cy="96" r="60"/>' +
      '<circle cx="960" cy="20" r="28"/><circle cx="300" cy="110" r="34"/>' +
      '</g>' +
      '<g fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="3">' +
      '<path d="M1040 40c30-30 70-10 50 24s-50 30-50 30-30-24-30-30 0 0 30-24z"/>' +
      '<circle cx="150" cy="92" r="20"/>' +
      '</g></svg>';
  }

  return {
    hero: hero,
    pickArtKey: pickArtKey,
    categoryIcon: categoryIcon,
    aisleIcon: aisleIcon,
    headerArt: headerArt
  };
})();
