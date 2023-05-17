---
title: NLog的客製化TargetWithLayout
date: 2023-03-09 11:11
modified: 2023-03-09 11:11
tags: 標籤
category: 後端程式
slug:
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

參考資料：
[NLog 基本介紹與偵錯](https://dotblogs.com.tw/acelee/2018/03/27/120704)
[自製 NLog 的 Target（以 Slack 的 Incoming WebHooks 為例）](https://dotblogs.com.tw/supershowwei/2020/06/22/112737)
[Create custom Target](https://riptutorial.com/nlog/example/24032/create-custom-target)
[擴展nlog獲取我們想要的內容，比如獲取代理過後的ip地址](http://m.tnblog.net/aojiancc2/article/details/6891)

重點程式：

在設定檔 NLog.config

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.nlog-project.org/schemas/NLog.xsd NLog.xsd">


  <extensions>
    <add assembly="NLog.Targets.Http" />
  </extensions>
  <variable name="myvar" value="myvalue"/>



  <targets async="true">
    
    <target name="ECPayment" type="LogAPI">
        <layout type='JsonLayout'>
          <attribute name="RqID" layout="${aspnet-item:variable=WebApplication_RequestId}" />
          <attribute name="UserIP" layout="${aspnet-gw-request-ip}" />
          <attribute name="UserAgent" layout="${aspnet-request-useragent}" />
          <attribute name="Source" layout="${aspnet-request-url}" />
          <attribute name="LogData" layout="${message}" />
        </layout>
    </target>
  </targets>

  <rules>
    <logger name="*" level="Error" appendTo="ECPayment" />
    <logger name="*" level="Warn" appendTo="ECPayment" />
    <logger name="*" level="Info" appendTo="ECPayment" />
    <logger name="*" level="Trace" appendTo="ECPayment" />
    <logger name="*" level="Debug" appendTo="ECPayment" />
  </rules>
</nlog>
```


在Global.asax.cs 註冊

```c#
protected void Application_Start(object sender, EventArgs e)
{
	//自定義NLog的Target
	ConfigurationItemFactory.Default.Targets.RegisterDefinition("LogAPI"
		,typeof(ECPay.Payment.Extentions.LogAPITarget));
	//自定義的LayoutRenderers格式
	ConfigurationItemFactory.Default.LayoutRenderers.RegisterDefinition("aspnet-gw-request-ip"
		,typeof(Extentions.AspNetGWRequestIPLayoutRenderer)); 
}
```


在NLogExtension.cs

```c#
///針對TargetWithLayout 裡面方法的Write做Override寫一些自定義的規則
public sealed class LogAPITarget : TargetWithLayout
{
	private ECPayLogService logService = new ECPayLogService();

	public LogAPITarget()
	{
	}
	protected override void Write(LogEventInfo logEvent)
	{
		string renderMessage = this.Layout.Render(logEvent);

		string tagName = 
		(logEvent.Parameters != null && logEvent.Parameters.Length > 0) ?            
			logEvent.Parameters[0].ToString() : logEvent.LoggerName;

		if (logEvent.Level.Name == "Error")
		{
			tagName = "※程式Error※";
		}

		SendTheMessageToRemoteHost(tagName, 
									logEvent.Level, 
									renderMessage, 
									logEvent.Message);
	}
}
```


另外一個再自定 Layout格式就是在 NLog.config的Layout屬性可以自定 `layout="${aspnet-gw-request-ip}"`

```c#

[LayoutRenderer("aspnet-gw-request-ip")]
[ThreadSafe]
public class AspNetGWRequestIPLayoutRenderer : AspNetLayoutRendererBase
{
	protected override void DoAppend(StringBuilder builder, LogEventInfo logEvent)
	{
		var httpContext = HttpContextAccessor.HttpContext;
		if (httpContext == null)
		{
			return;
		}
		var realIP = new AllPay.ShareLib.Network().GetRemoteRealIP();
		realIP= string.IsNullOrEmpty(realIP) ? 
						httpContext.Request.Headers["True-Client-IP"] : realIP;
		builder.Append(realIP);
	}
}
```