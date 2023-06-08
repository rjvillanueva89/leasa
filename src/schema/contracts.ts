import { sql, type InferModel } from "drizzle-orm"
import {
  date,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { properties } from "./properties"
import { tenants } from "./tenants"

export const contracts = pgTable("contracts", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  tenant_id: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id),
  property_id: uuid("property_id")
    .notNull()
    .references(() => properties.id),
  start_date: date("start_date").notNull(),
  end_date: date("end_date"),
  monthly: numeric("monthly").notNull(),
  status: text("status", { enum: ["active", "inactive"] }),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export type Contract = InferModel<typeof contracts>
