// import Hello from './TestCRUD/HelloMessage';
// import Excel from './TestUploadFile/excel';
// import File from './TestUploadFile/File';
import FileExcel from "./TestUploadFile/FileExcel";
// import Users from './TestCRUD/Users';
import Template from "./Template";

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
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">PM2.5</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

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

      {/* <Hello/> */}
      {/* <Excel/> */}
      {/* <File/> */}
      {/* <FileExcel/> */}
      {/* <Template /> */}
      {/* <hr/> */}
      {/* <Users/> */}

      {/* <Footer> */}
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
      {/* </Footer> */}
    </div>
  );
}

export default App;
