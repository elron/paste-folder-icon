#include <windows.h>
#include <ShlObj.h>

const char folderPath[] = "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon";

int main()
{
    SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATH, folderPath, NULL);
    SHChangeNotify(SHCNE_ALLEVENTS, SHCNF_NOTIFYRECURSIVE, "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\desktop.ini", NULL);
}