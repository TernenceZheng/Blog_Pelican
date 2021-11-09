#!/bin/bash

cd /Users/jarvis.zheng/Blog_Pelican/Pelican

/Users/jarvis.zheng/miniforge3/envs/Pelican/bin/pelican content

git --no-optional-locks -c color.branch=false -c color.diff=false -c color.status=false -c diff.mnemonicprefix=false -c core.quotepath=false -c credential.helper=sourcetree fetch origin 

git --no-optional-locks -c color.branch=false -c color.diff=false -c color.status=false -c diff.mnemonicprefix=false -c core.quotepath=false -c credential.helper=sourcetree pull origin master 

git add .

git commit -m " git PUSH Pelican 頁面 "

git push git@github.com:TernenceZheng/Blog_Pelican.git master

echo "Blog發佈完成"