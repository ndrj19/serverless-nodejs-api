const { listCharacters } = require("../db/crud");
const errors = require("../utils/errors");

const listCharactersAction = async (req, res, next) => {
  let status = 200;

  try {
    const data = await listCharacters();
    return res
      .status(status)
      .json({ message: "Successfully retrieved all characters", data: data });
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

module.exports = { listCharactersAction };
