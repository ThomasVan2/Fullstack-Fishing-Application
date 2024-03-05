import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

// Component showcasing key features or calls-to-action, designed to be visible on large screens.
export const Heros = () => {
  const { oktaAuth, authState } = useOktaAuth();

  return (
    <div className="d-none d-lg-block">
      <div className="row g-0 mt-5">
        <div className="col-sm-6 col-md-6">
          <div className="col-image-left"></div>
        </div>
        <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
          <div className="ml-2">
            <h2>
              Get Ready to cast your line and reel in moments that last a
              lifetime.
            </h2>
            <p>
              Where every catch is an opportunity to forge unforgettable bonds
              and create stories that you and your loved ones will share for
              years to come.
            </p>

            {!authState?.isAuthenticated ? (
              <Link
                type="button"
                className="btn btn-lg bg-racetrack-button"
                to=""
              >
                Sign Up
              </Link>
            ) : (
              <button className="btn btn-lg bg-racetrack-button">
                Log My Catch
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="row g-0">
        <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
          <div className="ml-2">
            <h2>Discover new trophy catches with FishOn!</h2>
            <p>
              Embark on an exhilarating journey with FishOn, where we're
              dedicated to helping you discover and land your next trophy catch.
              We'll guide you to the waters where legends are made, ensuring
              your next fishing adventure becomes a cherished memory
            </p>
            <Link
              type="button"
              className="btn btn-lg bg-racetrack-button"
              to="search"
            >
              Explore Fish
            </Link>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="col-image-right"></div>
        </div>
      </div>
      {/**Mobile too come*/}
    </div>
  );
};
