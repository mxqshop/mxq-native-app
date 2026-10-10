/**
 * MXQ 前台 Service Worker（M4 PWA 离线支持，2026-10-06）
 *
 * 缓存策略：
 *   - 静态资源（同源 /img /assets /media /styles.css /app.js /data /manifest /favicon）
 *     → cache-first：命中即回，未命中拉网络并写入缓存。静态资源 URL 自带 ?v= 版本号，
 *       发版换版本号即换缓存键，不会吃到旧文件。
 *   - 页面（HTML 导航）与 /api/ → network-first：在线拿最新的；断网时页面退回缓存的
 *     index.html（可离线浏览已缓存壳），API 失败不假装有数据。
 *
 * 注意：缓存里只存同源 GET；跨域与 POST 一律直连。版本号 SW_VERSION 更新会清理旧缓存。
 */
const SW_VERSION = 'mxq-v20261008a'
const PAGE_CACHE = `${SW_VERSION}-pages`
const ASSET_CACHE = `${SW_VERSION}-assets`
const OFFLINE_URL = '/'

const ASSET_PREFIXES = ['/img/', '/assets/', '/media/', '/data/', '/styles.css', '/app.js', '/manifest.webmanifest', '/favicon.ico']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.addAll([OFFLINE_URL])).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => !key.startsWith(SW_VERSION)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  // 遥测与图片代理不走 SW：遥测要真实送达（SW 缓存会吞掉 204/200 语义），
  // /img 代理出的商品图已有 nginx proxy_cache + Cloudflare 边缘缓存（各 30 天），
  // 再进 SW 缓存只会双份占用配额（M2 图片本地化后 /img 会覆盖全站商品图）。
  if (url.pathname.startsWith('/api/store/telemetry')) return
  if (url.pathname.startsWith('/img/') && /\.(frgimages\.com|ly200-cdn\.com)\//i.test(url.pathname)) return

  const isAsset = ASSET_PREFIXES.some((prefix) => url.pathname === prefix || url.pathname.startsWith(prefix))
  const isNavigation = request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')

  if (isAsset) {
    event.respondWith(
      caches.open(ASSET_CACHE).then(async (cache) => {
        const hit = await cache.match(request)
        if (hit) return hit
        try {
          const response = await fetch(request)
          if (response.ok) cache.put(request, response.clone())
          return response
        } catch (err) {
          return hit || Response.error()
        }
      }),
    )
    return
  }

  if (isNavigation || url.pathname.startsWith('/api/')) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request)
          // 只缓存页面导航成功响应，API 永不缓存（数据实时性优先）
          if (isNavigation && response.ok) {
            const cache = await caches.open(PAGE_CACHE)
            cache.put(request, response.clone())
          }
          return response
        } catch (err) {
          if (isNavigation) {
            const cache = await caches.open(PAGE_CACHE)
            const hit = (await cache.match(request)) || (await cache.match(OFFLINE_URL))
            if (hit) return hit
          }
          throw err
        }
      })(),
    )
  }
})
