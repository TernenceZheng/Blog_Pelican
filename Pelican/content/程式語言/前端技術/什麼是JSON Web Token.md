---
title: 什麼是JSON Web Token
date: 2022-12-28 09:28
modified: 2022-12-28 09:28
tags: JWT
category: 後網路概論
slug:
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

必須瞭解一下什麼是 JWT，另外在ASP.NET Core中 有實作此JWT的機制可參考：

[JwtBearerExtensions.AddJwtBearer 方法]([JwtBearerExtensions.AddJwtBearer 方法 (Microsoft.Extensions.DependencyInjection) | Microsoft Learn](https://learn.microsoft.com/zh-tw/dotnet/api/microsoft.extensions.dependencyinjection.jwtbearerextensions.addjwtbearer?view=aspnetcore-7.0))
或是 另外一個筆記 [[JwtBearerExtensions]]

---

## 以下是JWT的說明：

![[jwt的架構與解碼.png]]

JWT的架構如上，分成三個部分，分別用『 . 』來區分三個部分，第一個部分是header 中間第二部分是payload ，第三個部分是 signature。三個部分皆是用base64做編碼，以下定義三個部分的說明：

### header: 是一個JSON格式，定義兩個KEY ，alg      typ

```json
{  
	"alg": "HS256",  --alg要使用加密的雜湊演算法
	"typ": "JWT",     --typ此Token的種類
	"cty": ""         --非必要,用來聲明巢狀的架構內容形態
}
```

### payload：是一個JSON，定義使用者和相關的資訊都可以放置其中

```JSON
{
  "iss": "3083160",              --Issuer 簽發者
  "sub": "20221230092115",       --Subject 可說是用戶
  "jti": "FwJc+oGI3qrNbyQI=",    --JWT Id 身分標示，每個JWT的Id都應該是不重複的
  "aud": ......                  --接收JWT的一方通常不需要定義這個
  "nbf": 1672363299,  --(Not Before)：也就是定義擬發放JWT之後，的某段時間點前該JWT仍舊是不可用的
  "exp": 1672364199,             --JWT的過期時間，過期時間必須大於簽發JWT時間
  "iat": 1672363299,             --JWT簽發時間

  --以下是可自定義的欄位
  "roles": "SignalR",
}

```


### signature/encryption data：簽章（Signature ）是將被轉換成 Base64 編碼的 Header、Payload 與自己定義的密鑰，透過在 Header 設定的雜湊演算法方式所產生的



參考資料：

[[筆記] 透過 JWT 實作驗證機制](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E9%80%8F%E9%81%8E-jwt-%E5%AF%A6%E4%BD%9C%E9%A9%97%E8%AD%89%E6%A9%9F%E5%88%B6-2e64d72594f8)

[是誰在敲打我窗？什麼是 JWT ？](https://5xruby.tw/posts/what-is-jwt)

[Introduction to JSON Web Tokens](https://jwt.io/introduction)

[JWT(JSON Web Token) — 原理介紹](https://medium.com/%E4%BC%81%E9%B5%9D%E4%B9%9F%E6%87%82%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88/jwt-json-web-token-%E5%8E%9F%E7%90%86%E4%BB%8B%E7%B4%B9-74abfafad7ba)