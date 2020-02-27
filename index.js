const fs = require('fs');
const path = require('path');
const processExt = process.argv[2];
const lista = [];
const fetch = require('node-fetch')
//const valid = require('./validate.js');//valid.hi();

// se exporta
function extractMD() {
    const extPath = path.extname(processExt);
    if (extPath == '.md') {
        console.log(true, 'SOY .MD');
        return readLinks();
    } else {
        console.log('NO SOY .MD');
    }
}

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

    for (let i = 0; i < matchReg.length; i++) {
        // console.log(matchReg[i]); //fetch('https://es.wikipedia.org/wiki/Markdown')
        fetch(matchReg[i])
            .then(res => {
                //console.log(res);//console.log(res.url)//console.log(res.ok);// console.log(res.status)// console.log(res.json());
                const obj = {
                    url: res.url,
                    ok: res.ok,
                    status: res.status
                }
                //console.log(obj);
                lista.push(obj);
                console.log('es lista', lista);

                 if (res.status >= 200 && res.status < 300) {
                    //console.log(matchReg[i].length, '20000000'); // contar links
                    console.log(lista.length, '20000000'); // contar links
                } else {
                    console.log(lista.length, '40444444');
                } 
            })
            .catch((error) =>
                console.log('Hubo un problema con la petición Fetch:', error));
    }
}
// libreria async
// combinacion promises, promises.all, encadenamiento de promesas, async/await

/* function counterStats(lista) {
    let coounterOk = 0;
    let counterFail = 0;
for (let i = 0; i < lista.length; i++) {
   fetch(lista[i])
   .then((data) =>{
    coounterOk++
   })
   .catch((data) =>{
       counterFail++
})
    
}

} */

module.exports.extractMD = extractMD;
/*module.exports = {
    extracting: function () {},
    readLinks: function () {} */