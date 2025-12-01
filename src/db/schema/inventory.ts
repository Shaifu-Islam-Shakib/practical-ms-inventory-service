import { pgTable, text, varchar, serial, integer, timestamp, uuid } from 'drizzle-orm/pg-core';
import { history } from './history.ts'
import { relations } from 'drizzle-orm'
export const inventory = pgTable('inventory', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  sku: varchar('sku').unique().notNull(),
  productId: varchar("product_id").notNull(),
  quantity: integer("quantity").default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const inventoryRelation = relations(inventory, ({ many }) => ({
  histories: many(history)
}))

