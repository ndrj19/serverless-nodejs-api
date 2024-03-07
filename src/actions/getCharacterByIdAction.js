const { getCharacter } = require("../db/crud");

const getChacaterByIdAction = async (req, res, next) => {
  const id = req.params.id;
  const result = await getCharacter(id);
  return res.status(200).json({
    results: result,
  });
};

module.exports = { getChacaterByIdAction };
