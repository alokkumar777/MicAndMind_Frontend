import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-center">
          <Link className="navbar-brand" to="/">
            MicAndMind
          </Link>
        </div>
      </nav>
      <div className="bottom-nav">
        <Link className="btn btn-outline-primary" to="/">
          <i className="fas fa-home"></i>
        </Link>
        {user && (
          <Link className="btn btn-outline-info" to="/profile">
            <i className="fas fa-user"></i>
          </Link>
        )}
        {user ? (
          <>
            <Link className="btn btn-outline-success" to="/create">
              <i className="fas fa-plus-square"></i>
            </Link>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-success" to="/login">
              <i className="fas fa-sign-in-alt"></i>
            </Link>
            <Link className="btn btn-outline-secondary" to="/register">
              <i className="fas fa-user-plus"></i>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;