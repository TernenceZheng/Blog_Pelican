---
title: 使用Bokeh產生技術圖表
date: 2021-11-03 11:05
aliases: 部落格 
tags: Python,Bokeh
category: Python
summary: 在Django上套用Bokeh產生技術圖表
image: /images/Pasted image 20211103110735.png
status: published
---

>參考資料：
>[Bokeh 探索頻道(2)~客製化技術圖表升級](https://www.finlab.tw/bokeh-stock-chart-with-technical-analysis/)
>[在 Django 上使用数据可视化利器 Bokeh](https://www.jianshu.com/p/8b4f17950777)

![[Pasted image 20211103110735.png]]


---

參考老師的Blog文章，內附的程式碼就可以無痛升級美麗圖表，但是我架設在Django上，需要調整一下來顯示在Django頁面。


在Django的View.py 上收先引用：
```
from bokeh.embed import components

from bokeh.resources import CDN
```

在程式加入Blog內的function來產生資料跟已經畫好的圖表，使用components，產生javascript與 html區塊，最後在render頁面帶入參數
![[Pasted image 20211103111259.png]]
![[Pasted image 20211103111728.png]]


在Django的templates頁面上，下圖是圖表的Html的Div區塊
![[Pasted image 20211103112220.png]]

---

下圖是在`script></script>` 區塊中，先引用bokeh的js，我直接下載到我的本機，避免版本到時候又變了壞掉，最後使用bokeh產生的的javascript語法。
![[Pasted image 20211103112331.png]]


就可以產生美美的圖了
![[Pasted image 20211103112719.png]]



