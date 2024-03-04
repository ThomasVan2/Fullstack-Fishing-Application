import React from "react";
import picture from "../../../Images/PublicImages/headerpic3.jpeg";
import App from "../../../App";
import { Link } from "react-router-dom";

// Defines a functional component for the application's header section.
export const HeaderContainer: React.FC = () => {
  return (
    <section className="p-5 main-color text-rigth header">
      <div
        className="container-fluid py-5 text-white d-flex justify-content-rigth 
        align-items-down"
      >
        <div>
          <h5 className="display-5 fw-bold text-grey">
            Find your next <br></br>Adventure
          </h5>
          <p className="col-md-8 fs-4 text-grey">
            Embark on a journey to discover the joy of fishing
          </p>
          <Link
            type="button"
            className="btn main-color bg-racetrack-button text-grey"
            to="/search"
          >
            Explore Fish
          </Link>
        </div>
      </div>
    </section>
  );
};
