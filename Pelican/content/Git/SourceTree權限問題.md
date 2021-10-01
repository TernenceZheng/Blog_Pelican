---
title: SourceTree權限問題
date: 2021-09-29 17:58
aliases: 心得 
tags: Git
category: SourceTree
---

### Sourcetree出現Permission denied (publickey)
![[截圖 2021-09-29 下午5.06.52.png]]

---


這個問題的產生可能是程式問題，已經透過SourceTree的UI界面功能去產生SSH的KEY
做法來源[[Mac 上改變 Git 認證模式]] ，也已經至GitHub去註冊KEY

![[Pasted image 20210929180241.png]]

Google以後參考資料部落格：
>[MacOS更新後使用Sourcetree出現Permission denied (publickey)](https://medium.com/@wade30191/macos%E6%9B%B4%E6%96%B0%E5%BE%8C%E4%BD%BF%E7%94%A8sourcetree%E5%87%BA%E7%8F%BEpermission-denied-publickey-c226a85c0a3a)


就去找出當初用GitHub產生的PrivateKey在哪如下圖左紅框，就執行一下以下語法就可以了

![[Pasted image 20210929180643.png]]


==語法：==

執行新增
```python
ssh-add /Users/jarvis.zheng/.ssh/jarvis.zheng-GitHub
```

檢查語法
```python
ssh -T git@github.com
```
