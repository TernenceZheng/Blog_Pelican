---
title: 使用vncserver建立遠端管理GCP與內容管理系統建置
date: 2020-12-01 15:57
modified: 2021-12-01 15:57
aliases: 部落格 
tags: GoogleCloudPlatform,WagtailCMS
category: GoogleCloudPlatform
slug: vncserver-gcp
summary: 使用vncserver建立遠端管理GCP與架設內容管理系統站臺
image: /images/default_preview_image.jpg
status: published
---

[TOC]

這篇文章是從頭建立起GCP網站，與遠端連線的方法
1. 使用VNC Server來遠端桌面連線，因為有許多需要修改設定檔需要遠端執行
2. 站臺的建立方式WebServer是用Nginx+Gunicorn ，Python的站臺程式用WagtailCMS



## VNC Server建立可遠端桌面連線GCP
---
首先，先在GCP建立Compute Engine的VM執行個體，VM的執行個體系統選擇Ubuntu，再將外部IP改為靜態IP

![[VM設定靜態IP.png]]
![[VM設定靜態IP2.png]]

使用平臺提供的瀏覽器Terminal

![[使用平臺提供的瀏覽器Terminal.png]]
![[使用平臺提供的瀏覽器Terminal2.png]]

安裝一些必要的套件，並且執行 vnc4server
執行語法:


`sudo apt-get update && sudo apt-get upgrade`

`sudo apt-get install ubuntu-desktop gnome-panel gnome-settings-daemon metacity nautilus gnome-terminal`

`sudo apt-get install vnc4server`

`vnc4server`

---

![[安裝與執行vnc4server.png]]

### 修改~/.vnc/xstartup 的設定

輸入語法：
`sudo vim .vnc/xstartup`

進入如下畫面：  畫面是使用ubuntu的內建vim編輯器

![[畫面是使用ubuntu的內建vim編輯器.png]]

按 I 進入編輯模式
貼上四行語法

```c
gnome-panel &
gnome-settings-daemon &
metacity &
nautilus &
```
 
再輸入 :wq 儲存退出

輸入語法
`vncserver -kill :1`

`vncserver :1`

以上完成vncserver建立，可遠端桌面連線了 

GCP需要開啟防火牆 指定 PORT 5901

![[GCP需要開啟防火牆.png]]

### 下載RealVNC Viewer 

輸入 35.229.134.113:5901 連線，這個連線IP就是當初建立VM的外部靜態IP

![[下載RealVNC.png]]
![[下載RealVNC2.png]]

可遠端桌面連線是方便以後程式建置時，資料架構查看或上傳程式方便


## 如何在Google Cloud中的Ubuntu 上使用Postgres，Nginx和Gunicorn設置Django
---
前置準備：
1. 您的Compute Engine實例正在運行，請參閱設置Compute Engine實例。
2. 域名指向您的虛擬機。（此Domain我已先設定FreeDNS：gcp.mooo.com 暫時的設定，到時候申請好正式的Domain再修改）
3. 有關設置Cloud DNS的信息，請參閱為您的域設置Google Cloud DNS。


在一樣剛剛的GCP Terminal安裝以下套件

執行語法：

`sudo apt update`
`sudo apt install python3-pip python3-dev libpq-dev postgresql-contrib nginx curl`

![[安裝套件跟postgresql.png]]

如下圖，在GCP的操作功能上找SQL，並且產生Cloud SQL執行個體

![[建立GCP的SQL資料庫.png]]

          
位置區域要跟VM的位置區域一樣

![[位置區域要跟VM的位置區域一樣.png]]

建立SQL後，下面顯示的公開IP是到時候程式Django站臺連線需要

![[建立SQL後下面顯示的公開IP是到時候程式連線需要.png]]

編輯連線設定：設定只有VM的IP可以連線，填入GCP的靜態外部IP

![[編輯連線設定設定只有VM的IP可以連線.png]]

上面建立好資料庫後，開始建立VM上面Django的專案

## 建立VM上面WagtailCMS的專案
---
接下來就開始是安裝與建立內容管理系統的部分，與GCP的設定大部分已完成。
關於內容管理系統的試用分享可查看： [[內容管理系統CMS]]

建構的流程
1. 建立Python的虛擬環境
2. 安裝套裝程式:Django gunicorn coderedcms 
3. 設定連線字串
4. 執行 python manage.py migrate 初始化
5. 建立Gunicorn 連接起程式
6. 設定Nginx的設定檔


### 建立Python的虛擬環境

執行語法：（下面的語法含義可看文章說明）
安裝虛擬環境
`sudo -H pip3 install --upgrade pip`
`sudo -H pip3 install virtualenv`

建立名為WagtailDir 資料夾，並且創建虛擬環境，切換環境
`mkdir ~/WagtailDir`
`cd ~/WagtailDir`
`virtualenv WagtailEnv`
`source WagtailEnv/bin/activate`

