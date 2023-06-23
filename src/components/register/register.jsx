import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("enter validemail").required("Required"),
      password: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      passwordConfirmation: Yup.string().test(
        "passwords-match",
        "Passwords must match",
        function (value) {
          return this.parent.password === value;
        }
      ),
    }),

    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:4000/auth/register", {
          email: values.email,
          password: values.password,
        });
        alert("Registration Successfull");
        navigate("/auth/login");
      } catch (error) {
        console.error("error", error);
        alert(error.response.data.error || "something went wrong");
      }
    },
  });
  return (
    <div>
      <Container style={{ fontFamily: "Crimson Text" }}>
        <Row className="align-items-center" style={{ height: "100vh" }}>
          <Col className="mx-auto" sm={10} md={8} lg={6}>
            <div
              style={{
                borderRadius: "30px",
                boxShadow: "1px 2px 9px #F4AAB9",
              }}
              className="p-5"
            >
              <h3 className="text-center">Welcome</h3>
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

                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Confirm Password
                  </InputGroup.Text>
                  <Form.Control
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirmation}
                  />
                </InputGroup>

                <div style={{ color: "red" }}>
                  {formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation ? (
                    <div>{formik.errors.passwordConfirmation}</div>
                  ) : (
                    ""
                  )}
                </div>
                <Link to={"/auth/login"}>
                  <Button
                    className="me-3 btn btn-primary"
                    size="md"
                    type="submit"
                  >
                    Register
                  </Button>
                </Link>
                <p>
                  already have account?{" "}
                  <Link
                    to={"/auth/login"}
                    style={{ textDecoration: "none", color: "#e83283" }}
                  >
                    Login here
                  </Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
