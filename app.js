// hidden password
require('dotenv').config();

// Inquirer, Console Table
const inquirer = require("inquirer");
const cTable = require("console.table");

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
// connection.query(
//     'SELECT * FROM `department`',
//     (err, results, fields) => {
//        // console.log(results); // results contains rows returned by server
//        // console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );

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
                  connection.end();
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
        'SELECT role.roleID, role.title AS "JOB TITLE", role.salary AS SALARY, department.departmentName AS DEPT FROM role INNER JOIN department ON role.departmentID = department.departmentID;',

        (err, results, fields) => {
           console.table(results);
           startPrompt();
        }
      );
  };

  // View All Employees
  function viewAllEmployees() {
    connection.query(
        'SELECT employee.employeeName AS NAME, employee.id, employee.managerID AS MANAGER, role.title AS "JOB TITLE", role.salary AS SALARY, department.departmentName AS DEPT FROM((employee INNER JOIN role ON role.roleID = employee.roleID) INNER JOIN department ON role.departmentID = department.departmentID);',
        (err, results, fields) => {
          if (err) throw err;
           console.table(results);
           startPrompt();
        }
      );
    };

  // Add Employee
  function addEmployee() {
    let employeeQuery = `SELECT employee.id, employee.employeeName, employee.roleID, role.title, department.departmentName,
    role.salary, employee.managerID 
      FROM employee
      INNER JOIN role on role.roleID = employee.roleID
      INNER JOIN department ON department.departmentID = role.departmentID`
    connection.query(employeeQuery, (err, results) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: "input",
          name: "employeeName",
          message: "Please enter the new employee's name."
        }, 
        {
          type: "list",
          name: "roleID",
          message: "Please select the new employee's title.",
          choices: results.map(role => {
            return { name: role.title, value: role.roleID }
          })
        }, 
        {
          type: "list",
          name: "managerID",
          message: "Please select the new employee's manager.",
          choices: results.map(employee => {
            return { name: employee.employeeName, value: employee.managerID }
          })
        }, 
      ])
        .then(answer => {
          console.log(answer);
          connection.query(
            "INSERT INTO employee (id, employeeName, roleID, managerID) VALUES (?,?,?,?)",
            [0, answer.employeeName, answer.roleID, answer.managerID],
            function (err) {
              if (err) throw err
              console.log(`${answer.employeeName} added as a new employee`)
              startPrompt();
            })
        })
    })
  };
 
  // Update Employee Role
  function updateEmployee() {};
 
  // Add Role
  function addRole() {
    let addRoleQuery = 'SELECT department.departmentID, department.departmentName FROM `department`'
    connection.query(addRoleQuery, (err, results) => {
      if (err) throw err;

      inquirer.prompt([
   {
     type: "input",
     name: "title",
     message: "Please enter title of new role."
   }, 
   {
     type: "input",
     name: "salary",
     message: "Please enter salary for new role."
   }, 
   {
     type: "list",
     name: "departmentID",
     message: "Please select the department the new role is in.",
     choices: results.map(department => {
       return {name: department.departmentName, value: department.departmentID}
     })
   }
  ])
  .then(function (answers) {
    let roleQuery2 = `INSERT INTO role VALUES (?,?,?,?)`
    connection.query(roleQuery2, [0, answers.title, answers.salary, answers.departmentID], function (err) {
      if (err) throw err;
      console.log(`${answers.title} added as new role in the ${answers.departmentID} department.`)
      startPrompt();
    })    
  })
  })
};     
 
  // Add Department
  function addDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department.',
      },
    ])
    .then(function(answer) {
      //console.log(answer);
      connection.execute("INSERT INTO department (departmentID, departmentName) VALUES (?, ?)", [0, answer.departmentName], 
      (err, result) => {
          if (err)
            throw err;
          console.log(`${answer.departmentName} added as new Department`);
          startPrompt();}
      )}
      
    );
      };  