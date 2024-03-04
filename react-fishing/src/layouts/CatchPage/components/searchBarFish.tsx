import React, { useState } from "react";
import FishModel from "../../../models/FishModel";

interface SearchFishProps {
  fish: FishModel;
  onClick: () => void;
}

// The SearchBarFish component allows users to search for fish by species
const SearchBarFish: React.FC<SearchFishProps> = ({ fish, onClick }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="row mb-4 align-items-end">
      <div className="col-2">
        <label htmlFor="specie">Specie</label>
      </div>
      <div className="col-5">
        <input type="text" className="form-control" id="specie" />
      </div>
      <div className="col-4">
        <button className="btn btn-outline-success">Search</button>
      </div>
    </div>
  );
};

export default SearchBarFish;
