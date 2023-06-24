import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../constants/constant";
import axios from "axios";
import { selectUser } from "../../feature/auth/authSlice";
import { useSelector } from "react-redux";
import "./todolist.css";

function TodoList() {
  const [showAddTodo, setShowAddTodo] = useState(false)
  const [todos, setTodos] = useState([]);
  const userData = useSelector(selectUser);
  console.log("userData",userData)
  const fetchAllTodos = async () => {
    try {
      const allTodos = await axios.get(`${BACKEND_URL}/task/all_todo`,{
      headers: {
        access_token: userData.token
      }
      });
      setTodos(allTodos.data.data);
    } catch (e) {
      console.log("error in fetch todos", e);
      alert("unable to fetch todos");
    }
  };

  const updateAddTodo = () => {
    if (!userData.token) {
      alert("Please Login to Add Todos");
      setShowAddTodo(false);
      return;
    }
    setShowAddTodo((prev) => !prev);
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="d-flex justify-content-center m-4">MY TODOS</h3>
          <Button>
            <i className="fa-solid fa-plus fa-beat fa-sm"></i>
          </Button>
            {todos.map((allTodos) => (
              <Link to={`/todo/${allTodos._id}`} className="statusStyle">
              <div key={allTodos._id} className="mt-2">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <b>{allTodos.status}</b>
                  </InputGroup.Text>
                    <Form.Control className="fs-3"
                     placeholder={allTodos.title}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  <InputGroup.Text>
                    <i className="fa-solid fa-trash fa-fade"></i>
                  </InputGroup.Text>
                </InputGroup>
              </div>
              </Link>
            ))}
        </Col>
      </Row>
    </Container>
  );
}
export default TodoList;
