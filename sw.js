// preload
const serviceWorker = self;
const CACHE = 'rolling-ball-v2';

serviceWorker.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then(cache => cache.addAll(['/', '/app.js', '/style.css']))
    );
});

serviceWorker.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => keys.filter(k => k !== CACHE))
            .then(keysToRemove => Promise.all(keysToRemove.map(key => caches.delete(key))))
    );
});

serviceWorker.addEventListener('fetch', event => {
    event.respondWith(
        caches
            .open(CACHE)
            .then(cache => cache.match(event.request))
            .then(response => {
                return response || Promise.reject();
            })
    );

    event.waitUntil(
        fetch(event.request).then(response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }

            return caches.open(CACHE).then(cache => cache.put(event.request, response));
        })
    );
});