// hidden password
require('dotenv').config();

// Inquirer, Console Table
const inquirer = require("inquirer");
const cTable = require("console.table");

// get the client
const mysql = require('mysql2');
const e = require('express');

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
       // console.log(results); // results contains rows returned by server
       // console.log(fields); // fields contains extra meta data about results, if available
    }
  );

// Starting inquirer prompt
startPrompt();
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
                  "Exit",
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
             
              case "Exit":
                  exit();
              break;  
          }
      })
  }
  
// View All Departments
  function viewAllDepartments() {
    connection.query(
        'SELECT departmentID, departmentName AS DEPARTMENT FROM `department`',
        (err, results, fields) => {
           console.table(results);
           startPrompt();
        }
      );
  };

// View All Roles
  function viewAllRoles() {  
    connection.query(
        'SELECT role.roleID, role.title AS "JOB TITLE", role.salary as SALARY, department.departmentName AS DEPT FROM role INNER JOIN department ON role.departmentID = department.departmentID;',

        (err, results, fields) => {
           console.table(results);
           startPrompt();
        }
      );
  };

  // View All Employees
  function viewAllEmployees() {
    connection.query(
        'SELECT * FROM `employee`',
        (err, results, fields) => {
           console.table(results);
           startPrompt();
        }
      );
    };

  // Add Employee
  function addEmployee() {
      
  };
 
  // Update Employee Role
  function updateEmployee() {};
 
  // Add Role
  function addRole() {};
 
  // Add Department
  function addDepartment() {};

  // Exit Program
  function exit() {};