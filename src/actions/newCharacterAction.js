const { validateCharacter } = require("../db/validators");
const { newCharacter } = require("../db/crud");

const newCharacterAction = async (req, res, next) => {
  const postData = await req.body;
  const { data, hasError, message } = await validateCharacter(postData);
  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : "Invalid request. Please try again.",
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: message,
    });
  }

  const result = await newCharacter(data);
  return res.status(201).json({
    results: result,
  });
};

module.exports = { newCharacterAction };
