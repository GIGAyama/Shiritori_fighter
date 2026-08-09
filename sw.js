/* しりとりファイター Service Worker */
/*
 * 【最重要】activate では自アプリ以外のキャッシュを削除しない。
 *   gigayama.github.io は数十個のアプリが同一オリジンを共有しているため、
 *   CACHE_PREFIX で始まるキャッシュだけを掃除する。
 *   caches.keys() の結果を全部消すと、同じ端末に入っている他の GIGA アプリの
 *   キャッシュまで巻き添えで消え、それらがオフラインで起動しなくなる。
 *
 * この Service Worker は localStorage を一切操作しない。
 */
const CACHE_PREFIX = 'shiritori-';
const APP_VERSION = 'v1.1.0';   // ← リリースごとに必ず上げる
const CACHE_STATIC = CACHE_PREFIX + 'static-' + APP_VERSION;
const CACHE_RUNTIME = CACHE_PREFIX + 'runtime-' + APP_VERSION;

const PRECACHE_URLS = [
  './',
  './index.html',
  './offline.html',
  './manifest.webmanifest',
  './install-hook.js',
  './css/style.css',
  './js/kana.js',
  './js/app.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_STATIC);
    // addAll は1本でも失敗すると全体が落ちるため、個別に入れる
    await Promise.all(PRECACHE_URLS.map((url) =>
      cache.add(new Request(url, { cache: 'reload' }))
        .catch((err) => console.warn('[sw] precache skipped', url, err))));
    // ここでは skipWaiting しない。
    // 対戦中に中身が入れ替わると、打ちかけのことばや進行中の勝負が消える。
    // 画面側の「さいしんに する」を押してもらってから切り替える。
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      // ← 自アプリ接頭辞のものだけを削除する。ここを外すと同一オリジンの他アプリを巻き添えにする。
      .filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_STATIC && k !== CACHE_RUNTIME)
      .map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 画面遷移は network-first。更新をすぐ届け、圏外ならキャッシュ、
  // それも無ければ offline.html を出す。
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(req);
      } catch {
        return (await caches.match('./index.html'))
            || (await caches.match('./offline.html'))
            || Response.error();
      }
    })());
    return;
  }

  // 自分のファイルは cache-first。校内Wi-Fiが混んでいても即表示される。
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const hit = await caches.match(req, { ignoreSearch: true });
      if (hit) return hit;
      const res = await fetch(req);
      const copy = res.clone();
      caches.open(CACHE_RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
      return res;
    })());
    return;
  }

  // フォントなどの外部資産は cache-first（届かなくても端末側フォントで動く）
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      const copy = res.clone();
      caches.open(CACHE_RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
      return res;
    })());
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
