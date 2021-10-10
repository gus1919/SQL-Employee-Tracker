// DEPENDENCIES

const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const express = require("express");
const Choice = require("inquirer/lib/objects/choice");
const Connection = require("mysql2/typings/mysql/lib/Connection");
const PORT = process.env.PORT || 3001;
const app = express();
const password = process.env.password
require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
/*const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: password,
      database: 'employee_db'
    },
    console.log(`Connected to the classlist_db database.`)
  ); */

  // Starting inquirer prompt

  function startPrompt() {
      inquirer.prompt([
          {
              type: "list",
              message: "What would you like to do?",
              name: "choice",
              choices: [
                  "View All Employees",
                  "Add Employee",
                  "Update Employee Role",
                  "View All Roles",
                  "Add Role",
                  "View All Departments",
                  "Add Department",
              ]
          }
      ]).then(function(val){
          switch (val.choice) {
              case "View All Employees":
                  viewAllEmployees();
              break;

              case "Add Employee":
                  addEmployee();
              break;

              case "Update Employee Role":
                  updateEmployee();
              break;

              case "View All Roles":
                  viewAllRoles();
              break;

              case "Add Role":
                  addRole();
              break;
 
              case "View All Departments":
                  viewAllDepartments();
              break;
              
              case "Add Department":
                  addDepartment();
              break;
          }
      })
  };

  startPrompt();
  // View All Employees
  function viewAllEmployees() {
      Connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ',e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
        if (err) throw err
        console.table(res)
        startPrompt()
    })
    };

  // Add Employee
  function addEmployee() {};
 
  // Update Employee Role
  function updateEmployee() {};
 
  // View All Roles
  function viewAllRoles() {  
      Connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id;", 
  function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
};
 
  // Add Role
  function addRole() {};
 
  // View All Departments
  function viewAllDepartments() {
    Connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOin role ON employee.role_id;", 
    function(err, res) {
        if (err) throw err
        console.table(res)
        startPrompt()
    })
  };

 
  // Add Department
  function addDepartment() {};