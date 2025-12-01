import { z } from 'zod';
import { inventoryActionEnum } from '../db/schema/enums.ts'

function drizzleEnumToZod<T extends readonly string[]>(drizzleEnum: { enumValues: T }) {
  // Check if the array has at least one element
  if (drizzleEnum.enumValues.length === 0) {
    throw new Error('Enum values array cannot be empty');
  }
  return z.enum(drizzleEnum.enumValues as unknown as [string, ...string[]]);
}

export const InventoryCreateDTOSchema = z.object({

  productId: z.string(),
  sku: z.string(),
  quantity: z.number().int().optional().default(0)
})
export type InventoryCreateDTO = z.infer<typeof InventoryCreateDTOSchema>
export const InventoryUpdateDTOSchema = z.object({
  
  quantity: z.number().int().positive(), // Added positive constraint
  actionType: drizzleEnumToZod(inventoryActionEnum),
  // newQuantity: z.number().int().nonnegative() // Should be non-negative
})
export const ExtendInventoryUpdateDTOSchema = InventoryUpdateDTOSchema.extend({
  newQuantity: z.number().int().nonnegative()
})
export type InventoryUpdateDTO = z.infer<typeof ExtendInventoryUpdateDTOSchema>
