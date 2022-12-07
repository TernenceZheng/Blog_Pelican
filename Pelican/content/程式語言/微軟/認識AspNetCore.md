---
title: 認識AspNetCore
date: 2022-01-26 09:55
modified: 2022-01-26 09:55
tags: ASPNETCore
category: 後端程式
slug: know-asp-net-core
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

![[aspnetcore原理.png]]
#### ASP.NET Core 
ASP.NET Core管線由一個
伺服器(Server) 和許多 中介軟體(Middleware) 組成。當宿主(Host) 程式啟動之後。管線被建置出來，作為管線『龍頭』的伺服器就開始監聽來自用戶端的HTTP請求。

#### 伺服器與中介軟體
主要由一個 IHost/IHostBuilder為核心的服務承載系統

- IHost 物件可以視為所有承載服務的宿主 (在第 10章會詳細說明 [[10.承載系統]])
- IHostBuilder物件則是它的建置者
- IHostedService被定義任何需要長時間執行的操作系統服務

其中 GenericWebHostService -- 實現了IHostedServicer介面，並將它註冊在承載系統中
有一些原生的服務類型，KestrelServer和HTTP.sys 

KestrelServer是採用libuv建立的跨平臺Web伺服器，可以用在Mac，Linux，Windows。也可以結合傳統Web伺服器(IIS Apache Nginx)將他們作為[[反向代理]]來使用。

以下使用一個程式啟動的範例說明程式執行過程：

```c#
    class Program
    {
        static void Main()
        {
            Host.CreateDefaultBuilder()
                .ConfigureWebHost(webHostBuilder => webHostBuilder
                    .UseKestrel()
	                .Configure(app => app.Run(context => 
		                context.Response.WriteAsync("Hello World."))))
                .Build()
                .Run();
        }
    }
```

上述程式說明：定義在Program.cs 中的Main方法，

呼叫靜態類型Host的`CreateDefaultBuilder`方法建立一個IHostBuilder物件，並在最後呼叫該物件Build方法建置作為服務宿主的IHost物件。當呼叫IHost物件的Run擴充方法時，ASP.NET Core應用程式將被啟動。

在呼叫IHost的Build之前，可以呼叫IHostBuilder介面的`ConfigureWebHost`擴充方法，並利用指定的`Action<IWebHostBuild>`委派物件，來建置應用程式的請求處理管線。實際上是用`IWebHostBuild`介面的`UseKestrel`擴充方法將KestrelServer註冊為伺服器

Configure擴充方法的輸入參數是`Action<IApplicationBuilder>`物件，所需的中介軟體註冊在`IApplicationBuilder`物件上，`IApplicationBuilder`介面的Run( app.Run )擴充方法，指定`Func<HttpContext,Task>`物件將回應的主體內容設定為"Hello World."。

---
#### launchSettings.json

`launchSettings.json` 檔案中的所有設定僅針對開發環境，在產品環境下是不需要這個檔案，應用發佈後產生的檔案列表也不包含該檔案。會自動產生在"/Properties"目錄下，不想手動設定也有介面可以 

![[開發環境VS的UI介面設定.png]]
-   只在本機開發電腦上使用。
-   尚未部署。
-   包含設定檔設定。

下列 JSON 會顯示名為_EnvironmentsSample_的 ASP.NET Core Web 專案的檔案，該 `launchSettings.json` 檔案是以 Visual Studio 所建立，或是： `dotnet new`

詳細環境設定的名稱參數可參考官方網站：[在 ASP.NET Core 中使用多個環境](https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/environments?view=aspnetcore-6.0#lsj)



#### ASP.NET CORE MVC
架構本質上就是由伺服器和中介軟體建置的訊息處理管線，實現路由的是 EndpointRoutingMiddleware中介軟體和EndpointMiddleware中介軟體上的。

```c#

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace helloworld
{
    class Program
    {
        static void Main()
        {
            Host.CreateDefaultBuilder()
                .ConfigureWebHostDefaults(webHostBuilder => webHostBuilder
                    .ConfigureServices(servicecs => servicecs
                        .AddRouting()
                        .AddControllersWithViews())
                    .Configure(app => app
                        .UseRouting()
                        .UseEndpoints(endpoints => endpoints.MapControllers())))
                .Build()
                .Run();
        }
    }
}
```


上述程式說明：

上面的程式片段先後呼叫`IApplicationBuilder`介面的`UseRouting`方法與`UseEndpoints`方法註冊了 `EndpointRoutingMiddleware`中介軟體和`EndpointMiddleware`中介軟體

在呼叫`UseEndpoints`方法的時候，利用指定的`Action<IEndpointRoutebuilder>` 委派物件呼叫了MapControllers擴充方法，進一步完成了針對定義在Controller類型中所有Action方法的對。

由於註冊的中介軟體具有對其他服務的依賴，所以需要預先將這些服務註冊到依賴注入架構中。依賴服務的註冊透過呼叫`IWebHostBuilder`介面的`ConfigureServices`方法完成的，該方法的參數類型為`Action<IServiceCollection>`，增加的服務註冊就儲存在IServiceCollection介面表示的集合中。

上面的依賴的服務是透過呼叫 IServiceCollection介面的AddRouting方法和AddControllersWithViews方法進行註冊的。


#### 什麼是中介軟體

在ASP.NET 核心框架中，你可以輕易地就往處理請求的流程內，插入額外的處理行為邏輯，這類中介行為將可能影響到請求的處理，以及回覆的結果。在ASP.NET 核心中這種對處理請求流程的擴展功能稱之為『中介層』


#### Startup類型


應用程式在初始化的時候會根據請求處理註冊對應的中介軟體，一般我們會將中介軟體及依賴服務的註冊定義在一個單獨的類型中，按照約定，通常將這個類型命名為Startup。

```c#
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace helloworld
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services) => services
            .AddRouting()
            .AddControllersWithViews();

        public void Configure(IApplicationBuilder app) => app
            .UseRouting()
            .UseEndpoints(endpoints => endpoints.MapControllers());
    }
}

```

如上程式，不需要讓Startup類型實現某個預先定義的介面或繼承某個預先定義基礎類別，所採用的完全是一種以『約定』為基礎的定義方式。

```c#
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace helloworld
{
    class Program
    {
        static void Main()
        {
            Host.CreateDefaultBuilder()
                .ConfigureWebHostDefaults(webHostBuilder => 
	                webHostBuilder.UseStartup<Startup>())
                .Build()
                .Run();
        }
    }
}
```

Startup類型可以呼叫IWebHostBuilder介面的`UseStartup<TStartup>` 擴充方法進行註冊


另外關聯兩篇  [[AspNetCore是如何跨平台]]


兩篇範例程式：

https://github.com/jasontaylordev/NorthwindTraders

https://github.com/dotnet-architecture/eShopOnWeb


參考： [我與 ASP.NET Core 的 30天 系列](https://ithelp.ithome.com.tw/users/20129389/ironman/3185)
