#!/bin/bash

cd /Users/jarvis.zheng/Blog_Pelican/

# 指定使用虛擬環境的python,需要指定絕對路徑
# 引數&符號表示後臺執行，如果配合.service執行則必須新增
/Users/jarvis.zheng/miniforge3/envs/Pelican/bin/python ObsidianToPelican.py

/Users/jarvis.zheng/miniforge3/envs/Pelican/bin/pelican content

git add.

git commit -m "ObsidianToPelican.py 排程同步"

git push git@github.com:TernenceZheng/Blog_Pelican.git master

echo "同步完成完成"