import Axios from "axios";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function Table() {
    
  const [dataTable, setDataTable] = useState([]);

  const getDataTable = () => {
    Axios.get("http://localhost:5000/getData").then((response) => {
      setDataTable(response.data);
    });
  };

  getDataTable();

  return (
    <div className="Table">
      <Card>
        <Card.Title>Table</Card.Title>
        <Card.Body>
          <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-striped  table-hover">
              <thead>
                <tr>
                  <th scope="col">country</th>
                  <th scope="col">city</th>
                  <th scope="col">year</th>
                  <th scope="col">pm25</th>
                  <th scope="col">latitude</th>
                  <th scope="col">longitude</th>
                  <th scope="col">population</th>
                  <th scope="col">wbinc16_text</th>
                  <th scope="col">Region</th>
                  <th scope="col">conc_pm25</th>
                  <th scope="col">color_pm25</th>
                </tr>
              </thead>
              <tbody>
                <tr class="no-data">
                  <td colspan="11">No data</td>
                </tr>
                {dataTable.map((val) => {
                  return (
                    <tr>
                      <td>{val.country}</td>
                      <td>{val.city}</td>
                      <td>{val.year}</td>
                      <td>{val.pm25}</td>
                      <td>{val.latitude}</td>
                      <td>{val.longitude}</td>
                      <td>{val.population}</td>
                      <td>{val.wbinc16_text}</td>
                      <td>{val.Region}</td>
                      <td>{val.conc_pm25}</td>
                      <td>{val.color_pm25}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Table;
