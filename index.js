const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');
const web = express();
const port = 9393;
function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL('http://localhost:9393/')
}
web.use(express.json());
web.use(express.static(`${__dirname}/app`));
web.use('/node_modules', express.static(`${__dirname}/node_modules`));

web.get('/', (req, res) => {
    res.sendFile(`${__dirname}/app/login.html`);
});

web.listen(port, () => {
    console.log("Listening...");
});

app.whenReady().then(createWindow);

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
