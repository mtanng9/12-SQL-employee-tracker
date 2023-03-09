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

inquirer.prompt(starter).then(async (answers) => {
    let answerArr = answers.action.split(" ");
    let action = answerArr[0];
    let table = answerArr[2];

    if (action === 'View') {
        // do some stuff
        table = table.replace("s", "");

        connect.query(`SELECT * FROM ${table}`, (err,res) => {
            if (err) {
              throw err
            };
            connect.end();
        });

    } else if (action === 'Add') {
        // do some stuff
    } else if (action === 'Update') {
        // do some stuff
        let employees = [];
        let roles = [];

        let resultsEmp = await connect.promise().query(`SELECT first_name, last_name FROM employee`);
        resultsEmp[0].forEach((item) => {employees.push(`${item.first_name} ${item.last_name}`)})

        let resultsRole = await connect.promise().query(`SELECT id, title FROM role`);
        resultsRole[0].forEach((item) => {roles.push(`${item.id}-${item.title}`)});

        const updateQuestions = [
            {
                type: 'list',
                name: 'employeeName',
                message: "What employee would you like to update?",
                choices: employees  
            },
            {
                type: 'list',
                name: 'newRole',
                message: "Which role would you like to update?",
                choices: roles
            }
        ];

        inquirer.prompt(updateQuestions).then(async (answers) => {
            await connect.promise().query(`UPDATE employee SET role_id = ${answers.newRole.split("-")[0]} WHERE first_name = '${answers.employeeName.split(" ")[0]}' AND last_name = '${answers.employeeName.split(" ")[1]}'`);
        }) 
    }
});