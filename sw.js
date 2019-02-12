const serviceWorker = self;

serviceWorker.addEventListener('install', event => {
    // todo (A2): prefetch all assets
});

serviceWorker.addEventListener('changeme!', event => {
    // todo (A3): serve response from cache if present

    // todo (A4): update cache by fetching over the network
});

// todo (bonus): use different cache per service worker release, and cleanup old caches