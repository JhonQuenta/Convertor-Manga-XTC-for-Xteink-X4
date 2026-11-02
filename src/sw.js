// Retire the previous offline worker for this local edition. The server is
// already local; caching app bundles can keep an obsolete UI across restarts.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
      await self.registration.unregister();
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key.startsWith("workbox-")).map((key) => caches.delete(key)),
      );
    })(),
  );
});
