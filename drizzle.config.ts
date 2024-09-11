import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schemas/*.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:root@127.0.0.1:5432/cactus",
  },
  verbose: true,
  strict: true,
} satisfies Config;
