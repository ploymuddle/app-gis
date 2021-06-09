import Axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

function UploadFile() {
  const [file, setFile] = useState();
  const [dataList, setDataList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [message, setMessage] = useState("");

  //excel -> csv
  const readFile = () => {
    setDataList([]);

    if (file) {
      setShowFail(false);

      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (event) => {
        /* Parse data */
        const dataParse = event.target.result;
        const workbook = XLSX.read(dataParse, { type: "binary" });
        // console.log(workbook);

        /* Get first worksheet */
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];

        /* Convert excel to csv */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

        /* Update state */
        // console.log("Data>>>" + data); // shows that excel data is read
        // console.log(convertToJson(data)); // shows data in json format

        workbook.SheetNames.forEach((sheet) => {
          //sent csv to addData
          addData(data);
        });
      };
    } else {
      setMessage("No File");
      setShowFail(true);
      setShowSuccess(false);
    }
  };

  const addData = (csv) => {
    console.log("start add Data");

    //split row
    var lines = csv.split("\n");
    var max = lines.length;
    //split row headers
    var headers = lines[0].split(",");

    //check column 1 = country
    if (headers[0] === "country") {
      for (var i = 1; i < max; i++) {
        var obj = {};
        //split row data
        var currentline = lines[i].split(",");
        //data split in currentline to obj
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        //sent row data to server index.js
        Axios.post("http://localhost:5000/addData", {
          obj: obj,
        })
          .then(() => {
            setDataList([
              ...dataList,
              {
                obj: obj,
              },
            ]);
            setMessage("success");
            setShowSuccess(true);
            setShowFail(false);
          })
          .catch((error) => {
            setMessage(error.message);
            setShowFail(true);
          });
      }
    } else {
      setMessage("File not match");
      setShowFail(true);
      setShowSuccess(false);
    }
  };

  return (
    <div>
      {/* Alert Fail */}
      <Alert
        variant="danger"
        show={showFail}
        onClose={() => setShowFail(false)}
        dismissible
      >
        <Alert.Heading>{message}!</Alert.Heading>
      </Alert>

      {/* Alert Success */}
      <Alert
        variant="success"
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        dismissible
      >
        <Alert.Heading>{message}!</Alert.Heading>
      </Alert>

      <Card>
        <Card.Title>Upload Excel File </Card.Title>
        <Card.Body>
          <Row>
            <Col sm={2}></Col>

            <Col sm={6}>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  accept=".xls,.xlsx"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </Col>

            <Col sm={2}>
              <div className="d-grid gap-2">
                <button
                  type="button"
                  id="button"
                  onClick={readFile}
                  className="btn btn-info"
                >
                  Upload
                </button>
              </div>
            </Col>

            <Col sm={2}></Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UploadFile;
