#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = 'Richard'
SITENAME = 'Richard隨手筆記'

SITESUBTITLE = "紙上得來終覺淺，絕知此事要躬行"


SITEURL = 'https://richardrobot.xyz'
SITELOGO = '/images/head_icon.jpg'
FAVICON = '/images/favicon.ico'

BROWSER_COLOR = "#66A29C"

ROBOTS = "index, follow"

GOOGLE_ADSENSE = {
    'ca_id': 'ca-pub-4119678220307625',    # Your AdSense ID
    'page_level_ads': True,          # Allow Page Level Ads (mobile)
    'ads': {
        'article_bottom': '1234566', # Banner after article content (article only)
    }
}

GOOGLE_GLOBAL_SITE_TAG = 'G-Q3D0B7D25R' # Your Google Analytics 4 Property ID


DISQUS_SITENAME = "jarvissui-shou-bi-ji"
#DISQUS_SECRET_KEY = u'YOUR_SECRET_KEY'
#DISQUS_PUBLIC_KEY = u'YOUR_PUBLIC_KEY'

#pelican_common_system
# PELICAN_COMMENT_SYSTEM = True
# PELICAN_COMMENT_SYSTEM_DIR = 'comments'
# PELICAN_COMMENT_SYSTEM_IDENTICON_DATA = ('author','email')
# PELICAN_COMMENT_SYSTEM_IDENTICON_OUTPUT_PATH = 'images/identicon'

#ADD_THIS_ID = "ra-6041ec511f4e3460"

COPYRIGHT_YEAR = 2021

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

LINKS = (
    ("網路概論", "https://richardrobot.xyz"),
    ("程式語言", "https://richardrobot.xyz"),
    ("微軟筆記", "https://richardrobot.xyz"),
    ("Python筆記", "https://richardrobot.xyz/category/python.html"),
    ("雜記", "https://richardrobot.xyz")
)

PATH = 'content'

TIMEZONE = 'Asia/Taipei'

DEFAULT_LANG = 'zh_TW'

TYPOGRIFY = True

# Social widget
# Add a link to your social media accounts
SOCIAL = (
    ('linkedin','https://www.linkedin.com/in/jarvis-zheng-13a2b990'),
    ('github', 'https://github.com/TernenceZheng'),
    ('envelope','mailto:andy711023@gmail.com'),

)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

PLUGIN_PATHS = ["plugins","./plugins"]

PLUGINS = ['sitemap', 'neighbors','related_posts','representative_image','category_order','obsidian','render_math','more_categories','tipue_search']#,'tipue_search'

DIRECT_TEMPLATES = ['index', 'tags', 'search', 'categories', 'authors', 'archives']

CATEGORIES_ORDER_BY = 'alphabetic'

TAGS_ORDER_BY = 'alphabetic'

THEME = 'themes/Flex'

STATIC_PATHS = ['images', 'extra']

# Main Menu Items
MAIN_MENU = True
MENUITEMS = (
            ('文章時間軸', '/archives'),
            ('類別', '/categories'),
            ('標籤', '/tags')
        )

USE_FOLDER_AS_CATEGORY = True
# THEME_COLOR = 'light'
# THEME_COLOR_AUTO_DETECT_BROWSER_PREFERENCE = True
# THEME_COLOR_ENABLE_USER_OVERRIDE = True


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

PYGMENTS_STYLE  =  "paraiso-dark"


EXTRA_PATH_METADATA = {
    "extra/custom.css": {"path": "static/custom.css"},
}

CUSTOM_CSS = "static/custom.css"


RELATED_POSTS_MAX = 5

RELATED_POSTS_SKIP_SAME_CATEGORY = True

GITHUB_URL = 'https://github.com/TernenceZheng'