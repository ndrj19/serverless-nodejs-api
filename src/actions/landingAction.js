const landingAction = async (req, res, next) => {
  const STAGE = process.env.STAGE || "prod";
  return res.status(200).json({
    message:
      "Hi, this is a A Song Of Ice And Fire API with info regarding the characters in the books. More routes will be added.",
    GET_routes: ["characters", "characters/:id"],
    POST_routes: ["characters"],
    stage: STAGE,
  });
};

module.exports = { landingAction };
