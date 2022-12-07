---
title: Obsidian筆記同步到Blog排程
date: 2021-10-01 09:26
modified: 2021-10-01 09:26
tags: Obsidian,Pelican,Python
category: Obsidian
slug: obsidian-to-pelican
summary: 這個記錄着我製作Obsidian筆記同步到blog的語法
image: /images/default_preview_image.jpg
status: published
---

[TOC]


## 緣起

自從發現[[Obsidian]]這個東西之後，寫作筆記感覺很方便，而且使用[[Markdown]]語法，也剛好想建置Blog網站，用Python的Pelican套件，一樣是用Markdown來產生文章，就覺得兩個東西可以合併，既可以做筆記，又可以寫Blog。

---


## 想法

1. obsidian的備份機制使用Github來完成，而且有套件可以自動Push
![[obsidian已安裝的第三方外掛.png]]

2. [[Blog發佈到netlify]] 也是用GitHub

3. 主要把Obsidian的MD檔同步到Pelican的content資料夾，再做一個發佈的程式就完成了

## 流程：

1. Obsidian 的筆記寫完之後使用 `command + Shift  + P` 快捷鍵Push到GitHub：ObsidianNote。 參考：   [[Obsidian快捷鍵設定]]
2. 複製檔案到如下圖

右邊的 ==隨手筆記==資料夾 複製=> ==/Pelican/content 底下==

---

![[顯示同步資料夾.png]]

3. 複製圖檔
4. 執行語法來生成頁面 `pelican content`
5. git commit & push