/* MS SQL Server*/
var express = require("express");
var app = express();
const cors = require("cors");
var sql = require("mssql");

app.use(cors());
app.use(express.json());

// config for your database **
var config = {
  user: "sa",
  password: "2253",
  server: "localhost",
  database: "spatialDB",
  options: {
    enableArithAbort: true,
    instancename: "GISSERVER",
    encrypt: false,
  },
};

// connect to your database
sql.connect(config, function (err) {
  if (err) console.log("Database connection failed!", err);
  else console.log("Connected to database");
});

/* */
// app.post('/addData', (req, res) => {

//   var request = new sql.Request();

//   const name = req.body.obj.name;
//   const age = req.body.obj.age;
//   const number = req.body.obj.number;
//   request.input('name',name);
//   request.input('age',age);
//   request.input('number',number);

//   request.query("INSERT INTO student (name, age, number) VALUES(@name,@age,@number)",
//   (err,result) =>{
//       if (err) {
//           console.log(err);
//       } else {
//           res.send('Values inserted');
//       }
//   })
// })

app.post("/addData", (req, res) => {
  var request = new sql.Request();
  if (req.body.obj.country === null || req.body.obj.country === "") {
    console.log("country = null");
    res.send("Values null");
  }
  else {
    
    request.input("country", req.body.obj.country);
    request.input("city", req.body.obj.city);
    request.input("year", req.body.obj.Year);
    request.input("pm25", req.body.obj.pm25);
    request.input("latitude", req.body.obj.latitude);
    request.input("longitude", req.body.obj.longitude);
    request.input("population", req.body.obj.population);
    request.input("wbinc16_text", req.body.obj.wbinc16_text);
    request.input("Region", req.body.obj.Region);
    request.input("conc_pm25", req.body.obj.conc_pm25);
    request.input("color_pm25", req.body.obj.color_pm25);
    request.input("Geom", req.body.obj.Geom);

    request.query(
      "INSERT INTO AirPollutionPM25 (country, city, year, pm25, latitude, longitude, population, wbinc16_text, Region, conc_pm25, color_pm25, Geom) " +
        "VALUES(@country, @city, @year, @pm25, @latitude, @longitude, @population, @wbinc16_text, @Region, @conc_pm25, @color_pm25, @Geom)",
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log("Values inserted");
          res.send("Values inserted");
        }
      }
    );
  }
});

app.get("/getData", function (req, res) {
  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query("SELECT * FROM AirPollutionPM25", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.recordset);
    }
  });
});

app.post("/getDataA", (req, res) => {
  var request = new sql.Request();

  console.log(req.body.year);
  request.input("year", req.body.year);
  request.input("pm25", req.body.pm25);

  if (
    (req.body.year === null || req.body.year === "") &&
    (req.body.pm25 === null || req.body.pm25 === "")
  ) {
    request.query("SELECT * FROM AirPollutionPM25 ", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.recordset);
        console.log("/getDataA");
      }
    });
  } else if (req.body.year === null || req.body.year === "") {
    request.query(
      "SELECT * FROM AirPollutionPM25 WHERE  pm25 > @pm25 ORDER BY pm25",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.recordset);
          console.log("/getDataA - input  pm25 ");
        }
      }
    );
  } else if (req.body.pm25 == null || req.body.pm25 == "") {
    request.query(
      "SELECT * FROM AirPollutionPM25 WHERE Year = @year ORDER BY pm25",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.recordset);
          console.log("/getDataA - input Year");
        }
      }
    );
  } else {
    request.query(
      "SELECT * FROM AirPollutionPM25 WHERE pm25 > @pm25  AND Year = @year ORDER BY pm25",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.recordset);
          console.log("/getDataA - input pm25 , year");
        }
      }
    );
  }
});

app.post("/getDataB", (req, res) => {
  var request = new sql.Request();
  console.log(req.body.country);
  request.input("country", req.body.country);

  if (req.body.country === null || req.body.country === "") {
    request.query(
      "SELECT country as Country, AVG(pm25) as Average_PM_25 FROM AirPollutionPM25 GROUP BY country ORDER BY AVG(pm25) DESC",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.recordset);
          console.log("/getDataB");
        }
      }
    );
  } else {
    request.query(
      "SELECT country as Country, AVG(pm25) as Average_PM_25 FROM AirPollutionPM25 WHERE country = @country GROUP BY country ORDER BY AVG(pm25) DESC",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.recordset);
          console.log("/getDataB - input country");
        }
      }
    );
  }
});

app.post("/getDataC", (req, res) => {
  var request = new sql.Request();
  console.log(req.body.country);
  request.input("country", req.body.country);

  request.query(
    "SELECT Year , country AS Country , SUM(pm25) AS PM_25 FROM AirPollutionPM25 WHERE country = @country GROUP BY Year, country ORDER BY Year",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.recordset);
        console.log("/getDataC");
      }
    }
  );
});

app.post("/getDataD", (req, res) => {
  var request = new sql.Request();
  request.input("year", req.body.year);
  request.input("color", req.body.color);

  if (
    (req.body.year === null || req.body.year === "") &&
    (req.body.color === null || req.body.color === "")
  ) {
    request.query(
      "SELECT Year , color_pm25 as Color , SUM(population) AS Affected_Population FROM AirPollutionPM25 GROUP BY Year, color_pm25",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.recordset);
          console.log("/getDataD - input color_pm25");
        }
      }
    );
  } else if (req.body.year === null || req.body.year === "") {
    request.query(
      "SELECT Year , color_pm25 as Color , SUM(population) AS Affected_Population FROM AirPollutionPM25 WHERE color_pm25 = @color GROUP BY Year, color_pm25",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.recordset);
          console.log("/getDataD - input color_pm25");
        }
      }
    );
  } else if (req.body.color === null || req.body.color === "") {
    request.query(
      "SELECT Year , color_pm25 as Color , SUM(population) AS Affected_Population FROM AirPollutionPM25 WHERE Year = @year GROUP BY Year, color_pm25",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.recordset);
          console.log("/getDataD - input Year");
        }
      }
    );
  } else {
    request.query(
      "SELECT Year , color_pm25 as Color , SUM(population) AS Affected_Population FROM AirPollutionPM25 WHERE Year = @year AND color_pm25 = @color GROUP BY Year, color_pm25",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.recordset);
          console.log("/getDataD");
        }
      }
    );
  }
});

app.get("/getColor", function (req, res) {
  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query(
    "SELECT color_pm25 as color FROM AirPollutionPM25  GROUP BY color_pm25",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.recordset);
      }
    }
  );
});

app.get("/getYear", function (req, res) {
  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query(
    "SELECT Year FROM AirPollutionPM25  GROUP BY Year",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.recordset);
      }
    }
  );
});

app.get("/getCountry", function (req, res) {
  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query(
    "SELECT country FROM AirPollutionPM25  GROUP BY country",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.recordset);
      }
    }
  );
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
