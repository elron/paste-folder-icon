#include <windows.h> // SHChangeNotify

#include <iostream> // cout
using namespace std;

#include <ShlObj.h>  // FindFirstChangeNotificationA
#include <WinUser.h> // SendNotifyMessage

int main()
{
  // SendNotifyMessage(HWND_BROADCAST, SHCNF_IDLIST, NULL, NULL);
  // SendMessageTimeout(HWND_BROADCAST, WM_SETTINGCHANGE, NULL, NULL, SMTO_ABORTIFHUNG, 100, NULL);
  // SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_IDLIST, NULL, NULL);

  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATHW, "blah", NULL);
  // SHChangeNotify(SHCNE_DELETE, SHCNF_PATH, "D:\\test\\desktop.ini", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATH, "D:\\test", NULL);
  // SHChangeNotify(SHCNE_DELETE, SHCNF_PATHW, "D:\\test\\desktop.ini", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATHW, "", NULL);
  // SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_PATHW, "", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATHW, "D:\\test", NULL);
  // SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_PATHW, "D:\\test", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATHW, "D:\\test\\desktop.ini", NULL);
  // SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_PATHW, "D:\\test\\desktop.ini", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATHW, "D:", NULL);
  // SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_PATH, "D:", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATH, "", NULL);
  // SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_PATH, "", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATH, "D:\\test", NULL);
  // SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_PATH, "D:\\test", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATH, "D:\\test\\desktop.ini", NULL);
  // SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_PATH, "D:\\test\\desktop.ini", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATH, "D:", NULL);
  // SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_PATH, "D:", NULL);
  // // SHChangeNotify(0x8000000, SHCNF_FLUSH, NULL, NULL);
  // SHChangeNotify(SHCNE_GLOBALEVENTS, SHCNF_FLUSHNOWAIT, NULL, NULL);
  // SHChangeNotify(SHCNE_DELETE, SHCNF_PATH, "D:\\test\\desktop.ini", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATH, fullpath, NULL);

  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATHW, "D:\\test\\desktop.ini", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATHW, ".\\desktop.ini", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATHW, "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\desktop.ini", NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATHW, "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon", NULL);

  SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_IDLIST, NULL, NULL);
  // SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_IDLIST, NULL, NULL);
  // SHChangeNotify(SHCNE_UPDATEITEM, SHCNF_PATH, "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon", NULL);
  cout << "done 15";
  cout << FindFirstChangeNotificationA("C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\desktop.ini", FALSE, FILE_NOTIFY_CHANGE_ATTRIBUTES);
}
