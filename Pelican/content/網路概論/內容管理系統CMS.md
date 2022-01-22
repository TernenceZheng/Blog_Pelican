---
title: 內容管理系統CMS
date: 2021-12-01 09:58
modified: 2021-12-01 09:58
tags: WagtailCMS,CodeRedCMS,Python
category: 後端程式
slug: python-cms
summary: 使用CMS系統建構網站
image: /images/default_preview_image.jpg
status: published
---

[TOC]

## 需求

需要建置一個快速的內容形象網站，最好的就是找CMS系統，以目前學的C#，還有新手Python程度，找到有幾個CMS來選擇

### DjangoCMS WagtailCMS  OrchardCodeCMS



- OrchardCodeCMS
- WagtailCMS
-  DjangoCMS

最後選擇使用WagtailCMS來處理我的需求以及找到一個套件能快速建構內容網站。


## OrchardCodeCMS

使用ASP.NET Core 來建置CMS系統，.NET Core 目前還沒學到，而且我比較偏向使用Python來學習順便練習，但是這個OrchardCoreCMS內容功能蠻強大的，而且也蠻靈活的，由於NET Core 已經可以跨平臺，所以在我的Mac也可以建置。使用Visual Studio 2019 開啟，直接建置完成，啟動後，就直接一個設定頁面可以選擇，資料庫提供SQLite，SQL Server，還有一些基本的樣板，提供基本的Agency，Blog，ComingSoom 等的樣板。

![[OrchardCodeCMS開始設定頁面.jpg]]

![[可以設定版型.jpg]]

![[Pastedimage20211201104159.png]]

---


節錄一下官方文件的重點：

不同的網站建設策略¶
Orchard Core CMS支持所有主要的網站建設策略：

完整的CMS。在這種模式下，網站使用主題和模板來呈現您的內容，目的是實現很少甚至沒有自定義開發。

解耦CMS。除了內容管理後端之外，該網站一開始是空白。您可以使用Razor Pages或MVC操作創建所需的所有模板，並通過內容服務訪問內容。
參考：[https://www.youtube.com/watch?v=yWpz8p-oaKg](https://www.youtube.com/watch?v=yWpz8p-oaKg)

無頭CMS。該站點僅管理內容，並且您創建了一個單獨的應用程序，該應用程序將使用GraphQL或REST API來獲取託管內容。
參考：[https://www.youtube.com/watch?v=4o9zG17cfa0](https://www.youtube.com/watch?v=4o9zG17cfa0)

解耦CMS比較適合拿來做客製化的樣板網站，對於OrchardCodeCMS功能的理解，另外鏈結一篇文章: [[OrchardCore CMS系統]] ，內容之多對於我只是想要簡單的內容展示形象網站似乎有點大，先放著以後再來學好了。

---

## DjangoCMS與WagtailCMS

DjangoCMS之前有稍微研究一下官方提供的測試後臺，玩了一下，對於我這個Python新手而言，還有操作上，覺得有點不直覺，後來就跑去看WagtailCMS，對於想要快速建構一個Blog或是小型形象網站，WagtailCMS似乎比較能夠達成我的需求，而且還不太會寫Python的我

[https://www.youtube.com/playlist?list=PLMQHMcNi6ocsS8Bfnuy_IDgJ4bHRRrvub](https://www.youtube.com/playlist?list=PLMQHMcNi6ocsS8Bfnuy_IDgJ4bHRRrvub)

Youtube上的Wagtail學習系列影片，相關的教學還蠻多的，個人覺得WagtailCMS，也還是需要一點程式底子去處理細微的修改，但是後來發現一個好套件。

[CodeRed CMS](https://github.com/coderedcorp/coderedcms)

這個CodeRed像是Wagtail的加強版，把很多想要的功能都做好了，

![[RedcodeCMS的功能項目.jpg]]

一開始還不太懂架構的堆疊，後來摸熟之後，就像是在玩疊積木一樣，能夠快速的建立一個小站臺，非要說缺點就是要精確的調整樣式的話，會比較麻煩，若是有設計的人員可能比較好，基本上CodeRed套件樣式是使用 [https://bootswatch.com/lux/](https://bootswatch.com/lux/) 基本的版型。

以上就是碰過的內容管理系統，各個架構都感覺不錯，各有長處，但是以本業是微軟方面的我，OrchardCodeCMS可以好好學學看，可以學到蠻多東西，而且 .NET Core 是微軟較新的技術，順便練習。