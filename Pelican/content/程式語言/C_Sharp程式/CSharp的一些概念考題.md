---
title: CSharp的一些概念考題
date: 2022-03-15 09:07
modified: 2022-03-15 09:07
tags: 標籤
category: 後端程式
slug:
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft, hidden, published
---

[TOC]

### 啟動一個執行緒是用?

run()

start()

execute()

do()

### 在[ADO.NET](https://www.google.com/url?q=http://ADO.NET&sa=D&source=editors&ust=1647308808980340&usg=AOvVaw282aa1diQzPHhAWaNCoKlg)中，對於Command對象的ExecuteNonQuery()方法和ExecuteReader()方法，下面敘述錯誤的是?


insert、update、delete等操作的Sql語句主要用ExecuteNonQuery()方法來執行；

ExecuteNonQuery()方法返回執行Sql語句所影響的行數。

Select操作的Sql語句只能由ExecuteReader()方法來執行；

ExecuteReader()方法返回一個DataReder對象；

### 在C#中，下列代碼運行後，變量Max的值是？

![未命名圖片](https://lh6.googleusercontent.com/jnk3mLIE2JM3ASZEVsadAcPNGvy-m0xMyD0MDkdgA7qYfoSNFjYrkt4CTvRp2XjPkH4PM_srb1pI930OgFRVxp5qkwYcSBwpmEVuJOrw_i3JD216XbXonWk-MZqY61TF=w740)

0

5

10

15

### 在C#中，那個訪問修飾符修飾的字段只能由當前程序集訪問？

public

protected

internal

private

### 分析下列語句：namespace NS{ public delegate void Hello(string target); }該語句的作用是？

在NS命名空間中定義了一個名稱爲Hello的全局方法

在NS命名空間中聲明瞭函數Hello的原型

在NS命名空間中聲明瞭一個名稱爲Hello的函數指針

在NS命名空間中聲明瞭一個名稱爲Hello的委託類型

### 異步方法頭部中應該包含__修飾符。

public

private

internal

async

### 在C#語法中，在派生類中對基類的虛函數進行重寫，要求在派生類的聲明中使用？

override

new

static

virtual

### 以下關於抽象類和接口的敘述中正確的是？

在抽象類中，所有的方法都是抽象方法

繼承自抽象類的子類必須實現其父類（抽象類）中的所有抽象方法

在接口中，可以有方法實現，在抽象類中不能有方法實現

一個類可以從多個接口繼承，也可以從多個抽象類繼承

### 以下關於程序的各種錯誤中說法錯誤的是？

只通過測試無法確保程序運行完全正常

通過異常處理可以捕獲運行錯誤

邏輯錯誤編譯時不能被發現，但是可以通過測試發現

語法錯誤容易在運行時發現

### 在C#中，在方法MyFunc內部的try…catch語句中，如果在try代碼塊中發生異常，並且在當前的所有catch塊中都沒有找到合適的catch塊，則

系統運行時忽略該異常

系統運行時馬上強制退出該程序，指出未處理的異常

系統運行時繼續在MyFunc的調用堆棧中查找提供該異常處理的過程

系統拋出一個新的“異常處理未找到”的異常

### 假設給出下面代碼，執行時的輸出結果是？


![未命名圖片](https://lh5.googleusercontent.com/0qNf-_tlPCDnXaSwRT4X4mWHVFOH_hqjY7mkaddzL45l5l40FZrcOA8M9NDkciyt-OdZvSLodBnTHEi0n_4SJMsRFhweiMvhcU3gyu_XvOTjkDQ0szJJTbWDL-UoRXB_=w740)

1 5

2 5

3 5

2 3

### 以下實現線程互斥的敘述中正確的是.

可以用lock語句實現線程互斥

可以用Mutex類實現線程互斥

可以用Monitor類實現線程互斥

以上都正確