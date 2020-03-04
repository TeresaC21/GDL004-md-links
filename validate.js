const fs = require('fs');
const path = require('path');
const processExt = process.argv[2];
const fetch = require('node-fetch')

function extractMD() {
    const extPath = path.extname(processExt);
    if (extPath == '.md') {
        console.log(true, 'SOY .MD');
    } else {
        console.log('NO SOY .MD');
    }
}
// *********** Function read file .md and search the links info *******
function readLinks(processExt) {
    return new Promise(function (resolve, reject) {
        fs.readFile(processExt, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            // let expReg = new RegExp(/(https?:\/\/[\w\.\-]+\.\w{2,5}(\/\S*)?)/g);
            let expReg = new RegExp(/https?:\/\/[\w\.\-]+\.\w{2,5}[^\s\)]+/g)
            let matchLinks = data.match(expReg);
            return resolve(matchLinks);
        })
    })
}

function validateLinks(links) {
    let list = [];
    for (let i = 0; i < links.length; i++) {
        //fetch('https://es.wikipedia.org/wiki/Markdown')
        fetch(links[i])
            .then(res => {
                //console.log(res);//console.log(res.url)//console.log(res.ok);// console.log(res.status)// console.log(res.json());
                const obj = {
                    url: res.url,
                    ok: res.ok,
                    status: res.status
                }
                list.push(obj);
                console.log(list, 'es lista');
            })
            .catch((error) =>
                console.log('Hubo un problema con la petición Fetch:', error));
    }
}
// libreria async
// combinacion promises, promises.all, encadenamiento de promesas, async/await

function counterStats(list) {
    console.log('HOLA DESDE COUNTERSTATS');
    console.log(list, 'YESSSS');
    let coounterOk = 1;
    let counterFail = 1;
    for (let i = 0; i < lista.length; i++) {
        //console.log(list[i]);
        fetch(list[i])
            .then(res => {
                console.log(res.ok);

                if (res.status >= 200 && res.status <= 300) {
                    let linkOk = coounterOk++
                    console.log(linkOk, '200'); // contar links
                } else {
                    let linkFail = counterFail++
                    console.log(linkFail, '404');
                }
            })
            .catch((error) =>
                console.log('Hubo un problema con la petición Fetch:', error));
    }
}

module.exports = {
    extractMD,
    readLinks,
    validateLinks,
}

//module.exports.extractMD = extractMD;
/*module.exports = {
    extracting: function () {},
    readLinks: function () {} */
