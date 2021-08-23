const { BrowserWindow, app, ipcMain } = require("electron");
const fs = require("fs");
const { Ico, IcoImage } = require("@fiahfy/ico");
const Jimp = require("jimp");

let mainWindow;

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
}

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

      resizedImage.write("asd.png");

      resizedImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        console.log(buffer);
        image = IcoImage.fromPNG(buffer);
        ico.append(image);

        // buffer = fs.readFileSync("img2.png");
        // image = IcoImage.fromPNG(buffer);
        // ico.append(image);

        /* Some other PNG files */

        fs.writeFileSync("icon.ico", ico.data);
      });
    })
    .catch((err) => {
      // Handle an exception.
    });
});
