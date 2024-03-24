const { validateHouse } = require("../db/validators");
const { newHouse } = require("../db/crud");

const newHouseAction = async (req, res, next) => {
  const postData = await req.body;
  const { data, hasError, message } = await validateHouse(postData);
  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : "Invalid request. Please try again.",
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: message,
    });
  }

  const result = await newHouse(data);
  return res.status(201).json({
    results: result,
  });
};

module.exports = { newHouseAction };
