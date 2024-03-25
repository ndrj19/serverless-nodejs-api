const landingAction = async (req, res, next) => {
  const STAGE = process.env.STAGE || "prod";
  return res.status(200).json({
    message:
      "Welcome to the A Song Of Ice And Fire API. This API provides information about characters from the books. More routes will be added in the future.",
    GET_routes: [
      "characters: Retrieve all characters.",
      "characters/:id: Retrieve a specific character by their ID.",
      "characters/status/:status: Retrieve characteres based on their status.",
      "search-name?name=YOUR_SEARCH: Search characters by name.",
      "search-house?house=YOUR_SEARCH: Search characters by house name.",
      "houses: Retrieve all houses.",
      "houses/:id: Retrieve a specific house by its ID.",
    ],
    POST_routes: [
      "characters: Add a new character. Request body should include character details. House (houseId) is optional but has to be existing.",
      "houses: Add a new house. Request body should include house name",
    ],
    PUT_routes: [
      "characters: Update an existing character by ID. Request body should include character ID and fields to be updated.",
    ],
    stage: STAGE,
  });
};

module.exports = { landingAction };
