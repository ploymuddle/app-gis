import Axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Template.css";

import UploadFile from "./Show/UploadFile";
import Template1 from "./Template1";
import Template2 from "./Template2";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Template() {
  return (
    <div className="Template">
      <Row>
        <Col>
          {/* Card Upload File */}
          <UploadFile />
          {/* End Card Upload File  */}
        </Col>
      </Row>

      <Row>
        {/* Card Data */}
        <Col>
        <Router>
          <Tabs defaultActiveKey="template1" id="uncontrolled-tab-example">
            {/*template1 */}
       <Tab eventKey="template1" title="Show [5]">
              <Template1/>
            </Tab>
            {/*template2 */}
            <Tab eventKey="template2" title="Export [4]">
            <Template2/>
            </Tab>
          </Tabs>
        </Router>
        </Col>
        {/* End Card Data */}
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
