const {
    BrowserWindow
} = require('electron');

createMainWindow = (isDev) => {
    mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        center: true,
        fullscreenable: true,
        width: isDev ? 800 : 600,
        height: 600,
        icon: `./assets/icons/icon.png`,
        resizable: true,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true,
        }
    });

    if (isDev) mainWindow.webContents.openDevTools();

    mainWindow.loadFile('./app/index.html');

    return mainWindow;
}

module.exports = {
    createMainWindow
}