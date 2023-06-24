import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../constants/constant";
import axios from "axios";
import { selectUser } from "../../feature/auth/authSlice";
import { useSelector } from "react-redux";
import "./todolist.css";
import Add from "../add/add";

function TodoList() {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [todos, setTodos] = useState([]);
  const userData = useSelector(selectUser);
  const params = useParams();
  const navigate = useNavigate();
  console.log("userData", userData);
  const fetchAllTodos = async () => {
    try {
      const allTodos = await axios.get(`${BACKEND_URL}/task/all_todo`, {
        headers: {
          access_token: userData.token,
        },
      });
      setTodos(allTodos.data.data);
    } catch (e) {
      console.log("error in fetch todos", e);
      alert("unable to fetch todos");
    }
  };

  const deleteTodo = async (todoID) => {
    try {
      await axios.delete(`${BACKEND_URL}/task/delete_todo/${todoID}`, {
        headers: {
          access_token: userData.token,
        },
      });
      fetchAllTodos();
    } catch (e) {
      console.log("error in deleting todos", e);
      alert("unable to delete todos");
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

  const callBacktochild = (error = undefined) => {
    if (error) alert(error);
    setShowAddTodo(false);
    fetchAllTodos();
  };

  const viewTodo = (todoId) => {
    navigate(`/todo/${todoId}`);
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="d-flex justify-content-center m-4">MY TODOS</h3>
          {!showAddTodo ? (
            <Button type="submit" onClick={updateAddTodo}>
              <i className="fa-solid fa-plus fa-beat fa-sm"></i>
            </Button>
          ) : null}
          {showAddTodo ? <Add handleCallBack={callBacktochild} /> : null}

          {todos.map((allTodos) => (
            <div key={allTodos._id} className="mt-2">
              <InputGroup className="mb-3">
                <InputGroup.Text
                  onClick={() => {
                    viewTodo(allTodos._id);
                  }}
                  id="basic-addon1"
                >
                  <b className="statusStyle"> {allTodos.status}</b>
                </InputGroup.Text>
                <Form.Control
                  onClick={() => {
                    viewTodo(allTodos._id);
                  }}
                  className="fs-3 statusStyle"
                  placeholder={allTodos.title}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />

                <InputGroup.Text>
                  <i
                    onClick={() => {
                      deleteTodo(allTodos._id);
                    }}
                    className="fa-solid fa-trash fa-fade"
                  ></i>
                </InputGroup.Text>
              </InputGroup>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
export default TodoList;