下圖是建立資料夾與python的虛擬環境

![[建立資料夾與python的虛擬環境.png]]

### 安裝套裝程式:Django gunicorn coderedcms

執行語法
`pip install django gunicorn psycopg2-binary`

`pip install coderedcms`

`coderedcms start WagtailProject --sitename "網站名稱"`

上面是建立Django專案的語法，還有CodeRed CMS 的套件，從VNC Viewer可看到資料夾

![[還有CodeRed CMS 的套從VNC Viewer可看到資料夾.png]]
![[還有CodeRed CMS 的套從VNC Viewer可看到資料夾2.png]]

           
### 設定連線字串

修改連線字串：連線字串在 /settings/base.py

![[修改連線字串連線字串在basepy.png]]

連線字串的修改相關名稱設定可參考Django的連線設定，連線字串的使用者與密碼就是前面在GCP設定的

![[連線字串與使用者是上面在GCE設定的.png]]


上面連線字串修改好是連線遠端SQL的資料庫後，接下來的語法執行就開始建立資料庫的Table與 Schema

### 執行 python manage.py migrate 初始化

![[開始建立資料庫的Table與Schema.png]]

執行語法：
```java 
cd WagtailProject
python manage.py migrate
python manage.py makemigrations
python manage.py createsuperuser
python manage.py runserver
python manage.py collectstatic
```

看到以下畫面有顯示 http://127.0.0.1:8000 表示已經在本機跑起來一個Application Web Server

![[看到以下畫面有顯示表示已經在本機跑起來.png]]


### 建立Gunicorn 連接起程式

接下來建立Gunicorn 連接起程式
執行語法：
`sudo vim /etc/systemd/system/gunicorn.socket`

![[建立Gunicorn連接起程式.png]]


`sudo vim /etc/systemd/system/gunicorn.service`

![[建立Gunicorn連接起程式2.png]]

```python
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=sutsagent
Group=sutsagent
WorkingDirectory=/home/sutsagent/WagtailDir/WagtailProject
ExecStart=/home/sutsagent/WagtailDir/WagtailEnv/bin/gunicorn \
     --access-logfile - \
     --workers 3 \
     --bind unix:/run/gunicorn.sock \
     WagtailProject.wsgi

[Install]
WantedBy=multi-user.target

```

最後執行一些啟動，重啟與狀態查看

```python
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
sudo systemctl status gunicorn.socket
file /run/gunicorn.sock
sudo systemctl status gunicorn
curl --unix-socket /run/gunicorn.sock localhost
sudo systemctl status gunicorn
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
```

### 設定Nginx的設定檔

設定Nginx，建立一個自定義名稱設定檔，我定義為 gcp.mooo.com

`sudo vim /etc/nginx/sites-available/gcp.mooo.com`

Nginx的一些設定，主要設定server_name要對應自己的Domain，與location的路徑
```c
server 
{
    listen 80;
    listen [::]:80;

    server_name gcp.mooo.com www.gcp.mooo.com;

    location = /favicon.ico {
        access_log off;
        log_not_found off;
    }

    location /static/ {
        root /home/sutsagent/WagtailDir/WagtailProject;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}

```

最後：將檔案連結到啟動網站的目錄來啟動該檔案
`sudo ln -s /etc/nginx/sites-available/pgcp.mooo.com /etc/nginx/sites-enabled`

執行最後語法：測試nginx與重啟
``` python
sudo nginx -t
sudo service nginx restart
```

## 後續
---
後續開發都是使用VSCode，發現使用Remote SSH連線遠端直接修改設定檔還比較快
另外記錄使用方式： [[使用VSCode遠端SSH開發]]



參考資料：

- [【筆記】在GCP上建立可Remote dekstop的Ubuntu環境](https://medium.com/@huiqinng/%E7%AD%86%E8%A8%98-%E5%9C%A8gcp%E4%B8%8A%E5%BB%BA%E7%AB%8B%E5%8F%AFremote-dekstop%E7%9A%84ubuntu%E7%92%B0%E5%A2%83-e56fdbd3a4f2)
- [在GCP開啟Ubuntu遠端桌面](https://infinitewing.github.io/2017/08/13/20170813001/)
- [How To Set Up Django with Postgres, Nginx, and Gunicorn on Ubuntu 18.04 in Google Cloud](https://www.cloudbooklet.com/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-18-04-in-google-cloud/)
- [[Django] 在Ubuntu中運用Nginx、Gunicorn 架設 Django API Server](https://medium.com/tsungs-blog/django-%E5%9C%A8ubuntu%E4%B8%AD%E9%81%8B%E7%94%A8nginx-gunicorn-%E6%9E%B6%E8%A8%AD-django-api-server-6d41c165a2c7)