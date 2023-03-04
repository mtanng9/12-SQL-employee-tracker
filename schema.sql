DROP DATABASE IF EXISTS exmployee_tracker;
CREATE DATABASE exmployee_tracker;

USE exmployee_tracker;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tile VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    manager_id INT
);