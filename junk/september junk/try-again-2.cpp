
#include <windows.h> // SHChangeNotify

#include <iostream> // cout
using namespace std;

#include <ShlObj.h> // FindFirstChangeNotificationA

#include <shtypes.h>
#include <shobjidl.h>

// how to locate application data %AppData% directory path on Windows 10 MSVC
// see on documentation https://docs.microsoft.com/en-us/windows/win32/api/shlobj_core/nf-shlobj_core-shgetknownfolderpath?redirectedfrom=MSDN
// compiled with  cl .\appdata.c Shell32.lib

#include <stdlib.h>
#include <netlistmgr.h>
#include <stdio.h>
#include <direct.h>
#include <shlobj.h> // for SHGetSpecialFolderPathA


const char iconPath[] = "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\desktop.ini";
const char folderPath[] = "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon";
const int iconIndex = 0;

int main()
{

    PFOLDERSETTINGS fcs = {0};
    fcs->dwSize = sizeof(PFOLDERSETTINGS);
    fcs->dwMask = FCSM_ICONFILE;
    fcs->pszIconFile = iconPath;
    fcs->cchIconFile = 0;
    fcs->iIconIndex = iconIndex;
    PFOLDERSETTINGS(&fcs, folderPath, FCS_FORCEWRITE);
}

// g++ -o try-again-2 try-again-2.cpp