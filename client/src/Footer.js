// import Axios from "axios";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Footer.css";

function Footer() {

  return (
    <div >
      <div id="footer" className="text-center p-3">
        <Container>
          <Row>
            <Col sm={8}>
              <p> พลอยไพลิน   บุญประเสริฐ </p>
            </Col>
            <Col sm={4}>
              <p> 60050212 </p>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <p> PLOYMUDDLE </p>
            </Col>
            <Col sm={4}>
              <p> 60050212 </p>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <p> PLOYMUDDLE </p>
            </Col>
            <Col sm={4}>
              <p> 60050212 </p>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <p> สุภาภรณ์   ขันเงิน </p>
            </Col>
            <Col sm={4}>
              <p> 60050268 </p>
            </Col>
          </Row>
  
        </Container>

      </div>
      <div className="copy-div">
          <a className="text-white" href="https://mdbootstrap.com/">
          © 2020 Copyright : MDBootstrap.com
          </a>
        </div>
    </div>
  );
}

export default Footer;