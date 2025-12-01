import { schema } from './schema/index.ts';
export type Inventory = schema.inventory.$inferSelect
export type NewInventory = schema.inventory.$inferInsert
export type History = schema.history.$inferSelect
export type NewHistory = schema.history.$inferInsert