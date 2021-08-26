#include <stdio.h>
#include <Windows.h>
#include <winbase.h>
#include <Tchar.h>
#include <shlobj.h> // for SHGetSpecialFolderPathA


const char folderpath[] = "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon";

int main()
{
    // rename("C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\desktop.ini", "desktop-temp.ini");

    if (MoveFile(_T("C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\desktop.ini"), _T("desktop-temp.ini")))
    {
        printf("succeeded\n");
    }
    else
    {
        printf("Error %d\n", GetLastError());
    }

    SHChangeNotify(SHCNE_ALLEVENTS, SHCNF_NOTIFYRECURSIVE, NULL, NULL);
    SHChangeNotify(SHCNE_ALLEVENTS, SHCNF_NOTIFYRECURSIVE, folderpath, NULL);

    if (MoveFile(_T("C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\desktop-temp.ini"), _T("desktop.ini")))
    {
        printf("succeeded\n");
    }
    else
    {
        printf("Error %d\n", GetLastError());
    }

    SHChangeNotify(SHCNE_ALLEVENTS, SHCNF_NOTIFYRECURSIVE, NULL, NULL);
    SHChangeNotify(SHCNE_ALLEVENTS, SHCNF_NOTIFYRECURSIVE, folderpath, NULL);
}
