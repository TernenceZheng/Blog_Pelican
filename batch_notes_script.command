#!/bin/bash

cd /Users/jarvis.zheng/Blog_Pelican/

conda activate pelican

pelican content

git add .

git commit -m " git PUSH Pelican 頁面 "

git push git@github.com:TernenceZheng/Blog_Pelican.git master

echo "Blog發佈完成"