import React from 'react'
import { Container,Row,Col, Button } from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from 'react-router-dom';


function TodoList() {
  return (
    <Container>
      <Row>
        <Col>
          <h3 className="d-flex justify-content-center m-4">MY TODOS</h3>
          <Button>
            <i className="fa-solid fa-plus fa-beat fa-sm"></i>
          </Button>
          <Link to={"/todo/1"}>
            <div className="mt-2">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <b>Status</b>
                </InputGroup.Text>
                <Form.Control
                  placeholder={""}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                <InputGroup.Text>
                  <i className="fa-solid fa-trash fa-fade"></i>
                </InputGroup.Text>
              </InputGroup>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
export default TodoList