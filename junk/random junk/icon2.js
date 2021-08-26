import fs from "fs";
import fswin from "fswin";

// console.log('__dirname', __dirname);
const path = "C:\\Users\\elron\\Elron Apps C\\005 Folder Icon\\paste-folder-icon\\design\\test\\asd";
console.log("path", path);
fs.writeFileSync(`${path}\\test.ini`, `hello~
how are you?`);

fswin.setAttributesSync(`${path}\\test.ini`, { IS_HIDDEN: true });

// import clean from 'clean-icon-and-thumb-cache';

// clean()


var bat = require.resolve("./clean.bat")
var { spawnSync } = require("child_process")
var { exit } = require("process")

console.log(`Thie tool will close system explorer.exe before clean icon & thumb cache
After that, explorer will be restarted. :)`)

spawnSync(bat, { timeout: 3000 })

console.log("Enjoy correct icon & thumb on windows now")