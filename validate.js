/*  La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos (Object), 
    donde cada objeto representa un link y contiene las siguientes propiedades:
href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link. */
const valid = require('./index.js');
//valid.extract();

//module.exports = {
//hi: function () {
console.log('hola desde validate');

if (process.argv[3] == '--validate') {
    //./some/example.md http://algo.com/2/3/ ok 200 Link a algo
    //./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
    //./some/example.md http://google.com/ ok 301 Google
    return valid.extractMD()

} else if (process.argv[3] == '--stats') {
    //Total: 3
    //Unique: 3
    return valid.extract()

} else if (process.argv[3] == '--stats --validate') {
    //Total: 3
    //Unique: 3
    //Broken: 1
    return valid.extract()

} else {

}

//}
//}

//module.exports.hi = hi();