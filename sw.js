// ==========================================
// 粵語通 CANTONESE LEARNER - SERVICE WORKER (PWA)
// ==========================================

const CACHE_NAME = 'cantonese-learner-v1.8.0';

const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon.svg',
    '/data/profiles.json',
    '/data/scenarios.json'
];

// 1. Install Event: Cache Core Static Shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Pre-caching core application shell & resources');
            return cache.addAll(PRECACHE_ASSETS).catch((err) => {
                console.warn('[SW] Some precache assets failed, continuing:', err.message);
            });
        }).then(() => self.skipWaiting())
    );
});

// 2. Activate Event: Clean Stale Caches & Claim Clients
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('[SW] Deleting stale cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. Fetch Event: Cache-First / Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // Skip non-GET requests
    if (req.method !== 'GET') {
        return;
    }

    // Skip Chrome Extension & external analytics requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // A. API Requests: Network First with Cache Fallback
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(req)
                .then((networkRes) => {
                    // Clone and cache successful GET responses for /api/profiles or /api/scenarios
                    if (networkRes.ok && (url.pathname === '/api/profiles' || url.pathname === '/api/scenarios')) {
                        const resClone = networkRes.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
                    }
                    return networkRes;
                })
                .catch(() => {
                    return caches.match(req).then((cachedRes) => {
                        if (cachedRes) return cachedRes;
                        // Return offline JSON message
                        return new Response(JSON.stringify({ 
                            offline: true, 
                            message: 'Network offline. Using cached local data.' 
                        }), {
                            headers: { 'Content-Type': 'application/json; charset=utf-8' }
                        });
                    });
                })
        );
        return;
    }

    // B. Static Assets & App Shell: Cache First, Network Fallback
    event.respondWith(
        caches.match(req).then((cachedRes) => {
            if (cachedRes) {
                // Fetch in background to update cache for next time
                fetch(req).then((freshRes) => {
                    if (freshRes.ok) {
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, freshRes));
                    }
                }).catch(() => {});
                return cachedRes;
            }

            return fetch(req)
                .then((networkRes) => {
                    if (networkRes.ok && networkRes.type === 'basic') {
                        const resClone = networkRes.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
                    }
                    return networkRes;
                })
                .catch(() => {
                    // If HTML navigation fails offline, serve root index.html
                    if (req.mode === 'navigate') {
                        return caches.match('/index.html') || caches.match('/');
                    }
                });
        })
    );
});

// 4. Message Event
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
