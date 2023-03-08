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


-- Insert starter department data
INSERT INTO department (name)
VALUES ('Sales'),
       ('Tech');


-- Get ids for tech and sales deparment to insert into latter tables
SELECT @sales := id FROM department where name = 'Sales';
SELECT @tech := id FROM department where name = 'Tech';

-- Insert starter role data
INSERT INTO role (title, salary, department_id)
VALUES ('Junior Engineer', 90000, @tech),
       ('Senior Engineer', 130000, @tech),
       ('Director', 200000, @tech);

-- Get ids for different roles to insert into latter tables
SELECT @junior := id FROM role where title = 'Junior Engineer';
SELECT @senior := id FROM role where title = 'Senior Engineer';
SELECT @director := id FROM role where title = 'Director';

-- Insert starter manager data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Suko', @director, NULL);

-- Get id for manager to associate to other employees
SELECT @bob := id FROM employee where first_name = 'Bob';

-- Insert starter employee data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joe', 'Mall', @junior, @bob),
       ('Nancy', 'Nam', @senior, @bob);
