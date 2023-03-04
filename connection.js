var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "employee_tracker",
  });

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});