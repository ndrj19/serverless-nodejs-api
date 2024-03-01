const serverless = require("serverless-http");
const express = require("express");
const AWS = require("aws-sdk");
const { neon, neonConfig } = require("@neondatabase/serverless");

const AWS_REGION = "eu-west-2";
const STAGE = process.env.STAGE || "prod";

const app = express();
const ssm = new AWS.SSM({ region: AWS_REGION });

const DATABASE_URL_SSM_PARAM = `/serverless-nodejs-api/${STAGE}/database-url`;

async function dbClient() {
  // for HTTP connections, non-pooling
  const paramStoreData = await ssm
    .getParameter({
      Name: DATABASE_URL_SSM_PARAM,
      WithDecryption: true,
    })
    .promise();
  // console.log(paramStoreData.Parameter.Value);
  neonConfig.fetchConnectionCache = true;
  const sql = neon(paramStoreData.Parameter.Value);
  return sql;
}

app.get("/", async (req, res, next) => {
  const sql = await dbClient();
  const [results] = await sql`select now();`;
  return res.status(200).json({
    message: "Hello from the top of the mountain!",
    results: results.now,
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
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
