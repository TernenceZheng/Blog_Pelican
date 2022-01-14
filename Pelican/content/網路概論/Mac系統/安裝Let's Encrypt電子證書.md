---
title: 安裝Let's Encrypt電子證書
date: 2021-10-08 18:45
aliases: 部落格 
tags: ssl
category: Mac
slug: mac-lets-encrypt
summary: 在Mac本機安裝SSL與驗證流程記錄
image: /images/url設定的圖片.png
status: published
---


在本機驗證安裝Let's Encrypt

`brew install certbot`

`brew ls certbot`



然後在Mac執行  

`certbot --config-dir ~/letsencrypt/etc --work-dir ~/letsencrypt/lib --logs-dir ~/letsencrypt/log certonly --manual`


接下來會有三個步驟要輸入：

1.Email

2.domain

3.會要你在規定的路徑上產生讀取文檔：

```python

Saving debug log to /Users/jarvis.zheng/letsencrypt/log/letsencrypt.log

Please enter the domain name(s) you would like on your certificate (comma and/or

space separated) (Enter 'c' to cancel): linebot.richardrobot.xyz

Requesting a certificate for linebot.richardrobot.xyz

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Create a file containing just this data:

  

YYUCwTYHewbZ0vVcobFBA8kmL-xs-8AQAj5aH7tD3HI.mFCPG4KMVD6yTJlxRiPv1IXrYQENjpRSb9DJyynjW5I

  

And make it available on your web server at this URL:

  

http://linebot.richardrobot.xyz/.well-known/acme-challenge/YYUCwTYHewbZ0vVcobFBA8kmL-xs-8AQAj5aH7tD3HI

  

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Press Enter to Continue

```

從上面的指示來看 要在指定的網址：

> http://linebot.richardrobot.xyz/.well-known/acme-challenge/YYUCwTYHewbZ0vVcobFBA8kmL-xs-8AQAj5aH7tD3HI


產生可讀取字串：

`YYUCwTYHewbZ0vVcobFBA8kmL-xs-8AQAj5aH7tD3HI.mFCPG4KMVD6yTJlxRiPv1IXrYQENjpRSb9DJyynjW5I`


---

## 在Django的做法如下：


在 url.py 設定網址：

![[url設定的圖片.png]]


檔案放置的地方：
![[檔案放置的地方.png]]

Views.py 程式讀取的方式：
![[views程式讀取的方式.png]]


驗證成功存放的路徑：
![[驗證成功的畫面.png]]


nginx 新增的配置
```c

第一個
server {

server_name linebot.richardrobot.xyz;

listen 80;

return 301 https://linebot.richardrobot.xyz$request_uri;

}

第二個
server{

listen 443;

server_name linebot.richardrobot.xyz;

  

ssl on; # <-

ssl_certificate /Users/jarvis.zheng/LineBot/ssl/cert.pem; # <-

ssl_certificate /Users/jarvis.zheng/LineBot/ssl/chain.pem; # <-

ssl_certificate_key /Users/jarvis.zheng/LineBot/ssl/privkey.pem; # <-


	location / {

		#第三個
		proxy_set_header X-Forwarded-Proto https; # <-這個很重要，記得加入


	}

}




```


---

```沒有加最後的分號 ; 
(LineBot) jarvis.zheng@zhengruichangdeMac-mini LineBot % sudo nginx -s reload
Password:
nginx: [warn] the "ssl" directive is deprecated, use the "listen ... ssl" directive instead in /opt/homebrew/etc/nginx/sites-enabled/LineBot:5
nginx: [emerg] no "ssl_certificate_key" is defined for certificate "/Users/jarvis.zheng/LineBot/ssl/chain.pem" and the "ssl" directive in /opt/homebrew/etc/nginx/sites-enabled/LineBot:5
```


參考資料：

- [安裝Let's Encrypt電子證書](https://yinlei.org/x-plane10/big5.php?p=2017/01/lets-encrypt.html)
- [如何在NGINX+DJANGO平台設置SSL連線](https://jerry.thesolarsystems.net/?p=885)

