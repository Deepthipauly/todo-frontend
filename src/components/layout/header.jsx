import React from 'react';
import "./header.css";
import { Link } from 'react-router-dom';

function header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <div className="navbar-brand">
         <Link to={"/todos"}> <i className="fa-solid fa-house-user fa-xl ms-4" ></i></Link>
          </div>
          <div className="d-flex headerFont">
          <div className="navbar-brand fs-4 me-4">Logout</div>
      </div>
        </div>
      </nav>
    </div>
  );
}
export default header