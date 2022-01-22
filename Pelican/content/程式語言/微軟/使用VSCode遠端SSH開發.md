---
title: 使用VSCode遠端SSH開發
date: 2020-08-25 18:22
modified: 2020-08-25 18:22
tags: VisualStudioCode,GoogleCloudPlatform
category: 後端程式
slug: VisualStudioCode-GCP
summary: 使用VSCode遠端開發，透過Remote-SSH
image: /images/default_preview_image.jpg
status: published
---

[TOC]


##  產生SSH KEY


開啟 Terminal 執行以下語法，可以看到路徑預設在 `/Users/你的名稱/.ssh` 下
```
ssh-keygen
```

如下圖，要求輸入名稱或是直接按Enter產生預設名稱id_rsa，我輸入jarvis.zheng-GithHub

![[ssh-key產生.jpg]]

在Mac 下使用快捷鍵來查看隱藏資料夾： `Command + Shift +  . `

公鑰 (jarvis.zheng-GithHub.pub) 以及私鑰 (jarvis.zheng-GithHub)，
公鑰到時候要複製到GCP上，而私鑰則是自己用，雙方才能夠溝通。

![[產生的公鑰與私鑰.jpg]]

---

如下圖，是GCP的Compute Engine 上面設定公鑰的地方

---

![[在GCP上面把公鑰複製上去.jpg]]

如下圖在VSCode安裝外掛套件，Remote Development

![[VSCode安裝RemoteDevelopment.jpg]]

安裝完成後，在 VSCode介面的左下角可以看到圖標，按下去顯示清單，選擇Connect to Host，輸入要連線的伺服器，格式 username@server_host

就是GCP上面的： 使用者名稱@外部IP

![[在VScode安裝並且連線GCP的外部IP.jpg]]

---


番外篇：
SSH Key產生的時候權限問題 ，無法儲存檔案問題，

完美解決：
https://stackoverflow.com/questions/51614552/google-cloud-platform-ssh-to-google-cloud-instance-will-have-permission-denied



參考資料：

[VS Code 使用 Remote – SSH 開啟遠端 Linux 資料夾](https://www.wowfuncode.com/2020/07/14/vscode-using-remote-ssh/)