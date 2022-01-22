---
title: OrchardCore CMS系統
date: 2021-12-01 11:12
modified: 2021-12-01 11:12
tags: OrchardCodeCMS,微軟筆記
category: 網路概論
slug: orchardcode-cms
summary: 記錄使用OrchardCodeCMS的學習歷程
image: /images/default_preview_image.jpg
status: published
---

[TOC]

## 安裝 .NET Core與SDK


>OrchardCore CMS安裝流程在MAC上，主要在非Windows系統的安裝流程。
>
>  - 主要參考：[https://github.com/orchardcmsnet/MyOrchardCoreCMSonLinuxUsingVSCode](https://github.com/orchardcmsnet/MyOrchardCoreCMSonLinuxUsingVSCode)
> 
>  - 另外NET CORE的Runtime安裝參考微軟官方：[https://docs.microsoft.com/zh-tw/dotnet/core/install/linux-ubuntu#how-to-install-other-versions](https://docs.microsoft.com/zh-tw/dotnet/core/install/linux-ubuntu#how-to-install-other-versions)


注意：

- 用Chrome的瀏覽器，因為不是Https，會自動將後臺登入自動導302Found問題，導致後臺登入一直出現在登入頁面，改用FireFox就可以

- 另外 aspnetcore-runtime-3.1 皆改用3.1似乎才能正常運作


但是注意目前.net core 已經到5.0 ，這個CMS框架只支援3.0

安裝另外執行以下語法：

```c
sudo apt-get install -y gpg
wget -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o microsoft.asc.gpg
sudo mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/
wget https://packages.microsoft.com/config/ubuntu/20.04/prod.list
sudo mv prod.list /etc/apt/sources.list.d/microsoft-prod.list
sudo chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
sudo chown root:root /etc/apt/sources.list.d/microsoft-prod.list
sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-3.1


sudo apt-get install -y gpg
wget -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o microsoft.asc.gpg
sudo mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/
wget https://packages.microsoft.com/config/ubuntu/20.04/prod.list
sudo mv prod.list /etc/apt/sources.list.d/microsoft-prod.list
sudo chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
sudo chown root:root /etc/apt/sources.list.d/microsoft-prod.list
sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-runtime-3.1
```



## Orchard Core的所有功能概述¶

這是Orchard Core所有內置功能的分類概覽。

- 參考: [https://docs.orchardcore.net/en/dev/docs/reference/](https://docs.orchardcore.net/en/dev/docs/reference/)


分類：

- admin

- App Security

- Authentication and User Management

- Content

- Design

- Extensibility

- Hosting and Operations

- Localization

- Navigation

- Search, Indexing, Querying


下面就先記錄一下最主要的功能Content Type

### Content Type(內容類別)

Content Type：選擇內容類型列表

簡單說明就是頁面的顯示自定義類型，像是產品頁面類型，首頁頁面類型，部落格頁面類型，等等的分別，

例如：IndexPage 可以定義為首頁，ProductListPage可以定義為產品列表頁面，ProductPage可以定義為產品頁面

Content Type 裡面會有兩個部分組成

Content Parts ，Content Field


### Content Parts(內容部分)

![[contentParts的功能.png]]

該Title模塊提供了標題部分，使您可以自定義內容項的DisplayText屬性。整個管理界面都使用DisplayText屬性來幫助您識別內容項。

標題部分¶
將此部分附加到您的內容項以自定義ContentItem的DisplayText屬性。

TitlePart設置¶
默認情況下，附加TitlePart將允許內容編輯器手動編輯ContentItem的DisplayText（標題）。

您也可以通過使用Liquid表達式指定模式來生成標題。

模式有權訪問當前的ContentItem，並在ContentItem更新時執行。例如，字段可用於生成圖案。以下示例在內容類型上使用名為的Text字段。

```
{{ ContentItem.Content.Product.Name.Text }}
```


### Content Fields(內容欄位)

![[contentFields的功能.png]]