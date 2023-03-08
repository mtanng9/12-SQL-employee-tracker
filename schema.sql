DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE employee_tracker.department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_tracker.role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES employee_tracker.department(id)
);

CREATE TABLE employee_tracker.employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee_tracker.employee(id)
);