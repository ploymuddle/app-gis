// import { useState } from "react";
// import * as XLSX from "xlsx";

function Excel() {

  // console.log(window.XLSX);

  // const [selectedFile, setSelectedFile] = useState();
  // console.log(selectedFile);
  // const [data, setData] = useState([]);

  // const readFile = () => { 

  //   console.log("get");
  //   XLSX.utils.json_to_sheet(data, 'out.xlsx');
    
  // }

  // let data = [
  //   {
  //     name: "jayanth",
  //     data: "scd",
  //     abc: "sdef",
  //   },
  // ];

//   document.getElementById('button').addEventListener("click", () => {
    // XLSX.utils.json_to_sheet(data, 'out.xlsx');
//     if(selectedFile){
//         let fileReader = new FileReader();
//         fileReader.readAsBinaryString(selectedFile);
//         fileReader.onload = (event)=>{
//          let data = event.target.result;
//          let workbook = XLSX.read(data,{type:"binary"});
//          console.log(workbook);
//          workbook.SheetNames.forEach(sheet => {
//               let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
//               console.log(rowObject);
//               document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
//          });
//         }
//     }
// });

  // return (
  //   <div className="Excel row">
  //     <div className="col">
  //       <input type="file" name="files" id="input" accept=".xls,.xlsx"
  //        value={selectedFile || ''}
  //        onChange={(e) => setSelectedFile(e.target.files[0])}
  //       />
  //     </div>
  //     <div className="col">
  //       <button className="btn btn-primary" id="button" onClick={readFile}>
  //         Convert
  //       </button>
  //     </div>
  //     <div>
  //       <pre id="jsondata"></pre>
  //     </div>
  //   </div>
  // );
}

export default Excel;
