import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

// file import
import { selectUser } from "../../feature/auth/authSlice";
import { BACKEND_URL } from "../../constants/constant";

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

  let template = (
    <Container className="container">
      <Row className="align-items-center" style={{ height: "100vh" }}>
        <Col className="my-auto">
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" variant="warning" />
          </div>
        </Col>
      </Row>
    </Container>
  );
  if (viewtodos?.title) {
    template = (
      <Container>
        <Row className="align-items-center" style={{ height: "85vh" }}>
          <Col className="my-auto">
            <div className="d-flex justify-content-center">
              <Card>
                <Card.Body className="bg-primary">
                  <Card.Title className="fs-2">
                    Title : {viewtodos?.title}
                  <Link to={`/edit/${viewtodos._id}`}>  <i class="fa-sharp fa-solid fa-file-pen fa-beat-fade ms-1"></i></Link>
                  </Card.Title>
                  <Card.Text className="fs-3">
                    Description : {viewtodos?.description}
                  </Card.Text>
                  <Card.Text className="fs-5">
                    <i className="fa-solid fa-clock fa-bounce"></i>{" "}
                    {dayjs(viewtodos?.updatedAt).format("DD/MM/YY hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return template;
}

export default Todo;
