const clients = require("./clients");
const { CharacterTable, HousesTable } = require("./schemas");
const { desc, eq, ilike, max } = require("drizzle-orm");

const newCharacter = async ({ id, name, house, title, status }) => {
  const db = await clients.getDrizzleDbClient();
  const result = await db
    .insert(CharacterTable)
    .values({ name: name, house: house, title: title, status: status })
    .returning();
  if (result.length === 1) return result[0];
  return result;
};

const getMaxHouseId = async () => {
  const db = await clients.getDrizzleDbClient();
  const result = await db
    .select({ value: max(HousesTable.id) })
    .from(HousesTable);
  return result[0].value;
};

const newHouse = async ({ id, name }) => {
  const db = await clients.getDrizzleDbClient();
  const result = await db
    .insert(HousesTable)
    .values({ name: name })
    .returning();
  if (result.length === 1) return result[0];
  return result;
};

const updateCharacterById = async ({ id, name, house, title, status }) => {
  const db = await clients.getDrizzleDbClient();

  const updateObj = {};
  if (name) updateObj.name = name;
  if (house) updateObj.house = house;
  if (title) updateObj.title = title;
  if (status) updateObj.status = status;

  const result = await db
    .update(CharacterTable)
    .set(updateObj)
    .where(eq(CharacterTable.id, id))
    .returning({ updatedId: CharacterTable.id });
  return result;
};

const listCharacters = async () => {
  const db = await clients.getDrizzleDbClient();
  const results = await db
    .select({
      id: CharacterTable.id,
      name: CharacterTable.name,
      house: HousesTable.name,
      title: CharacterTable.title,
      status: CharacterTable.status,
    })
    .from(CharacterTable)
    .leftJoin(HousesTable, eq(CharacterTable.house, HousesTable.id))
    .orderBy(CharacterTable.id);
  return results;
};

const getCharacter = async (id) => {
  const db = await clients.getDrizzleDbClient();

  const result = await db
    .select({
      id: CharacterTable.id,
      name: CharacterTable.name,
      house: HousesTable.name,
      title: CharacterTable.title,
      status: CharacterTable.status,
    })
    .from(CharacterTable)
    .leftJoin(HousesTable, eq(CharacterTable.house, HousesTable.id))
    .where(eq(CharacterTable.id, id));
  return result[0];
};

const searchCharacterByName = async (qName) => {
  const db = await clients.getDrizzleDbClient();
  const results = await db
    .select({
      id: CharacterTable.id,
      name: CharacterTable.name,
      house: HousesTable.name,
      title: CharacterTable.title,
      status: CharacterTable.status,
    })
    .from(CharacterTable)
    .leftJoin(HousesTable, eq(CharacterTable.house, HousesTable.id))
    .where(ilike(CharacterTable.name, `%${qName}%`));
  return results;
};

const searchCharacterByHouse = async (qHouse) => {
  const db = await clients.getDrizzleDbClient();
  const results = await db
    .select({
      id: CharacterTable.id,
      name: CharacterTable.name,
      house: HousesTable.name,
      title: CharacterTable.title,
      status: CharacterTable.status,
    })
    .from(CharacterTable)
    .leftJoin(HousesTable, eq(CharacterTable.house, HousesTable.id))
    .where(ilike(HousesTable.name, `%${qHouse}%`));
  return results;
};

const listHouses = async () => {
  const db = await clients.getDrizzleDbClient();
  const { id, name } = HousesTable;
  const results = await db.select({ id, name }).from(HousesTable);
  return results;
};

const getHouseById = async (hId) => {
  const db = await clients.getDrizzleDbClient();
  const { id, name } = HousesTable;
  const result = await db
    .select({ id, name })
    .from(HousesTable)
    .where(eq(HousesTable.id, hId));
  return result[0];
};

const listCharactersByStatus = async (status) => {
  const db = await clients.getDrizzleDbClient();
  const results = await db
    .select({
      id: CharacterTable.id,
      name: CharacterTable.name,
      house: HousesTable.name,
      title: CharacterTable.title,
      status: CharacterTable.status,
    })
    .from(CharacterTable)
    .leftJoin(HousesTable, eq(CharacterTable.house, HousesTable.id))
    .where(eq(CharacterTable.status, status));
  return results;
};

module.exports = {
  newCharacter,
  newHouse,
  updateCharacterById,
  listCharacters,
  getCharacter,
  searchCharacterByName,
  searchCharacterByHouse,
  listHouses,
  listCharactersByStatus,
  getMaxHouseId,
  getHouseById,
};
