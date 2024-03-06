const { serial } = require("drizzle-orm/mysql-core");
const { text, timestamp, pgTable } = require("drizzle-orm/pg-core");

const LeadTable = pgTable("leads", {
  id: serial("id").primaryKey().notNull(),
  email: text("email").notNull(),
  description: text("description").default("Oranges are orange."),
  createdAt: timestamp("created_at").defaultNow(),
});

const CharacterTable = pgTable("characters", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  house: text("house").notNull(),
  title: text("title").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { LeadTable, CharacterTable };
