---
title: ASP.NETCore中介層
date: 2022-06-08 19:39
modified: 2022-06-08 19:39
tags: 標籤
category: 後端程式
slug:
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

### 定義Middleware

要定義Middleware需要再 `Startup.cs` 中的 `Configure()`方法中去做設定



[Built-in middleware](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-6.0#built-in-middleware)


<table aria-label="Built-in middleware" class="table table-sm">
<thead>
<tr>
<th>Middleware</th>
<th>Description</th>
<th>Order</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-6.0" data-linktype="relative-path">Authentication</a></td>
<td>Provides authentication support.</td>
<td>Before <code>HttpContext.User</code> is needed. Terminal for OAuth callbacks.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.builder.authorizationappbuilderextensions.useauthorization" data-linktype="absolute-path">Authorization</a></td>
<td>Provides authorization support.</td>
<td>Immediately after the Authentication Middleware.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/security/gdpr?view=aspnetcore-6.0" data-linktype="relative-path">Cookie Policy</a></td>
<td>Tracks consent from users for storing personal information and enforces minimum standards for cookie fields, such as <code>secure</code> and <code>SameSite</code>.</td>
<td>Before middleware that issues cookies. Examples: Authentication, Session, MVC (TempData).</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-6.0" data-linktype="relative-path">CORS</a></td>
<td>Configures Cross-Origin Resource Sharing.</td>
<td>Before components that use CORS. <code>UseCors</code> currently must go before <code>UseResponseCaching</code> due to <a href="https://github.com/dotnet/aspnetcore/issues/23218" data-linktype="external">this bug</a>.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.diagnostics.developerexceptionpagemiddleware" data-linktype="absolute-path">DeveloperExceptionPage</a></td>
<td>Generates a page with error information that is intended for use only in the Development environment.</td>
<td>Before components that generate errors. The project templates automatically register this middleware as the first middleware in the pipeline when the environment is Development.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/error-handling?view=aspnetcore-6.0" data-linktype="relative-path">Diagnostics</a></td>
<td>Several separate middlewares that provide a developer exception page, exception handling, status code pages, and the default web page for new apps.</td>
<td>Before components that generate errors. Terminal for exceptions or serving the default web page for new apps.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/proxy-load-balancer?view=aspnetcore-6.0" data-linktype="relative-path">Forwarded Headers</a></td>
<td>Forwards proxied headers onto the current request.</td>
<td>Before components that consume the updated fields. Examples: scheme, host, client IP, method.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-6.0" data-linktype="relative-path">Health Check</a></td>
<td>Checks the health of an ASP.NET Core app and its dependencies, such as checking database availability.</td>
<td>Terminal if a request matches a health check endpoint.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-requests?view=aspnetcore-6.0#header-propagation-middleware" data-linktype="relative-path">Header Propagation</a></td>
<td>Propagates HTTP headers from the incoming request to the outgoing HTTP Client requests.</td>
<td aria-label="No value"></td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-logging/?view=aspnetcore-6.0" data-linktype="relative-path">HTTP Logging</a></td>
<td>Logs HTTP Requests and Responses.</td>
<td>At the beginning of the middleware pipeline.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.builder.httpmethodoverrideextensions" data-linktype="absolute-path">HTTP Method Override</a></td>
<td>Allows an incoming POST request to override the method.</td>
<td>Before components that consume the updated method.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-6.0#require-https" data-linktype="relative-path">HTTPS Redirection</a></td>
<td>Redirect all HTTP requests to HTTPS.</td>
<td>Before components that consume the URL.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-6.0#http-strict-transport-security-protocol-hsts" data-linktype="relative-path">HTTP Strict Transport Security (HSTS)</a></td>
<td>Security enhancement middleware that adds a special response header.</td>
<td>Before responses are sent and after components that modify requests. Examples: Forwarded Headers, URL Rewriting.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/mvc/overview?view=aspnetcore-6.0" data-linktype="relative-path">MVC</a></td>
<td>Processes requests with MVC/Razor Pages.</td>
<td>Terminal if a request matches a route.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/owin?view=aspnetcore-6.0" data-linktype="relative-path">OWIN</a></td>
<td>Interop with OWIN-based apps, servers, and middleware.</td>
<td>Terminal if the OWIN Middleware fully processes the request.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/performance/caching/middleware?view=aspnetcore-6.0" data-linktype="relative-path">Response Caching</a></td>
<td>Provides support for caching responses.</td>
<td>Before components that require caching. <code>UseCORS</code> must come before <code>UseResponseCaching</code>.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/performance/response-compression?view=aspnetcore-6.0" data-linktype="relative-path">Response Compression</a></td>
<td>Provides support for compressing responses.</td>
<td>Before components that require compression.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization?view=aspnetcore-6.0" data-linktype="relative-path">Request Localization</a></td>
<td>Provides localization support.</td>
<td>Before localization sensitive components. Must appear after Routing Middleware when using <a href="/en-us/dotnet/api/microsoft.aspnetcore.localization.routing.routedatarequestcultureprovider" class="no-loc" data-linktype="absolute-path">RouteDataRequestCultureProvider</a>.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/routing?view=aspnetcore-6.0" data-linktype="relative-path">Endpoint Routing</a></td>
<td>Defines and constrains request routes.</td>
<td>Terminal for matching routes.</td>
</tr>
<tr>
<td><a href="/en-us/dotnet/api/microsoft.aspnetcore.builder.spaapplicationbuilderextensions.usespa" data-linktype="absolute-path">SPA</a></td>
<td>Handles all requests from this point in the middleware chain by returning the default page for the Single Page Application (SPA)</td>
<td>Late in the chain, so that other middleware for serving static files, MVC actions, etc., takes precedence.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/app-state?view=aspnetcore-6.0" data-linktype="relative-path">Session</a></td>
<td>Provides support for managing user sessions.</td>
<td>Before components that require Session.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-6.0" data-linktype="relative-path">Static Files</a></td>
<td>Provides support for serving static files and directory browsing.</td>
<td>Terminal if a request matches a file.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/url-rewriting?view=aspnetcore-6.0" data-linktype="relative-path">URL Rewrite</a></td>
<td>Provides support for rewriting URLs and redirecting requests.</td>
<td>Before components that consume the URL.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/w3c-logger/?view=aspnetcore-6.0" data-linktype="relative-path">W3CLogging</a></td>
<td>Generates server access logs in the <a href="https://www.w3.org/TR/WD-logfile.html" data-linktype="external">W3C Extended Log File Format</a>.</td>
<td>At the beginning of the middleware pipeline.</td>
</tr>
<tr>
<td><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/websockets?view=aspnetcore-6.0" data-linktype="relative-path">WebSockets</a></td>
<td>Enables the WebSockets protocol.</td>
<td>Before components that are required to accept WebSocket requests.</td>
</tr>
</tbody>
</table>