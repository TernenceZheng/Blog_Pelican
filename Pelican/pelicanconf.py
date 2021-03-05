#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = 'Jarvis'
SITENAME = 'Jarvis Blog'
SITEURL = 'https://godtable.top'
SITELOGO = '/images/profile.png'
FAVICON = '/images/favicon.ico'

BROWSER_COLOR = "#66a29c"

ROBOTS = "index, follow"

GOOGLE_ADSENSE = {
    'ca_id': 'ca-pub-4119678220307625',    # Your AdSense ID
    'page_level_ads': True,          # Allow Page Level Ads (mobile)
    'ads': {
        'main_menu': '1234562',      # Banner before main menu (all pages)
        'index_bottom': '1234564',   # Banner before footer (index only)
    }
}



SITEMAP = {
    "format": "xml",
    "priorities": {
        "articles": 0.5,
        "indexes": 0.5,
        "pages": 0.5
    },
    "changefreqs": {
        "articles": "monthly",
        "indexes": "daily",
        "pages": "monthly"
    }
}

PATH = 'content'

TIMEZONE = 'Asia/Taipei'

DEFAULT_LANG = 'zh_TW'


# Social widget
# Add a link to your social media accounts
SOCIAL = (
    ('github', 'https://github.com/TernenceZheng'),
    ('envelope','mailto:andy711023@gmail.com'),
    ('linkedin','https://www.linkedin.com/in/jarvis-zheng-13a2b990'),
    ('twitter','https://twitter.com/Jarvis_Zheng'),
    ('facebook','https://www.facebook.com/andy.zheng.7967')
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

PLUGIN_PATHS = ['./pelican-plugins']

PLUGINS = ['sitemap', 'neighbors']

THEME = 'pelican-themes/Flex'

STATIC_PATHS = ['images', 'extra']

# Main Menu Items
MAIN_MENU = True
MENUITEMS = (('Archives', '/archives'),('Categories', '/categories'),('Tags', '/tags'))

# Code highlighting the theme
PYGMENTS_STYLE = 'friendly'

ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}/'
ARTICLE_SAVE_AS = ARTICLE_URL + 'index.html'

PAGE_URL = '{slug}/'
PAGE_SAVE_AS = PAGE_URL + 'index.html'

ARCHIVES_SAVE_AS = 'archives.html'
YEAR_ARCHIVE_SAVE_AS = '{date:%Y}/index.html'
MONTH_ARCHIVE_SAVE_AS = '{date:%Y}/{date:%m}/index.html'

# Feed generation is usually not desired when developing
FEED_DOMAIN = SITEURL
FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = 'feeds/%s.atom.xml'
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# HOME_HIDE_TAGS = True
FEED_USE_SUMMARY = True

