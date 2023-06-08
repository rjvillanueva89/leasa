import { sql, type InferModel } from "drizzle-orm";
import { date, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";

export const contract = pgTable("contract", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  tenant_id: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id),
  start_date: date("start_date").notNull(),
  end_date: date("end_date"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type Contract = InferModel<typeof contract>;
