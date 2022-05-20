const CACHE_NAME = "v-1";
const URLtocache = ["index.html", "offline.html"];

const self = this;

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("opened Cache");
                return cache.addAll(URLtocache)
            }
            ))
})
self.addEventListener("fetch", (event) => {
    console.log(event.request.url)
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                .catch(() => caches.match("offline.html"))
            })
    )
})
self.addEventListener("activate", (event) => {
    const cacchewhitelist = [];
    cacchewhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacchewhitelist.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})
