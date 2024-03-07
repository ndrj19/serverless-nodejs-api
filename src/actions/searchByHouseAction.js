const { searchCharacterByHouse } = require("../db/crud");

const searchByHouseAction = async (req, res, next) => {
  const house = req.query.house;
  const results = await searchCharacterByHouse(house);
  return res.status(200).json({
    results: results,
  });
};

module.exports = { searchByHouseAction };
