---
title: Chapter 3 透過虛設常式解決依賴問題
date: 2022-07-15 19:51
modified: 2022-07-15 19:51
tags: 標籤
category: 後端程式
slug: 自定義URL標籤
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]


定義：

>外部依賴：（external dependency）是指系統中的一個物件，它與被測試程式碼之間產生互動，但你無法掌握這個物件。常見的外部依賴包含檔案系統、執行緒、記憶體、時間

>虛設常式：（stub）是在系統中產生一個可控的替代物件，來取代一個外部相依物件。你可以在測試程式中，透過虛設常式來避免必須直接相依物件所造成的問題

## 重構設計以提升程式碼的可測試性

解除依賴有兩種重構方式

A型：將具象類別(concrete class)抽象成介面或委派
B型：重構程式碼，以變將委派或介面的偽實作注入至目標物件中

在下列列表中，分別列了重構的形式：

1. A型：截取介面以便替換底層實作內容
2. B型：在被測試類別中注入一個虛設常式的實作內容
3. B型：在建構函式注入一個假物件
4. B型：從屬性的讀取或設定中注入一個假物件
5. B型：在方法被呼叫前注入一個假物件

---

#### 1.截取介面以便替換底層實作內容
#### 2.依賴注入：在被測試類別中注入一個虛設常式的實作內容
#### 3.在建構函式注入一個假物件(建構函式注入)
#### 4.從屬性的讀取(get)或設定(set)中注入一個假物件
#### 5.在方法被呼叫前注入一個假物件
---

前面三個章節目錄的說明，主要是在說明 建構子注入、屬性注入、工廠方法注入

### 建構子注入

```c#
///原本的程式碼是這樣，沒有介面也沒有實作
public class LogAnalyzer
{
	public bool WasLastFileNameValid { get; set; }

	public bool IsValidLogFileName(string fileName)
	{
		WasLastFileNameValid = false;

		if (string.IsNullOrEmpty(fileName))
		{
			throw new ArgumentException("filename has to be provided");
		}
		if (!fileName.EndsWith(".SLF",StringComparison.CurrentCultureIgnoreCase))
		{
			return false;
		}

		WasLastFileNameValid = true;
		return true;
	}

}

```

下面的程式碼改寫用建構式注入，先定義一個介面然後把上面邏輯抽離出來(注意下面的介面還沒實作)
```C#
//這個原本要被測試的物件，裡面的IsValidLogFileName邏輯都由IExtensionManager介面去判斷了
public class LogAnalyzer
{
	public bool WasLastFileNameValid { get; set; }


	private IExtensionManager manager;
	public LogAnalyzer(IExtensionManager mgr)
	{
		this.manager = mgr;
	}


	public bool IsValidLogFileName(string fileName)
	{
		return this.manager.IsValid(fileName);
	}

}

/// <summary>
/// 定義一個介面，要去驗證路徑
/// </summary>
public interface IExtensionManager
{
	bool IsValid(string fileName);
}

```

下面實作介面，把原本LogAnalyzer 檢驗邏輯由這個物件實作
```C#
/// <summary>
/// 原本LogAnalyzer 檢驗邏輯由這個物件實作
/// </summary>
public class FileManage : IExtensionManager
{
	public bool IsValid(string fileName)
	{
		if (string.IsNullOrEmpty(fileName))
		{
			throw new ArgumentException("filename has to be provided");
		}
		if (!fileName.EndsWith(".SLF", StringComparison.CurrentCultureIgnoreCase))
		{
			return false;
		}
		return true;
	}
}
```


測試實作假物件的方式
```C#
//先定義一個虛設常式內容
public class FakeExtensionManager : IExtensionManager
{
	public bool WillBeVaild = false;
	public bool IsValid(string fileName)
	{
		return WillBeVaild;
	}
}


[Test]
public void IsValidLogFileName_用建構子注入實作測試()
{
	FakeExtensionManager fakeManager = new FakeExtensionManager();
	fakeManager.WillBeVaild = true;

	LogAnalyzer log = new LogAnalyzer(fakeManager);

	bool result = log.IsValidLogFileName("short.ext");

	Assert.True(result);
}
```


### 屬性注入(如果你期望相依物件是非必要的就可用此)

改寫成屬性注入
```c#
public class LogAnalyzer
{
	public bool WasLastFileNameValid { get; set; }
	///重點在這裡定義了兩個介面，但是一個可以用屬性注入而且要public
	private IExtensionManager manager;
	public IExtensionManager ExtensionManager
	{
		get { return manager; }
		set { manager = value; }

	}
	public LogAnalyzer()
	{
		this.manager = new FileManage();
	}


	public bool IsValidLogFileName(string fileName)
	{
		return this.manager.IsValid(fileName);
	}

}
```

測試實作
```c#

//先定義一個虛設常式內容
public class FakeExtensionManager : IExtensionManager
{
	public bool WillBeVaild = false;
	public bool IsValid(string fileName)
	{
		return WillBeVaild;
	}
}

[Test]
public void IsValidLogFileName_用建構子注入實作測試()
{
	FakeExtensionManager fakeManager = new FakeExtensionManager();
	fakeManager.WillBeVaild = true;

	LogAnalyzer log = new LogAnalyzer();

	log.ExtensionManager = fakeManager;

	bool result = log.IsValidLogFileName("short.ext");

	Assert.True(result);
}
```


