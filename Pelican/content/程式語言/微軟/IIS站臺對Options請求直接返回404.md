---
title: IIS站臺對Options請求直接返回404
date: 2022-01-12 14:40
modified: 2022-01-12 14:40
aliases: 部落格 
tags: CORS,IIS
category: 微軟
slug: iis-cors-404
summary: 在SignalR遇上CORS時IIS站臺設定的問題
image: /images/default_preview_image.jpg
status: published
---

[TOC]

## SignalR的問題

之前在做SignalR的時候，需要對不同的子網域做API的呼叫，JS是在 signalr.domain.com ，需要呼叫的是在 o.domain.com  開始使用連線時，會引發CORS問題，如下圖：

- 錯誤
![[CorsPreflightError.png]]


SignalR在做options時，會用 https://signalr.domain.com/negotiate?negotiateVersion=1 這樣的路徑做預檢，不過查了老半天都是回404，檢查原因有可能如下：

## WebConfig是否被移除options請求的處理

```xml
<system.webServer>
  <handlers>
    <remove name="OPTIONSVerbHandler" />
  </handlers>
</system.webServer>

```


## 檢查IIS是否安裝了 UrlScan的東西，若安裝了請檢查AllowVerbs中是否包含了options

UrlScan的配置文件為UrlScan.ini (C:\Windows\System32\inetsrv\urlscan\UrlScan.ini)
將OPTIONS從[DenyVerbs]中移除並添加到[AllowVerbs]下

![[ISAPI篩選器的UrlScan.png]]

![[UrlScan的設定.png]]


## 在站臺的webconfig中的Allow-Method中是否加上options

``` xml
<system.webServer>
    <httpProtocol>
      <customHeaders>
        <add name="Access-Control-Allow-Methods" value="OPTIONS,POST,GET" />
        <add name="Access-Control-Allow-Headers" value="x-requested-with,aspxauth" />
        <add name="Access-Control-Allow-Credentials" value="true" />
      </customHeaders>
    </httpProtocol>
</system.webServer>

```



參考資料：

[IIS下網站對options請求直接返回404](https://www.cnblogs.com/cplemom/p/10845434.html)

[Cross-Origin Resource Sharing (CORS)](https://ithelp.ithome.com.tw/articles/10251693?sc=hot)
