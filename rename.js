import fs from "fs";

fs.rename("desktop.ini", "desktop-temp.ini", function (err) {
    if (err) console.log("ERROR: " + err);
  });

  fs.rename("desktop.ini", "desktop.ini", function (err) {
    if (err) console.log("ERROR: " + err);
  });
    