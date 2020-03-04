const fs = require('fs');
const path = require('path');
const processExt = process.argv[2];
const valid = require('./validate.js');
console.log('hola desde index');

function call(path) {

    let md = valid.extractMD(path);
    let promise = valid.readLinks(processExt);
    
    promise
        .then(function (result) {
            if (process.argv[3] == '--validate') { //revisar si existe bandera de validate
                valid.validateLinks(result);
            } //funcion validar links validateLinks()//console.log(result, 'good');
        })
        .catch(function (err) {
            console.log(err, 'hay un error');
        })

    if (process.argv[3] == '--stats') {
        //Total: 3
        //Unique: 3
        // return valid.extract()
        // return valid.counterStats()
    } else if (process.argv[3] == '--stats --validate') {
        //Total: 3
        //Unique: 3
        //Broken: 1
        // return valid.extract()

    } else {

    }

}
call(processExt)


/*  La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos (Object), 
    donde cada objeto representa un link y contiene las siguientes propiedades:
href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link. */