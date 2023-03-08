const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

const questionHolder = require('./questions');
const connect = require('./connection.js');

const starter = [
    {
        type: 'list',
        name: 'action',
        message: "What would you like to do?",
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee'
        ]    
    }
];

inquirer.prompt(starter).then((answers) => {
    console.log(answers);
    let answerArr = answers.split(" ");
    let action = answerArr[0];
    let table = answerArr[2];

    if (action === 'View') {
        // do some stuff
    } else if (action === 'Add') {
        // do some stuff
    } else if (action === 'Update') {
        // do some stuff
    }
});