const clients = require("./clients");
const schemas = require("./schemas");
const { desc, eq, ilike, sql } = require("drizzle-orm");

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

const newCharacter = async ({ id, name, house, title, status }) => {
  const db = await clients.getDrizzleDbClient();
  const result = await db
    .insert(schemas.CharacterTable)
    .values({ name: name, house: house, title: title, status: status })
    .returning();
  if (result.length === 1) return result[0];
  return result;
};

const updateCharacterById = async ({ id, name, house, title, status }) => {
  const db = await clients.getDrizzleDbClient();
  const characterTable = schemas.CharacterTable;

  const updateObj = {};
  if (name) updateObj.name = name;
  if (house) updateObj.house = house;
  if (title) updateObj.title = title;
  if (status) updateObj.status = status;

  const result = await db
    .update(characterTable)
    .set(updateObj)
    .where(eq(characterTable.id, id))
    .returning({ updatedId: characterTable.id });
  return result;
};

const listCharacters = async () => {
  const db = await clients.getDrizzleDbClient();
  const { id, name, house, title, status } = schemas.CharacterTable;
  const results = await db
    .select({ id, name, house, title, status })
    .from(schemas.CharacterTable)
    .orderBy(schemas.CharacterTable.id);
  return results;
};

const getCharacter = async (pId) => {
  const db = await clients.getDrizzleDbClient();
  const { id, name, house, title, status } = schemas.CharacterTable;
  const result = await db
    .select({ id, name, house, title, status })
    .from(schemas.CharacterTable)
    .where(eq(schemas.CharacterTable.id, pId));
  return result[0];
};

const searchCharacterByName = async (qName) => {
  const db = await clients.getDrizzleDbClient();
  const { id, name, house, title, status } = schemas.CharacterTable;
  const results = await db
    .select({ id, name, house, title, status })
    .from(schemas.CharacterTable)
    .where(ilike(schemas.CharacterTable.name, `%${qName}%`));
  return results;
};

const searchCharacterByHouse = async (qHouse) => {
  const db = await clients.getDrizzleDbClient();
  const { id, name, house, title, status } = schemas.CharacterTable;
  const results = await db
    .select({ id, name, house, title, status })
    .from(schemas.CharacterTable)
    .where(ilike(schemas.CharacterTable.house, `%${qHouse}%`));
  return results;
};

const listHouses = async () => {
  const db = await clients.getDrizzleDbClient();
  const { house } = schemas.CharacterTable;
  const results = await db
    .selectDistinct({ house })
    .from(schemas.CharacterTable);
  return results;
};

module.exports = {
  newLead,
  listLeads,
  getLead,
  newCharacter,
  updateCharacterById,
  listCharacters,
  getCharacter,
  searchCharacterByName,
  searchCharacterByHouse,
  listHouses,
};
