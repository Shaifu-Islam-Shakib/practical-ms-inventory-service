import db from '../db/index.ts'
const getAllInventory = async () => {
  const inventories = await db.query.inventory.findMany()
  return inventories
}
export default getAllInventory;