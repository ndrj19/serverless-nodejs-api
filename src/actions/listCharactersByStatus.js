const { listCharactersByStatus } = require("../db/crud");
const errors = require("../utils/errors");

const listCharacterByStatus = async (req, res, next) => {
  let status = 200;

  try {
    const charStatus = req.params.status;
    const data = await listCharactersByStatus(charStatus);

    return res.status(status).json({
      message: `Successfully found ${charStatus} characters`,
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

module.exports = { listCharacterByStatus };
