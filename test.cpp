#ifndef UNICODE
#define UNICODE
#endif 

#include <windows.h>
#include <iostream>
using  namespace std; // …

// DWORD GetFileAttributesA(
//   LPCSTR lpFileName='C:\\Users'
// );

// int main() {
//   cout << "asd";
// }
int main()
{
  cout << GetFileAttributesA("C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\test\\test");
}

// int main()
// {
//   GetFileAttributesA('C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\test\\test');
//   return 3;
// }

// int main() {
//   cout << "Hello World!";
//   return 0;
// }
// int main() {
//   cout << "Hello World!";
//   return 0;
// }
