---
title: 深入理解CORS
date: 2022-01-12 15:44
modified: 2022-01-12 15:44
tags: CORS
category: 網路概論
slug: http-cors
summary: 在兩次的錯誤後，好好的來理解所謂的CORS問題處理
image: /images/default_preview_image.jpg
status: published
---

[TOC]

## 前言

在兩篇文章的洗禮後，好好的來理解所謂的CORS問題處理

- [[Fetch語法對Instagram的CORS問題]]

- [[IIS站臺對Options請求直接返回404]]


W3C正式的CORS規範，其中，不單只是規範瀏覽器處理跨域請求的方式，也規範了伺服端可控制的項目，像是允許的來源、請求方法、可否發送Cookie、可取得的回應標頭，甚至回應有效期限等。

## Http Header的CORS項目
-   CORS
    -   Access-Control-Allow-Origin：
	    - server端接收跨來源時，授權來源，在Response加上此header，如果server允許任何來源的跨來源請求就使用  `*` 號
    -   Access-Control-Allow-Credentials：
	    - 設定值為True  False， 就是跨來源請求可以在Response時，取得一些cookie之類的資訊
    -   Access-Control-Allow-Headers：
	    - 用於響應預檢請求，以指示在發出實際請求時可以使用哪些 HTTP 標頭。
    -   Access-Control-Allow-Methods：
	    - 指定在訪問資源以響應預檢請求時允許的一種或多種方法。
    -   Access-Control-Expose-Headers：
	    - 指示哪些標頭可以作為響應的一部分公開，讓 JavaScript 存取其他 header
    -   Access-Control-Max-Age：
	    - 指示預檢請求的結果可以緩存多長時間
    -   Access-Control-Request-Headers：
	    - 在*發出預檢請求時使用*，以讓服務器知道在發出實際請求時將使用哪些 HTTP 標頭。
    -   Access-Control-Request-Method：
	    - 在*發出預檢請求時使用*，以讓服務器知道在發出實際請求時將使用哪種HTTP 方法。
    -   Origin：指示提取的來源


### CORS將跨域請求分為：簡單（Simple），以及帶預檢（with Preflight）

## 簡單請求

- 方法只能是HEAD、GET、POST
- 可用標頭`Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`，以及`Content-Type`
- Content-Type也只允許三個值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

![[簡單請求的圖例.png]]


## 預檢請求

分兩個步驟，第一步 http OPTIONS 方法，會帶有兩個 request header：`Access-Control-Request-Method` 和 `Access-Control-Request-Headers`。第二步在OPTIONS成功後，才能發送Request


![[預檢請求的圖例.png]]





## 關於fetch API 的問題

引用文章：

很多人會認為只要將 fetch 裡的屬性 mode，調整成 `mode: 'no-cors'`，就可以避免 CORS，其實不是！

`mode: 'no-cors` 在設定上的意義是，告訴瀏覽器，我本來就知道 server 對於這個 request 是沒有設定可以存取 CORS 的，我本來就拿不到 response，我設定`mode: 'no-cors`，是為了，就算無法存取，也不要跑到 .catch() 那邊，讓它出現 Error。

一樣拿不到 server 的 response，但會拿到一個 `status: 0` 的 response。

結論：在 CORS 的限制底下，只有 server 開放 CORS 存取，你才拿得到 response，如果沒有開放，就一定拿不到。



參考：

[MDN Docs HTTP 標頭](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers)

[深入認識跨域請求](https://www.ithome.com.tw/voice/129558)

[CORS 是什麼? 如何設定 CORS?](https://shubo.io/what-is-cors/)

[跨域（CORS）產生原因分析與解決方案，這一次徹底搞懂它](https://sa123.cc/mbz87ag1594xka2ohlgj.html)

[fetch捕獲重定向302/301](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/750548/)

[輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)

[[Day 27] Cross-Origin Resource Sharing (CORS)](https://ithelp.ithome.com.tw/articles/10251693?sc=hot)