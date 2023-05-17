---
title: Azure Data Studio 套件安裝
date: 2023-05-15 12:07
modified: 2023-05-15 12:07
tags: Azure Data Studio,Language Packs
category: 電腦問題
slug: Azure-Data-Studio-Vsix
summary: Azure-Data-Studio
image: /images/default_preview_image.jpg
status: published
---

[TOC]

Azure Data Studio 是一個GUI介面，可以在不同的平臺上執行，可在Mac，Window，Linux不同平臺安裝，以下在Mac環境安裝時，發生的問題：

在Mac安裝參考官方教學 ：[下載並安裝 Azure Data Studio](https://learn.microsoft.com/zh-tw/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver16&tabs=redhat-install%2Credhat-uninstall)

由於需要新增中文介面套件，在後來的擴充套件安裝時，發生了以下問題點


### 無法點擊安裝

```c
Error while installing 'Chinese (Traditional) Language Pack for Azure Data Studio' extension. Please check [logs](command:workbench.action.showWindowLog "Click to execute command 'workbench.action.showWindowLog'") for more details.
```

上述的錯誤出現，想說查看原始 vsix檔案來安裝

找到 https://github.com/microsoft/azuredatastudio/wiki/List-of-Extensions 原始的Github路徑

![[ADS原始中文安裝包路徑.png]]


接下來如下圖方式安裝：下面截圖是已經安裝完成的情況才顯示中文
![[使用vsix方式安裝.png]]


### 無法安裝套件在1.28版本上

實際上又出現如下的錯誤訊息

```c
Unable to install extension 'microsoft.ads-language-pack-zh-hant' as it is not compatible with Azure Data Studio '1.28.0'.
```

由於當初安裝的Azure Data Studio版本已經過時，所以才造成上面的這些問題，再次從GitHub https://github.com/Microsoft/azuredatastudio  下載Mac M1 版本的檔案，如下圖，點擊 Apple Silicon 版本安裝

![[下載MacM1版本的檔案ADS.png]]


最後正確安裝顯示，並且版本顯示 1.43，上面的套件安裝問題就沒問題了
![[AzureDataStudio2畫面.png]]