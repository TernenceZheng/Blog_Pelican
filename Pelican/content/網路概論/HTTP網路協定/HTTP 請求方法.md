---
title: HTTP 請求方法
date: 2022-01-13 11:19
modified: 2022-01-13 11:19
tags: HTTP-METHOD,HTTP
category: 網路概論
slug: http-method
summary: HTTP/1.1協定中共定義了八種方法（也叫「動作」）來以不同方式操作指定的資源
image: /images/default_preview_image.jpg
status: published
---

[TOC]


HTTP/1.1協定中共定義了八種方法（也叫「動作」）來以不同方式操作指定的資源，在此先列出常用的方法來記錄，詳細的方法清單在下面連結的維基百科查看。

#### GET
向指定的資源發出「顯示」請求。使用GET方法應該只用在讀取資料

#### POST
向指定資源提交資料，請求伺服器進行處理（例如提交表單或者上傳檔案）。
資料被包含在請求本文中。這個請求可能會建立新的資源或修改現有資源，或二者皆有。每次提交，表單的資料被瀏覽器用編碼到HTTP請求的body里。

瀏覽器發出的POST請求的body主要有兩種格式：

*1.一種是application/x-www-form-urlencoded用來傳輸簡單的資料，大概就是"key1=value1&key2=value2"這樣的格式。*
*2.一種是傳檔案，會採用multipart/form-data格式。*

採用後者是因為application/x-www-form-urlencoded的編碼方式對於檔案這種二進位的資料非常低效。

#### OPTIONS
這個方法可使伺服器傳回該資源所支援的所有HTTP請求方法。用  `*` 來代替資源名稱，向Web伺服器傳送OPTIONS請求，可以測試伺服器功能是否正常運作。


參考資料：

[超文本傳輸協定](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)