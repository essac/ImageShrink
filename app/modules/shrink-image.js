//Electron
const {
    shell,
    ipcRenderer
} = require('electron');

//Image modules
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

//Slash - Path Assembler
const slash = require('slash');

module.exports = {
    shrinkImage: async ({
        imgPath,
        quality,
        dest
    }) => {
        try {
            const pngQuality = quality / 100

            const files = await imagemin([slash(imgPath)], {
                destination: dest,
                plugins: [
                    imageminMozjpeg({
                        quality
                    }),
                    imageminPngquant({
                        quality: [pngQuality, pngQuality],
                    }),
                ],
            })
            //Open the folder
            shell.openPath(dest)

        } catch (err) {
            //log.error(err)
        }
    },
}