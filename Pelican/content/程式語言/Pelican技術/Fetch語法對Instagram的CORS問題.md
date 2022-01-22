---
title: Fetch語法對Instagram的CORS問題
date: 2022-01-11 22:07
modified: 2022-01-11 22:07
tags: CORS
category: 網路概論
slug: cors-in-js-fix
summary: Pelican的樣板。有提供一個功能在頁面可以嵌入 Instagram的PO文，使用方式就只需要定義一個DIV在Markdown的檔案中就可以嵌入
image: /images/default_preview_image.jpg
status: published
---

[TOC]


Pelican的樣板：  [Pelican-Elegant](https://github.com/Pelican-Elegant)。有提供一個功能在頁面可以嵌入 Instagram的PO文，使用方式就只需要定義一個DIV在Markdown的檔案中就可以嵌入，

```html
<div class="elegant-instagram" data-instagram-id="BwWo35fAcR3"></div>
```

其中，data-instagram-id就是Instagram上面PO文時的連結路徑，不過使用過後出現CORS問題，在Github上面Issues也有
[[BUG] Instagram code doesn't work, browser shows blocked url because of policy](https://github.com/Pelican-Elegant/elegant/issues/664)

```javascript

Access to fetch at 'https://www.instagram.com/p/YYYYYYYY/?__a=1' from origin 'https://MYURL' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

Instagram gallery is not shown

```


由建議處理方式是fetch 加上 mode:'no-cors'

```javascript
const instagramId = ele.dataset.instagramId;

fetch(`https://www.instagram.com/p/${instagramId}/?__a=1`,{mode:"no-cors"})
```

雖然不會出現CORS的問題了，但是IG的API回應卻是302 

![[使用CORS後API變302回應.png]]

![[已經修改fetch模式是nocors.png]]

由於Response回應302，所以後續就直接錯誤了，認為應該是用fetch API去呼叫，會跳轉到IG的Login畫面，API是無法呈現的所以後續無法轉JSON格式，看來是需要增加access token變成登入狀態

```http
access-control-expose-headers: X-IG-Set-WWW-Claim
alt-svc: h3=":443"; ma=3600,h3-29=":443"; ma=3600
cache-control: private, no-cache, no-store, must-revalidate
content-language: zh-tw
content-length: 0
content-security-policy: report-uri https://www.instagram.com/security/csp_report/; default-src 'self' https://www.instagram.com; img-src data: blob: https://*.fbcdn.net https://*.instagram.com https://*.cdninstagram.com https://*.facebook.com https://*.fbsbx.com https://*.giphy.com; font-src data: https://*.fbcdn.net https://*.instagram.com https://*.cdninstagram.com; media-src 'self' blob: https://www.instagram.com https://*.cdninstagram.com https://*.fbcdn.net; manifest-src 'self' https://www.instagram.com; script-src 'self' https://instagram.com https://www.instagram.com https://*.www.instagram.com https://*.cdninstagram.com wss://www.instagram.com https://*.facebook.com https://*.fbcdn.net https://*.facebook.net 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' https://*.www.instagram.com https://www.instagram.com 'unsafe-inline'; connect-src 'self' https://instagram.com https://www.instagram.com https://*.www.instagram.com https://graph.instagram.com https://*.graph.instagram.com https://i.instagram.com/graphql_www https://graphql.instagram.com https://*.cdninstagram.com https://api.instagram.com https://i.instagram.com https://*.i.instagram.com wss://www.instagram.com wss://edge-chat.instagram.com https://*.facebook.com https://*.fbcdn.net https://*.facebook.net chrome-extension://boadgeojelhgndaghljhdicfkmllpafd blob:; worker-src 'self' blob: https://www.instagram.com; frame-src 'self' https://instagram.com https://www.instagram.com https://*.instagram.com https://staticxx.facebook.com https://www.facebook.com https://web.facebook.com https://connect.facebook.net https://m.facebook.com; object-src 'none'; upgrade-insecure-requests
content-type: text/html; charset=utf-8
date: Wed, 12 Jan 2022 06:27:35 GMT
expires: Sat, 01 Jan 2000 00:00:00 GMT
location: https://www.instagram.com/accounts/login/
pragma: no-cache
set-cookie: mid=Yd501wALAAE2tYIXNpy3T6lgubqt; Domain=.instagram.com; expires=Fri, 12-Jan-2024 06:27:35 GMT; Max-Age=63072000; Path=/; Secure
set-cookie: ig_did=B725DF97-76E5-4F3A-915A-366CD821B3A9; Domain=.instagram.com; expires=Fri, 12-Jan-2024 06:27:35 GMT; HttpOnly; Max-Age=63072000; Path=/; Secure
set-cookie: ig_nrcb=1; Domain=.instagram.com; expires=Thu, 12-Jan-2023 06:27:35 GMT; Max-Age=31536000; Path=/; Secure
strict-transport-security: max-age=31536000
vary: Accept-Language, Cookie
x-aed: 48
x-content-type-options: nosniff
x-fb-trip-id: 1679558926
x-frame-options: SAMEORIGIN
x-ig-origin-region: prn
x-ig-push-state: c2
x-ig-request-end-time: 1939701098
x-ig-request-start-time: 1939701061.9430351
x-xss-protection: 0
```


目前似乎無法針對 302 問題解決。若是做登入IG後，再次GET資料，雖然會有200的正常狀態，但是其實返回的物件是一個 `status:0` 的情況， 參考了這篇： [Fetch 的使用注意事項](https://ithelp.ithome.com.tw/articles/10249967)

![[IG回應的資歷形態.png]]

>*引用：
>
>很多人會認為只要將 fetch 裡的屬性 mode，調整成 `mode: 'no-cors'`，就可以避免 CORS，其實不是！
>`mode: 'no-cors` 在設定上的意義是，告訴瀏覽器，我本來就知道 server 對於這個 request 是沒有設定可以存取 CORS 的，我本來就拿不到 response，我設定`mode: 'no-cors`，是為了，就算無法存取，也不要跑到 .catch() 那邊，讓它出現 Error。
一樣拿不到 server 的 response，但會拿到一個 `status: 0` 的 response。*


#### 結論：在 CORS 的限制底下，只有 server 開放 CORS 存取，你才拿得到 response，如果沒有開放，就一定拿不到。




參考資料：


https://www.ithome.com.tw/voice/129558

https://shubo.io/what-is-cors/

https://sa123.cc/mbz87ag1594xka2ohlgj.html

https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/750548/