const serverless = require("serverless-http");
const express = require("express");
const { getDbClient } = require("./db/clients");
const crud = require("./db/crud");
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
  const results = await crud.getLead(id);
  return res.status(200).json({
    results: results,
  });
});

app.post("/leads", async (req, res, next) => {
  const data = await req.body;
  // const { email } = data;
  const result = await crud.newLead(data);
  return res.status(200).json({
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
