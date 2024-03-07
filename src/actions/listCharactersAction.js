const { listCharacters } = require("../db/crud");
const errors = require("../utils/errors");

const listCharactersAction = async (req, res, next) => {
  let status = 200;
  const obj = {
    message: "",
    data: [],
  };
  try {
    const results = await listCharacters();
    obj.message = "Successfully retrieved all characters";
    obj.data = results;
    return res.status(status).json({ obj });
  } catch (error) {
    obj.message = "Oops, something went wrong.";
    if (error instanceof errors.ValidationError) status = 400;
    else status = 500;
  }
  return res.status(status).json({ obj });
};

module.exports = { listCharactersAction };
