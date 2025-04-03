import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default () => (
  <>
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary container-sm mx-auto"
      style={{ maxWidth: "768px" }}
    >
      <div className="container-fluid">
        <div></div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex justify-content-evenly w-100">
            <NavLink className="nav-link" to="/" end>
              Capture
            </NavLink>
            <NavLink className="nav-link" to="/checks">
              Checks
            </NavLink>
            <NavLink className="nav-link" to="/invoices">
              Invoices
            </NavLink>
            <NavLink className="nav-link" to="/companies">
              Companies
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  </>
);
