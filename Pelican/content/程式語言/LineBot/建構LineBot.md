---
title: 建構LineBot
date: 2021-10-07 20:09
aliases: 部落格 
tags: LineBot
category: Django
summary: 建立一個新的站臺，獨立於其他的
image: /images/default_preview_image.png
status: hidden
---


語法：

`conda create -n LineBot python=3.9.2`

`conda activate LineBot`

`pip install django`

`python manage.py startapp app_linebot`

`pip install django-allauth`

`pip install line-bot-sdk`

`python manage.py createsuperuser`