### 用工廠方法來注入假物件


先建立工廠方法
```c#
//工廠方法
internal class ExtensionManagerFactory
{
	private static IExtensionManager customManager = null;
	
	public static IExtensionManager Create()
	{
		if (customManager != null)
		{
			return customManager;
		}
		return new FileManage();
	}
	
	public static void SetManager(IExtensionManager manager) 
	{
		customManager= manager;
	}
}
```

然後原本的LogAnalyzer透過工廠方法來建立物件
```C#
public class LogAnalyzer
{
	public bool WasLastFileNameValid { get; set; }

	private IExtensionManager manager;
	public LogAnalyzer()
	{ //這裡，改為用工廠方法來建立若是工廠方法的建立被假物件注入，此物件new出來就是假物件的
		this.manager = ExtensionManagerFactory.Create();
	}

	public bool IsValidLogFileName(string fileName)
	{
		return this.manager.IsValid(fileName);
	}

}
```

測試的實作寫法
```c#
//先定義一個虛設常式內容
public class FakeExtensionManager : IExtensionManager
{
	public bool WillBeVaild = false;
	public bool IsValid(string fileName)
	{
		return WillBeVaild;
	}
}
[Test]
public void IsValidLogFileName_用工廠方法注入實作測試()
{
	FakeExtensionManager fakeManager = new FakeExtensionManager();
	fakeManager.WillBeVaild = true;

	//靜態方法的物件建立已經被假物件注入
	ExtensionManagerFactory.SetManager(fakeManager);

	//此時這裡new出來的物件也只會是假物件
	LogAnalyzer log = new LogAnalyzer();

	bool result = log.IsValidLogFileName("short.ext");

	Assert.True(result);
}
```
### 截取與覆寫(適合模擬被測試類別的輸入檢驗或模擬輸出的檢驗)

==注意這個截取與覆寫方法，不適合用在驗證『被測試程式對相依物件的互動』==

先建立一個可覆寫的工廠方法
```c#
public class LogAnalyzerFactoryMethod
{
	public bool IsValidLogFileName(string fileName)
	{
		return this.GetManager().IsValid(fileName);
	}

	//使用虛擬的方法
	protected virtual IExtensionManager GetManager()
	{
		return new FileManage();
	}
}
```

測試方面的實作方式
```c#
//先定義一個虛設常式內容
public class FakeExtensionManager : IExtensionManager
{
	public bool WillBeVaild = false;
	public bool IsValid(string fileName)
	{
		return WillBeVaild;
	}
}

//建立一個測試類別然後繼承LogAnalyzerFactoryMethod，然後覆寫方法
public class TestLogAnzlyzer: LogAnalyzerFactoryMethod
{
	private static IExtensionManager customManager = null;
	public TestLogAnzlyzer(IExtensionManager mgr)
	{
		customManager = mgr;
	}
	protected override IExtensionManager GetManager()
	{//這裡使用覆寫方法來蓋掉原本的
		return customManager;
	}
}

[Test]
public void IsValidLogFileName_用截取與覆寫方法實作測試()
{
	FakeExtensionManager fakeManager = new FakeExtensionManager();
	fakeManager.WillBeVaild = true;

	//測試的時候就是new 測試的假物件來測試原本的方法 =>IsValidLogFileName
	TestLogAnzlyzer logAnzlyzer = new TestLogAnzlyzer(fakeManager);
	bool result = logAnzlyzer.IsValidLogFileName("short.ext");
	Assert.True(result);
}
```



### 截取與覆寫(不寫介面的變形)

首先同樣建立工廠模式，並且調整修改不用介面方法
```c#
public class LogAnalyzerFactoryMethod
{
	public bool IsValidLogFileName(string fileName)
	{
		return this.IsValid(fileName);
	}

	//使用虛擬的方法，並且不用介面，直寫用new，比對上面的工廠模式
	protected virtual bool IsValid(string fileName)
	{ //原本的物件實作直接在這裡生成
		FileManage fileManage = new FileManage();          
		return fileManage.IsValid(fileName);
	}
}
```

同樣在測試的程式建立覆寫的物件，調整寫法
```c#
//建立一個測試類別然後繼承LogAnalyzerFactoryMethod，然後覆寫方法
public class TestLogAnzlyzer: LogAnalyzerFactoryMethod
{
	public bool IsSupported;
	protected override bool IsValid(string fileName)
	{
		return IsSupported;
	}
}

[Test]
public void IsValidLogFileName_用截取與覆寫方法實作測試()
{  //這裡的測試就透過TestLogAnzlyzer測試方法回傳是否如預期
	TestLogAnzlyzer logAnzlyzer = new TestLogAnzlyzer();
	bool result = logAnzlyzer.IsValidLogFileName("short.ext");
	Assert.True(result);
}
```


上面的測試方式，其主要歸類成兩類，使用依賴注入方式，使用物件導向方式，要如何針對舊有的程式做測試就要判別了。