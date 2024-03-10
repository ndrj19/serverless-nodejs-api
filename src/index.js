const serverless = require("serverless-http");
const express = require("express");

const { landingAction } = require("./actions/landingAction");
const { listCharactersAction } = require("./actions/listCharactersAction");
const { getChacaterByIdAction } = require("./actions/getCharacterByIdAction");
const { searchByNameAction } = require("./actions/searchByNameAction");
const { searchByHouseAction } = require("./actions/searchByHouseAction");
const { newCharacterAction } = require("./actions/newCharacterAction");
const { listHousesAction } = require("./actions/listHousesAction");
const app = express();

app.use(express.json());

app.get("/", landingAction);
app.get("/characters", listCharactersAction);
app.get("/characters/:id", getChacaterByIdAction);
app.get("/search-name/", searchByNameAction);
app.get("/search-house/", searchByHouseAction);
app.get("/houses/", listHousesAction);

app.post("/characters", newCharacterAction);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
