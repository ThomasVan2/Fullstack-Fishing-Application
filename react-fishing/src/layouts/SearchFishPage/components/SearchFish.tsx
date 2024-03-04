import React from "react";
import FishModel from "../../../models/FishModel";
import { Link } from "react-router-dom";

interface SearchFishProps {
  fish: FishModel;
  onClick: () => void;
}

// SearchFish component: Displays a single fish in a card format that can be clicked to view more details.
export const SearchFish: React.FC<SearchFishProps> = ({ fish, onClick }) => {
  return (
    <div className="col-sm-3 col-md-6 col-lg-3 mb-5 fish-box">
      <Link
        className="btn p-0 w-100 btn-outline-blue"
        onClick={onClick}
        style={{ textAlign: "center", width: "250px", height: "350px" }}
        to={`/FishInformationPage/${fish.id}`}
      >
        <div className="card h-100">
          <div style={{ paddingBottom: "80%", position: "relative" }}>
            <img
              src={
                fish.img || require("../../../Images/PublicImages/trout.png")
              }
              alt={fish.commonName}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-text">{fish.commonName}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};
