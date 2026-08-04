const CACHE_NAME = 'ganaderia-cache-v2';
const ASSETS_TO_CACHE = [
  'https://pachecobravo.github.io/Ganader-a/',
  'https://pachecobravo.github.io/Ganader-a/index.html',
  'https://pachecobravo.github.io/Ganader-a/manifest.json',
  'https://pachecobravo.github.io/Ganader-a/icon-192.svg',
  'https://pachecobravo.github.io/Ganader-a/icon-512.svg'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS_TO_CACHE))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { if (e.request.method !== 'GET') return; e.respondWith(caches.match(e.request).then(cached => { const net = fetch(e.request).then(r => { if (r && r.ok) { const cl = r.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, cl)); } return r; }).catch(() => cached); return cached || net; })); });
