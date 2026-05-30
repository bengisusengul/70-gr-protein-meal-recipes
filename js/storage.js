/*
 * storage.js
 * ------------------------------------------------------------------
 * Thin wrapper over localStorage so every feature (tried list, plan,
 * shopping checkmarks, favorites) persists in the browser with no
 * backend. All keys are namespaced under "hpcb." (High-Protein
 * CookBook). Falls back gracefully if localStorage is unavailable.
 */

window.Store = (function () {
  var PREFIX = "hpcb.";
  var available = (function () {
    try {
      var t = "__test__";
      window.localStorage.setItem(t, t);
      window.localStorage.removeItem(t);
      return true;
    } catch (e) {
      return false;
    }
  })();

  // in-memory fallback so the app still works in private mode / file://
  var memory = {};

  function read(key, fallback) {
    var raw;
    if (available) {
      raw = window.localStorage.getItem(PREFIX + key);
    } else {
      raw = memory[key];
    }
    if (raw == null) return fallback;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    var raw = JSON.stringify(value);
    if (available) {
      try { window.localStorage.setItem(PREFIX + key, raw); } catch (e) { /* quota */ }
    } else {
      memory[key] = raw;
    }
  }

  // ---- set helpers (arrays used as sets of ids/keys) ----
  function has(key, id) {
    return read(key, []).indexOf(id) !== -1;
  }
  function toggle(key, id) {
    var arr = read(key, []);
    var i = arr.indexOf(id);
    if (i === -1) arr.push(id); else arr.splice(i, 1);
    write(key, arr);
    return i === -1; // true if now present
  }
  function add(key, id) {
    var arr = read(key, []);
    if (arr.indexOf(id) === -1) { arr.push(id); write(key, arr); }
  }
  function remove(key, id) {
    var arr = read(key, []);
    var i = arr.indexOf(id);
    if (i !== -1) { arr.splice(i, 1); write(key, arr); }
  }

  return {
    KEYS: {
      TRIED: "tried",
      FAVORITES: "favorites",
      PLAN: "plan",
      SHOPPING_CHECKED: "shoppingChecked"
    },
    read: read,
    write: write,
    has: has,
    toggle: toggle,
    add: add,
    remove: remove,
    available: available
  };
})();
