
#include <windows.h> // SHChangeNotify
#include <shlobj.h> // for SHGetSpecialFolderPathA

int main()
{
    SHFOLDERCUSTOMSETTINGS pfcs;
    pfcs.dwMask = "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\folderico-1629960936.ico";
    pfcs.pszIconFile = "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\folderico-1629960936.ico";
    pfcs.cchIconFile = 0;
    pfcs.iIconIndex = 0;
    PCWSTR pszPath = L"C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\test\\hey";
    SHGetSetFolderCustomSettings(pfcs, pszPath, FCS_FORCEWRITE);
}