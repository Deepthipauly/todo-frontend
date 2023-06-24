import React, { useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { selectUser,userLogout } from "../../feature/auth/authSlice";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../constants/constant";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Add({ todouniqueId, handleCallBack }) {
  const [newTodo, setNewTodo] = useState("");
  const userData = useSelector(selectUser);
  const dispatch=useDispatch();
  const navigate = useNavigate();
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
         await axios.post(
          `${BACKEND_URL}/task/add_todo`,
          { title: values.title,
            description: values.description, },
          {
            headers: {
              access_token: userData.token,
            },
          }
        );

        handleCallBack();
      } catch (error) {
        handleCallBack(error.response?.data?.error || "something went wrong");
      }
    },
  });
  useEffect(()=>{
    if(!userData.token){
      dispatch(userLogout());
      navigate("/");
    } 
  })
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
              <div className="d-flex">
               <div style={{flexGrow: "8"}} className="d-flex justify-content-center"> <h3 className="text-center">ADD TODO</h3></div>
                <i style={{flexGrow: "1"}} onClick={()=>{ handleCallBack()}} className="fa-solid fa-xmark fa-sm"></i>
              </div>

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
                  type="submit"
                  className="mt-2"
                  variant="warning"
                  size="md"
                >
                  Post
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Add;


