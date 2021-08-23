const { BrowserWindow, app } = require("electron");




let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Paste Folder Icon",
    width: 500,
    height: 600,
  });

  // mainWindow.loadURL("https://donate.hafonton.co.il");
  mainWindow.loadFile(`${__dirname}/app/index.html`);
}

app.on("ready", createMainWindow);
