
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


int main()
{
    SHChangeNotify(SHCNE_DELETE, SHCNF_PATH, "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\desktop.ini", 0);
}