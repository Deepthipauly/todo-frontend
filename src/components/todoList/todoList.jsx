import React from 'react'
import { Container,Row,Col, Button } from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


function TodoList() {
  return (
    <Container>
      <Row>
        <Col>
          <h3 className="d-flex justify-content-center m-4">MY TODOS</h3>

<Button><i class="fa-solid fa-plus fa-beat fa-sm"></i></Button>

          <div className="mt-2">
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><b>Status</b></InputGroup.Text>
              <Form.Control
                placeholder={""}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoList