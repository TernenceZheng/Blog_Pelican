var tipuesearch = {"pages":[{"title":"本益比","text":"$$ 本益比 = 股價 / 每股盈餘(EPS) $$ 以投資的角度來看，股價則是投資1股所需要的成本(購買成本)，而每股獲利意思是投資1股所得到的獲利，因此本益比就是投資該股票1股的成本與獲利的比值，即為報酬率的倒數。在合理本益比接近的條件下，較低的本益比通常代表著投資的潛在報酬較大。 心得：本益比的高低是相對的，主要要察覺這家公司的獲利能力與EPS再來對比本益比是否過高 參考資料： 財報狗 深入理解本益比","tags":"投資學習","url":"https://richardrobot.xyz/2021/10/ben-yi-bi/","loc":"https://richardrobot.xyz/2021/10/ben-yi-bi/"},{"title":"安裝Let's Encrypt電子證書","text":"參考資料： 安裝Let's Encrypt電子證書 如何在NGINX+DJANGO平台設置SSL連線 在本機驗證安裝Let's Encrypt brew install certbot brew ls certbot 然後在Mac執行 certbot --config-dir ~/letsencrypt/etc --work-dir ~/letsencrypt/lib --logs-dir ~/letsencrypt/log certonly --manual 接下來會有三個步驟要輸入： 1.Email 2.domain 3.會要你在規定的路徑上產生讀取文檔： Saving debug log to / Users / jarvis . zheng / letsencrypt / log / letsencrypt . log Please enter the domain name ( s ) you would like on your certificate ( comma and / or space separated ) ( Enter 'c' to cancel ): linebot . richardrobot . xyz Requesting a certificate for linebot . richardrobot . xyz - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Create a file containing just this data : YYUCwTYHewbZ0vVcobFBA8kmL - xs - 8 AQAj5aH7tD3HI . mFCPG4KMVD6yTJlxRiPv1IXrYQENjpRSb9DJyynjW5I And make it available on your web server at this URL : http : // linebot . richardrobot . xyz /. well - known / acme - challenge / YYUCwTYHewbZ0vVcobFBA8kmL - xs - 8 AQAj5aH7tD3HI - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Press Enter to Continue 從上面的指示來看 要在指定的網址： http://linebot.richardrobot.xyz/.well-known/acme-challenge/YYUCwTYHewbZ0vVcobFBA8kmL-xs-8AQAj5aH7tD3HI 產生可讀取字串： YYUCwTYHewbZ0vVcobFBA8kmL-xs-8AQAj5aH7tD3HI.mFCPG4KMVD6yTJlxRiPv1IXrYQENjpRSb9DJyynjW5I 在Django的做法如下： 在 url.py 設定網址： ![[url設定的圖片.png]] 檔案放置的地方： ![[檔案放置的地方.png]] Views.py 程式讀取的方式： ![[views程式讀取的方式.png]] 驗證成功存放的路徑： ![[驗證成功的畫面.png]] nginx 新增的配置 第一個 server { server_name linebot . richardrobot . xyz ; listen 80 ; return 301 https : //linebot.richardrobot.xyz$request_uri; } 第二個 server { listen 443 ; server_name linebot . richardrobot . xyz ; ssl on ; # <- ssl_certificate / Users / jarvis . zheng / LineBot / ssl / cert . pem ; # <- ssl_certificate / Users / jarvis . zheng / LineBot / ssl / chain . pem ; # <- ssl_certificate_key / Users / jarvis . zheng / LineBot / ssl / privkey . pem ; # <- location / { #第三個 proxy_set_header X - Forwarded - Proto https ; # <- 這個很重要，記得加入 } } 沒有加最後的分號 ; (LineBot) jarvis.zheng@zhengruichangdeMac-mini LineBot % sudo nginx -s reload Password: nginx: [warn] the \"ssl\" directive is deprecated, use the \"listen ... ssl\" directive instead in /opt/homebrew/etc/nginx/sites-enabled/LineBot:5 nginx: [emerg] no \"ssl_certificate_key\" is defined for certificate \"/Users/jarvis.zheng/LineBot/ssl/chain.pem\" and the \"ssl\" directive in /opt/homebrew/etc/nginx/sites-enabled/LineBot:5","tags":"Mac","url":"https://richardrobot.xyz/2021/10/an-zhuang-lets-encryptdian-zi-zheng-shu/","loc":"https://richardrobot.xyz/2021/10/an-zhuang-lets-encryptdian-zi-zheng-shu/"},{"title":"LineLogin串接","text":"參考資料： 使用 Django Allauth 套件 [Django教學13]Django Allauth套件整合Google登入驗證實作教學 首先安裝django-allauth pip install django-allauth 在Django站臺的Settings設定相關的參數設定 在 INSTALLED_APPS 裏面新增 allauth allauth.account ...以下的資料 新增設定 AUTHENTICATION_BACKENDS 新增設定 SITE_ID ,數值要比對Django資料表內的 django_site 的ID值 SOCIALACCOUNT_PROVIDERS 這是要設定讀取使用者的資料 在站臺的url.py設定路徑 ![[settings設定參數1.png]] ![[settings設定參數二.png]] from django.contrib import admin from django.urls import path , include from django.conf.urls import url urlpatterns = [ path ( 'admin/' , admin . site . urls ), path ( 'accounts/' , include ( 'allauth.urls' )), ] 以上設定完成要執行Django語法來產生資料表： python manage.py makemigrations python manage.py migrate python manage.py runserver 以上就是Django的設定部分，另外LineLogin的設定需要注意的細節，因爲django-allauth已經將送LineLogin授權路徑參數自動拼裝好了，裏面有些規範需要注意 在送授權的部分，django-allauth定義的callbackURL已經規範，如下圖 ![[djangoallauth.png]] https://django-allauth.readthedocs.io/en/latest/providers.html#line 上面的 Callback URL 必須與LINE Login 內的設定相同 ![[lineloginapi的設定.png]] 另外剩下的就是要設定KEY與ClientID: 去內部後臺設定LINE SecrtKEY ![[linelogin內部後臺設定.png]] 回到頁面去，雖然沒有寫什麼頁面，可是 django-allauth已經內建了許多頁面可以直接查看 ![[linelogin預設路徑頁面.png]] ![[linelogin預設登入畫面.png]] 以上就是完成初步的串街，內容套版需要再詳細實做與修改，另外在串街流程中發生的錯誤在導向到LineLogin畫面時出現 400 錯誤： ![[linelogin400錯誤情況.png]] 這個問題的發生原因先查看了LineLogin的文件說明 要求授權 為進行使用者認證，並為 app 要求權限，請透過所需的 query parameter，如下面例子所示將使用者重新導向授權 URL。 https : //access.line.me/oauth2/v2.1/authorize? response_type = code & client_id = 1234567890 & redirect_uri = https % 3 A % 2F % 2F example . com % 2F auth & state = 12345 abcde & scope = profile % 20 openid & nonce = 09876 xyz ![[linelogin串街參數.png]] URL 的查詢屬性 我的參數： https : // access . line . me / oauth2 / v2 . 1 / authorize ? client_id = U2c2bde960c5d7723082f2b9a491f51e1 & redirect_uri = http : // linebot . richardrobot . xyz / accounts / line / login / callback / & scope = & response_type = code & state = BBwcp2EEdqnJ 錯誤問題1：client_id不對 client_id ：LINE Login Channel 的 Channel ID 錯誤問題2：scope沒有值 scope：向用戶請求授予權限，也就是要求取得使用者的資料 修正： 1.在admin後臺修改設定 2.在settings.py新增如下參數： ![[linelogin新增參數.png]]","tags":"LineBot","url":"https://richardrobot.xyz/2021/10/lineloginchuan-jie/","loc":"https://richardrobot.xyz/2021/10/lineloginchuan-jie/"},{"title":"Supervisor","text":"在 Linux上可以使用systemctl 這個服務來開機就能自動啓動寫好的網站服務，等等其他的，但是在Mac上卻無法，使用supervisor還有Web畫面可以查看 ![[Supervisor服務畫面.png]] 透過brew來安裝： brew install supervisor 設定檔路徑： 由於是Mac M1 的系統，homebrew已經將設定的路徑放在 /opt/homebrew/etc 如下圖，開啓 supervisor.conf 檔案 ![[supervisor的ini設定畫面.png]] 可以註解前面的 ; 符號來啓用設定 : 可以開啓 Web的畫面 啓用 登入帳號密碼 [ inet_http_server ] ; inet ( TCP ) server disabled by default port = 127.0 . 0.1 : 9001 ; ip_address : port specifier , * : port for all iface username = test ; default is no username ( open server ) password = 123 ; default is no password ( open server ) 在最後加入客製化的設定檔： 加入下面的設定，可以在/Process/ 資料夾底下設定需要的Service檔，並且用 .ini 爲副檔名 [ include ] files = / Users / jarvis . zheng / Process /* . ini 已django網站爲例： command 程序啓動命令：使用gunicorn來當WebServer，使用參數檔 gunicorn.conf.py [ program : django_server ] command =/ Users / jarvis . zheng / miniforge3 / envs / finlab / bin / gunicorn - c gunicorn . conf . py StockSecretary . wsgi process_name =% ( program_name ) s directory =/ Users / jarvis . zheng / StockWeb / 啓動服務： sudo brew services start supervisor 參考資料： SUPERVISOR 介紹與使用方式 Jupyter Notebook and Nginx Setup Mac OSX 開機啟動應用 (supervisor) Python Tricks —— 使用 Supervisor 控制 Linux 進程","tags":"Mac","url":"https://richardrobot.xyz/2021/10/supervisor/","loc":"https://richardrobot.xyz/2021/10/supervisor/"},{"title":"Blog發佈到netlify","text":"![[Blog發佈到netlify.png]] Netlify 基本的說明： netlify 超佛心的靜態網站hosting服務 - 不只做hosting還有更多 由 [[部落格建置]] 與 [[部落格建置-套件]] 兩個篇章的設定，已經把Pelican 可以在本機做測試查看了，接下來就要建置部署在網路上，首先就是要買個網域，看來看去還是 Namecheap 最便宜，詳細買過程可以參考： Namecheap 網址註冊購買 DNS 設定教學 網域綁定主機 https://richardrobot.xyz 一次買兩年才 NT$ 233 ，還蠻便宜，反正只是做Blog隨手記錄 買好了網址接下來就是要把GitHub與Netlify綁定在一起參考流程如下Blog： Pelican static site on Netlify 需要注意的是，Blog文章裏面的執行語法 Build command pelican content -s publishconf.py 這個設定了反而不能，會出現錯誤，我的設定 ![[Netlify設定發佈建置.png]] 另外需要把Netlify提供的Name Server 設定到 Namecheap 的DNS設定 Netlify的設定畫面： ![[Netlify設定Domain的畫面.png]] 然後對應到：NAMESERVERS 選CustomDNS ![[Namecheap設定的畫面.png]]","tags":"Pelican","url":"https://richardrobot.xyz/2021/10/blogfa-bu-dao-netlify/","loc":"https://richardrobot.xyz/2021/10/blogfa-bu-dao-netlify/"},{"title":"Mac重新開機SSH Token失效","text":"![[Sourcetree出現Permissiondenied.png]] 已經加入Github的SSH Token了，再次的PUSH還是會產生 [[SourceTree權限問題]] 查詢問題之後 參考 操作提示 Permission denied, please try again ，裏面的說明： ssh-add 這個命令不是用來永久性的記住你所使用的私鑰的。實際上，它的作用只是把你指定的私鑰添加到 ssh-agent 所管理的一個 session 當中。而 ssh-agent 是一個用於存儲私鑰的臨時性的 session 服務，所以每次重啓都會失效，都需要再次執行命令。 或是設定 Mac 重啟後自動ssh-add 私鑰","tags":"Git","url":"https://richardrobot.xyz/2021/10/maczhong-xin-kai-ji-ssh-tokenshi-xiao/","loc":"https://richardrobot.xyz/2021/10/maczhong-xin-kai-ji-ssh-tokenshi-xiao/"},{"title":"副檔名command無法執行","text":"寫好了可以執行的發佈語法，點擊執行卻出現這個 ![[副檔名command無法執行.png]] 需要另外給予權限： chmod +x batch_notes_script.command","tags":"Mac","url":"https://richardrobot.xyz/2021/10/fu-dang-ming-commandwu-fa-zhi-xing/","loc":"https://richardrobot.xyz/2021/10/fu-dang-ming-commandwu-fa-zhi-xing/"},{"title":"SourceTree權限問題","text":"Sourcetree出現Permission denied (publickey) ![[Sourcetree出現Permissiondenied.png]] 這個問題的產生可能是程式問題，已經透過SourceTree的UI界面功能去產生SSH的KEY 做法來源[[Mac 上改變 Git 認證模式]] ，也已經至GitHub去註冊KEY ![[Pasted image 20210929180241.png]] Google以後參考資料部落格： MacOS更新後使用Sourcetree出現Permission denied (publickey) 就去找出當初用GitHub產生的PrivateKey在哪如下圖左紅框，就執行一下以下語法就可以了 ![[Pasted image 20210929180643.png]] ==語法：== 執行新增 ssh - add / Users / jarvis . zheng /. ssh / jarvis . zheng - GitHub 檢查語法 ssh - T git @github . com","tags":"Git","url":"https://richardrobot.xyz/2021/09/sourcetreequan-xian-wen-ti/","loc":"https://richardrobot.xyz/2021/09/sourcetreequan-xian-wen-ti/"},{"title":"部落格建置-套件","text":"要使用Pelican的外掛套件，目前套件的來源有兩種： 在命名空間之下的Git， 新版pelican-plugins 舊版的套件集合的Git， 舊版pelican-plugins 導入套件的方式有兩種： 如果您的插件不在可導入路徑中，您可以通過PLUGIN_PATHS設置指定路徑列表。如以下示例所示，PLUGIN_PATHS列表中的路徑可以是相對於設置文件的絕對路徑或相對路徑： ![[Pasted image 20210929155953.png]] 若是沒有依照設定的套件名稱放置程式會出現錯誤訊息： ( Pelican ) jarvis . zheng @ zhengruichangdeMac - mini Pelican % pelican content WARNING : % s usage in CATEGORY_FEED_ATOM is deprecated , use { slug } instead . ERROR : Cannot load plugin `related_posts` | Cannot import plugin `related_posts` Done : Processed 7 articles , 0 drafts , 0 pages , 0 hidden pages and 0 draft pages in 0.20 seconds . 總結 套件的使用，在命名空間下的，要執行安裝語法，會直接搜尋環境下的套件程式，若是用舊版的，要去舊版git 去clone下來，並且對照名稱放程式資料夾在/pelican-plugins","tags":"Python","url":"https://richardrobot.xyz/2021/09/bu-luo-ge-jian-zhi-tao-jian/","loc":"https://richardrobot.xyz/2021/09/bu-luo-ge-jian-zhi-tao-jian/"},{"title":"部落格建置","text":"用Pelican套件建置部落格在GitHub Pages 上，首先需要安裝Pelican的環境 建立python的虛擬環境 conda create -n Pelican 啓動虛擬環境 conda activate Pelican CD 到新開的資料夾， 當初已經在GitHub上建立好了Repository，所以就在本機建立資料夾然後Clone，在Pelican資料夾下，需要安裝pelican的相關套件，需要創建一個requirements.txt文件 touch requirements.txt 接下來安裝所有套件： pip install -r requirements.txt 若是還沒建立好預設開始環境需要執行以下語法，Pelican會建立基本的程式與資料夾，若是執行以下語法會需要回答一些預設環境的設定值 pelican-quickstart 資料夾架構如下 ![[Pasted image 20210929144934.png]] 每個文件的用途： content/ - 存儲所有網站內容的目錄 task.py - 幫助我們自動化網站生成和發布的腳本 output/ - 存儲生成的靜態網站的 HTML 文件的目錄 pelicanconf.py - 包含網站所有配置的文件 生成網站 此語法會在 output/ 目錄產生所有html 的頁面 pelican content 此語法會產生一個臨時的站臺 127.0.0.1:8000 可以預覽頁面 pelican --listen 查看外掛套件清單： pelican-plugins","tags":"Python","url":"https://richardrobot.xyz/2021/09/bu-luo-ge-jian-zhi/","loc":"https://richardrobot.xyz/2021/09/bu-luo-ge-jian-zhi/"},{"title":"Markdown-插入圖片","text":"! [ alt text ]( https : //github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png \"這個文字會滑鼠滑上會出現POPup\") ! [ 這裡是要寫圖片說明 ]( http : //這個是要填圖片路徑.jpg) 使用代碼重複利用相同圖片方式： 最近在看的新書： ! [ Google教我的101個工作最佳化 ][ google101 ] 最近在看的新書： ! [ Google教我的101個工作最佳化 ][ google101 ] 最近在看的新書： ! [ Google教我的101個工作最佳化 ][ google101 ] [ google101 ] : https : //im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/058/32/0010583256.jpg&v=51751f70&w=348&h=348 \"Google教我的101個工作最佳化\" 實例展示： 最近在看的新書： 最近在看的新書： 最近在看的新書：","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-cha-ru-tu-pian/","loc":"https://richardrobot.xyz/2021/09/markdown-cha-ru-tu-pian/"},{"title":"Markdown-程式代碼或語法高亮","text":"直接展示：每個三個` 符號 後面直接寫程式語言名稱如：sql C# java python 等等的 var s = \"JavaScript syntax highlighting\" ; alert ( s ); s = \"Python syntax highlighting\" print s No language indicated, so no syntax highlighting. But let's throw in a <b> tag </b> .","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-cheng-shi-dai-ma-huo-yu-fa-gao-liang/","loc":"https://richardrobot.xyz/2021/09/markdown-cheng-shi-dai-ma-huo-yu-fa-gao-liang/"},{"title":"Markdown-連結設定","text":"< http : // markdown . tw > [ 這是一個帶有標題的行內連結 ]( https : // www . google . com \"Google's Homepage\" ) [ 中文版的 Markdown語法說明 ]( http : // markdown . tw ) 使用代碼去重複使用： [ 來看看這個網址 ][ 我是網址 ] [ 去看看這個網址 ][ 我是網址 ] [ 檢查這個網址 ][ 我是網址 ] [ 我是網址 ]: https : // www . google . com . tw 實例展示： http://markdown.tw 這是一個帶有標題的行內連結 中文版的Markdown語法說明 來看看這個網址 去看看這個網址 檢查這個網址","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-lian-jie-she-ding/","loc":"https://richardrobot.xyz/2021/09/markdown-lian-jie-she-ding/"},{"title":"Markdown-其他的符號","text":"[ ] 代辦事項 [x] 已完成事項 跳脫字元 加上反引號 \\","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-qi-ta-de-fu-hao/","loc":"https://richardrobot.xyz/2021/09/markdown-qi-ta-de-fu-hao/"},{"title":"Markdown-水平分隔線","text":"語法： ---短橫線（Hyphens） *** 半形星號（ Asterisks ） ___下底線 （ Underscores ）","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-shui-ping-fen-ge-xian/","loc":"https://richardrobot.xyz/2021/09/markdown-shui-ping-fen-ge-xian/"},{"title":"Markdown-文字變化","text":"* asterisks * // 斜體 ** asterisks ** // 粗體 == 螢光強調 == 實際展示： 我是斜體字 我是粗體字測試 ==螢光強調==","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-wen-zi-bian-hua/","loc":"https://richardrobot.xyz/2021/09/markdown-wen-zi-bian-hua/"},{"title":"Markdown-項目清單","text":"* 無序列表一 //可以使用星號建立無序清單 - 無序列表二 //或是短橫線（負號） + 無序列表三 //使用半形加號也可以 1. 有序列表一 2. 有序列表二 3. 有序列表三 實際展示： 無序列表一 無序列表二 無序列表三 一樣的無序列表用負號 一樣的無序列表用負號 一樣的無序列表用負號 一樣的無序列表用加號 一樣的無序列表用加號 一樣的無序列表用加號 有序號列表一 有序號列表二 有序號列表三","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-xiang-mu-qing-dan/","loc":"https://richardrobot.xyz/2021/09/markdown-xiang-mu-qing-dan/"},{"title":"Markdown-語法學習","text":"Markdown 語言在 2004 由約翰·格魯伯（英語：John Gruber）創建。Markdown 是一種輕量級標記語言，它允許人們使用易讀易寫的純文本格式編寫文檔。 Markdown 是一種簡易的標記語言，能讓我們在最短的時間裡製作一份易讀易懂的文字檔案，當有需要輸出到網站時，也能使用許多線上轉換網站或軟體，將Markdown格式的內容轉換成HTML格式，瞬間由文字格式變身美觀的網頁格式。 [[分段標題]] 以一到六個井字表示標題一至標題六 （<h1>到<h6>） ，亦即井號越少顯示的字體越大。 [[項目清單]] 列舉式的項目清單是很常用的表達語法，在HTML網頁的定義裡主要有兩種：有順序編號的 （<ol>+<li>） 和沒有順序編號的 （<ul>+<li>） ，Markdown的表示方法很簡單: 1.有順序編號的清單：每列開頭是「數字.一個空白」 2.沒有順序編號的清單：就是以項目符號開頭的清單，以「*一個空白」或「減號一個空白」來表示 [[文字變化]] 一段文字裡需要特別注意或要有不同變化時 [[連結設定]] 快速超連結：只要把超連結用「<」、「>」括住即可，被括住的網址會形成可點擊的超連結 完整超連結：上面快速超連結直接用網址來顯示，我們可以用 [顯示文字](http://jdev.tw/blog/3504/test) 的語法在網頁顯示指定的文字與其使用的超連結。Markdown插入超連結的語法很簡單，但無法指示開啟在新視窗或新分頁。 [[插入圖片]] 比照超連結的寫法再於開頭加上 半形驚嘆號 就可以了 語法： ![顯示文字](圖片網址) [[程式代碼或語法高亮]] 在一般文字中直接用 這個樣子 ，若是要包整段的要三個 ``` 符號前後包起來 引言 用一個 小於符號 > 放在最前面就可以外面有框線包起來的樣子 行內HTML 因為 Markdown 本來就預設要轉換成 HTML 網頁格式，所以你當然可以直接寫入正確的 HTML 代碼 <H1>ttt</H1> [[水平分隔線]] 三個或三個以上的符號，必須在獨立的一行，前後不能有其他文字。 ---短橫線（Hyphens） ***半形星號（Asterisks） ___下底線（Underscores） [[其他的符號]] 剩下少用的東西有 代辦事項 列表縮進 跳脫字元","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-yu-fa-xue-xi/","loc":"https://richardrobot.xyz/2021/09/markdown-yu-fa-xue-xi/"},{"title":"Markdown-分段標題","text":"標題 ```'語法顯示' H1 H2 H3 H4 H5 H6 最常使用的 H1 與 H2 標題，還有更鮮明的另一種寫法： Alt-H1 Alt-H2 ``` 實際展示： 標題 標題 鮮明的標題 鮮明的標題","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-fen-duan-biao-ti/","loc":"https://richardrobot.xyz/2021/09/markdown-fen-duan-biao-ti/"},{"title":"Obsidian 使用 Git 跨平台同步","text":"第一步 先在Windows本機的建立一個資料夾，是拿來開啟Obsidian的Vault ![[Pasted image 20210914152609.png]] 像上面的資料路徑我新開了一個 ObsidianNote資料夾，然後Obisdian設定這個資料夾就會有一些設定檔 ![[Pasted image 20210914152831.png]] 第二步 在GitHub建立一個repository，然後取名同樣的名稱ObsidianNote 第三步 開啟CMD 然後CD至剛剛的資料夾，接下來就是執行GitHub上面的初始化語法 git init git commit -m \"first commit\" git remote add origin https://github.com/TernenceZheng/ObsidianNote.git ![[Pasted image 20210914153508.png]] 第四步 安裝第三方外掛套件 Obsidian Git ![[Pasted image 20210914161351.png]] 安裝及啟用後，左方將出現 Obsidian Git 的設定，我有以下的建議： 將 Vault 備份時間改為 5 分鐘 (Backup Interval: 5) 每次打開軟件也從 Github Pull 所有的變更 (Pull updates on startup: ON) Commit Message 增加電腦名稱以便識別 (Commit message: 開首加電腦名稱） 以及最重要的關掉 Disable Push（Disable Push: OFF)，才會自動把所有 Commit 推送到 Github 上，讓其他裝置可以同步。 參考鏈接： Obsidian上手及使用Git跨平台同步 另外的手機版本同步參考： [移動] 設置 iOS 與移動應用程序基於 git 的同步（使用工作副本） Git","tags":"Git","url":"https://richardrobot.xyz/2021/09/obsidian-shi-yong-git-kua-ping-tai-tong-bu/","loc":"https://richardrobot.xyz/2021/09/obsidian-shi-yong-git-kua-ping-tai-tong-bu/"},{"title":"Mac 上改變 Git 認證模式","text":"2021/09/14 今天在mac 上面在 git clone https://github.com/TernenceZheng/ObsidianNote.git ![[Mac上改變Git認證模式.png]] 結果我的mac顯示無法用使用者帳號密碼去登入驗證 'Mac上面錯誤訊息' Cloning into 'ObsidianNote'... Username for 'https://github.com': andy711023@gmail.com Password for 'https://andy711023@gmail.com@github.com': remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead. remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information. fatal: Authentication failed for 'https://github.com/TernenceZheng/ObsidianNote.git/' 看了文章原來要去用GitHub的Token驗證方式才可以，舊的帳號密碼已經不行了，下面是Github產生的Token ![[Pasted image 20210914164331.png]] 把拿到的Token註冊在MacOS的鑰匙圈如下圖 ![[Pic2021-09-144.54.10.png]] 就完成Token的驗證註冊，然後git clone就OK了 參考資料： Mac 上改變 Git 認證模式 相關主題： [[Obsidian 使用 Git 跨平台同步]] [[SourceTree權限問題]]","tags":"Git","url":"https://richardrobot.xyz/2021/09/mac-shang-gai-bian-git-ren-zheng-mo-shi/","loc":"https://richardrobot.xyz/2021/09/mac-shang-gai-bian-git-ren-zheng-mo-shi/"},{"title":"Obsidian","text":"參考網址： 筆記類別：#心得 主題：[[Obsidian]] 00:00 開場白 01:13 要點一：捕捉生活中的靈感與想法 03:20 要點二：用自己的話寫筆記 04:19 要點三：引用內容要標注出處 05:02 要點四：建立筆記之間的連結 06:38 要點五：每則筆記必須簡明扼要 07:26 筆記關聯圖 08:25 Obsidian 的外掛簡介","tags":"Obsidian","url":"https://richardrobot.xyz/2021/09/obsidian/","loc":"https://richardrobot.xyz/2021/09/obsidian/"},{"title":"認識Metadata","text":"暸解使用[[Obsidian]]的Metadata架構 一般在做筆記的時候，常常要回顧一下當初寫的內容，然後就開始尋找，但是卻沒有有效的尋找，所以需要一個索引來去管理筆記，常常會出現的問題點： 標題難辨識 — 很難從標題知道筆記的確切內容 沒有脈絡 — 很難記起當初為何會寫下這些內容 沒有狀態—很難重新利用筆記內容 上方提到的 3 個問題，根本原因是「沒有一套有效的筆記內容紀錄系統」。這個系統並不是說筆記該如何分類、該如何使用標籤…等，而是描述「這份筆記本身」的內容。 這些內容如果用專業的術語講叫做「Metadata」，中文也翻譯成「 元資料 」，也就是資料的資料。 範例： title:這個是標題 date:2021-09-15_Thu 13:20 aliases:[這個是別名] Status：筆記狀態 Source Type：筆記資訊來源 Source URL：[筆記資訊來源連結] Author：[@資訊作者] Note Type：筆記類型 Topics：[[筆記主題]],[[練習]] Parent Link：[[父連結]] ![[1_aSEikk5zLaM8RfYMLyJETQ.png]] 參考資料： 了解 Obsidian 的 Metadata，建立一套可持續迭代的筆記系統 使用「漸進式總結」來寫筆記，逐步萃取出高含金量的知識內容","tags":"Obsidian","url":"https://richardrobot.xyz/2021/09/ren-shi-metadata/","loc":"https://richardrobot.xyz/2021/09/ren-shi-metadata/"},{"title":"VS 常用內建快速鍵","text":"![[Pasted image 20210917172329.png]] 環境 程式碼編輯器分頁切換 ：Ctrl+TAB 存檔：Ctrl + S 執行(debug)：F5 ==執行(non debug)==： Ctrl + F5 全部儲存：Ctrl + Shift + S 單步執行：F11 (F10) 切換斷點：F9 ==啟用/停用斷點==： Ctrl + F9 ==刪除所有斷點==： Ctrl + Shift + F9 編輯 ==註解選取範圍==： Ctrl+K,C ==取消註解選取範圍==： Ctrl+K,U ==自動縮排==： 選取範圍後，Alt + F8 選取文字改小寫：Ctrl + U 選取文字改大寫：Ctrl + Shift + U ==呼叫出類別成員==： Ctrl + J (編到一半時 tips 突然不見很好用) 收攏原始碼：Ctrl + M, O 展開原始碼：Ctrl + M, L ==刪除目前這行==： Ctrl + Shift + L 轉至定義： F12 檔案最前面：Shift + Home 檔案最後面：Shift + End ==選到最前面==：Ctrl + Shift + Home ==選到最後面==：Ctrl + Shift + End 檢查括號匹配：Ctrl + ] 跳至行號：Ctrl + G","tags":"VisualStudio","url":"https://richardrobot.xyz/2016/03/vs-chang-yong-nei-jian-kuai-su-jian/","loc":"https://richardrobot.xyz/2016/03/vs-chang-yong-nei-jian-kuai-su-jian/"}]};