import { useEffect, useState } from "react";
import FishModel from "../../models/FishModel";

// Component for displaying detailed information about a specific fish species.
export const FishInformationPage = () => {
  const [fish, setFish] = useState<FishModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Extracting FishId from the current URL path.
  const FishId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchFish = async () => {
      const baseUrl: string = `http://localhost:8080/api/fish/${FishId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something is wrong");
      }

      const responseJson = await response.json();

      const loadedFish: FishModel = {
        id: responseJson.id,
        commonName: responseJson.commonName,
        specieId: responseJson.species.speciesId,
        latitude: responseJson.latitude,
        longitude: responseJson.longitude,
        description: responseJson.description,
        habitat: responseJson.habitat,
        img: responseJson.imageUrl,
      };

      setFish(loadedFish);
      setIsLoading(false);
    };

    fetchFish().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  });

  return (
    <div className="container pb-5 custom-container">
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card" style={{ marginBottom: "5rem" }}>
            <div className="card-body p-4 text-center">
              <h3 className="card-title mb-2" style={{ fontWeight: "bold" }}>
                {fish?.commonName}
              </h3>
              <div className="d-flex justify-content-center">
                {fish?.img ? (
                  <img
                    src={fish?.img}
                    className="mb-2 img-fluid"
                    style={{ maxWidth: "60%", height: "auto" }}
                    alt="fish"
                  />
                ) : (
                  <img
                    src={require("./../../Images/PublicImages/trout.png")}
                    className="card-img-top mb-5"
                    style={{ maxWidth: "60%", height: "auto" }}
                    alt="fish"
                  />
                )}
              </div>
            </div>
            {/* Quick facts section */}
            {/* NOTE: Static data shown here as a placeholder. Future implementation will dynamically 
            fetch these details from the backend/API to ensure up-to-date information.*/}
            <div
              style={{
                fontWeight: "bold",
                justifyContent: "flex-start",
                borderBottom: "2px solid #007eb2",
                marginBottom: "1rem",
                marginLeft: "2rem",
                marginRight: "2rem",
              }}
            >
              Quick Facts
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "2rem",
              }}
            >
              <div
                style={{
                  minWidth: "100px",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                WEIGHT
              </div>
              <div style={{ fontSize: "0.8rem" }}>198 pounds</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "2rem",
              }}
            >
              <div
                style={{
                  minWidth: "100px",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                LENGTH
              </div>
              <div style={{ fontSize: "0.8rem" }}>Up to 6.5 feet</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "2rem",
              }}
            >
              <div
                style={{
                  minWidth: "100px",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                DIET
              </div>
              <div style={{ fontSize: "0.8rem" }}>What the fish eats</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "2rem",
              }}
            >
              <div
                style={{
                  minWidth: "100px",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                HABITAT
              </div>
              <div style={{ fontSize: "0.8rem" }}>Ocean</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "3rem",
                marginLeft: "2rem",
              }}
            >
              <div
                style={{
                  minWidth: "100px",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                STATUS
              </div>
              <div style={{ fontSize: "0.8rem" }}>Proteced</div>
            </div>
          </div>
        </div>
        {/* Detailed fish information */}
        {/* NOTE: Static data shown here as a placeholder. Future implementation will dynamically 
            fetch these details from the backend/API to ensure up-to-date information.*/}
        <div className="col-12 col-md-7 container">
          <div>
            <h3 style={{ fontWeight: "bold" }}>
              Information about {fish?.commonName}
            </h3>
            <br></br>
          </div>
          <h5>Introduction</h5>
          <p>text</p>
          <br></br>
          <h5>Diet</h5>
          <p>text</p>
          <br></br>
          <h5>Fishing Tips</h5>
          <p>text</p>
          <br></br>
          <h5>Recognize</h5>
          <text>text</text>
          <br></br>
          <h5>Habitat</h5>
          <text>text</text>
          <br></br>
          <text>Map</text>
        </div>
      </div>
    </div>
  );
};
