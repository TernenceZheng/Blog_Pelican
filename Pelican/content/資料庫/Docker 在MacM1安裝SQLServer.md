---
title: Docker 在MacM1安裝SQLServer
date: 2023-05-16 10:03
modified: 2023-05-16 10:03
tags: docker,SqlServer,mac
category: 後端程式
slug: docker-mac-sqlserver
summary: Docker 在MacM1安裝SQLServer
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

主要參考這篇：[https://f5soft.site/zh/notes/2021/0411/](https://f5soft.site/zh/notes/2021/0411/)  
1.安裝Docker  
2.下載影像檔(azure-sql-edge專門為了M1的)

```c
docker pull mcr.microsoft.com/azure-sql-edge
```

執行Docker

```c
docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' -e 'MSSQL_SA_PASSWORD=你的密碼' -p 1433:1433 --name SQLServer -d mcr.microsoft.com/azure-sql-edge
```

-   下面這句-v /Users/jarvis.zheng/FileSource:/FileSource 本機的資料夾:Docker的資料夾
    

```c
docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' -e 'MSSQL_SA_PASSWORD=你的密碼' -p 1433:1433 --name SQLServerOnDocker -v /Users/jarvis.zheng/FileSource:/FileSource  -d mcr.microsoft.com/azure-sql-edge
```


---

docker在 還原MDF資料庫檔案的流程

範例：
```
chmod 666 School_*
docker cp FinLab.mdf SQLServerOnDocker:/home/mssql/
docker cp FinLab_log.ldf SQLServerOnDocker:/home/mssql/
```

```
CREATE DATABASE FinLab
    ON (FILENAME = '/home/mssql/FinLab.mdf'),   
    (FILENAME = '/home/mssql/FinLab_log.ldf')   
    FOR ATTACH; 
```