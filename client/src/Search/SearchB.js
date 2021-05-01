import Axios from "axios";
import React, { useState } from "react";
import exportFromJSON from 'export-from-json';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";

function SearchB() {
  const [dataList, setDataList] = useState([]);
  
  const [country, setCountry] = useState("");

  const exportFile = (e) => {
    e.preventDefault();
    const data = dataList;
    const fileName = 'download';
    const exportType = 'csv';

    exportFromJSON({ data, fileName, exportType })
  };

  const getDataList = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/getDataB", {
      country: country,
    }).then((response) => {
      setDataList(response.data);
    });
  };

  return (
    <div className="SearchB">
      <Card style={{ height: "50rem" }}>
        <Card.Title>
          b) Calculate the AVG(PM 2.5) by country (show the results in a decreasing order).
        </Card.Title>
        <Card.Body>
          <Card.Text>
            <Form>
              <Row className="justify-content-md-center">
                <Col sm={3}>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Country"
                    aria-label="Country"
                    onChange={(event) => {
                      setCountry(event.target.value);
                    }}
                  ></input>
                </Col>
                
                <Col sm={2}>
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={getDataList}
                    >
                      Search
                    </button>
                  </div>
                </Col>
                <Col sm={2}>
                  <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-warning"  onClick={exportFile}>
                      Export
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>

            <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table table-striped  table-hover">
                <thead>
                  <tr>
                    <th scope="col">country</th>
                    <th scope="col">average_pm25</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="no-data">
                    <td colspan="11">No data</td>
                  </tr>
                  {dataList.map((val) => {
                    return (
                      <tr>
                        <td>{val.Country}</td>
                        <td>{val.Average_PM_25}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SearchB;
