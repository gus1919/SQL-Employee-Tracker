/*
// DEPENDENCIES

const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
connect();
async function connect(){
    try {
        const connection = await mysql.createConnection(
            {
              host: 'localhost',
              port: 3306,
              user: 'root',
              password: password,
              database: 'employee_db'
            });
    const [rows,schema] = await connection.query("SELECT * FROM EMPLOYEE");
    }
}; 

function newFunction() {
    return require("mysql2/typings/mysql/lib/Connection");
}

  function viewAllEmployees() {
const employeeQuery = `SELECT employee.id, employee.first_name, employee.last_name,
employee_role.title 
AS employee_role, CONCAT(manager.first_name, ' ', manager.last_name)
AS manager, department.name FROM employee 
LEFT JOIN employee_role ON employee.role_id = department.id 
LEFT JOIN employee manager ON employee.manager_id = manager.id`

Connection.query(employeeQuery, (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
})
    };


     d.department_name AS DEPARTMENT
     INNER JOIN `department` ON r.department_id = d.department_name