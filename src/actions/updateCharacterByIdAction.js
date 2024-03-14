const { validateCharacterUpdate } = require("../db/validators");
const { updateCharacterById } = require("../db/crud");

const updateCharacterByIdAction = async (req, res, next) => {
  const putData = await req.body;
  const { data, hasError, message } = await validateCharacterUpdate(putData);

  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : "Invalid request. Please try again.",
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: message,
    });
  }

  const result = await updateCharacterById(data);
  return res.status(201).json({
    results: result,
  });
};

module.exports = { updateCharacterByIdAction };
