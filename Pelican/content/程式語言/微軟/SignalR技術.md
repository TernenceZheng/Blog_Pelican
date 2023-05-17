---
title: SignalR技術
date: 2022-03-29 10:19
modified: 2022-03-29 10:19
tags: SignalR
category: 後端程式
slug:
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

關於什麼是SignalR 可參考：[ASP.NET Core概觀 SignalR](https://learn.microsoft.com/zh-tw/aspnet/core/signalr/introduction?view=aspnetcore-7.0)

先瞭解一下SignalR的各個版本，因為版本的不同，容易造成混亂，要依照程式的環境來對應要安裝的版本
，需要注意在Framework版本與Core版本的不同

---

SignalR的版本可以分為 1.0 與 2.0，前面兩版本是在MVC的基礎上，再後面使用ASP.NET Core 版本的SingalR，每個版本的寫法都有不同，在1.0 與2.0 到Core 早期版本中 使用 Microsoft.Owin (NuGet) < 4.1.1 的套件功能，但是此本還發現有已知的安全性弱點

Microsoft.Owin (NuGet) < 4.1.1  
ASP.NET Core 解析經編碼過的 cookie 名稱時，安全機制可被繞過  
https://msrc.microsoft.com/update-guide/zh-TW/vulnerability/CVE-2020-1045  
https://github.com/advisories/GHSA-hxrm-9w7p-39cc

Note：
什麼Owin：[開發筆記-OWIN](https://blog.darkthread.net/blog/about-owin/)

![[如何識別SignalR版本.jpg]]



因建置SingnalR的時候,ASP.NET Core版本已經到了6.0，就沒有使用此套件

---
以下參考資料是舊版本的SignalR，從一開始的 1.0 到 MVC版本的 2.0

參考資料：

當初在研究SignalR的時候，發佈的版本上1.0的，可以參考 [[打造即時互動網站 (Real-time web) 的秘訣 – ASP.NET SignalR 入門]]

[第三节：SignalR之PersistentConnection模型详解(步骤、用法、分组、跨域、第三方调用)](https://www.cnblogs.com/yaopengfei/p/9284101.html)

[第四节：SignalR灵魂所在Hub模型及再探聊天室样例](https://www.cnblogs.com/yaopengfei/p/9304308.html)

[SignalR 中樞的驗證和授權](https://docs.microsoft.com/zh-tw/aspnet/signalr/overview/security/hub-authorization)

[教學課程：開始使用 SignalR 1.x](https://docs.microsoft.com/zh-tw/aspnet/signalr/overview/older-versions/tutorial-getting-started-with-signalr)

---

什麼是中樞（Hub）

定義：SignalR 負責處理即時用戶端對伺服器和伺服器對用戶端通訊所需的一切

那在NetCore中，中樞有什麼物件：CoNtext 物件 ，Clients 物件

### Context 物件

![[SignalR的Context物件屬性.jpg]]


### Clients 物件

![[SignalR的Clients物件屬性.jpg]]


後記，關於效能監控，SignalR的連線查看，可參考 [[效能監視器]]


參考資料：

[效能監視用於ASP.NET應用程式](https://dotblogs.com.tw/hznraymond/2013/09/26/120758)