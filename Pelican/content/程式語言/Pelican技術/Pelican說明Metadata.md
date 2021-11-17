---
title: Pelican說明Metadata
date: 2021-09-30 14:21
modified: 2021-09-30 14:21
aliases: 部落格 
tags: Pelican
category: Python
slug: pelican-metadata
summary: 整理一個表格來方便查看Pelican的Metadata
image: /images/2021-10-01_PM4.46.58.pngg
status: published

---
![[2021-10-01_PM4.46.58.png]]

---
您還可以在模板中使用自己的元數據鍵（只要它們不與保留的元數據關鍵字衝突）。下表包含保留的元數據關鍵字列表：

| Metadata    | Description                                                     |
| :----------- :| --------------------------------------------------------------- |
| title       | Title of the article or page                                    |
| date        | Publication date (e.g., YYYY-MM-DD HH:SS)                       |
| modified    | Modification date (e.g., YYYY-MM-DD HH:SS)                      |
| tags        | Content tags, separated by commas                               |
| keywords    | Content keywords, separated by commas (HTML content only)       |
| category    | Content category (one only — not multiple)                      |
| slug        | Identifier used in URLs and translations                        |
| author      | Content author, when there is only one                          |
| authors     | Content authors, when there are multiple                        |
| summary     | Brief description of content for index pages                    |
| lang        | Content language ID (en, fr, etc.)                              |
| translation | If content is a translation of another (true or false)          |
| status      | Content status: draft, hidden, or published                     |
| template    | Name of template to use to generate content (without extension) |
| save_as     | Save content to this relative file path                         |
| url         | URL to use for this article/page                                |            |                                                                 |