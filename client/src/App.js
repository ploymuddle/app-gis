import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";

import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Footer from "./Footer";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">PM2.5</Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="sticky-top justify-content-center" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">
                <NavLink to="/home" activeStyle={{ color: "white" }}>
                  Maps
                </NavLink>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/Template2">
                <NavLink to="/Template2" activeStyle={{ color: "white" }}>
                  Search
                </NavLink>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/Template2">
                <NavLink to="/Template3" activeStyle={{ color: "white" }}>
                  Upload File
                </NavLink>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Develop By:{" "}
              {["bottom"].map((placement) => (
                <OverlayTrigger
                  trigger="click"
                  key={placement}
                  placement={placement}
                  overlay={
                    <Popover bg="dark" id={`popover-positioned-${placement}`}>
                      {/* <Popover.Title as="h3"></Popover.Title> */}
                      <Popover.Content>
                        <p>
                          <strong>60050174</strong> Dullayut Thabthimthong{" "}
                        </p>
                        <p>
                          <strong>60050212</strong> Ploypilin Bunprasoet
                        </p>
                        <p>
                          <strong>60050262</strong> Siravit Kittidecha{" "}
                        </p>
                        <p>
                          <strong>60050268</strong> Suphaphorn Khanngoen{" "}
                        </p>
                        <p>
                          <strong>60050273</strong> Atiwath Chimthiam{" "}
                        </p>
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <a href="#login">Team</a>
                </OverlayTrigger>
              ))}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        <div style={{ height: "36rem" }}>
          {/* <Row> */}
          {/* Card Data */}

          <Switch>
            <Route path="/Template2">
              <div className="Template">
                <Template2 />
              </div>
            </Route>
            <Route path="/Template3">
              <div className="Template">
                <Template3 />
              </div>
            </Route>
            <Route path="/home">
              <Template1 />
            </Route>
            <Route path="/">
              <Template1 />
            </Route>
          </Switch>

          {/* End Card Data */}
          {/* </Row> */}
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
