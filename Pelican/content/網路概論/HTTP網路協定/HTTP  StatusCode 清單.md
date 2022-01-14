---
title: HTTP  StatusCode 清單
date: 2022-01-13 11:04
modified: 2022-01-13 11:04
aliases: 部落格 
tags: HTTP-STATUS
category: HTTP
slug: http-status-code
summary: 記錄Http的狀態碼以待備查
image: /images/default_preview_image.jpg
status: published
---

[TOC]


所有HTTP回應的第一行都是**狀態行**，依次是當前HTTP版本號，3位數字組成的[狀態代碼](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81 "HTTP狀態碼")，以及描述狀態的短語，彼此由空格分隔。

狀態代碼的第一個數字代表當前回應的類型：

-   [1xx訊息](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81#1xx%E6%B6%88%E6%81%AF "HTTP狀態碼")——請求已被伺服器接收，繼續處理
-   [2xx成功](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81#2xx%E6%88%90%E5%8A%9F "HTTP狀態碼")——請求已成功被伺服器接收、理解、並接受
-   [3xx重新導向](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81#3xx%E9%87%8D%E5%AE%9A%E5%90%91 "HTTP狀態碼")——需要後續操作才能完成這一請求
-   [4xx請求錯誤](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81#4xx%E8%AF%B7%E6%B1%82%E9%94%99%E8%AF%AF "HTTP狀態碼")——請求含有詞法錯誤或者無法被執行
-   [5xx伺服器錯誤](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81#5xx%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%94%99%E8%AF%AF "HTTP狀態碼")——伺服器在處理某個正確請求時發生錯誤