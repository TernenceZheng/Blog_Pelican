---
title: ASCII認識
date: 2021-11-22 18:27
modified: 2021-11-22 18:27
aliases: 部落格 
tags: ascii
category: 微軟筆記
slug: ascii
summary: 程式在使用XML的序列化時發生十六進位值(0x08)是無效的字
image: /images/default_preview_image.jpg
status: published
---

[TOC]

## 錯誤

發生錯誤訊息如下，程式在使用XML的序列化時發生這樣的錯誤

```C#
ErrorMsg: System.InvalidOperationException: 產生 XML 文件時發生錯誤。 ---> System.ArgumentException: '' (十六進位值 0x08) 是無效的字元。
```


查詢問題後發現文字內有特殊的符號 EX ： 

![[Pasted image 20211123110703.png]]


測試程式有特殊符號，會Exception在`xmlSerializer.Serialize`

```c
public ActionResult test1(string xmlData = "")
{
	Data oData = new Data();
	try
	{
		oData.inputText = "測試_測試測試測試測試測試";

		// 序列化為XML。
		System.Xml.Serialization.XmlSerializer xmlSerializer = new System.Xml.Serialization.XmlSerializer(oData.GetType());
		XmlWriterSettings xmlSettings = new XmlWriterSettings();

		xmlSettings.Encoding = Encoding.GetEncoding("Big5");
		xmlSettings.Indent = false;
		xmlSettings.OmitXmlDeclaration = false;

		using (StringWriter szWriter = new StringWriter())
		{
			using (XmlWriter xmlWriter = XmlWriter.Create(szWriter, xmlSettings))
			{
				xmlSerializer.Serialize(xmlWriter, oData);
			}

			xmlData = szWriter.ToString();
		}
	}
	catch (Exception e)
	{
		return Content(e.Message);
	}


	return Content(xmlData);
}
```

其中的特殊符號在ASCII表轉換成 16進制的 08，是算ASCII的控制字元，無法轉換。





## ASCII碼表

整理一下代碼的意義：

- 第0～32號及第127號(共34個)是控制字元或通訊專用字元
- 第33～126號(共94個)是字元
- 第48～57號為0～9十個阿拉伯數字
- 第65～90號為26個大寫英文字母
- 第97～122號為26個小寫英文字母，其餘為一些標點符號、運算符號





---

![[ASCII.gif]]



參考資料：

[ASCII碼介紹](http://kevin.hwai.edu.tw/~kevin/material/JAVA/Sample2016/ASCII.htm)


[認識中文字元碼](https://idv.sinica.edu.tw/bear/charcodes/Section02.htm)