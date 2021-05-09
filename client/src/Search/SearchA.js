import Axios from "axios";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import React, { useState } from "react";
import exportFromJSON from "export-from-json";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";

function SearchA() {
  const [pm25, setPM25] = useState("");
  const [year, setYear] = useState("");
  const [dataList, setDataList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isExport, setIsExport] = useState(true);

  const columns = [{
    dataField: 'id',
    text: 'Product ID'
  }, {
    dataField: 'name',
    text: 'Product Name'
  }, {
    dataField: 'price',
    text: 'Product Price'
  }];

  const exportFile = (e) => {
    e.preventDefault();
    const data = dataList;
    const fileName = "search_A";
    const exportType = "csv";

    exportFromJSON({ data, fileName, exportType });
  };

  const getYearList = () => {
    Axios.get("http://localhost:5000/getYear").then((response) => {
      setYearList(response.data);
    });
  };

  const getDataList = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/getDataA", {
      year: year,
      pm25: pm25,
    }).then((response) => {
      setDataList(response.data);
    });
    setIsSearched(true);
    setIsExport(false);
  };

  const getDataListA = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/getDataA", {
      year: "2015",
      pm25: "50",
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
          <Row>
            <Col sm={9}>
              a) List country and city names whose PM 2.5 values are greater
              than 50 in 2015.
            </Col>
            <Col sm={2}>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-sm"
                  onClick={getDataListA}
                >
                  ค้นหาตามโจทย์
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
                  <input
                    type="text"
                    className="form-control"
                    placeholder="PM 2.5 values"
                    aria-label="PM 2.5 values"
                    onChange={(event) => {
                      setPM25(event.target.value);
                    }}
                  ></input>
                </Col>
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
                <table id="dtBasicExample" class="table table-bordered table-sm  table-hover" cellspacing="0" width="100%">
                 {/* <table className="table table-striped  table-hover"> */}
                  <thead>
                    <tr>
                      <th class="th-sm">Country</th>
                      <th class="th-sm">City</th>
                      <th class="th-sm">Year</th>
                      <th class="th-sm">PM25</th>
                      {/* <th class="th-sm">latitude</th> */}
                      {/* <th class="th-sm">longitude</th> */}
                      {/* <th class="th-sm">Population</th> */}
                      {/* <th class="th-sm">Income</th> */}
                      {/* <th class="th-sm">Region</th> */}
                      {/* <th class="th-sm">conc_pm25</th> */}
                      {/* <th class="th-sm">color_pm25</th> */}
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
                            <td>{val.country}</td>
                            <td>{val.city}</td>
                            <td>{val.Year}</td>
                            <td>{val.pm25}</td>
                            {/* <td>{val.latitude}</td> */}
                            {/* <td>{val.longitude}</td> */}
                            {/* <td>{val.population}</td> */}
                            {/* <td>{val.wbinc16_text}</td> */}
                            {/* <td>{val.Region}</td> */}
                            {/* <td>{val.conc_pm25}</td> */}
                            {/* <td>{val.color_pm25}</td> */}
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

export default SearchA;
