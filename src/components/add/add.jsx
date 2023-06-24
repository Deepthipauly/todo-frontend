import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


function add() {
  return (
    <Container className="mt-3" style={{ fontFamily: "Crimson Text" }}>
      <Row>
        <Col>
          <FloatingLabel controlId="floatingTextarea2" label="Review:">
            <Form.Control
              as="textarea"
              //   value={postContent}
              //   onChange={(e) => setPostContent(e.target.value)}
              placeholder="Enter New Todo.."
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <Button className="mt-3" variant="outline-danger" size="sm">
            Post
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default add;