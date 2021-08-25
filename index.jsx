const {
  BrowserWindow,
  app,
  ipcMain,
  protocol,
  remote,
  ipcRenderer,
} = require("electron");
const fs = require("fs");
const { Ico, IcoImage } = require("@fiahfy/ico");
const Jimp = require("jimp");
const fswin = require("fswin");
const winattr = require("winattr");

let mainWindow, exePath, folderPath;

function simpleStringify(object) {
  var simpleObject = {};
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] == "object") {
      continue;
    }
    if (typeof object[prop] == "function") {
      continue;
    }
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
}

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

  // mainWindow.loadURL("https://donate.hafonton.co.il");
  mainWindow.loadFile(`${__dirname}/app/index.html`);

  // mainWindow.webContents.on('did-finish-load', function() {
  //     if (filepath) {
  //         mainWindow.webContents.send('open-file', filepath);
  //         filepath = null;
  //     }
  // });

  // app.getAppPath()

  mainWindow.webContents.on("did-finish-load", function () {
    exePath = process.argv[0];
    folderPath = process.argv[1];
    mainWindow.webContents.send("paths", { exePath, folderPath });
  });
}

// read the file and send data to the render process
// ipcRenderer.on('get-file-data', function(event) {
//   var data = null;
//   if (process.platform == 'win32' && process.argv.length >= 2) {
//     var openFilePath = process.argv[1];
//     mainWindow.webContents.send("folder:path", openFilePath);
//     // data = fs.readFileSync(openFilePath, 'utf-8');
//   }
//   event.returnValue = data;
// });

app.on("open-file", (e, path) => {
  console.log("path", path);
  mainWindow.webContents.send("folder:path", path);
});

app.on("ready", createMainWindow);

ipcMain.on("image:iconize", async (e, data) => {
  // console.log("data", data.imageBase64);
  const buf = Buffer.from(data.imageBase64, "base64"); // Ta-da

  const ico = new Ico();
  // let originalBuffer;

  // originalBuffer = fs.readFileSync("Video call snapshot 37.png");
  // originalBuffer = fs.readFileSync("img.jpg");

  Jimp.read(buf)
    .then(async (image) => {
      // Do stuff with the image.
      let resizedImage = image
        .scaleToFit(256, 256) // resize
        .quality(60) // set JPEG quality
        .contain(
          256,
          256,
          Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
        );

      // resizedImage.write("asd.png");

      resizedImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        console.log('buffer', buffer);
        image = IcoImage.fromPNG(buffer);
        ico.append(image);

        // buffer = fs.readFileSync("img2.png");
        // image = IcoImage.fromPNG(buffer);
        // ico.append(image);

        /* Some other PNG files */


        const timestamp = Math.floor(Date.now() / 1000);

        const iconFileName = `folderico-${timestamp}.ico`;

        // console.log('folderPath', folderPath);
        // winattr.get(folderPath, (err, attrs) => {
        //   if (err == null) {
        //     console.log(attrs);
        //   } else {
        //     console.log("error", err);
        //   }
        // });
        // winattr.setSync(folderPath, { archive: true, hidden: true, system: true });
        // winattr.get(folderPath, (err, attrs) => {
        //   if (err == null) {
        //     console.log(attrs);
        //   } else {
        //     console.log("error", err);
        //   }
        // });

        // fs.writeFileSync(`${folderPath}\\${iconFileName}`, ico.data);

        // fswin.setAttributesSync(`${folderPath}\\${iconFileName}`, {
        //   IS_HIDDEN: false,
        // });
        fs.writeFileSync(`${folderPath}\\${iconFileName}`, ico.data);
        winattr.get(`${folderPath}\\${iconFileName}`, (err, attrs) => {
          if (err == null) {
            console.log(attrs);
          } else {
            console.log("error", err);
          }
        });
        winattr.setSync(`${folderPath}\\${iconFileName}`, { archive: true, hidden: true, system: true });
        winattr.get(`${folderPath}\\${iconFileName}`, (err, attrs) => {
          if (err == null) {
            console.log(attrs);
          } else {
            console.log("error", err);
          }
        });
        // fswin.setAttributesSync(`${folderPath}\\${iconFileName}`, {
        //   IS_HIDDEN: true,
        // });

        const desktopIniData = `[.ShellClassInfo]
IconResource=${iconFileName},0`;
        // fswin.setAttributesSync(`${folderPath}\\desktop.ini`, {
        //   IS_HIDDEN: false,
        // });
        fs.writeFileSync(`${folderPath}\\desktop.ini`, desktopIniData);
        winattr.setSync(`${folderPath}\\desktop.ini`, { archive: true, hidden: true, system: true });
        // fswin.setAttributesSync(`${folderPath}\\desktop.ini`, {
        //   IS_HIDDEN: true,
        // });
      });
    })
    .catch((err) => {
      // Handle an exception.
    });
});
