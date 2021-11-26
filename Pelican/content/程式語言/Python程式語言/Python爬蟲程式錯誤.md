---
title: Python爬蟲程式錯誤
date: 2021-11-25 23:04
modified: 2021-11-25 23:04
aliases: 部落格 
tags: ConnectionResetError
category: Python
slug: python-crawler-error
summary: ConnectionResetError(54,'Connection reset by peer'))
image: /images/default_preview_image.jpg
status: published
---

[TOC]

## 錯誤發生的Traceback

```python

      

Traceback (most recent call last):

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py", line 438, in _error_catcher

 yield

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py", line 767, in read_chunked

 chunk = self._handle_chunk(amt)

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py", line 711, in _handle_chunk

 value = self._fp._safe_read(amt)

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/http/client.py", line 625, in _safe_read

 chunk = self.fp.read(min(amt, MAXAMOUNT))

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/socket.py", line 704, in readinto

 return self._sock.recv_into(b)

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/ssl.py", line 1241, in recv_into

 return self.read(nbytes, buffer)

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/ssl.py", line 1099, in read

 return self._sslobj.read(len, buffer)

ConnectionResetError: [Errno 54] Connection reset by peer

  

During handling of the above exception, another exception occurred:

  

Traceback (most recent call last):

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/models.py", line 753, in generate

 for chunk in self.raw.stream(chunk_size, decode_content=True):

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py", line 572, in stream

 for line in self.read_chunked(amt, decode_content=decode_content):

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py", line 793, in read_chunked

 self._original_response.close()

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/contextlib.py", line 137, in __exit__

 self.gen.throw(typ, value, traceback)

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/urllib3/response.py", line 455, in _error_catcher

 raise ProtocolError("Connection broken: %r" % e, e)

urllib3.exceptions.ProtocolError: ("Connection broken: ConnectionResetError(54, 'Connection reset by peer')", ConnectionResetError(54, 'Connection reset by peer'))

  

During handling of the above exception, another exception occurred:

  

Traceback (most recent call last):

 File "/Users/jarvis.zheng/FileSource/batch_stock.py", line 60, in <module>

 auto_update('otc_cap_reduction', crawl_otc_cap_reduction)

 File "/Users/jarvis.zheng/FileSource/batch_stock.py", line 47, in auto_update

 df = crawl_function()

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/finlab/crawlers/api.py", line 454, in crawl_otc_cap_reduction

 res4 = requests_get(urs_crawl_otc_cap_reduction)

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/finlab/crawlers/helper.py", line 363, in requests_get

 return ses.get(*args1, timeout=10, **args2)

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/sessions.py", line 555, in get

 return self.request('GET', url, **kwargs)

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/sessions.py", line 542, in request

 resp = self.send(prep, **send_kwargs)

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/sessions.py", line 697, in send

 r.content

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/models.py", line 831, in content

 self._content = b''.join(self.iter_content(CONTENT_CHUNK_SIZE)) or b''

 File "/Users/jarvis.zheng/miniforge3/envs/finlab/lib/python3.9/site-packages/requests/models.py", line 756, in generate

 raise ChunkedEncodingError(e)

requests.exceptions.ChunkedEncodingError: ("Connection broken: ConnectionResetError(54, 'Connection reset by peer')", ConnectionResetError(54, 'Connection reset by peer'))


```

---
## 問題原因

參考：

> [帶有請求模塊的 ConnectionResetError 在異常內部引發異常，使程序崩潰](https://stackoverflow.com/questions/59851207/connectionreseterror-with-requests-module-raises-exception-inside-of-exception)


由參考的資訊來看，我的發生也是依序發生

 1. ConnectionResetError: [Errno 54] Connection reset by peer
 2. urllib3.exceptions.ProtocolError: ("Connection broken: ConnectionResetError(54, 'Connection reset by peer')", ConnectionResetError(54, 'Connection reset by peer'))
 3. requests.exceptions.ChunkedEncodingError: ("Connection broken: ConnectionResetError(54, 'Connection reset by peer')", ConnectionResetError(54, 'Connection reset by peer'))

由第三點的說明來看，是連線已經中斷了，而導致程式Crash，原本的程式在request的寫法

```python
try:
	return ses.get(*args1, timeout=10, **args2)
except (ConnectionError, ReadTimeout) as error:
	print(error)
	ses = function()
```


看來只有ConnectionError或Timeout才會被忽略，再新增`ConnectionResetError` 再來觀察看看連線中斷的問題，避免程式因為斷線而Crash，在except內再重新request

