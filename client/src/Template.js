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

import TableauEmb from './TableauCom/TableauEmb';
import Table from './Show/Table';
import UploadFile from './Show/UploadFile';

function Template() {


  return (
    <div className="Template">
      <Row>
        <Col>
          {/* Card Upload File */}
         <UploadFile/>
          {/* End Card Upload File  */}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Card Data */}
          <Card>
            <Card.Title>Data</Card.Title>
            <Card.Body>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  {/* Nav Menu */}
                  <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  {/* Content */}
                  <Col sm={10}>
                    <Tab.Content>
                      {/* Content 1 */}
                      <Tab.Pane eventKey="first">
                        <Card border="secondary" style={{ height: "50rem" }}>
                          <Card.Header>first</Card.Header>
                          <Card.Body>
                            <Card.Text>
                            <TableauEmb/>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>

                      {/* Content 2 */}
                      <Tab.Pane eventKey="second">
                        <Card border="secondary" style={{ height: "50rem" }}>
                          <Card.Header>second</Card.Header>
                          <Card.Body>
                            <Card.Text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
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
          {/* End Card Data */}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Table  */}
          {/* <Table/> */}
          {/* End table  */}
        </Col>
      </Row>
    </div>
  );
}

export default Template;
