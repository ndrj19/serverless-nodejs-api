const { neon, neonConfig } = require("@neondatabase/serverless");
const secrets = require("../lib/secrets");
const { drizzle } = require("drizzle-orm/neon-http");

async function getDbClient() {
  const dbUrl = await secrets.getDatabaseUrl();
  // The `fetchConnectionCache` option is deprecated (now always `true`)
  // neonConfig.fetchConnectionCache = true;
  const sql = neon(dbUrl);
  return sql;
}

async function getDrizzleDbClient() {
  const sql = await getDbClient();
  return drizzle(sql);
}

module.exports = { getDbClient, getDrizzleDbClient };
