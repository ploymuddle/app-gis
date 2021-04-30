// import Hello from './TestCRUD/HelloMessage';
// import Excel from './TestUploadFile/excel';
// import File from './TestUploadFile/File';
import FileExcel from "./TestUploadFile/FileExcel";
// import Users from './TestCRUD/Users';
import Template from "./Template";
import Footer from "./Footer";

import Navbar from "react-bootstrap/Navbar";
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

      

      {/* <Hello/> */}
      {/* <Excel/> */}
      {/* <File/> */}
      {/* <FileExcel/> */}
      <Template />
      {/* <hr/> */}
      {/* <Users/> */}
      <Footer/>
    </div>
  );
}

export default App;
