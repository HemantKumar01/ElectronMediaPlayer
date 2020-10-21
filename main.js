const { app, BrowserWindow } = require('electron');
const fs = require('fs'); 
const path = require('path');
const url=require('url');
const {ipcMain} = require('electron');


function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1100,
    height: 650,
    frame:false,
    icon:'uninstallerIcon.ico',
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      webSecurity: false
    }
  });
   win.maximize();
   win.webContents.openDevTools()
  //shares argument list(made in the case of open with)
  global.sharedObject={prop1: process.argv}

  
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));




  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


