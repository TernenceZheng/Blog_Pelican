---
title: Chapter 2 第一個單元測試
date: 2022-07-14 19:13
modified: 2022-07-14 19:13
tags: 標籤
category: 後端程式
slug: 自定義URL標籤
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

### 基本定義與規範

對於測試名稱的規範：

1. UnitOfWorkName：被測試的方法、一組方法或一組類別
2. Scenario：測試進行的假設條件。如：『登入失敗』、『無效的使用者』
3. ExpectedBehavior：在測試清淨指定的假設條件下，對被測試方法行為的預期。

使用NUuit 框架的特性：

1. 特性 [TestFixture] 標記一個包含自動化NUnit測試到類別
2. 特性 [Test] 可以加在一個方法，標記這個方法說需要被執行的自動化測試
3. 特性 [TestCase("filewithgoodextension.SLF",true)] ,參數化測試，這個寫法可以替換寫死的參數，然後可以依 [TestCase(param1,param2,  .....)] 格式增加參數
4. 特性 [SetUp] 可以加在一個方法上，在任何一個方法執行之前會先執行此標記方法(建議不要用)
5. 特性 [TearDown]  在每個測試方法執行完畢之後被呼叫(建議不要用)

---

```c#

[TestFixture]
public class LogAnalyzerTests
{

	private LogAnalyzer logAnalyzer = null;
	[SetUp]
	public void SetUp()
	{ //這樣就可以每個測試方法都不用一直New了，直接引用這個
		logAnalyzer = new LogAnalyzer();
	}

	[Test]
	public void IsValidLogFileName_BadExtension_ReturnsFalse()
	{
		LogAnalyzer analyzer = new LogAnalyzer();

		bool result = analyzer.IsValidLogFileName("filewithbadextension.foo");

		Assert.False(result);
	}
	
	[TestCase("filewithgoodextension.SLF",true)]
	[TestCase("filewithgoodextension.slf",true)]
	[TestCase("filewithbadextension.foo",false)]
	public void IsValidLogFileName_VariousExtensions_ChecksThem(string file,
																 bool expected)
	{ //測試參數化，上面寫死的參數可以直接變成方法的參數物件
		LogAnalyzer analyzer = new LogAnalyzer();
	
		bool result = analyzer.IsValidLogFileName(file);
	
		Assert.AreEqual(expected, result);
	}
	
	[Test]
	public void IsValidLogFileName_EmptyFileName_Throws()
	{
		LogAnalyzer la = MakeAnalyzer();
		//Assert.Throws 預期要被測試的方法應該要丟出ArgumentException物件
		var ex = Assert.Throws<ArgumentException>(() => la.IsValidLogFileName(""));
		//簡化字串驗證輔助函數，ex.Message 應該要包含指定的字串，就是filename has ..
		StringAssert.Contains("filename has to be provided", ex.Message);
		//預期返回的字串應該要第二個參數定義Is.EqualTo 一樣
		Assert.That(ex.Message, Is.EqualTo("filename has to be providd"));
	}


	[TearDown]
	public void TearDown()
	{ //這裡是一個反模式，可以不用這樣做，但是是要顯示說TearDown特性在測試方法結束後會執行
		logAnalyzer = null;
	}
}
```

### 三個行為：

1. 準備（Arrange）：物件、建立物件、進行必要的設定
2. 操作（Act）物件
3. 驗證（Assert）某件事符合預期


### 使用NUnit執行第一個測試

Note：==注意==

單元測試的藝術，這本書中使用的NUnit GUI 在NUint3已經不存在，只存在NUnit2，所以要在Visual Studio中執行單元測試，必須安裝以下NuGet套件

-   NUnit：3.9
-   NUnit.Runners：3.7
-   NUnit3TestAdapter：3.9

上面兩個是必備的，NUnit3TestAdapter 這個套件是一個接口，可以在VS上面利用原本的Test Explorer視窗顯示測試項目。 [參考資料](https://ithelp.ithome.com.tw/articles/10190984)

![[開啟testExplorer視窗.jpg]]

### 驗證狀態的改變

常常在函式裡面，會有一些設定狀態 像是 `bool IsStage = false` 然後在程式後端或是結束，狀態的改變通常也是會影響邏輯的判斷，以下範例說明可以驗證狀態

```c#

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


[TestCase("badfile.foo", false)]
[TestCase("goodfile.slf", true)]
public void IsValidLogFileName_WhenCalled_ChangesWasLastFileNameValid(string file, bool expected)
{
	LogAnalyzer la = MakeAnalyzer();

	la.IsValidLogFileName(file);

	Assert.AreEqual(expected, la.WasLastFileNameValid);
}
```