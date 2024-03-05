import React, { useEffect, useState } from "react";
import FishModel from "../../models/FishModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchFish } from "./components/SearchFish";
import { Pagination } from "../Utils/Pagination";
import SearchBar from "./components/SearchBar";
import CategoryPicker from "./components/CategoryPicker";

const handleFishClick = (fish: FishModel) => {
  console.log("Fish clicked:", fish.commonName);
};

export const SearchFishPage = () => {
  const [fishes, setFishes] = useState<FishModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fishPerPage] = useState(20);
  const [totalAmountOfFish, setTotalAmountOfFish] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrls] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Fresh Water", "Salt Water"];
  useEffect(() => {
    const fetchFish = async () => {
      const baseUrl: string = "http://localhost:8080/api/fish";

      let url: string = "";

      // Construct the URL based on whether a search URL is defined.
      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${fishPerPage}`;
      } else {
        url = baseUrl + searchUrl;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something is wrong");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.fish;

      setTotalAmountOfFish(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

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
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

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

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrls("");
    } else {
      setSearchUrls(
        `/search/findByCommonNameContaining?commonName=${search}&page=0&size=${fishPerPage}`
      );
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const indexOfLastFish: number = currentPage * fishPerPage;
  const indexOfFirstFish: number = indexOfLastFish - fishPerPage;
  let lastItem =
    fishPerPage * currentPage <= totalAmountOfFish
      ? fishPerPage * currentPage
      : totalAmountOfFish;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto my-8">
      <div>
        <div className="row mt-5 align-items-end">
          <div className="col-4">
            <div className="col-12">
              <SearchBar
                searchTerm={search}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
              />
            </div>
          </div>
          <div className="col-1">
            <div>
              <h1>{selectedCategory}</h1>
              <CategoryPicker
                categories={categories}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h5>Number of Results: {totalAmountOfFish}</h5>
        </div>
        <p>
          {indexOfFirstFish + 1} to {lastItem} of {totalAmountOfFish} items:
        </p>
      </div>
      <div className="row">
        {fishes.map((fish) => (
          <SearchFish
            fish={fish}
            key={fish.id}
            onClick={() => handleFishClick(fish)}
          />
        ))}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};
