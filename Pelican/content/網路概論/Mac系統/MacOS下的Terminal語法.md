---
title: MacOS下的Terminal語法
date: 2022-12-07 21:41
modified: 2022-12-07 21:41
tags: mac,terminal
category: 電腦問題
slug: macos-terminal-command
summary: 記錄terminal語法以備不時之需
image: /images/default_preview_image.jpg
status: published　
---

[TOC]
查看電腦的對外IP：
```
curl ifconfig.me
```

查看TCP端口與查看監聽端口：把 $PORT 換成要查看的PORT

```
sudo lsof -i -P | grep LISTEN | grep :$PORT
```


使用SSH連線：本地端使用443轉出去再連線

```
ssh -p443 jarvis.zheng@remoteIP
```

```
Netstat  
顯示傳輸協定統計和當前的 TCP/IP 網路連接。該指令只有在安裝了 TCP/IP 傳輸協定後才可以使用。

netstat [-a] [-e] [-n] [-s] [-p protocol] [-r] [interval]

參數  
-a  
 顯示所有連接和偵聽連接阜。伺服器連接通常不顯示。

-e  
 顯示乙太網統計。該參數可以與 -s 選項結合使用。

-n  
 以數位格式顯示位址和連接阜號（而不是嘗試搜尋名稱）。

-s  
 顯示每個傳輸協定的統計。預設情況下，顯示 TCP、UDP、ICMP 和 IP 的統計。-p 選項可以用來指定預設的子集。

-p protocol  
 顯示由 protocol 指定的傳輸協定的連接；protocol 可以是 tcp 或 udp。如果與 -s 選項一同使用顯示每個傳輸協定的統計，protocol 可以是 tcp、udp、icmp 或 ip。

-r  
 顯示路由表的內容。

interval  
重新顯示所選的統計，在每次顯示之間暫停 interval 秒。
```