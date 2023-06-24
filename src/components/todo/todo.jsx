import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { BACKEND_URL } from "../../constants/constant";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../feature/auth/authSlice";

function Todo() {
  const [viewtodos, setViewTodos] = useState();
  const userData = useSelector(selectUser);
  console.log("user", userData);
  const params = useParams();
  const todo = async (todoId) => {
    try {
      const todoData = await axios.get(
        `${BACKEND_URL}/task/view_todo/${todoId}`,
        {
          headers: {
            access_token: userData.token,
          },
        }
      );
      setViewTodos(todoData.data.data);
    } catch (e) {
      console.log("error in fetch todos", e);
      alert("unable to get todos");
    }
  };

  useEffect(() => {
    todo(params.id);
  }, []);

  return (
    <Container>
      <Row className="align-items-center" style={{ height: "85vh" }}>
        <Col className="my-auto">
          <div className="d-flex justify-content-center">
            <Card>
              <Card.Body>
                <Card.Title>
                  {viewtodos?.title}
                  <i class="fa-sharp fa-solid fa-file-pen fa-beat-fade ms-1"></i>{" "}
                </Card.Title>
                <Card.Text>{viewtodos?.description}</Card.Text>
                <Card.Text>{viewtodos?.updatedAt}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Todo;
