import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  startAt: timestamp().notNull(),
  endAt: timestamp().notNull(),
  duration: integer().notNull(),
  rewardRate: integer().notNull(),
  name: text().notNull(),
  location: text().default(""),
  description: text().default(""),
});
