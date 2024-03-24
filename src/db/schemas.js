const { serial } = require("drizzle-orm/mysql-core");
const { text, timestamp, pgTable, integer } = require("drizzle-orm/pg-core");

const CharacterTable = pgTable("characters", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  house: integer("house").references(() => HousesTable.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

const HousesTable = pgTable("houses", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = {
  CharacterTable,
  HousesTable,
};
