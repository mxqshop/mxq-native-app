#!/usr/bin/env bash
# 从真源同步前台资源到 App 内嵌 www，并回灌 iOS/Android 工程。
# 线上前台发布后必须执行，否则 App 里还是旧版本。
set -euo pipefail

SRC="${MXQ_SRC:-/Users/lizhichao/WorkBuddy/2026-09-22-17-49-07/mxq-storefront/public}"
APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
NODE_BIN="${NODE_BIN:-/Users/lizhichao/.workbuddy/binaries/node/versions/22.22.2-3/bin/node}"
CAP="$APP_DIR/node_modules/.bin/capacitor"

[ -d "$SRC" ] || { echo "❌ 找不到真源目录：$SRC"; exit 1; }
[ -x "$CAP" ] || CAP="/Users/lizhichao/.workbuddy/binaries/node/workspace/node_modules/.bin/capacitor"

echo "▸ 清空并同步 www ← $SRC"
rm -rf "$APP_DIR/www"
mkdir -p "$APP_DIR/www"
for f in index.html app.js styles.css manifest.webmanifest sw.js favicon.ico robots.txt sitemap.xml; do
  [ -f "$SRC/$f" ] && cp "$SRC/$f" "$APP_DIR/www/"
done
for d in img vendor; do
  [ -d "$SRC/$d" ] && cp -r "$SRC/$d" "$APP_DIR/www/"
done
du -sh "$APP_DIR/www"

echo "▸ 回灌原生工程"
cd "$APP_DIR"
NODE_PATH="$APP_DIR/node_modules" "$NODE_BIN" "$CAP" sync ios
NODE_PATH="$APP_DIR/node_modules" "$NODE_BIN" "$CAP" sync android

echo "✅ 同步完成。版本号：$(grep -oE 'app\.js\?v=[0-9a-z]+' www/index.html | head -1)"
