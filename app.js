const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');


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

        let sql = await connect.promise().query(`SELECT * FROM ${table}`);
        console.table(sql[0]);
        process.exit();


    } else if (action === 'Add') {
        // do some stuff
        let columns = [];

        if (table === "department") {
            columns.push("name");
        } else if (table === "role") {
            columns.push("title", "salary", "department");
        } else if (table === "employee") {
            columns.push("first_name", "last_name", "role", "manager")
        }

        const addQuestions = [];

        let depSql = await connect.promise().query(`SELECT id, name FROM department`);
        let roleSql = await connect.promise().query(`SELECT id, title FROM role`);
        let empSql = await connect.promise().query(`SELECT id, first_name, last_name FROM employee`);

        columns.forEach((column) => {
            let listQuestion = {
                type: 'list',
                name: column,
                message: `What do you want to add for ${column}`,
            }  

            if (column === "department") {
                let departments = [];
                depSql[0].forEach((item) => {departments.push(`${item.id}-${item.name}`)})
                listQuestion.choices = departments;
                addQuestions.push(listQuestion);
            } else if (column === "role"){
                let roles = [];
                roleSql[0].forEach((item) => {roles.push(`${item.id}-${item.title}`)})    
                listQuestion.choices = roles;
                addQuestions.push(listQuestion);
            }else if (column === "manager"){
                let employees = [];
                empSql[0].forEach((item) => {employees.push(`${item.id}-${item.first_name} ${item.last_name}`)});
                employees.push("NONE");
                listQuestion.choices = employees;              
                addQuestions.push(listQuestion);
            }else {
                let question = {
                    type: 'input',
                    name: column,
                    message: `What do you want to add for ${column}`
                }
                addQuestions.push(question);
            }
        });

        inquirer.prompt(addQuestions).then(async (answers) => {
            let keys = Object.keys(answers);
            let values = Object.values(answers);

            keys.forEach((key, i) => {
                if (key === "role" || key === "manager" || key === "department") {
                    keys[i] = key + "_id";
                };
            });

            values.forEach((value, i) => {
                if (value.includes("-")) {
                    values[i] = value.split("-")[0];
                } else {
                    values[i] = `"${value}"`;
                }
                if (value === "NONE") {
                    if (i > -1) {
                      keys.splice(i, 1);
                      values.splice(i,1);
                    }
                }
            });

            let query = `INSERT INTO ${table} (${keys}) VALUES (${values})`;
            await connect.promise().query(query);
            console.log(`${table}`);
            process.exit();
        });

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
            console.log(`Updated Employee: ${answers.employeeName}`);
            process.exit();
        }) 
    }
});