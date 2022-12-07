---
title: JupyterNoteBook 在Nginx上
date: 2021-10-05 20:14
tags: JupyterNoteBook
category: 後端程式
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---



1.在網頁開啟Jupyter頁面登入後一片空白，F12看到錯誤

```
ERR_CONTENT_LENGTH_MISMATCH
```

[ERR_CONTENT_LENGTH_MISMATCH 錯誤解法](https://github.com/xhlwill/blog/issues/17)

2.第一點問題處理後出現另外一個問題，F12看到錯誤

```
Uncaught (in promise) ChunkLoadError: Loading chunk 3472 failed.
```

![[Jupyter在Nginx上的問題.jpg]]

關於第二點的問題，是Jupyter站臺需要使用HTTPS的環境，因此在使用安裝如下語法，就可正常使用了

```
sudo certbot --expand -d jupyter.richardrobot.xyz
```

另外Router的PortForwding要記得設定443PORT要開