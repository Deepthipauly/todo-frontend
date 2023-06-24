import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';


function Todo() {
  return (
    <Container>
      <Row className="align-items-center" style={{ height: "100vh" }}>
        <Col className="my-auto">
          <div className="d-flex justify-content-center">
            <Card>
              <Card.Body>
                <Card.Title>
                  Special title treatment
                  <i class="fa-sharp fa-solid fa-file-pen fa-beat-fade ms-1"></i>{" "}
                </Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Todo;