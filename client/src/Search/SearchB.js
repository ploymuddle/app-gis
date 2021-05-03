import Axios from "axios";
import React, { useState } from "react";
import exportFromJSON from "export-from-json";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";

function SearchB() {
  const [dataList, setDataList] = useState([]);
  const [dropdrow, setDropdrow] = useState([]);
  const [country, setCountry] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [isExport, setIsExport] = useState(true);

  const exportFile = (e) => {
    e.preventDefault();
    const data = dataList;
    const fileName = "search_B";
    const exportType = "csv";

    exportFromJSON({ data, fileName, exportType });
  };

  const getDropdrow = () => {
    Axios.get("http://localhost:5000/getCountry").then((response) => {
      setDropdrow(response.data);
    });
  };

  const getDataList = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/getDataB", {
      country: country,
    }).then((response) => {
      setDataList(response.data);
    });
    setIsSearched(true);
    setIsExport(false);
  };

  const getDataListB = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/getDataB", {
      country: "",
    }).then((response) => {
      setDataList(response.data);
    });
    setIsSearched(true);
    setIsExport(false);
  };

  return (
    <div className="SearchB">
      <Card style={{ height: "30rem" }}>
        <Card.Title>
          <Row>
            <Col sm={9}>
              b) Calculate the AVG(PM 2.5) by country (show the results in a
              decreasing order).
            </Col>
            <Col sm={1}>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-sm"
                  onClick={getDataListB}
                >
                  Search
                </button>
              </div>
            </Col>
            <Col sm={1}>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-outline-warning btn-sm"
                  disabled={isExport}
                  onClick={exportFile}
                >
                  Export
                </button>
              </div>
            </Col>
          </Row>
        </Card.Title>
        <Card.Body>
          <Card.Text>
            <Form>
              <Row className="justify-content-md-center">
                <Col sm={3}>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onClick={getDropdrow}
                    onChange={(event) => {
                      setCountry(event.target.value);
                    }}
                  >
                    <option selected value="">
                      All
                    </option>
                    {dropdrow.map((val) => {
                      return <option value={val.country}>{val.country}</option>;
                    })}
                  </select>
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
                    <button
                      type="submit"
                      className="btn btn-warning"
                      disabled={isExport}
                      onClick={exportFile}
                    >
                      Export
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>

            <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
              {isSearched && (
                <table className="table table-striped  table-hover">
                  <thead>
                    <tr>
                      <th scope="col">country</th>
                      <th scope="col">average_pm25</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.length === 0 ? (
                      <tr class="no-data">
                        <td colspan="11">No Data</td>
                      </tr>
                    ) : (
                      dataList.map((val) => {
                        return (
                          <tr>
                            <td>{val.Country}</td>
                            <td>{val.Average_PM_25}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SearchB;
