#!/usr/bin/env python3
"""将最新已上传且处理完成的 build 关联到 App Store 版本并提交审核。

门控步骤（ios.yml 中仅在 secrets.IOS_SUBMIT_FOR_REVIEW=true 时运行），
且以 continue-on-error 执行，失败不影响整体构建。

依赖环境变量：
  APPLE_KEY_ID         App Store Connect API Key ID
  APPLE_ISSUER_ID      Issuer ID
  APPLE_API_KEY_P8     .p8 认证密钥的本地路径（如 ~/private_keys/AuthKey_XXX.p8）
  BUNDLE_ID            应用 Bundle ID（to.mxqshop.app）
  APP_VERSION          应用版本号（如 1.0.0，取自 Info.plist）

说明：
  - 仅用 Python 标准库 + openssl（macOS runner 自带）签发 ES256 JWT，无第三方依赖。
  - 会选取该 App 最新且 processingState==VALID 的 build 关联到指定版本后提交审核。
  - 若刚上传的 build 仍在处理中（非 VALID），会提示稍后重试——可重新跑一次该 job。
"""
import os
import sys
import json
import time
import base64
import subprocess
import urllib.request
import urllib.error

BASE = "https://api.appstoreconnect.apple.com/v1"


def b64url(b: bytes) -> str:
    return base64.urlsafe_b64encode(b).rstrip(b"=").decode()


def make_jwt() -> str:
    key_id = os.environ["APPLE_KEY_ID"]
    issuer = os.environ["APPLE_ISSUER_ID"]
    p8 = os.environ["APPLE_API_KEY_P8"]
    now = int(time.time())
    header = {"alg": "ES256", "kid": key_id, "typ": "JWT"}
    payload = {"iss": issuer, "iat": now, "exp": now + 600, "aud": "appstoreconnect-v1"}
    signing_input = (
        b64url(json.dumps(header, separators=(",", ":")).encode())
        + "."
        + b64url(json.dumps(payload, separators=(",", ":")).encode())
    ).encode()
    # ES256 用 P-256 椭圆曲线签名，openssl 产出原始 r||s（正是 JWT 所需格式）
    sig = subprocess.run(
        ["openssl", "dgst", "-sha256", "-sign", p8, "-binary"],
        input=signing_input,
        capture_output=True,
    ).stdout
    if not sig:
        raise RuntimeError("openssl 签名失败，请确认 APPLE_API_KEY_P8 指向有效 .p8 文件")
    return signing_input.decode() + "." + b64url(sig)


def api(method: str, path: str, token: str, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(BASE + path, data=data, method=method)
    req.add_header("Authorization", "Bearer " + token)
    if data:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        sys.stderr.write("HTTP %s: %s\n" % (e.code, e.read().decode()[:600]))
        raise


def first(token, path):
    return api("GET", path, token).get("data", [None])[0]


def main():
    for k in ("APPLE_KEY_ID", "APPLE_ISSUER_ID", "APPLE_API_KEY_P8", "BUNDLE_ID", "APP_VERSION"):
        if not os.environ.get(k):
            print("✗ 缺少环境变量: %s" % k)
            sys.exit(1)

    token = make_jwt()
    bundle = os.environ["BUNDLE_ID"]
    version = os.environ["APP_VERSION"]

    app = first(token, "/apps?filter[bundleId]=%s" % bundle)
    if not app:
        print("✗ 未找到 bundleId=%s 的 App，请确认 App Store Connect 已创建" % bundle)
        sys.exit(1)
    app_id = app["id"]
    print("✓ app id:", app_id)

    ver = first(token, "/apps/%s/appStoreVersions?filter[versionString]=%s" % (app_id, version))
    if not ver:
        print("✗ 未找到版本 %s，请先在 App Store Connect 创建该版本并填好必填元数据" % version)
        sys.exit(1)
    ver_id = ver["id"]
    print("✓ appStoreVersion:", ver_id, "当前状态:", ver.get("attributes", {}).get("appStoreState"))

    builds = api("GET", "/apps/%s/builds?sort=-uploadedDate&limit=20" % app_id, token).get("data", [])
    build = next((b for b in builds if b.get("attributes", {}).get("processingState") == "VALID"), None)
    if not build:
        print("✗ 尚无 VALID 状态的 build（可能仍在处理中）。请等 build 处理完成后再跑一次本 job。")
        sys.exit(1)
    build_id = build["id"]
    print("✓ 选用 build:", build_id, "version:", build.get("attributes", {}).get("version"))

    api("PATCH", "/appStoreVersions/%s" % ver_id, token, {
        "data": {
            "type": "appStoreVersions",
            "id": ver_id,
            "relationships": {"build": {"data": {"type": "builds", "id": build_id}}},
        }
    })
    print("✓ build 已关联到版本")

    api("POST", "/appStoreVersionSubmissions", token, {
        "data": {
            "type": "appStoreVersionSubmissions",
            "relationships": {
                "appStoreVersion": {"data": {"type": "appStoreVersions", "id": ver_id}}
            },
        }
    })
    print("✅ 已提交 %s v%s 至 App Store 审核队列" % (bundle, version))


if __name__ == "__main__":
    main()
