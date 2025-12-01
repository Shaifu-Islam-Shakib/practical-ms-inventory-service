import db from '../../db/index.ts';
const findHistoryByDesc = async (inventoryId: string ) => {

  const historys = await db.query.history.findFirst({
    where: (history, { eq }) => eq(history.inventoryId, inventoryId),
    orderBy: (history, { desc }) => [desc(history.createdAt)]
  }).execute()

  return historys
}
export default findHistoryByDesc;