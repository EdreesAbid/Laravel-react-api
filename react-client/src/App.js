import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditUser from "./components/user/edit.component";
import UserList from "./components/user/list.component";
import CreateUser from "./components/user/create.component";

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Basic Users App (With React and Laravel)
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
            <Route exact path='/' element={<UserList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;