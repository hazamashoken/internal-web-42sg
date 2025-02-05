import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  startAt: timestamp("start_at").notNull(),
  endAt: timestamp("end_at").notNull(),
  duration: integer("duration").notNull(),
  rewardRate: integer("reward_rate").notNull(),
  name: text("name").notNull(),
  location: text("location").default(""),
  description: text("description").default(""),
});
