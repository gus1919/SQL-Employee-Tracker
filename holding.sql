
-- Employee Role Table
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- Employee Table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id VARCHAR(),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

-- Employee Role Seeds
INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

-- Employee Seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Doe", 1, null),
("Mike", "Chan", 1, "John Doe"),
("Ashley", "Rodriguez", 2, null),
("Kevin", "Tupik", 2, "Ashley Rodriguez"),
("Kunal", "Singh", 3, null),
("Malia", "Brown", 3, "Kunal Singh"),
("Sarah", "Lourd", 4, null),
("Tom", "Allen", 1, "Sarah Lourd");