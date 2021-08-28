const { BrowserWindow, app, ipcMain } = require("electron");
const fs = require("fs");
const { Ico, IcoImage } = require("@fiahfy/ico");
const Jimp = require("jimp");
const winattr = require("winattr");

let mainWindow, exePath, folderPath;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "FolderIcon.io",
    width: 500,
    height: 460,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    alwaysOnTop: true,
    autoHideMenuBar: true,
    resizable: false,
  });

  mainWindow.loadFile(`${__dirname}/app/index.html`);

  mainWindow.webContents.on("did-finish-load", function () {
    exePath = process.argv[0];
    folderPath = process.argv[1];
    folderName = folderPath.split('\\').reverse()[0];
    mainWindow.webContents.send("paths", { exePath, folderPath, folderName });
  });
}

app.on("open-file", (e, path) => {
  console.log("path", path);
  mainWindow.webContents.send("folder:path", path);
});

app.on("ready", createMainWindow);

ipcMain.on("image:iconize", async (e, data) => {
  const buf = Buffer.from(data.imageBase64, "base64");
  const ico = new Ico();

  Jimp.read(buf)
    .then(async (image) => {
      let resizedImage = image
        .scaleToFit(256, 256)
        .quality(60)
        .contain(
          256,
          256,
          Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
        );

      resizedImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        console.log("buffer", buffer);
        image = IcoImage.fromPNG(buffer);
        ico.append(image);

        if (folderPath) {
          // restart, remove old desktop.ini and old .ico
          winattr.setSync(folderPath, { readonly: false, system: false });
          try {
            const desktopIniData = fs.readFileSync(
              `${folderPath}\\desktop.ini`,
              "utf8"
            );
            const oldIcoFile = desktopIniData.match(/IconResource=(.*)\,/)[1];
            console.log("oldIcoFile", oldIcoFile);
            fs.unlinkSync(oldIcoFile);
          } catch (error) {}
          try {
            // fs.unlinkSync("desktop.ini");
          } catch (error) {}
          console.log("finished removing");

          // setTimeout(() => {
          console.log("new icon!");
          // Set up the container folder
          winattr.setSync(folderPath, { readonly: true, system: false });

          // Write .ico file
          const timestamp = Math.floor(Date.now() / 1000);
          const iconFileName = `folderico-${timestamp}.ico`;
          try {
            winattr.setSync(`${folderPath}\\${iconFileName}`, {
              archive: false,
              hidden: false,
              system: false,
            });
          } catch (error) {}
          fs.writeFileSync(`${folderPath}\\${iconFileName}`, ico.data);
          // Set attributes
          winattr.setSync(`${folderPath}\\${iconFileName}`, {
            archive: true,
            hidden: true,
            system: true,
          });

          // Write desktop.ini
          const desktopIniData = `[.ShellClassInfo]\n\rIconResource=${iconFileName},0`;
          try {
            winattr.setSync(`${folderPath}\\desktop.ini`, {
              archive: false,
              hidden: false,
              system: false,
            });
          } catch (error) {}
          fs.writeFileSync(`${folderPath}\\desktop.ini`, desktopIniData);
          // Set attributes
          winattr.setSync(`${folderPath}\\desktop.ini`, {
            archive: true,
            hidden: true,
            system: true,
          });
          console.log("done");

          //myNodeFile.js
          const { exec } = require("child_process");
          exec("./refresh-folder-icons", (error, stdout, stderr) =>
            console.log(stdout)
          );
          console.log('after execution');
          mainWindow.webContents.send("loading:end");
          // }, 5000);
        }
      });
    })
    .catch((err) => {
      // Handle an exception.
    });
});
