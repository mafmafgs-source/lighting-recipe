// Lighting Recipe Service Worker
const CACHE_NAME = 'lr-cache-v7';
const ASSETS = [
  './',
  './index.html',
  './builder.html',
  './cabinet.html',
  './mypage.html',
  './i18n.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './lib/exifr.min.js',
  './lib/html2canvas.min.js',
  './lib/brand-select.js',
  './data/brands.json',
];

// インストール：アセットを事前キャッシュ
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(ASSETS.map(url =>
        cache.add(url).catch(() => {})
      ))
    ).then(() => self.skipWaiting())
  );
});

// アクティベート：古いキャッシュを削除
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// フェッチ：ネットワーク優先（HTMLは常に最新を取得）
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // HTMLと i18n.js はネットワーク優先（常に最新を取得。翻訳更新を即反映）
  if (e.request.destination === 'document' || e.request.url.includes('i18n.js')) {
    e.respondWith(
      fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // その他：キャッシュ優先
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
