---
title: Obsidian筆記同步到Blog排程
date: 2021-10-01 09:26
aliases: 部落格 
tags: Obsidian,Pelican
category: python
summary: 這個記錄着我製作Obsidian筆記同步到blog的語法
image: /images/圖片名稱
status: hidden
---


### 流程：

1. Obsidian 的筆記寫完之後使用 `command + Shift  + P` 快捷鍵Push到GitHub：ObsidianNote
2. 複製檔案到如下圖

右邊的 ==隨手筆記==資料夾 複製=> ==/Pelican/content 底下==
![[截圖 2021-10-01 上午9.32.42.png]]

3. 複製圖檔
4. 執行語法來生成頁面 `pelican content`
5. git commit & push