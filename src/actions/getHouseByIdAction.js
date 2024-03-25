const { getHouseById } = require("../db/crud");
const errors = require("../utils/errors");

const getHouseByIdAction = async (req, res, next) => {
  let status = 200;

  try {
    const id = req.params.id;
    const data = await getHouseById(id);

    return res
      .status(status)
      .json({ message: `Successfully found house #${id}`, data: data });
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

module.exports = { getHouseByIdAction };
