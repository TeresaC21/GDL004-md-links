const fs = require('fs');
const path = require('path');
const processExt = process.argv[2];
const lista = [];
const fetch = require('node-fetch')
//const valid = require('./validate.js');
//valid.hi();

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
        console.log(processExt);
        if (err) {
            console.log(err);
        } else {
            // let expReg = new RegExp(/(https?:\/\/[\w\.\-]+\.\w{2,5}(\/\S*)?)/g);
            let expReg = new RegExp(/https?:\/\/[\w\.\-]+\.\w{2,5}[^\s\)]+/g)
            let matchReg = data.match(expReg);
            //console.log(matchReg);
            if (matchReg) {
                arrExpr(matchReg);
            } else {
                console.log('Dont found');

            }
            //let arrayMatch = matchReg.push(lista)
            //console.log(arrayMatch, 'BUUUUUUU');
            // return matchReg;
        }
    })
}

// ya que itero en array de expresion regular, hacer push para pasar lista en el .map
function arrExpr(matchReg) {
    console.log(matchReg);

    for (let i = 0; i < matchReg.length; i++) {
        console.log(matchReg[i]);
        fetch(matchReg[i])
            .then(res => {
                //  console.log(res);
                console.log(res.ok);
                console.log(res.status)
            });    
    }
    //console.log(res.url);
    //console.log(res.ok);
    //console.log(res.status);
}
//console.log(arrExpr(matchReg));

// ******************** FETCH VALIDAR LINKS ************************
function validarLinks() {
    //fetch('https://es.wikipedia.org/wiki/Markdown')

}


/*   const obj = {
                   url: res.url,
                    ok: res.ok,
                    status: res.status
                }
                return obj */

/*  fetch('https://es.wikipedia.org/wiki/Markdown')
    .then(function(response) {
        //console.log(response.status);
        console.log(response.json());
        
      //return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    });
 */

module.exports.extractMD = extractMD;




/*  matchReg.forEach(element => {
                console.log(element);
                let nuevo = lista.push(element); //
                 console.log(nuevo);
               // return nuevo
            }) 
//console.log(data);
//let expReg = new RegExp("https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*");
//let expReg = new RegExp("\\w+\\s","g");

module.exports = {
    extracting: function () {
     
        const path = require('path');
        const processExt = process.argv[2];
        const extPath = path.extname(processExt);
        if (extPath == '.md') {
            console.log(true, 'SOY .MD');
            return readLinks();
        } else {
            console.log('NO SOY .MD');
        }
    },

    // *********** Function read file .md and search the links into *******
    readLinks: function () {
        const fs = require('fs');
        
        const processExt = process.argv[2];
     
        fs.readFile(processExt, 'utf8', (err, data) => {
            console.log(processExt);
            if (err) {
                console.log(err);
            } else {
                // let expReg = new RegExp(/(https?:\/\/[\w\.\-]+\.\w{2,5}(\/\S*)?)/g);
                let expReg = new RegExp(/https?:\/\/[\w\.\-]+\.\w{2,5}[^\s\)]+/g)
                let myArray = data.match(expReg);
                console.log(myArray);
            }
        })
    }
} */