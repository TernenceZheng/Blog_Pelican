
---
title: MSSQL壓縮檔案
date: 2023-03-07 15:00
modified: 2023-03-07 15:00
tags: 標籤
category: 電腦問題
slug:
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

之前為了測試寫入資料庫，一次需要寫好幾G，但是後來使用TRUNCATE TABLE ，發現 實際的 mdf檔案大小居然沒有改變，使用以下語法就可以壓縮MDF檔案大小

```sql

USE FinLab
DBCC SHRINKDATABASE(N'FinLab')
GO
DBCC SHRINKFILE(N'FinLab',0,TRUNCATEONLY)
```



參考來源：https://dotblogs.com.tw/jamesfu/2014/02/23/compression