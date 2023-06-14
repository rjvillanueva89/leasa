import { sql, type InferModel } from "drizzle-orm"
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const profiles = pgTable("profiles", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  username: text("username").notNull(),
  full_name: text("full_name").notNull(),
  avatar_url: text("avatar_url"),
  website: text("website"),
  updated_at: timestamp("updated_at"),
})

export type Property = InferModel<typeof profiles>
