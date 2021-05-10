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

//Insert data
app.post("/addData", (req, res) => {
  // create Request object
  var request = new sql.Request();

  //check in row by country = null
  if (req.body.obj.country === null || req.body.obj.country === "") {
    console.log("null");
    res.send("Values null");
  } else {
    //set data
    request.input("country", sql.NVarChar(255), req.body.obj.country);
    request.input("city", sql.NVarChar(255), req.body.obj.city);
    request.input("year", sql.Int, parseInt(req.body.obj.Year, 10));
    request.input("pm25", sql.Float, req.body.obj.pm25);
    request.input("latitude", sql.Float, req.body.obj.latitude);
    request.input("longitude", sql.Float, req.body.obj.longitude);
    request.input("population", sql.Float, req.body.obj.population);
    request.input("wbinc16_text", sql.NVarChar(255), req.body.obj.wbinc16_text);
    request.input("Region", sql.NVarChar(255), req.body.obj.Region);
    request.input("conc_pm25", sql.NVarChar(255), req.body.obj.conc_pm25);
    request.input("color_pm25", sql.NVarChar(255), req.body.obj.color_pm25);
    request.input("Geom", req.body.obj.Geom);

    //insert data
    request.query(
      "INSERT INTO AirPollutionPM25 (country, city, Year, pm25, latitude, longitude, population, wbinc16_text, Region, conc_pm25, color_pm25, Geom) " +
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

//Get data All
app.get("/getData", function (req, res) {
  // create Request object
  var request = new sql.Request();

  request.query("SELECT * FROM AirPollutionPM25", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.recordset);
    }
  });
});

//Get data query a).
app.post("/getDataA", (req, res) => {
  // create Request object
  var request = new sql.Request();

  //set data
  console.log(req.body.year);
  request.input("year", req.body.year);
  request.input("pm25", req.body.pm25);

  //query when not input
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
  }
  //query when input pm2.5
  else if (req.body.year === null || req.body.year === "") {
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
  } 
  //query when input year
  else if (req.body.pm25 == null || req.body.pm25 == "") {
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
  } 
  //query when input year and pm2.5
  else {
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

//Get data query b).
app.post("/getDataB", (req, res) => {
  var request = new sql.Request();
  console.log(req.body.country);
  request.input("country", req.body.country);

  //query when not input
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
  } 
  //query when input country
  else {
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

//Get data query c).
app.post("/getDataC", (req, res) => {
  var request = new sql.Request();
  console.log(req.body.country);
  request.input("country", req.body.country);
  
  //query when input country
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

//Get data query d).
app.post("/getDataD", (req, res) => {
  var request = new sql.Request();
  request.input("year", req.body.year);
  request.input("color", req.body.color);

  //query when not input
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
  } 
  //query when input color_pm25
  else if (req.body.year === null || req.body.year === "") {
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
  } 
  //query when input year 
  else if (req.body.color === null || req.body.color === "") {
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
  } 
  //query when input year and color_pm25
  else {
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

//Get Dropdown Color
app.get("/getColor", function (req, res) {
  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query(
    "SELECT color_pm25 as color FROM AirPollutionPM25  GROUP BY color_pm25 ORDER BY color_pm25",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.recordset);
      }
    }
  );
});

//Get Dropdown Year
app.get("/getYear", function (req, res) {
  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query(
    "SELECT Year FROM AirPollutionPM25  GROUP BY Year ORDER BY Year",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.recordset);
      }
    }
  );
});

//Get Dropdown Country
app.get("/getCountry", function (req, res) {
  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query(
    "SELECT country FROM AirPollutionPM25  GROUP BY country ORDER BY country",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.recordset);
      }
    }
  );
});

//port server run
var server = app.listen(5000, function () {
  console.log("Server is running..");
});