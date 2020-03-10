const fs = require('fs');
const path = require('path');
const processExt = process.argv[2];
const fetch = require('node-fetch')
const chalk = require('chalk');

function extractMD() {
    const extPath = path.extname(processExt);
    if (extPath == '.md') {
        console.log(true, 'SOY .MD');
    } else {
        console.log('NO SOY .MD');
    }
}
// *********** MD search the links *******
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
// *********** True --validate *******
function validateLinks(links) {
    let list = [];
    let coounterOk = [];
    let coounterFail = [];
    let promises = links.map((elem) => {
        return fetch(elem);
    })
    Promise.all(promises)
        .then((data) => {
           
            for (let i = 0; i < data.length; i++) {
                let linkInfo = data[i];
                const obj = {
                    url: linkInfo.url,
                    statusText: linkInfo.statusText,
                    statusNum: linkInfo.status
                }
                if (obj.statusNum === 200) {
                    coounterOk.push(obj)
                    /*  coounterOk.push(` Href: ${obj.url} Status: ${obj.statusNum} Text: ${obj.statusText}`)  */
                } else {
                    coounterFail.push(obj)
                    /*    coounterFail.push(`Href: ${obj.url} Status: ${obj.statusNum} Text: ${obj.statusText}`) */
                }
            }
            //console.log(list);
            console.log(coounterOk);
            console.log(coounterFail);
            //console.table(chalk.green(coounterOk));
            //console.table(chalk.red(coounterFail)); 
        }).catch((err => {
            console.log(err);
        }))
}
// *********** True --stats *******
function counterStats(links) {
    let list = [];
    let coounterOk = 0;
    let counterFail = 0;
    let promises = links.map((elem) => {
        return fetch(elem);
    })
    Promise.all(promises)
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                let linkInfo = data[i];
                const obj = {
                    statusNum: linkInfo.status,
                }
                list.push(obj);
            }
            list.map((elem) => {
                if (elem.statusNum < 406) {
                    return coounterOk++
                } 
            })
            console.log(chalk.green.bold(`Total: ${coounterOk}`)); // contar links
            console.log(chalk.yellow(`Unique: ${coounterOk}`));
        }).catch((err => {
            console.log(err);
        }))
}

function statsValidate(links) {
    let list = [];
    let total = 0;
    let broken = 0;
    let promises = links.map((elem) => {
        return  fetch(elem);
    })
    Promise.all(promises)
        .then((data) => {
            
            data.forEach(element => {
                let linkInfo = element
                let obj = {
                    statusNum: linkInfo.status
                }
                list.push(obj);
            })
            list.map((elem) => {
                if (elem.statusNum >= 404) {
                   return broken++
                } else {
                    total++
                }
            });
            console.log(chalk.blue('Broken:', broken));
        }).catch((err) => {
            console.log(err);

        })


}

module.exports = {
    extractMD,
    readLinks,
    validateLinks,
    counterStats,
    statsValidate
}
/*module.exports = {
    extracting: function () {},
    readLinks: function () {} */