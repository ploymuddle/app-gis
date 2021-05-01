import Axios from "axios";
import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Template.css";

function Template2() {
  const [dataList, setDataList] = useState([]);

  const getData = () => {
    Axios.get("http://localhost:5000/getDataA").then((response) => {
      setDataList(response.data);
    });
  };

      
  const [dataTable, setDataTable] = useState([]);

  const getDataList = () => {
    Axios.get("http://localhost:5000/getData").then((response) => {
      setDataTable(response.data);
    });
  };




  return (
    <div className="Template2">
      <Card>
        <Card.Title>Data Export</Card.Title>
        <Card.Body>
          <Tab.Container id="left-tabs-example" defaultActiveKey="a">
            <Row>
              {/* Nav Menu */}
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="a">Tab a</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="b">Tab b</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="c">Tab c</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="d">Tab d</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              {/* Content */}
              <Col sm={10}>
                <Tab.Content>
                  {/* Content a */}
                  <Tab.Pane eventKey="a">
                    <Card style={{ height: "50rem" }}>
                      <Card.Title>
                        a) List country and city names whose PM 2.5 values are
                        greater than 50 in 2015.
                      </Card.Title>
                      <Card.Body>
                        <Card.Text>
                          <Form>
                            <Row className="justify-content-md-center">
                              <Col sm={3}>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="PM 2.5 values"
                                  aria-label="PM 2.5 values"
                                ></input>
                              </Col>
                              <Col sm={3}>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>
                                    Open this select year
                                  </option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
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
                                  >
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
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  {/* Content b */}
                  <Tab.Pane eventKey="b">
                    <Card style={{ height: "50rem" }}>
                      <Card.Header>b</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  {/* Content c */}
                  <Tab.Pane eventKey="c">
                    <Card border="secondary" style={{ height: "50rem" }}>
                      <Card.Header>c</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  {/* Content d */}
                  <Tab.Pane eventKey="d">
                    <Card border="secondary" style={{ height: "50rem" }}>
                      <Card.Header>d</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
              {/* End Content */}
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Template2;
