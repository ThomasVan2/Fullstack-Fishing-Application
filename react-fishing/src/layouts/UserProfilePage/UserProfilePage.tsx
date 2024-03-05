import { SetStateAction, useEffect, useState } from "react";
import CatchModel from "../../models/CatchModel";
import { useOktaAuth } from "@okta/okta-react";
import { useUser } from "../../Auth/UserContext";

export const UserProfilePage = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [catches, setCatches] = useState<CatchModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uniqueSpecies, setUniqueSpeciesCount] = useState(0);
  const [username, setUsername] = useState("");
  const { oktaAuth, authState } = useOktaAuth();
  const { user } = useUser();
  const userId = user?.userId;

  const handleButtonClick = (buttonName: SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  const fetchUserInfo = async () => {
    const url: string = `http://localhost:8080/api/catches/user/${userId}`;
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseJson = await response.json();

      if (responseJson.length > 0) {
        const userNameFromFirstCatch = responseJson[0].userName;
        setUsername(userNameFromFirstCatch);
        const userId = responseJson[0].userId;
      }

      const loadedCatches: CatchModel[] = responseJson.map(
        (catchData: any) => ({
          date: catchData.date,
          location: catchData.location,
          size: catchData.size,
          weight: catchData.weight,
          baitUsed: catchData.baitUsed,
          description: catchData.description,
          fishName: catchData.fishName,
          fishId: catchData.fishId,
          image: catchData.image,
          userName: catchData.userName,
        })
      );

      setCatches(loadedCatches);
    } catch (error) {
      console.error("Failed to fetch catches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    const uniqueSpecies = new Set(catches.map((catchItem) => catchItem.fishId));
    setUniqueSpeciesCount(uniqueSpecies.size);
  }, [userId, catches]);

  return (
    <div>
      <div className="d-flex justify-content-end mt-5 mb-2">
        <div className="profile-container col-10">
          <div className="profile-pic">Profile Pic</div>
          <div className="info-boxes">
            <div className="box">{catches.length} Catches</div>
            <div className="box">{uniqueSpecies} Species</div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-start mt-3 mb-4">
        <div className="details-container col-3 ">{username}</div>
      </div>
      <br></br>
      <div className="full-width-line"></div>
      <div className="d-flex mb-2 mt-2">
        <div className="details-container col-11">
          <button
            className={`button user-page-btn ${
              selectedButton === "My Catches" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("My Catches")}
          >
            My Catches
          </button>
          <button
            className={`button user-page-btn ${
              selectedButton === "My Species" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("My Species")}
          >
            My Species
          </button>
          <button
            className={`button user-page-btn ${
              selectedButton === "My Challenges" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("My Challenges")}
          >
            Want To Catch
          </button>
        </div>
      </div>
      <div className="catches-grid mb-5 mt-3">
        {catches.map((catchItem, index) => (
          <div key={index} className="catch-item">
            <img
              src={`http://localhost:8080/images/${catchItem.image}`}
              alt={`Catch ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
