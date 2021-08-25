const { BrowserWindow, app, ipcMain } = require("electron");
const fs = require("fs");
const { Ico, IcoImage } = require("@fiahfy/ico");
const Jimp = require("jimp");
const winattr = require("winattr");

let mainWindow, exePath, folderPath;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Paste Folder Icon",
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(`${__dirname}/app/index.html`);

  mainWindow.webContents.on("did-finish-load", function () {
    exePath = process.argv[0];
    folderPath = process.argv[1];
    mainWindow.webContents.send("paths", { exePath, folderPath });
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
          // Set up the container folder
          winattr.setSync(folderPath, { readonly: true, system: false });


          // Write .ico file
          const timestamp = Math.floor(Date.now() / 1000);
          const iconFileName = `folderico-${timestamp}.ico`;
          fs.writeFileSync(`${folderPath}\\${iconFileName}`, ico.data);
          // Set attributes
          winattr.setSync(`${folderPath}\\${iconFileName}`, {
            archive: true,
            hidden: true,
            system: true,
          });

          // Write desktop.ini
          const desktopIniData = `[.ShellClassInfo]\n\rIconResource=${iconFileName},0`;
          fs.writeFileSync(`${folderPath}\\desktop.ini`, desktopIniData);
          // Set attributes
          winattr.setSync(`${folderPath}\\desktop.ini`, {
            archive: true,
            hidden: true,
            system: true,
          });
        }
      });
    })
    .catch((err) => {
      // Handle an exception.
    });
});
