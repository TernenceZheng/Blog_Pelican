import shutil

obsidian_path = "/Users/jarvis.zheng/ObsidanNote/隨手筆記"

pelican_path = "/Users/jarvis.zheng/Blog_Pelican/Pelican/content"

#整份資料夾複製
shutil.rmtree(pelican_path)
shutil.copytree(obsidian_path,pelican_path)

#移除 工作，筆記模板
shutil.rmtree("/Users/jarvis.zheng/ObsidanNote/隨手筆記/工作")
shutil.rmtree("/Users/jarvis.zheng/ObsidanNote/隨手筆記/筆記模板")