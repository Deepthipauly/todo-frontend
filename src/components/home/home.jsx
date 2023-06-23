import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container style={{ fontFamily: "Crimson Text" }}>
      <Row className="align-items-center" style={{ height: "100vh" }}>
        <Col className="my-auto">
          <div className="d-flex justify-content-center">
            <div>
              <h1 className="animate__animated animate__bounce headingHover">
                TODO
              </h1>
            <Link to={"/auth/login"}>  <Button>Login</Button></Link>
            <p>Don't have an account? <Link to={"/auth/register"} style={{ textDecoration: "none", color: "red" }}>  Register Now </Link></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
