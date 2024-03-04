// Function to check for an existing user by their unique identifier (userSub) or create a new one.
const checkOrCreateUser = async (userSub: any) => {
  try {
    // Makes an HTTP GET request to the backend to check if the user exists.
    const response = await fetch(`http://localhost:8080/api/users/${userSub}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userData = await response.json();
      console.log("USER EXISTS");

      return userData;
    } else {
      throw new Error("Failed to fetch or create user");
    }
  } catch (error) {
    console.error("Error in checkOrCreateUser:", error);
    throw error;
  }
};

export default checkOrCreateUser;
