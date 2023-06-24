// package import
import React,{useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// file import
import { BACKEND_URL } from "../../constants/constant";
import { selectUser, userLogout } from "../../feature/auth/authSlice";

// Edit component
const Edit = () => {
  // component state
  const [myTitle, setMyTitle] = useState("");
  const [myDescription, setMyDescription] = useState("");
  const [status, setStatus] = useState("INPROGRESS");

  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  // redux data
  const userData = useSelector(selectUser);
 
  useEffect(() => {
    if(!userData.token){
      dispatch(userLogout());
      navigate("/");
      return;
    } 
  // fetch a todo by id
    const gettingTodo = async () => {
      const response = await axios.get(`${BACKEND_URL}/task/view_todo/${params.id}`, {
        headers: {
          access_token: userData.token,
        },
      });
      setMyTitle(response.data.data.title);
      setMyDescription(response.data.data.description);
      setStatus(response.data.data.status);
    };
    gettingTodo();  
  }, []);
  // form validation
  const formik = useFormik({
    initialValues: {
      title: myTitle,
      description: myDescription,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Please Enter your description"),
    }),

    onSubmit: async (values) => {
      try {
        await axios.patch(
          `${BACKEND_URL}/task/edit_todo/${params.id}`,
          {
            title: values.title,
            description: values.description,
            status,
          },
          {
            headers: {
              access_token: userData.token,
            },
          }
        );
        alert("Todo Updated Successfully");
        navigate("/todos");
      } catch (error) {
        console.error("error", error);
        alert(error.response.data.error || "something went wrong");
      }
    },
  });

  return (
    <div>
      <Container className="container">
        <Row className="align-items-center" style={{ height: "85vh" }}>
          <Col className="mx-auto" sm={10} md={8} lg={6}>
            <div
              style={{
                borderRadius: "30px",
                boxShadow: "1px 2px 9px #F4AAB9",
              }}
              className="p-5"
            >
              <h3 className="text-center">EDIT TODO</h3>
              <Form onSubmit={formik.handleSubmit}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                  <Form.Control
                    id="title"
                    placeholder="title"
                    aria-label="title"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                </InputGroup>
                <div style={{ color: "red" }}>
                  {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                  ) : (
                    ""
                  )}
                </div>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Description
                  </InputGroup.Text>
                  <Form.Control
                    id="description"
                    placeholder="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                </InputGroup>
                <div style={{ color: "red" }}>
                  {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                  ) : (
                    ""
                  )}
                </div>
                <Button
                  className="me-3 btn btn-primary mt-1"
                  size="md"
                  type="submit"
                  onClick={() => {
                    setStatus("INPROGRESS");
                  }}
                >
                  INPROGRESS
                </Button>
                <Button
                  className="me-3 btn btn-primary mt-1"
                  size="md"
                  type="submit"
                  onClick={() => {
                    setStatus("COMPLETED");
                  }}
                >
                  COMPLETED
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Edit;
