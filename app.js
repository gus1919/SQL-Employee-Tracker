require('dotenv').config();

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_db',
  password: process.env.DB_PASS
});

// simple query
connection.query(
    'SELECT * FROM `department`',
    (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
  );

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

  // Starting inquirer prompt

  function startPrompt() {
      inquirer.prompt([
          {
              type: "list",
              message: "What would you like to do?",
              name: "choice",
              choices: [
                  "View All Departments",
                  "View All Roles",
                  "View All Employees",
                  "Add Department",
                  "Add Role",
                  "Add Employee",
                  "Update Employee Role",
              ]
          }
      ]).then(function(val){
          switch (val.choice) {
              case "View All Departments":
                  viewAllDepartments();
              break;
              
              case "View All Roles":
                  viewAllRoles();
              break;
              
              case "View All Employees":
                  viewAllEmployees();
              break;

              case "Add Department":
                  addDepartment();
              break;

              case "Add Role":
                  addRole();
              break;
              
              case "Add Employee":
                  addEmployee();
              break;

              case "Update Employee Role":
                  updateEmployee();
              break;  
          }
      })
  }
  
// View All Departments
  function viewAllDepartments() {
      const departmentQuery = `SELECT * FROM department`
      Connection.query(departmentQuery, (err, data) => {
          if (err) throw err;
          console.table(data);
      startPrompt();
    })
  };

// View All Roles
  function viewAllRoles() {  
   const roleQuery = `SELECT * FROM employee_role`
   Connection.query(roleQuery, (err, data) => {
       if (err) throw err;
       console.table(data);
       startPrompt();
   })
  };

  // View All Employees
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

  // Add Employee
  function addEmployee() {};
 
  // Update Employee Role
  function updateEmployee() {};
 
 
  // Add Role
  function addRole() {};
 

 
  // Add Department
  function addDepartment() {};
*/