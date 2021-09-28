---
title: Obsidian 使用 Git 跨平台同步
date: 2021-09-16 17:55
aliases: 心得 
tags: [Obsidian,Git]
topics: [[Obsidian 使用 Git 跨平台同步]]
---

第一步
先在Windows本機的建立一個資料夾，是拿來開啟Obsidian的Vault

![[Pasted image 20210914152609.png]]
像上面的資料路徑我新開了一個 ObsidianNote資料夾，然後Obisdian設定這個資料夾就會有一些設定檔
![[Pasted image 20210914152831.png]]

第二步
在GitHub建立一個repository，然後取名同樣的名稱ObsidianNote

第三步
開啟CMD 然後CD至剛剛的資料夾，接下來就是執行GitHub上面的初始化語法

``` git init ```
``git commit -m "first commit" ``
``git remote add origin https://github.com/TernenceZheng/ObsidianNote.git``

![[Pasted image 20210914153508.png]]


第四步
安裝第三方外掛套件 Obsidian Git
![[Pasted image 20210914161351.png]]

安裝及啟用後，左方將出現 Obsidian Git 的設定，我有以下的建議：

- 將 Vault 備份時間改為 5 分鐘 (Backup Interval: 5)
- 每次打開軟件也從 Github Pull 所有的變更 (Pull updates on startup: ON)
- Commit Message 增加電腦名稱以便識別 (Commit message: 開首加電腦名稱）
- 以及最重要的關掉 Disable Push（Disable Push: OFF)，才會自動把所有 Commit 推送到 Github 上，讓其他裝置可以同步。





參考鏈接：[Obsidian上手及使用Git跨平台同步](https://notes.desktopofsamuel.com/posts/Obsidian%E4%B8%8A%E6%89%8B%E5%8F%8A%E4%BD%BF%E7%94%A8Git%E8%B7%A8%E5%B9%B3%E5%8F%B0%E5%90%8C%E6%AD%A5/)

另外的手機版本同步參考：[[移動] 設置 iOS 與移動應用程序基於 git 的同步（使用工作副本）](https://forum.obsidian.md/t/mobile-setting-up-ios-git-based-syncing-with-mobile-app-using-working-copy/16499)

#Git 