import Axios from "axios";
import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import exportFromJSON from 'export-from-json';
import "bootstrap/dist/css/bootstrap.min.css";


function SearchC() {
  const [dataList, setDataList] = useState([]);
  const [dropdrow, setDropdrow] = useState([]);
  const [country, setCountry] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [isExport, setIsExport] = useState(true);

  const exportFile = (e) => {
    e.preventDefault();
    const data = dataList;
    const fileName = 'search_C';
    const exportType = 'csv';

    exportFromJSON({ data, fileName, exportType })
  };

  const getDropdrow = () => {
    Axios.get("http://localhost:5000/getCountry").then((response) => {
      setDropdrow(response.data);
    });
  };

  const getDataList = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/getDataC", {
      country: country,
    }).then((response) => {
      setDataList(response.data);
    });
    setIsSearched(true);
    setIsExport(false);
  };

  return (
    <div className="SearchC">
      <Card style={{ height: "30rem" }}>
        <Card.Title>
          c) Given a (country_input) from the user, show a historical PM 2.5 values by year.
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
                    <option disabled selected>
                      Select Country
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
                  <button type="submit" className="btn btn-warning" disabled={isExport} onClick={exportFile}>
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
                    <th scope="col">year</th>
                    <th scope="col">country</th>
                    <th scope="col">pm25</th>
                  </tr>
                </thead>
                <tbody>
                {dataList.length === 0 ?
                      <tr class="no-data">
                        <td colspan="11">No Data</td>
                      </tr> :
                    dataList.map((val) => {
                    return (
                      <tr>
                        <td>{val.Year}</td>
                        <td>{val.Country}</td>
                        <td>{val.PM_25}</td>       
                      </tr>
                    );
                  })}
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

export default SearchC;
