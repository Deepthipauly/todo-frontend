import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../constants/constant";
import { userLogin } from "../../feature/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Please Enter your description"),
    }),

    onSubmit: async (values) => {
      try {
        await axios.post(`${BACKEND_URL}/auth/login`, {
          title: values.title,
          description: values.description,
        });

        alert("Successfully");
        // navigate to home
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
                  <InputGroup.Text id="basic-addon1">title</InputGroup.Text>
                  <Form.Control
                    id="title"
                    placeholder="title"
                    aria-label="title"
                    name="title"
                    type="title"
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
                    aria-label="description"
                    name="description"
                    type="description"
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
                >
                  INPROGRESS
                </Button>
                <Button
                  className="me-3 btn btn-primary mt-1"
                  size="md"
                  type="submit"
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

export default Login;
