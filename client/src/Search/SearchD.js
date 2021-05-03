import Axios from "axios";
import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import exportFromJSON from "export-from-json";

import "bootstrap/dist/css/bootstrap.min.css";

function SearchD() {
  const [dataList, setDataList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [isExport, setIsExport] = useState(true);

  const exportFile = (e) => {
    e.preventDefault();
    const data = dataList;
    const fileName = "search_D";
    const exportType = "csv";

    exportFromJSON({ data, fileName, exportType });
  };

  const getColorList = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:5000/getColor").then((response) => {
      setColorList(response.data);
    });
  };

  const getYearList = () => {
    Axios.get("http://localhost:5000/getYear").then((response) => {
      setYearList(response.data);
    });
  };

  const getDataList = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/getDataD", {
      year: year,
      color: color,
    }).then((response) => {
      setDataList(response.data);
    });

    setIsSearched(true);
    setIsExport(false);
  };

  return (
    <div className="App">
      <Card style={{ height: "30rem" }}>
        <Card.Title>
          d) Given a (year_input) and an input of (color_pm25) level of health
          concern from the user, calculate a total of the affected population
          (in number).
        </Card.Title>
        <Card.Body>
          <Card.Text>
            <Form>
              <Row className="justify-content-md-center">
                <Col sm={3}>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onClick={getYearList}
                    onChange={(event) => {
                      setYear(event.target.value);
                    }}
                  >
                    <option selected value="">
                      All Year
                    </option>
                    {yearList.map((val) => {
                      return <option value={val.Year}>{val.Year}</option>;
                    })}
                  </select>
                </Col>
                <Col sm={3}>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onClick={getColorList}
                    onChange={(event) => {
                      setColor(event.target.value);
                    }}
                  >
                    <option selected value="">
                      All Color PM 2.5
                    </option>
                    {colorList.map((val) => {
                      return <option value={val.color}>{val.color}</option>;
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

            <div className="table-responsive table-wrapper-scroll-x my-custom-scrollbar">
              {isSearched && (
                <table className="table table-striped  table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Year</th>
                      <th scope="col">Color_PM25</th>
                      <th scope="col">Affected_Population</th>
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
                            <td>{val.Year}</td>
                            <td>{val.Color}</td>
                            <td>{val.Affected_Population}</td>
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

export default SearchD;
