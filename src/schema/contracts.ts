import { sql, type InferModel } from "drizzle-orm"
import { date, pgTable, timestamp, uuid } from "drizzle-orm/pg-core"
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
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export type Contract = InferModel<typeof contracts>
