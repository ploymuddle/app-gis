// import Axios from "axios";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FormFile from "react-bootstrap/FormFile";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Template.css";

function Template() {

  return (
    <div className="Container">
      
    <Row>
      <Col>
        <Card>
          <Card.Title>Card Title</Card.Title>
          <Card.Body>
            <Row>
              <Col sm={2}></Col>
              <Col sm={6}>
                <Form>
                  <Form.File
                    id="custom-file"
                    label="Custom file input"
                    custom
                  />
                </Form>
              </Col>
              <Col sm={2}>
                <Button
                  type="submit"
                  variant="warning"
                  className="mb-2"
                  block
                >
                  Submit
                </Button>
              </Col>
              <Col sm={2}></Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col sm={8}>
        <Card style={{ height: "50rem" }}>
          <Card.Title>Card Title</Card.Title>
          <Card.Body>This is some text within a card body.</Card.Body>
        </Card>
      </Col>
      <Col sm={4}>
        <Card style={{ height: "25rem" }}>
          <Card.Title>Card Title</Card.Title>
          <Card.Body>This is some text within a card body.</Card.Body>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <Card.Title>Card Title</Card.Title>
          <Card.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
  );
}

export default Template;