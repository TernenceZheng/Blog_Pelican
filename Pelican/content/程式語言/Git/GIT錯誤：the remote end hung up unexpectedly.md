---
title: GIT錯誤：the remote end hung up unexpectedly
date: 2022-07-28 17:20
modified: 2022-07-28 17:20
tags: git
category: 後端程式
slug: git-remote-hung-up-unexpectedly
summary: GIT error：the remote end hung up unexpectedly
image: /images/default_preview_image.jpg
status: published
---

[TOC]

最近修改專案，新增了許多packages，然後加入Git 清單內，但是當要PUSH時，就發生如下錯誤訊息，
git小烏龜報錯如標題

```git
Enumerating objects: 490, done.
Counting objects: 100% (381/381), done.
Delta compression using up to 12 threads
Compressing objects: 100% (288/288), done.
error: RPC failed; HTTP 400 curl 22 The requested URL returned error: 400
fatal: the remote end hung up unexpectedly
Writing objects: 100% (299/299), 7.85 MiB | 8.89 MiB/s, done.
Total 299 (delta 133), reused 16 (delta 1), pack-reused 0
fatal: the remote end hung up unexpectedly
Everything up-to-date

```

查詢google後，約略可能為如下原因所引發的，git上傳實際會將先檔案放入緩衝區，緩衝區如果設置的值比要上傳的內容小，那麼就會出現這個錯誤

修改提交緩存區大小為5GB，或者更大的數字，該方式全域生效，一勞永逸

`git config --global http.postBuffer 5242880000`


參考資料：[git 推送出现 "fatal: The remote end hung up unexpectedly" 解决方案](https://www.cnblogs.com/rgqjson/p/13297526.html)