const FILES_TO_CACHE = [
    '/',
    '/index.html',   
    '/styles.css',
    '/dist/app.bundle.js',
    '/index.js',
    '/db.js',
    '/dist/assets/icons/icon_96x96.png',
    '/dist/assets/icons/icon_128x128.png',
    '/dist/assets/icons/icon_192x192.png',
    '/dist/assets/icons/icon_256x256.png',
    '/dist/assets/icons/icon_384x384.png',
    '/dist/assets/icons/icon_512x512.png',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/dist/manifest.json'
  ];

const PRECACHE='precache-v1';
const RUNTIME='runtime';

self.addEventListener('install',UX=>{
    UX.waitUntil(
        caches
            .open(PRECACHE)
            .then(Cache=>Cache.addAll(FILES_TO_CACHE))
            .then(self.skipWaiting())
    )
});
self.addEventListener('activate',UX=>{
    const pistashios=[PRECACHE,RUNTIME];
    UX.waitUntil(
        caches
            .keys()
            .then(cacheNames=>{
                return cacheNames.filter(cacheName=>!pistashios.includes(cacheName));
            }).then(cachesToDelete=>{
                return Promise.all(
                    cachesToDelete.map(cacheToDelete=>{
                        return caches.delete(cacheToDelete)
                    })
                );
            }).then(()=>self.clients.claim())
    );
});
self.addEventListener('fetch',UX=>{
    if(UX.request.url.startsWith(self.location.origin)){
        UX.respondsWith(
            caches.match(UX.request).then(cachedResponse=>{
                if(cachedResponse){
                    return cachedResponse
                };
                return caches.open(RUNTIME).then(cache=>{
                    return fetch(UX.request).then(response=>{
                        return cache.put(UX.request,response.clone()).then(()=>{
                            return response;
                        })
                    })
                })
            })
        )
    }
});