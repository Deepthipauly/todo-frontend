// package import
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// import css
import "./header.css";

import { BACKEND_URL } from "../../constants/constant";
import { selectUser, userLogout } from "../../feature/auth/authSlice";

function Header() {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      if (!userData.token) {
        dispatch(userLogout());
        navigate("/");
        return;
      }
      await axios.post(
        `${BACKEND_URL}/auth/logout`,
        {},
        {
          headers: {
            access_token: userData.token,
          },
        }
      );
      dispatch(userLogout());
      navigate("/");
    } catch (error) {
      console.error("error", error);
      alert(error.response.data.error || "something went wrong");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <div className="navbar-brand">
            <Link to={"/todos"}>
              <i className="fa-solid fa-house-user fa-xl ms-4"></i>
            </Link>
          </div>
          <div className="d-flex headerFont">
            <div
              className="navbar-brand fs-4 me-4"
              onClick={() => {
                logout(userData?.token);
              }}
            >
              Logout
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;
