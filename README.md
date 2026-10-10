# MXQ Store 原生 App（Capacitor）

用 Capacitor 把现有 PWA 站点（mxqshop.to）打包成 iOS / Android 原生 App。
**一份 Web 代码，两个原生安装包**，商城功能与线上完全一致。

- App ID：`to.mxqshop.app`
- App 名称：MXQ Store
- 主题色：`#0b1220`（启动画面与 Android 背景一致）

## 目录结构

```
mxq-native-app/
├── capacitor.config.json      # Capacitor 配置（appId / webDir / 域名白名单）
├── www/                       # 内嵌 Web 资源（从 mxq-storefront/public 同步）
├── ios/App/                   # iOS 工程（Xcode 项目）
├── android/app/               # Android 工程（Gradle）
├── resources/                 # 图标与启动图源文件
└── scripts/sync-web.sh        # 从真源同步 www 并回灌到原生工程
```

## 同步最新线上代码

线上前台改动后，重新同步：

```bash
bash scripts/sync-web.sh
```

脚本会做三件事：从 `mxq-storefront/public` 复制最新资源到 `www/` → `npx cap sync` 回灌 iOS/Android → 打印结果。

## 构建

### iOS（需要 macOS + Xcode）

```bash
npx cap sync ios
open ios/App/App.xcodeproj      # 在 Xcode 里选 Signing Team → Product → Archive
```

命令行出包（需已配置签名证书）：

```bash
cd ios/App && xcodebuild -scheme App -configuration Release \
  -archivePath build/MXQStore.xcarchive archive
```

### Android（需要 Android SDK + JDK 17）

```bash
npx cap sync android
cd android && ./gradlew assembleRelease
# 产物：android/app/build/outputs/apk/release/app-release.apk
```

## 已配置的合规与安全项

| 项 | 配置 |
|---|---|
| 网络安全 | `network_security_config.xml`：全站 HTTPS，禁止明文流量，仅信任系统证书 |
| 权限 | 仅 `INTERNET`（商店审核友好，无过度索权） |
| 隐私清单 | `PrivacyInfo.xcprivacy`：不追踪，声明 4 类收集数据 + 3 类 API 理由 |
| 域名白名单 | `server.allowNavigation` 限定 mxqshop.to 及其子域 |
| 图标 | iOS 1024×1024 单尺寸（现代规范）+ Android 五档密度（48/72/96/144/192） |
| 启动画面 | 主题深蓝纯色 `#0b1220`，与 manifest `backgroundColor` 一致 |

## 上架要点

**iOS**
1. Apple Developer 账号（$99/年），在 Xcode 选 Team 并改 Bundle ID 为你自己的
2. App Store Connect 填隐私问卷（可直接照抄 `PrivacyInfo.xcprivacy` 内容）
3. 因使用第三方支付，**需提供 Stripe/PayPal 商户凭据**并说明 IAP 豁免理由

**Android**
1. Google Play 开发者账号（$25 一次性）
2. 目标 API 级别按 Play 政策要求更新（Capacitor 7 默认已满足）
3. 需提供签名密钥（`android/keystore/`），并用 Play App Signing

## 注意事项

- **www 是内嵌快照**：线上更新后必须跑 `scripts/sync-web.sh`，否则 App 里还是旧版本
- 接口走线上 `https://mxqshop.to/api/store/*`，所以**接口数据永远是实时的**，只有静态壳是快照
- 首屏需要联网（商品目录从接口拉），离线时降级到 Service Worker 缓存