"use strict";
const express = require("express");
const cors = require("cors");
const sql = require("mssql");

const app = express();

app.use(cors());
app.use(express.json());

const config = {
  user: "sa",
  password: "2253",
  server: "localhost",
  database: "user",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "GISSERVER",
  },
  // port: 5000,
};

app.get('/', (req, res) => 
{
        new sql.connect(config, error => 
        {
            new sql.Request().query('Select * from student', (err, dataset) => 
            {   
                  if(err)
                  {
                      console.log(err);
                      res.send(err);  
                      return;
                  }
                  else
                  {
                      console.dir(dataset);  
                      res.send(JSON.stringify(dataset));  
                      return;           
                  }
            });
        });

    sql.close();
});





// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const cors = require('cors');
// const mssql= require('mssql');

// app.use(cors());
// app.use(express.json());

// const config = {
//     user :'DESKTOP-BIK2HD6\PLOYMUDDLE',
//     password :'',
//     server:'DESKTOP-BIK2HD6\\SQLEXPRESS',
//     database:'user',
//     options:{
//         trustedconnection: true,
//         enableArithAbort : true,
//         instancename :'SQLEXPRESS'
//     },
//     // port : 1433
// }

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

app.listen('8080', () => {
    console.log('Server is running on port 8080')
})
