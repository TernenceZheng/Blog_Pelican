#!/bin/bash

cd /Users/jarvis.zheng/Blog_Pelican/Pelican

/Users/jarvis.zheng/miniforge3/envs/Pelican/bin/pelican content
git pull git@github.com:TernenceZheng/Blog_Pelican.git master

git add .

git commit -m " git PUSH Pelican 頁面 "

git push git@github.com:TernenceZheng/Blog_Pelican.git master

echo "Blog發佈完成"