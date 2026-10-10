# GitHub Actions 云构建

在 GitHub 云端构建 iOS / Android 安装包，**本机不需要装 Xcode 或 Android SDK**。

## 一次性准备

### 1. 推代码到 GitHub

```bash
cd ~/Desktop/个人网站资料/hetzner-deploy/mxq-native-app
git remote add origin https://github.com/<你的用户名>/mxq-native-app.git
git push -u origin main
```

### 2. 配仓库变量（可选但推荐）

**Settings → Secrets and variables → Actions → Variables**

| 名称 | 值 | 说明 |
|---|---|---|
| `MXQ_SRC_REPO` | `https://github.com/<用户>/<前台仓库>` | 前台代码仓库地址；留空则用仓库内 www 快照 |
| `MXQ_SRC_PATH` | `public` | 仓库内前台资源目录 |

> 这样线上前台发布后，CI 会自动拉最新代码打进 App；不配就用提交的快照。

### 3. 配 iOS 证书（想出 `.ipa` 才需要）

**Settings → Secrets and variables → Actions → Secrets**

| 名称 | 值 |
|---|---|
| `APPLE_CERT_P12` | `.p12` 文件的 **base64** 内容 |
| `APPLE_CERT_PASSWORD` | 证书密码 |
| `APPLE_KEY_ID` | App Store Connect API Key ID |
| `APPLE_ISSUER_ID` | App Store Connect Issuer ID |

**Variables** 里再加 `APPLE_PROFILE_NAME`（描述文件类型，如 `App Store`）。

生成 base64：
```bash
base64 -i "你的证书.p12" | pbcopy
```

## 触发构建

- **手动**：Actions 页面 → 选工作流 → `Run workflow`
- **自动**：推 `main` 分支，或打 tag
  ```bash
  git tag v1.0.0 && git push origin v1.0.0
  ```

## 产物在哪

构建完成后在 Actions 运行页面的 **Artifacts** 区域下载：

| 工作流 | 产物 | 说明 |
|---|---|---|
| Android | `mxq-store-apk-debug` | **可直接安装测试**（推荐先用这个验证功能） |
| Android | `mxq-store-apk-unsigned` | Release 包，需自行签名 |
| iOS | `mxq-store-ipa` | 需先配证书；没配则只跑编译验证 |

## 没配 iOS 证书时会怎样

工作流会**跳过签名步骤，只做编译验证**并输出：
```
✅ 工程编译通过（未签名）。配置 APPLE_CERT_P12 后可出 .ipa
```

这样能先确认工程本身没问题，不浪费时间在证书上。

## 注意事项

- **免费额度**：公开仓库 Actions 免费；私有仓库每月 2000 分钟（macOS 按时长 10 倍计费，一个 macOS job 约消耗 10 分钟额度）
- **首次构建较慢**：要下载 Xcode 依赖、JDK、Android SDK，通常 10-20 分钟
- **iOS 证书过期**：`.p12` 与描述文件都有有效期，过期后重新导入
- **`www` 是快照**：接口数据始终实时（走线上 API），但静态壳是构建时快照 — 线上更新后需重新触发构建，或配好 `MXQ_SRC_REPO` 让 CI 自动拉