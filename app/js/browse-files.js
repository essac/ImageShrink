//Node modules
const path = require('path');
const os = require('os');

//Electron Renderer
const {
    ispcRenderer, ipcRenderer
} = require('electron');

//Form Elements
const image = document.querySelector('#image');
const imageName = document.querySelector('#image-name');
const form = document.getElementById('image-form');
const slider = document.getElementById('slider');

image.addEventListener('change', (e) =>
    imageName.innerText = image.files[0].name
);

document.getElementById('alert').innerHTML = path.join(
    os.homedir(),
    'imageshrink'
);

//On Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const imgPath = image.files[0].path;
    const quality = slider.value;

    ipcRenderer.send('image:minimize', {
        imgPath,
        quality,
    });
});