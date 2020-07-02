const { app, BrowserWindow } = require('electron');
const prepareNext = require('electron-next');
const isDev = require('electron-is-dev');
const path = require('path');
const Store = require('electron-store');
const settings = new Store();
const port = 9393;

const devPath = `http://localhost:${port}/`;
const prodPath = path.resolve('renderer/out/index/index.html');
const entry = isDev ? devPath : 'file://' + prodPath;

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(entry);
}

app.whenReady().then(async () => {
    try {
        await prepareNext('./renderer', port);
        createWindow();
    } catch (err) {
        console.log(err);
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
