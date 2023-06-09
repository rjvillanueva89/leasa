import { type InferModel } from "drizzle-orm"
import {
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { tenants } from "./tenants"

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  contract_id: uuid("contract_id")
    .notNull()
    .references(() => tenants.id),
  items: jsonb("items").notNull(),
  amount: numeric("amount").notNull(),
  notes: text("notes"),
  due_date: timestamp("due_date"),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export type Tenant = InferModel<typeof tenants>
