import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "@/drizzle/schemas";

config({ path: ".env" }); // or .env.local

const DEBUG = process.env.NODE_ENV === "development";

export const db = drizzle(process.env.DATABASE_URL!, {
  logger: DEBUG,
  schema,
});
