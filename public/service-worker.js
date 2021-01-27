const FILES_TO_CACHE = [
    '/',
    '/index.html',    
    '/assets/css/style.css',
    '/dist/app.bundle.js',
    'https://fonts.googleapis.com/css?family=Istok+Web|Montserrat:800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
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