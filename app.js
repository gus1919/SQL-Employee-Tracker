// DEPENDENCIES

const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const password = process.env.password
require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: password,
      database: 'employee_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );

  // Starting 