const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const {ipcMain} = require("electron");
// const {PosPrinter} = require('electron-pos-printer');
// const fs = require("fs");

let mainWindow;
let child;

function createWindow() {
  mainWindow = new BrowserWindow({ 
    width: 900, 
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '/preload.js'),
      enableRemoteModule: true,
      devTools: isDev,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
  mainWindow.setResizable(true);
  mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.focus();

  child = new BrowserWindow({
    width: 340, 
    height: 180, 
    frame: false, 
    type:"notification",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '/preload.js'),
    }
  });
  // child.setIgnoreMouseEvents(true);
  child.setAlwaysOnTop(true);
  child.setPosition(electron.screen.getPrimaryDisplay().bounds.width-210, electron.screen.getPrimaryDisplay().bounds.height-60);
  child.loadURL(
    `file://${path.join(__dirname, "/getMsg.html")}`
  );
  child.isResizable(false);
  child.hide();
}

app.on("ready", createWindow);

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
ipcMain.on('msgReceive', (event, data) => {
  if(mainWindow.isFocused() === false){
    child.reload();
    child.webContents.on('did-finish-load', () => {
      child.webContents.send("requestMsg",data);
      child.show();
    });
  } else {
    child.reload();
    child.webContents.on('did-finish-load', () => {
      child.webContents.send("requestMsg",data);
    })
  }
});
ipcMain.on('hideChild', (event, data) => {
  child.hide();
});
ipcMain.on('openMainWindow', () => {
  mainWindow.show();
  child.hide();
})
// ipcMain.on('print', (event) => {
//   console.log('print');
//   console.log(mainWindow.webContents.getPrinters())
//   const options = {
//     preview: false,               // Preview in window or print
//     width: '170px',               //  width of content body
//     margin: '0 0 0 0',            // margin of content body
//     copies: 1,                    // Number of copies to print
//     printerName: 'EPSON_L6190_Series',        // printerName: string, check with webContent.getPrinters()
//     timeOutPerLine: 400,
//     pageSize: { height: 301000, width: 71000 }
//   }
//   const data = [
//     {
//       type: 'table',
//       // style the table
//       style: 'border: 1px solid #ddd',
//       // list of the columns to be rendered in the table header
//       tableHeader: ['Animal', 'Age'],
//       // multi dimensional array depicting the rows and columns of the table body
//       tableBody: [
//           ['Cat', 2],
//           ['Dog', 4],
//           ['Horse', 12],
//           ['Pig', 4],
//       ],
//       // list of columns to be rendered in the table footer
//       tableFooter: ['Animal', 'Age'],
//       // custom style for the table header
//       tableHeaderStyle: 'background-color: #000; color: white;',
//       // custom style for the table body
//       tableBodyStyle: 'border: 0.5px solid #ddd',
//       // custom style for the table footer
//       tableFooterStyle: 'background-color: #000; color: white;',
//    }
//   ]
//   PosPrinter.print(data, options)
//     .then(() => {})
//     .catch((error) => {
//       console.error(error);
//     });
// })