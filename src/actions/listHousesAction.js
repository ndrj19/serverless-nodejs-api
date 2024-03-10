const { listHouses } = require("../db/crud");
const errors = require("../utils/errors");

const listHousesAction = async (req, res, next) => {
  let status = 200;

  try {
    const data = await listHouses();
    return res
      .status(status)
      .json({ message: "Successfully retrieved all houses", data: data });
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

module.exports = { listHousesAction };
