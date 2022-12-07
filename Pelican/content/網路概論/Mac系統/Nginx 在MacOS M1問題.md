---
title: Nginx 在MacOS M1問題
date: 2022-12-07 21:45
modified: 2022-12-07 21:45
tags: nginx,mac
category: 電腦問題
slug: nginx-macos-error
summary: Nginx 在MacOS M1問題
image: /images/default_preview_image.jpg
status: published
---

[TOC]
設定修改nginx 然後需要reload 出現 `PID number "" in "/opt/homebrew/var/run/nginx.pid"`

查看檔案是空的，刪掉又出現另外一個問題

```
  
(base) jarvis.zheng@zhengrungdeMini ~ % sudo nginx -s reload
nginx: [error] invalid PID number "" in "/opt/homebrew/var/run/nginx.pid"

```


刪掉後出現：

```
(base) jarvis.zheng@zhengrungdeMini ~ % sudo nginx -s stop

nginx: [error] open() "/opt/homebrew/var/run/nginx.pid" failed (2: No such file or directory)

```

看起來這個檔案需要點東西。但是卻沒有東西需要重新產生

參考資料
https://ld246.com/article/1563147639170


後來執行：

```
sudo nginx -c /opt/homebrew/etc/nginx/nginx.conf
```

上面語法 要先找到原本nginx的設定的原始路徑 然後依照上面這個語法就會產生在/opt/homebrew/var/run/nginx.pid  產生完成就會出現內容有數字


```
sudo certbot --expand -d jupyter.richardrobot.xyz
```

```
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Could not find ssl_module; not disabling session tickets.
Error while running nginx -c /usr/local/etc/nginx/nginx.conf -t.

nginx: [emerg] open() "/usr/local/etc/nginx/nginx.conf" failed (2: No such file or directory)
nginx: configuration file /usr/local/etc/nginx/nginx.conf test failed

```

以上的問題是因為MacOS的M1安裝Nginx預設路徑已經是 /opt/homebrew/etc/nginx ，但是在設定certbot
的時候會用預設以前的路徑/usr/local/etc/nginx/nginx.conf ，所以必須指定路徑

用以下語法自定義路徑

```
certbot --nginx --nginx-server-root=/opt/homebrew/etc/nginx/
```

