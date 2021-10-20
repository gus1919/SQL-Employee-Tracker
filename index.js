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
        `SELECT departmentID, departmentName AS DEPARTMENT 
        FROM department`,
        (err, results, fields) => {
           console.table(results);
           startPrompt();
        }
      );
  };

// View All Roles
function viewAllRoles() {  
    connection.query(
        `SELECT role.roleID, role.title AS "JOB TITLE", 
        role.salary AS SALARY, department.departmentName AS DEPT 
        FROM role 
        INNER JOIN department 
        ON role.departmentID = department.departmentID;`,

        (err, results, fields) => {
           console.table(results);
           startPrompt();
        }
      );
  };

// View All Employees
function viewAllEmployees() {
    connection.query(
`SELECT DISTINCT employee.employeeName AS NAME, employee.id, 
    employee.managerID AS 'MANAGER ID', role.title AS 'JOB TITLE', 
    role.salary AS SALARY, department.departmentName AS DEPT 
FROM((employee 
INNER JOIN role ON role.roleID = employee.roleID) 
INNER JOIN department ON role.departmentID = department.departmentID)
ORDER BY employee.id ASC;`,
        (err, results, fields) => {
          if (err) throw err;
           console.table(results);
           startPrompt();
        }
      );
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
      connection.execute(
          `INSERT INTO department (departmentID, departmentName) 
          VALUES (?, ?)`, 
          [0, answer.departmentName], 
      (err, result) => {
          if (err)
            throw err;
          console.log(`${answer.departmentName} added as new Department`);
          startPrompt();}
      )}
    );
};  

// Add Role
function addRole() {
let addRoleQuery = `SELECT * 
FROM department`
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
          console.log(`${answers.title} added as new role.`)
          startPrompt();
        })    
      })
    })
  };    

// Add Employee
  //role choices
  var roleArray = [];
  function selectEmployeeRole() {
      connection.query(`SELECT * FROM role`, function(err, res) {
          if (err) throw err
          for (var i = 0; i <res.length; i++) {
              roleArray.push(res[i].title);
          }
  })
  return roleArray;
  }
  //Manager Choices
  var managerArray = [];
  function selectManager() {
      connection.query(`SELECT employeeName
      FROM employee
      WHERE managerID IS NOT NULL`, function(err, res) {
          if (err) throw err
          for (var i = 0; i < res.length; i++) {
              managerArray.push(res[i].employeeName);
          }
      })
      return managerArray;
  }
// add Employee Function
function addEmployee() {
    inquirer.prompt([
        {
            name: "newEmployeeName",
            type: "input",
            message: "Please enter the new employee's name."
        },
        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: selectEmployeeRole()
        },
        {
            name: "manager",
            type: "rawlist",
            message: "What is their manager's name?",
            choices: selectManager()
        }
    ]).then(function (val) {
        var roleID = selectEmployeeRole().indexOf(val.role) +1
        var managerID = selectManager().indexOf(val.manager) +1
        connection.query(
            `INSERT INTO employee SET ?`,
            {
                employeeName: val.newEmployeeName,
                managerID: managerID,
                roleID: roleID
            }, function (err){
                if (err) throw err
                console.table(val)
                startPrompt();
            })
    })
};

// Update Employee Role
function updateEmployee() {
    connection.query(
        `SELECT employee.employeeName, role.title 
        FROM employee
        JOIN role
        ON employee.roleID = role.roleID;`, function(err, res) {
            if (err) throw err
            inquirer.prompt([
                {
                    name: "employeeName",
                    type: "rawlist",
                    message: "Which employee would you like to update?",
                    choices: function() {
                        var employeeName = [];
                        for (var i = 0; i < res.length; i++) {
                            employeeName.push(res[i].employeeName);
                        }
                        return employeeName;
                    }
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "What is the employee's new role?",
                    choices: selectEmployeeRole()
                },
            ]).then(function(val){
                var role_ID = selectEmployeeRole().indexOf(val.role) + 1
                connection.query(`UPDATE employee SET ? WHERE ?`,
                [{
                    employeeName: val.employeeName
                },
                {
                    roleID: role_ID
                }],
                function(err){
                    if (err) throw err
                    console.table(val)
                    startPrompt();
                })
            });
        });
};