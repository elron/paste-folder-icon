@echo off
cd /d %userprofile%\AppData\Local\Microsoft\Windows\Explorer
@REM taskkill /f /im explorer.exe
attrib -h iconcache_*.db
del iconcache_*.db /a
attrib -h thumbcache_*.db
del thumbcache_*.db /a
@REM start explorer
exit