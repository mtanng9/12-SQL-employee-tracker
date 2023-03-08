const mysql = require('mysql2');
const fs = require('fs'); 

//Connect to the database (MySQL)
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "employee_tracker",
    multipleStatements: true // for multiple queries 
  });

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

module.exports = connection; 