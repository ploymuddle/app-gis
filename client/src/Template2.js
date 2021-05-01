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
import SearchA from "./Search/SearchA";
import SearchB from "./Search/SearchB";
import SearchC from "./Search/SearchC";
import SearchD from "./Search/SearchD";

function Template2() {

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
                    <SearchA/>
                  </Tab.Pane>

                  {/* Content b */}
                  <Tab.Pane eventKey="b">
                  <SearchB/>
                  </Tab.Pane>

                  {/* Content c */}
                  <Tab.Pane eventKey="c">
                  <SearchC/>
                  </Tab.Pane>

                  {/* Content d */}
                  <Tab.Pane eventKey="d">
                  <SearchD/>
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
