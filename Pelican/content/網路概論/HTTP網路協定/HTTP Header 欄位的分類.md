---
title: HTTP Header 欄位的分類
date: 2022-01-13 10:28
modified: 2022-01-13 10:28
aliases: 部落格 
tags: HTTP
category: HTTP
slug: http-header
summary: 記錄HTTP Header 欄位的分類的資料
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

>HTTP的Header項目繁多，以下挑幾個常用出來說明，文末會列出分類的項目清單。


- [Cookies](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers#cookies "Permalink to Cookies")
HTTP/1.1 引入Cookie來儲存狀態資料。
Cookie是伺服器發送到使用者瀏覽器並且保存在瀏覽器本機的一小塊數據，它會在之後瀏覽時，像同一個伺服器再次發送請求時被自動攜帶上，用於告知伺服器前後請求是否來字同一個瀏覽。
新的瀏覽器API目前已經支援其他儲存方式，開發者直接將數據儲存在本機的方式有Web Storage 、 IndexedDB

- CORS(延伸閱讀：[[深入理解CORS]])
**跨來源資源共享**（英語：Cross-origin resource sharing，縮寫：CORS），用於讓網頁的受限資源能夠被其他[域名](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D "域名")的頁面存取的一種機制。
通過該機制，頁面能夠自由地使用不同源（英語：cross-origin）的圖片、樣式、指令碼、iframes以及影片。


- [Message body information](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers#message_body_information "Permalink to Message body information")
其中較為重要的為 Content-Type (延伸閱讀：[[HTTP Content-Type]])


- [Request context](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers#request_context "Permalink to Request context")
TODO

- [Response context](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers#response_context "Permalink to Response context")
TODO





參考連結：

- [HTTP Header 欄位的分類](https://blog.longwin.com.tw/2017/10/http-header-field-define-list-rule-rfc-2017/)
- [HTTP headers - HTTP | MDN](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers)

以下是針對文件的分類項目清單：

-   Authentication
    -   WWW-Authenticate
    -   Authorization
    -   Proxy-Authenticate
    -   Proxy-Authorization
-   Caching
    -   Age
    -   Cache-Control
    -   Expires
    -   Pragma
    -   Warning
-   Client hints
    -   Accept-CH
    -   Content-DPR
    -   DPR
    -   Downlink
    -   Save-Data
    -   Viewport-Width
    -   Width
-   Conditionals
    -   Last-Modified
    -   ETag
    -   If-Match
    -   If-None-Match
    -   If-Modified-Since
    -   If-Unmodified-Since
-   Connection management
    -   Connection
    -   Keep-Alive
-   Content negotiation
    -   Accept
    -   Accept-Charset
    -   Accept-Encoding
    -   Accept-Language
-   Controls
    -   Expect
    -   Max-Forwards
*Cookies
    -   Cookie
    -   Set-Cookie
    -   Cookie2 (被 Cookie 取代，棄用)
    -   Set-Cookie2 (被 Set-Cookie2 取代，棄用)*
*CORS
    -   Access-Control-Allow-Origin
    -   Access-Control-Allow-Credentials
    -   Access-Control-Allow-Headers
    -   Access-Control-Allow-Methods
    -   Access-Control-Expose-Headers
    -   Access-Control-Max-Age
    -   Access-Control-Request-Headers
    -   Access-Control-Request-Method
    -   Origin*
-   Do Not Track
    -   DNT
    -   Tk
-   Downloads
    -   Content-Disposition
-   Message body information
    -   Content-Length
    -   Content-Type
    -   Content-Encoding
    -   Content-Language
    -   Content-Location
-   Proxies
    -   Forwarded
    -   X-Forwarded-For
    -   X-Forwarded-Host
    -   X-Forwarded-Proto
    -   Via
-   Redirects  
    Location
*Request context
    -   From
    -   Host
    -   Referer
    -   Referrer-Policy
    -   User-Agent*
*Response context
    -   Allow
    -   Server*
-   Range requests
    -   Accept-Ranges
    -   Range
    -   If-Range
    -   Content-Range
-   Security
    -   Content-Security-Policy (CSP)
    -   Content-Security-Policy-Report-Only
    -   Public-Key-Pins (HPKP)
    -   Public-Key-Pins-Report-Only
    -   Strict-Transport-Security (HSTS)
    -   Upgrade-Insecure-Requests
    -   X-Content-Type-Options
    -   X-Frame-Options (XFO)
    -   X-XSS-Protection
-   Server-sent events
    -   Ping-From
    -   Ping-To
    -   Last-Event-ID
-   Transfer coding
    -   Transfer-Encoding
    -   TE
    -   Trailer
-   WebSockets
    -   Sec-WebSocket-Key
    -   Sec-WebSocket-Extensions
    -   Sec-WebSocket-Accept
    -   Sec-WebSocket-Protocol
    -   Sec-WebSocket-Version Other
    -   Date
    -   Large-Allocation
    -   Link
    -   Retry-After
    -   SourceMap
    -   Upgrade
    -   Vary
    -   X-DNS-Prefetch-Control
    -   X-Firefox-Spdy
    -   X-Requested-With
    -   X-UA-Compatible