// Service Worker: App offline startbar machen und das Luftbild des Plans zwischenspeichern
const CACHE = 'gartenplaner-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

async function networkFirst(req, key) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok || res.type === 'opaque') cache.put(key, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(key);
    if (hit) return hit;
    throw err;
  }
}
async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  // eigene Dateien: immer aktuell, offline aus dem Speicher
  if (u.origin === location.origin) { e.respondWith(networkFirst(req, req)); return; }
  // Bibliotheken (fest versioniert): einmal laden, dann aus dem Speicher
  if (u.host === 'cdnjs.cloudflare.com' || u.host === 'cdn.jsdelivr.net') { e.respondWith(cacheFirst(req)); return; }
  // großes Luftbild des Plans (einzelnes GetMap-Bild): online frisch, offline aus dem Speicher.
  // Getrennt nach Anfrageart gespeichert, weil SVG-Bild (no-cors) und 3D-Textur (cors) verschiedene Antworten brauchen.
  if (u.host === 'geodienste.sachsen.de' && u.searchParams.get('REQUEST') === 'GetMap' && Number(u.searchParams.get('WIDTH')) > 600) {
    e.respondWith(networkFirst(req, req.url + '&_sw=' + req.mode));
  }
});
