// INNOVEX OS Service Worker (Network-First Strategy for Instant Fresh Updates)
const CACHE_NAME = 'innovex-v7';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/i18n.js',
  './js/app.js',
  './js/voice_commands.js',
  './js/tracks/drone_swarm.js',
  './js/tracks/agri_tech.js',
  './js/tracks/smart_city.js',
  './js/tracks/health_tech.js',
  './js/tracks/industrial_iot.js',
  './js/tracks/open_innovation.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/favicon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Network-first so any edits to HTML/JS immediately show in the browser
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(e.request))
  );
});
