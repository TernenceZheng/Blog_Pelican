---
title: OpenMediaVault+NextCloud 安裝
date: 2023-03-08 09:46
modified: 2023-03-08 09:46
tags: 標籤
category: 後網路概論
slug: 自定義URL標籤
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]


Part1 OMV 安裝
Part2 OMV samba 設置
Part3 部署 nextcloud 
Part4 在 nextcloud 加入 samba
Part5 為nextcloud 建立 ssl 加密 (進階)
Part6 非固定外網 IP 下從外網連接 nextcloud 方案 (進階) (完結編)

參考資料路徑 [舊電腦變自架雲端儲存 nextcloud + samba 最詳細教學 帶你一步一步走 (Part1)](http://hkptparadise.blogspot.com/2022/12/nextcloud-samba-part1.html)


在裝好 omv-extras 接下來裝 docker，再portainer ，就會出現錯誤

`Something went wrong trying to pull and start portainer`

接下來參考解法文章：

https://forum.openmediavault.org/index.php?thread/46112-docker-not-working-since-omv-upgrade/

執行如下語法：


```python

sudo mkdir -p /etc/default/grub.d
echo 'GRUB_CMDLINE_LINUX_DEFAULT="$GRUB_CMDLINE_LINUX_DEFAULT apparmor=0"' | sudo tee /etc/default/grub.d/apparmor.cfg
sudo update-grub
sudo reboot
```