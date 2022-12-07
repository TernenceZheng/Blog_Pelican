---
title: Mac重新開機SSH Token失效
date: 2021-10-05 16:09
tags: SSH,Git,Mac
category: 電腦問題
slug: git-ssh-mac-token
summary: Mac重新開機SSHToken失效問題
image: /images/Sourcetree出現Permissiondenied.png
status: published
---


---

![[Sourcetree出現Permissiondenied.png]]

---

已經加入Github的SSH Token了，再次的PUSH還是會產生 [[SourceTree權限問題]]

查詢問題之後 參考[ 操作提示 Permission denied, please try again](https://www.twblogs.net/a/5cc1dbe7bd9eee3aed78a30f) ，裏面的說明：

>ssh-add 這個命令不是用來永久性的記住你所使用的私鑰的。實際上，它的作用只是把你指定的私鑰添加到 ssh-agent 所管理的一個 session 當中。而 ssh-agent 是一個用於存儲私鑰的臨時性的 session 服務，所以每次重啓都會失效，都需要再次執行命令。

或是設定 [Mac 重啟後自動ssh-add 私鑰](https://mednoter.com/ssh-add-automatically.html)