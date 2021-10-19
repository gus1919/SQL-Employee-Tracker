-- Database 
DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

-- Department Table
CREATE TABLE department (
    departmentID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(30) NOT NULL
    );

-- Employee Role Table
CREATE TABLE role (
    roleID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 0) NOT NULL,
    departmentID INT NOT NULL,
    FOREIGN KEY (departmentID) REFERENCES department(departmentID)
);

-- Employee Table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeName VARCHAR(30) NOT NULL,
    roleID INT,
    managerID INT,
    FOREIGN KEY (roleID) REFERENCES role(roleID),
    FOREIGN KEY (managerID) REFERENCES employee(id)
);