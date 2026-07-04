/* Service worker mínimo — habilita la instalación como app y un mínimo de offline. */
const CACHE = 'informes-jstech-v1';
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(resp){
      try { const c = resp.clone(); caches.open(CACHE).then(function(cache){ cache.put(e.request, c); }); } catch(_) {}
      return resp;
    }).catch(function(){ return caches.match(e.request); })
  );
});
