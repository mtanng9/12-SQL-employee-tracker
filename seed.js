const mysql = require('mysql2');
const fs = require('fs');
const connection = require('./connection.js');

//Read SQL Seed query 
const seedQuery = fs.readFileSync("./seed.sql", {
    encoding: "utf-8",
  });

//Run seed query (seperate file to prevent table data from deleted whenever node restarts)
connection.query(seedQuery, err => {
    if (err) {
      throw err
    };
    console.log("SQL seed completed");
    connection.end();
  });