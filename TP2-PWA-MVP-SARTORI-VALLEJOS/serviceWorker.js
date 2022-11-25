const CACHE_NAME = 'version1';

importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

self.addEventListener("message", event => {
    if (event.data && event.data.type == "SKIP_WAITING"){
        self.skipWaiting();
    }
});

//  CACHEANDO RECURSOS
workbox.routing.registerRoute(
    new RegExp('/*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: CACHE_NAME
    })
);