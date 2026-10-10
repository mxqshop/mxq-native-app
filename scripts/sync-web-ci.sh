#!/usr/bin/env bash
# CI 专用：把最新Web 资源灌进 App 壳。
# 优先从 MXQ_SRC_REPO 指定的仓库拉取前台真源；拉不到则退回仓库内已提交的 www 快照。
#
# 需要的 GitHub Actions 变量（Settings → Secrets and variables → Actions → Variables）：
#   MXQ_SRC_REPO  形如 https://github.com/<user>/<repo>（前台代码仓库，需公开或已配 deploy key）
#   MXQ_SRC_PATH  仓库内public 目录的路径，默认 public
# 工作流里映射为 MXQ_WWW_REPO / MXQ_WWW_PATH；两者都读，方便本地手动调试。
set -uo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPO="${MXQ_WWW_REPO:-${MXQ_SRC_REPO:-}}"
SRC_PATH="${MXQ_WWW_PATH:-${MXQ_SRC_PATH:-public}}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "▸ 尝试从上游拉取前台真源：${REPO:-<未配置>} ($SRC_PATH)"

if [ -n "$REPO" ]; then
  if git clone --depth 1 "$REPO" "$TMP/src" 2>/dev/null; then
    SRC="$TMP/src/$SRC_PATH"
    if [ -f "$SRC/app.js" ]; then
      echo "  ✅ 克隆成功，同步 $SRC"
      rm -rf "$APP_DIR/www"
      mkdir -p "$APP_DIR/www"
      for f in index.html app.js styles.css manifest.webmanifest sw.js favicon.ico robots.txt sitemap.xml; do
        [ -f "$SRC/$f" ] && cp "$SRC/$f" "$APP_DIR/www/"
      done
      for d in img vendor; do
        [ -d "$SRC/$d" ] && cp -r "$SRC/$d" "$APP_DIR/www/"
      done
    else
      echo "  ⚠️ 仓库里没找到 $SRC_PATH/app.js，改用仓库内快照"
    fi
  else
    echo "  ⚠️ 克隆失败（仓库不存在/私有/网络受限），改用仓库内快照"
  fi
else
  echo "  ⚠️ 未配置 MXQ_SRC_REPO，改用仓库内快照"
fi

# 兜底：无论拉取成功与否，都必须有可构建的 www
if [ ! -f "$APP_DIR/www/index.html" ]; then
  echo "  ⚠️ 仓库内也没有 www 快照 —— 请提交 www/ 或配置 MXQ_SRC_REPO"
  exit 1
fi

VERSION="$(grep -oE 'app\.js\?v=[0-9a-z]+' "$APP_DIR/www/index.html" | head -1 || echo '未知版本')"
echo "▸ www就绪：$(du -sh "$APP_DIR/www" | awk '{print $1}')，版本 $VERSION"

# 回灌原生工程
cd "$APP_DIR"
if [ -x node_modules/.bin/capacitor ]; then
  CAP="node_modules/.bin/capacitor"
else
  CAP="npx --yes @capacitor/cli"
fi
NODE_PATH="$APP_DIR/node_modules" $CAP sync android

echo "✅ Web 资源同步完成"