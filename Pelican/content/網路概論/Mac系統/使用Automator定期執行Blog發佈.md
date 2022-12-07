---
title: 使用Automator定期執行Blog發佈
date: 2022-01-14 17:40
modified: 2022-01-14 17:40
tags: Automator,Mac
category: 網路概論
slug: mac-automator-blog
summary: 加強Blog發佈程式流程
image: /images/default_preview_image.jpg
status: published
---

[TOC]


之前寫的同步方式：[[Obsidian筆記同步到Blog排程]]，還是很多地方不完善，每次都需要手動點擊同步，然後在執行發佈程式，想說用Apple Script 配合定期執行python語法，就可以Obsidian完成筆記後，直接PUSH 筆記的GitHub，然後在Mac電腦那邊就可以一氣呵成。

## 流程步驟
- 設定在電腦開啟時，一起啟動Obsidian軟體 
- 等待同步程式執行
- 加入 Automator 排程，讓 Mac 自動幫執行程式
- 執行內容程式順序：

	1. 判斷 Blog_Pelican 的Git 異動清單若是有修改則開始執行
	2. 執行 pelican content 執行Blog建置，產生靜態Html檔
	3. Blog_Pelican 的 Git 執行 Commit 與 PUSH 






參考：

[為什麼 Mac 使用者應該學習 Apple Script？以 Evernote 舉例，自動建立每日反省筆記，自動化處理繁瑣流程](https://medium.com/pm%E7%9A%84%E7%94%9F%E7%94%A2%E5%8A%9B%E5%B7%A5%E5%85%B7%E7%AE%B1/%E7%82%BA%E4%BB%80%E9%BA%BC-mac-%E4%BD%BF%E7%94%A8%E8%80%85%E6%87%89%E8%A9%B2%E5%AD%B8%E7%BF%92-apple-script-13a599504362)

[MAC 設定 Shell Script(.sh) 檔，指定 終端機 將它開啟並自動執行](https://www.minwt.com/mac/22625.html)