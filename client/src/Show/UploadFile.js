import Axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";


function UploadFile() {
  const [file, setFile] = useState();
  const [dataList, setDataList] = useState([]);

  const readFile = () => {
    // XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      // event = on_file_select event
      fileReader.onload = (event) => {
        /* Parse data */
        const dataParse = event.target.result;
        const workbook = XLSX.read(dataParse, { type: "binary" });
        console.log(workbook);

        /* Get first worksheet */
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        /* Update state */
        console.log("Data>>>" + data); // shows that excel data is read
        // console.log(convertToJson(data)); // shows data in json format

        workbook.SheetNames.forEach((sheet) => {
          const rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
          console.log(rowObject);
          // setJsonData(JSON.stringify(rowObject, undefined, 4));
          addData(data);
        });
      };
    }
  };

  const addData = (csv) => {
    var lines = csv.split("\n");

    // var result = [];

    var headers = lines[0].split(",");
    // console.log(headers);
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      if (obj.name !== "") {
        Axios.post("http://localhost:5000/addData", {
          obj: obj,
        }).then(() => {
          setDataList([
            ...dataList,
            {
              obj: obj,
            },
          ]);
        });
      }
    }
    // console.log(JSON.stringify(result));
  };

  return (
    <div className="">
      <Card >
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
