
const fs = require('fs');
const path = require('path');
const processExt = process.argv[2];

const extPath = path.extname(processExt);
if (extPath == '.md') {
    console.log(true, 'SOY .MD');
} else {
    console.log('NO SOY .MD');
}
function readLinks() {
fs.readFile(processExt, 'utf8', (err, data) => {
    console.log(processExt);
    //console.log(data);
    //let expReg = new RegExp("https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*");
    let expReg = new RegExp(/(https?:\/\/[\w\.\-]+\.\w{2,5}(\/\S*)?)/g);
    //let expReg = new RegExp("\\w+\\s","g");
    let myArray = data.match(expReg);
    console.log (myArray);
})
}
console.log(readLinks(), 'HAAAAA');
