import db from '../db/index.ts'
import { schema } from '../db/schema/index.ts'
const getInventoryDetails = async (inventoryId: string) => {
  const inventory = await db.query.inventory.findFirst({
    where: (inventory, { eq }) => eq(inventory.id, inventoryId),
    with: {
      histories: {
        orderBy: (history, { desc }) => [desc(schema.history.createdAt)]
      }
    }
  })
  return inventory
}
export default getInventoryDetails;