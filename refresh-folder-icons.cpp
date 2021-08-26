#include <windows.h> // SHChangeNotify

#include <iostream> // cout
using namespace std; 

#include <ShlObj.h> // FindFirstChangeNotificationA

int main()
{
  SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_IDLIST, NULL, NULL);
  cout << FindFirstChangeNotificationA("C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\test", FALSE, FILE_NOTIFY_CHANGE_ATTRIBUTES);
}
