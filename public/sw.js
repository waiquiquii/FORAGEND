const CACHE_NAME = "foragend-cache-v1";
const URLS_TO_CACHE = [
  "/", // Solo cachea la raíz en desarrollo
  "/index.html",
];

self.addEventListener("install", (event) => {
  if (process.env.NODE_ENV === "production") {
    // Solo cachea en producción
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
    );
  } else {
    event.waitUntil(skipWaiting()); // En desarrollo, activa inmediatamente
  }
});
