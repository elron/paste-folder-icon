const { BrowserWindow, app, ipcMain } = require("electron");
const fs = require("fs");
const { Ico, IcoImage } = require("@fiahfy/ico");
const Jimp = require("jimp");
const winattr = require("winattr");
const path = require("path");

let mainWindow, exePath, folderPath;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "FolderIcon.io",
    width: 470,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    alwaysOnTop: true,
    autoHideMenuBar: true,
    resizable: false,
    icon: "./app/images/favicon/favicon4@512x.png",
  });

  mainWindow.loadFile(`${__dirname}/app/index.html`);

  mainWindow.webContents.on("did-finish-load", function () {
    exePath = process.argv[0];
    folderPath = process.argv[1];
    folderName = folderPath.split("\\").reverse()[0];
    mainWindow.webContents.send("paths", { exePath, folderPath, folderName });

    getCurrentFavicon();
  });
}

function getCurrentFavicon() {
  const desktopIniPath = path.join(folderPath, "/desktop.ini");

  const iconFileName = getIconFileNameFromDesktopIniPath(desktopIniPath);
  const iconPath = path.join(folderPath, iconFileName);

  console.log("iconPath", iconPath);

  const buffer = fs.readFileSync(iconPath);
  mainWindow.webContents.send("currenticon:get", buffer);
}

app.on("open-file", (e, path) => {
  console.log("path", path);
  mainWindow.webContents.send("folder:path", path);
});

app.on("ready", createMainWindow);

function getIconFileNameFromDesktopIniPath(path) {
  const desktopIniData = fs.readFileSync(path, "utf8");
  const iconFileName = desktopIniData.match(/IconResource=(.*)\,/)[1];
  console.log("iconFileName", iconFileName);
  return iconFileName;
}

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
            const oldIcoFile = getIconFileNameFromDesktopIniPath(
              `${folderPath}\\desktop.ini`
            );

            fs.unlinkSync(`${folderPath}\\${oldIcoFile}`);
            console.log("finished removing old icon");
          } catch (error) {}
          try {
            fs.unlinkSync(`${folderPath}\\desktop.ini`);
            console.log("finished removing desktop.ini");
          } catch (error) {}

          // setTimeout(() => {
          console.log("new icon!");
          // Set up the container folder
          winattr.setSync(folderPath, { readonly: true });
          console.log("done sync folderpath");

          // Write .ico file
          const timestamp = Math.floor(Date.now() / 1000);
          const iconFileName = `foldericon-${timestamp}.ico`;
          fs.writeFileSync(`${folderPath}\\${iconFileName}`, ico.data);
          console.log("done sync icon");
          // Set attributes
          winattr.setSync(`${folderPath}\\${iconFileName}`, {
            archive: false,
            hidden: true,
            system: true,
          });
          console.log("done sync icon properties");

          // Write desktop.ini
          const desktopIniData = `[.ShellClassInfo]\n\rIconResource=${iconFileName},0`;
          try {
            fs.writeFileSync(`${folderPath}\\desktop.ini`, desktopIniData);
          } catch (error) {
            console.log(error);
          }
          console.log("done sync desktop.ini");
          // Set attributes
          // Set attributes
          winattr.setSync(`${folderPath}\\desktop.ini`, {
            archive: false,
            hidden: true,
            system: true,
          });
          console.log("done");

          const absoluteFolderPath =
            folderPath === "." ? __dirname : folderPath;

          const { exec } = require("child_process");
          const refreshExePath = path.join(__dirname, "FolderIco", "FolderIco");
          console.log("exe", refreshExePath);
          exec(
            `"${refreshExePath}"  --folder "${absoluteFolderPath}" --repair --recursively`,
            (err, stdout, stderr) => {
              if (err) {
                // node couldn't execute the command
                return;
              }

              // the *entire* stdout and stderr (buffered)
              console.log(`stdout: ${stdout}`);
              console.log(`stderr: ${stderr}`);
            }
          );

          console.log("after execution");
          mainWindow.webContents.send("loading:end");
          // }, 5000);
        }
      });
    })
    .catch((err) => {
      // Handle an exception.
    });
});
