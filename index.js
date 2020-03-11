const valid = require('./validate.js');
const path = process.argv[2];
const option = process.argv[3];

function call(path, option) {
    //console.log(path, 'soy path');console.log(option, 'soy option');

    let md = valid.extractMD(path);
    let promise = valid.readLinks(path);

    promise
        .then((result) => {
            if (option == '--validate') { //revisar si existe bandera de validate
                valid.validateLinks(result);
            }
            return result;
        })
        .then((result) => {
            if (option == '--stats') { //revisar si existe bandera de stats
                valid.counterStats(result);
            }
            return result;
        })
        .then((result) => {
            if (option == '--stats' && process.argv[4] == '--validate') {
                valid.statsValidate(result)
            }
        })
        .catch((error) => {
            console.log(error);
        })
}


//call(processExt)
module.exports = {
    call
}