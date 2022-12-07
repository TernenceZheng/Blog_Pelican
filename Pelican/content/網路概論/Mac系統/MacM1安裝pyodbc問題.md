---
title: MacM1安裝pyodbc問題
date: 2021-10-07 08:05
aliases: 語法記錄 
tags: Mac,MSSQL,Django
category: 電腦問題
slug: mac-m1-pyodbc
summary: 一些瑣碎的事情沒有資訊的歷程記錄
image: /images/圖片名稱
status: hidden
---

先安裝unixodbc

`brew install unixodbc`

上面安裝的時候，注意版本路徑

```python

export CPPFLAGS="-I/opt/homebrew/Cellar/unixodbc/2.3.9_1/include"

export LDFLAGS="-L/opt/homebrew/Cellar/unixodbc/2.3.9_1/lib"

```

pip安裝已經不能在M1上面使用
```python
pip install pyodbc
```

5/13 安裝時出現的問題

[目前ＯＤＢＣ不支援ＡＲＭ６４架構](https://github.com/microsoft/homebrew-mssql-release/issues/53)

```python
DBAPIError: (pyodbc.Error) ('01000', "[01000] [unixODBC][Driver Manager]Can't open lib 'ODBC Driver 17 for SQL Server' : file not found (0) (SQLDriverConnect)")
(Background on this error at: http://sqlalche.me/e/14/dbapi)
```
---




8/30 才完成M1的odbc 支援

[微軟官方文件說明：安裝pyodbc](https://docs.microsoft.com/zh-tw/sql/connect/odbc/linux-mac/install-microsoft-odbc-driver-sql-server-macos?view=sql-server-ver15)

![[MacM1安裝odbc問題.png]]

安裝的時候要關掉Rosetta
![[安裝odbc時要關掉rosseta.png]]
檢查安裝語法

```c
odbcinst -j

      
cat /opt/homebrew/etc/odbcinst.ini
```


最後安裝python 的需要使用conda 
```
conda install pyodbc
```


用上面的conda 安裝好 pyodbc 又發現問題：
```
(finlab) jarvis.zheng@zhengruichangdeMac-mini StockWeb % odbcinst -j

unixODBC 2.3.9

DRIVERS............: /etc/odbcinst.ini

SYSTEM DATA SOURCES: /etc/odbc.ini

FILE DATA SOURCES..: /etc/ODBCDataSources

USER DATA SOURCES..: /Users/jarvis.zheng/.odbc.ini

SQLULEN Size.......: 8

SQLLEN Size........: 8

SQLSETPOSIROW Size.: 8
```

路徑被改變了，看來是 brew 安裝的 跟 conda 安裝的 會導致設定跑掉

```c
 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/mssql/base.py", line 16, in <module>

 raise ImproperlyConfigured("Error loading pyodbc module: %s" % e)

django.core.exceptions.ImproperlyConfigured: 
Error loading pyodbc module: dlopen
(/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/pyodbc.cpython-39-darwin.so, 2):

Symbol not found: _SQLAllocHandle
```

再執行以下語法：

`sudo ln -s /opt/homebrew/etc/odbc.ini /etc/odbc.ini`

`sudo ln -s /opt/homebrew/etc/odbcinst.ini /etc/odbcinst.ini`


但是Django在執行語法：`python manage.py makemigrations`

還是會錯誤：
```
(finlab) jarvis.zheng@zhengruichangdeMac-mini StockWeb % python manage.py makemigrations 

/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/django/core/management/commands/makemigrations.py:105: RuntimeWarning: Got an error checking a consistent migration history performed for database connection 'default': ('08001', '[08001] [Microsoft][ODBC Driver 17 for SQL Server]Client unable to establish connection (0) (SQLDriverConnect)')

 warnings.warn(

No changes detected


```

`DYLD_PRINT_LIBRARIES=1 isql -k "DRIVER={ODBC Driver 17 for SQL Server};SERVER=localhost;UID=sa;PWD=2UauixdR"`


```c+
      

(finlab) jarvis.zheng@zhengruichangdeMac-mini StockWeb % DYLD_PRINT_LIBRARIES=1 isql -k "DRIVER={ODBC Driver 17 for SQL Server};SERVER=localhost;UID=sa;PWD=2UauixdR" 

dyld: loaded: <131B0730-2640-3DCB-8BEF-352B484FC9FB> /Users/jarvis.zheng/miniforge3/envs/finlab/bin/isql

dyld: loaded: <ACE51818-24E9-3C43-A44F-8D63A90DE898> /Users/jarvis.zheng/miniforge3/envs/finlab/bin/../lib/libodbc.2.dylib

dyld: loaded: <9E2090B7-408E-3147-A436-0DC2B69D99C4> /usr/lib/libedit.3.dylib

dyld: loaded: <1E75FCDF-2357-30FE-AAAD-5290BA722464> /usr/lib/libSystem.B.dylib

dyld: loaded: <D1A057D1-F0DF-3E5E-B087-8076D97A7DC9> /Users/jarvis.zheng/miniforge3/envs/finlab/lib/libiconv.2.dylib

dyld: loaded: <2EA812B3-0565-35FA-BF54-DF98EF3DB5DE> /usr/lib/system/libcache.dylib

dyld: loaded: <146E6A52-3060-32A1-9119-C3D6F8B5C57B> /usr/lib/system/libcommonCrypto.dylib

dyld: loaded: <50E8F23E-3E63-31BF-BFC3-EE75D281B151> /usr/lib/system/libcompiler_rt.dylib

dyld: loaded: <8477DD43-56AA-3422-BF23-4ADC7B98462F> /usr/lib/system/libcopyfile.dylib

dyld: loaded: <FAF9B49D-2583-34EF-850B-047F050ED996> /usr/lib/system/libcorecrypto.dylib

dyld: loaded: <4EDD5F72-2296-3891-B2A1-6741DB6C05C9> /usr/lib/system/libdispatch.dylib

dyld: loaded: <BE0B539A-2EDF-3A99-9632-731C5928BBAC> /usr/lib/system/libdyld.dylib

dyld: loaded: <C5D64EE9-AB76-3D4C-BC4F-2BE8415DC21A> /usr/lib/system/libkeymgr.dylib

dyld: loaded: <AA4E8477-1B82-357E-8275-FFED1F957AF9> /usr/lib/system/liblaunch.dylib

dyld: loaded: <F6CBC87D-DC83-3E5F-A7C0-B0115E7D1BC1> /usr/lib/system/libmacho.dylib

dyld: loaded: <DE9BFFD7-62ED-38ED-BF58-388F192BE6FC> /usr/lib/system/libquarantine.dylib

dyld: loaded: <687A6E36-0460-30BC-A675-7F83059AE2D9> /usr/lib/system/libremovefile.dylib

dyld: loaded: <7F462B8A-541F-3195-9BAE-CDEDFA3BA8A4> /usr/lib/system/libsystem_asl.dylib

dyld: loaded: <BA713F79-1620-38B2-8717-79849B8E897E> /usr/lib/system/libsystem_blocks.dylib

dyld: loaded: <9B3C0AD0-1E0B-39D1-BE25-B97F8EA7E623> /usr/lib/system/libsystem_c.dylib

dyld: loaded: <EA89016C-2C72-3531-84D9-2A696F2DAC85> /usr/lib/system/libsystem_collections.dylib

dyld: loaded: <9BC511C4-6613-3F1D-8592-7D3971B24921> /usr/lib/system/libsystem_configuration.dylib

dyld: loaded: <FCE2D8EA-A9D8-3A5D-A908-3E9C0AFFB941> /usr/lib/system/libsystem_containermanager.dylib

dyld: loaded: <F107780A-EFAD-3DC8-A62F-825DD954128E> /usr/lib/system/libsystem_coreservices.dylib

dyld: loaded: <9BF54A49-874D-3D91-B319-6B2F676FE42D> /usr/lib/system/libsystem_darwin.dylib

dyld: loaded: <DEE0783F-DDC9-35A6-9F6E-6B8FE94FBF0A> /usr/lib/system/libsystem_dnssd.dylib

dyld: loaded: <61A79E0B-1836-376D-AC24-171B40A9FAE7> /usr/lib/system/libsystem_featureflags.dylib

dyld: loaded: <3B5B9F97-ECFB-3F6E-9B85-D8C62A8B3205> /usr/lib/system/libsystem_info.dylib

dyld: loaded: <092A6565-3BE3-3EEF-844E-B846793A4115> /usr/lib/system/libsystem_m.dylib

dyld: loaded: <A454F3F2-7BC4-3808-A60F-F5F4BC55577F> /usr/lib/system/libsystem_malloc.dylib

dyld: loaded: <0FFACDE5-D546-306D-B9FA-06EC8FCAEEF9> /usr/lib/system/libsystem_networkextension.dylib

dyld: loaded: <FA85C044-99A5-352D-B7AD-45FB31B295FF> /usr/lib/system/libsystem_notify.dylib

dyld: loaded: <14136F56-3690-3346-90A0-31FC34DF3E1B> /usr/lib/system/libsystem_product_info_filter.dylib

dyld: loaded: <CABF63A0-DDAF-3A54-8447-1256DFFD2907> /usr/lib/system/libsystem_sandbox.dylib

dyld: loaded: <836B23E3-DF08-31C8-98AD-4A9B12A4B404> /usr/lib/system/libsystem_secinit.dylib

dyld: loaded: <FA7E835C-CB30-3D98-9331-30CE6584423D> /usr/lib/system/libsystem_kernel.dylib

dyld: loaded: <2CC11FAD-1E31-3533-B1D8-9CDDF5DFE595> /usr/lib/system/libsystem_platform.dylib

dyld: loaded: <BDC1C5DA-9499-3580-9588-2928DE2440DD> /usr/lib/system/libsystem_pthread.dylib

dyld: loaded: <0B4FC817-CC87-31F2-872B-BD505D29F5EE> /usr/lib/system/libsystem_symptoms.dylib

dyld: loaded: <7A6B4800-8D94-3091-AC78-2D6B97A9B496> /usr/lib/system/libsystem_trace.dylib

dyld: loaded: <2A01EF92-F92D-35F7-B638-8CBC6896DCAA> /usr/lib/system/libunwind.dylib

dyld: loaded: <0E990C5D-C4F7-304A-9714-4409647CC2EF> /usr/lib/system/libxpc.dylib

dyld: loaded: <3C5176E2-CE48-312B-97F6-23D4E7AFA43F> /usr/lib/libc++abi.dylib

dyld: loaded: <252C93CC-2D39-3C15-87F6-1336658B2F49> /usr/lib/libobjc.A.dylib

dyld: loaded: <6802DEC1-9ED5-3667-BFE0-3BDDE8BB40E1> /usr/lib/liboah.dylib

dyld: loaded: <BED05B96-CCAE-365A-B3F5-F8D72F5E77E1> /usr/lib/libc++.1.dylib

dyld: loaded: <0300C82B-7239-32FD-8A28-45A25D89EAAC> /usr/lib/libncurses.5.4.dylib

dyld: loaded: <D7690514-B69D-367E-AC47-59CE71FAF913> /opt/homebrew/lib/libmsodbcsql.17.dylib

dyld: loaded: <1FC1BD60-DC83-3CC7-89AC-D734DC18473A> /System/Library/Frameworks/CoreFoundation.framework/Versions/A/CoreFoundation

dyld: loaded: <098B4FDB-571F-364E-AEBD-B2EB52D8EE40> /opt/homebrew/lib/libodbcinst.2.dylib

dyld: loaded: <3E11D5D5-8F87-3FB4-94BB-CA4333C4C248> /System/Library/Frameworks/Kerberos.framework/Versions/A/Kerberos

dyld: loaded: <99E6BB0C-73CD-3239-942A-F6DD9325B90A> /usr/lib/libiconv.2.dylib

dyld: loaded: <F096DD26-38CB-3EC9-8FC1-2F8B11A0675D> /usr/lib/libfakelink.dylib

dyld: loaded: <987F240B-946D-3F96-AD1A-F3EF6752D5DB> /usr/lib/libicucore.A.dylib

dyld: loaded: <FA588B2E-82E9-3570-B6FE-D2AB5F2A3E28> /System/Library/PrivateFrameworks/SoftLinking.framework/Versions/A/SoftLinking

dyld: loaded: <FAB508B9-F108-3971-9651-2B30DD8871F1> /opt/homebrew/opt/libtool/lib/libltdl.7.dylib

dyld: loaded: <AB5318BC-CEAC-3178-848D-51F5CB486F0A> /System/Library/PrivateFrameworks/Heimdal.framework/Versions/A/Heimdal

dyld: loaded: <38B23856-B7E5-3AA2-9F35-F5ACECB8E5D9> /System/Library/Frameworks/Security.framework/Versions/A/Security

dyld: loaded: <F62274B4-1A51-35B7-8C5F-D57F20C2ADCE> /System/Library/Frameworks/GSS.framework/Versions/A/GSS

dyld: loaded: <7CC40013-93B4-3E9C-A96D-D2ABB02E9D2E> /System/Library/Frameworks/Kerberos.framework/Versions/A/Libraries/libHeimdalProxy.dylib

dyld: loaded: <3B3CE40D-33BF-351F-B539-ACD4AF8CDF2E> /usr/lib/libDiagnosticMessagesClient.dylib

dyld: loaded: <51614EB7-9B57-3F8F-9679-DDA22278CC9F> /usr/lib/libbsm.0.dylib

dyld: loaded: <1CF3457C-B1F3-3643-A404-E74EC9C587A0> /System/Library/Frameworks/Network.framework/Versions/A/Network

dyld: loaded: <A23D1D3A-AD28-3AC2-AEAF-53F4B7A5B2F5> /System/Library/Frameworks/Foundation.framework/Versions/C/Foundation

dyld: loaded: <382A3FF4-A00D-3E8A-8C7D-C4A511BBC2E3> /usr/lib/libheimdal-asn1.dylib

dyld: loaded: <287B0B90-55FD-3227-B5FD-256464AA2496> /usr/lib/libresolv.9.dylib

dyld: loaded: <9DDF924B-F7D9-3E7E-B2D0-27CF26767169> /System/Library/Frameworks/CFNetwork.framework/Versions/A/CFNetwork

dyld: loaded: <992E11C6-A4C3-344F-80F9-D49FC41F9EBB> /usr/lib/libnetwork.dylib

dyld: loaded: <CD2B73C6-DFF0-33DF-869F-E973F5AC74C1> /System/Library/PrivateFrameworks/ProtocolBuffer.framework/Versions/A/ProtocolBuffer

dyld: loaded: <842B3358-71DB-3219-9768-0A013DC08CEC> /usr/lib/libpcap.A.dylib

dyld: loaded: <57E2AA69-70BC-3BC5-90C2-4E6152B2A7BB> /usr/lib/libdns_services.dylib

dyld: loaded: <861ED733-56AF-311B-949E-DC077817E257> /System/Library/Frameworks/IOKit.framework/Versions/A/IOKit

dyld: loaded: <4838F5D2-C9BB-366A-9745-209A80BCC426> /usr/lib/libz.1.dylib

dyld: loaded: <AD8955CA-3D74-3B6F-89EB-EDCF21FCE5DE> /usr/lib/libcoretls_cfhelpers.dylib

dyld: loaded: <06587250-EE7C-36A1-8A78-C8409EB2ECCD> /usr/lib/libapple_nghttp2.dylib

dyld: loaded: <9175E063-EC99-3395-A576-2E7E8EFDB736> /usr/lib/libenergytrace.dylib

dyld: loaded: <9C25AE8F-59E2-3963-B645-025A7661A69A> /usr/lib/system/libkxld.dylib

dyld: loaded: <DA2C9DD8-0628-3EF3-85F6-66BF1B627D87> /System/Library/Frameworks/SystemConfiguration.framework/Versions/A/SystemConfiguration

dyld: loaded: <5C9A38A7-82B6-3A73-BD16-1D32C3B978C0> /usr/lib/libsqlite3.dylib

dyld: loaded: <961DF322-11B4-3E9C-A2D6-D96EB159E0F7> /usr/lib/libMobileGestalt.dylib

dyld: loaded: <BD464B37-0D4C-366B-8E29-21C5E3C4935E> /System/Library/PrivateFrameworks/AppleFSCompression.framework/Versions/A/AppleFSCompression

dyld: loaded: <AA6DCF55-441A-3474-BE7D-EC441DC8AF9F> /usr/lib/libcoretls.dylib

dyld: loaded: <8662B90D-5137-3BCC-BEC6-F7FEB6BD8F01> /usr/lib/libpam.2.dylib

dyld: loaded: <FC4663EB-83F1-35E6-B557-9D0F1F8EE4B5> /usr/lib/libxar.1.dylib

dyld: loaded: <5789DEAE-4BBD-3679-964B-40D6E208E8E8> /System/Library/PrivateFrameworks/CoreAutoLayout.framework/Versions/A/CoreAutoLayout

dyld: loaded: <6BCBE6BF-0CDD-3059-BBB9-45AF92D7EFA7> /usr/lib/libcompression.dylib

dyld: loaded: <03246747-F25B-3D05-B2E7-1BE69E878EF3> /System/Library/Frameworks/DiskArbitration.framework/Versions/A/DiskArbitration

dyld: loaded: <5F23CB65-ACED-364E-BD1D-E00247CD6FC7> /usr/lib/libarchive.2.dylib

dyld: loaded: <9C392F20-D487-3A66-93AD-87BA9D7E403E> /usr/lib/libxml2.2.dylib

dyld: loaded: <7CA890C2-3B87-3C10-B438-1AEB34A9E1BE> /System/Library/Frameworks/CoreServices.framework/Versions/A/CoreServices

dyld: loaded: <A0C40FB6-BAD2-3B06-AC12-7FCE295F2693> /usr/lib/liblangid.dylib

dyld: loaded: <A37CA396-A6B1-374B-8105-9D678B576B40> /usr/lib/libCRFSuite.dylib

dyld: loaded: <20EEA2A7-C813-3D16-879E-A21431E7E72D> /usr/lib/liblzma.5.dylib

dyld: loaded: <CAF8DA55-2A9E-3138-8177-62B54BF056D5> /usr/lib/libbz2.1.0.dylib

dyld: loaded: <7A25825A-D346-3BB8-AA3F-498510B5E31F> /usr/lib/libcharset.1.dylib

dyld: loaded: <BE1D6BE1-4CD0-3C40-BE95-C7971A139F59> /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/FSEvents.framework/Versions/A/FSEvents

dyld: loaded: <2D5028C9-5466-3020-B1E6-0ACD3B80AC24> /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/CarbonCore.framework/Versions/A/CarbonCore

dyld: loaded: <F83A2237-7C65-39C4-8D5F-EA3DF716F21E> /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/Metadata.framework/Versions/A/Metadata

dyld: loaded: <3B9B314C-8F7D-3058-9B89-6D4897868633> /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/OSServices.framework/Versions/A/OSServices

dyld: loaded: <ADDD7F0A-E78B-3845-BE64-74812504BE39> /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/SearchKit.framework/Versions/A/SearchKit

dyld: loaded: <DA0E3AF4-F378-32EC-9B9A-7C8EB3D18097> /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/AE.framework/Versions/A/AE

dyld: loaded: <DF1F4EEF-FCE9-32FB-9260-EF19407B965B> /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/LaunchServices

dyld: loaded: <2845ABAE-8FCB-38B0-8F57-72EB3A67CF63> /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/DictionaryServices.framework/Versions/A/DictionaryServices

dyld: loaded: <C1CE3C7D-F731-36A2-89FD-DCA13F5532DB> /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/SharedFileList.framework/Versions/A/SharedFileList

dyld: loaded: <95D7D1F7-7C6F-3517-9872-79FCCCCC9D69> /usr/lib/libCheckFix.dylib

dyld: loaded: <207AAC8A-1E0E-329F-B19E-BB443993C492> /System/Library/PrivateFrameworks/TCC.framework/Versions/A/TCC

dyld: loaded: <8D86FF1B-B90A-37FD-990D-CEA65FE35181> /System/Library/PrivateFrameworks/CoreNLP.framework/Versions/A/CoreNLP

dyld: loaded: <7EA4F807-3DEB-3B59-9112-B632641123EA> /System/Library/PrivateFrameworks/MetadataUtilities.framework/Versions/A/MetadataUtilities

dyld: loaded: <C4159121-0CA7-3C1F-AA81-1F6DD50E7E47> /usr/lib/libmecabra.dylib

dyld: loaded: <3C4B7923-366A-3F89-9BE2-00D7252F59A6> /System/Library/Frameworks/MLCompute.framework/Versions/A/MLCompute

dyld: loaded: <6CA149E0-61A2-3868-9ADF-A4AA815F3D24> /System/Library/Frameworks/Accelerate.framework/Versions/A/Accelerate

dyld: loaded: <FB4CDCDE-4B10-3664-AF49-0F12FC0CE8F3> /usr/lib/libmecab.dylib

dyld: loaded: <EA980CD3-55C6-3413-8798-1808E92B78FF> /usr/lib/libgermantok.dylib

dyld: loaded: <B12710F8-3816-3CC9-920A-66F44C426429> /usr/lib/libThaiTokenizer.dylib

dyld: loaded: <0D3892E7-FEA4-3161-BAD5-26B593210AA1> /usr/lib/libChineseTokenizer.dylib

dyld: loaded: <D61496E3-2074-3430-8148-A2B716155161> /System/Library/Frameworks/MetalPerformanceShaders.framework/Versions/A/MetalPerformanceShaders

dyld: loaded: <6F669C63-4630-3788-871F-E53E3E01E0E1> /System/Library/Frameworks/Metal.framework/Versions/A/Metal

dyld: loaded: <88CFC382-4A40-3339-A5F2-81FDA6D902B3> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vImage.framework/Versions/A/vImage

dyld: loaded: <372F4BDE-9AA6-3832-A25D-585683D7EFBA> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vecLib.framework/Versions/A/vecLib

dyld: loaded: <3ABB75F1-89E8-329F-9BF4-328E2E59B27F> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vecLib.framework/Versions/A/libvMisc.dylib

dyld: loaded: <5CB9D8BD-028D-318B-99F1-931F53997697> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vecLib.framework/Versions/A/libvDSP.dylib

dyld: loaded: <B69EAD26-E31A-375C-B49E-40B2D1DCC1B8> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vecLib.framework/Versions/A/libBLAS.dylib

dyld: loaded: <B6E903DD-87DD-31F3-BE53-B16ABAF99A7B> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vecLib.framework/Versions/A/libLAPACK.dylib

dyld: loaded: <B5918F65-A8A4-3527-9F97-8821CB3D4DC3> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vecLib.framework/Versions/A/libLinearAlgebra.dylib

dyld: loaded: <1FF666F8-7B71-378D-A890-A29032EC6AA4> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vecLib.framework/Versions/A/libSparseBLAS.dylib

dyld: loaded: <FADAC71C-799B-3E44-B16A-3A1B86AB5AB6> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vecLib.framework/Versions/A/libQuadrature.dylib

dyld: loaded: <68DE4998-AAF1-35A2-A2F8-28A2E0CBA48C> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vecLib.framework/Versions/A/libBNNS.dylib

dyld: loaded: <E96184A2-1D45-349D-B8E2-B4B405CBF348> /System/Library/Frameworks/Accelerate.framework/Versions/A/Frameworks/vecLib.framework/Versions/A/libSparse.dylib

dyld: loaded: <DC1CCB7D-A0FE-3704-8FD6-4983B59FF43B> /System/Library/Frameworks/MetalPerformanceShaders.framework/Versions/A/Frameworks/MPSCore.framework/Versions/A/MPSCore

dyld: loaded: <83375879-A492-3EC8-A57A-7630E7C12D33> /System/Library/Frameworks/MetalPerformanceShaders.framework/Versions/A/Frameworks/MPSImage.framework/Versions/A/MPSImage

dyld: loaded: <75A63926-9BBF-3FD7-AB8F-BAD7DFF3A881> /System/Library/Frameworks/MetalPerformanceShaders.framework/Versions/A/Frameworks/MPSNeuralNetwork.framework/Versions/A/MPSNeuralNetwork

dyld: loaded: <A7CE9CE6-808A-3B89-8733-9DE7F0CD857C> /System/Library/Frameworks/MetalPerformanceShaders.framework/Versions/A/Frameworks/MPSMatrix.framework/Versions/A/MPSMatrix

dyld: loaded: <FFDDAE0F-38B2-3156-8244-BF00CD822891> /System/Library/Frameworks/MetalPerformanceShaders.framework/Versions/A/Frameworks/MPSRayIntersector.framework/Versions/A/MPSRayIntersector

dyld: loaded: <15018D77-2512-3FB8-A170-4DF3DF5AF90D> /System/Library/Frameworks/MetalPerformanceShaders.framework/Versions/A/Frameworks/MPSNDArray.framework/Versions/A/MPSNDArray

dyld: loaded: <D864B42A-7F7B-3262-97CA-1D147DA6C6C3> /System/Library/PrivateFrameworks/MetalTools.framework/Versions/A/MetalTools

dyld: loaded: <6ACC766E-E6F9-3C00-8260-8DB708F1564B> /System/Library/Frameworks/IOSurface.framework/Versions/A/IOSurface

dyld: loaded: <CBCE1CFE-1A3B-3162-B9BD-91B53E3AED90> /System/Library/PrivateFrameworks/AggregateDictionary.framework/Versions/A/AggregateDictionary

dyld: loaded: <38259CAA-FC30-3B56-A371-3E6A6AC5D1CA> /System/Library/PrivateFrameworks/CoreAnalytics.framework/Versions/A/CoreAnalytics

dyld: loaded: <C6B913E9-6D8D-3C87-B7EA-05306C63587B> /System/Library/PrivateFrameworks/AppleSauce.framework/Versions/A/AppleSauce

dyld: loaded: <B372D123-5393-3F3A-8B1F-B438CEEF532E> /System/Library/PrivateFrameworks/IOAccelerator.framework/Versions/A/IOAccelerator

dyld: loaded: <DAADD744-04FC-31FD-BD25-5A41C5B2F7F0> /System/Library/Frameworks/OpenGL.framework/Versions/A/Libraries/libCoreFSCache.dylib

dyld: loaded: <30FA6080-7520-32BF-86BF-CD8AACD9E956> /System/Library/PrivateFrameworks/AppleSystemInfo.framework/Versions/A/AppleSystemInfo

dyld: loaded: <F28056C3-DCFF-39F7-9D00-19A03390EACB> /System/Library/PrivateFrameworks/IOMobileFramebuffer.framework/Versions/A/IOMobileFramebuffer

dyld: loaded: <DEEE1519-4778-3CA0-8578-35664E779408> /System/Library/PrivateFrameworks/LanguageModeling.framework/Versions/A/LanguageModeling

dyld: loaded: <F8C05982-DB94-37AA-84DF-891B2116EAAF> /System/Library/PrivateFrameworks/CoreEmoji.framework/Versions/A/CoreEmoji

dyld: loaded: <17E4D57B-5A70-3EC3-8BF5-82B80EFB3348> /System/Library/PrivateFrameworks/LinguisticData.framework/Versions/A/LinguisticData

dyld: loaded: <CC3E703E-8203-3D96-B8B1-F1C2944C1702> /System/Library/PrivateFrameworks/Lexicon.framework/Versions/A/Lexicon

dyld: loaded: <7E0DAF54-070D-3D42-B362-94B9138589CF> /usr/lib/libcmph.dylib

dyld: loaded: <254CB692-3AF0-387D-9EAD-AA72B7F34A59> /System/Library/Frameworks/OpenDirectory.framework/Versions/A/Frameworks/CFOpenDirectory.framework/Versions/A/CFOpenDirectory

dyld: loaded: <D63A543A-D51E-3CF6-A3EF-41675E2A830D> /System/Library/Frameworks/OpenDirectory.framework/Versions/A/OpenDirectory

dyld: loaded: <CB5718A9-BD52-377D-A53C-91EBEEA21E1E> /System/Library/PrivateFrameworks/APFS.framework/Versions/A/APFS

dyld: loaded: <A417FD02-C1CE-346E-B38B-CE81358B5A97> /System/Library/Frameworks/SecurityFoundation.framework/Versions/A/SecurityFoundation

dyld: loaded: <1650ED1F-F6F6-3018-8F7E-151162BF10E6> /usr/lib/libutil.dylib

dyld: loaded: <F728FF6C-02B2-31F4-8E05-41068E5E8CFB> /usr/lib/libapp_launch_measurement.dylib

dyld: loaded: <26E267F1-2A76-389C-9440-9F3EB0F2C1C0> /System/Library/PrivateFrameworks/CoreServicesStore.framework/Versions/A/CoreServicesStore

dyld: loaded: <E7EBA697-AEAD-3AF6-BCCD-A2BEC58537F4> /System/Library/Frameworks/ServiceManagement.framework/Versions/A/ServiceManagement

dyld: loaded: <0ADB40D6-F173-3865-A4DE-153889696ED5> /usr/lib/libxslt.1.dylib

dyld: loaded: <7BC12DCA-0109-39D5-B5DE-398520550D66> /System/Library/PrivateFrameworks/BackgroundTaskManagement.framework/Versions/A/BackgroundTaskManagement

dyld: loaded: <D2A10DEE-958D-30C0-AF1F-09DC40535ED3> /System/Library/PrivateFrameworks/CommonAuth.framework/Versions/A/CommonAuth

dyld: loaded: <2952D742-B261-3E05-953F-8CF6A244A907> /System/Library/CoreServices/Encodings/libTraditionalChineseConverter.dylib

dyld: loaded: <087A24AC-F2C5-3233-A752-28969CE0734B> /opt/homebrew/opt/openssl/lib/libssl.dylib

dyld: loaded: <6868589F-C8E1-3F53-91AC-5F329A30A309> /opt/homebrew/Cellar/openssl@3/3.0.0/lib/libcrypto.3.dylib

[ISQL]ERROR: Could not SQLDriverConnect
```


```c
      

(finlab) jarvis.zheng@zhengruichangdeMac-mini StockWeb % isql -v -k "DRIVER=ODBC Driver 17 for SQL Server;SERVER=localhost;UID=sa;PWD=2UauixdR" 

[08001][Microsoft][ODBC Driver 17 for SQL Server]SSL Provider: [OpenSSL library could not be loaded, make sure OpenSSL 1.0 or 1.1 is installed]

[08001][Microsoft][ODBC Driver 17 for SQL Server]Client unable to establish connection

[ISQL]ERROR: Could not SQLDriverConnect
```



`ln -s /opt/homebrew/Cellar/openssl@1.1/1.1.1l_1 /opt/homebrew/openssl`

最後無法解決OpenSSL library could not be loaded, make sure OpenSSL 1.0 or 1.1 is installed 這個問題