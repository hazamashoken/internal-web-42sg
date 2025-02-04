import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users";

export const accounts = pgTable("accounts", {
  id: text().primaryKey(),
  userId: text().references(() => users.id),
  accountId: text().notNull(),
  providerId: text().notNull(),
  accessToken: text(),
  refreshToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  idToken: text(),
  password: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
