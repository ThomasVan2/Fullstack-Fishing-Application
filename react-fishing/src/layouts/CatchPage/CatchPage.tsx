import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import CatchModel from "../../models/CatchModel";
import FishModel from "../../models/FishModel";
import { Link } from "react-router-dom";
import { useUser } from "../../Auth/UserContext";

// Defines a page component for logging fish catches, including details about the catch
// and the option to upload an image.
export const CatchPage = () => {
  const { authState } = useOktaAuth();

  const [httpError, setHttpError] = useState(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fishes, setFishes] = useState<FishModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterdfishes, setFilteredFishes] = useState<FishModel[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [fishId, setFishId] = useState(0);
  const [baitUsed, setBaitUsed] = useState("");
  const [fishCount, setfishCount] = useState(1);
  const [lureUsed, setLureUsed] = useState("");
  const { user } = useUser();
  const userId = user?.userId;

  // Fetches fish species from the backend upon component mount.
  useEffect(() => {
    const fetchFish = async () => {
      const url: string = "http://localhost:8080/api/fish";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something is wrong");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.fish;

      const loadedFishes: FishModel[] = responseData.map((fishData: any) => ({
        id: fishData.id,
        commonName: fishData.commonName,
        specieId: fishData.species.speciesId,
      }));

      setFishes(loadedFishes);
      setIsLoading(false);
    };

    fetchFish().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  });

  // Handles input changes for the fish species search, updating filtered fishes.
  const searchHandleChange = (event: any) => {
    const userInput = event.target.value;
    if (userInput.length > 0) {
      setFilteredFishes(
        fishes.filter((fish) =>
          fish.commonName.toLowerCase().includes(userInput.toLowerCase())
        )
      );
    } else {
      setFilteredFishes([]);
    }
  };

  // Finds the fish ID by name when the user inputs a fish species.
  const findFishIdByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;

    const matchedFish = fishes.find(
      (fish) => fish.commonName.toLowerCase() === userInput.toLowerCase()
    );
    if (matchedFish) {
      setFishId(matchedFish.id);
    } else {
      setFishId(0);
    }
  };

  // Unified handler for both searching and finding the fish ID.
  const fishUnifiedHandler = (event: any) => {
    searchHandleChange(event);
    findFishIdByName(event);
  };

  // Handles image file selection and reads the file to set the image URL for preview.
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const submitCatch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    const catchData = JSON.stringify({
      userId,
      fishId,
      date,
      location,
      size,
      weight,
      baitUsed,
      description,
    });

    formData.append("catchData", catchData);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (image) {
        console.log(image);
        formData.append("image", image);
      } else {
        console.log("No image file is selected");
      }

      const response = await fetch("http://localhost:8080/api/catches/log", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Catch logged successfully:", responseData);
    } catch (error) {
      console.error("Error logging catch:", error);
    }
  };

  return (
    <div>
      <div className="container pb-3">
        <div className="row mt-5">
          <div className=" col-12 col-md-4 mx-auto">
            <div className="d-flex flex-column align-items-center mt-0">
              <div className={`image-area ${!image ? "empty" : ""}`}>
                {!image && <div>Uploaded Image Result</div>}
                {image && (
                  <img
                    src={imageUrl}
                    alt="Selected"
                    className="img-fluid rounded shadow-sm mx-auto d-block"
                  />
                )}
              </div>
              <div>
                <small style={{ color: "red" }}>* Required</small>
              </div>
              <input type="file" id="upload" hidden onChange={imageHandler} />
              <label
                htmlFor="upload"
                className="btn btn-dark m-0 rounded-pill px-4 mt-5 mb-4"
              >
                <i className="fa fa-cloud-upload text-white"></i>
                <small className="text-uppercase font-weight-bold text-white">
                  Choose file
                </small>
              </label>
            </div>
          </div>
          <div className=" col-12 col-md-5 container align-self-start">
            <div className="row mt-2 mb-2">
              <h5>About the fish</h5>
            </div>
            <div className="row mb-4 align-items-end">
              <div className="col-2">
                <label htmlFor="specie">Specie</label>
              </div>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control"
                  id="specie"
                  list="fishes-datalist"
                  onChange={fishUnifiedHandler}
                />
                <datalist id="fishes-datalist">
                  {filterdfishes.map((fish) => (
                    <option key={fish.id} value={fish.commonName} />
                  ))}
                </datalist>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="weight">Weight</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="form-control"
                      id="weight"
                      min="0"
                      step="0.1"
                      placeholder="Pounds"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="size">Size</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      type="text"
                      className="form-control"
                      id="size"
                      min="0"
                      step="0.1"
                      placeholder="Inches"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5 className="mb-3">Date and Location</h5>
            </div>
            <div className="row mb-4 align-items-end">
              <div className="col-2">
                <label htmlFor="location">Location</label>
              </div>
              <div className="col-5">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  className="form-control"
                  id="location"
                />
              </div>
              <div className="col-4">
                <button className="btn btn-outline-success">Map</button>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="pickedDate">Date</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      type="date"
                      className="form-control"
                      id="pickedDate"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="time">Time</label>
                  </div>
                  <div className="col-md-8">
                    <input type="time" className="form-control" id="time" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5>Description</h5>
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-3 mb-5 container description-input"
              placeholder="Text Here"
            ></input>
            <div>
              {authState?.isAuthenticated ? (
                <form onSubmit={submitCatch}>
                  <button type="submit" className="bg-racetrack-button">
                    Submit Catch
                  </button>
                </form>
              ) : (
                <Link
                  type="button"
                  className="btn btn-outline-dark text-black"
                  to="/login"
                >
                  Sign in to Log Catch
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
