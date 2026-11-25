const CACHE_NAME = 'fazendo-dinheiro-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/404.html',
  '/css/style.css?v=5',
  '/js/main.js?v=2',
  '/js/ticker.js',
  '/images/favicon.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)).catch(() => undefined)
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => undefined);
        }
        return networkResponse;
      })
      .catch(() => caches.match(req).then(cached => cached || caches.match('/404.html')))
  );
});
