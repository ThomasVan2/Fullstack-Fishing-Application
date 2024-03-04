import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }

  // Handles user logout using Okta's signOut method.
  const handleLogout = async () => oktaAuth.signOut();

  return (
    <nav className="navbar navbar-expand-lg navbar-color py-3">
      <div className="container-fluid">
        <span className="nav-link text-black">Fish On</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link me-5 text-black" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink className="nav-link text-black" to="/search">
                Explore Fish
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link text-black" to="/catch">
                Log My Catch
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link text-black" to="/userprofile">
                Profile
              </Link>
            </li>
            {!authState.isAuthenticated ? (
              <li className="nav-item m-1">
                <Link
                  type="button"
                  className="btn btn-outline-dark text-black"
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
            ) : (
              <li>
                <button
                  className="btn btn-outline-dark text-black"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
