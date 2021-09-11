@echo off
for /r %%I in (*.ico) do (
    attrib -h -s -r "%temp%\desktop.ini" >nul
    (
        echo [.ShellClassInfo]
        echo IconResource="%%~nxI",0
    )>"%temp%\desktop.ini"
    attrib +h +s "%temp%\desktop.ini"
    (
        echo set shell = CreateObject^("Shell.Application"^)
        echo set folder = shell.NameSpace^("%%~dpI"^)
        echo folder.MoveHere "%temp%\desktop.ini", 4+16+1024
    )>"%temp%\updateIcon.vbs"
    cscript //nologo //b "%temp%\updateIcon.vbs"
)
pause