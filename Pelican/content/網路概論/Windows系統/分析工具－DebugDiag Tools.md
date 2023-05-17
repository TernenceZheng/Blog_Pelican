---
title: 分析工具－DebugDiag Tools
date: 2023-03-14 16:41
modified: 2023-03-14 16:41
tags: 標籤
category: 電腦問題
slug: 自定義URL標籤
summary: 預覽標題
image: /images/default_preview_image.jpg
status: published
---

[TOC]

## 此次針對專案的記憶體不足做優化，在此次的記憶體檢測使用DebugDiag Tools

DebugDiag Tools（Debug Diagnostic Tool）是一款由 Microsoft 提供的免費工具，用於幫助開發人員和 IT 專業人員在 Windows 系統上診斷和解決應用程式問題。該工具集提供了一組分析工具，可幫助您捕捉、分析和解決各種應用程式問題，例如記憶體洩漏、當機和性能問題等。

DebugDiag 可以輕鬆捕捉和記錄應用程式當機時的詳細資訊，包括當機的位置和原因。它還提供了一組分析工具，可幫助您檢查記憶體使用情況，找出記憶體洩漏的原因。此外，DebugDiag 工具還可以監視應用程式的性能，並提供了一組分析工具，可幫助您找出應用程式性能問題的根本原因。

### 下載與安裝

下載點：[Debug Diagnostic Tool v2 Update 3](https://www.microsoft.com/en-us/download/details.aspx?id=58210)

安裝完成如下會主要有兩個功能：
DebugDiag 2 Analysis   <- 這是用來分析的
DebugDiag 2 Collection <- 這是用來收集資料的

![[DebugDiagnosticsTool2.jpg]]


### 針對記憶體的使用

因為主要需要探究記憶體不足，需要確認哪些程式佔用了大部分的記憶體使用先選擇Native(non-.Net)Memory and Handle Leak

![[NativeMemoryandHandleLeak.jpg]]

接下來切換視窗頁籤的Processes 查看要觀察的對象，在此次範例中，已經將程式建立在IIS上，在IIS的ProcessName是 w3wp.exe 後面的有個欄位Process Identiy 是設定在IIS上的名稱
![[分析工具查看IIS上的記憶體使用進程.jpg]]

接下來就可以狂打這個站臺來模擬使用大量呼叫時記憶體會衝多高，再針對此Process，按右鍵出現選單選擇 Create Full Userdump

![[把觀察的進程資料Dump出來.jpg]]

在Windows系統，此Dump出來的資料，會在預設路徑 C:\Program Files\DebugDiag\Logs\Misc

在這個路徑會有副檔名是  .dmp  的檔案類型，接下來針對這個檔案，右鍵選擇DebugDiag 2 Analysis 來開啟分析，就會產生報告，報告路徑可以自定義，副檔名為 mht ，似乎只能使用舊IE來開啟才能看
![[把dump出來的檔案右鍵使用分析工具開啟.jpg]]


![[佔用的記憶體前幾大項目.png]]



在 C# 中，由於 String 物件是不可變的，因此在進行字串操作時，每當需要更改 String 物件時，都會建立新的 String 物件。這種方式可能會導致大量的記憶體使用，特別是當處理大量文字時。

以下是一些優化 C# 程式時使用 String 物件的方式：

1.  使用 StringBuilder：StringBuilder 是可變的字串類別，它提供了可變長度的字串，因此在字串操作時使用 StringBuilder 可以避免建立大量的 String 物件，以減少記憶體使用。
    
2.  使用 String.Concat：在需要連接多個字串時，使用 String.Concat 方法可以將多個字串連接為一個字串，而不必建立中間字串物件。
    
3.  使用格式化字串：在需要產生複雜字串時，使用格式化字串可以更容易地產生複雜字串。在格式化字串中，可以使用佔位符來代表變數，然後在執行時將變數插入到字串中。
    
4.  避免使用 + 運算子連接字串：在使用 + 運算子連接字串時，每次操作都會建立新的 String 物件，這樣可能會導致大量的記憶體使用。因此，在需要連接多個字串時，應該使用 StringBuilder 或 String.Concat 方法來連接字串。
    
5.  避免在迴圈中連接字串：在迴圈中連接字串可能會導致大量的記憶體使用。因此，在需要在迴圈中連接字串時，應該使用 StringBuilder 或類似的方法來減少記憶體使用。
    
6.  了解字串比較的運作方式：當進行字串比較時，可以使用 StringComparison 列舉來指定比較的方式。例如，使用 StringComparison.Ordinal 可以比較字串的 ASCII 編碼值，這種比較方式比使用預設的比較方式更快。
    

綜上所述，使用 StringBuilder 和 String.Concat 可以有效地減少記憶體使用，並在需要產生複雜字串時使用格式化字串，避免在迴圈中連接字串。另外，了解字串比較的運作方式也可以幫助優化程式。


參考資料:
https://blog.darkthread.net/blog/windbg-to-find-aspnet-cpu-high/
https://blog.darkthread.net/blog/analyze-cpu-high-with-debugdiag-tools
[如何使用 Debug Diagnostics Tool，在 IIS 中為 CPU 使用率過高的處理序進行疑難排解](https://support.microsoft.com/zh-tw/topic/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-debug-diagnostics-tool-%E5%9C%A8-iis-%E4%B8%AD%E7%82%BA-cpu-%E4%BD%BF%E7%94%A8%E7%8E%87%E9%81%8E%E9%AB%98%E7%9A%84%E8%99%95%E7%90%86%E5%BA%8F%E9%80%B2%E8%A1%8C%E7%96%91%E9%9B%A3%E6%8E%92%E8%A7%A3-636559d3-2f31-71eb-d2ba-75da26ece9d7)


