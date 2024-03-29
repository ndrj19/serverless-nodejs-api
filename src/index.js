const serverless = require("serverless-http");
const express = require("express");

const { landingAction } = require("./actions/landingAction");
const { listCharactersAction } = require("./actions/listCharactersAction");
const { getChacaterByIdAction } = require("./actions/getCharacterByIdAction");
const { searchByNameAction } = require("./actions/searchByNameAction");
const { searchByHouseAction } = require("./actions/searchByHouseAction");
const { newCharacterAction } = require("./actions/newCharacterAction");
const { listHousesAction } = require("./actions/listHousesAction");
const {
  updateCharacterByIdAction,
} = require("./actions/updateCharacterByIdAction");
const {
  listCharacterByStatusAction,
} = require("./actions/listCharactersByStatusAction");
const { newHouseAction } = require("./actions/newHouseAction");
const { getHouseByIdAction } = require("./actions/getHouseByIdAction");
const app = express();

app.use(express.json());

app.get("/", landingAction);
app.get("/characters", listCharactersAction);
app.get("/characters/:id", getChacaterByIdAction);
app.get("/search-name/", searchByNameAction);
app.get("/search-house/", searchByHouseAction);
app.get("/houses/", listHousesAction);
app.get("/houses/:id", getHouseByIdAction);
app.get("/characters/status/:status", listCharacterByStatusAction);

app.post("/characters", newCharacterAction);
app.post("/houses", newHouseAction);

app.put("/characters", updateCharacterByIdAction);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
