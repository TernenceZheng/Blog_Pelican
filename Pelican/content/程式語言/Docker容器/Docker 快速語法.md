---
title: Docker 快速語法
date: 2023-03-19 08:40
modified: 2023-03-19 08:40
tags: 標籤
category: 後端程式
slug:
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

記錄一些常用的重要語法：

---

#### 查看目前Docker版本：
`docker version`

#### 建立容器並且參數使用 互動模式(interactive)
`docker container run --interactive --tty diamol/base`
參數說明：
`--interactive` 表示要以互動模式連接到容器
`--tty` 代表要在容器中連接終端對話視窗

#### 查詢所有容器
`docker container ls --all`
參數說明：
`--all` 顯示所有容器

#### top:列出某個指定容器程序
`docker container top 容器ID` 容器ID可以用簡稱來輸入

#### logs 顯示容器日誌內容 
`docker container logs 容器ID`

#### inspect顯示容器的詳細完整資訊
`docker container inspect 容器ID`

#### 在容器中執行一個網站
`docker container run --detach --publish 8088:80 diamol/ch02-hello-diamol-web`
參數說明：
diamol/ch02-hello-diamol-web 包含Apach Web的網站映像檔
--detach 在背景啓動容器並顯示容器ID
--publish 8088:80 配發實體的網路連接埠(8088)給容器使用(80)
![[Docker網路設定概念.jpg]]


#### 把Docker容器裡面的檔案複製出來到實體host
`docker cp 9f054884c189:/home/mssql /Users/jarvis.zheng/FileSource/SQL/`
參數說明：  
9f054884c189 容器ID  
/home/msql 容器裡面的資料夾  
/Users/jarvis.zheng/FileSource/SQL/ 實體機器的真實資料路徑

#### docker容器自動啟動設定
`docker ps -a`

#### 在執行docker容器時可以加如下引數來保證每次docker服務重啟後容器也自動重啟
`docker run --restart=always`
`docker update --restart=always <CONTAINER ID>`


#### 即時顯示容器使用多少系統資源
`docker container stats 容器ID`


---

參考資料：
[Docker 指令小抄](https://mileslin.github.io/2019/04/Docker-%E6%8C%87%E4%BB%A4%E5%B0%8F%E6%8A%84/)

[## 詳解Docker的持久化儲存和資料共享](https://www.itread01.com/article/1534317484.html)

[# reboot 後 Docker服務及容器自動啟動設定](https://www.796t.com/content/1549721921.html)