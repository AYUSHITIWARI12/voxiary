const CACHE_NAME = "voxiary-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/login.html",
  "/signup.html",
  "/stories.html",
  "/about.html",
  "/css/style.css",
  "/js/mic.js",
  "/js/auth.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
