const userInitialRequests = [
    {
        type: "input",
        name: "viewDepartments",
        message: "View all departments"
    },

    {
        type: "input",
        name: "viewRoles",
        message: "View all roles"
    },

    {
        type: "input",
        name: "viewEmployees",
        message: "View all employees"
    },

    {
        type: "input",
        name: "addDepartment",
        message: "Add a department",
        choices: [
            'Enter the name of the department',
        ],
    },

    {
        type: "input",
        name: "addRole",
        message: "Add a role",
        choices: [
            'Enter the name',
            'Set the salary',
            'Enter the department for the role',
        ],
    },

    {
        type: "input",
        name: "addEmployee",
        message: "Add an employee",
        choices: [
            'Enter the first name of the employee',
            'Enter the last name of the employee',
            'Enter the manager of the employee',
        ],
    },

    {
        type: "input",
        name: "updateRole",
        message: "Update an employee role"
    }  
]

module.exports = {
    userInitialRequests: userInitialRequests
}