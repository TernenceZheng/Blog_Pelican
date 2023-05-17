---
title: CSharp語法糖
date: 2023-03-27 15:56
modified: 2023-03-27 15:56
tags: 標籤
category: 後端程式
slug: 自定義URL標籤
summary: 預覽標題
image: /images/default_preview_image.jpg
status: hidden
---

[TOC]

`yield` 是一種語法糖（syntactic sugar），它被用於簡化定義可枚舉集合的方法。當使用 `yield` 時，編譯器會自動產生一個具有狀態的匿名方法（anonymous method）來實現可枚舉集合，而這個匿名方法本質上也是一個委派。

 yield return 的優勢：

-   有結果立即回傳，提供更好的即時性 (這是要串接成生產線模式的必要條件)
-   只需部分結果時，省去處理無用資料的成本
-   不需耗用記憶體儲存全部結果

參考：[善用 yield return 省時省 CPU 省 RAM，打造高效率程式](https://blog.darkthread.net/blog/yield-return/)