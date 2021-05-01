import Axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Template.css";

import TableauEmb from "./TableauCom/TableauEmb";

function Template1() {
  return (
    <div className="Template1">
      <Card>
        <Card.Title>Data Show</Card.Title>
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
                  <Nav.Item>
                    <Nav.Link eventKey="e">Tab e</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="f">Tab f</Nav.Link>
                  </Nav.Item>
                </Nav>
               
              </Col>

              {/* Content */}
              <Col sm={10}>
                <Tab.Content>

                  {/* Content a */}
                  <Tab.Pane eventKey="a">
                    <Card border="secondary" style={{ height: "50rem" }}>
                      <Card.Header>a</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <TableauEmb />
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  {/* Content b */}
                  <Tab.Pane eventKey="b">
                    <Card border="secondary" style={{ height: "50rem" }}>
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

                  {/* Content e */}
                  <Tab.Pane eventKey="e">
                    <Card border="secondary" style={{ height: "50rem" }}>
                      <Card.Header>e</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  {/* Content f */}
                  <Tab.Pane eventKey="f">
                    <Card border="secondary" style={{ height: "50rem" }}>
                      <Card.Header>f</Card.Header>
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

export default Template1;
