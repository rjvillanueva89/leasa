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
import { contracts } from "./contracts"

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  contract_id: uuid("contract_id")
    .notNull()
    .references(() => contracts.id),
  title: text("title").notNull(),
  items: jsonb("items").notNull(),
  amount: numeric("amount").notNull(),
  notes: text("notes"),
  status: text("status", {
    enum: ["pending", "sent", "paid", "cancelled"],
  }).default("pending"),
  due_date: timestamp("due_date"),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export type Invoice = InferModel<typeof invoices>
