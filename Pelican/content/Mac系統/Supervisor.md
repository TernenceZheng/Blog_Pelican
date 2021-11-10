---
title: Supervisor
date: 2021-10-05 19:22
aliases: 部落格 
tags: Mac,Supervisor,Nginx
category: Mac
slug: mac-supervisor
summary: 在Mac上使用supervisor來啓動服務
image: /images/Supervisor服務畫面.png
status: published
---

在 Linux上可以使用systemctl 這個服務來開機就能自動啓動寫好的網站服務，等等其他的，但是在Mac上卻無法，使用supervisor還有Web畫面可以查看


![[Supervisor服務畫面.png]]


## 透過brew來安裝：

`brew install supervisor`

### 設定檔路徑：

由於是Mac M1 的系統，homebrew已經將設定的路徑放在 `/opt/homebrew/etc`

如下圖，開啓 supervisor.conf 檔案

![[supervisor的ini設定畫面.png]]

可以註解前面的 `;` 符號來啓用設定 :

可以開啓 Web的畫面 啓用 登入帳號密碼
```python
[inet_http_server]         	; inet (TCP) server disabled by default
port=127.0.0.1:9001        	; ip_address:port specifier, *:port for all iface
username=test       		; default is no username (open server)
password=123         		; default is no password (open server)
```

在最後加入客製化的設定檔：
加入下面的設定，可以在/Process/  資料夾底下設定需要的Service檔，並且用 .ini 爲副檔名

```java
[include]
files = /Users/jarvis.zheng/Process/*.ini

```



已django網站爲例：

command 程序啓動命令：使用gunicorn來當WebServer，使用參數檔 gunicorn.conf.py 
```python

[program:django_server]
command=/Users/jarvis.zheng/miniforge3/envs/finlab/bin/gunicorn -c gunicorn.conf.py StockSecretary.wsgi
process_name=%(program_name)s
directory=/Users/jarvis.zheng/StockWeb/

```


啓動服務：

````python
sudo brew services start supervisor
````

參考資料：

[SUPERVISOR 介紹與使用方式](https://hoohoo.top/blog/supervisor-instructions-for-use/)

[Jupyter Notebook and Nginx Setup](https://aptro.github.io/server/architecture/2016/06/21/Jupyter-Notebook-Nginx-Setup.html)

[Mac OSX 開機啟動應用 (supervisor)](https://www.gushiciku.cn/pl/2MVd/zh-tw)

[Python Tricks —— 使用 Supervisor 控制 Linux 進程](https://www.twblogs.net/a/5d6115a6bd9eee541c32bb6f)


