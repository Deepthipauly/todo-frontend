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

// css import
import "./login.css";

// file import
import { BACKEND_URL } from "../../constants/constant";
import { userLogin } from "../../feature/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("enter valid email").required("Required"),
      password: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    }),

    onSubmit: async (values) => {
      try {
        const loginForm = await axios.post(`${BACKEND_URL}/auth/login`, {
          email: values.email,
          password: values.password,
        });
        // data dispatch to auth slice
        const loginData = {
          token: loginForm.data.data.token,
          email: loginForm.data.data.email,
          userId: loginForm.data.data.userId,
        };
        dispatch(userLogin(loginData));

        alert("Login Successfully");
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
        <Row className="align-items-center" style={{ height: "100vh" }}>
          <Col className="mx-auto" sm={10} md={8} lg={6}>
            <div
              style={{
                borderRadius: "30px",
                boxShadow: "1px 2px 9px #F4AAB9",
              }}
              className="p-5"
            >
              <h3 className="text-center">Welcome Back</h3>
              <Form onSubmit={formik.handleSubmit}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">email</InputGroup.Text>
                  <Form.Control
                    id="email"
                    placeholder="email"
                    aria-label="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </InputGroup>
                <div style={{ color: "red" }}>
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : (
                    ""
                  )}
                </div>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                  <Form.Control
                    id="password"
                    placeholder="password"
                    aria-label="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </InputGroup>
                <div style={{ color: "red" }}>
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : (
                    ""
                  )}
                </div>
                <Button
                  className="me-3 btn btn-primary"
                  size="md"
                  type="submit"
                >
                  Login
                </Button>
                <p className="mt-2">
                  Don't have an Account?
                  <span href="">
                    <Link className="linkStyle" to={"/auth/register"}>
                      Register here
                    </Link>
                  </span>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
