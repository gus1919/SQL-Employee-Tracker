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
     */
     function addRole() {
        inquirer.prompt([
     
     {
       type: "input",
       name: "title",
       message: "Please enter title of new role"
     }, 
     {
       type: "input",
       name: "salary",
       message: "Please enter salary for new role"
     }, 
     {
       type: "input",
       name: "departmentId",
       message: "Please enter department id for new role"
     }])
     .then(function (answers) {
       let query2 = `INSERT INTO role VALUES (?,?,?,?)`
       connection.query(query2, [0, answers.title, answers.salary, answers.departmentId], function (err) {
         if (err) throw err;
         console.log(`${answers.title} added as new role`)
         startPrompt();
       })
     })
 };
 

 function viewAllEmployees() {
  connection.query(
      'SELECT CONCAT(employee.firstName, " ", employee.lastName) AS NAME, employee.id,  employee.managerID AS MANAGER, role.title AS "JOB TITLE", role.salary AS SALARY, department.departmentName AS DEPT FROM((employee INNER JOIN role ON role.roleID = employee.roleID) INNER JOIN department ON role.departmentID = department.departmentID);',
      (err, results, fields) => {
         console.table(results);
         startPrompt();
      }
    );
  };