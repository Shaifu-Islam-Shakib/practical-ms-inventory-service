import { pgTable, integer, varchar, pgEnum, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { inventory } from './inventory.ts'
import { inventoryActionEnum } from './enums.ts'

export const history = pgTable('history', {
  id: uuid('id').defaultRandom().primaryKey(),
  actionType: inventoryActionEnum('action_type').notNull().default('in'),
  sku: varchar('sku').notNull(),
  quantityChanged: integer('changed_quantity'),
  lastQuantity: integer('last_quantity'),
  updatedQuantity: integer('updated_quantity'),
  inventoryId: uuid("inventory_id").notNull().references(() => inventory.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})
export const historyRelation = relations(history, ({ one }) => ({
  inventory: one(inventory, {
    fields: [history.inventoryId],
    references: [inventory.id]
  })
}))