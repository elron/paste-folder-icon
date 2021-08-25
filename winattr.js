const winattr = require("winattr");

const path =
  "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\design\\test\\asd";
// console.log("path", path);

// winattr.get(".", (err, attrs) => {
//   if (err == null) {
//     console.log(attrs);
//   } else {
//     console.log("error", err);
//   }
// });
// winattr.setSync('desktop.ini', {system:true});
// winattr.setSync('folderico-1629907362.ico', {system:true});
// winattr.get("", (err, attrs) => {
//   if (err == null) {
//     console.log(attrs);
//   } else {
//     console.log("error", err);
//   }
// });
// const path2 = `C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\test\\alohaa`;
const path2 = `C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon`;
winattr.get(path2, (err, attrs) => {
  if (err == null) {
    console.log(attrs);
  } else {
    console.log("error", err);
  }
});

//   winattr.get(path, (err, attrs) => {
//     if (err == null) {
//       console.log(attrs);
//     } else {
//       console.log("error", err);
//     }
//   });

// winattr.setSync('system/', {system:true});

// winattr.get("system/", (err, attrs) => {
//   if (err == null) {
//     console.log(attrs);
//   } else {
//     console.log("error", err);
//   }
// });
