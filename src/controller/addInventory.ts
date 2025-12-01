import db from '../db/index.ts';
import { schema } from '../db/schema/index.ts'
import {InventoryCreateDTO} from '../zod/schemas.ts'
import { v4 as uuidV4 } from 'uuid';
/*interface addInventoryRequest {
  productId: string,
  quantity: number
}*/
const addInventory = async ({ productId, quantity, sku }:InventoryCreateDTO) => {
  
if(!productId|| !sku){
  throw new Error(`productId or sku are not found`)
}
  const res = await db.transaction(async (tx) => {
    // create inventory 
    const [inventoryResult] = await tx.insert(schema.inventory).values({
      productId: productId,
      sku: sku,
      quantity: quantity,
    }).returning()
    await tx.insert(schema.history).values({
      id:uuidV4(),
      actionType: 'in',
      lastQuantity: 0,
      updatedQuantity: inventoryResult.quantity,
      quantityChanged: inventoryResult.quantity,
      sku:inventoryResult.sku,
      inventoryId:inventoryResult.id
    }).returning();
    return {
      status:'success',
      sku: inventoryResult.sku,
      id: inventoryResult.id,
      quantity: inventoryResult.quantity
    }
  })
  return res
};
export default addInventory

/*async function createInventoryWithHistory(inventoryData) {
  return await db.transaction(async (tx) => {
    // Create both records but return minimal data
    const [inventoryResult] = await tx.insert(inventory).values({
      sku: inventoryData.sku,
      productId: inventoryData.productId,
      quantity: inventoryData.quantity,
    }).returning({
      id: inventory.id,
      sku: inventory.sku
    });

    await tx.insert(history).values({
      actionType: 'in',
      sku: inventoryData.sku,
      quantityChanged: inventoryData.quantity,
      lastQuantity: 0,
      updatedQuantity: inventoryData.quantity,
      inventoryId: inventoryResult.id,
    });

    // Return only confirmation with IDs
    return {
      status: 'created',
      inventoryId: inventoryResult.id,
      sku: inventoryResult.sku,
      timestamp: new Date().toISOString()
    };
  });
}*/