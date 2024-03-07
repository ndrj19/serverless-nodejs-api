const landingAction = async (req, res, next) => {
  const STAGE = process.env.STAGE || "prod";
  return res.status(200).json({
    message:
      "Welcome to the A Song Of Ice And Fire API. This API provides information about characters from the books. More routes will be added in the future.",
    GET_routes: [
      "characters: Retrieve all characters.",
      "characters/:id: Retrieve a specific character by their ID.",
      "search-name?name=YOUR_SEARCH: Search characters by name.",
      "search-house?house=YOUR_SEARCH: Search characters by house name.",
    ],
    POST_routes: [
      "characters: Add a new character. Request body should include character details.",
    ],
    stage: STAGE,
  });
};

module.exports = { landingAction };
