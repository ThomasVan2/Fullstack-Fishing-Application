import { FindFish } from "./FindFish";
import { useEffect, useState } from "react";
import FishModel from "../../../models/FishModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

// Carousel component displays a carousel of fish.
export const Carousel = () => {
  const [fishes, setFishes] = useState<FishModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchFish = async () => {
      const baseUrl: string = "http://localhost:8080/api/fish";
      const url: string = `${baseUrl}?page=0&size=10`;

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
        latitude: fishData.latitude,
        longitude: fishData.longitude,
        description: fishData.description,
        habitat: fishData.habitat,
        img: fishData.imageUrl,
      }));

      setFishes(loadedFishes);
      setIsLoading(false);
    };

    fetchFish().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div
      className="container mt-5 mb-5"
      style={{
        height: 400,
        boxShadow: "0 4px 21px rgba(0, 0, 0, 0.2)",
        padding: 15,
      }}
    >
      <div className="home-page-carousel-title text-center text-bold">
        <h3>Popular Catches</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-50
        d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align items-center">
              {fishes.slice(0, 3).map((fish) => (
                <FindFish fish={fish} key={fish.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align items-center">
              {fishes.slice(3, 6).map((fish) => (
                <FindFish fish={fish} key={fish.id} />
              ))}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/*Mobile*/}
      <div className="d-lg-none mt-2 mb-1">
        <div className="row d-flex justify-content-center align-items-center">
          <FindFish fish={fishes[1]} key={fishes[1].id} />
        </div>
      </div>
    </div>
  );
};
