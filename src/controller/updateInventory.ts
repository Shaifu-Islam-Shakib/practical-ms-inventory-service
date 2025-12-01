import { eq, sql } from 'drizzle-orm';
import db from '../db/index.ts';
import { findHistoryByDesc } from './history/index.ts';
import { InventoryUpdateDTO } from '../zod/schemas.ts';
import { v4 as uuidV4 } from 'uuid';
import { schema } from '../db/schema/index.ts';

const updateInventory = async (data: InventoryUpdateDTO,inventoryId:string) => {
  const {  actionType, quantity, newQuantity } = data;

  const lastHistory = await findHistoryByDesc(inventoryId);
  if (!lastHistory) {
    throw new Error('Last history is not available');
  }

  const lastHistoryQuantity = lastHistory.updatedQuantity ?? 0;
  //console.log(schema.inventory.id);
  const res = await db.transaction(async (tx) => {
    // Fix 1: Ensure we're returning the specific fields we need

    const [inventoryResult] = await tx.update(schema.inventory)
      .set({ quantity: newQuantity, updatedAt: sql`NOW()` })
      .where(eq(schema.inventory.id, inventoryId))
      .returning({
        id: schema.inventory.id,
        sku: schema.inventory.sku,
        quantity: schema.inventory.quantity
      });

    if (!inventoryResult) {
      throw new Error('Inventory item not found');
    }

    // Fix 2: Type assertion for actionType
    await tx.insert(schema.history).values({
      id: uuidV4(),
      actionType: actionType as 'in' | 'out',
      sku: inventoryResult.sku,
      quantityChanged: quantity,
      lastQuantity: lastHistoryQuantity,
      updatedQuantity: newQuantity,
      inventoryId: inventoryResult.id
    });

    return {
      status: 'success',
      sku: inventoryResult.sku,
      id: inventoryResult.id,
      quantity: inventoryResult.quantity
    };
  });


  return res;
};

export default updateInventory;