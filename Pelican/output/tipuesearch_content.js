var tipuesearch = {"pages":[{"title":"Python爬蟲程式錯誤","text":"錯誤發生的Traceback Traceback ( most recent call last ): File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py\" , line 438 , in _error_catcher yield File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py\" , line 767 , in read_chunked chunk = self . _handle_chunk ( amt ) File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py\" , line 711 , in _handle_chunk value = self . _fp . _safe_read ( amt ) File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/http/client.py\" , line 625 , in _safe_read chunk = self . fp . read ( min ( amt , MAXAMOUNT )) File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/socket.py\" , line 704 , in readinto return self . _sock . recv_into ( b ) File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/ssl.py\" , line 1241 , in recv_into return self . read ( nbytes , buffer ) File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/ssl.py\" , line 1099 , in read return self . _sslobj . read ( len , buffer ) ConnectionResetError : [ Errno 54 ] Connection reset by peer During handling of the above exception , another exception occurred : Traceback ( most recent call last ): File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/models.py\" , line 753 , in generate for chunk in self . raw . stream ( chunk_size , decode_content = True ): File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py\" , line 572 , in stream for line in self . read_chunked ( amt , decode_content = decode_content ): File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py\" , line 793 , in read_chunked self . _original_response . close () File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/contextlib.py\" , line 137 , in __exit__ self . gen . throw ( typ , value , traceback ) File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py\" , line 455 , in _error_catcher raise ProtocolError ( \"Connection broken: %r \" % e , e ) urllib3 . exceptions . ProtocolError : ( \"Connection broken: ConnectionResetError(54, 'Connection reset by peer')\" , ConnectionResetError ( 54 , 'Connection reset by peer' )) During handling of the above exception , another exception occurred : Traceback ( most recent call last ): File \"/Users/jarvis.zheng/FileSource/batch_stock.py\" , line 60 , in < module > auto_update ( 'otc_cap_reduction' , crawl_otc_cap_reduction ) File \"/Users/jarvis.zheng/FileSource/batch_stock.py\" , line 47 , in auto_update df = crawl_function () File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/finlab/crawlers/api.py\" , line 454 , in crawl_otc_cap_reduction res4 = requests_get ( urs_crawl_otc_cap_reduction ) File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/finlab/crawlers/helper.py\" , line 363 , in requests_get return ses . get ( * args1 , timeout = 10 , ** args2 ) File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/sessions.py\" , line 555 , in get return self . request ( 'GET' , url , ** kwargs ) File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/sessions.py\" , line 542 , in request resp = self . send ( prep , ** send_kwargs ) File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/sessions.py\" , line 697 , in send r . content File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/models.py\" , line 831 , in content self . _content = b '' . join ( self . iter_content ( CONTENT_CHUNK_SIZE )) or b '' File \"/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/models.py\" , line 756 , in generate raise ChunkedEncodingError ( e ) requests . exceptions . ChunkedEncodingError : ( \"Connection broken: ConnectionResetError(54, 'Connection reset by peer')\" , ConnectionResetError ( 54 , 'Connection reset by peer' )) 問題原因 參考： 帶有請求模塊的 ConnectionResetError 在異常內部引發異常，使程序崩潰 由參考的資訊來看，我的發生也是依序發生 ConnectionResetError: [Errno 54] Connection reset by peer urllib3.exceptions.ProtocolError: (\"Connection broken: ConnectionResetError(54, ‘Connection reset by peer')\", ConnectionResetError(54, ‘Connection reset by peer')) requests.exceptions.ChunkedEncodingError: (\"Connection broken: ConnectionResetError(54, ‘Connection reset by peer')\", ConnectionResetError(54, ‘Connection reset by peer')) 由第三點的說明來看，是連線已經中斷了，而導致程式Crash，原本的程式在request的寫法 try : return ses . get ( * args1 , timeout = 10 , ** args2 ) except ( ConnectionError , ReadTimeout ) as error : print ( error ) ses = function () 看來只有ConnectionError或Timeout才會被忽略，再新增 ConnectionResetError 再來觀察看看連線中斷的問題，避免程式因為斷線而Crash，在except內再重新request","tags":"Python","url":"https://richardrobot.xyz/2021/11/python-crawler-error/","loc":"https://richardrobot.xyz/2021/11/python-crawler-error/"},{"title":"ASCII認識","text":"錯誤 發生錯誤訊息如下，程式在使用XML的序列化時發生這樣的錯誤 ErrorMsg : System . InvalidOperationException : 產生 XML 文件時發生錯誤。 ---> System . ArgumentException : '' ( 十六進位值 0x08 ) 是無效的字元。 查詢問題後發現文字內有特殊的符號 EX ： 測試程式有特殊符號，會Exception在 xmlSerializer.Serialize public ActionResult test1 ( string xmlData = \"\" ) { Data oData = new Data (); try { oData . inputText = \"測試_\b測試測試測試測試測試\" ; // 序列化為XML。 System . Xml . Serialization . XmlSerializer xmlSerializer = new System . Xml . Serialization . XmlSerializer ( oData . GetType ()); XmlWriterSettings xmlSettings = new XmlWriterSettings (); xmlSettings . Encoding = Encoding . GetEncoding ( \"Big5\" ); xmlSettings . Indent = false ; xmlSettings . OmitXmlDeclaration = false ; using ( StringWriter szWriter = new StringWriter ()) { using ( XmlWriter xmlWriter = XmlWriter . Create ( szWriter , xmlSettings )) { xmlSerializer . Serialize ( xmlWriter , oData ); } xmlData = szWriter . ToString (); } } catch ( Exception e ) { return Content ( e . Message ); } return Content ( xmlData ); } 其中的特殊符號在ASCII表轉換成 16進制的 08，是算ASCII的控制字元，無法轉換。 ASCII碼表 整理一下代碼的意義： 第0～32號及第127號(共34個)是控制字元或通訊專用字元 第33～126號(共94個)是字元 第48～57號為0～9十個阿拉伯數字 第65～90號為26個大寫英文字母 第97～122號為26個小寫英文字母，其餘為一些標點符號、運算符號 參考資料： ASCII碼介紹 認識中文字元碼","tags":"微軟筆記","url":"https://richardrobot.xyz/2021/11/ascii/","loc":"https://richardrobot.xyz/2021/11/ascii/"},{"title":"使用Bokeh產生技術圖表","text":"參考資料： Bokeh 探索頻道(2)~客製化技術圖表升級 在 Django 上使用数据可视化利器 Bokeh 參考老師的Blog文章，內附的程式碼就可以無痛升級美麗圖表，但是我架設在Django上，需要調整一下來顯示在Django頁面。 在Django的View.py 上收先引用： from bokeh.embed import components from bokeh.resources import CDN 在程式加入Blog內的function來產生資料跟已經畫好的圖表，使用components，產生javascript與 html區塊，最後在render頁面帶入參數 在Django的templates頁面上，下圖是圖表的Html的Div區塊 下圖是在 script></script> 區塊中，先引用bokeh的js，我直接下載到我的本機，避免版本到時候又變了壞掉，最後使用bokeh產生的的javascript語法。 就可以產生美美的圖了","tags":"Python","url":"https://richardrobot.xyz/2021/11/shi-yong-bokehchan-sheng-ji-shu-tu-biao/","loc":"https://richardrobot.xyz/2021/11/shi-yong-bokehchan-sheng-ji-shu-tu-biao/"},{"title":"MacM1執行Tensorflow錯誤問題","text":"每當執行如下的語法時： model.fit(x_train, y_train, epochs=5) 就會出現以下錯誤： 2021 - 10 - 27 20 : 36 : 06.945996 : I tensorflow / compiler / mlir / mlir_graph_optimization_pass . cc : 185 ] None of the MLIR Optimization Passes are enabled ( registered 2 ) 2021 - 10 - 27 20 : 36 : 06.948454 : W tensorflow / core / platform / profile_utils / cpu_utils . cc : 128 ] Failed to get CPU frequency : 0 Hz Epoch 1 / 5 2021 - 10 - 27 20 : 36 : 07.052295 : I tensorflow / core / grappler / optimizers / custom_graph_optimizer_registry . cc : 112 ] Plugin optimizer for device_type GPU is enabled . 2021 - 10 - 27 20 : 36 : 07.079 python [ 8109 : 118092 ] -[ MPSGraph adamUpdateWithLearningRateTensor : beta1Tensor : beta2Tensor : epsilonTensor : beta1PowerTensor : beta2PowerTensor : valuesTensor : momentumTensor : velocityTensor : maximumVelocityTensor : gradientTensor : name : ] : unrecognized selector sent to instance 0x29ee0f660 2021 - 10 - 27 20 : 36 : 07.091 python [ 8109 : 118092 ] *** Terminating app due to uncaught exception ' NSInvalidArgumentException ' , reason : ' -[ MPSGraph adamUpdateWithLearningRateTensor : beta1Tensor : beta2Tensor : epsilonTensor : beta1PowerTensor : beta2PowerTensor : valuesTensor : momentumTensor : velocityTensor : maximumVelocityTensor : gradientTensor : name : ] : unrecognized selector sent to instance 0x29ee0f660 ' 一開始以爲是只能執行在Python 3.8的環境，但是參考教學 https://www.youtube.com/watch?v=_CO- ND1FTOU 影片中也是能夠在Python3.9使用Tensorflow2.5，使用以下語法查看版本 import sys import tensorflow.keras import pandas as pd import sklearn as sk import tensorflow as tf print ( f \"Tensor Flow Version: {tf.__version__}\" ) print ( f \"Keras Version: {tensorflow.keras.__version__}\" ) print () print ( f \"Python {sys.version}\" ) print ( f \"Pandas {pd.__version__}\" ) print ( f \"Scikit-Learn {sk.__version__}\" ) gpu = len ( tf . config . list_physical_devices ( 'GPU' )) > 0 print ( \"GPU is\" , \"available\" if gpu else \"NOT AVAILABLE\" ) Tensor Flow Version: 2.6.0 Keras Version: 2.6.0 Python 3.9.6 | packaged by conda-forge | (default, Jul 11 2021, 03:35:11) [Clang 11.1.0 ] Pandas 1.3.0 Scikit-Learn 0.24.2 GPU is available 用另外一個環境一樣Python3.9，TensorFlow2.5就可以正確執行，看來需要降版本，只好先移除了 安裝參考： tensorflow-metal PluggableDevice 入門 AI - Apple Silicon Mac M1 原生支持 TensorFlow 2.6 GPU 加速（tensorflow-metal PluggableDevice） 參考第二個連接的處理，重新安裝 Xcode ，並且重新執行安裝語法就OK了 先解除安裝 python -m pip uninstall tensorflow-macos python -m pip uninstall tensorflow-metal 執行重新安裝 conda install -c apple tensorflow-deps --force-reinstall python -m pip install tensorflow-macos python -m pip install tensorflow-metal 測試語法： from tensorflow.keras import layers from tensorflow.keras import models model = models . Sequential () model . add ( layers . Conv2D ( 32 , ( 3 , 3 ), activation = 'relu' , input_shape = ( 28 , 28 , 1 ))) model . add ( layers . MaxPooling2D (( 2 , 2 ))) model . add ( layers . Conv2D ( 64 , ( 3 , 3 ), activation = 'relu' )) model . add ( layers . MaxPooling2D (( 2 , 2 ))) model . add ( layers . Conv2D ( 64 , ( 3 , 3 ), activation = 'relu' )) model . add ( layers . Flatten ()) model . add ( layers . Dense ( 64 , activation = 'relu' )) model . add ( layers . Dense ( 10 , activation = 'softmax' )) model . summary () from tensorflow.keras.datasets import mnist from tensorflow.keras.utils import to_categorical ( train_images , train_labels ), ( test_images , test_labels ) = mnist . load_data () train_images = train_images . reshape (( 60000 , 28 , 28 , 1 )) train_images = train_images . astype ( 'float32' ) / 255 test_images = test_images . reshape (( 10000 , 28 , 28 , 1 )) test_images = test_images . astype ( 'float32' ) / 255 train_labels = to_categorical ( train_labels ) test_labels = to_categorical ( test_labels ) model . compile ( optimizer = 'rmsprop' , loss = 'categorical_crossentropy' , metrics = [ 'accuracy' ]) model . fit ( train_images , train_labels , epochs = 5 , batch_size = 64 ) test_loss , test_acc = model . evaluate ( test_images , test_labels ) test_acc 上面處理已經完成但是會引發一個問題： numpy 會被安裝成0.19的版本，而且會造成錯誤： ValueError: numpy . ndarray size changed , may indicate binary incompatibility . Expected 88 from C header , got 80 from PyObject 需要再更新Numpy pip install -- upgrade numpy","tags":"Mac","url":"https://richardrobot.xyz/2021/10/mac-tensorflow/","loc":"https://richardrobot.xyz/2021/10/mac-tensorflow/"},{"title":"本益比","text":"$$ 本益比 = 股價 / 每股盈餘(EPS) $$ 以投資的角度來看，股價則是投資1股所需要的成本(購買成本)，而每股獲利意思是投資1股所得到的獲利，因此本益比就是投資該股票1股的成本與獲利的比值，即為報酬率的倒數。在合理本益比接近的條件下，較低的本益比通常代表著投資的潛在報酬較大。 心得：本益比的高低是相對的，主要要察覺這家公司的獲利能力與EPS再來對比本益比是否過高 參考資料： 財報狗 深入理解本益比","tags":"投資學習","url":"https://richardrobot.xyz/2021/10/ben-yi-bi/","loc":"https://richardrobot.xyz/2021/10/ben-yi-bi/"},{"title":"安裝Let's Encrypt電子證書","text":"參考資料： 安裝Let's Encrypt電子證書 如何在NGINX+DJANGO平台設置SSL連線 在本機驗證安裝Let's Encrypt brew install certbot brew ls certbot 然後在Mac執行 certbot --config-dir ~/letsencrypt/etc --work-dir ~/letsencrypt/lib --logs-dir ~/letsencrypt/log certonly --manual 接下來會有三個步驟要輸入： 1.Email 2.domain 3.會要你在規定的路徑上產生讀取文檔： Saving debug log to / Users / jarvis . zheng / letsencrypt / log / letsencrypt . log Please enter the domain name ( s ) you would like on your certificate ( comma and / or space separated ) ( Enter 'c' to cancel ): linebot . richardrobot . xyz Requesting a certificate for linebot . richardrobot . xyz - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Create a file containing just this data : YYUCwTYHewbZ0vVcobFBA8kmL - xs - 8 AQAj5aH7tD3HI . mFCPG4KMVD6yTJlxRiPv1IXrYQENjpRSb9DJyynjW5I And make it available on your web server at this URL : http : // linebot . richardrobot . xyz /. well - known / acme - challenge / YYUCwTYHewbZ0vVcobFBA8kmL - xs - 8 AQAj5aH7tD3HI - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Press Enter to Continue 從上面的指示來看 要在指定的網址： http://linebot.richardrobot.xyz/.well-known/acme-challenge/YYUCwTYHewbZ0vVcobFBA8kmL-xs-8AQAj5aH7tD3HI 產生可讀取字串： YYUCwTYHewbZ0vVcobFBA8kmL-xs-8AQAj5aH7tD3HI.mFCPG4KMVD6yTJlxRiPv1IXrYQENjpRSb9DJyynjW5I 在Django的做法如下： 在 url.py 設定網址： 檔案放置的地方： Views.py 程式讀取的方式： 驗證成功存放的路徑： nginx 新增的配置 第一個 server { server_name linebot . richardrobot . xyz ; listen 80 ; return 301 https : //linebot.richardrobot.xyz$request_uri; } 第二個 server { listen 443 ; server_name linebot . richardrobot . xyz ; ssl on ; # <- ssl_certificate / Users / jarvis . zheng / LineBot / ssl / cert . pem ; # <- ssl_certificate / Users / jarvis . zheng / LineBot / ssl / chain . pem ; # <- ssl_certificate_key / Users / jarvis . zheng / LineBot / ssl / privkey . pem ; # <- location / { #第三個 proxy_set_header X - Forwarded - Proto https ; # <- 這個很重要，記得加入 } } 沒有加最後的分號 ; (LineBot) jarvis.zheng@zhengruichangdeMac-mini LineBot % sudo nginx -s reload Password: nginx: [warn] the \"ssl\" directive is deprecated, use the \"listen ... ssl\" directive instead in /opt/homebrew/etc/nginx/sites-enabled/LineBot:5 nginx: [emerg] no \"ssl_certificate_key\" is defined for certificate \"/Users/jarvis.zheng/LineBot/ssl/chain.pem\" and the \"ssl\" directive in /opt/homebrew/etc/nginx/sites-enabled/LineBot:5","tags":"Mac","url":"https://richardrobot.xyz/2021/10/mac-lets-encrypt/","loc":"https://richardrobot.xyz/2021/10/mac-lets-encrypt/"},{"title":"LineLogin串接","text":"參考資料： 使用 Django Allauth 套件 [Django教學13]Django Allauth套件整合Google登入驗證實作教學 首先安裝django-allauth pip install django-allauth 在Django站臺的Settings設定相關的參數設定 在 INSTALLED_APPS 裏面新增 allauth allauth.account …以下的資料 新增設定 AUTHENTICATION_BACKENDS 新增設定 SITE_ID ,數值要比對Django資料表內的 django_site 的ID值 SOCIALACCOUNT_PROVIDERS 這是要設定讀取使用者的資料 在站臺的url.py設定路徑 from django.contrib import admin from django.urls import path , include from django.conf.urls import url urlpatterns = [ path ( 'admin/' , admin . site . urls ), path ( 'accounts/' , include ( 'allauth.urls' )), ] 以上設定完成要執行Django語法來產生資料表： python manage.py makemigrations python manage.py migrate python manage.py runserver 以上就是Django的設定部分，另外LineLogin的設定需要注意的細節，因爲django-allauth已經將送LineLogin授權路徑參數自動拼裝好了，裏面有些規範需要注意 在送授權的部分，django-allauth定義的callbackURL已經規範，如下圖 https://django-allauth.readthedocs.io/en/latest/providers.html#line 上面的 Callback URL 必須與LINE Login 內的設定相同 另外剩下的就是要設定KEY與ClientID: 去內部後臺設定LINE SecrtKEY 回到頁面去，雖然沒有寫什麼頁面，可是 django-allauth已經內建了許多頁面可以直接查看 以上就是完成初步的串街，內容套版需要再詳細實做與修改，另外在串街流程中發生的錯誤在導向到LineLogin畫面時出現 400 錯誤： 這個問題的發生原因先查看了LineLogin的文件說明 要求授權 為進行使用者認證，並為 app 要求權限，請透過所需的 query parameter，如下面例子所示將使用者重新導向授權 URL 。 https : //access.line.me/oauth2/v2.1/authorize? response_type = code & client_id = 1234567890 & redirect_uri = https % 3 A % 2F % 2F example . com % 2F auth & state = 12345 abcde & scope = profile % 20 openid & nonce = 09876 xyz URL 的查詢屬性 我的參數： https : // access . line . me / oauth2 / v2 . 1 / authorize ? client_id = U2c2bde960c5d7723082f2b9a491f51e1 & redirect_uri = http : // linebot . richardrobot . xyz / accounts / line / login / callback / & scope = & response_type = code & state = BBwcp2EEdqnJ 錯誤問題1：client_id不對 client_id ： LINE Login Channel 的 Channel ID 錯誤問題2：scope沒有值 scope：向用戶請求授予權限，也就是要求取得使用者的資料 修正： 1.在admin後臺修改設定 2.在settings.py新增如下參數：","tags":"LineBot","url":"https://richardrobot.xyz/2021/10/lineloginchuan-jie/","loc":"https://richardrobot.xyz/2021/10/lineloginchuan-jie/"},{"title":"Supervisor","text":"在 Linux上可以使用systemctl 這個服務來開機就能自動啓動寫好的網站服務，等等其他的，但是在Mac上卻無法，使用supervisor還有Web畫面可以查看 透過brew來安裝： brew install supervisor 設定檔路徑： 由於是Mac M1 的系統，homebrew已經將設定的路徑放在 /opt/homebrew/etc 如下圖，開啓 supervisor.conf 檔案 可以註解前面的 ; 符號來啓用設定 : 可以開啓 Web的畫面 啓用 登入帳號密碼 [ inet_http_server ] ; inet ( TCP ) server disabled by default port = 127.0 . 0.1 : 9001 ; ip_address : port specifier , * : port for all iface username = test ; default is no username ( open server ) password = 123 ; default is no password ( open server ) 在最後加入客製化的設定檔： 加入下面的設定，可以在/Process/ 資料夾底下設定需要的Service檔，並且用 .ini 爲副檔名 [ include ] files = / Users / jarvis . zheng / Process /* . ini 已django網站爲例： command 程序啓動命令：使用gunicorn來當WebServer，使用參數檔 gunicorn.conf.py [ program : django_server ] command =/ Users / jarvis . zheng / miniforge3 / envs / finlab / bin / gunicorn - c gunicorn . conf . py StockSecretary . wsgi process_name =% ( program_name ) s directory =/ Users / jarvis . zheng / StockWeb / 啓動服務： sudo brew services start supervisor 參考資料： SUPERVISOR 介紹與使用方式 Jupyter Notebook and Nginx Setup Mac OSX 開機啟動應用 (supervisor) Python Tricks —— 使用 Supervisor 控制 Linux 進程","tags":"Mac","url":"https://richardrobot.xyz/2021/10/mac-supervisor/","loc":"https://richardrobot.xyz/2021/10/mac-supervisor/"},{"title":"Blog發佈到netlify","text":"Netlify 基本的說明： netlify 超佛心的靜態網站hosting服務 - 不只做hosting還有更多 由 部落格建置 與 [[部落格建置-套件]] 兩個篇章的設定，已經把Pelican 可以在本機做測試查看了，接下來就要建置部署在網路上，首先就是要買個網域，看來看去還是 Namecheap 最便宜，詳細買過程可以參考： Namecheap 網址註冊購買 DNS 設定教學 網域綁定主機 https://richardrobot.xyz 一次買兩年才 NT $ 233 ，還蠻便宜，反正只是做Blog隨手記錄 買好了網址接下來就是要把GitHub與Netlify綁定在一起參考流程如下Blog： Pelican static site on Netlify 需要注意的是，Blog文章裏面的執行語法 Build command pelican content -s publishconf.py 這個設定了反而不能，會出現錯誤，我的設定 另外需要把Netlify提供的Name Server 設定到 Namecheap 的DNS設定 Netlify的設定畫面： 然後對應到： NAMESERVERS 選CustomDNS","tags":"Pelican","url":"https://richardrobot.xyz/2021/10/git-netlify/","loc":"https://richardrobot.xyz/2021/10/git-netlify/"},{"title":"Mac重新開機SSH Token失效","text":"已經加入Github的SSH Token了，再次的PUSH還是會產生 SourceTree權限問題 查詢問題之後 參考 操作提示 Permission denied, please try again ，裏面的說明： ssh-add 這個命令不是用來永久性的記住你所使用的私鑰的。實際上，它的作用只是把你指定的私鑰添加到 ssh-agent 所管理的一個 session 當中。而 ssh-agent 是一個用於存儲私鑰的臨時性的 session 服務，所以每次重啓都會失效，都需要再次執行命令。 或是設定 Mac 重啟後自動ssh-add 私鑰","tags":"Git","url":"https://richardrobot.xyz/2021/10/git-ssh-mac-token/","loc":"https://richardrobot.xyz/2021/10/git-ssh-mac-token/"},{"title":"副檔名command無法執行","text":"寫好了可以執行的發佈語法，點擊執行卻出現這個 需要另外給予權限： chmod +x batch_notes_script.command","tags":"Mac","url":"https://richardrobot.xyz/2021/10/mac-command-permission/","loc":"https://richardrobot.xyz/2021/10/mac-command-permission/"},{"title":"Obsidian筆記同步到Blog排程","text":"緣起 自從發現 Obsidian 這個東西之後，寫作筆記感覺很方便，而且使用Markdown語法，也剛好想建置Blog網站，用Python的Pelican套件，一樣是用Markdown來產生文章，就覺得兩個東西可以合併，既可以做筆記，又可以寫Blog。 想法 obsidian的備份機制使用Github來完成，而且有套件可以自動Push Blog發佈到netlify 也是用GitHub 主要把Obsidian的MD檔同步到Pelican的content資料夾，再做一個發佈的程式就完成了 流程： Obsidian 的筆記寫完之後使用 command + Shift + P 快捷鍵Push到GitHub：ObsidianNote。 參考： Obsidian快捷鍵設定 複製檔案到如下圖 右邊的 ==隨手筆記==資料夾 複製=> ==/Pelican/content 底下== 複製圖檔 執行語法來生成頁面 pelican content git commit & push","tags":"Python","url":"https://richardrobot.xyz/2021/10/obsidian-to-pelican/","loc":"https://richardrobot.xyz/2021/10/obsidian-to-pelican/"},{"title":"Pelican說明Metadata","text":"![[2021-10-01_PM4.46.58.png]] 您還可以在模板中使用自己的元數據鍵（只要它們不與保留的元數據關鍵字衝突）。下表包含保留的元數據關鍵字列表： Metadata Description title Title of the article or page date Publication date (e.g., YYYY - MM - DD HH : SS ) modified Modification date (e.g., YYYY - MM - DD HH : SS ) tags Content tags, separated by commas keywords Content keywords, separated by commas ( HTML content only) category Content category (one only — not multiple) slug Identifier used in URLs and translations author Content author, when there is only one authors Content authors, when there are multiple summary Brief description of content for index pages lang Content language ID (en, fr, etc.) translation If content is a translation of another (true or false) status Content status: draft, hidden, or published template Name of template to use to generate content (without extension) save_as Save content to this relative file path url URL to use for this article/page","tags":"Python","url":"https://richardrobot.xyz/2021/09/pelican-metadata/","loc":"https://richardrobot.xyz/2021/09/pelican-metadata/"},{"title":"SourceTree權限問題","text":"Sourcetree出現Permission denied (publickey) 這個問題的產生可能是程式問題，已經透過SourceTree的UI界面功能去產生SSH的KEY 做法來源 Mac 上改變 Git 認證模式 ，也已經至GitHub去註冊KEY Google以後參考資料部落格： MacOS更新後使用Sourcetree出現Permission denied (publickey) 就去找出當初用GitHub產生的PrivateKey在哪如下圖左紅框，就執行一下以下語法就可以了 ==語法：== 執行新增 ssh - add / Users / jarvis . zheng /. ssh / jarvis . zheng - GitHub 檢查語法 ssh - T git @github . com","tags":"Git","url":"https://richardrobot.xyz/2021/09/git-sourcetree-permission/","loc":"https://richardrobot.xyz/2021/09/git-sourcetree-permission/"},{"title":"部落格建置-套件","text":"要使用Pelican的外掛套件，目前套件的來源有兩種： 在命名空間之下的Git， 新版pelican-plugins 舊版的套件集合的Git， 舊版pelican-plugins 導入套件的方式有兩種： 如果您的插件不在可導入路徑中，您可以通過PLUGIN_PATHS設置指定路徑列表。如以下示例所示，PLUGIN_PATHS列表中的路徑可以是相對於設置文件的絕對路徑或相對路徑： 若是沒有依照設定的套件名稱放置程式會出現錯誤訊息： ( Pelican ) jarvis . zheng @ zhengruichangdeMac - mini Pelican % pelican content WARNING : % s usage in CATEGORY_FEED_ATOM is deprecated , use { slug } instead . ERROR : Cannot load plugin `related_posts` | Cannot import plugin `related_posts` Done : Processed 7 articles , 0 drafts , 0 pages , 0 hidden pages and 0 draft pages in 0.20 seconds . 總結 套件的使用，在命名空間下的，要執行安裝語法，會直接搜尋環境下的套件程式，若是用舊版的，要去舊版git 去clone下來，並且對照名稱放程式資料夾在/pelican-plugins","tags":"Python","url":"https://richardrobot.xyz/2021/09/pelican-plugins/","loc":"https://richardrobot.xyz/2021/09/pelican-plugins/"},{"title":"部落格建置","text":"用Pelican套件建置部落格在GitHub Pages 上，首先需要安裝Pelican的環境 建立python的虛擬環境 conda create -n Pelican 啓動虛擬環境 conda activate Pelican CD 到新開的資料夾， 當初已經在GitHub上建立好了Repository，所以就在本機建立資料夾然後Clone，在Pelican資料夾下，需要安裝pelican的相關套件，需要創建一個requirements.txt文件 touch requirements.txt 接下來安裝所有套件： pip install -r requirements.txt 若是還沒建立好預設開始環境需要執行以下語法，Pelican會建立基本的程式與資料夾，若是執行以下語法會需要回答一些預設環境的設定值 pelican-quickstart 資料夾架構如下 每個文件的用途： content/ - 存儲所有網站內容的目錄 task.py - 幫助我們自動化網站生成和發布的腳本 output/ - 存儲生成的靜態網站的 HTML 文件的目錄 pelicanconf.py - 包含網站所有配置的文件 生成網站 此語法會在 output/ 目錄產生所有html 的頁面 pelican content 此語法會產生一個臨時的站臺 127.0.0.1:8000 可以預覽頁面 pelican --listen 查看外掛套件清單： pelican-plugins","tags":"Python","url":"https://richardrobot.xyz/2021/09/pelican/","loc":"https://richardrobot.xyz/2021/09/pelican/"},{"title":"Markdown-插入圖片","text":"! [ alt text ]( https : //github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png \"這個文字會滑鼠滑上會出現POPup\") ! [ 這裡是要寫圖片說明 ]( http : //這個是要填圖片路徑.jpg) 使用代碼重複利用相同圖片方式： 最近在看的新書： ! [ Google教我的101個工作最佳化 ][ google101 ] 最近在看的新書： ! [ Google教我的101個工作最佳化 ][ google101 ] 最近在看的新書： ! [ Google教我的101個工作最佳化 ][ google101 ] [ google101 ] : https : //im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/058/32/0010583256.jpg&v=51751f70&w=348&h=348 \"Google教我的101個工作最佳化\" 實例展示： 最近在看的新書： 最近在看的新書： 最近在看的新書：","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-cha-ru-tu-pian/","loc":"https://richardrobot.xyz/2021/09/markdown-cha-ru-tu-pian/"},{"title":"Markdown-程式代碼或語法高亮","text":"直接展示：每個三個` 符號 後面直接寫程式語言名稱如：sql C# java python 等等的 var s = \"JavaScript syntax highlighting\" ; alert ( s ); s = \"Python syntax highlighting\" print s No language indicated, so no syntax highlighting. But let's throw in a <b> tag </b> .","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-cheng-shi-dai-ma-huo-yu-fa-gao-liang/","loc":"https://richardrobot.xyz/2021/09/markdown-cheng-shi-dai-ma-huo-yu-fa-gao-liang/"},{"title":"Markdown-連結設定","text":"< http : // markdown . tw > [ 這是一個帶有標題的行內連結 ]( https : // www . google . com \"Google's Homepage\" ) [ 中文版的 Markdown語法說明 ]( http : // markdown . tw ) 使用代碼去重複使用： [ 來看看這個網址 ][ 我是網址 ] [ 去看看這個網址 ][ 我是網址 ] [ 檢查這個網址 ][ 我是網址 ] [ 我是網址 ]: https : // www . google . com . tw 實例展示： http://markdown.tw 這是一個帶有標題的行內連結 中文版的Markdown語法說明 來看看這個網址 去看看這個網址 檢查這個網址","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-lian-jie-she-ding/","loc":"https://richardrobot.xyz/2021/09/markdown-lian-jie-she-ding/"},{"title":"Markdown-其他的符號","text":"[ ] 代辦事項 [x] 已完成事項 跳脫字元 加上反引號 \\","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-qi-ta-de-fu-hao/","loc":"https://richardrobot.xyz/2021/09/markdown-qi-ta-de-fu-hao/"},{"title":"Markdown-水平分隔線","text":"語法： ---短橫線（Hyphens） *** 半形星號（ Asterisks ） ___下底線 （ Underscores ）","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-shui-ping-fen-ge-xian/","loc":"https://richardrobot.xyz/2021/09/markdown-shui-ping-fen-ge-xian/"},{"title":"Markdown-文字變化","text":"* asterisks * // 斜體 ** asterisks ** // 粗體 == 螢光強調 == 實際展示： 我是斜體字 我是粗體字測試 ==螢光強調==","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-wen-zi-bian-hua/","loc":"https://richardrobot.xyz/2021/09/markdown-wen-zi-bian-hua/"},{"title":"Markdown-項目清單","text":"* 無序列表一 //可以使用星號建立無序清單 - 無序列表二 //或是短橫線（負號） + 無序列表三 //使用半形加號也可以 1. 有序列表一 2. 有序列表二 3. 有序列表三 實際展示： 無序列表一 無序列表二 無序列表三 一樣的無序列表用負號 一樣的無序列表用負號 一樣的無序列表用負號 一樣的無序列表用加號 一樣的無序列表用加號 一樣的無序列表用加號 有序號列表一 有序號列表二 有序號列表三","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-xiang-mu-qing-dan/","loc":"https://richardrobot.xyz/2021/09/markdown-xiang-mu-qing-dan/"},{"title":"Markdown-語法學習","text":"Markdown 語言在 2004 由約翰·格魯伯（英語：John Gruber）創建。Markdown 是一種輕量級標記語言，它允許人們使用易讀易寫的純文本格式編寫文檔。 Markdown 是一種簡易的標記語言，能讓我們在最短的時間裡製作一份易讀易懂的文字檔案，當有需要輸出到網站時，也能使用許多線上轉換網站或軟體，將Markdown格式的內容轉換成HTML格式，瞬間由文字格式變身美觀的網頁格式。 分段標題 以一到六個井字表示標題一至標題六 （<h1>到<h6>） ，亦即井號越少顯示的字體越大。 項目清單 列舉式的項目清單是很常用的表達語法，在HTML網頁的定義裡主要有兩種：有順序編號的 （<ol>+<li>） 和沒有順序編號的 （<ul>+<li>） ，Markdown的表示方法很簡單: 1.有順序編號的清單：每列開頭是「數字.一個空白」 2.沒有順序編號的清單：就是以項目符號開頭的清單，以「*一個空白」或「減號一個空白」來表示 文字變化 一段文字裡需要特別注意或要有不同變化時 連結設定 快速超連結：只要把超連結用「<」、「>」括住即可，被括住的網址會形成可點擊的超連結 完整超連結：上面快速超連結直接用網址來顯示，我們可以用 [顯示文字](http://jdev.tw/blog/3504/test) 的語法在網頁顯示指定的文字與其使用的超連結。Markdown插入超連結的語法很簡單，但無法指示開啟在新視窗或新分頁。 插入圖片 比照超連結的寫法再於開頭加上 半形驚嘆號 就可以了 語法： ![顯示文字](圖片網址) 程式代碼或語法高亮 在一般文字中直接用 這個樣子 ，若是要包整段的要三個 \"` 符號前後包起來 引言 用一個 小於符號 > 放在最前面就可以外面有框線包起來的樣子 行內HTML 因為 Markdown 本來就預設要轉換成 HTML 網頁格式，所以你當然可以直接寫入正確的 HTML 代碼 <H1>ttt</H1> 水平分隔線 三個或三個以上的符號，必須在獨立的一行，前後不能有其他文字。 —-短橫線（Hyphens） ***半形星號（Asterisks） ___下底線（Underscores） 其他的符號 剩下少用的東西有 代辦事項 列表縮進 跳脫字元","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-yu-fa-xue-xi/","loc":"https://richardrobot.xyz/2021/09/markdown-yu-fa-xue-xi/"},{"title":"Markdown-分段標題","text":"標題 \" `'語法顯示' H1 H2 H3 H4 H5 H6 最常使用的 H1 與 H2 標題，還有更鮮明的另一種寫法： Alt-H1 Alt-H2 \" ` 實際展示： 標題 標題 鮮明的標題 鮮明的標題","tags":"Markdown","url":"https://richardrobot.xyz/2021/09/markdown-fen-duan-biao-ti/","loc":"https://richardrobot.xyz/2021/09/markdown-fen-duan-biao-ti/"},{"title":"Obsidian 使用 Git 跨平台同步","text":"第一步 先在Windows本機的建立一個資料夾，是拿來開啟Obsidian的Vault 像上面的資料路徑我新開了一個 ObsidianNote資料夾，然後Obisdian設定這個資料夾就會有一些設定檔 第二步 在GitHub建立一個repository，然後取名同樣的名稱ObsidianNote 第三步 開啟CMD 然後CD至剛剛的資料夾，接下來就是執行GitHub上面的初始化語法 git init git commit -m \"first commit\" git remote add origin https://github.com/TernenceZheng/ObsidianNote.git 第四步 安裝第三方外掛套件 Obsidian Git 安裝及啟用後，左方將出現 Obsidian Git 的設定，我有以下的建議： 將 Vault 備份時間改為 5 分鐘 (Backup Interval: 5) 每次打開軟件也從 Github Pull 所有的變更 (Pull updates on startup: ON ) Commit Message 增加電腦名稱以便識別 (Commit message: 開首加電腦名稱） 以及最重要的關掉 Disable Push（Disable Push: OFF )，才會自動把所有 Commit 推送到 Github 上，讓其他裝置可以同步。 參考鏈接： Obsidian上手及使用Git跨平台同步 另外的手機版本同步參考： [移動] 設置 iOS 與移動應用程序基於 git 的同步（使用工作副本） Git","tags":"Git","url":"https://richardrobot.xyz/2021/09/git-obsidian/","loc":"https://richardrobot.xyz/2021/09/git-obsidian/"},{"title":"Mac 上改變 Git 認證模式","text":"2021/09/14 今天在mac 上面在 git clone https://github.com/TernenceZheng/ObsidianNote.git 結果我的mac顯示無法用使用者帳號密碼去登入驗證 'Mac上面錯誤訊息' Cloning into 'ObsidianNote'... Username for 'https://github.com': andy711023@gmail.com Password for 'https://andy711023@gmail.com@github.com': remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead. remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information. fatal: Authentication failed for 'https://github.com/TernenceZheng/ObsidianNote.git/' 看了文章原來要去用GitHub的Token驗證方式才可以，舊的帳號密碼已經不行了，下面是Github產生的Token 把拿到的Token註冊在MacOS的鑰匙圈如下圖 ![[Pic2021-09-144.54.10.png]] 就完成Token的驗證註冊，然後git clone就OK了 參考資料： Mac 上改變 Git 認證模式 相關主題： Obsidian 使用 Git 跨平台同步 SourceTree權限問題","tags":"Git","url":"https://richardrobot.xyz/2021/09/git-mac-add-token/","loc":"https://richardrobot.xyz/2021/09/git-mac-add-token/"},{"title":"Obsidian快捷鍵設定","text":"Obsidian 快捷鍵設定 參考網址： 14個Obsidian快捷鍵設定建議 記錄目前最常使用的快捷鍵： 功能：快速插入模板筆記 cmd + L 功能：立即執行Git的PUSH更新 cmd + Shift + P","tags":"Obsidian","url":"https://richardrobot.xyz/2021/09/obsidiankuai-jie-jian-she-ding/","loc":"https://richardrobot.xyz/2021/09/obsidiankuai-jie-jian-she-ding/"},{"title":"Obsidian","text":"參考網址： 筆記類別：#心得 主題： Obsidian 00:00 開場白 01:13 要點一：捕捉生活中的靈感與想法 03:20 要點二：用自己的話寫筆記 04:19 要點三：引用內容要標注出處 05:02 要點四：建立筆記之間的連結 06:38 要點五：每則筆記必須簡明扼要 07:26 筆記關聯圖 08:25 Obsidian 的外掛簡介","tags":"Obsidian","url":"https://richardrobot.xyz/2021/09/obsidian/","loc":"https://richardrobot.xyz/2021/09/obsidian/"},{"title":"VS 常用內建快速鍵","text":"環境 環境設定的組合快捷鍵 程式碼編輯器分頁切換 ：Ctrl+ TAB 存檔：Ctrl + S 執行(debug)：F5 ==執行(non debug)==： Ctrl + F5 全部儲存：Ctrl + Shift + S 單步執行：F11 (F10) 切換斷點：F9 ==啟用/停用斷點==： Ctrl + F9 ==刪除所有斷點==： Ctrl + Shift + F9 編輯 編輯程式時的組合快捷鍵 ==註解選取範圍==： Ctrl+K,C ==取消註解選取範圍==： Ctrl+K,U ==自動縮排==： 選取範圍後，Alt + F8 選取文字改小寫：Ctrl + U 選取文字改大寫：Ctrl + Shift + U ==呼叫出類別成員==： Ctrl + J (編到一半時 tips 突然不見很好用) 收攏原始碼：Ctrl + M, O 展開原始碼：Ctrl + M, L ==刪除目前這行==： Ctrl + Shift + L 轉至定義： F12 檔案最前面：Shift + Home 檔案最後面：Shift + End ==選到最前面==：Ctrl + Shift + Home ==選到最後面==：Ctrl + Shift + End 檢查括號匹配：Ctrl + ] 跳至行號：Ctrl + G VisualStudioCode VSCode環境的編輯快捷鍵 Code Formatting Shortcut: 以下的設定在 VS2019 的設定是 ： Ctrl + K + D Visual Studio Code on Windows ： Shift + Alt + F Visual Studio Code on MacOS : Shift + Option + F Visual Studio Code on Ubuntu : Ctrl + Shift + I","tags":"微軟筆記","url":"https://richardrobot.xyz/2016/03/VisualStudio/","loc":"https://richardrobot.xyz/2016/03/VisualStudio/"}]};