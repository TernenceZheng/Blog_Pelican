---
title: Mac 上改變 Git 認證模式
date: 2021-09-16 17:53
aliases: 心得 
tags: Git,Mac
category: Git
summary: Mac 上改變 Git 認證模式
image: /images/Mac上改變Git認證模式.png
status: published
---


---

2021/09/14 今天在mac 上面在 git clone https://github.com/TernenceZheng/ObsidianNote.git

---

![[Mac上改變Git認證模式.png]]

---

結果我的mac顯示無法用使用者帳號密碼去登入驗證

```'Mac上面錯誤訊息'
Cloning into 'ObsidianNote'...
Username for 'https://github.com': andy711023@gmail.com
Password for 'https://andy711023@gmail.com@github.com': 
remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
fatal: Authentication failed for 'https://github.com/TernenceZheng/ObsidianNote.git/'
```


看了文章原來要去用GitHub的Token驗證方式才可以，舊的帳號密碼已經不行了，下面是Github產生的Token
![[Pasted image 20210914164331.png]]

把拿到的Token註冊在MacOS的鑰匙圈如下圖

---

![[Pic2021-09-144.54.10.png]]

---


就完成Token的驗證註冊，然後git clone就OK了

參考資料：[Mac 上改變 Git 認證模式](https://myctw.github.io/post/bd72.html)

相關主題：
[[Obsidian 使用 Git 跨平台同步]]
[[SourceTree權限問題]]