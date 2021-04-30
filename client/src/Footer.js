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
              <p> PLOYMUDDLE </p>
            </Col>
            <Col sm={4}>
              <p> 60050212 </p>
            </Col>
          </Row>
        </Container>
        © 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </div>
  );
}

export default Footer;