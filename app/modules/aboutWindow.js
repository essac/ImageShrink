const {
    BrowserWindow
} = require('electron');

createAboutWindow = () => {
    aboutWindow = new BrowserWindow({
        title: ' About ImageShrink',
        width: 300,
        height: 300,
        icon: `./assets/icons/Icon_128x128.png`,
        resizable: false,
        backgroundColor: 'white',
    })

    aboutWindow.loadFile('./app/about.html')

    return aboutWindow;
}

module.exports = {
    createAboutWindow
};