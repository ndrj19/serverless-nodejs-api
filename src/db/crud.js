const clients = require("./clients");
const schemas = require("./schemas");
const { desc, eq, ilike, sql } = require("drizzle-orm");

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
  const CharacterTable = schemas.CharacterTable;

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
  // const { id, name, house, title, status } = schemas.CharacterTable;
  const results = await db
    .select({
      id: schemas.CharacterTable.id,
      name: schemas.CharacterTable.name,
      house: schemas.HousesTable.name,
      title: schemas.CharacterTable.title,
      status: schemas.CharacterTable.status,
    })
    .from(schemas.CharacterTable)
    .leftJoin(
      schemas.HousesTable,
      eq(schemas.CharacterTable.house, schemas.HousesTable.id)
    )
    .orderBy(schemas.CharacterTable.id);
  return results;
};

const getCharacter = async (pId) => {
  const db = await clients.getDrizzleDbClient();
  // const { id, name, title, status } = schemas.CharacterTable;
  // const houseName = schemas.HousesTable.house;

  const result = await db
    .select({
      id: schemas.CharacterTable.id,
      name: schemas.CharacterTable.name,
      house: schemas.HousesTable.name,
      title: schemas.CharacterTable.title,
      status: schemas.CharacterTable.status,
    })
    .from(schemas.CharacterTable)
    .leftJoin(
      schemas.HousesTable,
      eq(schemas.CharacterTable.house, schemas.HousesTable.id)
    )
    .where(eq(schemas.CharacterTable.id, pId));
  return result[0];
};

const searchCharacterByName = async (qName) => {
  const db = await clients.getDrizzleDbClient();
  // const { id, name, house, title, status } = schemas.CharacterTable;
  const results = await db
    .select({
      id: schemas.CharacterTable.id,
      name: schemas.CharacterTable.name,
      house: schemas.HousesTable.name,
      title: schemas.CharacterTable.title,
      status: schemas.CharacterTable.status,
    })
    .from(schemas.CharacterTable)
    .leftJoin(
      schemas.HousesTable,
      eq(schemas.CharacterTable.house, schemas.HousesTable.id)
    )
    .where(ilike(schemas.CharacterTable.name, `%${qName}%`));
  return results;
};

const searchCharacterByHouse = async (qHouse) => {
  const db = await clients.getDrizzleDbClient();
  // const { id, name, house, title, status } = schemas.CharacterTable;
  const results = await db
    .select({
      id: schemas.CharacterTable.id,
      name: schemas.CharacterTable.name,
      house: schemas.HousesTable.name,
      title: schemas.CharacterTable.title,
      status: schemas.CharacterTable.status,
    })
    .from(schemas.CharacterTable)
    .leftJoin(
      schemas.HousesTable,
      eq(schemas.CharacterTable.house, schemas.HousesTable.id)
    )
    .where(ilike(schemas.HousesTable.name, `%${qHouse}%`));
  return results;
};

const listHouses = async () => {
  const db = await clients.getDrizzleDbClient();
  const { id, name } = schemas.HousesTable;
  const results = await db.select({ id, name }).from(schemas.HousesTable);
  return results;
};

const listCharactersByStatus = async (status) => {
  const db = await clients.getDrizzleDbClient();
  // const { id, name, house, title, status } = schemas.CharacterTable;
  const results = await db
    .select({
      id: schemas.CharacterTable.id,
      name: schemas.CharacterTable.name,
      house: schemas.HousesTable.name,
      title: schemas.CharacterTable.title,
      status: schemas.CharacterTable.status,
    })
    .from(schemas.CharacterTable)
    .leftJoin(
      schemas.HousesTable,
      eq(schemas.CharacterTable.house, schemas.HousesTable.id)
    )
    .where(eq(schemas.CharacterTable.status, status));
  return results;
};

module.exports = {
  newCharacter,
  updateCharacterById,
  listCharacters,
  getCharacter,
  searchCharacterByName,
  searchCharacterByHouse,
  listHouses,
  listCharactersByStatus,
};
