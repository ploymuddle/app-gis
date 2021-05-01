import Template from "./Template";
import Footer from "./Footer";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import UploadFile from "./Show/UploadFile";
import Template1 from "./Template1";
import Template2 from "./Template2";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
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

        {/* <Template /> */}

        <Row>
          <Col>
            {/* Card Upload File */}
            <UploadFile />
            {/* End Card Upload File  */}
          </Col>
        </Row>

        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">
              <Link to="/home">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Template2">
              <Link to="/Template2">About</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <div className="Template">
          <Row>
            {/* Card Data */}
            <Col>
              <Switch>
                <Route path="/Template2">
                  <Template2 />
                </Route>
                <Route path="/">
                  <Template1 />
                </Route>
              </Switch>
            </Col>
            {/* End Card Data */}
          </Row>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
