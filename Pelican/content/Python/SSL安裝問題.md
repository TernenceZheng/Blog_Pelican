Title: 利用 Let’s Encrypt 來自動簽署並更新 SSL 憑證
Date: 2021-03-01 22:00
Tags: python ,google cloud platform,ssl
Category: Python
Authors: Jarvis
Summary: 安裝流程的錯誤除錯

## 記錄一下使用自動簽署的除錯流程

參考如下Blog流程
1.https://medium.com/learn-or-die/%E5%88%A9%E7%94%A8-lets-encrypt-%E4%BE%86%E8%87%AA%E5%8B%95%E7%B0%BD%E7%BD%B2%E4%B8%A6%E6%9B%B4%E6%96%B0-ssl-%E6%86%91%E8%AD%89-wildcard-26b49114bf73



出現錯誤：
        An unexpected error occurred:
        ImportError: cannot import name 'constants'
        Please see the logfile '/tmp/tmpkn2y_ulb/log' for more details.

        詳細錯誤的訊息
        2021-03-01 11:18:59,249:DEBUG:certbot._internal.log:Exiting abnormally:
        Traceback (most recent call last):
            from certbot import constants as core_constants
        ImportError: cannot import name 'constants'
        2021-03-01 11:18:59,249:ERROR:certbot._internal.log:An unexpected error occurred:
        2021-03-01 11:18:59,249:ERROR:certbot._internal.log:ImportError: cannot import name 'constants'


        (WagtailEnv) andy711023@godtable-vm-2:~$ sudo certbot --nginx
        An unexpected error occurred:
        pkg_resources.VersionConflict: (certbot 0.31.0 (/usr/lib/python3/dist-packages), Requirement.parse('certbot>=1.1.0'))
        Please see the logfile '/tmp/tmpwcyqmp4f' for more details.


參考Blog重新安裝，不使用 apt , pip ,使用sudo snap install --classic certbot
2.https://rmb.ma/posts/%E6%9C%8D%E5%8A%A1%E5%99%A8/2020-08-16-Certbot%20%E8%AE%BE%E7%BD%AE%20Let's%20Encrypt%20%E6%97%A5%E5%BF%97.html


        (WagtailEnv) andy711023@godtable-vm-2:~$ sudo certbot certonly --dns-google --dns-google-credentials /home/rsa-key-20201208/godtable.json -d 
        *.godtable.com. -d godtable.com. -i nginx
        usage: 
        certbot [SUBCOMMAND] [options] [-d DOMAIN] [-d DOMAIN] ...
        Certbot can obtain and install HTTPS/TLS/SSL certificates.  By default,
        it will attempt to use a webserver both for obtaining and installing the
        certificate. 
        certbot: error: unrecognized arguments: --dns-google-credentials /home/rsa-key-20201208/godtable.json
        (WagtailEnv) andy711023@godtable-vm-2:~$ sudo apt-get install python3-certbot-dns-google
        正在讀取套件清單... 完成
        正在重建相依關係          
        正在讀取狀態資料... 完成
        E: 找不到套件 python3-certbot-dns-google


參考Blog,直接全自動 sudo certbot --nginx
3.https://andyyou.github.io/2019/04/13/how-to-use-certbot/