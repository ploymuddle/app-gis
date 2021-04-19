import React, { useState } from "react";
import * as XLSX from "xlsx";
import Axios from "axios";

function FileExcel() {
  const [file, setFile] = useState();
  //   const [data, setData] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [dataList, setDataList] = useState([]);

  //   const [name, setName] = useState("");
  //   const [age, setAge] = useState(0);
  //   const [number, setNumber] = useState("");

  //   console.log(file);
  //   const inputFile = (e) => {
  //     // e.stopPropagation();
  //     // e.preventDefault();
  //     // var file = e.target.files[0];
  //     // console.log(file);
  //     //--------
  //     const reader = new FileReader();
  //     reader.onload = (evt) => {
  //       // evt = on_file_select event
  //       /* Parse data */
  //       const bstr = evt.target.result;
  //       const wb = XLSX.read(bstr, { type: "binary" });
  //       /* Get first worksheet */
  //       const wsname = wb.SheetNames[0];
  //       const ws = wb.Sheets[wsname];
  //       /* Convert array of arrays */
  //       const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
  //       /* Update state */
  //       console.log("Data>>>" + data); // shows that excel data is read
  //       this.setData = convertToJson(data);
  //       console.log(convertToJson(data)); // shows data in json format
  //     };
  //     reader.readAsBinaryString(file);
  //   };

  // shows data in json format ***
  //   const convertToJson = (csv) => {
  //     var lines = csv.split("\n");

  //     var result = [];

  //     var headers = lines[0].split(",");

  //     for (var i = 1; i < lines.length; i++) {
  //       var obj = {};
  //       var currentline = lines[i].split(",");

  //       for (var j = 0; j < headers.length; j++) {
  //         obj[headers[j]] = currentline[j];
  //       }
  //       result.push(obj);
  //     }
  //     //return result; //JavaScript object
  //     return JSON.stringify(result); //JSON
  //   };

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
          setJsonData(JSON.stringify(rowObject, undefined, 4));
          addData(data);
        });
      };
    }
  };

  const addData = (csv) => {
    var lines = csv.split("\n");

    var result = [];
    var headers = lines[0].split(",");
    // console.log(headers);
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      if (obj.name !== "") {
        Axios.post("http://localhost:3001/addData", {
          obj: obj,
        }).then(() => {
          setDataList([
            ...dataList,
            {
              obj: obj,
            },
          ]);
        });
        // console.log(obj.name)
      }

      //   result.push(obj);
      //   console.log();
    }
    // console.log(JSON.stringify(result));
  };

  return (
    <div className="Excel row">
      <div className="col">
        <input
          type="file"
          id="file"
          accept=".xls,.xlsx"
          //   onChange={(e) => inputFile(e)}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="col">
        <button className="btn btn-primary" id="button" onClick={readFile}>
          Convert
        </button>
      </div>
      <br />
      <br />
      <div className="card">
        <pre id="jsondata">{jsonData}</pre>
      </div>
    </div>
  );
}

export default FileExcel;
