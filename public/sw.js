self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.url.includes("/api/") ||
    event.request.url.includes("/auth/")
  ) {
    return;
  }

  event.respondWith(
    caches.open("static-v1").then((cache) =>
      fetch(event.request)
        .then((response) => {
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(() => cache.match(event.request))
    )
  );
});