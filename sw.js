// Lighting Recipe Service Worker
const CACHE_NAME = 'lr-cache-v2';
const ASSETS = [
  './',
  './index.html',
  './builder.html',
  './mypage.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  // 外部CDN（オフライン時に備えてキャッシュ）
  'https://cdn.jsdelivr.net/npm/exifr/dist/full.umd.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
];

// インストール：アセットを事前キャッシュ
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      // 外部CDNは失敗してもインストールを止めない
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

// フェッチ：キャッシュ優先、なければネットワーク
self.addEventListener('fetch', e => {
  // POST やブラウザ内部リクエストはスキップ
  if (e.request.method !== 'GET') return;
  // Nominatim（地図検索）はキャッシュしない（常に最新が必要）
  if (e.request.url.includes('nominatim.openstreetmap.org')) return;
  // OSMタイル画像もキャッシュしない（容量節約）
  if (e.request.url.includes('tile.openstreetmap.org')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        // 正常なレスポンスはキャッシュに追加
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        // オフライン時：HTMLリクエストにはindex.htmlを返す
        if (e.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
