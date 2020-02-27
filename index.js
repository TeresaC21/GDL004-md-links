const fs = require('fs');
const path = require('path');
const processExt = process.argv[2];
let list = [];
const fetch = require('node-fetch')
//const valid = require('./validate.js');//valid.hi();

// se exporta
//function extractMD() {
    const extPath = path.extname(processExt);
    if (extPath == '.md') {
        console.log(true, 'SOY .MD');
        return readLinks();
    } else {
        console.log('NO SOY .MD');
    }
//}

// *********** Function read file .md and search the links into *******
function readLinks() {
    fs.readFile(processExt, 'utf8', (err, data) => {
        //console.log(processExt);
        if (err) {
            console.log(err);
        } else {
            // let expReg = new RegExp(/(https?:\/\/[\w\.\-]+\.\w{2,5}(\/\S*)?)/g);
            let expReg = new RegExp(/https?:\/\/[\w\.\-]+\.\w{2,5}[^\s\)]+/g)
            let matchReg = data.match(expReg);
            //console.log(matchReg);
            if (matchReg) {
                validateLinks(matchReg);
            } else {
                console.log('Dont found');
            }
            //let arrayMatch = lista.push(matchReg)//console.log(arrayMatch, 'BUUUUUUU');
        }
    })
}

// ya que itero en array de expresion regular, hacer push para pasar lista en el .map
// ******************** FETCH VALIDAR LINKS ************************
function validateLinks(matchReg) {
    //console.log(matchReg);
    let coounterOk = 1;
    let counterFail = 1;
    for (let i = 0; i < matchReg.length; i++) {
        // console.log(matchReg[i]); //fetch('https://es.wikipedia.org/wiki/Markdown')
        fetch(matchReg[i])
            .then(res => {
                //console.log(res);//console.log(res.url)//console.log(res.ok);// console.log(res.status)// console.log(res.json());
                if (process.argv[3] == '--validate') {
                const obj = {
                    url: res.url,
                    ok: res.ok,
                    status: res.status
                }
                //console.log(obj);
                list.push(obj);
                console.log('es lista', list);

            }else if (process.argv[3] == '--stats'){
                 if (res.status >= 200 && res.status <= 300) {
                    //console.log(matchReg[i].length, '20000000'); // contar links
                    let linkOk = coounterOk++
                    console.log(linkOk, '200'); // contar links
                } else {
                    let linkFail = counterFail++
                    console.log(linkFail, '404');
                } 
            }
            })
            
            .catch((error) =>
                console.log('Hubo un problema con la petición Fetch:', error));
    }
}
// libreria async
// combinacion promises, promises.all, encadenamiento de promesas, async/await
 /* if (lista) {
                    counterStats(lista);
                } else {
                    console.log('Dont found');
                }*/
function counterStats(list) {
    console.log('HOLA DESDE COUNTERSTATS');
    
   /*  console.log(list, 'YESSSS');
    
    let coounterOk = 1;
    let counterFail = 1;
    for (let i = 0; i < lista.length; i++) {
//console.log(list[i]);
           fetch(list[i])
            .then(res => {
                console.log(res.ok);
                
                if (res.status >= 200 && res.status <= 300) {
                    //console.log(matchReg[i].length, '20000000'); // contar links
                    let linkOk = coounterOk++
                    console.log(linkOk, '200'); // contar links
                } else {
                    let linkFail = counterFail++
                    console.log(linkFail, '404');
                } 
            })
            .catch((error) =>
            console.log('Hubo un problema con la petición Fetch:', error));
}  */ 
          
    
}



//module.exports.extractMD = extractMD;
/*module.exports = {
    extracting: function () {},
    readLinks: function () {} */