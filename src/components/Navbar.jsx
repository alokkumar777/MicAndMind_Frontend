import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MicAndMind
        </Link>
        <div>
          <Link className="btn btn-outline-primary me-2" to="/">
            Home
          </Link>
          {user && (
            <Link className="btn btn-outline-info me-2" to="/profile">
              Profile
            </Link>
          )}
          {user ? (
            <>
              <Link className="btn btn-outline-success me-2" to="/create">
                Create Blog
              </Link>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-success me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-secondary" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
