---
title: 深入認識跨域請求CORS
date: 2022-01-11 22:07
modified: 2022-01-11 22:07
aliases: 部落格 
tags: 標籤
category: 類別
slug: 自定義URL標籤
related_posts: slug1, slug2, slug3, ... slugN
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft, hidden, published
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







參考資料：


https://www.ithome.com.tw/voice/129558

https://shubo.io/what-is-cors/

https://sa123.cc/mbz87ag1594xka2ohlgj.html