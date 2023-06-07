import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

const config: Config = {
  out: "./supabase/migrations",
  schema: "./src/schema",
  breakpoints: false,
  connectionString: process.env["DATABASE_URL"],
};

export default config;
