const { searchCharacterByName } = require("../db/crud");
const errors = require("../utils/errors");

const searchByNameAction = async (req, res, next) => {
  let status = 200;

  try {
    const name = req.query.name;
    const data = await searchCharacterByName(name);
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

module.exports = { searchByNameAction };
