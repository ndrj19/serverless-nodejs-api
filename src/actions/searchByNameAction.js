const { searchCharacterByName } = require("../db/crud");

const searchByNameAction = async (req, res, next) => {
  const name = req.query.name;
  const results = await searchCharacterByName(name);
  return res.status(200).json({
    results: results,
  });
};

module.exports = { searchByNameAction };
