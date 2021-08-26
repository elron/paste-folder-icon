#include <windows.h> // SHChangeNotify

#include <iostream> // cout
using namespace std;

#include <ShlObj.h>  // FindFirstChangeNotificationA
#include <WinUser.h> // SendNotifyMessage

int main()
{
  SendNotifyMessage(HWND_BROADCAST, SHCNF_IDLIST, NULL, NULL);
  SendMessageTimeout(HWND_BROADCAST, WM_SETTINGCHANGE, NULL, NULL, SMTO_ABORTIFHUNG, 100, NULL);
  SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_IDLIST, NULL, NULL);

  cout << FindFirstChangeNotificationA("C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\test", FALSE, FILE_NOTIFY_CHANGE_ATTRIBUTES);
}
