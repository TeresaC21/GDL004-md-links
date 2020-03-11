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
    let promises = links.map(async (elem) => {
        let resp = {};
        try {
            resp = await fetch(elem)
        } catch (error) {
            console.log('error fetch');
        }
        return resp
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

    let promises = links.map(async (elem) => {
        let resp = {};
        try {
            resp = await fetch(elem)
        } catch (error) {
            //console.log('hay un error con fetch'); 
        }
        return resp

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
                if (elem.statusNum < 408) {
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
    let ers = {};
    let promises = links.map(async (elem) => {
        // return  fetch(elem);
        let resp = {};
        try {
            resp = await fetch(elem)
        } catch (error) {
            ers = error.errno;
            //ers ={errno: 'ECONNREFUSED'}
            console.log(ers);
            return ers
        }
        return resp
    })
    Promise.all(promises)
        .then((data) => {

            data.forEach(element => {
                let linkInfo = element
                let obj = {
                    statusNum: linkInfo.status,
                }
                list.push(obj);
            })
            list.map((elem) => {
                if (elem.statusNum >= 400) {
                    return broken++
                } else if (ers.errno === 'ECONNREFUSED') {
                    //console.log(ers, 'buuu');
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

/*   const fetch = require('node-fetch')
    function test(params) {  
   //const prom = new Promise(function(resolve,reject));
    try {
    //fetch('https://nodejs.org/api/path.html')
    fetch('https://carlosazaustre.com/manejando-la-asincronia-en-javascript/')
    //fetch('https://otra-cosa.net/algun-doc.html')
    .then(res => console.log(res.status) )
 
} catch (error) {
        console.error(error);
        
}
} */

/*module.exports = {
    extracting: function () {},
    readLinks: function () {} */

/*   const fetch = require('node-fetch')
    function test(params) {  
   //const prom = new Promise(function(resolve,reject));
    try {
    //fetch('https://nodejs.org/api/path.html')
    fetch('https://carlosazaustre.com/manejando-la-asincronia-en-javascript/')
    //fetch('https://otra-cosa.net/algun-doc.html')
    .then(res => console.log(res.status) )
 
} catch (error) {
        console.error(error);
        
}
} */
/* 
promises.push(links.map((elem) => {
    fetch(elem).then((res) => {
        //console.log(res);
        const obj = {
           url: res.url,
           statusText: res.statusText,
           statusNum: res.status
       }
        if (res.statusNum >= 400) {
           coounterOk.push(obj)
           //  coounterOk.push(` Href: ${obj.url} Status: ${obj.statusNum} Text: ${obj.statusText}`)  
       } else {
           coounterFail.push(obj)
           //   coounterFail.push(`Href: ${obj.url} Status: ${obj.statusNum} Text: ${obj.statusText}`) 
       }     
    }).catch((err)=>{
        console.log(err);
        
    })
}))
Promise.all(promises)
.then(() => {

   if (inputOptions.includes('--validate')) {
       console.group('Stats');
   }
}) */