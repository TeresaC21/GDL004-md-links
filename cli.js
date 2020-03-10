#!/usr/bin/env node
//const valid = require('./validate.js');
const indx = require('./index.js');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const chalk = require('chalk');
const figlet = require('figlet');
const proc = process.argv;
const option = process.argv[3];
const path = process.argv[2];

function cliGo() {
    let condition = indx.call(path, option);
    console.log(path, 'soy path cliGo');
    console.log(option, 'soy option cliGo');
    }
    cliGo() 

/*  const questionCommant = () => {
    const doQuestion = [{
            name: 'FILE',
            type: 'input',
            message: 'Please, write name of your file. Example: README!'
        },
        {
            name: 'EXTENTION',
            type: 'list',
            message: '¡Necesitas extencion de fichero .MD!',
            choices: ['.md', '.js']
        }
    ]
    return inquirer.prompt(doQuestion);
}

const go = async () => {

questionCommant();
};

go()  */