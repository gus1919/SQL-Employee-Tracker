USE employee_DB;

-- Department Seeds
INSERT INTO department (id, name)
VALUES 
(1, "Sales"),
(2, "Engineering"),
(3, "Finance"),
(4, "Legal");

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