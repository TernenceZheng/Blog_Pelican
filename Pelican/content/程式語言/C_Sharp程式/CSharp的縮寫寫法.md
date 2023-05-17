
---
title: CSharp的縮寫寫法
date: 2023-03-27 15:30
modified: 2023-03-27 15:30
tags: 標籤
category: 後端程式
slug: csharp-candy-tag
summary: csharp的語法糖
image: /images/default_preview_image.jpg
status: published　
---

[TOC]



範例：

```c#
public class DatabaseContext : IDisposable
{
    private readonly IDbConnection _connection;

    public DatabaseContext(string connectionString)
    {
        _connection = new SqlConnection(connectionString);
    }

    public IDbConnection Connection => _connection;

    public void Dispose()
    {
        _connection?.Dispose();
    }
}
```

上面的 `public IDbConnection Connection => _connection;` 程式碼是一個 C# 自動屬性（auto property）的縮寫寫法，等同於：

```c
public IDbConnection Connection {
    get {
        return _connection;
    }
}
```

這種用法可以讓我們更簡潔地定義一個只讀的屬性，讓外部程式碼可以訪問某個類的私有字段，同時又可以保護這個字段不被意外地修改。
