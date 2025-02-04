import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users";
export const sessions = pgTable("sessions", {
  id: text().primaryKey(),
  userId: text().references(() => users.id),
  token: text().notNull(),
  expiresAt: timestamp().notNull(),
  ipAddress: text().default(""),
  userAgent: text().default(""),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
