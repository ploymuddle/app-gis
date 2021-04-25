 /* MS SQL Server*/
var express = require("express");
var app = express();
const cors = require('cors');
var sql = require("mssql");

app.use(cors());
app.use(express.json());

// config for your database
var config = {
  user: "sa",
  password: "2253",
  server: "localhost",
  database: "user",
  options: {
    enableArithAbort: true,
    instancename: "GISSERVER",
    encrypt: false,
  },
};

 // connect to your database
sql.connect(config, function (err) {
  if (err) console.log('Database connection failed!', err);
  else  console.log('Connected to database');
});

app.post('/addData', (req, res) => {

  var request = new sql.Request();

  const name = req.body.obj.name;
  const age = req.body.obj.age;
  const number = req.body.obj.number;
  request.input('name',name);
  request.input('age',age);
  request.input('number',number);

  request.query("INSERT INTO student (name, age, number) VALUES(@name,@age,@number)",
  (err,result) =>{
      if (err) {
          console.log(err);
      } else {
          res.send('Values inserted');
      }
  })
})

app.get("/getData", function (req, res) {

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("SELECT * FROM student", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.recordset);
      }
    });
});


var server = app.listen(5000, function () {
  console.log("Server is running..");
});


 /* MySQL XAMPP */
// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const cors = require('cors');
// const mssql= require('mssql');

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: '',
//     database: 'user'
// })

// app.post('/addData', (req, res) => {
//     // console.log(req.body.obj.name)
//     const name = req.body.obj.name;
//     const age = req.body.obj.age;
//     const number = req.body.obj.number;

//     db.query("INSERT INTO profile (name, age, number) VALUES(?,?,?)",
//     [name, age, number],
//     (err,result) =>{
//         if (err) {
//             console.log(err);
//         } else {
//             res.send('Values inserted');
//         }
//     })
// })

// app.get('/user', (req, res) => {
//     db.query("SELECT * FROM profile", (err,result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// app.post('/create', (req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;
//     const number = req.body.number;

//     db.query("INSERT INTO profile (name, age, number) VALUES(?,?,?)",
//     [name, age, number],
//     (err,result) =>{
//         if (err) {
//             console.log(err);
//         } else {
//             res.send('Values inserted');
//         }
//     })
// })

// app.put('/update', (req, res) => {
//     const id = req.body.id;
//     const number = req.body.number;

//     db.query('UPDATE profile SET number = ? WHERE id = ?', [number, id],
//     (err,result)=> {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// })