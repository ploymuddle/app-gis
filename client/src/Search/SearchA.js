import Axios from "axios";
import React, { useState } from "react";
import exportFromJSON from 'export-from-json';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";

function SearchA() {
  const [pm25, setPM25] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [dataList, setDataList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [colorList, setColorList] = useState([]);
  
  const exportFile = (e) => {
    e.preventDefault();
    const data = dataList;
    const fileName = 'download';
    const exportType = 'csv';

    exportFromJSON({ data, fileName, exportType })
  };

  // getColorList();
  // getYearList()

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
      console.log(year);

    Axios.post("http://localhost:5000/getDataA", {
      year: year,
      pm25: pm25,
    }).then((response) => {
      setDataList(response.data);
    });
  };

  // getYearList()
  // console.log(yearList);

  return (
   
    <div className="SearchA">
      <Card style={{ height: "50rem" }}>
        <Card.Title>
          a) List country and city names whose PM 2.5 values are greater than 50
          in 2015.
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
                    onChange={(event) => {
                      setYear(event.target.value);
                    }}
                  >
                    <option selected >select year</option>
                    <option value="null" >All</option>
                    <option value="2015">2015</option>
              
                  </select>
                </Col>
                <Col sm={2}>
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={ getDataList }
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
                  <tr className="no-data">
                    <td colspan="11">No data</td>
                  </tr>
                  {dataList.map((val) => {
                    return (
                      <tr>
                        <td>{val.country}</td>
                        <td>{val.city}</td>
                        <td>{val.Year}</td>
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
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SearchA;
