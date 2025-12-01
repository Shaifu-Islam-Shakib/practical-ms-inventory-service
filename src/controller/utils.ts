import db from '../db/index.ts';
export const findInventory = async (inventoryId:string) => {
  const isInventoryExist = await db.query.inventory.findFirst({
    where: (inventory, { eq }) => eq(inventory.id, inventoryId)
  })
  return isInventoryExist ? isInventoryExist : false
}