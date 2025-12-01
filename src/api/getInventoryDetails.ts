import { Request, Response, NextFunction } from 'express'
import * as inventoryService from '../controller/index.ts';
const getInventoryDetails = async (req: Request, res: Response, next: NextFunction) => {
  const { inventoryId } = req.params;
  const inventory = await inventoryService.getInventoryDetails(inventoryId)
  res.status(200).json({
    code: 200,
    message: 'Fetch details',
    data: inventory ? inventory : 'Inventory is not available'
  })
};
export default getInventoryDetails