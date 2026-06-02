/* Service worker — makes the app genuinely offline-capable + installable.
 * Precaches the app shell; runtime-caches recipe photos and static recipe
 * pages as they're visited. Bump CACHE to invalidate after a deploy. */
var CACHE = "70g-cookbook-v1";
var CORE = [
  "./", "./index.html", "./css/styles.css",
  "./js/recipes-data.js", "./js/science-data.js", "./js/plans-data.js",
  "./js/illustrations.js", "./js/swaps.js", "./js/recipe-images.js",
  "./js/recipes-extra.js", "./js/storage.js", "./js/app.js",
  "./favicon.svg", "./manifest.json"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        try {
          var url = new URL(req.url);
          var cacheable = url.origin === location.origin &&
            (/\.(jpg|jpeg|png|svg|webp)$/.test(url.pathname) || url.pathname.indexOf("/recipes/") !== -1);
          if (cacheable && res && res.status === 200) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(req, copy); });
          }
        } catch (x) {}
        return res;
      }).catch(function () {
        // offline fallback: app shell for navigations
        if (req.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
