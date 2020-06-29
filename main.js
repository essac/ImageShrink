/* Node modules */
const path = require('path');
const os = require('os');

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron');

//Electron contextMenu
const contextMenu = require('electron-context-menu');

//Add zoomIn, ZoomOut and toggleDevTools to context menu
contextMenu({
    prepend: (params, browserWindow) => [{
        role: "zoomIn"
    }, {
        role: "zoomOut"
    }]
});

// Set and check environment
process.env.NODE_ENV = 'production'; // development | production
const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

// Window variables
let mainWindow;

// Create Window
const {
    createMainWindow
} = require('./app/modules/mainWindow');

// Create Menu and About Window
const {
    createMenu
} = require('./app/modules/menu');

// Compress Image
const {
    shrinkImage
} = require('./app/modules/shrink-image');

// Start Application
app.on('ready', () => {
    mainWindow = createMainWindow(isDev);
    mainWindow.on('close', () => (mainWindow = null));

    // Add Menu and About Window
    const menu = createMenu(isMac, isDev);
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

});

// Keep application open on Mac when closing window
app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});

// Make sure that a window exists when activating the application
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
        createMainWindow(isDev);
});

app.allowRendererProcessReuse = true;

// This main event calls the function that shrinks the image
// Gets options from the ipcRenderer.send call.
ipcMain.on('image:minimize', (e, options) => {
    options.dest = path.join(os.homedir(), 'imageshrink');
    shrinkImage(options);
});