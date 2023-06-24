import React from 'react';
import "./header.css";

function header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg " data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
          <i className="fa-solid fa-house-user fa-xl ms-4"></i>
          </a>
          <div className="d-flex headerFont">
          <div className="navbar-brand fs-4 me-4">Logout</div>
      </div>
        </div>
      </nav>
    </div>
  );
}

export default header