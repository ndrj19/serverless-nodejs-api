const clients = require("./clients");
const schemas = require("./schemas");
const { desc, eq } = require("drizzle-orm");

const newLead = async ({ email }) => {
  const db = await clients.getDrizzleDbClient();
  const result = await db
    .insert(schemas.LeadTable)
    .values({ email: email })
    .returning();
  if (result.length === 1) return result[0];
  return result;
};

const listLeads = async () => {
  const db = await clients.getDrizzleDbClient();
  const results = await db
    .select()
    .from(schemas.LeadTable)
    .orderBy(desc(schemas.LeadTable.createdAt))
    .limit(10);
  return results;
};

const getLead = async (id) => {
  const db = await clients.getDrizzleDbClient();
  const result = await db
    .select()
    .from(schemas.LeadTable)
    .where(eq(schemas.LeadTable.id, id));
  if (result.length === 1) return result[0];
  return null;
};

const newCharacter = async ({ name, house, title, status }) => {
  const db = await clients.getDrizzleDbClient();
  const result = await db
    .insert(schemas.CharacterTable)
    .values({ name: name, house: house, title: title, status: status })
    .returning();
  if (result.length === 1) return result[0];
  return result;
};

const listCharacters = async () => {
  const db = await clients.getDrizzleDbClient();
  const { name, house, title, status } = schemas.CharacterTable;
  const results = await db
    .select({ name, house, title, status })
    .from(schemas.CharacterTable)
    .orderBy(schemas.CharacterTable.id);
  return results;
};

const getCharacter = async (id) => {
  const db = await clients.getDrizzleDbClient();
  const { name, house, title, status } = schemas.CharacterTable;
  const result = await db
    .select({ name, house, title, status })
    .from(schemas.CharacterTable)
    .where(eq(schemas.CharacterTable.id, id));
  return result;
};

module.exports = {
  newLead,
  listLeads,
  getLead,
  newCharacter,
  listCharacters,
  getCharacter,
};
