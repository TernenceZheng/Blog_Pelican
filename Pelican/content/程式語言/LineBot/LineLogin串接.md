---
title: LineLogin串接
date: 2021-10-08 08:38
aliases: 部落格 
tags: LineLoginAPI,Django
category: LineBot
summary: Django串街LineLogin API 流程簡單教學
image: /images/linelogin400錯誤情況.png
status: published
---


參考資料：

>[使用 Django Allauth 套件](https://jerrynest.io/django-allauth/)
>[[Django教學13]Django Allauth套件整合Google登入驗證實作教學](https://wreadit.com/@wwwlearncodewithmikecom/post/50134)


首先安裝django-allauth

`pip install django-allauth`

在Django站臺的Settings設定相關的參數設定

1. 在`INSTALLED_APPS` 裏面新增 allauth allauth.account ...以下的資料
2. 新增設定`AUTHENTICATION_BACKENDS`
3. 新增設定`SITE_ID` ,數值要比對Django資料表內的  django_site 的ID值
4. `SOCIALACCOUNT_PROVIDERS`這是要設定讀取使用者的資料
5. 在站臺的url.py設定路徑


![[settings設定參數1.png]]
![[settings設定參數二.png]]
```python
from django.contrib import admin

from django.urls import path,include

from django.conf.urls import url

urlpatterns = [
	path('admin/', admin.site.urls),

	path('accounts/', include('allauth.urls')),
]
```


---

以上設定完成要執行Django語法來產生資料表：

`python manage.py makemigrations`

`python manage.py migrate`

`python manage.py runserver`

---

以上就是Django的設定部分，另外LineLogin的設定需要注意的細節，因爲django-allauth已經將送LineLogin授權路徑參數自動拼裝好了，裏面有些規範需要注意

在送授權的部分，django-allauth定義的callbackURL已經規範，如下圖
![[djangoallauth.png]]
[https://django-allauth.readthedocs.io/en/latest/providers.html#line](https://django-allauth.readthedocs.io/en/latest/providers.html#line)

上面的 Callback URL 必須與LINE Login 內的設定相同
![[lineloginapi的設定.png]]

---
另外剩下的就是要設定KEY與ClientID:


去內部後臺設定LINE SecrtKEY
![[linelogin內部後臺設定.png]]

回到頁面去，雖然沒有寫什麼頁面，可是 django-allauth已經內建了許多頁面可以直接查看
![[linelogin預設路徑頁面.png]]
![[linelogin預設登入畫面.png]]


以上就是完成初步的串街，內容套版需要再詳細實做與修改，另外在串街流程中發生的錯誤在導向到LineLogin畫面時出現 400 錯誤：
![[linelogin400錯誤情況.png]]


---
這個問題的發生原因先查看了LineLogin的文件說明

## 要求授權
---

為進行使用者認證，並為 app 要求權限，請透過所需的 query parameter，如下面例子所示將使用者重新導向授權 URL。
```c
https://access.line.me/oauth2/v2.1/authorize?
response_type=code
&client_id=1234567890
&redirect_uri=https%3A%2F%2Fexample.com%2Fauth
&state=12345abcde
&scope=profile%20openid
&nonce=09876xyz
```




![[linelogin串街參數.png]]

[URL 的查詢屬性](https://developers.line.biz/zh-hant/docs/line-login/integrate-line-login/#making-an-authorization-request)



我的參數：
```
https://access.line.me/oauth2/v2.1/authorize?

client_id=U2c2bde960c5d7723082f2b9a491f51e1
&redirect_uri=http://linebot.richardrobot.xyz/accounts/line/login/callback/
&scope=
&response_type=code
&state=BBwcp2EEdqnJ
```




錯誤問題1：client_id不對
client_id ：LINE Login Channel 的 Channel ID
錯誤問題2：scope沒有值
scope：向用戶請求授予權限，也就是要求取得使用者的資料

修正：
1.在admin後臺修改設定
2.在settings.py新增如下參數：
![[linelogin新增參數.png]]