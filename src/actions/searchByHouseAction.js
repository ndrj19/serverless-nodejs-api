const { searchCharacterByHouse } = require("../db/crud");
const errors = require("../utils/errors");

const searchByHouseAction = async (req, res, next) => {
  let status = 200;

  try {
    const house = req.query.house;
    const data = await searchCharacterByHouse(house);
    return res.status(status).json({
      message:
        "Successfully retrieved all characters matching your search input",
      data: data,
    });
  } catch (error) {
    status = 500;
    if (error instanceof errors.ValidationError) status = 400;
  }
  return res.status(status).json({
    message: `Oops, something went wrong${
      status === 500 ? " on our end" : ""
    }.`,
  });
};

module.exports = { searchByHouseAction };
