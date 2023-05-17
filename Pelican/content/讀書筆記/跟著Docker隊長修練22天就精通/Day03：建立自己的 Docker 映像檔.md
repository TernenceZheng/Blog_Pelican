---
title: Day03：建立自己的 Docker 映像檔
date: 2023-05-16 17:22
modified: 2023-05-16 17:22
tags: 標籤
category: 後端程式
slug: 自定義URL標籤
summary: 預覽標題
image: /images/default_preview_image.jpg
status: hidden
---

[TOC]

首先列出要打包成一個映像檔，必須要先瞭解Dockerfile的常用命令

先列出書中範例的Dockerfile：

```dockerfile
FROM diamol/node

ENV TARGET="blog.sixeyed.com"

ENV METHOD="HEAD"

ENV INTERVAL="3000"

WORKDIR /web-ping

COPY app.js .

CMD ["node", "/web-ping/app.js"]

```


## Dockerfile常用命令

### FROM
用來載入映像檔，每個映像檔都必須以其他映像檔爲基礎，這裏用一個node程式語言來當基底

### ENV
設置環境變數，語法是 KEY="Value"  這樣的格式

### WORKDIR
會在映像檔的系統中建立一個目錄，並且將這個目錄設定爲工作目錄

### COPY
此命令是將本機電腦上的檔案，複製到映像檔內，語法：原始路徑 目標路徑
中間空白就可區別

### CMD
此命令會在Docker啓動容器時自動執行參數內的命令語句


---

建立映像檔的使用方式：

1.首先建立起Dockerfile檔案，並且撰寫完成應用程式需要的檔案

2.確認Dockerfile放置在應用程式的根目錄

3.輸入指令建立映像檔

`docker image build --tag web-ping .`
參數說明：
`--tag` 參數用來設定映像檔名稱
`.` 最後的句點是『使用目前的工作目錄』當作建置目錄


![[建立映像檔結果.png]]


![[Docker裏面看到建立成的影像檔.png]]![[映像檔詳細內容.png]]
4.執行產生容器

`docker container run -e web-ping`


## 瞭解Docker映像檔及映像層

1.Dockerfile的每一個命令都可以說是一層的映像層，映像檔是由映像層組合的
2.Dockerfile有快取機制，若是共用同一個東西，
	例如：FROM diamol/node ，其他容器也會一起共用此映像層
3.Dockerfile在建立映像層也是有快取機制
	若是如上的範例，只是修改node.js程式，之前步驟的命令會使用快取
4.優化Dockerfile，因爲快取機制，所以可以將不常修改的程式放在前面步驟就可以加快建置