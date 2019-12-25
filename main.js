const { app, BrowserWindow } = require("electron");
const path = require("path");

require("electron-reload");

let mainWindow = null;

function initialize() {
  makeSingleInstance();

  function createWindow() {
    const windowOptions = {
      frame: false,
      webPreferences: {
        nodeIntegration: true
      }
    };

    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL(path.join("file://", __dirname, "/index.html"));
    //mainWindow.maximize();
    mainWindow.setFullScreen(false);
    mainWindow.webContents.openDevTools(true);

    mainWindow.on("closed", () => {
      mainWindow = null;
    });
  }

  app.on("ready", () => {
    createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

function makeSingleInstance() {
  app.requestSingleInstanceLock();

  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

initialize();
