---
title: NET CORE與MSBuild問題
date: 2023-02-10 11:14
modified: 2023-02-10 11:14
tags: 標籤
category: 電腦問題
slug: 自定義URL標籤
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

在一個站臺中，使用NUGet套件：Microsoft.AspNetCore.Authentication.JwtBearer

原本建置沒有問題，站臺也運作正常，但是後續新增了一些其他套件然後就壞了，問題如下

新的問題，MSBuild建置沒有問題，但是站臺就直接錯誤，直接死掉

在本機的事件記錄顯示：

```
Application: w3wp.exe
CoreCLR Version: 5.0.521.16609
.NET Version: 5.0.5
Description: The process was terminated due to an unhandled exception.
Exception Info: System.IO.FileNotFoundException: Could not load file or assembly 'Microsoft.AspNetCore.Authentication.JwtBearer, Version=5.0.17.0, Culture=neutral, PublicKeyToken=adb9793829ddae60'. 系統找不到指定的檔案。
File name: 'Microsoft.AspNetCore.Authentication.JwtBearer, Version=5.0.17.0, Culture=neutral, PublicKeyToken=adb9793829ddae60'
```





原本的問題：

[[ASP.NET Core 在MSBuild上的問題]]