---
title: ASP.NET Core的Terminal語法
date: 2022-06-14 15:34
modified: 2022-06-14 15:34
tags: 標籤
category: 後端程式
slug:
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

一開始安裝完成 .NET Core 6 SDK後，開啓Terminal 執行語法：`dotnet` 就可以看到相關參數
![[aspnetcore6_terminal1.png]]
`dotnet new webapi -o SampleAPI`

參數說明： 建立有個 webapi專案範本， -o 是要另外輸出到指定的目錄底下，SampleAPI範本資料夾

### Entity Framework Core

要開發EFcore之前要先安裝dotnet ef的全域工具：
`dotnet tool install --global dotnet-ef`

安裝EF Core的NuGet套件：
`dotnet add package Microsoft.EntityFrameworkCore.SqlServer` (資料庫的Provider，用來與相對應的資料庫溝通)
`dotnet add package Microsoft.EntityFrameworkCore.Design` (透過cli來產生資料實體)

產生資料實體的指令：(要先在資料庫建立Blog的DB)
`dotnet ef dbcontext scaffold "Server=localhost,1433\\Catalog=tutorial_database;Database=Blog;User=SA;Password=Te$t1234" "Microsoft.EntityFrameworkCore.SqlServer" -o ./Models -c BlogContext -f`

指令說明
dotnet ef dbcontext scaffold "<連線字串>" "<使用的資料庫提供者套件>" -o<是否要輸出在另外一個資料夾> -c<名稱Context> -f

```c
Microsoft.Data.SqlClient.SqlException (0x80131904): A connection was successfully established with the server, but then an error occurred during the pre-login handshake. (provider: TCP Provider, error: 35 - An internal exception was caught)

 ---> System.Security.Authentication.AuthenticationException: The remote certificate was rejected by the provided RemoteCertificateValidationCallback.

   at System.Net.Security.SslStream.SendAuthResetSignal(ProtocolToken message, ExceptionDispatchInfo exception)
```
上面的錯誤不知爲何在之後重新再執行(產生資料實體的指令)就會出錯，後面要新增一句
`TrustServerCertificate=True;`

變成如下：
`dotnet ef dbcontext scaffold "Server=localhost,1433\\Catalog=tutorial_database;Database=Blog;User=SA;Password=Te$t1234;TrustServerCertificate=True;" "Microsoft.EntityFrameworkCore.SqlServer" -o ./Models -c BlogContext -f`

關於 dbcontext scaffold 用法可參考：[DB反向工程](https://learn.microsoft.com/zh-tw/ef/core/managing-schemas/scaffolding/?tabs=dotnet-core-cli)

```sql 

dotnet ef dbcontext scaffold "Server=localhost,1433\\Catalog=tutorial_database;Database=FinLab;User=sa;Password=2UauixdR;TrustServerCertificate=True;" "Microsoft.EntityFrameworkCore.SqlServer" --context-dir Data --output-dir Models -c FinLabContext --table columns_mapping --table News_List --table quotes_Temp --table 台股指數

```


建立好資料庫模型：Article User 就可以執行 Migration

`dotnet ef migrations add init --context BlogContext`

下面語法就是直接更新資料庫：

`dotnet ef database update --context BlogContext`


![[截圖 2022-06-18 下午2.10.14.png]]

修改資料表：新增一個欄位PostTime 在 Articles.cs中

`dotnet ef migrations add Add_PostTime --context BlogContext`
Add_PostTime 是這次migrations的方法名稱

更新DB
`dotnet ef database update --context BlogContext`

BlogContext 是要更新的EF Core 實體名稱


常用指令：

`dotnet ef migrations remove` 
移除上一個migration版本

`dotnet ef database update <版本名稱>`
將資料庫更新至特定版本

`dotnet ef migrations script`
從空白資料庫產生SQL腳本至最新的migration

`dotnet ef migrations script <FROM> <TO>`
從指定的遷移產生SQL腳本from 至指定的to遷移

`dotnet ef database drop`
刪除資料庫


### WebAPI

`dotnet tool install -g dotnet-aspnet-codegenerator`
提供產生範例程式碼的功能，這裏用來產生WebAPI範例

`dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design`
安裝相關套件

`dotnet add package Microsoft.EntityFrameworkCore.SqlServer`
安裝相關套件

`dotnet aspnet-codegenerator controller --controllerName ArticleController -async -api -actions -m Article -dc BlogContext -outDir Controllers`
語法說明：用dotnet cli來產生一個controller
指令說明：
| 參數                           | 作用                                                             |
| ------------------------------ | ---------------------------------------------------------------- |
| -controllerName 或 -name       | 設定控制器的名稱                                                 |
| -useAsyncActions 或 -async     | 產生非同步控制器動作                                             |
| -resWithNoViews 或 -api        | 使用REST樣式API產生控制器。假設使用noViews會忽略所有檢視相關選項 |
| -readWriteAcitons 或 -actions  | 在不使用模型的情況下使用讀取/寫入動作產生控制器                  |
| -model 或 -m                   | 要使用的模型類別                                                 |
| -dataContext 或 -dc            | 要使用的DbContext 類別                                           |
| -relativeFolderPath 或 -outDir | 專案的相對輸出路徑                                                                 |


### Serilog

`dotnet add package Serilog.AspNetCore`

#### Seq 

`docker pull datalust/seq:latest`

`docker run --name seq -d --restart unless-stopped -e ACCEPT_EULA=Y -p 5341:80 datalust/seq:latest`

`dotnet add package Serilog.Sinks.Seq`