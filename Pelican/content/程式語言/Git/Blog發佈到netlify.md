---
title: Blog發佈到netlify
date: 2021-10-05 16:36
tags: Namecheap,Netlify,Git,Pelican
category: 後端程式
slug: git-netlify
summary: 使用Netlify來部署Pelican的程式
image: /images/Blog發佈到netlify.png
status: published
---


![[Blog發佈到netlify.png]]

Netlify 基本的說明：

>[netlify 超佛心的靜態網站hosting服務 - 不只做hosting還有更多](https://blog.alantsai.net/posts/2018/07/migrate-blog-to-ssg-demo-devops-8-netlify-free-static-site-hosting-service)


由 [[部落格建置]] 與 [[部落格建置-套件]] 兩個篇章的設定，已經把Pelican 可以在本機做測試查看了，接下來就要建置部署在網路上，首先就是要買個網域，看來看去還是 Namecheap 最便宜，詳細買過程可以參考：

>[Namecheap 網址註冊購買 DNS 設定教學 網域綁定主機](https://make9.tw/wordpress/website-server/namecheap-%E7%B6%B2%E5%9D%80%E8%A8%BB%E5%86%8A%E8%B3%BC%E8%B2%B7-dns-%E8%A8%AD%E5%AE%9A%E6%95%99%E5%AD%B8-%E7%B6%B2%E5%9F%9F%E7%B6%81%E5%AE%9A%E4%B8%BB%E6%A9%9F/)


https://richardrobot.xyz  一次買兩年才 NT$ 233 ，還蠻便宜，反正只是做Blog隨手記錄
買好了網址接下來就是要把GitHub與Netlify綁定在一起參考流程如下Blog：

>[Pelican static site on Netlify](https://michaelabrahamsen.com/posts/pelican-static-site-on-Netlify/)

需要注意的是，Blog文章裏面的執行語法  

Build command

`pelican content -s publishconf.py`

這個設定了反而不能，會出現錯誤，我的設定

![[Netlify設定發佈建置.png]]



另外需要把Netlify提供的Name Server 設定到 Namecheap 的DNS設定

Netlify的設定畫面：
![[Netlify設定Domain的畫面.png]]


然後對應到：NAMESERVERS 選CustomDNS

![[Namecheap設定的畫面.png]]

