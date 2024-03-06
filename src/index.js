const serverless = require("serverless-http");
const express = require("express");
const { getDbClient } = require("./db/clients");
const crud = require("./db/crud");
const validators = require("./db/validators");
const STAGE = process.env.STAGE || "prod";
const app = express();

app.use(express.json());

app.get("/", async (req, res, next) => {
  const sql = await getDbClient();
  const now = Date.now();
  const [dbNowResult] = await sql`select now();`;
  const delta = (dbNowResult.now.getTime() - now) / 1000;
  return res.status(200).json({
    message: "Hello from the top of the mountain!",
    results: delta,
    stage: STAGE,
    ghahaegi: "Ghahägi",
    hobby: "Bulle goh schlah",
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/leads", async (req, res, next) => {
  const results = await crud.listLeads();
  return res.status(200).json({
    results: results,
  });
});

app.get("/leads/:id", async (req, res, next) => {
  const id = req.params.id;
  const result = await crud.getLead(id);
  return res.status(200).json({
    results: result,
  });
});

app.post("/leads", async (req, res, next) => {
  const postData = await req.body;
  const { data, hasError, message } = await validators.validateLead(postData);
  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : "Invalid request. Please try again.",
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: message,
    });
  }

  const result = await crud.newLead(data);
  return res.status(201).json({
    results: result,
  });
});

app.get("/characters", async (req, res, next) => {
  const results = await crud.listCharacters();
  return res.status(200).json({
    results: results,
  });
});

app.get("/characters/:id", async (req, res, next) => {
  const id = req.params.id;
  const result = await crud.getCharacter(id);
  return res.status(200).json({
    results: result,
  });
});

app.post("/characters", async (req, res, next) => {
  const postData = await req.body;
  const { data, hasError, message } = await validators.validateCharacter(
    postData
  );
  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : "Invalid request. Please try again.",
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: message,
    });
  }

  const result = await crud.newCharacter(data);
  return res.status(201).json({
    results: result,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// app.listen(3000, () => {
//   console.log("hello from http://localhost:3000");
// });

module.exports.handler = serverless(app);
