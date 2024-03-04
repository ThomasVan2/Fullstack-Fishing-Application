import React from "react";
import FishModel from "../../../models/FishModel";
import { Link } from "react-router-dom";

// Component for displaying a single fish's information and providing a link to its detailed page.
export const FindFish: React.FC<{ fish: FishModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {/* Checks if the fish has an image, otherwise, it might display a placeholder or a different image. */}
        {props.fish.img ? (
          <img src={props.fish.img} width="220" height="220" alt="fish" />
        ) : (
          <img src={props.fish.img} width="220" height="250" alt="fish" />
        )}

        <h6 className="mt-2">{props.fish.commonName}</h6>
        <Link
          className="btn bg-racetrack-button text-black "
          to={`/FishInformationPage/${props.fish.id}`}
        >
          Catch
        </Link>
      </div>
    </div>
  );
};
